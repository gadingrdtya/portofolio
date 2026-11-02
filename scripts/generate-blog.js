import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}
loadEnv();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('Error: GROQ_API_KEY is not defined.');
  process.exit(1);
}

async function fetchDiverseTechNews() {
  // Broad, rich tech queries across Software, AI, Cloud, Cybersecurity, Gadgets & Hardware
  const query = encodeURIComponent('(technology OR "software engineering" OR "web development" OR "cybersecurity" OR "cloud computing" OR "artificial intelligence" OR "Apple" OR "Linux" OR "open source")');
  const url = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
  const res = await fetch(url);
  const xml = await res.text();

  const items = [];
  const itemMatches = xml.split('<item>').slice(1);

  for (const raw of itemMatches) {
    const titleMatch = raw.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || raw.match(/<title>(.*?)<\/title>/);
    const linkMatch = raw.match(/<link>(.*?)<\/link>/) || raw.match(/<link\s+href="(.*?)"/);
    const dateMatch = raw.match(/<pubDate>(.*?)<\/pubDate>/);

    if (titleMatch) {
      let rawTitle = titleMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"');
      let source = 'Tech Media';
      if (rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ');
        source = parts.pop().trim();
        rawTitle = parts.join(' - ').trim();
      }
      items.push({
        title: rawTitle,
        source,
        link: linkMatch ? linkMatch[1] : '',
        pubDate: dateMatch ? dateMatch[1] : new Date().toISOString()
      });
    }
  }
  return items;
}

function formatIndonesianDate(d = new Date()) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

async function generateArticle(newsItem) {
  const prompt = `Anda adalah jurnalis teknologi senior dan software engineer.
Berdasarkan FAKTA BERITA NYATA berikut, tulis artikel tech explainer mendalam dan faktual dalam Bahasa Indonesia:

FAKTA ASLI BERITA:
- Judul Asli: "${newsItem.title}"
- Sumber Media Kredibel: "${newsItem.source}"
- URL Rujukan: "${newsItem.link}"

PANDUAN KETAT:
1. **ANTI-HOAX & 100% FAKTUAL**: Tulis murni berdasarkan fakta topik asli berita rujukan. Jangan mengarang fitur, klaim palsu, atau angka fiktif.
2. **POLA JUDUL HOOK PERTANYAAN (Wajib format: "Kenapa [Subjek/Teknologi/Brand] [Dampak/Perubahan/Aksi]?")**:
   Contoh:
   - "Kenapa Linux Kernel Versi Terbaru Mengubah Manajemen Memori?"
   - "Kenapa Arsitektur Serverless Ini Menjadi Standar Baru Web App?"
   - "Kenapa Celah Keamanan Ini Menuntut Patch Darurat dari Ribuan Perusahaan?"
   - "Kenapa Framework Ini Semakin Diminati oleh Developer Modern?"
3. **SUMMARY (Cuplikan 2-3 baris fakta penting)**:
   Mulai dengan intisari pengumuman dan dampaknya (maksimal 160 karakter).
4. **ISI ARTIKEL (400 - 650 kata)**:
   - MURNI TULISAN/TEKS SAJA. DILARANG MEMASUKKAN TAG GAMBAR DALAM BENTUK APAPUN (jangan sertakan markdown image ![...](...)).
   - Format Markdown kaya: heading (##, ###), bullet points, analisis dampak, dan kutipan (blockquotes).
5. **KATEGORI**:
   Pilih kategori yang paling sesuai dari: "Software Engineering", "Cybersecurity", "Cloud & DevOps", "Web Development", "Hardware & Chips", "Artificial Intelligence".

KEMBALIKAN HANYA JSON MURNI DENGAN STRUKTUR BERIKUT:
{
  "title": "Kenapa ...? (judul format pertanyaan)",
  "slug": "kebab-case-judul-tanpa-tanda-tanya",
  "summary": "Ringkasan ringkas 2-3 baris fakta penting...",
  "category": "Kategori terpilih",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "readTime": "3 min read",
  "content": "Isi lengkap artikel Markdown (tanpa gambar)..."
}`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: 'You are a professional tech journalist returning strictly valid JSON without any image tags.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 2500
    })
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(`Groq API Error: ${JSON.stringify(data.error)}`);
  }

  let text = data.choices[0].message.content.trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
  }

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    text = text.slice(firstBrace, lastBrace + 1);
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    const sanitized = text.replace(/:\s*"([^"]*)"/g, (match, p1) => {
      return ': "' + p1.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    });
    parsed = JSON.parse(sanitized);
  }

  // Safety clean: remove any accidental image markdown
  parsed.content = parsed.content.replace(/!\[.*?\]\(.*?\)\n*/g, '');

  const now = new Date();
  const formattedDate = formatIndonesianDate(now);

  return {
    id: `post-${Date.now()}`,
    slug: parsed.slug || parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: parsed.title,
    summary: parsed.summary,
    content: parsed.content,
    category: parsed.category || 'Software Engineering',
    tags: parsed.tags || ['Tech', 'Engineering'],
    date: formattedDate,
    isoDate: now.toISOString().split('T')[0],
    readTime: parsed.readTime || '3 min read',
    sourceUrl: newsItem.link,
    sourceName: newsItem.source
  };
}

async function main() {
  console.log('Fetching diverse tech news...');
  const news = await fetchDiverseTechNews();
  console.log(`Found ${news.length} tech news sources.`);

  const blogsFile = path.resolve(__dirname, '../src/data/blogs.json');
  let existingBlogs = [];
  if (fs.existsSync(blogsFile)) {
    try {
      existingBlogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    } catch (e) {
      existingBlogs = [];
    }
  }

  const existingSlugs = new Set(existingBlogs.map(b => b.slug.toLowerCase()));

  // Find fresh news item
  let candidate = null;
  for (const item of news) {
    const simplified = item.title.toLowerCase().slice(0, 30);
    const alreadyExists = existingBlogs.some(b =>
      b.title.toLowerCase().includes(simplified) ||
      (b.sourceUrl && b.sourceUrl === item.link)
    );
    if (!alreadyExists) {
      candidate = item;
      break;
    }
  }

  if (!candidate) {
    console.log('All tech news up to date.');
    return;
  }

  console.log(`Generating text-only article for: "${candidate.title}" [${candidate.source}]...`);
  const article = await generateArticle(candidate);

  if (existingSlugs.has(article.slug)) {
    article.slug = `${article.slug}-${Date.now().toString().slice(-4)}`;
  }

  existingBlogs.unshift(article);
  fs.mkdirSync(path.dirname(blogsFile), { recursive: true });
  fs.writeFileSync(blogsFile, JSON.stringify(existingBlogs, null, 2), 'utf8');

  console.log(`Success! Text-only tech news published: "${article.title}"`);
}

main().catch(err => {
  console.error('Failed to run blog generator:', err);
  process.exit(1);
});
