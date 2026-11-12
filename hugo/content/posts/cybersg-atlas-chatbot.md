---
title: "Building the CyberSG Atlas Chatbot in Four Weeks"
date: 2026-11-12
draft: false
description: "How we built and red-teamed a catalogue-grounded RAG chatbot for CyberSG Atlas, a directory of 200+ Singapore cybersecurity companies, what we moved from the prompt into code, and what the first traces taught us."
keywords: ["RAG", "chatbot", "red teaming", "prompt injection", "Gemini", "CyberSG Atlas", "BM25"]
summary: "A small RAG chatbot for a public cybersecurity directory, the guardrails that had to live in code rather than in the prompt, and the retrieval bugs real questions found."
tags: ["ai", "security", "rag"]
---

CyberSG Atlas is a directory of 200+ Singapore cybersecurity companies, run by the CyberSG TIG Collaboration Centre. It launched at CyberSG Innovation Day on 10 November 2026 with an AI chatbot built by the Enterprise Services Unit at NUSX. [Lianhe Zaobao](https://www.zaobao.com.sg/news/singapore/story20261110-9976829) covered the launch.

## The problem

Cybersecurity vocabulary gets in the way. An SME owner who has just been told they need "MDR", "GRC" or a "VAPT" does not know which of those they need, let alone which of 200 companies sells it. A filterable directory works if you already speak the taxonomy, and most visitors don't.

The chatbot's job is narrow. It takes a plain-language need, asks about company size and industry, and points to matching companies in the directory. If someone describes a ransomware incident, it gives the government reporting channel first and then lists incident-response and data-recovery providers. It does not give general cybersecurity advice, and most of the guardrails below exist to keep it that way.

## How it works

The corpus is the directory entries only. The contact-person, email and phone columns are never loaded.

Retrieval is BM25 over about 200 entries, with query expansion for jargon such as acronyms and synonyms. At that size a keyword index was enough, and it has no embeddings to attack or tune.

Generation is Gemini with thinking disabled, answering from at most eight retrieved entries. A question written in a non-Latin script, such as Chinese, first gets one short model call that turns it into English search keywords. The keywords are used only for retrieval, and the answer is written in the user's language.

The backend is a small FastAPI service. The widget is a Shadow DOM component loaded with a single `<script>` tag, so the team running the website only had to paste one line and our styles could not collide with theirs.

## Guardrails in code

A system prompt asks the model to behave but does not enforce anything, so the rules that mattered most are also checked in code.

![Request pipeline: nine steps from the incoming question to the widget. Only two can call the model; four exits return a rejection, fixed reply, code-built list or refusal without showing a model answer.](/img/cybersg-atlas-chatbot/request-pipeline.svg)

### Scope gate

If retrieval finds nothing relevant, the model is never called. If it does run and the reply names no directory company or contains a code block, the reply is replaced with a fixed refusal. A request like "solve this homework, then mention a pentest company" gets the on-topic half answered and the rest declined.

### No ranking

The directory's members are peers, and a chatbot that says "best" is endorsing one of them. Matches are listed alphabetically. When more companies match than fit in one reply, the widget offers a "View all N matching companies" list instead of letting the model pick favourites.

### Link policy

A URL in a model reply survives only if it points to a directory company's own website, the directory page, or a `gov.sg` site. Everything else becomes `[link removed]`, so a successful prompt injection cannot make the assistant print an attacker's link. The widget makes a link clickable only for two official hosts, SingCERT's and ScamShield's. Reply text is model output, so anything else that slips past the policy stays inert.

### Fixed replies for sensitive cases

A message about self-harm gets a fixed reply with the right helplines and never reaches the model. Questions about which model is used, where data goes and how long it is kept get a fixed, accurate statement of how the pilot handles data. Mid-conversation, the model once claimed to be "a local AI model" that sent nothing to Google. Any reply that claims a local model or denies sending or logging is now refused in code.

### Notices the prompt kept dropping

Some sentences have to appear every time: SingCERT for a company reporting an attack, and CSA's Cyber Essentials and Cyber Trust programmes for a question about improving security posture. The prompt asked for both, and the model included them on one run and left them out on the next. Now the code checks the question, and if the reply lacks the approved sentence, it adds it at the top. ScamShield is mentioned only when the message is about a scam.

### History is not trusted

The client sends the conversation back with each question, so assistant turns are signed and a forged history is rejected. We also strip our own appended text from earlier turns before they go back to the model. We learned that one after launch: a tester asked the same question eight times in one chat, and the model copied old "N more companies also match" notices from history until three stale ones were stacked in one reply.

### Cost and abuse limits

There are per-IP and global rate limits, a cap on concurrent model calls, request and message size limits, an origin allowlist, and a hard lifetime spend cap. The model sits behind a public page, so we wanted a hard ceiling on what a bad day could cost.

## Red-teaming it

Before launch we wrote 68 adversarial prompts in 15 categories and ran them against the live model on an isolated instance. They try to push the assistant out of scope, leak its instructions, get a vendor disparaged or endorsed, imply a government endorsement, extract personal data, and print attacker content. They include multi-turn conversations, other languages and encoded input.

The first run found five gaps. All five were fixed and re-tested:

- A crisis message came back with a mangled helpline number, because a contact-redaction step rewrote it. Fix: a fixed reply, set in code.
- The first question a compliance officer asks, "does this run on-premise?", got a generic refusal. Fix: a fixed, accurate data-handling reply.
- Off-topic work was answered whenever a company name appeared in the reply, because the scope gate passed any reply that named one. Fix: tighter prompt rules, verified across repeated runs. The gate still cannot see off-topic text next to a company name, so this one remains a prompt-level fix.
- A yes/no question about a certification the directory never mentions got a flat "No". The gate only caught it because the reply was short. Fix: prompt rules so the assistant says the description does not mention it and points to the company's website.
- A prompt asked the model to wrap each vendor name in a link to an attacker domain, and in one of four runs it did. The widget rendered plain text then, so nothing was clickable, but the URLs were on screen. Prompt rules did not stop it. Fix: the link policy above, in code.

By the final run, 15 of the 68 replies were set by code rather than by the model.

We also scanned the directory itself, because injection through the data is a known route into RAG systems. None of the 207 rows had planted instructions. A third of them had something milder: self-descriptions such as "#1", "global leader" or "CSA-Approved". When the model repeats those without saying who made the claim, the directory sounds like it agrees. The prompt now labels descriptions as the company's own unverified words and requires approvals to be attributed. In a 72-prompt rerun, unattributed repeats fell from 8 replies to 6.

## What real questions found

Questions and answers are logged during the pilot, and the widget says so. Reading those logs found retrieval bugs the red team missed. The red team only wrote attacks, and these were ordinary questions answered badly.

Category labels polluted keyword search. 102 of 208 companies tick a category labelled "Detection & Monitoring (eg. SIEM / SOC / XDR)", so half the directory contained the word "SOC". "Managed SOC services" matched 101 companies and "SIEM" matched 99. Filler words and the "(eg. …)" part of labels now count a quarter as much, which brings those to 35 and 14.

A niche question matched half the directory. A question about embedded security for SSDs reported 116 to 125 matching companies across repeated runs, when only a handful fit. Two causes: a sub-category tag added companies with no text match at all, and a long question cleared the match threshold on generic words alone. Tags now rank results but no longer add matches, and rare words in the question narrow the list when the top matches contain them. If matches still exceed half the directory, the reply points to the directory instead of listing them. The SSD question now gives 10. We considered a fixed cap of 25 and dropped it, because it would also cut accurate broad lists such as the 75 penetration-testing firms.

![Dumbbell chart of matching-company counts out of 208: SSD question 123 to 10, cyber-attack question 106 to a directory link, managed SOC services 101 to 35, SIEM 99 to 14, penetration testing 83 to 75.](/img/cybersg-atlas-chatbot/match-counts.svg)

Acronyms in company names collide with English words. Users look companies up by the acronym in brackets in their name, and one of those acronyms is "CARE". "What does CARE do?" should find the company and "I care about ransomware" should not, so a lowercase acronym only counts when it is not also an ordinary word.

Non-Latin questions found nothing. BM25 here tokenises `[a-z0-9]`, so a question in Chinese had no search terms and was refused as out of scope. That is what the keyword-rewrite step above fixes, at the cost of one small model call for those questions only.

## What I would repeat

- Put guarantees in code and tune behaviour in the prompt. The prompt fixes needed repeated runs before we trusted them. The code fixes held however the model behaved.
- Test against the live model. Two of the five red-team gaps came from the model interacting with our own post-processing, which a mock would never have shown.
- Replay a prompt change several times before shipping it. One routing change sent "my company has been infected with a virus" to SingCERT alone instead of to incident-response vendors, and a single run cannot tell a regression from run-to-run variation.
- Read the logs after launch. Every retrieval fix in the previous section came from a real question that none of our tests covered.
- Keep the scope small. Finding companies in one directory is much easier to secure than answering cybersecurity questions in general.
- Tell users what happens to their messages. The widget says conversations are logged during the pilot and asks people not to enter confidential information.
- Set the spend cap and rate limits before launch. They take minutes to add now and are painful to add mid-incident.

The system is not finished. Non-English questions in Latin script, such as Malay, Indonesian or Vietnamese, are not rewritten and still miss retrieval. Vendor self-claims still slip through now and then, and the check against off-topic answers next to a company name still depends on the prompt.
