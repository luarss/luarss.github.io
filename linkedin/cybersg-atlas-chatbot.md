# LinkedIn post, companion to hugo/content/posts/cybersg-atlas-chatbot.md

> Not built by Hugo (lives outside hugo/content/).

---

CyberSG Atlas launched on 10 November: a directory of 200+ Singapore cybersecurity companies, run by the CyberSG TIG Collaboration Centre, with an AI chatbot we built at NUSX.

If you've been told you need "MDR" or "GRC", you probably can't tell which of 200 companies sells it. The chatbot takes a plain-language need and points you to matching companies.

Four weeks from first commit to launch. What I'd repeat:

1. Put guarantees in code, not the prompt. No retrieval match, no model call. Unknown links get stripped. Must-show notices like SingCERT are added in code.
2. Red-team the live model. 68 adversarial prompts found five gaps; two only showed up because of our own post-processing.
3. Read the logs after launch. "SIEM" matched 99 companies. Real users find bugs red teams don't.
4. Keep the scope small, and set spend caps and rate limits before going public.

Write-up: https://luarss.dev/posts/cybersg-atlas-chatbot/

Thanks to Willis and his team, and to Louis Wong and the TIG team, for the fast feedback. It was a fun one to build.

#RAG #AISecurity #Cybersecurity #Singapore
