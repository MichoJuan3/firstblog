import fs from 'fs';
import path from 'path';

// Folder containing your blog posts
const DOSSIER = './src/content/blog';

// NEW FRONT MATTER TEMPLATE
const createHeader = ({ title, description, pubDate, author, imgSrc, imgAlt }) => `---
title: "${title}"
description: "${description}"
pubDate: ${pubDate}
author: "${author}"
tags:
  - "General"
draft: false
coverImage:
  src: "${imgSrc}"
  alt: "${imgAlt || title}"
---`;

async function updateHeaders() {
  try {
    const files = fs.readdirSync(DOSSIER);

    files.forEach((file) => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(DOSSIER, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Extract existing metadata
        const titleMatch = content.match(/title:\s*"(.*?)"/);
        const descMatch = content.match(/description:\s*"(.*?)"/);
        const dateMatch = content.match(/pubDate:\s*(.*)/);
        const authorMatch = content.match(/author:\s*"(.*?)"/);
        const srcMatch = content.match(/src:\s*"(.*?)"/);

        const title = titleMatch ? titleMatch[1] : file.replace(/\.mdx?$/, '');
        const description = descMatch ? descMatch[1] : "Blog post description";
        const pubDate = dateMatch ? dateMatch[1].trim() : "2026-07-15";
        const author = authorMatch ? authorMatch[1] : "Jean Paul Michel";
        const imgSrc = srcMatch ? `/images/${path.basename(srcMatch[1])}` : "/images/default.jpg";
        // Keep markdown body without old front matter
        // Safely strip the old front matter and keep the body intact
const markdownBody = content.trimStart().replace(/^---[\s\S]*?---\r?\n?/, '');
        // Generate new front matter header
        const newHeader = createHeader({
          title,
          description,
          pubDate,
          author,
          imgSrc,
          imgAlt: title
        });

        // Write changes back to file
        fs.writeFileSync(filePath, `${newHeader}\n\n${markdownBody.trim()}\n`);
        console.log(`Updated: ${file}`);
      }
    });
  } catch (error) {
    console.error('Error during update:', error);
  }
}

updateHeaders();