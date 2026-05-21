import os
from gtts import gTTS

# Create directory if not exists
out_dir = os.path.join("public", "sounds")
os.makedirs(out_dir, exist_ok=True)

# Define the sounds to generate
sounds = {
    "dog": "Gâu gâu! Gâu gâu!",
    "cat": "Meo meo! Meo meo!",
    "bird": "Líu lo! Líu lo!",
    "cow": "Ụm bò! Ụm bò!",
    "pig": "Ụt ịt! Ụt ịt!",
    "duck": "Cạp cạp! Cạp cạp!",
    "rooster": "Ò ó o o o!",
    "horse": "Hí hí hí!",
    "sheep": "Be be! Be be!",
    "lion": "Gừ gừ! Gầm!",
    "tiger": "Gầm! Gầm!",
    "elephant": "Tu hú! Tu hú!",
    "monkey": "Khẹc khẹc! Khẹc khẹc!",
    "snake": "Phì phì! Phì phì!",
    "car": "Bíp bíp! Bíp bíp!",
    "train": "Xình xịch! Tu tu!",
    "airplane": "Vù vù! Vù vù!",
    "police": "Ư o! Ư o! Ư o!"
}

for filename, text in sounds.items():
    filepath = os.path.join(out_dir, f"{filename}.mp3")
    print(f"Generating {filepath} with text: {text}")
    tts = gTTS(text=text, lang='vi', slow=False)
    tts.save(filepath)

print("Hoàn thành tạo toàn bộ âm thanh!")
