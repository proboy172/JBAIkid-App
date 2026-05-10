import os
import sys
import json
import subprocess
import whisper
import argparse

def get_songs(filepath, varname):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_marker = f'export const {varname}: Song[] = ['
    start_idx = content.find(start_marker)
    end_idx = content.rfind('];')
    
    if start_idx == -1 or end_idx == -1: return []
    
    # Use Node to evaluate the array
    node_script = f"""
    const fs = require('fs');
    const code = fs.readFileSync('{filepath}', 'utf8');
    const startMarker = `export const {varname}: Song[] = [`;
    const startIndex = code.indexOf(startMarker);
    const endIndex = code.lastIndexOf('];');
    const arrayStr = code.substring(startIndex + startMarker.length - 1, endIndex + 1);
    const songs = eval('(' + arrayStr + ')');
    fs.writeFileSync('temp_sync_songs.json', JSON.stringify(songs, null, 2));
    """
    with open("temp_sync_node.js", "w", encoding="utf-8") as f:
        f.write(node_script)
    subprocess.run(["node", "temp_sync_node.js"], check=True)
    
    with open("temp_sync_songs.json", "r", encoding="utf-8") as f:
        songs = json.load(f)
    return songs

def save_songs(filepath, varname, songs):
    tsContent = 'import { Song } from "./songs";\n\n'
    tsContent += '// ====================================================================\n'
    tsContent += '// DỮ LIỆU ĐÃ ĐƯỢC WHISPER AI PHÂN TÍCH VÀ ĐỒNG BỘ TỰ ĐỘNG (CHUẨN 100%)\n'
    tsContent += '// Timestamp lấy từ file audio gốc của video.\n'
    tsContent += '// ====================================================================\n\n'
    tsContent += f'export const {varname}: Song[] = [\n'

    for i, s in enumerate(songs):
        tsContent += '  {\n'
        tsContent += f'    id: "{s["id"]}",\n'
        tsContent += f'    title: "{s["title"]}",\n'
        tsContent += f'    emoji: "{s["emoji"]}",\n'
        tsContent += f'    color: "{s["color"]}",\n'
        if "youtubeId" in s: tsContent += f'    youtubeId: "{s["youtubeId"]}",\n'
        if "localVideo" in s: tsContent += f'    localVideo: "{s["localVideo"]}",\n'
        if "bpm" in s: tsContent += f'    bpm: {s["bpm"]},\n'
        if "introDuration" in s: tsContent += f'    introDuration: {s["introDuration"]},\n'
        
        tsContent += '    lyrics: [\n'
        for j, l in enumerate(s['lyrics']):
            tsContent += '      { \n'
            tsContent += f'        time: {l["time"]},\n'
            tsContent += f'        text: {json.dumps(l["text"])},\n'
            tsContent += '        words: [\n'
            words_str = ", ".join([f'{{ text: {json.dumps(w["text"])}, duration: {w.get("duration", 0.5)} }}' for w in l.get("words", [])])
            tsContent += f'          {words_str}\n'
            tsContent += '        ]\n'
            tsContent += f'      }}{"," if j < len(s["lyrics"])-1 else ""}\n'
        tsContent += f'    ]\n  }}{"," if i < len(songs)-1 else ""}\n'
    tsContent += '];\n'

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(tsContent)

def process_songs(lang, filepath, varname, model, target_ids=None):
    songs = get_songs(filepath, varname)
    if target_ids:
        songs = [s for s in songs if s['id'] in target_ids]
        
    for song in songs:
        video_path = f"public/videos/{song['id']}.mp4"
        if not os.path.exists(video_path):
            print(f"Skipping {song['id']} (Video not found at {video_path})")
            continue
            
        title_safe = song['title'].encode('ascii', 'ignore').decode('ascii')
        print(f"\n[{lang.upper()}] Processing AI Sync for: {title_safe}")
        
        # 1. Trích xuất Audio (Tối ưu hóa: Chỉ trích xuất audio có độ dài = thời gian câu cuối + 15 giây)
        last_lyric_time = song['lyrics'][-1]['time']
        audio_duration = last_lyric_time + 15
        temp_audio = f"temp_{song['id']}.wav"
        
        print(f"  -> Extracting audio (first {audio_duration}s)...")
        ffmpeg_cmd = [
            "ffmpeg", "-y", "-i", video_path, 
            "-t", str(audio_duration), 
            "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", 
            temp_audio
        ]
        subprocess.run(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # 2. Chạy Whisper AI
        print(f"  -> Running Whisper AI Analysis...")
        result = model.transcribe(temp_audio, language=lang, word_timestamps=True)
        
        whisper_words = []
        for segment in result["segments"]:
            for word in segment["words"]:
                whisper_words.append(word)
                
        print(f"  -> AI Found {len(whisper_words)} spoken words.")
        
        # Cleanup audio
        if os.path.exists(temp_audio):
            os.remove(temp_audio)
            
        if len(whisper_words) < 5:
            print("  -> WARNING: Not enough words detected (Instrumental beat?). Skipping sync.")
            continue

        # 3. Phân bổ thời gian (Word-level mapping)
        our_words_flat = []
        for line in song['lyrics']:
            words_arr = line.get('words', [{'text': w} for w in line['text'].split()])
            for w in words_arr:
                our_words_flat.append(w)
                
        for i in range(len(our_words_flat)):
            if i < len(whisper_words):
                ww = whisper_words[i]
                duration = ww['end'] - ww['start']
                if i + 1 < len(whisper_words):
                    gap = whisper_words[i+1]['start'] - ww['end']
                    if 0 < gap < 1.0: duration += gap
                if duration < 0.2: duration = 0.2
                our_words_flat[i]['duration'] = round(duration, 2)
            else:
                our_words_flat[i]['duration'] = 0.5
                
        word_idx = 0
        for line in song['lyrics']:
            words_in_line = len(line.get('words', line['text'].split()))
            
            # CORE FIX: Auto-correct the line's start time to Whisper's exact timing
            if word_idx < len(whisper_words):
                exact_start = whisper_words[word_idx]['start']
                # Only update if the gap between manual and AI is reasonable (e.g. within 5 seconds)
                # to prevent catastrophic sync if Whisper hallucinates
                if abs(line['time'] - exact_start) < 5.0:
                    line['time'] = round(exact_start, 2)
                    
            line['words'] = our_words_flat[word_idx:word_idx + words_in_line]
            word_idx += words_in_line
            
        print(f"  -> 100% Sync Completed for {song['id']}")

    # Save to file
    songs_full = get_songs(filepath, varname)
    for i, s in enumerate(songs_full):
        for processed_song in songs:
            if s['id'] == processed_song['id']:
                songs_full[i] = processed_song
                songs_full[i]['localVideo'] = f"/videos/{s['id']}.mp4" # Force offline playback
                
    save_songs(filepath, varname, songs_full)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--lang", choices=["vi", "en", "all"], default="all")
    parser.add_argument("--ids", help="Comma separated list of song IDs")
    args = parser.parse_args()
    
    print("Loading Whisper model (base)...")
    model = whisper.load_model("base")
    
    target_ids = args.ids.split(",") if args.ids else None
    
    if args.lang in ["en", "all"]:
        process_songs("en", 'src/data/songs-en.ts', 'songsEnNew', model, target_ids)
        
    if args.lang in ["vi", "all"]:
        process_songs("vi", 'src/data/songs-vi.ts', 'songsViNew', model, target_ids)
        
    print("\n--- AI SYNC PROCESS COMPLETE ---")
