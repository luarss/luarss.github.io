# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Repo Guide

Personal site for Shui Song Luar. Hugo + PaperMod theme. Deployed to GitHub Pages from `topic/hugo-dev` via `.github/workflows/deploy.yml`

## Layout

- `hugo/content/` — Markdown content. `about.md`, `now.md`, `posts/`, `projects/`.
- `hugo/layouts/` — Site-specific layout overrides. Anything here overrides the theme. `robots.txt` is a *layout* (templated, production-gated), not a static file.
- `hugo/layouts/partials/extend_head.html` — Injects Google Fonts, Google Analytics (unconditional — fires on all environments), and production-only Person/ProfilePage JSON-LD.
- `hugo/assets/css/extended/custom.css` — Custom CSS overrides loaded after PaperMod. Add all style changes here.
- `hugo/static/` — Verbatim static files (e.g. `llms.txt`).
- `hugo/themes/PaperMod/` — Theme, pulled in as a git submodule. **Do not edit theme files**; override by adding files under `hugo/layouts/`.
- `hugo/hugo.toml` — Site config. Schema, params, menu, social icons all live here.

## Commands

- Local dev: `cd hugo && hugo server -D`
- Production build (verify before commit): `cd hugo && hugo --environment production --minify`
- New post: `cd hugo && hugo new posts/my-post-title.md` (creates from `archetypes/default.md`, starts as draft)
- Inspect rendered HTML: read `hugo/public/<path>/index.html` after a build.

Hugo version: **0.161.1 extended** (must match CI — `extended: true` is required for CSS processing).

## CI & Deployment

- Push to `topic/hugo-dev` → `deploy.yml` builds (no `-D`, no `--environment production`) and pushes to `gh-pages` branch → served at `luarss.dev`. Wayback Machine archiving runs after each deploy.
- PRs targeting `topic/hugo-dev` → `preview.yml` builds with `-D` (drafts included) and deploys to `luarss.dev/pr-preview/pr-<N>/`.

## Conventions

- Content front-matter should include `description` (used for meta description, OG, and JSON-LD) and `keywords`. Don't leave placeholder `summary: "about"`-style fields.
- Two JSON-LD sources on each page: PaperMod's built-in (`themes/PaperMod/layouts/partials/templates/schema_json.html`) and our extension (`layouts/partials/extend_head.html`). Production-only — `hugo.IsProduction` gates them. When debugging schema, build with `--environment production`.
- Person/site identity lives in `[params.schema]` in `hugo.toml` (`publisherType`, `sameAs`). Keep `sameAs` in `hugo.toml` and the per-page Person JSON-LD in `extend_head.html` in sync.
- `robots.txt` declares Content Signals (`search=yes, ai-train=no, ai-input=yes`). Preserve that policy when editing.

## Don't

- Don't add AI-only content variants — Google's AI optimization guidance is to write for humans and keep standard SEO clean.
- Don't bypass the theme by writing into `themes/PaperMod/`; create an override under `hugo/layouts/`.
