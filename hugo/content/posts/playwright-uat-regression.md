---
title: "When to Stop Letting the Agent Judge: Porting a UAT Regression Suite to Playwright"
date: 2026-06-12
draft: true
description: "The browser stage of my agentic UAT pipeline re-judged every check on every run. Here's why I moved detection into Playwright assertions, the before/after eval, and the auth wall that didn't move."
keywords: ["UAT automation", "Playwright", "agent skills", "Claude Code", "regression testing", "browser automation", "MCP", "deterministic testing", "LLM agents"]
tags: ["ai-engineering", "automation", "testing"]
summary: "An agent eyeballing an accessibility tree is the right tool for figuring out what to check, and the wrong tool for checking the same thing the thirtieth time. I ported the verification stage to Playwright and measured the difference: 11/11 verdict parity, zero variance across runs, seconds instead of minutes."
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

## The eval

A migration claim deserves numbers, so I ported a representative slice — eleven
checks spanning every technique the suite needs (format scan, layout probe,
computed-style, filter-popover read, structural text, header scan) — and built
a fixture that reproduces the dashboard DOM in the exact states my prior runs
had recorded by hand. Then I ran the Playwright suite against it, blind, and
compared its verdicts to the ones a human had written down over the previous
week.

| Dimension | Before (agent judges each run) | After (Playwright asserts) |
| --- | --- | --- |
| Verdict parity with human record | — (it *is* the human judgment) | **11 / 11** |
| Variance across 5 repeat runs | re-judged each time; can drift | **0** |
| Wall-clock for the slice | minutes of model round-trips | **~7 s** |
| Model tokens for detection | high (snapshots re-shipped each run) | **~0** until a failure needs triage |
| Evidence | screenshots captured by hand | auto screenshot + trace + video + report |

Eleven for eleven on parity, and — the number I actually cared about — **zero
variance across five consecutive runs.** Five passes, six failures, the same
six, every single time. That's the property the agentic version structurally
could not promise.

None of this makes the agent obsolete. It makes the agent's contribution
*durable*. The reconnaissance it did once is now frozen into eleven assertions
that will re-run identically long after the conversation that produced them
scrolled out of anyone's memory.

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

## The wall that didn't move

The first post named two limits. The Playwright port clears one and runs
straight into the other.

It clears *brittleness*: detection is now deterministic and headless, so it
*could* run unattended.

It does **not** clear *auth*. The dashboards sit behind SSO, and the whole
suite depends on a logged-in session. My first instinct was to attach Playwright
to the same Chrome the DevTools MCP already drives — reuse the live session, no
re-auth. Probing it killed the idea: that browser holds an exclusive profile
lock and exposes no debugging port. The live cut-over needs its *own* Chrome,
launched with a remote-debugging port against an already-authenticated profile —
which is a thing a human starts, not a thing a scheduled cloud agent conjures.

So the honest status is: detection is solved and measured; the live,
unattended, end-to-end run still waits on the same auth problem the first post
ended on. The fixture proves the assertions encode the right verdicts. It does
not prove the selectors survive contact with the live DOM. That's the next
spike, and it needs a logged-in session I can attach to.

## Takeaways

1. **Let the agent decide *what* to assert; let code do the *asserting*.**
   Judgment is the agent's edge. Re-running a settled judgment is not — that's
   a job for a deterministic test, run for free, forever.
2. **Determinism is a feature you can measure.** "Zero variance across five
   runs" is a sentence the agentic version could never truthfully say. If your
   verification can't promise the same answer twice, it isn't a regression
   suite yet.
3. **Keep the ledger; swap the detector.** The human-readable, stable-ID,
   source-traceable suite file didn't change. Only the thing that fills in the
   statuses did. The artifact was always the asset.
4. **The hard part was never the happy path.** Caches, sandboxes, and SSO ate
   the time. The auth wall is still standing. Worth knowing before you promise
   anyone a nightly run.
