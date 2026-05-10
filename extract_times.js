
const fs = require('fs');

function getSongs(filename, varName) {
    const code = fs.readFileSync(filename, 'utf8');
    const startMarker = `export const ${varName}: Song[] = [`;
    const startIndex = code.indexOf(startMarker);
    const endIndex = code.lastIndexOf('];');
    const arrayStr = code.substring(startIndex + startMarker.length - 1, endIndex + 1);
    return eval('(' + arrayStr + ')');
}

const vi = getSongs('src/data/songs-vi.ts', 'songsViNew');
const en = getSongs('src/data/songs-en.ts', 'songsEnNew');
const allSongs = [...vi, ...en];

const out = allSongs.map(s => {
    return {
        id: s.id,
        video: s.id + ".mp4",
        lastLyric: s.lyrics[s.lyrics.length - 1].time
    };
});
fs.writeFileSync('song_times.json', JSON.stringify(out, null, 2));
