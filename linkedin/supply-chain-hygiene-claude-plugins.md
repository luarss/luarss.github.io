# LinkedIn post, companion to hugo/content/posts/supply-chain-hygiene-claude-plugins.md

> Not built by Hugo (lives outside hugo/content/).

---

Supply chain attacks don't only target prod.

Your laptop is where your SSH keys, cloud credentials, and signing keys live, and most of us pin nothing there. I went through my dotfiles and fixed that for four things.

GitHub Actions: every `uses:` step is now a 40-character commit SHA with the tag in a comment. A tag like `@v4` can be moved by whoever controls the repo.

Zsh plugins: `git clone --depth=1` grabs whatever HEAD is that day. I clone at a tag, then compare the resulting commit to a SHA I recorded. Mismatch aborts the install.

Claude Code plugins: Claude writes the installed SHAs to `~/.claude/plugins/installed_plugins.json`, but that file never leaves the machine. I committed it to my dotfiles and symlinked it back, so plugin upgrades show up as a git diff. A weekly Actions job compares the locked SHAs to upstream and opens an issue when something drifts.

Homebrew: no lock file exists for `brew bundle`. `--no-upgrade` and `brew pin` are as good as it gets.

Install script, update checker, and workflow are in my dotfiles repo. Write-up with the code: https://luarss.dev/posts/supply-chain-hygiene-claude-plugins/

#SupplyChainSecurity #ClaudeCode #DevTools
