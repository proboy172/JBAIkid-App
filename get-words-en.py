import whisper
import json
import os

model = whisper.load_model("base")

songs = [
    "twinkle", "old-macdonald", "baby-shark", "wheels-on-bus", "head-shoulders", 
    "itsy-bitsy-spider", "five-little-monkeys", "baa-baa-black-sheep", "if-youre-happy", 
    "row-your-boat", "bingo", "abc-song", "hickory-dickory", "london-bridge", "mary-had-lamb"
]

all_output = {}

for song in songs:
    print(f"Processing {song}...")
    video_path = f"public/videos/{song}.mp4"
    if not os.path.exists(video_path):
        print(f"File {video_path} not found!")
        continue
        
    result = model.transcribe(video_path, language="en", word_timestamps=True)
    
    output = []
    for seg in result["segments"]:
        words = []
        if "words" in seg:
            for w in seg["words"]:
                words.append({
                    "text": w["word"].strip(),
                    "start": w["start"],
                    "end": w["end"]
                })
        output.append({
            "text": seg["text"].strip(),
            "start": seg["start"],
            "end": seg["end"],
            "words": words
        })
        
    all_output[song] = output

with open("whisper-en-words.json", "w", encoding="utf-8") as f:
    json.dump(all_output, f, ensure_ascii=False, indent=2)

print("Done processing all English songs!")
