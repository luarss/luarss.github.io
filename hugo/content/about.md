---
title: "About"
layout: "about"
hideDescription: true
url: "/about/"
description: "I'm an AI & Systems Engineer at NUSX Labs building production LLM systems, agents, evals, data platforms, and GCP infrastructure. Previously Founding Engineer at SoraNova, AI Engineer at Espressif Systems, and Graduate Research Assistant at NUS (IROS 2021 Best Paper Award)."
keywords: ["Shui Song Luar", "AI engineer", "LLM systems", "LLM evals", "RAG", "agentic systems", "MCP", "GCP", "Terraform", "NUSX Labs", "SoraNova", "Espressif", "IROS 2021"]
summary: "I'm an AI & Systems Engineer at NUSX Labs working on production LLM systems, agents, evals, and cloud infrastructure."
---

I'm an AI & Systems Engineer at [NUSX Labs](https://github.com/nus-etp), part of [NUSX](https://nusx.edu.sg/). I build LLM systems and agents, and the cloud infrastructure they run on. I usually own an internal platform end to end, from design through to production and daily use. Recent work includes a claims approval system, our data pipelines, an LLM evaluation harness, and zero-trust access across our services.

Previously I was a Founding Engineer at [SoraNova](https://soranovaai.github.io), an AI Engineer at [Espressif Systems](https://www.espressif.com/), and a Graduate Research Assistant at NUS where I published a Best Paper Award-winning paper at IROS 2021.

---

## Experience

### AI & Systems Engineer · [NUSX Labs](https://github.com/nus-etp) {.role}
_Apr 2026 – Present · Singapore_

#### Agents & evals {.role-group}

- Built Arbiter, Gemini agents that screen startup applications (forms, pitch decks, videos) against programme rubrics: about 950 so far across Deep SAGE, BLOCK71 and AI Accelerate. A full BLOCK71 intake cost **under $4** in model calls
- Built its eval harness: golden datasets from 1,000+ real panel decisions across 4 cohorts, scored on held-out folds against how often human reviewers agree. On the Deep SAGE first round the AI's shortlist matched the panel at **F1 0.82** vs 0.76 between two human reviewers
- Used the evals to pick models and prompts per round: Flash for first rounds (higher AUC than Pro at a quarter of the cost), Pro for later ones, and a sceptical deck prompt that removed a consistent bias in team scores
- Ran a three-arm study for CRM company matching on a 143-row gold set with planted traps. Monday's built-in AI let 31 bad matches per 100 through; a fuzzy-match pipeline with Slack approval let **1** through, so we shipped it
- Hand-audited 466 page citations from an existing AI judge: **86% pointed at the wrong page** and 3% were made up. Replaced it with our own document processor

#### Internal platforms {.role-group}

- Built Purser, a full-stack claims and approval platform (Next.js, tRPC, Postgres) with role-based access and encrypted payee data. Claims go from senior approval straight into the university payment system, so **nobody re-keys them**
- Wrote a deterministic browser agent, with a human approval step, that fills the payment form in **~90s vs 20+ min** for a general-purpose LLM agent
- Built a BI request tracker on Cloud Run (dashboard, JSON API, MCP server) and moved 117 legacy requests into it, so agents can search one register. Mean turnaround dropped from **3.8 → 0.2 days**

#### Infrastructure & data {.role-group}

- Own NUSX's GCP infrastructure: Terraform across **6 projects**, 21 Ansible roles, keyless CI/CD and zero-trust access. Also ran the production launches and decommissioned the legacy estate
- Run NUSX's data platform: scheduled Cloud Run jobs and n8n workflows pull from **about 20 sources** (Salesforce, Monday, ACRA, PitchBook, finance systems) into a GCS data lake that feeds Power BI, Slack approval flows and our agents
- Run a self-hosted status page that alerts Slack for **10 internal and 5 external components**

### Founding Engineer · SoraNova {.role}
_Jun 2024 – Apr 2026 · Singapore_

- Owned the full build of an AI knowledge platform (FastAPI backend, multi-agent AI workflows, React frontend) from design to production
- Engineered a production RAG system with hybrid retrieval (PostgreSQL pgvector + keyword), improving answer relevance **25%** through semantic search and query caching
- Designed a multi-agent research system orchestrating **5 specialised LLM agents** (factual, technical, market, team, risk) for VC investment research reports
- Implemented an ML evaluation framework with DeepEval: **15+ metrics** across completeness, accuracy, relevance and quality
- Owned the DevOps pipeline: GitHub Actions CI/CD, Docker multi-stage builds, Packer GPU AMI workflows (T4/L4/A100), Ansible and Harbor container registry

### AI Engineer · Espressif Systems {.role}
_Sep 2022 – May 2024 · Singapore_

- Implemented ML algorithms (Graph Neural Networks, RL, Bayesian Optimisation, Simulated Annealing) for chip design, **saving 20% time** vs. manual baseline
- Developed an AI evaluation framework across **175+ Verilog benchmarks** using Pass@K, BLEU and Levenshtein metrics
- Managed distributed RL training infrastructure with **8× NVIDIA GPUs**

### Graduate Research Assistant · NUS {.role}
_Aug 2020 – Aug 2022 · Singapore_

- Applied deep RL to real-world robotic applications, outperforming classical control baselines
- Published paper at IROS 2021: **Best Paper Award**

---

## Open Source

### Open Source Contributor · OpenROAD {.role}
_May 2023 – Present_

OpenROAD is the leading open-source, foundational application for semiconductor digital design ([github.com/The-OpenROAD-Project/OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD))

- Automated generation of **~3000 Linux manpages** by parsing regexes from existing documentation, with CI and regression tests in Tcl and Python to keep the style consistent
- Led the LLM chatbot assistant project (ORAssistant) with 2 students, building modular components for data pipeline, fine-tuning, retrieval, evaluation and inference. Published at **WOSET 2024**
- Led productionisation of the OpenROAD AutoTuner, a Ray Tune wrapper for automatic hyperparameter tuning in the OpenROAD-flow: set up a test framework and **distributed autoscaling via Ray Cluster**
- Google Summer of Code mentor in **2024 and 2026**. This year I'm mentoring a student on openroad-mcp, an MCP server that lets chip designers debug OpenROAD runs with an AI assistant in real time

---

## Education

### M.Sc. Computer Science · National University of Singapore {.role}
_Aug 2020 – Oct 2022_

- Focus: Machine Learning, Deep Learning, Artificial Intelligence
- **IROS 2021 Best Paper Award**

### B.Eng. Electrical & Electronic Engineering · Nanyang Technological University {.role}
_Aug 2016 – Aug 2020_

- cGPA: **4.78 / 5.00**

---

## Skills

**AI & LLM** - RAG (pgvector, hybrid retrieval) · agents (LangGraph, MCP) · LLM evals · human-in-the-loop · Gemini / Vertex AI · Python

**Data** - n8n · BigQuery · GCS · Power BI · Cloud Run jobs

**Cloud & DevOps** - GCP · AWS · Terraform · Ansible · Docker · Kubernetes · zero-trust access · GitHub Actions

**Full Stack** - TypeScript · Next.js · React · tRPC · FastAPI · PostgreSQL

**ML Research** - PyTorch · deep RL · GNNs · Ray Tune · OpenROAD · Tcl

---

## Contact

- GitHub: [github.com/luarss](https://github.com/luarss)
- LinkedIn: [linkedin.com/in/song-luar](https://www.linkedin.com/in/song-luar/)
- Email: [me@luarss.dev](mailto:me@luarss.dev)
