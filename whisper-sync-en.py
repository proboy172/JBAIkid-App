import stable_whisper
import json
import os

def generate_sync():
    print("Loading stable-whisper model (base)...")
    model = stable_whisper.load_model("base")
    
    with open("songs-en.json", "r", encoding="utf-8") as f:
        songs = json.load(f)
        
    whisper_data = {}
    
    for song in songs:
        vid_path = "public" + song["localVideo"]
        if not os.path.exists(vid_path):
            print(f"File not found: {vid_path}")
            continue
            
        print(f"Aligning {song['title']}...")
        
        lines = [line["text"] for line in song["lyrics"]]
        text_str = " ".join(lines)
        
        try:
            result = model.align(vid_path, text_str, language="en")
            
            output_segs = []
            for seg in result.segments:
                words = []
                for w in seg.words:
                    words.append({
                        "word": w.word.strip(),
                        "start": w.start,
                        "end": w.end
                    })
                output_segs.append({
                    "text": seg.text.strip(),
                    "words": words
                })
            
            whisper_data[song["id"]] = output_segs
            
        except Exception as e:
            print(f"Failed to align {song['id']}: {e}")
            
    with open("whisper-en-words.json", "w", encoding="utf-8") as f:
        json.dump(whisper_data, f, ensure_ascii=False, indent=2)
        
    print("Done! You can now run `node merge-lyrics-en.js`")

if __name__ == "__main__":
    generate_sync()
