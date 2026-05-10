/**
 * Ghép timestamp Whisper AI với lời bài hát đúng (đã có sẵn)
 * Whisper cho ta THỜI GIAN chính xác, lời ta đã có rồi
 * 
 * Logic: Lấy timestamp bắt đầu của mỗi segment Whisper, 
 * map với lời bài hát chuẩn theo thứ tự
 */
const fs = require('fs');
const path = require('path');

const whisperResults = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'whisper_results.json'), 'utf-8')
);

// Lời bài hát CHUẨN (tiếng Việt) - lấy từ dữ liệu đã có
const CORRECT_LYRICS = {
  "ca-nha-thuong-nhau": [
    "Ba là cây nến vàng",
    "Mẹ là cây nến xanh", 
    "Con là cây nến hồng",
    "Ba ngọn nến lung linh",
    "Thắp sáng một gia đình",
    "Gia đình nhỏ, niềm vui to",
    "Ba bắt cá dưới sông",
    "Mẹ trồng rau trên vườn",
    "Con chăn trâu trên đồng",
    "Cả nhà cùng chung sống",
    "Cả nhà ta bé ơi",
    "Rất là vui, rất là vui"
  ],
  "chau-len-ba": [
    "Cháu lên ba cháu đi mẫu giáo",
    "Cô thương cháu vì cháu không khóc nhè",
    "Không khóc nhè để mẹ trồng cây trái",
    "Ba vào nhà máy, ông bà vui cấy cày",
    "Là lá la la, là lá la la",
    "Cháu lên ba cháu đi mẫu giáo",
    "Cô thương cháu vì cháu không khóc nhè",
    "Không khóc nhè để mẹ trồng cây trái",
    "Ba vào nhà máy, ông bà vui cấy cày",
    "Là lá la la, là lá la la"
  ],
  "rua-mat-nhu-meo": [
    "Meo meo meo, rửa mặt như mèo",
    "Xấu xấu lắm, chẳng được mẹ yêu",
    "Khăn mặt đâu mà ngồi liếm mép",
    "Đau mắt rồi, lại khóc meo meo",
    "Meo meo meo, rửa mặt như mèo",
    "Xấu xấu lắm, chẳng được mẹ yêu",
    "Khăn mặt đâu mà ngồi liếm mép",
    "Đau mắt rồi, lại khóc meo meo"
  ],
  "chu-ech-con": [
    "Kìa chú là chú ếch con",
    "Có hai là hai mắt tròn",
    "Chú ngồi học bài một mình",
    "Bên hố bom kề vườn xoan",
    "Bao nhiêu cô cá tung tăng",
    "Cùng bao nhiêu chú cá rô",
    "Kìa chú là chú ếch con",
    "Có hai là hai mắt tròn",
    "Chú ngồi học bài một mình",
    "Bên hố bom kề vườn xoan"
  ],
  "ba-ba-di-ban": [
    "Ba bà đi bán lợn con",
    "Bán đi chẳng được lon ton chạy về",
    "Ba bà đi bán lợn sề",
    "Bán đi chẳng được lon ton chạy về",
    "Ba bà đi bán lợn con",
    "Bán đi chẳng được lon ton chạy về",
    "Ba bà đi bán lợn sề",
    "Bán đi chẳng được lon ton chạy về"
  ],
  "dan-ga-trong-san": [
    "Gà không biết gáy là con gà con",
    "Gà mà biết gáy là con gà trống",
    "Gà mà không biết gáy là con gà mẹ",
    "Đi loanh quanh trong sân có con gà, có con gà",
    "Gà không biết gáy là con gà con",
    "Gà mà biết gáy là con gà trống",
    "Gà mà không biết gáy là con gà mẹ",
    "Đi loanh quanh trong sân có con gà, có con gà"
  ],
  "bac-kim-thang": [
    "Bắc kim thang cà lang bí rợ",
    "Cột qua kèo là kèo qua cột",
    "Chú bán dầu qua cầu mà té",
    "Chú bán ếch ở lại làm chi",
    "Con le le đánh trống thổi kèn",
    "Con bìm bịp khánh tận tò tí te tò te",
    "Bắc kim thang cà lang bí rợ",
    "Cột qua kèo là kèo qua cột",
    "Chú bán dầu qua cầu mà té",
    "Chú bán ếch ở lại làm chi"
  ],
  "chi-ong-nau": [
    "Chị ong nâu nâu nâu nâu",
    "Chị bay đi đâu đi đâu",
    "Bác gà trống mới gáy",
    "Ông mặt trời mới dậy",
    "Trên những cành hoa em đã thấy chị bay",
    "Bé ngoan của chị ơi",
    "Hôm nay trời nắng tươi",
    "Chị bay đi tìm nhụy",
    "Làm mật ong nuôi đời",
    "Chị vâng theo bố mẹ",
    "Chăm làm không nên lười"
  ],
  "trai-dat-nay": [
    "Trái đất này là của chúng mình",
    "Quả bóng xanh bay giữa trời xanh",
    "Bồ câu ơi tiếng chim gù thương mến",
    "Hải âu ơi cánh chim vờn sóng biển",
    "Cùng bay nào cho trái đất quay",
    "Cùng bay nào cho trái đất quay",
    "Trái đất này là của chúng mình",
    "Quả bóng xanh bay giữa trời xanh",
    "Bồ câu ơi tiếng chim gù thương mến",
    "Hải âu ơi cánh chim vờn sóng biển"
  ]
};

console.log("=== MERGING WHISPER TIMESTAMPS WITH CORRECT LYRICS ===\n");

const merged = {};

for (const [songId, correctLines] of Object.entries(CORRECT_LYRICS)) {
  const whisperData = whisperResults[songId];
  if (!whisperData || whisperData.length === 0) {
    console.log(`SKIP ${songId}: no Whisper data`);
    continue;
  }

  // Lấy timestamps từ Whisper segments
  const timestamps = whisperData.map(s => s.time);
  
  // Map: mỗi lời bài hát → 1 timestamp tương ứng
  const result = [];
  
  if (timestamps.length >= correctLines.length) {
    // Whisper có nhiều hơn hoặc bằng → phân bổ đều
    const step = timestamps.length / correctLines.length;
    for (let i = 0; i < correctLines.length; i++) {
      const idx = Math.min(Math.floor(i * step), timestamps.length - 1);
      result.push({ time: timestamps[idx], text: correctLines[i] });
    }
  } else {
    // Whisper có ít hơn → nội suy thời gian
    for (let i = 0; i < correctLines.length; i++) {
      if (i < timestamps.length) {
        result.push({ time: timestamps[i], text: correctLines[i] });
      } else {
        // Nội suy: thêm ~4 giây cho mỗi câu sau
        const lastTime = result[result.length - 1].time;
        result.push({ time: Math.round((lastTime + 4) * 10) / 10, text: correctLines[i] });
      }
    }
  }

  merged[songId] = result;
  console.log(`✅ ${songId}: ${result.length} lines`);
  result.forEach(l => console.log(`   ${l.time}s: ${l.text}`));
  console.log();
}

// Lưu kết quả
fs.writeFileSync(
  path.join(__dirname, 'merged_lyrics.json'),
  JSON.stringify(merged, null, 2),
  'utf-8'
);

console.log(`\nSaved to merged_lyrics.json (${Object.keys(merged).length} songs)`);
