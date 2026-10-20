---
title: "OpenROAD MCP: Let AI Close Your Timing"
date: 2026-02-19
draft: false
description: "OpenROAD MCP is a server that lets AI assistants like Claude Code talk directly to a live OpenROAD process, so timing analysis and constraint fixes happen in one conversation."
keywords: ["OpenROAD", "MCP", "timing closure", "VLSI", "Claude Code", "EDA"]
summary: "Introducing OpenROAD MCP, which lets AI assistants like Claude Code analyze timing and adjust constraints on a live OpenROAD session."
tags: ["ai", "mcp", "opensource", "openroad"]
---

Here's a situation every VLSI engineer knows. You're staring at debug logs. There are 23 setup violations. WNS is -0.05 ns. The clock period is 0.46 ns and the design just won't close.

You already know the answer is probably in the constraints. But confirming that means reading the critical paths, estimating what the design can actually achieve, adjusting the SDC, re-running the flow, and checking again. An hour of mechanical work to answer a question you could have answered in thirty seconds if someone handed you the right report and asked the right question.

That's the loop I wanted to break. So I built **OpenROAD MCP** — a server that lets AI assistants like Claude Code talk directly to a live OpenROAD process.

---

## What It Actually Does

Instead of explaining it abstractly, here's a real example you can run yourself.

### Demo: Closing Timing on nangate45/gcd

The nangate45/gcd design ships with a 0.46 ns clock constraint that fails timing out of the box:

```
WNS: -0.05 ns
TNS: -0.53 ns
Setup violations: 23
Status: FAILED
```

With OpenROAD MCP installed, open Claude Code and type:

> *"Create an OpenROAD session, load the nangate45 GCD design from ORFS, and tell me where the timing failures are."*

The AI creates a session, loads the design, and runs `report_checks` and `report_clock_min_period`. It reads the critical path output — the worst offender is a 0.42 ns path through `dpath.a_reg` that the 0.46 ns constraint (after I/O delay deductions) only allows 0.37 ns for — and comes back with a diagnosis:

> *"The 0.46 ns clock period is too aggressive for this design. The minimum achievable period is approximately 0.51 ns. I recommend relaxing the constraint to 0.52 ns."*

You tell it to make the change. It writes an updated SDC, reruns the flow, and reports back:

```
WNS: ~0.00 ns
TNS: ~0.00 ns
Setup violations: 4 (negligible slack)
Status: PASSED
Tradeoff: -12% frequency (1914 MHz vs 2174 MHz target)
```

The full demo files — original SDC, relaxed SDC, and a run script — are in [`demo/orfs-gcd-timing/`](https://github.com/luarss/openroad-mcp/tree/main/demo/orfs-gcd-timing) in the repo.

That whole loop — load, analyze, diagnose, fix, verify — in one conversation. No copy-pasting report output into a chat window. No context switching. The AI has the live design state and reasons over it directly.

---

## How It Works

OpenROAD expects an interactive terminal. Using a plain subprocess pipe gives you buffering issues, broken prompts, and unreliable output. Instead, OpenROAD MCP creates a **PTY (pseudo-terminal)** for each session — OpenROAD sees a real terminal and behaves exactly as it would in an interactive shell. Background threads drain stdout continuously; a queue accumulates output until the prompt returns.

Sessions persist across commands. You load LEF, then Liberty, then Verilog, then SDC — building up design state exactly as you would manually. The `SessionManager` can hold multiple concurrent sessions, which matters for design space exploration: run the same design with three SDC variants in parallel, collect the results, pick the winner.

The MCP server exposes tools for creating and managing sessions, executing Tcl commands, and reading ORFS report images (congestion maps, routing density plots) as data the AI can reason about. Full tool list is in the [README](https://github.com/luarss/openroad-mcp).

---

## Getting Started

```bash
claude mcp add --transport stdio openroad-mcp -- \
  uvx --from git+https://github.com/luarss/openroad-mcp openroad-mcp
```

Then try the GCD timing demo:

> *"Create an OpenROAD session, load the nangate45 GCD design from ORFS, and tell me where the timing failures are."*

The demo files and expected output are in `demo/orfs-gcd-timing/` in the repo.

---

## What I Want to Know

If you work with OpenROAD, I want to hear where this breaks. What are some of your pain points making AI work with your workflow?

---

**GitHub:** [github.com/luarss/openroad-mcp](https://github.com/luarss/openroad-mcp)
**Email:** me@luarss.dev
