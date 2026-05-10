const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Toàn bộ danh sách bài hát
const songs = [
  // Tiếng Anh
  { id: 'twinkle', youtubeId: '-4Mg7fnvxSE' },
  { id: 'old-macdonald', youtubeId: 'U-SyODCCfFE' },
  { id: 'baby-shark', youtubeId: 'x_YBEYKQl_Y' },
  { id: 'wheels-on-bus', youtubeId: 'XdrgHGo70Nw' },
  { id: 'head-shoulders', youtubeId: 'lpBFYRatzzc' },
  { id: 'itsy-bitsy-spider', youtubeId: 'wyTKE5hxBAo' },
  { id: 'five-little-monkeys', youtubeId: 'oyYvqANIXUk' },
  { id: 'baa-baa-black-sheep', youtubeId: '4VPnVH1ghCg' },
  { id: 'if-youre-happy', youtubeId: 'M6zpfu2HODE' },
  { id: 'row-your-boat', youtubeId: 'tkivDao-Ip0' },
  { id: 'bingo', youtubeId: 'dBPqsDJ-eog' },
  { id: 'abc-song', youtubeId: 'E7KyWrDgJ3A' },
  { id: 'hickory-dickory', youtubeId: 'UrmlgBdvf18' },
  { id: 'london-bridge', youtubeId: 'EHbDFi7RNH8' },
  { id: 'mary-had-lamb', youtubeId: 'b-7pInWFqb0' },
  // Tiếng Việt
  { id: 'ca-nha-thuong-nhau', youtubeId: 'JspIY79HdY8' },
  { id: 'con-co-be-be', youtubeId: 'jO2vrSXVDo0' },
  { id: 'bong-bong-bang-bang', youtubeId: 'BwN3NiZt-PU' },
  { id: 'chau-len-ba', youtubeId: 'Y1Gst_tvUYs' },
  { id: 'rua-mat-nhu-meo', youtubeId: 'azQJNPftwhw' },
  { id: 'chu-ech-con', youtubeId: 'UB6RylHKwM8' },
  { id: 'hai-con-than-lan', youtubeId: 'HEiFX80Nl14' },
  { id: 'mot-con-vit', youtubeId: 'zh_PH_XmS4A' },
  { id: 'ba-ba-di-ban', youtubeId: 'bUPjHREH1aQ' },
  { id: 'dan-ga-trong-san', youtubeId: 'z0XtQPxsKtQ' },
  { id: 'bac-kim-thang', youtubeId: 'kHzFS_PypYw' },
  { id: 'chi-ong-nau', youtubeId: 'PZDnjOn5EII' },
  { id: 'qua-gi', youtubeId: 'Kuygwgxvf1c' },
  { id: 'trai-dat-nay', youtubeId: 'bi0cjhG6ulg' },
  { id: 'me-oi-tai-sao', youtubeId: 's3_jm0aMktQ' },
];

const ytdlp = path.join(__dirname, 'yt-dlp.exe');
const results = [];

for (const song of songs) {
  const outFile = path.join(outputDir, `${song.id}.mp4`);
  
  if (fs.existsSync(outFile)) {
    const size = fs.statSync(outFile).size;
    if (size > 100000) { // > 100KB = valid
      console.log(`[SKIP] ${song.id} already downloaded`);
      results.push({ id: song.id, success: true, path: `/videos/${song.id}.mp4` });
      continue;
    }
  }

  console.log(`[DL] Downloading ${song.id} (${song.youtubeId})...`);
  
  const result = spawnSync(ytdlp, [
    `https://www.youtube.com/watch?v=${song.youtubeId}`,
    '--js-runtimes', 'node',
    '-f', 'best[height<=480]',
    '--merge-output-format', 'mp4',
    '-o', outFile,
    '--no-playlist',
    '--quiet',
  ], { encoding: 'utf8', timeout: 180000 });

  if (result.status === 0 && fs.existsSync(outFile)) {
    const size = (fs.statSync(outFile).size / 1024 / 1024).toFixed(1);
    console.log(`[OK] ${song.id} - ${size}MB`);
    results.push({ id: song.id, success: true, path: `/videos/${song.id}.mp4` });
  } else {
    console.log(`[FAIL] ${song.id}: ${result.stderr?.substring(0,200) || 'unknown error'}`);
    results.push({ id: song.id, success: false });
  }
}

fs.writeFileSync('download-results.json', JSON.stringify(results, null, 2));
console.log('\n=== RESULTS ===');
console.log('Success:', results.filter(r => r.success).length);
console.log('Failed:', results.filter(r => !r.success).length);
console.log('\nFailed IDs:');
results.filter(r => !r.success).forEach(r => console.log(' -', r.id));
