const fs = require('fs');
const path = require('path');

const videoDir = path.join(__dirname, 'public', 'videos');

let content = fs.readFileSync('src/data/songs.ts', 'utf8');

// Tìm tất cả id và gán localVideo nếu file video tồn tại
const songIdRegex = /id:\s*"([a-z0-9-]+)",/g;
let match;

const ids = [];
while ((match = songIdRegex.exec(content)) !== null) {
  const id = match[1];
  const videoPath = path.join(videoDir, `${id}.mp4`);
  if (fs.existsSync(videoPath) && fs.statSync(videoPath).size > 100000) {
    ids.push(id);
  }
}

console.log(`Found ${ids.length} downloaded videos`);

// Remove existing localVideo lines first (cleanup)
content = content.replace(/\s*localVideo:\s*"\/videos\/[^"]+",?\n/g, '\n');

// Insert localVideo after youtubeId for each downloaded song
for (const id of ids) {
  // Find the song block and add localVideo after the youtubeId line
  const pattern = new RegExp(`(id: "${id}",[\\s\\S]*?youtubeId: "[^"]+",)`, 'g');
  content = content.replace(pattern, `$1\n    localVideo: "/videos/${id}.mp4",`);
}

fs.writeFileSync('src/data/songs.ts', content);
console.log('Updated songs.ts with localVideo paths!');
console.log('Songs with local video:', ids.join(', '));
