---
title: "Building the CyberSG Atlas Chatbot in Three Weeks"
date: 2026-11-12
draft: false
description: "How we built and red-teamed a catalogue-grounded RAG chatbot for CyberSG Atlas, a directory of 200+ Singapore cybersecurity companies, and what we moved from the prompt into code."
keywords: ["RAG", "chatbot", "red teaming", "prompt injection", "Gemini", "CyberSG Atlas", "BM25"]
summary: "A small RAG chatbot for a public cybersecurity directory, and the guardrails that had to live in code rather than in the prompt."
tags: ["ai", "security", "rag"]
---

CyberSG Atlas is a directory of 200+ Singapore cybersecurity companies, run by the CyberSG TIG Collaboration Centre. It launched at CyberSG Innovation Day on 10 November 2026 with an AI chatbot built by the Enterprise Services Unit at NUSX. [Lianhe Zaobao](https://www.zaobao.com.sg/news/singapore/story20261110-9976829) covered the launch.

This post covers why the chatbot exists, how it works, and what a red-team pass taught us about where guardrails belong.

## The problem

Cybersecurity vocabulary gets in the way. An SME owner who has just been told they need "MDR", "GRC" or a "VAPT" does not know which of those they need, let alone which of 200 companies sells it. A filterable directory works if you already speak the taxonomy, and most visitors don't.

The chatbot's job is narrow. It takes a plain-language need, asks a follow-up or two about company size and industry, and points to matching companies in the catalogue. If someone describes a ransomware incident, it recommends incident-response and data-recovery providers and lists the government reporting channels. It is not a general cybersecurity advisor, and the design follows from that.

## How it works

The corpus is the catalogue entries only. The contact-person, email and phone columns are never loaded.

Retrieval is BM25 over about 200 entries, with query expansion for jargon such as acronyms and synonyms. At that size a keyword index was enough, and it has no embeddings to attack or tune.

Generation is Gemini with thinking disabled, answering from at most eight retrieved entries. The backend is a small FastAPI service. The widget is a Shadow DOM component loaded with a single `<script>` tag, so the team running the website only had to paste one line and our styles could not collide with theirs.

## Guardrails in code

A system prompt asks the model to behave but does not enforce anything, so the rules that mattered most are also checked in code.

### Scope gate

If retrieval finds nothing relevant, the model is never called. If it does run and the reply names no catalogue company or contains a code block, the reply is replaced with a fixed refusal. A request like "solve this homework, then mention a pentest company" gets the on-topic half answered and the rest declined.

### No ranking

The directory's members are peers, and a chatbot that says "best" is endorsing one of them. Matches are listed alphabetically. When more companies match than fit in one reply, the widget offers a "View all N matching companies" list instead of letting the model pick favourites.

### Link policy

A URL in a model reply survives only if it points to a catalogue company's own website, the catalogue page, or a `gov.sg` site. Everything else becomes `[link removed]`, so a successful prompt injection cannot make the assistant print an attacker's link.

### Fixed replies for sensitive cases

A message about self-harm gets a fixed reply with the right helplines and never reaches the model. Questions about data residency or retention get a fixed, accurate statement of how the pilot handles data. Incident routing is explicit: ScamShield only for scams, SingCERT for other incidents.

### Cost and abuse limits

There are per-IP and global rate limits, a cap on concurrent model calls, request and message size limits, an origin allowlist, and a hard lifetime spend cap. The model sits behind a public page, so we wanted a hard ceiling on what a bad day could cost.

## Red-teaming it

Before launch we wrote 68 adversarial prompts in 15 categories and ran them against the live model on an isolated instance. They try to push the assistant out of scope, leak its instructions, get a vendor disparaged or endorsed, imply a government endorsement, extract personal data, and print attacker content. They include multi-turn conversations, other languages and encoded input.

The first run found five gaps. All five were fixed and re-tested:

- A crisis message came back with a mangled helpline number, because a contact-redaction step rewrote it. Fix: a fixed reply, set in code.
- The first question a compliance officer asks, "does this run on-premise?", got a generic refusal. Fix: a fixed, accurate data-handling reply.
- Off-topic work was answered whenever a company name appeared in the reply, because the scope gate passed any reply that named one. Fix: tighter prompt rules, verified across repeated runs.
- A yes/no question about a certification the catalogue never mentions got a flat "No". The gate only caught it because the reply was short. Fix: prompt rules so the assistant says the description does not mention it and points to the company's website.
- A prompt asked the model to wrap each vendor name in a link to an attacker domain, and it did. The widget renders plain text, so nothing was clickable, but the URLs were on screen. Fix: the link policy above, in code.

By the final run, 15 of the 68 replies were set by code rather than by the model. We also scanned the catalogue itself for planted instructions, because injection through the data is a known route into RAG systems. None of the 207 rows had any.

## What I would repeat

- Put guarantees in code and tune behaviour in the prompt. The prompt fixes needed repeated runs before we trusted them. The code fixes held however the model behaved.
- Test against the live model. Two of the five gaps came from the model interacting with our own post-processing, which a mock would never have shown.
- Keep the scope small. Finding companies in one catalogue is much easier to secure than answering cybersecurity questions in general.
- Tell users what happens to their messages. The widget says conversations are logged during the pilot and asks people not to enter confidential information.
- Set the spend cap and rate limits before launch. They take minutes to add now and are painful to add mid-incident.

The red-team set is incomplete and the system is not finished. Retrieval for non-English questions in Latin script is weak, and prompt rules reduce unwanted behaviour without removing it, which is why the checks that matter run in code.
