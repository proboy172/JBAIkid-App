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
            
            // Re-calculate ALL lines except if we manually marked it perfect. 
            // We'll just recalculate everything based on the pure start times!
            const words = line.text.split(/\s+/);
            const nextLine = song.lyrics[i+1];
            
            let availableDuration = 0;
            if (nextLine) {
                // The duration of the line is exactly the time until the NEXT line starts, minus a tiny 0.2s pause for breath
                const gap = nextLine.time - line.time;
                if (gap > 6) {
                    // Instrumental break detected! Cap the singing time to a realistic length
                    availableDuration = Math.max(2, words.length * 0.8);
                } else {
                    availableDuration = gap - 0.2;
                    if (availableDuration < 0.5) availableDuration = 0.5;
                }
            } else {
                // Last line: usually ritardando (slowing down), so give it 1.2s per word
                availableDuration = words.length * 1.2;
            }
            
            let weights = [];
            let totalWeight = 0;
            for (let j = 0; j < words.length; j++) {
                let w = 1.0;
                let wordText = words[j];
                
                if (j === words.length - 1) {
                    w = 3.0; // Last word is held much longer
                } else if (wordText.includes(',') || wordText.includes('.')) {
                    w = 2.0; // Punctuation means a pause
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

processFile('src/data/songs-vi.ts', 'songsViNew');
processFile('src/data/songs-en.ts', 'songsEnNew');
