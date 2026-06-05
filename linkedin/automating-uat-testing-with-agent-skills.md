# LinkedIn post — companion to hugo/content/posts/automating-uat-testing-with-agent-skills.md

> Not built by Hugo (lives outside hugo/content/). Humanize before posting.

---

Three weeks after a vendor said "fixed", the bug was still on the dashboard.

Nobody had re-checked. Nobody owns re-checking — because re-checking means scrolling months of Slack and clicking through five dashboards by hand.

So I built a three-stage agent pipeline to close the loop:

1️⃣ An agent reads the entire UAT channel — every thread, every screenshot caption — and produces a per-person feedback summary. It knows the team roster and excludes the vendor's own messages, so claims never get counted as feedback.

2️⃣ The feedback compiles into a regression suite: one line per check, stable IDs, every item traceable to the Slack message that reported it. The key rule — a vendor's "fixed" only moves an item to *fixed-unverified*. Nothing is done until a verification run says so.

3️⃣ A browser agent drives Chrome through every dashboard, judges each check from the accessibility tree (structured text beats screenshots for this), and writes pass/fail back with evidence.

First run: 3 "fixed" items still failing, plus a data pipeline that had been silently stale for 3 months. Nobody had noticed — everyone was looking at chart formatting.

Biggest lesson: "fixed" is a claim. "Verified" is a state transition. Encode the difference in your tooling, or you'll keep re-discovering old bugs.

Full write-up (architecture + what doesn't automate yet): [LINK]

#AIEngineering #Automation #UAT #LLMAgents #Testing
