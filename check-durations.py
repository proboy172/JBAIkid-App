import json
import subprocess
import os
import re

def get_video_duration(filename):
    path = os.path.join("public", "videos", filename)
    if not os.path.exists(path):
        return 0
    cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', path]
    try:
        output = subprocess.check_output(cmd).decode('utf-8').strip()
        return float(output)
    except:
        return 0

node_script = """
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
"""

with open("extract_times.js", "w", encoding="utf-8") as f:
    f.write(node_script)

subprocess.run(["node", "extract_times.js"])

with open("song_times.json", "r") as f:
    songs = json.load(f)

for s in songs:
    dur = get_video_duration(s['video'])
    print(f"{s['id']}: Last Lyric = {s['lastLyric']}s, Video Duration = {dur}s")
