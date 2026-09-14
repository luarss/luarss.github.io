#!/usr/bin/env python3
"""Pull Bing Webmaster Tools data and snapshot presence for our targets.

Bing's index powers ChatGPT Search and Microsoft Copilot retrieval, so Bing
query/impression data is a free proxy for whether those engines can find us.
Writes one snapshot per run to results/bing-<date>.json.

Auth: a free Bing Webmaster Tools API key.
  1. Verify the site at https://www.bing.com/webmasters (free).
  2. Settings > API access > generate an API key.
Provide it via env var BING_API_KEY. Site URL via BING_SITE_URL
(defaults to https://luarss.dev/).
"""

import os

import requests

from _common import load_targets, matches_target, require_env, write_result

API_BASE = "https://ssl.bing.com/webmaster/api.svc/json"
DEFAULT_SITE = "https://luarss.dev/"
TIMEOUT = 30


def call(method, api_key, site_url):
    """Call one Bing Webmaster JSON method; returns the 'd' payload."""
    resp = requests.get(
        f"{API_BASE}/{method}",
        params={"apikey": api_key, "siteUrl": site_url},
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    return resp.json().get("d", [])


def normalize_query_stats(rows):
    """Bing field names -> the flat shape we store."""
    out = []
    for row in rows or []:
        out.append(
            {
                "query": row.get("Query", ""),
                "impressions": row.get("Impressions", 0),
                "clicks": row.get("Clicks", 0),
                "avg_impression_position": row.get("AvgImpressionPosition"),
                "avg_click_position": row.get("AvgClickPosition"),
            }
        )
    return out


def main():
    api_key = require_env("BING_API_KEY")
    site_url = os.environ.get("BING_SITE_URL", DEFAULT_SITE)
    targets = load_targets()

    query_stats = normalize_query_stats(call("GetQueryStats", api_key, site_url))
    # Rank & traffic gives site-wide impression/click trend context.
    traffic = call("GetRankAndTrafficStats", api_key, site_url)

    tracked = []
    for rec in query_stats:
        kind, term = matches_target(rec["query"], targets)
        if kind:
            tracked.append({**rec, "target_kind": kind, "target_term": term})

    payload = {
        "site": site_url,
        "totals": {
            "distinct_queries": len(query_stats),
            "impressions": sum(r["impressions"] for r in query_stats),
            "clicks": sum(r["clicks"] for r in query_stats),
            "tracked_targets_surfacing": len(tracked),
        },
        "tracked_targets": sorted(tracked, key=lambda r: -r["impressions"]),
        "rank_and_traffic": traffic,
    }
    write_result("bing", payload)


if __name__ == "__main__":
    main()
