# TODO

## AEO tracking (branch `feat/aeo-tracking`)

Harness is scaffolded in `aeo/`. Remaining to activate — all free, one-time:

### Google Search Console (#1)
- [ ] Create a Google Cloud service account + JSON key
- [ ] Enable the **Google Search Console API** for that project
- [ ] Add the service-account email as a user in Search Console → Settings → Users
- [ ] Add repo secret `GSC_CREDENTIALS_JSON` (full key JSON)
- [ ] Add repo variable `GSC_PROPERTY` = `sc-domain:luarss.dev`

### Bing Webmaster Tools (#2)
- [ ] Verify site at <https://www.bing.com/webmasters> (import from GSC is fastest)
- [ ] Settings → API access → generate API key
- [ ] Add repo secret `BING_API_KEY`
- [ ] Add repo variable `BING_SITE_URL` = `https://luarss.dev/`

### Before first run
- [ ] Verify pinned Action SHAs in `.github/workflows/aeo.yml`
      (`checkout@v4.2.2`, `setup-python@v5.3.0`) against current tags
- [ ] Trigger `AEO presence tracking` workflow manually (workflow_dispatch) to smoke-test
- [ ] Confirm a snapshot lands in `aeo/results/` and `python aeo/report.py` reads it

### Later / optional
- [ ] Add citation proxy (#3): Brave Search free tier + free OpenRouter model
- [ ] Reconcile canonical domain split (`luarss.github.io` in JSON-LD BaseURL vs `luarss.dev` live)
- [ ] Add ORCID + Google Scholar to `sameAs` (hugo.toml + extend_head.html)
- [ ] Manual weekly check: eyeball ChatGPT / Perplexity / Gemini for target prompts
