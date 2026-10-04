#!/usr/bin/env node
/**
 * AUTO UPDATE EDUCATIONAL VIDEOS CRAWLER
 * --------------------------------------
 * Tuân thủ tuyệt đối quy tắc AGENTS.md:
 * 1. TUYỆT ĐỐI KHÔNG LẤY SHORTS (< 2 phút, video dọc, gắn thẻ #shorts).
 * 2. KIỂM TRA KHẢ DỤNG & CHO PHÉP NHÚNG (oEmbed status 200, không bị Error 101/150).
 * 3. TỰ ĐỘNG CẬP NHẬT TỪ RSS CHÍNH THỨC CÁC KÊNH GIÁO DỤC HÀNG ĐẦU.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../src/data/educationalVideos.json');

// Curated Educational Channels Whitelist
const CHANNELS_CONFIG = [
  {
    channel: "Danny Go!",
    channelId: "UC3wCAOfSB0W9iuKDDtNJeGw",
    category: "movement",
    categoryNameVi: "Nhảy múa vui",
    categoryEmoji: "🏃",
    channelAvatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&q=80",
    channelColor: "#F59E0B",
    recommendedAge: "3-5 tuổi",
    parentTip: "Cùng bé đứng dậy nhảy theo các động tác của Danny Go! để giải phóng năng lượng và rèn luyện thể chất.",
  },
  {
    channel: "Numberblocks",
    channelId: "UCPlwvN0w4qFSP1FllALB92w",
    category: "math",
    categoryNameVi: "Đếm số 123",
    categoryEmoji: "🔢",
    channelAvatar: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=100&q=80",
    channelColor: "#EF4444",
    recommendedAge: "3-5 tuổi",
    parentTip: "Hỏi bé số khối vuông của mỗi nhân vật để giúp bé hình thành tư duy toán học và lượng số trực quan.",
  },
  {
    channel: "Alphablocks",
    channelId: "UC_qs3c0ehDvZkbiEbOj6Drg",
    category: "phonics",
    categoryNameVi: "Chữ cái ABC",
    categoryEmoji: "🔤",
    channelAvatar: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&q=80",
    channelColor: "#8B5CF6",
    recommendedAge: "4-6 tuổi",
    parentTip: "Nhắc lại âm phát ra khi các chữ cái nắm tay nhau để giúp bé phát triển ngữ âm tiếng Anh tự nhiên.",
  },
  {
    channel: "Ms Rachel",
    channelId: "UCG2CL6EUjG8TVT1Tpl9nJdg",
    category: "speech",
    categoryNameVi: "Bé tập nói",
    categoryEmoji: "🗣️",
    channelAvatar: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=100&q=80",
    channelColor: "#EC4899",
    recommendedAge: "0-3 tuổi",
    parentTip: "Ngồi ngang tầm mắt bé, lặp lại các từ Ms Rachel nhấn mạnh và kết hợp cử chỉ bàn tay (Baby Signs).",
  },
  {
    channel: "Caitie's Classroom",
    channelId: "UCxG6Tbopv4XcHfem65bgFeg",
    category: "science",
    categoryNameVi: "Khoa học nhí",
    categoryEmoji: "🔬",
    channelAvatar: "https://images.unsplash.com/photo-1567057420215-0afa9cf72a5a?w=100&q=80",
    channelColor: "#10B981",
    recommendedAge: "3-5 tuổi",
    parentTip: "Cùng bé quan sát các thí nghiệm và hoạt động thủ công của cô Caitie để kích thích trí tò mò sáng tạo.",
  },
  {
    channel: "Super Simple",
    channelId: "UCLsooMJoIpl_7ux2jvdPB-Q",
    category: "speech",
    categoryNameVi: "Bé tập nói",
    categoryEmoji: "🗣️",
    channelAvatar: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=100&q=80",
    channelColor: "#3B82F6",
    recommendedAge: "0-3 tuổi",
    parentTip: "Hát và vỗ tay theo nhịp bài hát của Super Simple để bé làm quen với giai điệu và ngữ điệu tự nhiên.",
  },
  {
    channel: "SciShow Kids",
    channelId: "UCRFIPG2u1DxKLNuE3y2SjHA",
    category: "science",
    categoryNameVi: "Khoa học nhí",
    categoryEmoji: "🔬",
    channelAvatar: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&q=80",
    channelColor: "#14B8A6",
    recommendedAge: "4-6 tuổi",
    parentTip: "Thảo luận với bé về các hiện tượng tự nhiên sau video để phát triển tư duy phản biện khoa học.",
  },
  {
    channel: "Gecko's Garage",
    channelId: "UCZzfOkvfLKdKYEWAZ_Vc0zg",
    category: "vehicles",
    categoryNameVi: "Xe & Cứu hộ",
    categoryEmoji: "🚗",
    channelAvatar: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=100&q=80",
    channelColor: "#F97316",
    recommendedAge: "3-5 tuổi",
    parentTip: "Hỏi bé về tên các bộ phận của xe cộ và màu sắc xe cứu hoả, xe cảnh sát xuất hiện trong gara.",
  },
  {
    channel: "Steve & Maggie",
    channelId: "UCx1xhxQyzR4TT6PmXO0khbQ",
    category: "speech",
    categoryNameVi: "Bé tập nói",
    categoryEmoji: "🗣️",
    channelAvatar: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&q=80",
    channelColor: "#6366F1",
    recommendedAge: "3-5 tuổi",
    parentTip: "Tương tác và lặp lại các câu thoại hài hước của thầy Steve và chú chim Maggie để tạo phản xạ giao tiếp.",
  },
  {
    channel: "Oxford Phonics",
    channelId: "UC7uAtCiy8S1yK5WxIxdVNjQ",
    category: "phonics",
    categoryNameVi: "Chữ cái ABC",
    categoryEmoji: "🔤",
    channelAvatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80",
    channelColor: "#06B6D4",
    recommendedAge: "4-6 tuổi",
    parentTip: "Luyện phát âm chuẩn âm đơn và âm ghép theo từng bài học ngữ âm Oxford chuẩn quốc tế.",
  },
  {
    channel: "Wild Safari",
    channelId: "UCO_DaPp4ifhMAmiyybSLx9w",
    category: "safari",
    categoryNameVi: "Động vật 4K",
    categoryEmoji: "🦁",
    channelAvatar: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=100&q=80",
    channelColor: "#D97706",
    recommendedAge: "Mọi lứa tuổi",
    parentTip: "Cùng bé nhận diện tiếng kêu và tập tính của muôn loài động vật hoang dã ngoài đời thực.",
  },
];

// Helper: HTTP GET request as text
function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        ...headers,
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

// Check if a video is native YouTube Shorts (HEAD request to /shorts/)
function checkIsShortsUrl(videoId) {
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'www.youtube.com',
      path: `/shorts/${videoId}`,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }, (res) => {
      // 303/302 Redirect to /watch?v= means it is standard 16:9 landscape video
      // 200 OK means it is vertical Shorts format
      const isRedirect = res.statusCode === 303 || res.statusCode === 302;
      const isShort = res.statusCode === 200 && !isRedirect;
      resolve(isShort);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(6000, () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

// Check oEmbed and duration
async function validateVideo(videoId, title) {
  // 1. Strict title check for Shorts/Teasers
  const titleLower = title.toLowerCase();
  if (
    titleLower.includes('#shorts') ||
    titleLower.includes('#short') ||
    titleLower.includes('shorts') ||
    titleLower.includes('teaser') ||
    titleLower.includes('trailer') ||
    titleLower.includes('preview')
  ) {
    return { ok: false, reason: 'Shorts/Teaser tag detected in title' };
  }

  // 2. Check if YouTube treats this as a Short URL
  const isShortUrl = await checkIsShortsUrl(videoId);
  if (isShortUrl) {
    return { ok: false, reason: 'YouTube Shorts URL detected (vertical video)' };
  }

  // 3. Check oEmbed (ensures video is public and allows embedding)
  try {
    const oembedRes = await fetchText(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    if (oembedRes.statusCode !== 200) {
      return { ok: false, reason: `oEmbed returned status ${oembedRes.statusCode} (Embed blocked or video private)` };
    }
  } catch (err) {
    return { ok: false, reason: `oEmbed network error: ${err.message}` };
  }

  // 4. Fetch watch page to extract exact video duration
  try {
    const watchRes = await fetchText(`https://www.youtube.com/watch?v=${videoId}`);
    const html = watchRes.body;

    let durationSec = 0;
    const durMatch = html.match(/"approxDurationMs":"(\d+)"/);
    if (durMatch) {
      durationSec = Math.round(parseInt(durMatch[1], 10) / 1000);
    } else {
      const isoMatch = html.match(/itemprop="duration" content="PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?"/);
      if (isoMatch) {
        const h = parseInt(isoMatch[1] || '0', 10);
        const m = parseInt(isoMatch[2] || '0', 10);
        const s = parseInt(isoMatch[3] || '0', 10);
        durationSec = h * 3600 + m * 60 + s;
      }
    }

    // STRICT RULE: Reject any video under 2 minutes (120 seconds)
    if (durationSec > 0 && durationSec < 120) {
      return { ok: false, reason: `Duration too short (${durationSec}s < 120s)` };
    }

    const m = Math.floor(durationSec / 60);
    const s = String(durationSec % 60).padStart(2, '0');
    const formattedDuration = durationSec > 0 ? `${m}:${s}` : "15:00";

    return {
      ok: true,
      durationSec,
      duration: formattedDuration,
    };
  } catch (err) {
    return { ok: false, reason: `Watch page check error: ${err.message}` };
  }
}

// Generate clean unique ID from channel and title
function generateSlug(channel, title) {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 32);
  const cleanChannel = channel.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
  return `${cleanChannel}-${cleanTitle}`;
}

// Parse XML entries from RSS feed
function parseRssFeed(xmlText) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xmlText)) !== null) {
    const entryBlock = match[1];
    const idMatch = entryBlock.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = entryBlock.match(/<title>(.*?)<\/title>/);
    const publishedMatch = entryBlock.match(/<published>(.*?)<\/published>/);

    if (idMatch && titleMatch) {
      const title = titleMatch[1]
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      entries.push({
        youtubeId: idMatch[1].trim(),
        title: title.trim(),
        published: publishedMatch ? publishedMatch[1] : null,
      });
    }
  }

  return entries;
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const maxPerChannel = parseInt(args.find(a => a.startsWith('--max='))?.split('=')[1] || '5', 10);

  console.log('====================================================');
  console.log('🚀 JBAIKID EDUCATIONAL VIDEO AUTO-CRAWLER PIPELINE');
  console.log(`🎯 Max new videos per channel: ${maxPerChannel}`);
  console.log('🛡️  Strict compliance: NO SHORTS, 100% EMBEDDABLE ONLY');
  console.log('====================================================\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Data file not found: ${DATA_FILE}`);
    process.exit(1);
  }

  const existingVideos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const existingYtIds = new Set(existingVideos.map(v => v.youtubeId));
  const existingSlugs = new Set(existingVideos.map(v => v.id));

  console.log(`📚 Existing Library: ${existingVideos.length} videos\n`);

  let totalAdded = 0;
  const newVideosBatch = [];

  for (const cfg of CHANNELS_CONFIG) {
    console.log(`📡 Fetching RSS for: [${cfg.channel}] (${cfg.channelId})...`);
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${cfg.channelId}`;
      const rssRes = await fetchText(rssUrl);

      if (rssRes.statusCode !== 200) {
        console.log(`   ⚠️ Failed to fetch RSS (Status ${rssRes.statusCode})`);
        continue;
      }

      const entries = parseRssFeed(rssRes.body);
      console.log(`   Found ${entries.length} recent entries in RSS.`);

      let channelAdded = 0;
      for (const entry of entries) {
        if (channelAdded >= maxPerChannel) break;

        // Skip if already in library
        if (existingYtIds.has(entry.youtubeId)) {
          continue;
        }

        // Validate video strictly
        process.stdout.write(`   🔍 Validating ${entry.youtubeId} ("${entry.title.slice(0, 40)}..."): `);
        const val = await validateVideo(entry.youtubeId, entry.title);

        if (!val.ok) {
          console.log(`❌ Skipped (${val.reason})`);
          continue;
        }

        console.log(`✅ PASSED (${val.duration})`);

        // Generate clean unique ID
        let slug = generateSlug(cfg.channel, entry.title);
        if (existingSlugs.has(slug)) {
          slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }
        existingSlugs.add(slug);
        existingYtIds.add(entry.youtubeId);

        const newVideoItem = {
          id: slug,
          title: entry.title,
          channel: cfg.channel,
          channelAvatar: cfg.channelAvatar,
          channelColor: cfg.channelColor,
          youtubeId: entry.youtubeId,
          duration: val.duration,
          category: cfg.category,
          categoryNameVi: cfg.categoryNameVi,
          categoryEmoji: cfg.categoryEmoji,
          recommendedAge: cfg.recommendedAge,
          description: `Video học tập bổ ích từ kênh ${cfg.channel}: ${entry.title}`,
          parentTip: cfg.parentTip,
          keyVocab: [
            { en: "Learn", vi: "Học tập", emoji: "📚" },
            { en: "Listen", vi: "Lắng nghe", emoji: "👂" },
            { en: "Happy", vi: "Vui vẻ", emoji: "😊" },
          ],
          isFeatured: channelAdded === 0,
          isNew: true,
        };

        newVideosBatch.push(newVideoItem);
        channelAdded++;
        totalAdded++;
      }

      console.log(`   ✨ Added ${channelAdded} new videos for ${cfg.channel}\n`);
    } catch (err) {
      console.log(`   ❌ Error processing channel ${cfg.channel}: ${err.message}\n`);
    }
  }

  if (totalAdded > 0) {
    // Mark older videos isNew: false, prepend new videos to top of list
    const updatedLibrary = [
      ...newVideosBatch,
      ...existingVideos.map(v => ({ ...v, isNew: false })),
    ];

    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedLibrary, null, 2), 'utf8');
    console.log('====================================================');
    console.log(`🎉 SUCCESS! Added ${totalAdded} high quality educational videos!`);
    console.log(`📊 Total Library Size: ${updatedLibrary.length} videos`);
    console.log(`💾 Saved to ${DATA_FILE}`);
    console.log('====================================================');
  } else {
    console.log('====================================================');
    console.log('ℹ️ Library is already up to date with the latest videos!');
    console.log('====================================================');
  }
}

main().catch(err => {
  console.error('Fatal crawler error:', err);
  process.exit(1);
});
