---
title: "About"
layout: "about"
url: "/about/"
description: "I'm an AI & Systems Engineer at NUS Enterprise building production LLM systems, agents, evals, data platforms, and GCP infrastructure. Previously Founding Engineer at SoraNova, AI Engineer at Espressif Systems, and Graduate Research Assistant at NUS (IROS 2021 Best Paper Award)."
keywords: ["Shui Song Luar", "AI engineer", "LLM systems", "LLM evals", "RAG", "agentic systems", "MCP", "GCP", "Terraform", "NUS Enterprise", "SoraNova", "Espressif", "IROS 2021"]
summary: "I'm an AI & Systems Engineer at NUS Enterprise working on production LLM systems, agents, evals, and cloud infrastructure."
---

I'm an AI & Systems Engineer at NUS Enterprise. I build LLM systems and agents, plus the cloud infrastructure they run on, and I usually take an internal platform from an empty repo to daily use. Recent ones include a claims approval system, our data pipelines, an LLM evaluation harness, and zero-trust access to everything.

Previously I was a Founding Engineer at [SoraNova](https://soranovaai.github.io), an AI Engineer at [Espressif Systems](https://www.espressif.com/), and a Graduate Research Assistant at NUS where I published a Best Paper Award-winning paper at IROS 2021.

---

## Experience

**AI & Systems Engineer - NUS Enterprise** _(Apr 2026 – Present, Singapore)_

- Built Arbiter, Gemini agents that screen startup applications (forms, pitch decks, videos) against programme rubrics. They have screened about 950 applications across Deep SAGE, BLOCK71 and AI Accelerate; a full BLOCK71 intake cost under $4 in model calls
- Built the eval harness behind it: golden datasets from 1,000+ real panel decisions across 4 cohorts, scored on held-out folds against how often human reviewers agree with each other. On the Deep SAGE first round, the AI's shortlist matched the panel at F1 0.82, above the 0.76 two human reviewers reach
- Used those evals to choose models and prompts per round: Flash over Pro for first-round screening (higher AUC at a quarter of the cost), Pro for later rounds, and a sceptical prompt for reading decks that removed a consistent bias in team scores
- Ran a three-arm study for CRM company matching on a 143-row gold set with planted traps. Monday's built-in AI let 31 bad matches per 100 through; a fuzzy-match pipeline with Slack approval let 1 through, so we shipped the pipeline
- Audited 466 page citations from an existing AI judge by hand: 86% pointed at the wrong page and 3% were made up. Replaced it with our own document processor
- Built Purser, a full-stack claims and approval platform (Next.js, tRPC, Postgres) with role-based access and encrypted payee data. Claims go from senior approval straight into the university payment system, so nobody re-keys them
- Wrote a deterministic browser agent, with a human approval step, that fills the payment form in about 90s. A general-purpose LLM agent took over 20 min for the same form
- Own NUSX's GCP infrastructure: Terraform across 6 projects, 21 Ansible roles, keyless CI/CD, and zero-trust access. Also ran the production launches and decommissioned the legacy estate
- Run NUSX's data platform: scheduled Cloud Run jobs and n8n workflows pull from about 20 sources (Salesforce, Monday, ACRA, PitchBook, finance systems) into a GCS data lake that feeds Power BI, Slack approval flows and our agents. Also run a self-hosted status page that alerts Slack for 10 internal and 5 external components
- Built a BI request tracker on Cloud Run (dashboard, JSON API, MCP server) and moved 117 legacy requests into it, so agents can search one register. Mean turnaround dropped from 3.8 days to 0.2

**Founding Engineer - SoraNova** _(Jun 2024 – Apr 2026, Singapore)_

- Owned the full build of an AI knowledge platform - FastAPI backend, multi-agent AI workflows, and React frontend - from empty repo to production
- Engineered a production RAG system with hybrid retrieval (PostgreSQL pgvector + keyword), improving answer relevance 25% through semantic search and query caching
- Designed a multi-agent research system orchestrating 5 specialised LLM agents (factual, technical, market, team, risk) for comprehensive VC investment research reports
- Implemented ML evaluation framework with DeepEval - 15+ metrics across completeness, accuracy, relevance, and quality
- Owned complete DevOps pipeline: GitHub Actions CI/CD, Docker multi-stage builds, Packer GPU AMI workflows (T4/L4/A100), Ansible, and Harbor container registry

**AI Engineer - Espressif Systems** _(Sep 2022 – May 2024, Singapore)_

- Implemented ML algorithms (Graph Neural Networks, RL, Bayesian Optimisation, Simulated Annealing) for chip design, saving 20% time vs. manual baseline
- Developed AI evaluation framework across 175+ Verilog benchmarks using Pass@K, BLEU, and Levenshtein metrics
- Managed distributed RL training infrastructure with 8× NVIDIA GPUs

**Graduate Research Assistant - NUS** _(Aug 2020 – Aug 2022, Singapore)_

- Applied deep RL to real-world robotic applications, outperforming classical control baselines
- Published paper at IROS 2021 - **Best Paper Award**

---

## Open Source

**Open Source Contributor - OpenROAD** _(May 2023 – Present)_

OpenROAD is the leading open-source, foundational application for semiconductor digital design ([github.com/The-OpenROAD-Project/OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD))

- Automated the generation of ~3000 Linux manpages by parsing regexes from existing documentation, and ensured style consistency by creating CI and regression tests in Tcl and Python
- Led LLM chatbot assistant project (ORAssistant) with 2 students by building highly modular components - data pipeline, fine-tuning, retrieval, evaluation and inference. This project is published at WOSET 2024
- Led efforts in implementing the productionization of the OpenROAD AutoTuner, by setting up a test framework, distributed autoscaling via Ray Cluster. The AutoTuner is a wrapper of Ray Tune for automatic hyperparameter tuning in the OpenROAD-flow
- Google Summer of Code mentor in 2024 and 2026. This year I'm mentoring a student on openroad-mcp, an MCP server that lets chip designers debug OpenROAD runs with an AI assistant in real time

---

## Education

**M.Sc. Computer Science - National University of Singapore** _(Aug 2020 – Oct 2022)_

- Focus: Machine Learning, Deep Learning, Artificial Intelligence
- IROS 2021 Best Paper Award

**B.Eng. Electrical & Electronic Engineering - Nanyang Technological University** _(Aug 2016 – Aug 2020)_

- cGPA: 4.78 / 5.00

---

## Skills

**Production AI & LLM Systems** - RAG (hybrid retrieval, embeddings, re-ranking, pgvector, FAISS) · agentic systems and tool calling (LangGraph, MCP) · LLM evals (golden datasets, DeepEval) · guardrails and human-in-the-loop design · LLM fine-tuning · PyTorch · Python · PostgreSQL · Docker

**Cloud Infrastructure & DevOps** - GCP (Vertex AI, Gemini Enterprise, BigQuery, Cloud Run) · AWS · Terraform · Ansible · Twingate · Kubernetes · Nomad · GitHub Actions

**Full Stack** - React · Next.js · tRPC · TypeScript · FastAPI · PostgreSQL · Redis

**Robotics & Deep RL** - PyTorch · TensorFlow · OpenCV · ROS

---

## Contact

- GitHub: [github.com/luarss](https://github.com/luarss)
- LinkedIn: [linkedin.com/in/song-luar](https://www.linkedin.com/in/song-luar/)
- Email: [me@luarss.dev](mailto:me@luarss.dev)
