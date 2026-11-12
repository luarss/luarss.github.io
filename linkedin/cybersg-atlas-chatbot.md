# LinkedIn post, companion to hugo/content/posts/cybersg-atlas-chatbot.md

> Not built by Hugo (lives outside hugo/content/).

---

CyberSG Atlas launched on 10 November: a directory of 200+ Singapore cybersecurity companies, run by the CyberSG TIG Collaboration Centre, with an AI chatbot we built at NUSX.

The problem is vocabulary. If you have been told you need "MDR" or "GRC", you probably can't tell which of 200 companies sells it. The chatbot takes a plain-language need, asks about company size and industry, and points to matching companies in the directory. For a company hit by ransomware it gives the government reporting channel first.

Four weeks from first commit to launch. What I would repeat:

1. Put guarantees in code, tune behaviour in the prompt. If retrieval finds nothing, the model is never called. A reply that names no directory company is swapped for a fixed refusal. Any link not on an allowlist is stripped. Notices that must always appear, like SingCERT for a company under attack, are added in code because the model dropped them on some runs.

2. Red-team against the live model. 68 adversarial prompts in 15 categories found five gaps on the first run, and we fixed all five. Two came from the model interacting with our own post-processing, which a mock would never have shown.

3. Read the logs after launch. Real questions found bugs the red team never would: "SIEM" matched 99 companies because half the directory ticks one category label, and a niche question about embedded security for SSDs matched 123 companies when only a handful fit.

4. Keep the scope small. Finding companies in one directory is much easier to secure than answering cybersecurity questions in general.

5. Set the spend cap and rate limits before launch. The chatbot sits behind a public page.

It isn't finished. Chinese questions now work, but Malay and other Latin-script languages still miss retrieval, and the check against off-topic answers next to a company name still depends on the prompt.

Write-up: https://luarss.dev/posts/cybersg-atlas-chatbot/

Thanks to Louis Wong and the TIG team for the fast feedback.

#RAG #AISecurity #Cybersecurity #Singapore
