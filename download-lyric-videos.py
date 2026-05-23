import os
import subprocess
import time

songs = [
  {"id": "twinkle", "query": "twinkle twinkle little star nursery rhyme lyrics"},
  {"id": "old-macdonald", "query": "old macdonald had a farm nursery rhyme lyrics"},
  {"id": "baby-shark", "query": "baby shark nursery rhyme lyrics"},
  {"id": "wheels-on-bus", "query": "wheels on the bus nursery rhyme lyrics"},
  {"id": "head-shoulders", "query": "head shoulders knees and toes nursery rhyme lyrics"},
  {"id": "itsy-bitsy-spider", "query": "itsy bitsy spider nursery rhyme lyrics"},
  {"id": "five-little-monkeys", "query": "five little monkeys jumping on the bed nursery rhyme lyrics"},
  {"id": "baa-baa-black-sheep", "query": "baa baa black sheep nursery rhyme lyrics"},
  {"id": "if-youre-happy", "query": "if you're happy and you know it nursery rhyme lyrics"},
  {"id": "row-your-boat", "query": "row row row your boat nursery rhyme lyrics"},
  {"id": "bingo", "query": "bingo dog song nursery rhyme lyrics"},
  {"id": "abc-song", "query": "abc song alphabet nursery rhyme lyrics"},
  {"id": "hickory-dickory", "query": "hickory dickory dock nursery rhyme lyrics"},
  {"id": "london-bridge", "query": "london bridge is falling down nursery rhyme lyrics"},
  {"id": "mary-had-lamb", "query": "mary had a little lamb nursery rhyme lyrics"},
  
  {"id": "ca-nha-thuong-nhau", "query": "cả nhà thương nhau thiếu nhi có lời chữ karaoke"},
  {"id": "con-co-be-be", "query": "con cò bé bé thiếu nhi có lời chữ karaoke"},
  {"id": "bong-bong-bang-bang", "query": "bống bống bang bang thiếu nhi có lời chữ karaoke"},
  {"id": "chau-len-ba", "query": "cháu lên ba thiếu nhi có lời chữ karaoke"},
  {"id": "rua-mat-nhu-meo", "query": "rửa mặt như mèo thiếu nhi có lời chữ karaoke"},
  {"id": "chu-ech-con", "query": "chú ếch con thiếu nhi có lời chữ karaoke"},
  {"id": "hai-con-than-lan", "query": "hai con thằn lằn con thiếu nhi có lời chữ karaoke"},
  {"id": "mot-con-vit", "query": "một con vịt thiếu nhi có lời chữ karaoke"},
  {"id": "ba-ba-di-ban", "query": "ba bà đi bán lợn con thiếu nhi có lời chữ karaoke"},
  {"id": "dan-ga-trong-san", "query": "đàn gà trong sân thiếu nhi có lời chữ karaoke"},
  {"id": "bac-kim-thang", "query": "bắc kim thang thiếu nhi có lời chữ karaoke"},
  {"id": "chi-ong-nau", "query": "chị ong nâu và em bé thiếu nhi có lời chữ karaoke"},
  {"id": "qua-gi", "query": "quả gì mà chua chua thế thiếu nhi có lời chữ karaoke"},
  {"id": "trai-dat-nay", "query": "trái đất này là của chúng mình thiếu nhi có lời chữ karaoke"},
  {"id": "me-oi-tai-sao", "query": "mẹ ơi tại sao thiếu nhi có lời chữ karaoke"}
]

out_dir = os.path.join("public", "videos")
os.makedirs(out_dir, exist_ok=True)

ytdlp = r".\yt-dlp.exe"

for song in songs:
    filename = song['id']
    query = song['query']
    filepath = os.path.join(out_dir, f"{filename}.mp4")
    print(f"Downloading {filename}...")
    
    cmd = [
        ytdlp,
        f"ytsearch5:{query}",
        "--js-runtimes", "node",
        "-f", "best[height<=720][ext=mp4]/best",
        "--merge-output-format", "mp4",
        "-o", filepath,
        "--force-overwrites",
        "--match-filter", "duration < 400",
        "--max-downloads", "1",
        "--quiet",
        "--no-warnings"
    ]
    try:
        subprocess.run(cmd, check=False)
        print(f"Finished {filename}")
    except Exception as e:
        print(f"Error on {filename}: {e}")
    
    time.sleep(1)

print("Xong!")
