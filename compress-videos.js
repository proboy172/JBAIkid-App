const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const VIDEOS_DIR = path.join(__dirname, 'public', 'videos');

async function compressVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`Bắt đầu nén: ${path.basename(inputPath)}`);
    
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',
        '-preset veryfast',
        '-crf 28',         // Mức nén khá cao nhưng vẫn giữ được chất lượng ổn cho di động
        '-maxrate 1000k',   // Giới hạn bitrate tối đa để tránh file phình to
        '-bufsize 2000k',
        '-vf scale=-2:720', // Giảm độ phân giải xuống tối đa 720p
        '-c:a aac',
        '-b:a 96k'
      ])
      .on('end', () => {
        console.log(`✅ Hoàn thành: ${path.basename(inputPath)}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Lỗi khi nén ${path.basename(inputPath)}:`, err.message);
        reject(err);
      })
      .save(outputPath);
  });
}

async function main() {
  if (!fs.existsSync(VIDEOS_DIR)) {
    console.error('Thư mục public/videos không tồn tại!');
    return;
  }

  const files = fs.readdirSync(VIDEOS_DIR).filter(file => file.endsWith('.mp4') && !file.endsWith('.comp.mp4'));
  
  if (files.length === 0) {
    console.log('Không tìm thấy video nào cần nén.');
    return;
  }

  console.log(`Tìm thấy ${files.length} video. Quá trình này có thể mất khá nhiều thời gian...`);

  let totalSaved = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(VIDEOS_DIR, file);
    const outputPath = path.join(VIDEOS_DIR, file.replace('.mp4', '.comp.mp4'));
    
    // Bỏ qua nếu file gốc đã nhỏ hơn 20MB (đã được tối ưu tốt từ trước)
    const stats = fs.statSync(inputPath);
    const sizeInMB = stats.size / (1024 * 1024);
    
    if (sizeInMB < 20) {
      console.log(`⏩ Bỏ qua ${file} vì dung lượng đã rất nhỏ (${sizeInMB.toFixed(2)} MB)`);
      continue;
    }

    try {
      console.log(`\n[${i + 1}/${files.length}] Đang xử lý: ${file} (${sizeInMB.toFixed(2)} MB)`);
      await compressVideo(inputPath, outputPath);
      
      const newStats = fs.statSync(outputPath);
      const newSizeInMB = newStats.size / (1024 * 1024);
      
      console.log(`📊 Đã giảm từ ${sizeInMB.toFixed(2)} MB xuống ${newSizeInMB.toFixed(2)} MB (Tiết kiệm ${(sizeInMB - newSizeInMB).toFixed(2)} MB)`);
      totalSaved += (sizeInMB - newSizeInMB);
      
      // Ghi đè file gốc
      fs.unlinkSync(inputPath);
      fs.renameSync(outputPath, inputPath);
      
    } catch (err) {
      console.error(`Bỏ qua ${file} do lỗi.`);
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath); // Xóa file rác nếu nén thất bại
      }
    }
  }

  console.log(`\n🎉 HOÀN TẤT! Tổng cộng đã tiết kiệm được ${totalSaved.toFixed(2)} MB không gian lưu trữ.`);
}

main().catch(console.error);
