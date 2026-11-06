#!/usr/bin/env python3
"""Generate a read-only internal-linking proposal report for Astro Markdown posts."""
from __future__ import annotations
import csv
import re
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
POST_DIR = ROOT / 'src' / 'content' / 'blog'
REPORT = ROOT / 'scripts' / 'internal-linking-report.csv'
STOP = set('the a an and or to of for in on with from your you how what why is are it this that by as at into without can do does guide best online business make money start starting step steps complete using use ways'.split())

def parse_post(path):
    raw = path.read_text(encoding='utf-8-sig', errors='replace')
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', raw, re.S)
    if not m:
        return None
    fm, body = m.group(1), raw[m.end():]
    def scalar(key):
        found = re.search(rf'(?m)^{re.escape(key)}:\s*["\']?(.*?)["\']?\s*$', fm)
        return found.group(1).strip().strip('"\'') if found else ''
    if scalar('draft').lower() == 'true':
        return None
    tags = []
    t = re.search(r'(?m)^tags:\s*\n((?:\s+-[^\n]*\n?)*)', fm)
    if t:
        tags = [x.strip().strip('"\'').lower() for x in re.findall(r'(?m)^\s+-\s+(.+)$', t.group(1))]
    title = scalar('title') or path.stem
    slug = scalar('slug') or path.stem
    words = lambda s: set(w for w in re.findall(r'[a-z]{3,}', s.lower()) if w not in STOP)
    return {'file': path.name, 'title': title, 'slug': slug, 'tags': set(tags), 'words': words(title + ' ' + ' '.join(tags)), 'body': body}

def main():
    if not POST_DIR.is_dir():
        raise SystemExit(f'Folder not found: {POST_DIR}')
    posts = [p for f in sorted(POST_DIR.glob('*.md')) if (p := parse_post(f))]
    rows = []
    for source in posts:
        scored = []
        for target in posts:
            if source['file'] == target['file'] or source['slug'] == target['slug']:
                continue
            common_tags = source['tags'] & target['tags']
            common_words = source['words'] & target['words']
            score = 5 * len(common_tags) + len(common_words)
            if score <= 0:
                continue
            url = '/blog/' + target['slug'] + '/'
            if url in source['body']:
                continue
            scored.append((score, target, common_tags, common_words))
        scored.sort(key=lambda x: (-x[0], x[1]['title'].lower()))
        for score, target, tags, words in scored[:5]:
            rows.append({'source_file': source['file'], 'source_title': source['title'], 'suggested_target_title': target['title'], 'suggested_target_url': '/blog/' + target['slug'] + '/', 'shared_tags': '; '.join(sorted(tags)), 'shared_keywords': '; '.join(sorted(words)), 'relevance_score': score, 'status': 'REVIEW - no changes made'})
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    with REPORT.open('w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=['source_file','source_title','suggested_target_title','suggested_target_url','shared_tags','shared_keywords','relevance_score','status'])
        writer.writeheader()
        writer.writerows(rows)
    print(f'Articles analyzed: {len(posts)}')
    print(f'Link suggestions: {len(rows)}')
    print(f'Report: {REPORT}')
    print('No Markdown files were modified.')

if __name__ == '__main__':
    main()
