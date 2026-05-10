import re
import math

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # We will find all lines that look like:
    # { time: 31, text: "Con cò bé bé" }
    # and replace them with the full structure including words array.
    
    # regex to match: { time: 31, text: "Con cò bé bé" } or { time: 31.5, text: "..." }
    # but we must do it block by block or song by song to know the 'gap' to the next line.
    
    # Actually, it's easier to execute the TS file in node, process it, and write it back.
    pass

node_script = """
const fs = require('fs');

function processFile(filename, varName) {
    const code = fs.readFileSync(filename, 'utf8');
    const dataStr = code.substring(code.indexOf('const ' + varName + ': Song[] = ['), code.indexOf(';\\n'));
    
    // We will just evaluate it to an object. We need to strip the typescript types.
    let evalStr = dataStr.replace('const ' + varName + ': Song[] = ', '');
    
    // Evaluate the array safely
    const songs = eval('(' + evalStr + ')');
    
    for (const song of songs) {
        for (let i = 0; i < song.lyrics.length; i++) {
            const line = song.lyrics[i];
            
            // Skip if it already has words (like ca-nha-thuong-nhau)
            if (line.words && line.words.length > 0 && song.id === 'ca-nha-thuong-nhau') continue;
            
            const words = line.text.split(/\\s+/);
            const nextLine = song.lyrics[i+1];
            
            // Calculate total available duration for this line
            let availableDuration = 0;
            if (nextLine) {
                availableDuration = nextLine.time - line.time;
                // Cap the duration so it doesn't drag forever if there's a long instrumental break
                availableDuration = Math.min(availableDuration, Math.max(2, words.length * 0.7));
            } else {
                availableDuration = Math.max(2, words.length * 0.5);
            }
            
            // Calculate weights
            let weights = [];
            let totalWeight = 0;
            for (let j = 0; j < words.length; j++) {
                let w = 1.0;
                let wordText = words[j];
                
                // If it's the last word of the line, it gets more weight (dragged out)
                if (j === words.length - 1) {
                    w = 2.5;
                } 
                // If it has punctuation (comma, period), it indicates a pause
                else if (wordText.includes(',') || wordText.includes('.') || wordText.includes('?') || wordText.includes('!')) {
                    w = 1.8;
                }
                
                weights.push(w);
                totalWeight += w;
            }
            
            // Assign durations based on weights
            line.words = [];
            for (let j = 0; j < words.length; j++) {
                let duration = (weights[j] / totalWeight) * availableDuration;
                // Round to 2 decimal places
                duration = Math.round(duration * 100) / 100;
                line.words.push({
                    text: words[j],
                    duration: duration
                });
            }
        }
    }
    
    // Generate new TS content
    let tsContent = `import { Song } from "./songs";\\n\\nexport const ${varName}: Song[] = [\\n`;
    for (let i = 0; i < songs.length; i++) {
      tsContent += `  {\\n`;
      tsContent += `    id: "${songs[i].id}",\\n`;
      tsContent += `    title: "${songs[i].title}",\\n`;
      tsContent += `    emoji: "${songs[i].emoji}",\\n`;
      tsContent += `    color: "${songs[i].color}",\\n`;
      tsContent += `    youtubeId: "${songs[i].youtubeId}",\\n`;
      if (songs[i].localVideo) {
          tsContent += `    localVideo: "${songs[i].localVideo}",\\n`;
      }
      tsContent += `    lyrics: [\\n`;
      for (let j = 0; j < songs[i].lyrics.length; j++) {
        const l = songs[i].lyrics[j];
        tsContent += `      { \\n`;
        tsContent += `        time: ${l.time},\\n`;
        tsContent += `        text: ${JSON.stringify(l.text)},\\n`;
        tsContent += `        words: [\\n`;
        tsContent += `          ` + l.words.map(w => `{ text: ${JSON.stringify(w.text)}, duration: ${w.duration} }`).join(', ') + `\\n`;
        tsContent += `        ]\\n`;
        tsContent += `      }${j < songs[i].lyrics.length - 1 ? ',' : ''}\\n`;
      }
      tsContent += `    ]\\n  }${i < songs.length - 1 ? ',' : ''}\\n`;
    }
    tsContent += `];\\n`;
    
    fs.writeFileSync(filename, tsContent, 'utf8');
    console.log(`Successfully synced ${filename}!`);
}

processFile('src/data/songs-vi.ts', 'songsViNew');
"""

with open("heuristic-sync.js", "w", encoding="utf-8") as f:
    f.write(node_script)
