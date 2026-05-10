import re

with open("src/data/songs-en.ts", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "localVideo:" not in line:
        new_lines.append(line)

with open("src/data/songs-en.ts", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Removed localVideo from songs-en.ts")
