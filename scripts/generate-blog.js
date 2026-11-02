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

// Trusted curated real tech image pool by topic (for in-article illustration)
const TOPIC_ILLUSTRATIONS = {
  ai: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
  chips: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  code: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  cloud: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  security: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  gadgets: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
};

async function fetchRealGoogleNews() {
  const url = 'https://news.google.com/rss/search?q=technology+AI+software+chips&hl=en-US&gl=US&ceid=US:en';
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
      let source = 'Tech News';
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
  const prompt = `Anda adalah jurnalis teknologi senior dan software engineer investigatif.
Berdasarkan FAKTA BERITA NYATA berikut, tulis artikel tech explainer mendalam dan faktual dalam Bahasa Indonesia:

FAKTA ASLI BERITA:
- Judul Asli: "${newsItem.title}"
- Sumber Media Kredibel: "${newsItem.source}"
- URL Rujukan: "${newsItem.link}"

PANDUAN KETAT (WAJIB DIIKUTI):
1. **ANTI-HOAX / STRICTLY FACTUAL**: Jangan mengarang fakta baru, jangan membuat klaim palsu. Ulas dan jelaskan konteks di balik berita asli tersebut secara akurat dan objektif.
2. **POLA JUDUL HOOK PERTANYAAN (Wajib dimulai dengan kata "Kenapa ...?")**:
   Buat judul menarik dan rasa penasaran pembaca dengan format persis:
   "Kenapa [Subjek/Perusahaan/Teknologi] [Alasan/Tindakan/Dampak]?"
   Contoh:
   - "Kenapa Gemini 4 Carbon Dimulai dari Pembela Siber?"
   - "Kenapa Apple M6 Bikin MacBook Pro dan iMac Makin Pintar?"
   - "Kenapa OpenAI Putuskan Latihan Model Tanpa Internet?"
   - "Kenapa Rugi 80 Miliar Dolar Tak Menghalangi IPO Anthropic?"
3. **SUMMARY (Cuplikan 2-3 baris fakta penting)**:
   Mulai ringkasan dengan pernyataan tanggal faktual terkini, subjek yang mengumumkan, dan intisari beritanya (maksimal 160 karakter).
4. **ISI ARTIKEL (400 - 650 kata)**:
   - Format Markdown kaya: gunakan heading (##, ###), poin-poin analisis penting, dan kutipan (blockquotes).
   - Sisipkan SATU tag penanda gambar di tengah artikel: ![Ilustrasi Teknologi](IMAGE_PLACEHOLDER)
   - Akhiri dengan analisis prospek dan dampaknya bagi industri software / developer.
5. **KATEGORI & TOPIK**:
   Tentukan salah satu topik gambar dari: "ai" | "chips" | "code" | "cloud" | "security" | "gadgets"

KEMBALIKAN HANYA JSON MURNI DENGAN STRUKTUR BERIKUT:
{
  "title": "Kenapa ...? (judul format pertanyaan)",
  "slug": "kebab-case-judul-tanpa-tanda-tanya",
  "summary": "Ringkasan ringkas 2-3 baris fakta penting...",
  "category": "Artificial Intelligence" | "Software Engineering" | "Hardware & Chips" | "Cybersecurity" | "Cloud & Web",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "topicType": "ai" | "chips" | "code" | "cloud" | "security" | "gadgets",
  "readTime": "3 min read",
  "content": "Isi lengkap artikel Markdown..."
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
        { role: 'system', content: 'You are a professional tech journalist returning strictly valid JSON.' },
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

  const parsed = JSON.parse(text);

  // Pick realistic topic image
  const topicKey = parsed.topicType || 'ai';
  const inlineImg = TOPIC_ILLUSTRATIONS[topicKey] || TOPIC_ILLUSTRATIONS.ai;
  parsed.content = parsed.content.replace(/IMAGE_PLACEHOLDER/g, inlineImg);

  const now = new Date();
  const formattedDate = formatIndonesianDate(now);

  return {
    id: `post-${Date.now()}`,
    slug: parsed.slug || parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: parsed.title,
    summary: parsed.summary,
    coverImage: inlineImg,
    content: parsed.content,
    category: parsed.category || 'Artificial Intelligence',
    tags: parsed.tags || ['Tech', 'News'],
    date: formattedDate,
    isoDate: now.toISOString().split('T')[0],
    readTime: parsed.readTime || '3 min read',
    sourceUrl: newsItem.link,
    sourceName: newsItem.source
  };
}

async function main() {
  console.log('Fetching verified tech RSS news...');
  const news = await fetchRealGoogleNews();
  console.log(`Found ${news.length} verified news sources.`);

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

  // Find fresh real news item
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
    console.log('All real tech news up to date.');
    return;
  }

  console.log(`Generating factual explainer for: "${candidate.title}" [${candidate.source}]...`);
  const article = await generateArticle(candidate);

  if (existingSlugs.has(article.slug)) {
    article.slug = `${article.slug}-${Date.now().toString().slice(-4)}`;
  }

  existingBlogs.unshift(article);
  fs.mkdirSync(path.dirname(blogsFile), { recursive: true });
  fs.writeFileSync(blogsFile, JSON.stringify(existingBlogs, null, 2), 'utf8');

  console.log(`Success! Real factual news published: "${article.title}"`);
}

main().catch(err => {
  console.error('Failed to run blog generator:', err);
  process.exit(1);
});
