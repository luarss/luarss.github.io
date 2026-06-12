# LinkedIn post — companion to hugo/content/posts/playwright-uat-regression.md

> Not built by Hugo (lives outside hugo/content/). Humanize before posting.

---

A few weeks ago I built an agent that drives a browser to verify UAT fixes on a dashboard migration. It worked. It also had a flaw I couldn't stop thinking about:

It re-judged every check on every run.

That's two jobs pretending to be one.

Figuring out *how* to check something — "is this dropdown ordered chronologically?" — needs judgment. An agent reading a structured accessibility tree is great at it.

Running that same check again next week does not need judgment. And re-judging from scratch every time is non-deterministic, slow, and expensive. The conclusion you reached last week lives in a transcript, not in code, so next run starts over.

So I changed the division of labour: let the agent *author* the test, not *be* the test runner. Reconnaissance once, in natural language, producing a deterministic assertion. Then the assertion runs forever, for free, identically — and the agent only comes back to triage failures.

That's a Playwright suite. I ported a representative slice and measured it against the verdicts a human had recorded by hand the week before:

✅ 11 / 11 verdict parity with the human record
✅ 0 variance across 5 repeat runs
✅ ~7 seconds instead of minutes
✅ ~0 model tokens for detection (only spent on triage)

"Zero variance across five runs" is a sentence the agentic version structurally could not say. That's the whole point.

What this does NOT solve: auth. The dashboards are behind SSO, and the browser the agent was using holds an exclusive profile lock with no debugging port. The unattended end-to-end run still waits on the same wall the first version hit.

Biggest lesson: let the agent decide *what* to assert. Let code do the *asserting*. Judgment is the agent's edge — re-running a settled judgment is a job for a deterministic test.

Full write-up (the eval, the sandbox archaeology, and the auth wall): [LINK]

#AIEngineering #Automation #Playwright #LLMAgents #Testing
