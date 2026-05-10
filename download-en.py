import os
import subprocess
import json
import re

def get_songs(filepath, varname):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_marker = f'export const {varname}: Song[] = ['
    start_idx = content.find(start_marker)
    end_idx = content.rfind('];')
    
    if start_idx == -1 or end_idx == -1:
        return []
    
    # Simple regex to extract id and youtubeId
    block = content[start_idx:end_idx]
    
    songs = []
    ids = re.findall(r'id:\s*"([^"]+)"', block)
    yts = re.findall(r'youtubeId:\s*"([^"]+)"', block)
    
    for i in range(len(ids)):
        if i < len(yts):
            songs.append({"id": ids[i], "youtubeId": yts[i]})
            
    return songs

songs = get_songs('src/data/songs-en.ts', 'songsEnNew')

print(f"Found {len(songs)} English songs to download.")

for song in songs:
    url = f"https://www.youtube.com/watch?v={song['youtubeId']}"
    out_path = f"public/videos/{song['id']}.mp4"
    
    print(f"\nDownloading {song['id']} from {url}...")
    
    # Run yt-dlp
    cmd = [
        "python", "-m", "yt_dlp",
        "--js-runtimes", "node",
        "--remote-components", "ejs:github",
        "-f", "best[ext=mp4][height<=720]/best[ext=mp4]",
        "-o", out_path,
        "--force-overwrites",
        url
    ]
    
    try:
        subprocess.run(cmd, check=True)
    except Exception as e:
        print(f"Error downloading {song['id']}: {e}")

print("\nFinished downloading all videos!")
