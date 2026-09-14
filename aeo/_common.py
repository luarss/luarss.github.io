"""Shared helpers for the AEO tracking pullers."""

import json
import os
from datetime import datetime, timezone
from pathlib import Path

AEO_DIR = Path(__file__).resolve().parent
RESULTS_DIR = AEO_DIR / "results"


def load_targets():
    """Load the fixed target-query config."""
    with open(AEO_DIR / "targets.json", encoding="utf-8") as fh:
        return json.load(fh)


def matches_target(query, targets):
    """Classify a search query against our brand/topic terms.

    Returns a tuple (kind, matched_term) where kind is 'brand', 'topic',
    or None. Matching is case-insensitive substring for brand terms and
    token-overlap for topic queries (search consoles rarely return the exact
    phrasing we track).
    """
    q = query.lower().strip()

    for term in targets.get("brand_terms", []):
        if term.lower() in q:
            return ("brand", term)

    for topic in targets.get("topic_queries", []):
        topic_tokens = {t for t in topic.lower().split() if len(t) > 2}
        query_tokens = set(q.split())
        # Count a topic hit when most of its distinctive tokens appear.
        if topic_tokens and len(topic_tokens & query_tokens) >= max(2, len(topic_tokens) - 1):
            return ("topic", topic)

    return (None, None)


def today_iso():
    """UTC date string, used to name result files."""
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def write_result(source, payload):
    """Persist one run as results/<source>-<date>.json (idempotent per day)."""
    RESULTS_DIR.mkdir(exist_ok=True)
    out = RESULTS_DIR / f"{source}-{today_iso()}.json"
    record = {
        "source": source,
        "collected_at": datetime.now(timezone.utc).isoformat(),
        **payload,
    }
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(record, fh, indent=2, ensure_ascii=False)
    print(f"wrote {out.relative_to(AEO_DIR.parent)}")
    return out


def require_env(name):
    val = os.environ.get(name)
    if not val:
        raise SystemExit(f"missing required env var: {name}")
    return val
