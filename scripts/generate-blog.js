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

// 24+ Curated Diverse Real Tech Images to avoid repeated photos
const IMAGE_LIBRARY = [
  'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'
];

function pickUniqueImage(existingArticles = []) {
  const usedImages = new Set(existingArticles.map(a => a.coverImage).filter(Boolean));
  for (const img of IMAGE_LIBRARY) {
    if (!usedImages.has(img)) return img;
  }
  // If all used, pick randomly
  return IMAGE_LIBRARY[Math.floor(Math.random() * IMAGE_LIBRARY.length)];
}

async function fetchAIFocusedNews() {
  // Query targeted explicitly at Frontier AI, LLM, Gemini, OpenAI, Claude, Benchmarks
  const query = encodeURIComponent('"artificial intelligence" OR "AI model" OR "LLM" OR "OpenAI" OR "Gemini" OR "Anthropic" OR "ChatGPT"');
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

async function generateArticle(newsItem, chosenImage) {
  const prompt = `Anda adalah jurnalis teknologi senior dan AI researcher.
Berdasarkan FAKTA BERITA NYATA berikut, tulis artikel tech explainer mendalam dan faktual dalam Bahasa Indonesia:

FAKTA ASLI BERITA:
- Judul Asli: "${newsItem.title}"
- Sumber Media Kredibel: "${newsItem.source}"
- URL Rujukan: "${newsItem.link}"

PANDUAN KETAT:
1. **ANTI-HOAX & 100% FAKTUAL**: Jelaskan perkembangan model AI, inovasi, perbandingan kemampuan, atau langkah strategis yang dibahas dalam berita asli. Jangan mengarang fitur yang tidak pernah diumumkan.
2. **POLA JUDUL HOOK PERTANYAAN (Wajib format: "Kenapa [Subjek/Model/Perusahaan] [Dampak/Perubahan/Aksi]?")**:
   Contoh gaya:
   - "Kenapa Model Baru OpenAI Ini Mengubah Standar Kecepatan AI?"
   - "Kenapa Pembaruan Gemini Bikin Developer Lebih Hemat Biaya?"
   - "Kenapa Rilis AI Anthropic Ini Menjadi Ancaman Bagi Pesaingnya?"
3. **SUMMARY (Cuplikan 2-3 baris fakta penting)**:
   Mulai dengan intisari pengumuman dan dampaknya (maksimal 160 karakter).
4. **ISI ARTIKEL (400 - 650 kata)**:
   - Format Markdown kaya (##, ###, list poin, kutipan blockquote).
   - Selipkan tag penanda gambar di tengah artikel: ![Ilustrasi Teknologi](IMAGE_PLACEHOLDER)
   - Jelaskan implikasinya bagi developer, industri, dan pengguna akhir.
5. **KATEGORI**:
   Pilih salah satu: "Artificial Intelligence", "Large Language Model", "AI Research", "Developer Tools".

KEMBALIKAN HANYA JSON MURNI DENGAN STRUKTUR BERIKUT:
{
  "title": "Kenapa ...? (judul format pertanyaan)",
  "slug": "kebab-case-judul-tanpa-tanda-tanya",
  "summary": "Ringkasan ringkas 2-3 baris fakta penting...",
  "category": "Kategori terpilih",
  "tags": ["AI", "OpenAI", "Tech"],
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
        { role: 'system', content: 'You are a professional AI journalist returning strictly valid JSON.' },
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

  // Extract JSON object if wrapped by extra comments or unescaped quotes
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    text = text.slice(firstBrace, lastBrace + 1);
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    // Fallback: fix unescaped double quotes inside values
    const sanitized = text.replace(/:\s*"([^"]*)"/g, (match, p1) => {
      return ': "' + p1.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    });
    parsed = JSON.parse(sanitized);
  }
  parsed.content = parsed.content.replace(/IMAGE_PLACEHOLDER/g, chosenImage);

  const now = new Date();
  const formattedDate = formatIndonesianDate(now);

  return {
    id: `post-${Date.now()}`,
    slug: parsed.slug || parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: parsed.title,
    summary: parsed.summary,
    coverImage: chosenImage,
    content: parsed.content,
    category: parsed.category || 'Artificial Intelligence',
    tags: parsed.tags || ['AI', 'Tech'],
    date: formattedDate,
    isoDate: now.toISOString().split('T')[0],
    readTime: parsed.readTime || '3 min read',
    sourceUrl: newsItem.link,
    sourceName: newsItem.source
  };
}

async function main() {
  console.log('Fetching AI frontier news...');
  const news = await fetchAIFocusedNews();
  console.log(`Found ${news.length} AI news sources.`);

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

  // Find fresh news
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
    console.log('All AI news up to date.');
    return;
  }

  const chosenImage = pickUniqueImage(existingBlogs);
  console.log(`Generating AI explainer for: "${candidate.title}" [${candidate.source}]...`);
  const article = await generateArticle(candidate, chosenImage);

  if (existingSlugs.has(article.slug)) {
    article.slug = `${article.slug}-${Date.now().toString().slice(-4)}`;
  }

  existingBlogs.unshift(article);
  fs.mkdirSync(path.dirname(blogsFile), { recursive: true });
  fs.writeFileSync(blogsFile, JSON.stringify(existingBlogs, null, 2), 'utf8');

  console.log(`Success! AI news published: "${article.title}"`);
}

main().catch(err => {
  console.error('Failed to run blog generator:', err);
  process.exit(1);
});
