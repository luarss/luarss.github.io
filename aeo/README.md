# AEO / SEO presence tracking

Free, automated tracking of whether this site surfaces in the search indexes
that AI answer engines retrieve from. This does **not** query ChatGPT /
Perplexity / Gemini directly (no free API exposes their citations) — it tracks
the upstream substrate:

- **`gsc_pull.py`** — Google Search Console. Real Google data, including AI
  surfaces (AI Overviews) via the `searchAppearance` dimension where Google
  exposes them for the property.
- **`bing_pull.py`** — Bing Webmaster Tools. Bing's index powers ChatGPT Search
  and Copilot retrieval, so it's a proxy for whether those engines can find us.
- **`report.py`** — rolls up `results/` into a presence trend (no deps, offline).

Each run writes one snapshot to `results/<source>-<date>.json`. Committed
snapshots make git history the trend line. Consumer-engine citations (ChatGPT
etc.) stay a **manual** weekly check — the free apps, eyeballed.

## Fixed targets

`targets.json` holds brand terms + topic queries to watch. **Don't reword
existing entries** once data accumulates — stable wording keeps runs comparable.
Add new ones freely.

## Setup (one-time, all free)

### Google Search Console
1. Google Cloud console → create a service account + JSON key.
2. Enable the **Google Search Console API** for that project.
3. Search Console → Settings → Users and permissions → add the service-account
   email (e.g. `...@...iam.gserviceaccount.com`) as a user.
4. GitHub repo → Settings → Secrets and variables → Actions:
   - Secret `GSC_CREDENTIALS_JSON` = the full JSON key contents.
   - Variable `GSC_PROPERTY` = `sc-domain:luarss.dev` (or your property URI).

### Bing Webmaster Tools
1. Verify the site at <https://www.bing.com/webmasters> (free; import from GSC
   is the fastest path).
2. Settings → API access → generate an API key.
3. GitHub repo secrets/variables:
   - Secret `BING_API_KEY` = the key.
   - Variable `BING_SITE_URL` = `https://luarss.dev/`.

## Run

Automated: `.github/workflows/aeo.yml` runs weekly (Mondays) and on manual
dispatch, committing new snapshots.

Local:

```bash
pip install -r aeo/requirements.txt

# Google (either env form works)
export GSC_CREDENTIALS_FILE=/path/to/key.json   # or GSC_CREDENTIALS_JSON='{...}'
export GSC_PROPERTY='sc-domain:luarss.dev'
python aeo/gsc_pull.py

# Bing
export BING_API_KEY='...'
python aeo/bing_pull.py

python aeo/report.py
```

## Notes

- GSC data lags ~2–3 days; the puller ends its 28-day window before the freshest
  incomplete days.
- Action SHAs in the workflow are pinned; bump them deliberately.
- `deploy.yml` ignores `aeo/**`, so snapshots don't trigger site rebuilds.
