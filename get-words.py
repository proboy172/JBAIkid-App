import whisper
import json
import os

model = whisper.load_model("base")
result = model.transcribe(
    "public/videos/ca-nha-thuong-nhau.mp4", 
    language="vi", 
    word_timestamps=True
)

output = []
for seg in result["segments"]:
    words = []
    if "words" in seg:
        for w in seg["words"]:
            words.append({
                "text": w["word"],
                "start": w["start"],
                "end": w["end"]
            })
    output.append({
        "text": seg["text"].strip(),
        "start": seg["start"],
        "end": seg["end"],
        "words": words
    })

with open("ca-nha-thuong-nhau-words.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("Done")
