import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser
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

// Curated tech photos for cover & inline illustrations
const TECH_IMAGE_COLLECTIONS = {
  ai: [
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=1200&q=80',
  ],
  dev: [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  ],
  cloud: [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
  ],
  hardware: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
  ],
  security: [
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80',
  ],
  gadgets: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
  ]
};

function getRandomImage(cat) {
  const pool = TECH_IMAGE_COLLECTIONS[cat] || TECH_IMAGE_COLLECTIONS.ai;
  return pool[Math.floor(Math.random() * pool.length)];
}

async function fetchGoogleNews() {
  const url = 'https://news.google.com/rss/search?q=technology+AI+software+programming&hl=en-US&gl=US&ceid=US:en';
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

async function generateArticle(newsItem) {
  const prompt = `Anda adalah tech journalist dan software engineer profesional.
Tulis artikel berita blog mendalam, menarik, dan informatif dalam Bahasa Indonesia berdasarkan topik berita teknologi terbaru berikut:

Topik Berita: "${newsItem.title}"
Sumber Asal: "${newsItem.source}"
URL Asal: "${newsItem.link}"

ATURAN PENULISAN:
1. Bahasa Indonesia santai, berbobot, mudah dimengerti, tidak kaku (gaya tech media modern seperti Tech in Asia / DailySocial).
2. Panjang artikel sekitar 400 - 650 kata.
3. Konten format Markdown kaya: gunakan heading (##, ###), paragraf analisis, poin-poin kunci, dan kutipan (blockquotes).
4. Sisipkan minimal 1 gambar pendukung di bagian tengah artikel dengan format:
   ![Ilustrasi Teknologi](IMAGE_PLACEHOLDER)
5. Berikan kategori yang cocok dari: "Artificial Intelligence", "Software Engineering", "Cloud & Web", "Hardware & Chips", "Cybersecurity", "Gadget & Trends".
6. Berikan 3-5 tags relevan.

KEMBALIKAN HANYA JSON MURNI (tanpa backticks markdown atau teks lain di luar JSON) dengan struktur:
{
  "title": "Judul artikel yang menarik dan membuat penasaran (Bahasa Indonesia)",
  "slug": "judul-kebab-case-tanpa-tanda-baca",
  "summary": "Ringkasan 1-2 kalimat (120-160 karakter) yang memikat",
  "category": "Kategori terpilih",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "imageCategory": "ai" | "dev" | "cloud" | "hardware" | "security" | "gadgets",
  "readTime": "3 min read",
  "content": "Isi lengkap artikel dalam format Markdown..."
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
        { role: 'system', content: 'You are an expert tech journalist that returns strictly JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500
    })
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(`Groq API Error: ${JSON.stringify(data.error)}`);
  }

  let text = data.choices[0].message.content.trim();
  // Clean potential ```json wrapping
  if (text.startsWith('```')) {
    text = text.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
  }

  const parsed = JSON.parse(text);
  
  // Assign cover image and inline image
  const imgCat = parsed.imageCategory || 'ai';
  const coverImage = getRandomImage(imgCat);
  let inlineImage = getRandomImage(imgCat);
  if (inlineImage === coverImage) {
    const list = TECH_IMAGE_COLLECTIONS[imgCat] || TECH_IMAGE_COLLECTIONS.ai;
    inlineImage = list[(list.indexOf(coverImage) + 1) % list.length];
  }

  // Replace placeholder in markdown
  parsed.content = parsed.content.replace(/IMAGE_PLACEHOLDER/g, inlineImage);

  return {
    id: `post-${Date.now()}`,
    slug: parsed.slug || parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: parsed.title,
    summary: parsed.summary,
    coverImage,
    content: parsed.content,
    category: parsed.category || 'Tech Trends',
    tags: parsed.tags || ['Tech', 'News'],
    date: new Date().toISOString().split('T')[0],
    readTime: parsed.readTime || '4 min read',
    sourceUrl: newsItem.link,
    sourceName: newsItem.source
  };
}

async function main() {
  console.log('Fetching Google News tech RSS...');
  const news = await fetchGoogleNews();
  console.log(`Found ${news.length} news items.`);

  const blogsFile = path.resolve(__dirname, '../src/data/blogs.json');
  let existingBlogs = [];
  if (fs.existsSync(blogsFile)) {
    try {
      existingBlogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    } catch (e) {
      existingBlogs = [];
    }
  }

  const existingTitles = new Set(existingBlogs.map(b => b.title.toLowerCase()));
  const existingSlugs = new Set(existingBlogs.map(b => b.slug.toLowerCase()));

  // Find first fresh news item
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
    console.log('No new candidate news found. All up to date.');
    return;
  }

  console.log(`Generating article for: "${candidate.title}" (${candidate.source})...`);
  const article = await generateArticle(candidate);
  
  // Ensure unique slug
  if (existingSlugs.has(article.slug)) {
    article.slug = `${article.slug}-${Date.now().toString().slice(-4)}`;
  }

  existingBlogs.unshift(article);
  fs.mkdirSync(path.dirname(blogsFile), { recursive: true });
  fs.writeFileSync(blogsFile, JSON.stringify(existingBlogs, null, 2), 'utf8');

  console.log(`Success! New article published: "${article.title}" [${article.slug}]`);
}

main().catch(err => {
  console.error('Failed to run blog generator:', err);
  process.exit(1);
});
