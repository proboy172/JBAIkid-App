import whisper
import sys

print("Loading tiny model...")
model = whisper.load_model("tiny")
print("Transcribing...")
result = model.transcribe("public/videos/rua-mat-nhu-meo.mp4", language="vi")

for seg in result["segments"]:
    print(f"[{seg['start']:.1f} - {seg['end']:.1f}] {seg['text']}")
