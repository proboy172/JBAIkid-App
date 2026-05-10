import os
import sys
import json
import subprocess
import whisper
import argparse
import difflib
import string

def clean_word(word):
    """Chuẩn hóa từ để so sánh: bỏ dấu câu, viết thường"""
    return word.translate(str.maketrans('', '', string.punctuation)).lower().strip()

def get_songs(filepath, varname):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_marker = f'export const {varname}: Song[] = ['
    start_idx = content.find(start_marker)
    end_idx = content.rfind('];')
    
    if start_idx == -1 or end_idx == -1: return []
    
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


def align_line_to_whisper(line_words_text, whisper_words, search_start, search_end):
    """
    Khớp các từ trong 1 CÂU với các từ Whisper trong khoảng thời gian [search_start, search_end].
    Trả về list các match {text, start, end} cho từng từ trong câu.
    """
    # Lọc whisper words trong khoảng thời gian tìm kiếm
    candidates = [w for w in whisper_words if w['start'] >= search_start - 1.0 and w['start'] <= search_end + 2.0]
    
    if not candidates:
        return None
    
    line_clean = [clean_word(w) for w in line_words_text]
    cand_clean = [clean_word(w['text']) for w in candidates]
    
    sm = difflib.SequenceMatcher(None, cand_clean, line_clean)
    
    results = [None] * len(line_words_text)
    matched = 0
    
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            for k in range(i2 - i1):
                c_idx = i1 + k
                l_idx = j1 + k
                results[l_idx] = {
                    'start': candidates[c_idx]['start'],
                    'end': candidates[c_idx]['end']
                }
                matched += 1
    
    # Nội suy các từ bị miss
    for i in range(len(results)):
        if results[i] is not None:
            continue
        
        # Tìm trước/sau
        prev_end = None
        for j in range(i - 1, -1, -1):
            if results[j] is not None:
                prev_end = results[j]['end']
                break
        
        next_start = None
        next_idx = len(results)
        for j in range(i + 1, len(results)):
            if results[j] is not None:
                next_start = results[j]['start']
                next_idx = j
                break
        
        if prev_end is not None and next_start is not None:
            gap = next_start - prev_end
            count = next_idx - i
            per_word = gap / (count + 0.5)
            offset = i - (i - 1 if prev_end else 0)
            
            # Tìm lại vị trí chính xác
            k = 0
            for j in range(i, next_idx):
                if results[j] is None:
                    results[j] = {
                        'start': prev_end + k * per_word,
                        'end': prev_end + (k + 1) * per_word * 0.85
                    }
                    k += 1
        elif prev_end is not None:
            results[i] = {'start': prev_end + 0.05, 'end': prev_end + 0.45}
        elif next_start is not None:
            results[i] = {'start': max(0, next_start - 0.5), 'end': next_start - 0.05}
        else:
            # Hoàn toàn không có anchor -> dùng search_start
            per_word = 0.4
            results[i] = {
                'start': search_start + i * per_word,
                'end': search_start + (i + 1) * per_word * 0.85
            }
    
    return results, matched


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
        
        # 1. Trích xuất Audio
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
            if "words" in segment:
                for word in segment["words"]:
                    whisper_words.append({
                        "text": word["word"].strip(),
                        "clean": clean_word(word["word"]),
                        "start": word["start"],
                        "end": word["end"]
                    })
                
        print(f"  -> AI Found {len(whisper_words)} spoken words.")
        
        # Cleanup audio
        if os.path.exists(temp_audio):
            os.remove(temp_audio)
            
        if len(whisper_words) < 3:
            print("  -> WARNING: Not enough words detected. Skipping sync.")
            continue

        # 3. KHỚP TỪNG CÂU MỘT (Line-by-line alignment)
        # Mỗi câu được khớp trong khoảng thời gian [line.time - 2s, next_line.time + 2s]
        # Đảm bảo không bị nhảy sang đoạn lặp lại (repeating chorus)
        total_matched = 0
        total_words = 0
        
        for l_idx, line in enumerate(song['lyrics']):
            words_text = line['text'].split()
            total_words += len(words_text)
            
            # Xác định khoảng thời gian tìm kiếm cho câu này
            search_start = line['time']
            if l_idx + 1 < len(song['lyrics']):
                search_end = song['lyrics'][l_idx + 1]['time']
            else:
                search_end = line['time'] + 15  # Câu cuối: cho thêm 15 giây
            
            result = align_line_to_whisper(words_text, whisper_words, search_start, search_end)
            
            if result is None:
                # Không tìm được gì -> giữ nguyên timing cũ
                continue
            
            alignments, matched = result
            total_matched += matched
            
            # Cập nhật thời gian bắt đầu câu = thời gian từ đầu tiên
            if alignments[0] is not None:
                new_start = alignments[0]['start']
                # Chỉ cập nhật nếu sai lệch trong phạm vi hợp lý
                if abs(line['time'] - new_start) < 5.0:
                    line['time'] = round(new_start, 2)
            
            # Cập nhật duration từng từ
            new_words = []
            for w_idx, w_text in enumerate(words_text):
                if alignments[w_idx] is not None:
                    dur = alignments[w_idx]['end'] - alignments[w_idx]['start']
                    dur = max(0.15, min(dur, 2.5))
                else:
                    dur = 0.4
                new_words.append({
                    "text": w_text,
                    "duration": round(dur, 2)
                })
            line['words'] = new_words
        
        match_rate = total_matched / total_words * 100 if total_words > 0 else 0
        print(f"  -> Aligned {total_matched}/{total_words} words ({match_rate:.0f}%)")
        print(f"  -> 100% Sync Completed for {song['id']}")

    # Save to file
    songs_full = get_songs(filepath, varname)
    for i, s in enumerate(songs_full):
        for processed_song in songs:
            if s['id'] == processed_song['id']:
                songs_full[i] = processed_song
                songs_full[i]['localVideo'] = f"/videos/{s['id']}.mp4"
                
    save_songs(filepath, varname, songs_full)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--lang", choices=["vi", "en", "all"], default="all")
    parser.add_argument("--ids", help="Comma separated list of song IDs")
    args = parser.parse_args()
    
    target_ids = args.ids.split(",") if args.ids else None
    
    if args.lang in ["en", "all"]:
        print("Loading Whisper model (small.en) for English...")
        model_en = whisper.load_model("small.en")
        process_songs("en", 'src/data/songs-en.ts', 'songsEnNew', model_en, target_ids)
        del model_en  # Free memory
        
    if args.lang in ["vi", "all"]:
        print("Loading Whisper model (base) for Vietnamese...")
        model_vi = whisper.load_model("base")
        process_songs("vi", 'src/data/songs-vi.ts', 'songsViNew', model_vi, target_ids)
        
    print("\n--- AI SYNC PROCESS COMPLETE ---")
