import csv
from pathlib import Path

root = Path.cwd()
csv_path = root / "scripts/internal-linking-pending.csv"
blog = root / "src/content/blog"
count = 0
skipped = 0

with csv_path.open(encoding="utf-8-sig", newline="") as f:
    rows = list(csv.DictReader(f))

grouped = {}
for row in rows:
    grouped.setdefault(row["source_file"], []).append(row)

for filename, suggestions in grouped.items():
    path = blog / filename
    if not path.is_file():
        print(f"SKIP missing: {filename}")
        skipped += len(suggestions)
        continue

    original = path.read_text(encoding="utf-8-sig")
    additions = []

    for row in suggestions:
        url = row["target_url"].strip()
        title = row["target_title"].strip()

        if not url.startswith("/blog/") or url in original:
            skipped += 1
            continue

        destination = root / "dist" / url.lstrip("/") / "index.html"
        if not destination.is_file():
            print(f"SKIP invalid destination: {url}")
            skipped += 1
            continue

        additions.append(f"- [{title}]({url})")

    if not additions:
        continue

    section = "\n\n## Further Reading\n\n" + "\n".join(additions) + "\n"
    path.write_text(original.rstrip() + section, encoding="utf-8")
    count += len(additions)
    print(f"UPDATED: {filename} ({len(additions)} links)")

print(f"\nLinks added: {count}")
print(f"Links skipped: {skipped}")
