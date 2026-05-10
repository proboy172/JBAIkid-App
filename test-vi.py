import whisper
import json
import sys

print("Loading model...")
model = whisper.load_model("base")
print("Transcribing con-co-be-be.mp4...")
result = model.transcribe("public/videos/con-co-be-be.mp4", language="vi", word_timestamps=True)

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

with open("test-vi-whisper.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("Done! Transcribed:", " ".join([seg["text"] for seg in result["segments"]]))
