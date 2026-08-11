# LinkedIn post — companion to hugo/content/posts/supply-chain-hygiene-claude-plugins.md

> Not built by Hugo (lives outside hugo/content/). Humanize before posting.

---

Supply chain attacks don't just target prod.

Your local dev environment is where your credentials, SSH keys, and signing keys live, and most developers pin nothing in it.

Over the past week I hardened my dotfiles across four surfaces:

1️⃣ **GitHub Actions** → every `uses:` step pinned to a 40-char commit SHA. A tag like `@v4` can be silently repointed by anyone who controls the upstream repo.

2️⃣ **Zsh plugins** → `git clone --depth=1` pulls whatever HEAD is at install time. Now I clone at a specific tag and assert the SHA immediately after. If they don't match, the install aborts.

3️⃣ **Claude Code plugins** → Claude tracks installed plugin SHAs in `~/.claude/plugins/installed_plugins.json`, but this file is local and ephemeral. I committed it to my dotfiles and symlinked it back, so every plugin version change shows up in `git diff`. A weekly GitHub Actions job then compares locked SHAs against source repos and opens an issue when anything drifts.

4️⃣ **Homebrew** → the honest answer here is that `brew bundle` has no lock file. `--no-upgrade` is the best available guardrail.

The full implementation (install script, update checker, and workflow) is open source in my dotfiles. Full write-up: [LINK]

What does your dev environment supply chain look like? 👇

#DevSecurity #SupplyChain #DotFiles #ClaudeCode #DevTools
