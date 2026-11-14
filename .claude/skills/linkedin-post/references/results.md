# Results

One row per post. Add a row with:

```
python3 -I .claude/skills/linkedin-post/scripts/parse_export.py SinglePostAnalytics_*.xlsx
```

Export each post from LinkedIn after 7 days (post, View analytics, Export). Fill `hook` with the formula id and name from `hooks.json`, and `notes` with what you think drove the result.

| date | url | impressions | reached | engagements | engagement_rate | profile_views | followers | reposts | saves | link_clicks | top_location | hook | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 10/27/2026 | https://www.linkedin.com/posts/song-luar_hiring-aiengineer-appliedai-share-7520737827404472320-EX2A | 2466 | 1270 | 20 | 0.8% | 73 | 2 | 1 | 3 | 12 | Singapore 48% | 17 Time Anchor (closest) | Hiring post. Personal arc, plain-English list, role and bar, apply link in the body (12 clicks). Exported at day 18. |
| 11/13/2026 | https://www.linkedin.com/posts/song-luar_rag-aisecurity-cybersecurity-ugcPost-7526929657028313088-E7p2 | 124 | 53 | 5 | 4.0% | 3 | 0 | 0 | 0 | 0 | Singapore 51% | none | Jargon, no call to action, specialist hashtags. Exported at day 1, so re-export at day 7 and day 18. |

Compare posts at the same age. The export has no daily breakdown, so a post can only be compared with another at the age it was exported.
