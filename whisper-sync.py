"""
Script tự động tách lời + đồng bộ Karaoke cho JBAIkid
Quy trình: Tải audio từ YouTube → Whisper AI phân tích → Xuất lyrics JSON
"""
import subprocess, json, os, sys, re

SCRIPTS_DIR = os.path.join(os.environ.get("APPDATA", ""), "Python", "Python314", "Scripts")
YT_DLP = os.path.join(SCRIPTS_DIR, "yt-dlp.exe")
WHISPER = os.path.join(SCRIPTS_DIR, "whisper.exe")
AUDIO_DIR = os.path.join(os.path.dirname(__file__), "temp_audio")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "whisper_results.json")

# Danh sách bài hát cần xử lý
SONGS = [
    # English
    {"id": "twinkle", "ytId": "yCjJyiqpAuU", "lang": "en"},
    {"id": "old-macdonald", "ytId": "_6HzoUcx3eo", "lang": "en"},
    {"id": "baby-shark", "ytId": "XqZsoesa55w", "lang": "en"},
    {"id": "wheels-on-bus", "ytId": "yKcRU0gmdt4", "lang": "en"},
    {"id": "head-shoulders", "ytId": "WX8HmogNyCY", "lang": "en"},
    {"id": "itsy-bitsy-spider", "ytId": "TbKI-jjpPx8", "lang": "en"},
    {"id": "five-little-monkeys", "ytId": "b0NHrFNZWh0", "lang": "en"},
    {"id": "baa-baa-black-sheep", "ytId": "gT1m4G19Vj8", "lang": "en"},
    {"id": "if-youre-happy", "ytId": "l4WNrvVjiTw", "lang": "en"},
    {"id": "row-your-boat", "ytId": "Gzf0cTOAMPo", "lang": "en"},
    {"id": "bingo", "ytId": "9o0_7s2N2_E", "lang": "en"},
    {"id": "abc-song", "ytId": "sa0RUmHcFGc", "lang": "en"},
    {"id": "hickory-dickory", "ytId": "RXJ9pET9Zzw", "lang": "en"},
    {"id": "london-bridge", "ytId": "kO_P-6c8B6c", "lang": "en"},
    {"id": "mary-had-lamb", "ytId": "s1R1YpxV3MU", "lang": "en"},
    # Vietnamese
    {"id": "ca-nha-thuong-nhau", "ytId": "JspIY79HdY8", "lang": "vi"},
    {"id": "con-co-be-be", "ytId": "jO2vrSXVDo0", "lang": "vi"},
    {"id": "bong-bong-bang-bang", "ytId": "u3R0D189h1k", "lang": "vi"},
    {"id": "chau-len-ba", "ytId": "Y1Gst_tvUYs", "lang": "vi"},
    {"id": "rua-mat-nhu-meo", "ytId": "azQJNPftwhw", "lang": "vi"},
    {"id": "chu-ech-con", "ytId": "UB6RylHKwM8", "lang": "vi"},
    {"id": "hai-con-than-lan", "ytId": "HEiFX80Nl14", "lang": "vi"},
    {"id": "mot-con-vit", "ytId": "zh_PH_XmS4A", "lang": "vi"},
    {"id": "ba-ba-di-ban", "ytId": "bUPjHREH1aQ", "lang": "vi"},
    {"id": "dan-ga-trong-san", "ytId": "z0XtQPxsKtQ", "lang": "vi"},
    {"id": "bac-kim-thang", "ytId": "kHzFS_PypYw", "lang": "vi"},
    {"id": "chi-ong-nau", "ytId": "PZDnjOn5EII", "lang": "vi"},
    {"id": "qua-gi", "ytId": "Kuygwgxvf1c", "lang": "vi"},
    {"id": "trai-dat-nay", "ytId": "bi0cjhG6ulg", "lang": "vi"},
    {"id": "me-oi-tai-sao", "ytId": "s3_jm0aMktQ", "lang": "vi"},
]

os.makedirs(AUDIO_DIR, exist_ok=True)

def download_audio(song):
    """Tải audio 16kHz mono WAV từ YouTube (Whisper yêu cầu 16kHz)"""
    output_path = os.path.join(AUDIO_DIR, f"{song['id']}.wav")
    if os.path.exists(output_path):
        print(f"  ⏩ Đã có audio: {song['id']}")
        return output_path
    
    url = f"https://www.youtube.com/watch?v={song['ytId']}"
    print(f"  📥 Đang tải: {song['id']} ({song['ytId']})...")
    
    # Chỉ tải 3 phút đầu (đủ cho nhạc thiếu nhi)
    result = subprocess.run([
        YT_DLP,
        "-x", "--audio-format", "wav",
        "--postprocessor-args", "ffmpeg:-ar 16000 -ac 1",
        "--max-filesize", "50M",
        "--download-sections", "*0:00-3:00",
        "-o", output_path,
        url
    ], capture_output=True, text=True, timeout=120)
    
    if result.returncode != 0:
        print(f"  ❌ Lỗi tải: {result.stderr[:200]}")
        return None
    return output_path

def transcribe_with_whisper(audio_path, lang):
    """Dùng Whisper AI để phân tích giọng nói → Lời + Timestamp"""
    import whisper
    
    # Dùng model "base" cho tốc độ nhanh (small/medium chính xác hơn nhưng chậm)
    model_name = "base" if lang == "en" else "small"
    print(f"  🧠 Đang phân tích bằng Whisper ({model_name})...")
    
    model = whisper.load_model(model_name)
    result = model.transcribe(
        audio_path,
        language=lang,
        word_timestamps=True,
        verbose=False
    )
    
    lyrics = []
    for segment in result["segments"]:
        text = segment["text"].strip()
        if not text:
            continue
        start_time = round(segment["start"], 1)
        lyrics.append({"time": start_time, "text": text})
    
    return lyrics

def main():
    results = {}
    
    # Bước 1: Tải audio
    print("\n" + "="*60)
    print("BƯỚC 1: TẢI AUDIO TỪ YOUTUBE")
    print("="*60)
    
    audio_files = {}
    for song in SONGS:
        path = download_audio(song)
        if path and os.path.exists(path):
            audio_files[song["id"]] = {"path": path, "lang": song["lang"]}
    
    print(f"\n✅ Đã tải thành công {len(audio_files)}/{len(SONGS)} bài")
    
    # Bước 2: Whisper AI phân tích
    print("\n" + "="*60)
    print("BƯỚC 2: WHISPER AI PHÂN TÍCH GIỌNG NÓI")
    print("="*60)
    
    for song_id, info in audio_files.items():
        print(f"\n🎵 [{song_id}]")
        try:
            lyrics = transcribe_with_whisper(info["path"], info["lang"])
            results[song_id] = lyrics
            print(f"  ✅ Tìm thấy {len(lyrics)} câu hát:")
            for l in lyrics[:5]:
                print(f"     {l['time']}s: {l['text']}")
            if len(lyrics) > 5:
                print(f"     ... và {len(lyrics)-5} câu nữa")
        except Exception as e:
            print(f"  ❌ Lỗi Whisper: {e}")
    
    # Bước 3: Lưu kết quả
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    
    print(f"\n" + "="*60)
    print(f"🎉 HOÀN TẤT! Kết quả lưu tại: {OUTPUT_FILE}")
    print(f"   Tổng: {len(results)} bài hát đã được phân tích")
    print("="*60)

if __name__ == "__main__":
    main()
