---
title: "Automating UAT Testing with Agent Skills: From Slack Noise to a Regression Suite"
date: 2026-06-05
draft: true
description: "How we turned scattered Slack UAT feedback into a machine-parseable regression suite, verified by a browser-driving agent, and what we learned about 'fixed' vs 'verified'."
keywords: ["UAT automation", "agent skills", "Claude Code", "regression testing", "browser automation", "MCP", "dashboard testing", "LLM agents"]
tags: ["ai-engineering", "automation", "testing"]
summary: "UAT feedback lives in chat, fixes are claimed in chat, and nobody re-checks. Here's a three-stage agent pipeline that closes the loop: summarise feedback, compile it into a regression suite, and verify it in a real browser."
---

Every dashboard migration I've been near follows the same script. The vendor
ships, testers pile feedback into a Slack channel: screenshots, bullet
lists, "is this intended?" questions. The vendor posts a fix-log, and
everyone moves on. Three weeks later someone notices the bug from week one
is still there. Nobody re-checked. Nobody owns re-checking, because
re-checking means scrolling months of chat and clicking through five
dashboards by hand.

We were living exactly this on a finance-dashboard migration, so I built a
three-stage pipeline out of agent skills to close the loop. It caught three
"fixed" items still failing on its first run.

## The shape of the problem

UAT feedback has three properties that make it rot:

1. **It's conversational.** Bug reports arrive interleaved with scheduling
   chatter, vendor status updates, and thread replies that channel reads
   don't even surface.
2. **Fixes are claims.** A vendor fix-log says "we standardised the number
   formatting everywhere." That's an assertion, not a verification.
3. **It doesn't accumulate.** Each round of testing starts from memory.
   There's no artifact that says *here is everything we ever flagged, and
   here is its current state*.

The fix for all three is the same: convert feedback into a **regression
suite**, a durable, append-only checklist, and make re-verification cheap
enough that it actually happens.

## Stage 1: Summarise the feedback (agent reads the channel)

The first skill reads the full history of the project channels through the
Slack MCP connector (paginated channel reads plus the thread replies that
top-level reads silently omit) and produces a per-person summary.

Two design decisions did most of the work here:

- **A roster with verified identities.** Display names lie. The person your
  team calls "Jeslyn" posts under a different legal name; the vendor's
  messages arrive over Slack Connect with no author name at all. The skill
  carries a verified person → Slack-ID roster, plus an explicit *exclusion*
  list for vendor accounts, so "summarise the team's feedback" never
  attributes the vendor's own fix-log to a tester.
- **Distinguish feedback types.** A bug ("variance calculation is wrong"),
  a UX ask ("sort months chronologically"), a question ("what is this
  column?"), and a change request are different objects with different
  lifecycles. Collapsing them into one list is how action items get lost.

The summary also reports who *hasn't* given feedback. Testers who never
logged in are a finding, not an absence.

## Stage 2: Compile feedback into a regression suite

The summary's final step converts every objectively checkable item into one
line of a markdown checklist:

```
- [ ] **BVA-01** Variance % matches the source-of-truth report
      · how: compare a sample team's variance vs the legacy report
      · src: <reporter>, <message-ts> · status: open
```

The format is boring on purpose (one line per item, grouped under the
dashboard URL it applies to) because the next stage parses it. The rules
that matter:

- **Stable IDs, append-only.** `BVA-01` means the same check forever.
  Cross-run diffs ("what regressed since last week?") depend on never
  renumbering.
- **Every item traces to its source message.** When the vendor asks "who
  reported this?", the answer is one timestamp away.
- **Fixed items don't leave the suite.** A vendor claim moves an item to
  `fixed-unverified`, not done. Only a verification run promotes it to
  `verified-pass`, and it stays in the suite afterwards as a regression
  guard. This single rule is the difference between a checklist and a
  regression suite.

Items that can't be judged in a browser (data-pipeline changes, access
grants) live in a `Manual` section at the bottom rather than polluting the
automated set.

## Stage 3: Verify in a real browser

The second skill consumes the suite. It drives my already-authenticated
Chrome through the Chrome DevTools MCP: navigate to each dashboard URL,
take an accessibility-tree snapshot, judge each item, screenshot for
evidence, and write statuses back into the suite file.

The load-bearing insight: **the a11y tree beats screenshots for judging.**
A snapshot of a dashboard returns headings, table cells, filter buttons,
and chart labels as structured text. "Does the variance card show
-269.98%?" is a text match, not a vision problem. Screenshots are kept as
*evidence* for humans; the *judgment* comes from the tree. A few checks are
genuinely visual (truncated cells, bar-chart orientation), and for those
the agent reads the screenshot, but they're the minority.

First live run, the suite caught:

- A variance-calculation bug a tester reported, **still live** after the
  fix-log claimed the surrounding area was standardised.
- Two freshness indicators on the same dashboard disagreeing with each
  other ("data through February" next to "closed month: May").
- As a side effect: the underlying data upload was three months stale.
  Not a dashboard bug at all, but a pipeline problem nobody had noticed
  because everyone was looking at chart formatting.

That last one is worth dwelling on. Mechanical verification doesn't just
re-check known bugs; it looks at the boring parts humans skim past.

## What doesn't automate (yet)

Two real limits:

- **Remote scheduling breaks on the browser.** The summarisation stage can
  run on a scheduled cloud agent, because the Slack connector authenticates
  server-side. The browser stage can't: it depends on a local Chrome with
  my SSO session, which a remote sandbox doesn't have. The path forward is
  an API variant (the dashboard tool has a REST API with scoped keys) for
  the data-level checks, leaving only the visual minority for local runs.
- **Secrets management is primitive.** Scheduled agent runs have no secrets
  store today; an API key would be prompt-embedded in plaintext. The
  mitigation is blast-radius control: a view-only key scoped to exactly
  the dashboards under test. But it's a workaround, not a solution.

## Takeaways

1. **"Fixed" is a claim; "verified" is a state transition.** Encode the
   difference in your tooling or you'll keep re-discovering old bugs.
2. **The artifact matters more than the automation.** Even if the browser
   stage disappeared tomorrow, a stable-ID, source-traceable checklist
   compiled from chat is most of the value.
3. **a11y trees are the API your dashboards never shipped.** Structured
   text beats pixels for almost every check you actually care about.
4. **Agent skills compose like Unix tools.** Summarise → compile → verify
   is three skills with one file format between them. Each is independently
   useful; the pipeline is where it compounds.
