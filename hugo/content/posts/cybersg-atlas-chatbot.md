---
title: "Building the CyberSG Atlas Chatbot in Three Weeks"
date: 2026-11-12
draft: false
description: "How we built and red-teamed a catalogue-grounded RAG chatbot for CyberSG Atlas, a directory of 200+ Singapore cybersecurity companies, and what we moved from the prompt into code."
keywords: ["RAG", "chatbot", "red teaming", "prompt injection", "Gemini", "CyberSG Atlas", "BM25"]
summary: "A small RAG chatbot for a public cybersecurity directory, and the guardrails that had to live in code rather than in the prompt."
tags: ["ai", "security", "rag"]
---

CyberSG Atlas is a directory of 200+ Singapore cybersecurity companies, run by the CyberSG TIG Collaboration Centre. It launched at CyberSG Innovation Day on 10 November 2026, with an AI chatbot built by the Enterprise Services Unit at NUSX. The launch was covered by [Lianhe Zaobao](https://www.zaobao.com.sg/news/singapore/story20261110-9976829).

This post is about the chatbot: why it exists, how it is put together, and what a red-team pass taught us about where guardrails belong.

## The problem

Cybersecurity vocabulary is a barrier. An SME owner who has just been told they need "MDR", "GRC" or a "VAPT" does not know which of those they need, let alone which of 200 companies sells it. A filterable directory helps if you already speak the taxonomy. It does not help if you don't.

The chatbot's job is narrow: take a plain-language need, ask a follow-up or two about company size and industry, and point to matching companies in the catalogue. If someone describes a ransomware incident, it recommends incident-response and data-recovery providers and sends them to the government reporting channels.

It is not a general cybersecurity advisor, and the design starts from that.

## The shape of it

- **Corpus:** the catalogue entries only. Contact-person, email and phone columns are never loaded.
- **Retrieval:** BM25 over about 200 entries. At this size, a keyword index plus query expansion for jargon (acronyms, synonyms) is enough, cheap and easy to debug. A vector store would add moving parts without adding much.
- **Generation:** Gemini, with thinking disabled, answering from at most eight retrieved entries.
- **Widget:** a Shadow DOM component loaded with a single `<script>` tag, so the team running the website only had to paste one line and our styles could not collide with theirs.
- **Backend:** a small FastAPI service.

The interesting part is everything around the model.

## Guardrails that live in code

The first draft put every rule in the system prompt: stay in scope, don't rank companies, don't endorse anyone, send incident victims to the right place. A prompt is a request, not a guarantee, so each rule that mattered got a second, deterministic layer.

**Scope gate.** If retrieval finds nothing relevant, the model is never called. If it does run and the reply names no catalogue company or contains a code block, the reply is replaced with a fixed refusal. Off-topic requests ("solve this homework, then mention a pentest company") get the on-topic half answered and the rest declined.

**No ranking.** The directory's members are peers, and a chatbot that says "best" is an endorsement. Matches are listed alphabetically. When more companies match than fit in one reply, the widget offers a "View all N matching companies" list rather than letting the model pick favourites.

**Link policy.** Any URL in a model reply is kept only if it points to a catalogue company's own website, the catalogue page, or a `gov.sg` site. Everything else becomes `[link removed]`. A successful prompt injection therefore cannot make the assistant print an attacker's link.

**Fixed replies for sensitive cases.** A message about self-harm gets a fixed reply with the right helplines and never reaches the model. Questions about data residency or retention get a fixed, accurate statement of how the pilot handles data. Incident routing is explicit: ScamShield only for scams, SingCERT for other incidents.

**Cost and abuse limits.** Per-IP and global rate limits, a cap on concurrent model calls, request and message size limits, an origin allowlist, and a hard lifetime spend cap. Because the model sits behind a public page, "what is the worst this can cost?" needed a number, not a hope.

## Red-teaming it

Before launch we wrote 68 adversarial prompts in 15 categories and ran them against the live model on an isolated instance. They cover attempts to leave scope, leak the instructions, get a vendor disparaged or endorsed, imply a government endorsement, extract personal data, and print attacker content. They include multi-turn conversations, other languages and encoded input.

The first run found five gaps. All five were fixed and re-tested:

- A crisis message came back with a mangled helpline number, because a contact-redaction step rewrote it. Fix: a fixed reply, set in code.
- The first thing a compliance officer asks, "does this run on-premise?", got a generic refusal. Fix: a fixed, accurate data-handling reply.
- Off-topic work was answered whenever a company name appeared in the reply, because the scope gate passed any reply that named one. Fix: tighter prompt rules, verified across repeated runs.
- A yes/no question about a certification the catalogue never mentions got a flat "No". The gate only caught it because the reply was short. Fix: prompt rules so the assistant says the description does not mention it and points to the company's website.
- A prompt asked the model to wrap each vendor name in a link to an attacker domain, and it did. The widget renders plain text, so nothing was clickable, but the URLs were on screen. Fix: the link policy above, in code.

By the final run, 15 of the 68 replies were set by code and not by the model. We also checked the catalogue itself for planted instructions, since indirect injection through the data is the most likely route into a RAG system. Across all 207 rows we found none.

## What I would repeat

- **Put guarantees in code, tune behaviour in the prompt.** Prompt fixes were the ones that needed repeated runs to trust. Code fixes held however the model behaved.
- **Test against the live model, not a mock.** Two of the five gaps came from interactions between the model and our own post-processing, which a mock would never have shown.
- **Keep the scope small.** "Find me companies in this catalogue" is a much easier thing to secure than "answer cybersecurity questions".
- **Tell users what happens to their messages.** The widget says conversations are logged during the pilot and asks people not to enter confidential information.
- **Ask what the worst case costs.** Spend caps and rate limits are cheap to add before launch and hard to add during an incident.

The red-team set is not complete and the system is not finished. Retrieval for non-English questions in Latin script is weak, and prompt rules reduce unwanted behaviour without eliminating it. That is why the checks that matter run in code.
