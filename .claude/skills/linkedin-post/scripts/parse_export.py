import sys
import zipfile
import xml.etree.ElementTree as ET

SPREADSHEET_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"

COLUMNS = [
    "date",
    "url",
    "impressions",
    "reached",
    "engagements",
    "engagement_rate",
    "profile_views",
    "followers",
    "reposts",
    "saves",
    "link_clicks",
    "top_location",
    "hook",
    "notes",
]


def read_shared_strings(archive):
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    return [
        "".join(node.text or "" for node in item.iter(SPREADSHEET_NS + "t"))
        for item in root.findall(SPREADSHEET_NS + "si")
    ]


def read_cell(cell, shared_strings):
    value = cell.find(SPREADSHEET_NS + "v")
    if cell.get("t") == "s" and value is not None:
        return shared_strings[int(value.text)]
    inline = cell.find(SPREADSHEET_NS + "is")
    if inline is not None:
        return "".join(node.text or "" for node in inline.iter(SPREADSHEET_NS + "t"))
    return value.text if value is not None else ""


def read_rows(path):
    archive = zipfile.ZipFile(path)
    shared_strings = read_shared_strings(archive)
    root = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
    return [
        [read_cell(cell, shared_strings) for cell in row.findall(SPREADSHEET_NS + "c")]
        for row in root.iter(SPREADSHEET_NS + "row")
    ]


def to_number(text):
    try:
        return int(float(text))
    except (TypeError, ValueError):
        return 0


def summarise(rows):
    fields = {row[0]: row[1] for row in rows if len(row) >= 2}
    locations = [
        (row[2], row[1]) for row in rows if len(row) >= 3 and row[0] == "Location"
    ]
    impressions = to_number(fields.get("Impressions"))
    engagements = to_number(fields.get("Social engagements"))
    rate = f"{engagements / impressions:.1%}" if impressions else "n/a"
    return {
        "date": fields.get("Post Date", ""),
        "url": fields.get("Post URL", ""),
        "impressions": impressions,
        "reached": to_number(fields.get("Members reached")),
        "engagements": engagements,
        "engagement_rate": rate,
        "profile_views": to_number(fields.get("Profile viewers from this post")),
        "followers": to_number(fields.get("Followers gained from this post")),
        "reposts": to_number(fields.get("Reposts")),
        "saves": to_number(fields.get("Saves")),
        "link_clicks": to_number(fields.get("Link engagements")),
        "top_location": f"{locations[0][1]} {locations[0][0]}" if locations else "",
        "hook": "",
        "notes": "",
    }


def format_row(summary):
    return "| " + " | ".join(str(summary[column]) for column in COLUMNS) + " |"


def format_header():
    titles = "| " + " | ".join(COLUMNS) + " |"
    divider = "|" + "|".join(" --- " for _ in COLUMNS) + "|"
    return titles + "\n" + divider


def main():
    paths = [argument for argument in sys.argv[1:] if argument != "--header"]
    if not paths:
        sys.exit("usage: parse_export.py [--header] SinglePostAnalytics.xlsx ...")
    if "--header" in sys.argv:
        print(format_header())
    for path in paths:
        print(format_row(summarise(read_rows(path))))


if __name__ == "__main__":
    main()
