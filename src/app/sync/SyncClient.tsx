"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { songsEn, songsVi, Song } from "@/data/songs";
import { Copy, Play, CheckCircle } from "lucide-react";

export default function SyncClient() {
  const allSongs = [...songsEn, ...songsVi];
  const [selectedSongId, setSelectedSongId] = useState(allSongs[0].id);
  const song = allSongs.find((s) => s.id === selectedSongId)!;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [recordedLines, setRecordedLines] = useState<{ time: number; text: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when song changes
    setRecordedLines(song.lyrics.map(l => ({ time: 0, text: l.text })));
    setCurrentIndex(0);
    setIsPlaying(false);
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(song.youtubeId);
      playerRef.current.stopVideo();
    }
  }, [song.id]);

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player('yt-sync-player', {
        height: "360",
        width: "640",
        videoId: song.youtubeId,
        playerVars: {
          controls: 1,
          rel: 0,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              startProgressTracker();
            } else {
              setIsPlaying(false);
              stopProgressTracker();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else if (window.YT.Player) {
      initPlayer();
    }

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    return () => {
      stopProgressTracker();
    };
  }, []);

  const startProgressTracker = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 50);
  };

  const stopProgressTracker = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space" && isPlaying) {
      e.preventDefault();
      if (currentIndex < recordedLines.length) {
        const time = playerRef.current?.getCurrentTime() || 0;
        setRecordedLines(prev => {
          const next = [...prev];
          next[currentIndex].time = parseFloat(time.toFixed(2));
          return next;
        });
        setCurrentIndex(i => i + 1);
      }
    }
  }, [isPlaying, currentIndex, recordedLines.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const lyricsLines = recordedLines.map(l => '      { time: ' + l.time + ', text: "' + l.text + '" },').join('\n');
  const outputCode = '    lyrics: [\n' + lyricsLines + '\n    ]';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex gap-8">
      <div className="w-1/2 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-primary">Karaoke Sync Editor</h1>
        
        <select 
          className="bg-gray-800 text-white p-3 rounded-xl border border-gray-700 outline-none"
          value={selectedSongId}
          onChange={(e) => setSelectedSongId(e.target.value)}
        >
          <optgroup label="Tiếng Việt">
            {songsVi.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.title}</option>)}
          </optgroup>
          <optgroup label="Tiếng Anh">
            {songsEn.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.title}</option>)}
          </optgroup>
        </select>

        <div className="rounded-xl overflow-hidden shadow-2xl bg-black aspect-video relative">
          <div id="yt-sync-player" className="w-full h-full" />
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="font-bold mb-4 text-green-400">Hướng dẫn:</h3>
          <ul className="list-decimal pl-5 space-y-2 text-sm text-gray-300">
            <li>Chọn bài hát ở menu trên.</li>
            <li>Bấm Play video.</li>
            <li>Khi ca sĩ chuẩn bị hát đến chữ đầu tiên của câu, hãy **bấm phím Space (Dấu cách)**.</li>
            <li>Câu đó sẽ được lưu lại thời gian chính xác và tự động chuyển sang câu tiếp theo.</li>
            <li>Làm cho đến hết bài.</li>
            <li>Copy đoạn code bên phải và dán đè vào mảng <code className="bg-gray-900 px-1 rounded text-primary">lyrics</code> của bài hát đó trong file <code className="bg-gray-900 px-1 rounded text-primary">src/data/songs.ts</code>.</li>
          </ul>
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-4 max-h-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Tiến trình khớp chữ</h2>
          <div className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-400 font-mono">
            {currentTime.toFixed(2)}s
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-2">
          {recordedLines.map((line, idx) => (
            <div 
              key={idx} 
              className={
                'p-3 rounded-lg flex items-center justify-between border ' +
                (idx === currentIndex ? 'border-primary bg-primary/10' : 
                idx < currentIndex ? 'border-green-500/50 bg-green-500/10 opacity-70' : 
                'border-gray-700 bg-gray-900/50 opacity-50')
              }
            >
              <span className={'font-bold text-lg ' + (idx === currentIndex ? 'text-primary' : 'text-white')}>
                {line.text}
              </span>
              <div className="flex items-center gap-3">
                {idx < currentIndex && <CheckCircle className="text-green-500" size={18} />}
                <span className="font-mono bg-black px-2 py-1 rounded text-sm min-w-[60px] text-center">
                  {line.time.toFixed(2)}s
                </span>
              </div>
            </div>
          ))}
          {currentIndex >= recordedLines.length && (
            <div className="p-4 bg-green-500/20 text-green-400 text-center font-bold rounded-lg border border-green-500/30">
              ĐÃ XONG! Hãy copy code bên dưới.
            </div>
          )}
        </div>

        <div className="h-64 flex flex-col gap-2">
          <button 
            className="bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 active:scale-95 transition-transform"
            onClick={() => navigator.clipboard.writeText(outputCode)}
          >
            <Copy size={20} /> Copy Code
          </button>
          <textarea 
            className="flex-1 bg-gray-950 text-green-400 p-4 rounded-xl border border-gray-700 font-mono text-xs outline-none resize-none"
            readOnly
            value={outputCode}
          />
        </div>
      </div>
    </div>
  );
}
