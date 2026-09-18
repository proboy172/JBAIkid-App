"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Music, CheckCircle, Sparkles, Terminal, ArrowLeft, Video } from "lucide-react";
import { songsEn, songsVi, Song } from "@/data/songs";

export default function SyncClient() {
  const stats = useMemo(() => {
    const checkSynced = (songs: Song[]) => {
      return songs.map((s) => {
        const hasWords = s.lyrics?.some((l) => l.words && l.words.length > 0);
        const hasVideo = !!s.localVideo;
        return {
          ...s,
          isSynced: hasWords,
          hasVideo,
        };
      });
    };

    const enList = checkSynced(songsEn);
    const viList = checkSynced(songsVi);

    const totalSynced = enList.filter((s) => s.isSynced).length + viList.filter((s) => s.isSynced).length;
    const totalVideos = enList.filter((s) => s.hasVideo).length + viList.filter((s) => s.hasVideo).length;

    return {
      enList,
      viList,
      totalSongs: enList.length + viList.length,
      totalSynced,
      totalVideos,
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-10 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800"
          >
            <ArrowLeft size={16} />
            <span>Trang chủ</span>
          </Link>
          <span className="text-xs font-mono text-slate-500">Developer Diagnostics</span>
        </div>

        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-4">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Thư Viện Karaoke & AI Sync Status
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Bảng điều khiển kiểm tra trạng thái video offline và mức độ đồng bộ lời bài hát từng chữ bằng Whisper AI.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl">
              <span className="text-xs text-slate-400">Tổng bài hát</span>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalSongs}</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl">
              <span className="text-xs text-slate-400">Đồng bộ AI (Word-level)</span>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {stats.totalSynced}/{stats.totalSongs}
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl">
              <span className="text-xs text-slate-400">Video Offline</span>
              <p className="text-2xl font-bold text-blue-400 mt-1">
                {stats.totalVideos}/{stats.totalSongs}
              </p>
            </div>
          </div>
        </div>

        {/* CLI Instructions for Developers */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-md">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3">
            <Terminal size={18} className="text-primary" />
            <span>Lệnh đồng bộ bài hát mới (Dành cho Lập trình viên)</span>
          </div>
          <div className="bg-black/80 rounded-2xl p-4 font-mono text-xs text-green-400 space-y-2 overflow-x-auto">
            <p className="text-slate-500"># Đồng bộ tự động 1 bài mới bằng Whisper AI:</p>
            <p>python ai-karaoke-sync.py --lang vi --ids &lt;id-bai-hat&gt;</p>
            <p className="text-slate-500 pt-2"># Quét và đồng bộ toàn bộ bài chưa có word-timing:</p>
            <p>python ai-karaoke-sync.py --lang all</p>
          </div>
        </div>

        {/* Songs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Songs */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🇬🇧</span> English Nursery Rhymes ({stats.enList.length})
            </h2>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
              {stats.enList.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Music size={14} className="text-indigo-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-200 truncate">{song.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {song.hasVideo && (
                      <span className="text-blue-400 flex items-center gap-1" title="Video nội bộ">
                        <Video size={13} />
                      </span>
                    )}
                    {song.isSynced ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle size={13} /> AI KTV
                      </span>
                    ) : (
                      <span className="text-slate-500">Standard</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vietnamese Songs */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🇻🇳</span> Bài Hát Tiếng Việt ({stats.viList.length})
            </h2>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
              {stats.viList.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Music size={14} className="text-rose-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-200 truncate">{song.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {song.hasVideo && (
                      <span className="text-blue-400 flex items-center gap-1" title="Video nội bộ">
                        <Video size={13} />
                      </span>
                    )}
                    {song.isSynced ? (
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle size={13} /> AI KTV
                      </span>
                    ) : (
                      <span className="text-slate-500">Standard</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
