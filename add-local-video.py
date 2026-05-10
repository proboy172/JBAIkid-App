import re

def add_local_video(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find all id: "..." and insert localVideo right after youtubeId if it's missing
    # To be safe, we can just replace `youtubeId: "..."` with `youtubeId: "...",\n    localVideo: "/videos/..."`
    # but only if localVideo is not already there.
    
    # Let's extract all youtubeIds and IDs
    # A safer way using regex:
    # id: "twinkle",\n    title: "...",\n    emoji: "...",\n    color: "...",\n    youtubeId: "yCjJyiqpAuU",
    
    new_content = ""
    lines = content.split('\n')
    current_id = None
    
    for i, line in enumerate(lines):
        match_id = re.search(r'id:\s*"([^"]+)"', line)
        if match_id:
            current_id = match_id.group(1)
            
        new_content += line + '\n'
        
        match_yt = re.search(r'youtubeId:\s*"([^"]+)"', line)
        if match_yt and current_id:
            # check if next line is already localVideo
            if i + 1 < len(lines) and 'localVideo:' not in lines[i+1]:
                # inject localVideo
                indent = line[:len(line) - len(line.lstrip())]
                new_content += f'{indent}localVideo: "/videos/{current_id}.mp4",\n'
                
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

add_local_video("src/data/songs-en.ts")
add_local_video("src/data/songs-vi.ts")
print("Added localVideo to all songs!")
