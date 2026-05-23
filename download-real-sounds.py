import os
import subprocess
import time

sounds = {
    "dog": "dog bark sound effect short",
    "cat": "cat meow sound effect short",
    "bird": "bird chirping sound effect short",
    "cow": "cow moo sound effect short",
    "pig": "pig oink sound effect short",
    "duck": "duck quack sound effect short",
    "rooster": "rooster crowing sound effect short",
    "horse": "horse neigh sound effect short",
    "sheep": "sheep baa sound effect short",
    "lion": "lion roar sound effect short",
    "tiger": "tiger roar sound effect short",
    "elephant": "elephant trumpet sound effect short",
    "monkey": "monkey sound effect short",
    "snake": "snake hiss sound effect short",
    "car": "car horn beep sound effect short",
    "train": "train whistle sound effect short",
    "airplane": "airplane fly by sound effect short",
    "police": "police siren sound effect short"
}

out_dir = os.path.join("public", "sounds")
os.makedirs(out_dir, exist_ok=True)

ytdlp = r".\yt-dlp.exe"

for filename, query in sounds.items():
    filepath = os.path.join(out_dir, f"{filename}.mp3")
    print(f"Downloading {filename}...")
    cmd = [
        ytdlp,
        f"ytsearch1:{query}",
        "-x",
        "--audio-format", "mp3",
        "-o", filepath,
        "--force-overwrites",
        "--match-filter", "duration < 60",
        "--quiet",
        "--no-warnings"
    ]
    try:
        subprocess.run(cmd, check=False)
        print(f"Finished {filename}")
    except Exception as e:
        print(f"Error on {filename}: {e}")
    
    # Wait a bit to avoid rate limits
    time.sleep(2)

print("Hoàn thành việc tải âm thanh thực tế!")
