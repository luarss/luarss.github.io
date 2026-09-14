#!/usr/bin/env python3
"""Pull Search Console data and snapshot AEO/SEO presence for our targets.

Free, automated read of Google's index — including AI surfaces where Google
exposes them via the searchAppearance dimension. Runs on a trailing window and
writes one snapshot per run to results/gsc-<date>.json.

Auth: a Google service account with access to the Search Console property.
  1. Create a service account + JSON key (Google Cloud console, free).
  2. Enable the "Google Search Console API".
  3. In Search Console > Settings > Users, add the service-account email as a
     user (Full or Restricted).
Provide the key JSON via env var GSC_CREDENTIALS_JSON (raw JSON string, ideal
for CI secrets) or GSC_CREDENTIALS_FILE (path to the key file).

Property: env GSC_PROPERTY, e.g. 'sc-domain:luarss.dev' (domain property) or
'https://luarss.dev/' (URL-prefix property). Defaults to sc-domain:luarss.dev.
"""

import json
import os
from datetime import date, timedelta

from google.oauth2 import service_account
from googleapiclient.discovery import build

from _common import load_targets, matches_target, require_env, write_result

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
DEFAULT_PROPERTY = "sc-domain:luarss.dev"
WINDOW_DAYS = 28
# GSC data lags ~2-3 days; end the window before the freshest incomplete days.
LAG_DAYS = 3


def credentials():
    raw = os.environ.get("GSC_CREDENTIALS_JSON")
    if raw:
        info = json.loads(raw)
        return service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
    path = require_env("GSC_CREDENTIALS_FILE")
    return service_account.Credentials.from_service_account_file(path, scopes=SCOPES)


def query(service, property_uri, start, end, dimensions):
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dimensions,
        "rowLimit": 1000,
    }
    resp = (
        service.searchanalytics()
        .query(siteUrl=property_uri, body=body)
        .execute()
    )
    return resp.get("rows", [])


def flatten(rows, dimensions):
    """Turn API rows into flat dicts keyed by dimension name."""
    out = []
    for row in rows:
        rec = dict(zip(dimensions, row.get("keys", [])))
        rec.update(
            clicks=row.get("clicks", 0),
            impressions=row.get("impressions", 0),
            ctr=round(row.get("ctr", 0), 4),
            position=round(row.get("position", 0), 2),
        )
        out.append(rec)
    return out


def main():
    property_uri = os.environ.get("GSC_PROPERTY", DEFAULT_PROPERTY)
    targets = load_targets()

    end = date.today() - timedelta(days=LAG_DAYS)
    start = end - timedelta(days=WINDOW_DAYS)
    start_s, end_s = start.isoformat(), end.isoformat()

    service = build("searchconsole", "v1", credentials=credentials(), cache_discovery=False)

    by_query = flatten(query(service, property_uri, start_s, end_s, ["query"]), ["query"])
    by_appearance = flatten(
        # searchAppearance surfaces AI features (e.g. "AI Overviews") once
        # Google exposes them for the property; empty until then.
        query(service, property_uri, start_s, end_s, ["searchAppearance"]),
        ["searchAppearance"],
    )

    # Tag which of our tracked targets are actually surfacing.
    tracked = []
    for rec in by_query:
        kind, term = matches_target(rec["query"], targets)
        if kind:
            tracked.append({**rec, "target_kind": kind, "target_term": term})

    payload = {
        "property": property_uri,
        "window": {"start": start_s, "end": end_s, "days": WINDOW_DAYS},
        "totals": {
            "distinct_queries": len(by_query),
            "impressions": sum(r["impressions"] for r in by_query),
            "clicks": sum(r["clicks"] for r in by_query),
            "tracked_targets_surfacing": len(tracked),
        },
        "tracked_targets": sorted(tracked, key=lambda r: -r["impressions"]),
        "search_appearance": by_appearance,
    }
    write_result("gsc", payload)


if __name__ == "__main__":
    main()
