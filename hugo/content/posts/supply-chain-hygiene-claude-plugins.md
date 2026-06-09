---
title: "Supply Chain Hygiene for Claude Code Plugins"
date: 2026-06-06
draft: true
description: "How to pin Claude Code plugins, GitHub Actions, and zsh plugins to verified commit SHAs, and automate update checks before anything lands in your dev environment."
keywords: ["supply chain security", "Claude Code", "plugins", "dotfiles", "GitHub Actions", "SHA pinning"]
summary: "Pinning every external dependency in your dev environment to an immutable SHA, and what that looks like in practice for Claude Code plugins."
tags: ["security", "devtools", "claude-code"]
---

Most supply chain hardening guides focus on production: npm lockfiles, Docker image digests, Sigstore. Your local dev environment gets less attention, which is ironic: it's where your credentials, source code, and signing keys live.

This post covers how I pin every external dependency in my dotfiles, with specific focus on Claude Code plugins, which have a less obvious trust story than npm packages or GitHub Actions.

## The threat model

A mutable reference (a tag, a branch name, `latest`) is a promise that the content at that URL will never change maliciously. That promise breaks when:

- A maintainer's account is compromised and a backdoored commit is pushed under an existing tag
- A package is transferred to a new owner who ships a malicious update
- A CDN or registry is compromised and serves different content to different clients

The fix is the same in all cases: pin to a content-addressed reference (a commit SHA or a checksum) that cannot be silently repointed.

## GitHub Actions

This one is well-documented but still widely ignored. Every `uses:` step that references a tag is a live dependency:

```yaml
# mutable: anyone who controls the repo can move this tag
- uses: actions/checkout@v4

# immutable: this SHA cannot be repointed
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

To resolve a tag to its commit SHA:

```bash
gh api repos/actions/checkout/git/ref/tags/v4.2.2 --jq .object.sha
# For annotated tags, the above returns the tag object SHA; dereference one level:
gh api repos/actions/checkout/git/tags/<tag-object-sha> --jq .object.sha
```

Keep the tag as a comment so future maintainers know what version they're on. When upgrading, update both the SHA and the comment together.

## Zsh plugins

Oh My Zsh plugins are typically installed with `git clone --depth=1`, which clones whatever HEAD points to at the time. To pin:

```bash
git clone --depth=1 --branch v0.7.1 \
  "https://github.com/zsh-users/zsh-autosuggestions.git" "$plugin_dir"

# Assert the resulting commit matches your expected SHA
actual=$(git -C "$plugin_dir" rev-parse HEAD)
expected="e52ee8ca55bcc56a17c828767a3f98f22a68d4eb"
[ "$actual" = "$expected" ] || { echo "SHA mismatch"; exit 1; }
```

This two-step pattern (clone at a tag, then verify the SHA) guards against a compromised tag that points to a different commit than the one you audited.

## Claude Code plugins

Claude Code plugins are installed from GitHub repos via a marketplace manifest. The runtime tracks installed versions in `~/.claude/plugins/installed_plugins.json`, which records a `gitCommitSha` per plugin:

```json
{
  "typescript-lsp@claude-plugins-official": [{
    "version": "1.0.0",
    "gitCommitSha": "205b6e0b30366a969412d9aab7b99bea99d58db1"
  }]
}
```

The problem: this file is local and ephemeral. On a fresh machine, Claude Code re-fetches plugins at whatever HEAD is at install time. There is no equivalent of `package-lock.json` that ships with the configuration.

### The fix: commit the lock file

Commit `installed_plugins.json` into your dotfiles repo and symlink it back:

```bash
# install.sh
ln -sf "$DOTFILES/installed_plugins.json" "$HOME/.claude/plugins/installed_plugins.json"
```

Now the locked SHAs travel with your dotfiles. When Claude Code upgrades a plugin, it updates the local file (which is your symlink) so the diff shows up in `git status`. You review it, commit it, and the new SHA is on record.

### Automate update checks

Committing the lock file solves the "fresh machine" problem but doesn't tell you when plugins drift behind their upstream. A weekly CI job handles that:

```bash
#!/usr/bin/env bash
# scripts/check-plugin-updates.sh

LOCK="installed_plugins.json"

# Plugins from anthropics/claude-plugins-official live under plugins/<name>/
# External plugins (e.g. chrome-devtools-mcp) have their own repos
EXTERNALS='{"chrome-devtools-mcp": "ChromeDevTools/chrome-devtools-mcp"}'

while IFS= read -r line; do
  plugin_key=$(printf '%s' "$line" | jq -r '.key')
  installed_sha=$(printf '%s' "$line" | jq -r '.sha')
  plugin_name="${plugin_key%%@*}"

  ext_repo=$(printf '%s' "$EXTERNALS" | jq -r --arg n "$plugin_name" '.[$n] // empty')

  if [ -n "$ext_repo" ]; then
    latest=$(gh api "repos/$ext_repo/commits?per_page=1" --jq '.[0].sha')
  else
    latest=$(gh api "repos/anthropics/claude-plugins-official/commits?path=plugins/$plugin_name&per_page=1" --jq '.[0].sha')
  fi

  [ "$latest" != "$installed_sha" ] && echo "OUT $plugin_key: $installed_sha → $latest"
done < <(jq -c '.plugins | to_entries[] | {key: .key, sha: (.value[0].gitCommitSha // null)}' "$LOCK")
```

Pair this with a GitHub Actions workflow on a weekly schedule that opens an issue when anything is outdated:

```yaml
- name: Run update check
  id: check
  run: bash scripts/check-plugin-updates.sh | tee updates.txt && echo "outdated=false" >> "$GITHUB_OUTPUT" || echo "outdated=true" >> "$GITHUB_OUTPUT"

- name: Open or update issue
  if: steps.check.outputs.outdated == 'true'
  run: |
    existing=$(gh issue list --state open --json number,title \
      --jq '.[] | select(.title == "chore: Claude plugin updates available") | .number' | head -1)
    if [ -n "$existing" ]; then
      gh issue comment "$existing" --body "$(cat updates.txt)"
    else
      gh issue create --title "chore: Claude plugin updates available" --body "$(cat updates.txt)"
    fi
```

## What you can't pin

**Homebrew** is the weak link. `brew bundle` has no lock file format: there's no equivalent of `yarn.lock` that records the resolved version of every formula. The best available mitigations are:

- `brew bundle install --no-upgrade` prevents silent upgrades on fresh installs
- `brew pin <formula>` holds a specific formula at its current version
- Audit third-party taps before adding them; prefer taps owned by the upstream vendor (e.g., `hashicorp/tap` for Terraform)

For truly reproducible Homebrew installs, you'd need to vendor the formula files or run a private tap, which is overkill for most dotfiles setups.

## The upgrade workflow

Pinning creates a small ritual for updates:

1. Let the tool upgrade normally (Claude Code, `brew upgrade`, `git pull` in the plugin dir)
2. Copy the updated lock file (or note the new SHA) back into the dotfiles repo
3. Commit with the old and new SHA in the message body
4. The update check workflow goes quiet for another week

The overhead is low. The payoff is that every version change in your dev environment goes through version control, with a timestamp and a diff, instead of silently appearing on the next `git clone`.

## Summary

| Surface | Pin mechanism | Update signal |
|---|---|---|
| GitHub Actions | Commit SHA in `uses:` | Dependabot / manual |
| Zsh plugins | `--branch <tag>` + SHA assertion | Manual |
| Claude plugins | Committed `installed_plugins.json` | Weekly CI check |
| Homebrew | `--no-upgrade` + `brew pin` | `brew outdated` |

The full dotfiles implementation (install script, update checker, and workflow) is on [GitHub](https://github.com/luarss/dotfiles).
