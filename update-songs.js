const fs = require('fs');

async function searchYoutube(query) {
  try {
    const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
    const text = await res.text();
    // Grab the first video ID
    const match = text.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

async function main() {
  const content = fs.readFileSync('src/data/songs.ts', 'utf-8');
  const lines = content.split('\n');
  
  let currentTitle = '';
  
  for (let i = 0; i < lines.length; i++) {
    const titleMatch = lines[i].match(/title:\s*"(.*)"/);
    if (titleMatch) {
      currentTitle = titleMatch[1];
    }
    
    const ytMatch = lines[i].match(/youtubeId:\s*"([a-zA-Z0-9_-]{11})"/);
    if (ytMatch && currentTitle) {
      // Don't replace the ones we already did
      if (['Cả Nhà Thương Nhau', 'Con Cò Bé Bé', 'Bống Bống Bang Bang'].includes(currentTitle)) {
        continue;
      }
      
      console.log(`Searching for: ${currentTitle}...`);
      const newId = await searchYoutube(currentTitle + ' official children song');
      if (newId) {
        console.log(`Found: ${newId}`);
        lines[i] = lines[i].replace(ytMatch[1], newId);
      }
      // reset
      currentTitle = '';
      
      // Delay to avoid rate limits
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  fs.writeFileSync('src/data/songs.ts', lines.join('\n'));
  console.log('Done!');
}

main();
