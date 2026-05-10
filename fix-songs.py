with open("merge-lyrics-en.js", "r", encoding="utf-8") as f:
    content = f.read()

start_idx = content.find("const songs = [")
end_idx = content.find(";\n\nif (!fs.existsSync")

if start_idx != -1 and end_idx != -1:
    songs_data = content[start_idx:end_idx]
    final_content = 'import { Song } from "./songs";\n\nexport ' + songs_data.replace("const songs =", "const songsEnNew: Song[] =") + ';\n'
    with open("src/data/songs-en.ts", "w", encoding="utf-8") as f:
        f.write(final_content)
    print("Fixed songs-en.ts!")
