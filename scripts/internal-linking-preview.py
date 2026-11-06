
import csv
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POST_DIR = ROOT / "src/content/blog"
INPUT = ROOT / "scripts/internal-linking-report.csv"
OUTPUT = ROOT / "scripts/internal-linking-preview.csv"

def paragraphs(text):
    body = re.sub(r"\A---\s*\n.*?\n---\s*\n", "", text, count=1, flags=re.S)
    for block in re.split(r"\n\s*\n", body):
        block = block.strip()
        if not block or block.startswith(("#", "```", "~~~", "<", "|", "!", "- ", "* ")):
            continue
        if "[" in block or "](" in block:
            continue
        if len(block) >= 100:
            yield block

def keywords(text):
    stop = {"the", "and", "for", "with", "your", "how", "what",
            "from", "that", "this", "into", "best", "make", "money"}
    return {w for w in re.findall(r"[a-z]{4,}", text.lower()) if w not in stop}

rows = []
with INPUT.open(encoding="utf-8-sig", newline="") as f:
    suggestions = list(csv.DictReader(f))

for suggestion in suggestions:
    source = POST_DIR / suggestion["source_file"]
    if not source.is_file():
        continue

    content = source.read_text(encoding="utf-8-sig", errors="replace")
    target_words = keywords(suggestion["suggested_target_title"])
    matches = []

    for paragraph in paragraphs(content):
        common = target_words & keywords(paragraph)
        if len(common) >= 2:
            matches.append((len(common), paragraph, common))

    if matches:
        matches.sort(key=lambda x: x[0], reverse=True)
        score, paragraph, common = matches[0]
        rows.append({
            "source_file": suggestion["source_file"],
            "target_title": suggestion["suggested_target_title"],
            "target_url": suggestion["suggested_target_url"],
            "matching_keywords": "; ".join(sorted(common)),
            "paragraph_preview": paragraph[:250].replace("\n", " "),
            "status": "REVIEW",
        })

fields = ["source_file", "target_title", "target_url",
          "matching_keywords", "paragraph_preview", "status"]

with OUTPUT.open("w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)

print(f"Suggestions analyzed: {len(suggestions)}")
print(f"Contextual matches found: {len(rows)}")
print(f"Preview report: {OUTPUT}")
print("No Markdown files were modified.")
