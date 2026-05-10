import os
import subprocess
import json
import re

failed_songs = [
    "bingo", "abc-song", "london-bridge", "mary-had-lamb",
    "baa-baa-black-sheep", "row-your-boat", "wheels-on-bus"
]

print("Starting Auto-Recovery for 7 failed songs...")

def update_songs_en(song_id, new_youtube_id):
    with open('src/data/songs-en.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to find the block for the song
    pattern = r'(id:\s*"' + song_id + r'".*?youtubeId:\s*")[^"]+(")'
    content = re.sub(pattern, r'\g<1>' + new_youtube_id + r'\g<2>', content, flags=re.DOTALL)
    
    with open('src/data/songs-en.ts', 'w', encoding='utf-8') as f:
        f.write(content)

for song_id in failed_songs:
    print(f"\n--- Processing {song_id} ---")
    
    # 1. Search for a valid youtube ID
    search_query = f"ytsearch1:{song_id.replace('-', ' ')} nursery rhyme"
    if "abc" in song_id: search_query += " super simple songs"
    elif "bingo" in song_id: search_query += " super simple songs"
    
    search_cmd = [
        "python", "-m", "yt_dlp",
        "--js-runtimes", "node",
        "--remote-components", "ejs:github",
        "--get-id",
        search_query
    ]
    
    try:
        output = subprocess.check_output(search_cmd, stderr=subprocess.DEVNULL).decode('utf-8').strip()
        # the output might have multiple lines if there are warnings, get the last non-empty line
        new_yt_id = [line for line in output.split('\n') if line][-1]
        
        if len(new_yt_id) == 11:
            print(f"Found new YouTube ID for {song_id}: {new_yt_id}")
            update_songs_en(song_id, new_yt_id)
            
            # 2. Download the video
            out_path = f"public/videos/{song_id}.mp4"
            url = f"https://www.youtube.com/watch?v={new_yt_id}"
            dl_cmd = [
                "python", "-m", "yt_dlp",
                "--js-runtimes", "node",
                "--remote-components", "ejs:github",
                "-f", "best[ext=mp4][height<=720]/best[ext=mp4]",
                "-o", out_path,
                "--force-overwrites",
                url
            ]
            print(f"Downloading {url}...")
            subprocess.run(dl_cmd, check=True)
            print(f"Successfully downloaded {song_id}.mp4")
        else:
            print(f"Failed to extract a valid ID. Output was: {output}")
    except Exception as e:
        print(f"Error processing {song_id}: {e}")

print("\n--- ALL RECOVERIES COMPLETED ---")
