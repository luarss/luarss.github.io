---
title: "Hugo generates sites in under 100ms"
date: 2026-02-22
draft: false
tags: ["hugo", "tooling"]
description: "Hugo builds this entire site in ~11ms locally."
---

Running `hugo server` locally, the full site builds in ~11ms. Coming from a React SPA that takes seconds to hot-reload, this is a meaningful improvement for writing flow.

The speed comes from Hugo being written in Go — it compiles templates and Markdown to static HTML without a JS runtime in the loop.
