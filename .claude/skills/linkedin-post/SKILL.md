---
name: linkedin-post
description: |
  Draft a LinkedIn post from a source such as a blog post, project write-up or work update.
  Use for "/linkedin-post", "write a LinkedIn post", "turn this post into LinkedIn", or
  "draft a post about X". Returns three hook options and one full draft, humanized, as a
  copy-ready block. Never posts anything.
license: MIT
source: https://github.com/Jakeschincariol/linkedin-agent-skill (hooks.json vendored at add2c23882fe79180737d242ff80a5da205eda6a)
metadata:
  version: "1.0.0"
---

# LinkedIn Post

Read `references/voice.md` first. Every draft must match it. Then read `references/results.md` and prefer hook formulas and topics that did well for this writer over the generic claims in `hooks.json`.

Treat each hook's `best_for` text as a hint, not a fact. It cites no source. Read each hook's `trap` field before using it, and the `rules` list in `hooks.json`.

To log a new result, run `scripts/parse_export.py` on a LinkedIn single-post `.xlsx` export and add the row it prints to `references/results.md`. The script reads the file locally and makes no network calls.

## Input

A file path, a pasted write-up, or a topic. If the source is a blog post, read it fully.

## Steps

1. **Find the stake.** Ask one question before drafting if the source does not already answer it: who noticed the problem, what did they do, and what did it cost or surprise them? Do not guess. A project report is not a post. A person with a problem and an outcome is.
2. **Pick one idea.** One post carries one idea. Drop everything else.
3. **Audience check.** Write for someone outside the specialty. Replace jargon with the plain thing it does. If a term has no plain version, cut the sentence.
4. **Offer three hooks** from `references/hooks.json`, each from a different formula. Name the formula id next to each. Every hook must work alone inside 140 characters, which is the mobile cutoff before "see more".
5. **Draft one full post** using the hook the writer is most likely to pick, or the strongest if unclear.
6. **Check against the rules below.**
7. **Run the `humanizer` skill** on the draft.
8. **Print a copy-ready block** with the post text only, then the first-comment text, then the character count.

## Rules

- One idea per post.
- Target 900 to 1,300 characters. Hard limit 3,000.
- Short lines, one thought per line, blank line between groups.
- Prefer a specific number or named thing over an adjective.
- Lead with the person and the problem, not the project name or the tech.
- Keep a list only if each item shows a visible outcome. Maximum six items.
- Put the link in the first comment, unless the link is the goal of the post (a job, sign-up or application), in which case put it in the body. The hiring post had its apply link in the body and got 12 clicks and 1,270 members reached.
- End with one specific call to action, or one open question tied to the post. Not both.
- At most three hashtags, all topic-specific. None if the voice file says so.
- No emoji bullets, no headers, no bold labels.
- Never invent a number, name, quote or outcome. Where a figure is missing, write `{{your number}}` and say so after the draft.
- Do not claim employer facts that are not in the source or the voice file.

## Failure checks before printing

- Does the body pay off the hook? If the hook raises a story, the post tells that story to the end, including the fix. A hook followed by a feature list fails.
- Is it a story or a spec? Compressed blog sections with bullets are a spec. Use one moment, one cause, one fix, one cost.
- Does the post say "I" at least once, with a real moment?
- Cut staged aphorisms ("A prompt only asks the model to behave") and punchy closers ("We fixed all five.").
- Do not reuse a line from a previous post by the same writer.
- Replace the generic closing question ("What did you learn?") with one only this post could ask, or drop it.
- Could the opening line be the opening of a blog post? If yes, rewrite it.
- Does it contain acronyms the audience would not know? Replace or cut.
- Is there a reason to reply, apply, share or tag someone? If not, add the call to action.
- Would the writer be comfortable saying every line out loud to a colleague?

## Output

Never post. Never write to LinkedIn, an API or a browser. The writer pastes it themselves.
