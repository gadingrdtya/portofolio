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

// Multi-category topic pools to ensure balanced variety
const TOPIC_CHANNELS = [
  {
    category: 'Software Engineering',
    query: '"software engineering" OR "web development" OR "TypeScript" OR "React" OR "Next.js" OR "Rust language" OR "Python framework"'
  },
  {
    category: 'Cybersecurity',
    query: '"cybersecurity" OR "zero-day vulnerability" OR "data encryption" OR "API security" OR "security patch"'
  },
  {
    category: 'Cloud & DevOps',
    query: '"cloud computing" OR "Kubernetes" OR "Docker container" OR "AWS architecture" OR "microservices" OR "serverless"'
  },
  {
    category: 'Artificial Intelligence',
    query: '"AI model" OR "LLM benchmark" OR "open source AI" OR "machine learning architecture" OR "neural network"'
  },
  {
    category: 'Hardware & Chips',
    query: '"semiconductor" OR "RISC-V" OR "TSMC process" OR "GPU architecture" OR "quantum processor"'
  }
];

// Negative blacklist: filter out crime, death, tragic accidents, lawsuits, sensational gossip
const FORBIDDEN_WORDS = [
  'death', 'dead', 'died', 'kill', 'killer', 'killing', 'murder', 'suicide',
  'seizure', 'fatal', 'fatality', 'victim', 'tragedy', 'mourn', 'grief',
  'lawsuit', 'sue', 'sued', 'suing', 'court', 'judge', 'trial', 'sentenced', 'prison',
  'crime', 'criminal', 'arrest', 'arrested', 'fraud', 'scam', 'bribe', 'corruption',
  'layoff', 'fired', 'fired employee', 'controversy', 'scandal'
];

function isForbiddenContent(text) {
  const lower = text.toLowerCase();
  return FORBIDDEN_WORDS.some(word => lower.includes(word));
}

function extractKeywords(str) {
  const stopwords = new Set([
    'what', 'when', 'where', 'which', 'with', 'from', 'this', 'that', 'have',
    'more', 'about', 'will', 'been', 'were', 'into', 'they', 'their', 'then',
    'these', 'those', 'also', 'after', 'before', 'could', 'would', 'should',
    'report', 'reports', 'news', 'says', 'said', 'over', 'under', 'between'
  ]);
  return new Set(
    str.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopwords.has(w))
  );
}

function isDuplicateTopic(newTitle, existingArticles) {
  const newKeywords = extractKeywords(newTitle);
  if (newKeywords.size === 0) return false;

  for (const art of existingArticles) {
    const existingKeywords = extractKeywords(art.title + ' ' + (art.summary || ''));
    let sharedCount = 0;
    for (const kw of newKeywords) {
      if (existingKeywords.has(kw)) sharedCount++;
    }
    // If 3 or more significant keywords match, reject as duplicate story
    if (sharedCount >= 3) {
      return true;
    }
  }
  return false;
}

async function fetchNewsForCategory(channel) {
  const encodedQuery = encodeURIComponent(channel.query);
  const url = `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-US&gl=US&ceid=US:en`;
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

      // Filter out sensational / morbid / forbidden topics
      if (!isForbiddenContent(rawTitle)) {
        items.push({
          title: rawTitle,
          source,
          link: linkMatch ? linkMatch[1] : '',
          pubDate: dateMatch ? dateMatch[1] : new Date().toISOString(),
          targetCategory: channel.category
        });
      }
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
  const prompt = `Anda adalah jurnalis teknologi senior dan lead software engineer.
Tulis artikel tech explainer mendalam, berbobot, dan faktual dalam Bahasa Indonesia berdasarkan berita nyata berikut:

FAKTA ASLI BERITA:
- Judul Asli: "${newsItem.title}"
- Sumber Media Kredibel: "${newsItem.source}"
- URL Rujukan: "${newsItem.link}"
- Kategori Fokus: "${newsItem.targetCategory}"

PANDUAN KETAT:
1. **ANTI-HOAX & 100% FAKTUAL**: Tulis murni berdasarkan fakta berita rujukan. Jelaskan arsitektur teknis, latar belakang, dan solusi di baliknya.
2. **POLA JUDUL HOOK PERTANYAAN (Wajib dimulai dengan kata "Kenapa ...?")**:
   Contoh:
   - "Kenapa Arsitektur Microservices Mulai Ditinggalkan oleh Startup Skala Menengah?"
   - "Kenapa Celah Zero-Day pada Web Server Ini Menuntut Mitigasi Segera?"
   - "Kenapa Rust Semakin Populer untuk Pengganti Modul Kritis di Backend?"
   - "Kenapa Standar Baru Enkripsi Ini Penting Menjelang Era Komputasi Kuantum?"
3. **SUMMARY (Cuplikan 2-3 baris fakta penting)**:
   Ringkasan singkat fakta pengumuman atau inovasi (maksimal 160 karakter).
4. **ISI ARTIKEL (400 - 600 kata)**:
   - MURNI TULISAN/TEKS. JANGAN MEMASUKKAN TAG GAMBAR DALAM BENTUK APAPUN (Dilarang ada format ![...](...)).
   - Format Markdown kaya: gunakan heading (##, ###), poin-poin analisis penting, dan kutipan (blockquotes).
5. **KATEGORI**:
   Gunakan kategori "${newsItem.targetCategory}".

KEMBALIKAN HANYA JSON MURNI DENGAN STRUKTUR BERIKUT:
{
  "title": "Kenapa ...? (judul format pertanyaan)",
  "slug": "kebab-case-judul-tanpa-tanda-tanya",
  "summary": "Ringkasan ringkas 2-3 baris fakta penting...",
  "category": "${newsItem.targetCategory}",
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
        { role: 'system', content: 'You are an elite tech journalist returning strictly valid JSON without any image tags.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.5,
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

  // Safety clean: strip any accidental image tags
  parsed.content = parsed.content.replace(/!\[.*?\]\(.*?\)\n*/g, '');

  const now = new Date();
  const formattedDate = formatIndonesianDate(now);

  return {
    id: `post-${Date.now()}`,
    slug: parsed.slug || parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: parsed.title,
    summary: parsed.summary,
    content: parsed.content,
    category: newsItem.targetCategory,
    tags: parsed.tags || ['Technology', 'Engineering'],
    date: formattedDate,
    isoDate: now.toISOString().split('T')[0],
    readTime: parsed.readTime || '3 min read',
    sourceUrl: newsItem.link,
    sourceName: newsItem.source
  };
}

async function main() {
  const blogsFile = path.resolve(__dirname, '../src/data/blogs.json');
  let existingBlogs = [];
  if (fs.existsSync(blogsFile)) {
    try {
      existingBlogs = JSON.parse(fs.readFileSync(blogsFile, 'utf8'));
    } catch (e) {
      existingBlogs = [];
    }
  }

  // 1. RULE: MAX 2 ARTICLES PUBLISHED PER DAY
  const todayIso = new Date().toISOString().split('T')[0];
  const countToday = existingBlogs.filter(b => b.isoDate === todayIso).length;
  if (countToday >= 2) {
    console.log(`Daily quota reached: already published ${countToday} articles on ${todayIso}. Skipping today.`);
    return;
  }

  // 2. CATEGORY ROTATION: Pick the category least recently published
  const recentCategories = existingBlogs.slice(0, 5).map(b => b.category);
  const sortedChannels = [...TOPIC_CHANNELS].sort((a, b) => {
    const lastIndexA = recentCategories.indexOf(a.category);
    const lastIndexB = recentCategories.indexOf(b.category);
    // If not present in recent, prioritize it (give high index)
    const priorityA = lastIndexA === -1 ? 999 : lastIndexA;
    const priorityB = lastIndexB === -1 ? 999 : lastIndexB;
    return priorityB - priorityA;
  });

  console.log(`Targeting category: ${sortedChannels[0].category}`);

  let candidate = null;
  // Try preferred channels in order of freshness
  for (const channel of sortedChannels) {
    console.log(`Searching fresh news for category: ${channel.category}...`);
    const news = await fetchNewsForCategory(channel);

    for (const item of news) {
      const alreadyHasUrl = existingBlogs.some(b => b.sourceUrl === item.link);
      const isDuplicate = isDuplicateTopic(item.title, existingBlogs);

      if (!alreadyHasUrl && !isDuplicate) {
        candidate = item;
        break;
      }
    }
    if (candidate) break;
  }

  if (!candidate) {
    console.log('No fresh distinct news found across all categories.');
    return;
  }

  console.log(`Found candidate: "${candidate.title}" [${candidate.source}] (${candidate.targetCategory})`);
  console.log('Generating structured article via Groq...');
  const article = await generateArticle(candidate);

  const existingSlugs = new Set(existingBlogs.map(b => b.slug.toLowerCase()));
  if (existingSlugs.has(article.slug)) {
    article.slug = `${article.slug}-${Date.now().toString().slice(-4)}`;
  }

  existingBlogs.unshift(article);
  fs.mkdirSync(path.dirname(blogsFile), { recursive: true });
  fs.writeFileSync(blogsFile, JSON.stringify(existingBlogs, null, 2), 'utf8');

  console.log(`Success! Published article #${countToday + 1} for ${todayIso}: "${article.title}"`);
}

main().catch(err => {
  console.error('Failed to run blog generator:', err);
  process.exit(1);
});
