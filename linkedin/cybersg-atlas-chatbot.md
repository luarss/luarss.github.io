# LinkedIn post, companion to hugo/content/posts/cybersg-atlas-chatbot.md

> Not built by Hugo (lives outside hugo/content/).

---

CyberSG Atlas launched on 10 November: a directory of 200+ Singapore cybersecurity companies, run by the CyberSG TIG Collaboration Centre, with an AI chatbot we built at NUSX.

The problem it solves is vocabulary. If you have been told you need "MDR" or "GRC", you probably can't tell which of 200 companies sells it. The chatbot takes a plain-language need, asks about company size and industry, and points to matching companies in the catalogue. For a ransomware victim it also lists the government reporting channels.

Three weeks from start to launch. What I would repeat:

1. Put guarantees in code, tune behaviour in the prompt. If retrieval finds nothing, the model is never called. A reply that names no catalogue company is swapped for a fixed refusal. Any link not on an allowlist is stripped.

2. Red-team against the live model. 68 adversarial prompts in 15 categories found five gaps on the first run, and we fixed all five. Two came from how the model interacted with our own post-processing, which a mock would never have shown.

3. Keep the scope small. "Find companies in this catalogue" is far easier to secure than "answer cybersecurity questions".

4. Put a number on the worst case. Rate limits and a hard spend cap went in before launch, because the chatbot sits behind a public page.

It isn't finished. Non-English retrieval is weak, and prompt rules reduce bad behaviour without eliminating it, which is why the checks that matter run in code.

Write-up: https://luarss.dev/posts/cybersg-atlas-chatbot/

Thanks to Louis Wong and the TIG team for the trust and the fast feedback loops.

#RAG #AISecurity #Cybersecurity #Singapore
