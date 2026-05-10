
    const fs = require('fs');
    const code = fs.readFileSync('src/data/songs-en.ts', 'utf8');
    const startMarker = `export const songsEnNew: Song[] = [`;
    const startIndex = code.indexOf(startMarker);
    const endIndex = code.lastIndexOf('];');
    const arrayStr = code.substring(startIndex + startMarker.length - 1, endIndex + 1);
    const songs = eval('(' + arrayStr + ')');
    fs.writeFileSync('temp_sync_songs.json', JSON.stringify(songs, null, 2));
    