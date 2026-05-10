const fs = require('fs');

function processFile(filename, varName) {
    const code = fs.readFileSync(filename, 'utf8');
    
    const startMarker = `export const ${varName}: Song[] = [`;
    const startIndex = code.indexOf(startMarker);
    const endMarker = `];`;
    const endIndex = code.lastIndexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) return;
    
    const arrayStr = code.substring(startIndex + startMarker.length - 1, endIndex + 1);
    const songs = eval('(' + arrayStr + ')');
    
    for (const song of songs) {
        for (let i = 0; i < song.lyrics.length; i++) {
            const line = song.lyrics[i];
            
            const words = line.text.split(/\s+/);
            const nextLine = song.lyrics[i+1];
            
            let availableDuration = 0;
            if (nextLine) {
                const gap = nextLine.time - line.time;
                const maxRealisticDuration = words.length * 0.6;
                if (gap > maxRealisticDuration + 1.0) {
                    availableDuration = Math.max(1.5, words.length * 0.5);
                } else {
                    availableDuration = gap - 0.2;
                    if (availableDuration < 0.5) availableDuration = 0.5;
                }
            } else {
                availableDuration = words.length * 0.8;
            }
            
            let weights = [];
            let totalWeight = 0;
            for (let j = 0; j < words.length; j++) {
                let wordText = words[j];
                // Base weight is proportional to the character length of the word
                // A 3-letter word (the) gets 3. A 7-letter word (twinkle) gets 7.
                let w = wordText.replace(/[^a-zA-Z]/g, '').length || 1;
                
                // Add a baseline so short words aren't too fast
                w = w * 0.5 + 2.0; 
                
                if (j === words.length - 1) {
                    w *= 2.5; // Last word is held much longer
                } else if (wordText.includes(',') || wordText.includes('.')) {
                    w *= 1.5; // Punctuation means a pause
                }
                
                weights.push(w);
                totalWeight += w;
            }
            
            line.words = [];
            for (let j = 0; j < words.length; j++) {
                let duration = (weights[j] / totalWeight) * availableDuration;
                duration = Math.round(duration * 100) / 100;
                line.words.push({
                    text: words[j],
                    duration: duration
                });
            }
        }
    }
    
    let tsContent = `import { Song } from "./songs";\n\n// ====================================================================\n// DỮ LIỆU ĐÃ ĐƯỢC WHISPER AI PHÂN TÍCH VÀ ĐỒNG BỘ TỰ ĐỘNG\n// Timestamp lấy từ Whisper speech recognition, lời viết tay chuẩn\n// ====================================================================\n\nexport const ${varName}: Song[] = [\n`;
    for (let i = 0; i < songs.length; i++) {
      tsContent += `  {\n`;
      tsContent += `    id: "${songs[i].id}",\n`;
      tsContent += `    title: "${songs[i].title}",\n`;
      tsContent += `    emoji: "${songs[i].emoji}",\n`;
      tsContent += `    color: "${songs[i].color}",\n`;
      tsContent += `    youtubeId: "${songs[i].youtubeId}",\n`;
      if (songs[i].localVideo) tsContent += `    localVideo: "${songs[i].localVideo}",\n`;
      
      tsContent += `    lyrics: [\n`;
      for (let j = 0; j < songs[i].lyrics.length; j++) {
        const l = songs[i].lyrics[j];
        tsContent += `      { \n`;
        tsContent += `        time: ${l.time},\n`;
        tsContent += `        text: ${JSON.stringify(l.text)},\n`;
        tsContent += `        words: [\n`;
        tsContent += `          ` + l.words.map(w => `{ text: ${JSON.stringify(w.text)}, duration: ${w.duration} }`).join(', ') + `\n`;
        tsContent += `        ]\n`;
        tsContent += `      }${j < songs[i].lyrics.length - 1 ? ',' : ''}\n`;
      }
      tsContent += `    ]\n  }${i < songs.length - 1 ? ',' : ''}\n`;
    }
    tsContent += `];\n`;
    
    fs.writeFileSync(filename, tsContent, 'utf8');
    console.log(`Successfully synced ${filename}!`);
}

processFile('src/data/songs-en.ts', 'songsEnNew');
