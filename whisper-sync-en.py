import whisper
import json
import re
import os

print("Loading Whisper model (base)...")
model = whisper.load_model("base")

def get_songs(filepath, varname):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_marker = f'export const {varname}: Song[] = ['
    start_idx = content.find(start_marker)
    end_idx = content.rfind('];')
    
    if start_idx == -1 or end_idx == -1:
        return []
    
    block = content[start_idx:end_idx+2]
    # Simple extraction using JS eval via Node.js
    node_script = f"""
    const fs = require('fs');
    const code = fs.readFileSync('{filepath}', 'utf8');
    const startMarker = `export const {varname}: Song[] = [`;
    const startIndex = code.indexOf(startMarker);
    const endIndex = code.lastIndexOf('];');
    const arrayStr = code.substring(startIndex + startMarker.length - 1, endIndex + 1);
    const songs = eval('(' + arrayStr + ')');
    fs.writeFileSync('temp_songs.json', JSON.stringify(songs, null, 2));
    """
    with open("temp_extract.js", "w") as f:
        f.write(node_script)
    os.system("node temp_extract.js")
    
    with open("temp_songs.json", "r", encoding="utf-8") as f:
        songs = json.load(f)
    return songs

import sys

songs = get_songs('src/data/songs-en.ts', 'songsEnNew')
target_ids = sys.argv[1].split(',') if len(sys.argv) > 1 else None

for song in songs:
    if target_ids and song['id'] not in target_ids:
        continue

    video_path = f"public/videos/{song['id']}.mp4"
    if not os.path.exists(video_path):
        print(f"Skipping {song['id']}, video not found.")
        continue
        
    print(f"\nTranscribing {song['id']}...")
    result = model.transcribe(video_path, language="en", word_timestamps=True)
    
    whisper_words = []
    for segment in result["segments"]:
        for word in segment["words"]:
            whisper_words.append(word)
            
    print(f"Got {len(whisper_words)} words from Whisper.")
    
    if len(whisper_words) < 5:
        print(f"Skipping {song['id']} because Whisper found no vocals (likely a beat track).")
        continue

    # Flatten our words
    our_words_flat = []
    for line in song['lyrics']:
        # If words array doesn't exist, split the text
        words_arr = line.get('words', [{'text': w} for w in line['text'].split()])
        for w in words_arr:
            our_words_flat.append(w)
            
    # Assign durations
    for i in range(len(our_words_flat)):
        if i < len(whisper_words):
            ww = whisper_words[i]
            duration = ww['end'] - ww['start']
            
            # If there's a next word, extend duration slightly to bridge the gap
            if i + 1 < len(whisper_words):
                gap = whisper_words[i+1]['start'] - ww['end']
                if gap > 0 and gap < 1.0:
                    duration += gap
                    
            # Set minimum duration
            if duration < 0.2: duration = 0.2
            
            our_words_flat[i]['duration'] = round(duration, 2)
        else:
            # Fallback if whisper missed words
            our_words_flat[i]['duration'] = 0.5
            
    # Re-pack words into lines
    word_idx = 0
    for line in song['lyrics']:
        words_in_line = len(line.get('words', line['text'].split()))
        line['words'] = our_words_flat[word_idx:word_idx + words_in_line]
        word_idx += words_in_line
        
# Write back to TS
tsContent = 'import { Song } from "./songs";\n\n'
tsContent += '// ====================================================================\n'
tsContent += '// DỮ LIỆU ĐÃ ĐƯỢC WHISPER AI PHÂN TÍCH VÀ ĐỒNG BỘ TỰ ĐỘNG\n'
tsContent += '// Timestamp lấy từ Whisper speech recognition, lời viết tay chuẩn\n'
tsContent += '// ====================================================================\n\n'
tsContent += 'export const songsEnNew: Song[] = [\n'

for i, s in enumerate(songs):
    tsContent += '  {\n'
    tsContent += f'    id: "{s["id"]}",\n'
    tsContent += f'    title: "{s["title"]}",\n'
    tsContent += f'    emoji: "{s["emoji"]}",\n'
    tsContent += f'    color: "{s["color"]}",\n'
    tsContent += f'    youtubeId: "{s["youtubeId"]}",\n'
    # Add localVideo back!
    tsContent += f'    localVideo: "/videos/{s["id"]}.mp4",\n'
    tsContent += '    lyrics: [\n'
    for j, l in enumerate(s['lyrics']):
        tsContent += '      { \n'
        tsContent += f'        time: {l["time"]},\n'
        tsContent += f'        text: {json.dumps(l["text"])},\n'
        tsContent += '        words: [\n'
        words_str = ", ".join([f'{{ text: {json.dumps(w["text"])}, duration: {w.get("duration", 0.5)} }}' for w in l["words"]])
        tsContent += f'          {words_str}\n'
        tsContent += '        ]\n'
        tsContent += f'      }}{"," if j < len(s["lyrics"])-1 else ""}\n'
    tsContent += f'    ]\n  }}{"," if i < len(songs)-1 else ""}\n'
tsContent += '];\n'

with open("src/data/songs-en.ts", "w", encoding="utf-8") as f:
    f.write(tsContent)
    
print("Successfully updated src/data/songs-en.ts with Whisper AI timings!")
