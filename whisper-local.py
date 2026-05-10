"""
Whisper AI - Phan tich local video, luu tung bai, skip video > 4 phut
"""
import json, os, sys

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "whisper_results.json")
VIDEOS_DIR = os.path.join(os.path.dirname(__file__), "public", "videos")
MAX_DURATION = 240  # 4 phut = 240 giay

SONGS = {
    "ca-nha-thuong-nhau.mp4": "vi",
    "con-co-be-be.mp4": "vi",
    "bong-bong-bang-bang.mp4": "vi",
    "chau-len-ba.mp4": "vi",
    "rua-mat-nhu-meo.mp4": "vi",
    "chu-ech-con.mp4": "vi",
    "hai-con-than-lan.mp4": "vi",
    "mot-con-vit.mp4": "vi",
    "ba-ba-di-ban.mp4": "vi",
    "dan-ga-trong-san.mp4": "vi",
    "bac-kim-thang.mp4": "vi",
    "chi-ong-nau.mp4": "vi",
    "qua-gi.mp4": "vi",
    "trai-dat-nay.mp4": "vi",
    "me-oi-tai-sao.mp4": "vi",
    "twinkle.mp4": "en",
    "old-macdonald.mp4": "en",
    "baby-shark.mp4": "en",
    "wheels-on-bus.mp4": "en",
    "head-shoulders.mp4": "en",
    "itsy-bitsy-spider.mp4": "en",
    "five-little-monkeys.mp4": "en",
    "baa-baa-black-sheep.mp4": "en",
    "if-youre-happy.mp4": "en",
    "row-your-boat.mp4": "en",
    "bingo.mp4": "en",
    "abc-song.mp4": "en",
    "hickory-dickory.mp4": "en",
    "london-bridge.mp4": "en",
    "mary-had-lamb.mp4": "en",
}

def get_duration(filepath):
    import subprocess
    try:
        r = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", filepath],
            capture_output=True, text=True, timeout=10
        )
        return float(r.stdout.strip())
    except:
        return 9999

def main():
    import whisper
    
    # Load existing results
    results = {}
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
                results = json.load(f)
        except:
            pass
    
    print("Loading Whisper model (base)...")
    model = whisper.load_model("base")
    print("Model loaded!\n")
    
    total = len(SONGS)
    
    for i, (filename, lang) in enumerate(SONGS.items()):
        song_id = filename.replace(".mp4", "")
        filepath = os.path.join(VIDEOS_DIR, filename)
        
        # Skip if already done
        if song_id in results and len(results[song_id]) > 0:
            print(f"[{i+1}/{total}] SKIP {song_id} (already done)")
            continue
        
        if not os.path.exists(filepath):
            print(f"[{i+1}/{total}] SKIP {song_id} (file missing)")
            continue
        
        # Check duration
        dur = get_duration(filepath)
        if dur > MAX_DURATION:
            print(f"[{i+1}/{total}] SKIP {song_id} (too long: {dur:.0f}s > {MAX_DURATION}s)")
            continue
        
        print(f"[{i+1}/{total}] Analyzing: {song_id} ({dur:.0f}s, lang={lang})...")
        
        try:
            result = model.transcribe(filepath, language=lang, word_timestamps=True, verbose=False)
            
            lyrics = []
            for seg in result["segments"]:
                text = seg["text"].strip()
                if not text:
                    continue
                lyrics.append({"time": round(seg["start"], 1), "text": text})
            
            results[song_id] = lyrics
            
            # Save after each song
            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(results, f, ensure_ascii=False, indent=2)
            
            print(f"  OK: {len(lyrics)} lines")
            for l in lyrics[:3]:
                print(f"    {l['time']}s: {l['text']}")
            if len(lyrics) > 3:
                print(f"    ... +{len(lyrics)-3} more")
                
        except Exception as e:
            print(f"  ERROR: {e}")
    
    print(f"\nDONE! {len(results)}/{total} songs. File: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
