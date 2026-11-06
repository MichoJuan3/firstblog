
from pathlib import Path
import difflib
import re

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "src/content/blog"
OUTPUT = ROOT / "scripts/internal-linking-test-preview.txt"

TESTS = [
    {
        "file": "2026-07-20-8-costly-dropshipping-mistakes-&-how to-fix-them.md",
        "anchor": '"Winning products"',
        "url": "/blog/find-winning-products-free-tools/",
    },
    {
        "file": "2026-07-20-what-is-dropshipping.md",
        "anchor": "sell products without holding any inventory",
        "url": "/blog/start-dropshipping-0-inventory/",
    },
]

results = []

for test in TESTS:
    path = BLOG / test["file"]
    original = path.read_bytes()

    # Preserve original file encoding and line endings.
    try:
        text = original.decode("utf-8-sig")
        encoding = "utf-8-sig"
    except UnicodeDecodeError:
        results.append(f"SKIPPED (encoding): {path.name}")
        continue

    anchor = test["anchor"]
    url = test["url"]

    # Require exactly one occurrence to avoid ambiguous changes.
    count = text.count(anchor)
    if count != 1:
        results.append(f"SKIPPED ({count} matches): {path.name}")
        continue

    # Verify the anchor is not already part of a Markdown link.
    pattern = re.compile(r"\[[^\]]*\]\([^)]+\)")
    if any(anchor in m.group(0) for m in pattern.finditer(text)):
        results.append(f"SKIPPED (existing link): {path.name}")
        continue

    replacement = f"[{anchor}]({url})"
    updated = text.replace(anchor, replacement, 1)
        # Apply only after a backup has been created.
    backup = ROOT / "scripts/backup-internal-linking" / path.name

    if not backup.is_file() or backup.read_bytes() != original:
        results.append(f"SKIPPED (backup mismatch): {path.name}")
        continue

    path.write_bytes(updated.encode(encoding))
    print(f"LINK ADDED: {path.name}")

    diff = difflib.unified_diff(
        text.splitlines(keepends=True),
        updated.splitlines(keepends=True),
        fromfile=f"original/{path.name}",
        tofile=f"preview/{path.name}",
    )

    results.append("".join(diff))

OUTPUT.write_text(
    "\n\n".join(results),
    encoding="utf-8",
)

print(f"Preview saved: {OUTPUT}")
print("No Markdown files were modified.")
