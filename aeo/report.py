#!/usr/bin/env python3
"""Roll up results/ snapshots into a presence trend.

No deps, no network. Reads every gsc-*.json / bing-*.json and prints, per
source, how brand + topic visibility has moved over time. Run locally:
    python aeo/report.py
"""

import glob
import json
import os

from _common import RESULTS_DIR


def load_snapshots(source):
    files = sorted(glob.glob(os.path.join(RESULTS_DIR, f"{source}-*.json")))
    for path in files:
        with open(path, encoding="utf-8") as fh:
            yield os.path.basename(path), json.load(fh)


def summarize(source, label):
    snaps = list(load_snapshots(source))
    if not snaps:
        print(f"\n{label}: no snapshots yet.")
        return

    print(f"\n{label} — {len(snaps)} snapshot(s)")
    print(f"{'date':<24}{'impr':>8}{'clicks':>8}{'targets':>9}  top tracked target")
    print("-" * 72)
    for name, snap in snaps:
        totals = snap.get("totals", {})
        tracked = snap.get("tracked_targets", [])
        top = tracked[0]["query"] if tracked else "-"
        print(
            f"{name:<24}"
            f"{totals.get('impressions', 0):>8}"
            f"{totals.get('clicks', 0):>8}"
            f"{totals.get('tracked_targets_surfacing', 0):>9}"
            f"  {top}"
        )

    # Surface the latest tracked-target breakdown for detail.
    latest_name, latest = snaps[-1]
    tracked = latest.get("tracked_targets", [])
    if tracked:
        print(f"\n  latest ({latest_name}) tracked targets:")
        for rec in tracked:
            print(
                f"    [{rec.get('target_kind'):5}] {rec['query']!r}"
                f"  impr={rec['impressions']} clicks={rec['clicks']}"
            )


def main():
    print("AEO presence report")
    summarize("gsc", "Google Search Console (incl. AI surfaces)")
    summarize("bing", "Bing Webmaster (ChatGPT/Copilot retrieval proxy)")


if __name__ == "__main__":
    main()
