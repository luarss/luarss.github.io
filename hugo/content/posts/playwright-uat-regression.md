---
title: "When to Stop Letting the Agent Judge: Porting a UAT Regression Suite to Playwright"
date: 2026-06-13
draft: true
description: "The browser stage of my agentic UAT pipeline re-judged every check on every run. Here's why I moved detection into Playwright assertions, the before/after eval, the live cut-over — and the selectors that didn't survive contact with the real DOM."
keywords: ["UAT automation", "Playwright", "agent skills", "Claude Code", "regression testing", "browser automation", "MCP", "deterministic testing", "LLM agents"]
tags: ["ai-engineering", "automation", "testing"]
summary: "An agent eyeballing an accessibility tree is the right tool for figuring out what to check, and the wrong tool for checking the same thing the thirtieth time. I ported the verification stage to Playwright, validated it against a fixture, then ran it against live Metabase: full-suite parity, zero variance, and a handful of selectors that needed fixing once the real DOM showed up."
---

In the [last post](/posts/automating-uat-testing-with-agent-skills/) I
described a three-stage agent pipeline for UAT: summarise the Slack feedback,
compile it into a regression suite, and verify each item in a real browser.
Stage three drove my logged-in Chrome through the Chrome DevTools MCP, took an
accessibility-tree snapshot of each dashboard, and had the agent judge every
checklist item pass or fail.

It worked. It also had a flaw I waved at in the closing section and then
couldn't stop thinking about: **the agent re-judges every check on every run.**

## The flaw with judging-every-run

Stage three was doing two different jobs and pretending they were one.

The first job is *figuring out how to check something*. "Is the fiscal-year
dropdown ordered chronologically?" starts as an open question. You open the
filter, read the options, notice they come back `2026, 2024, 2025`, and decide
the check is "the rendered order equals the sorted order." An agent reading a
structured a11y tree is genuinely good at this — it's reconnaissance, the part
that needs judgment.

The second job is *running that check again next week*. And here the agent is a
bad fit. Re-judging from a fresh snapshot every run means:

- **It's non-deterministic.** The verdict is a fresh LLM reading of a few
  thousand tokens of accessibility tree. Same DOM, possibly different call.
- **It's slow.** Each item is a model round-trip: navigate, snapshot, reason,
  maybe click a filter, snapshot again. A full pass is dozens of these.
- **It's expensive.** Every run re-ships large snapshots into the context
  window to re-derive a conclusion you already reached last week.
- **It doesn't accumulate.** The *judgment* lives in the transcript, not in
  code. Next run starts from the tree again.

The summary from the first post applies to fixes; it applies just as well to
checks. A check you've understood is an asset. Re-deriving it every run throws
that asset away.

So the move is boring and, in hindsight, obvious: **let the agent author the
test, not be the test runner.** Reconnaissance once, in natural language,
producing a deterministic assertion. Then the assertion runs forever, for free,
identically. The agent comes back only when something fails — to triage it,
explain it in human terms, and write the status back into the suite.

That's a Playwright suite.

## What ported, and what didn't

The encouraging part: most of the checks were *already* code. The MCP stage,
whenever a check was too structural for the a11y tree, dropped into injected
JavaScript — `scrollWidth` vs `clientWidth` for truncation, `getComputedStyle`
for alignment and colour, `querySelectorAll` scans for number formatting. Those
snippets port to Playwright almost verbatim; they just stop being ad-hoc and
become named, reusable probes.

The verdict map for the suite came out roughly:

- **~30 of ~50 items are mechanically assertable** — formatting, truncation,
  alignment, colour coding, filter contents (order, duplicates, blanks),
  table structure, chart bucket counts, the absence of a known error string.
- **The rest stay human.** Cross-system parity ("does this match the legacy
  report?"), permissions that need a non-admin account, upstream
  data-pipeline items, and a couple of genuinely visual checks. These never
  belonged in the automated set, and the suite still lists them as
  needs-a-human, exactly as before.

The division of labour is the point. Playwright does *detection*. The agent does
*triage, narrative, and the part no browser can settle.*

## The eval, in two gates

A migration claim deserves numbers, and the suite now has two gates that earn
them.

The first is a **fixture** — a set of HTML files that reproduce the dashboard
DOM in the exact pass/fail states my prior runs recorded by hand. It runs
headless, with no auth, in about twenty seconds, and it's the parity gate: every
test must produce the verdict the human wrote down. The whole automated set —
**31 checklist IDs, 53 tests across five dashboards** — runs against it.

| Dimension | Before (agent judges each run) | After (Playwright asserts) |
| --- | --- | --- |
| Verdict parity with human record | — (it *is* the human judgment) | **full suite** |
| Variance across repeat runs | re-judged each time; can drift | **0** |
| Wall-clock | minutes of model round-trips | **~20 s** (fixture), ~3 min (live) |
| Model tokens for detection | high (snapshots re-shipped each run) | **~0** until a failure needs triage |
| Evidence | screenshots captured by hand | auto screenshot + trace + video + report |

The fixture gate lands at **39 pass / 14 fail**, and the fourteen failures are
*exactly* the items the ledger records as broken — the suite reproduces the
known-bad states by design, so a known-broken check fails on purpose. The number
I actually cared about is the one that isn't in the table: **zero variance.**
Same fourteen, every run. That's the property the agentic version structurally
could not promise.

But the fixture only proves the assertions encode the right verdicts. It does
*not* prove the selectors survive the live DOM. So the second gate is the one
the first version of this post was still waiting on: an actual run against live
Metabase.

## The friction nobody blogs about

Standing this up was not a clean `npm install`. In order:

- The npm cache had root-owned files from an old install — `EPERM` until I
  pointed it at a fresh cache directory.
- My dev sandbox blocks writes outside the project, so the browser download
  failed trying to create a lock file in the global cache. Fixed by aiming
  Playwright's browser path *inside* the repo.
- Then headless Chromium wouldn't even start under the sandbox: its
  multi-process mach-port rendezvous gets denied. Browser automation and OS
  sandboxes are in genuine tension; the run needs the sandbox relaxed for
  exactly the browser-launch step.

I'm listing these because "just use Playwright" hides a half-hour of
environment archaeology, and the environment archaeology is most of what makes
the difference between a demo and something that runs on a schedule.

## Crossing the auth wall

The first version of this post ended here, on the auth wall: the dashboards sit
behind SSO, the whole suite needs a logged-in session, and the Chrome the
DevTools MCP drives holds an exclusive profile lock with no debugging port.

The fix turned out to be a *separate* Chrome — launched with
`--remote-debugging-port=9222` against its own `--user-data-dir`, signed into
Metabase once. Playwright attaches over CDP and reuses that logged-in context.
One sharp edge worth recording: recent Chrome **silently ignores the
debug-port flag on your default profile** — a deliberate mitigation against
malware attaching to your everyday browser and lifting its cookies. So the
dedicated profile isn't a nicety, it's mandatory; point the flag at the default
profile and the port never opens. I wrapped the launch in a `make chrome` target
so it's one command, not a remembered incantation.

This is still a human-starts-it step, not something a scheduled cloud agent
conjures — but it's a thirty-second human step, after which detection runs
deterministically. That's a different posture from "an agent must babysit every
run."

## Contact with the live DOM

The fixture proved the verdicts. The live run tested the *selectors* — and that's
where the interesting part was, because the fixture had quietly lied about the
shape of the DOM.

Three things broke, and each one is a small lesson:

- **The charts have no DOM.** Every chart renders to a `<canvas>` (ECharts) —
  bar geometry, axis labels, orientation, none of it is in the tree. The fixture
  modelled them as SVG `<rect>`s, which was convenient and wrong. The fix was to
  stop reading the render and read the *data*: query Metabase's own card API
  (same-origin, riding the session cookie) and assert on the rows the chart is
  built from. A chart check that can't see the chart still verifies the thing
  that matters.
- **Pivot tables have no headers.** No `<table>`, no `<th>` — every cell, header
  and body alike, is the same `[data-testid="pivot-table-cell"]`, structurally
  indistinguishable. Checks like "is the `Sort` helper column hidden?" had to
  scan cell *text* instead of querying header elements that don't exist.
- **A missed selector passed silently.** This is the one that would have bitten
  me later. A probe like "no badly-formatted currency cells" returns an empty
  list two ways: everything's fine, or the selector matched *nothing*. Against
  the live DOM, several selectors matched nothing — and reported a clean pass.
  The fix is to make probes return `{ checked, bad }` and assert `checked > 0`:
  if a currency check examined zero cells, that's a failure, not a pass. A
  regression suite that can pass by seeing nothing isn't a regression suite.

The live run came back **36 pass / 17 fail**, and — after fixing those three
classes of drift — every one of the seventeen is a verdict I trust: a real
broken dashboard behaviour, not a probe that lost its footing. The suite even
caught movement in *both* directions. One check (an aging-bucket that used to be
missing) now passes — the vendor quietly fixed it. Another (a chart that
overflows a 100-series limit) is still broken, but the vendor *tightened the
workaround* that hides it, so reproducing the bug now takes clearing two filters
instead of one. That's the suite earning its keep: it noticed a fix and a
goalpost-move on the same pass, without anyone re-eyeballing a dashboard.

## Takeaways

1. **Let the agent decide *what* to assert; let code do the *asserting*.**
   Judgment is the agent's edge. Re-running a settled judgment is not — that's
   a job for a deterministic test, run for free, forever.
2. **Determinism is a feature you can measure.** "Zero variance across runs" is
   a sentence the agentic version could never truthfully say. If your
   verification can't promise the same answer twice, it isn't a regression
   suite yet.
3. **Keep the ledger; swap the detector.** The human-readable, stable-ID,
   source-traceable suite file didn't change. Only the thing that fills in the
   statuses did. The artifact was always the asset.
4. **A fixture validates verdicts; only the live DOM validates selectors.** The
   fixture eval was necessary and not sufficient — it proved the assertions
   encode the right logic, then the live run quietly broke a third of the
   selectors (canvas charts, headerless pivots). Both gates earn their place;
   don't mistake passing the first for passing the second.
5. **The most dangerous test result is a silent empty pass.** A probe that
   matches nothing and reports "all good" is worse than one that errors. Make
   checks prove they examined something — assert `checked > 0` — or you'll ship
   a suite that's green because it's blind.
