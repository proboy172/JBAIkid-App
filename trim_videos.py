import os
import subprocess
import json

def get_songs(filepath, varname):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_marker = f'export const {varname}: Song[] = ['
    start_idx = content.find(start_marker)
    end_idx = content.rfind('];')
    
    if start_idx == -1 or end_idx == -1: return []
    
    node_script = f"""
    const fs = require('fs');
    const code = fs.readFileSync('{filepath}', 'utf8');
    const startMarker = `export const {varname}: Song[] = [`;
    const startIndex = code.indexOf(startMarker);
    const endIndex = code.lastIndexOf('];');
    const arrayStr = code.substring(startIndex + startMarker.length - 1, endIndex + 1);
    const songs = eval('(' + arrayStr + ')');
    fs.writeFileSync('temp_sync_songs.json', JSON.stringify(songs, null, 2));
    """
    with open("temp_sync_node.js", "w", encoding="utf-8") as f:
        f.write(node_script)
    subprocess.run(["node", "temp_sync_node.js"], check=True)
    
    with open("temp_sync_songs.json", "r", encoding="utf-8") as f:
        songs = json.load(f)
    return songs

songs_vi = get_songs('src/data/songs-vi.ts', 'songsViNew')
songs_en = get_songs('src/data/songs-en.ts', 'songsEnNew')

for s in songs_vi + songs_en:
    video_path = f"public/videos/{s['id']}.mp4"
    if not os.path.exists(video_path): continue
    
    # Get last lyric time
    if not s.get('lyrics') or len(s['lyrics']) == 0: continue
    
    last_time = s['lyrics'][-1]['time']
    target_duration = last_time + 10 # 10 seconds buffer
    
    # Get actual duration
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", video_path]
    res = subprocess.run(cmd, capture_output=True, text=True)
    try:
        actual_duration = float(res.stdout.strip())
    except:
        continue
        
    # If the video is significantly longer than the song, trim it!
    if actual_duration > target_duration + 30:
        print(f"Trimming {s['id']}.mp4 from {actual_duration}s to {target_duration}s...")
        temp_path = f"public/videos/{s['id']}.temp.mp4"
        trim_cmd = [
            "ffmpeg", "-y", "-i", video_path,
            "-t", str(target_duration),
            "-c", "copy", # Copy codec directly, no re-encoding = super fast!
            temp_path
        ]
        subprocess.run(trim_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        if os.path.exists(temp_path):
            os.remove(video_path)
            os.rename(temp_path, video_path)
            print(f"  -> Saved huge space on {s['id']}.mp4!")

print("All videos trimmed perfectly!")
