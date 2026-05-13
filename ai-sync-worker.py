import sys
import json
import os
import stable_whisper

def main():
    if len(sys.argv) < 3:
        print("Usage: python ai-sync-worker.py <lang> <song_id>")
        sys.exit(1)
        
    lang = sys.argv[1]
    song_id = sys.argv[2]
    
    file_path = f"src/data/songs-{lang}.json"
    
    with open(file_path, "r", encoding="utf-8") as f:
        songs = json.load(f)
        
    target_song = None
    for song in songs:
        if song["id"] == song_id:
            target_song = song
            break
            
    if not target_song:
        print(f"Error: Song {song_id} not found in {file_path}")
        sys.exit(1)
        
    vid_path = "public" + target_song.get("localVideo", "")
    if not os.path.exists(vid_path):
        print(f"Error: Video file not found: {vid_path}")
        sys.exit(1)
        
    lines = [line["text"] for line in target_song["lyrics"]]
    text_str = " ".join(lines)
    
    print(f"Loading stable-whisper model (base)...")
    model = stable_whisper.load_model("base")
    
    print(f"Aligning {target_song['title']}...")
    result = model.align(vid_path, text_str, language="vi" if lang == "vi" else "en")
    
    # Extract flattened words
    all_words = []
    for seg in result.segments:
        for w in seg.words:
            all_words.append({
                "text": w.word.strip(),
                "duration": round(w.end - w.start, 2),
                "start": w.start,
                "end": w.end
            })
            
    # Assign words to lyrics matching the JS logic
    w_idx = 0
    for line in target_song["lyrics"]:
        intended_words = line["text"].split()
        
        # Start time of the line is the start time of its first word
        line["time"] = all_words[w_idx]["start"] if w_idx < len(all_words) else 0
        line["words"] = []
        
        for i in range(len(intended_words)):
            if w_idx < len(all_words):
                curr_word = all_words[w_idx]
                
                # Calculate duration to perfectly bridge to the next word
                if i < len(intended_words) - 1 and (w_idx + 1) < len(all_words):
                    next_word = all_words[w_idx + 1]
                    duration = next_word["start"] - curr_word["start"]
                else:
                    # Last word in the line
                    duration = curr_word["end"] - curr_word["start"]
                    
                    # Bridge to next line if gap is small
                    if (w_idx + 1) < len(all_words):
                        next_line_word = all_words[w_idx + 1]
                        gap = next_line_word["start"] - curr_word["end"]
                        if 0 < gap < 2:
                            duration += gap
                            
                line["words"].append({
                    "text": intended_words[i],
                    "duration": round(duration, 2)
                })
                w_idx += 1
            else:
                line["words"].append({
                    "text": intended_words[i],
                    "duration": 0.5
                })

    # Mark as synced so we don't re-process in the future
    target_song["aiSynced"] = True

    # Save back to JSON
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(songs, f, ensure_ascii=False, indent=2)
        
    print(f"SUCCESS: Auto-synced {song_id} and saved to {file_path}")

if __name__ == "__main__":
    main()
