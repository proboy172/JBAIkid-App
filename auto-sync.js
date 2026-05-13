const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const SONGS_DIR = path.join(__dirname, 'src', 'data');
const EN_FILE = path.join(SONGS_DIR, 'songs-en.json');
const VI_FILE = path.join(SONGS_DIR, 'songs-vi.json');

async function processFile(filePath, lang) {
  if (!fs.existsSync(filePath)) return;
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let pendingSongs = [];

  for (const song of data) {
    if (song.localVideo && !song.aiSynced) {
      pendingSongs.push(song);
    }
  }

  if (pendingSongs.length === 0) {
    console.log(`[${lang.toUpperCase()}] Tất cả bài hát đều đã được đồng bộ AI!`);
    return;
  }

  console.log(`[${lang.toUpperCase()}] Tìm thấy ${pendingSongs.length} bài hát cần đồng bộ...`);

  for (const song of pendingSongs) {
    console.log(`\n▶ Đang xử lý: ${song.title}...`);
    await runPythonScript(lang, song.id);
  }
}

function runPythonScript(lang, songId) {
  return new Promise((resolve, reject) => {
    // Force UTF-8 encoding for python output
    const env = { ...process.env, PYTHONIOENCODING: 'utf-8' };
    const pythonProcess = spawn('python', ['ai-sync-worker.py', lang, songId], { env });

    pythonProcess.stdout.on('data', (data) => {
      process.stdout.write(data.toString('utf-8'));
    });

    pythonProcess.stderr.on('data', (data) => {
      process.stderr.write(data.toString('utf-8'));
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
}

async function main() {
  console.log("==========================================");
  console.log("   🚀 HỆ THỐNG ĐỒNG BỘ KARAOKE AI 100%");
  console.log("==========================================\n");
  
  try {
    await processFile(EN_FILE, 'en');
    await processFile(VI_FILE, 'vi');
    console.log("\n✅ Hoàn thành tất cả!");
  } catch (err) {
    console.error("Lỗi:", err.message);
  }
}

main();
