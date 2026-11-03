import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateRssFeed() {
  const blogsPath = path.resolve(__dirname, '../src/data/blogs.json');
  const rssOutputPath = path.resolve(__dirname, '../public/rss.xml');

  if (!fs.existsSync(blogsPath)) {
    console.error('blogs.json not found, skipping RSS generation.');
    return;
  }

  let blogs = [];
  try {
    blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
  } catch (err) {
    console.error('Error parsing blogs.json for RSS:', err);
    return;
  }

  const siteUrl = 'https://gadingrdtya.my.id';
  const buildDate = new Date().toUTCString();

  const itemsXml = blogs.map((post) => {
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    const pubDate = post.isoDate ? new Date(`${post.isoDate}T08:00:00+07:00`).toUTCString() : buildDate;
    const escapedCategory = (post.category || 'Technology').replace(/&/g, '&amp;');

    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapedCategory}</category>
      <description><![CDATA[${post.summary}]]></description>
      <source url="${siteUrl}/rss.xml">Gading Raditya Pratama Tech Dispatch</source>
    </item>`;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gading Raditya Pratama | Tech Dispatch &amp; Articles</title>
    <link>${siteUrl}/blog</link>
    <description>Factual tech dispatches, architecture explainers, software engineering analyses, and hardware developments.</description>
    <language>id-ID</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />

${itemsXml}
  </channel>
</rss>
`;

  fs.mkdirSync(path.dirname(rssOutputPath), { recursive: true });
  fs.writeFileSync(rssOutputPath, rssXml.trim(), 'utf8');
  console.log(`Generated public/rss.xml with ${blogs.length} articles.`);
}

// Allow direct execution: node scripts/generate-rss.js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateRssFeed();
}
