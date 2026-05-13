"use client";

import { useState, useEffect } from "react";
import { Music, CheckCircle, Loader2, Sparkles } from "lucide-react";

interface PendingSong {
  id: string;
  title: string;
  lang: string;
}

export default function SyncClient() {
  const [pendingSongs, setPendingSongs] = useState<PendingSong[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [syncingSongId, setSyncingSongId] = useState<string | null>(null);
  const [completedSongs, setCompletedSongs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkPending();
  }, []);

  const checkPending = async () => {
    try {
      const res = await fetch('/api/auto-sync');
      const data = await res.json();
      setPendingSongs(data.pending || []);
      
      // Auto trigger sync if there are pending songs
      if (data.pending && data.pending.length > 0) {
        startAutoSync(data.pending);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsChecking(false);
    }
  };

  const startAutoSync = async (songs: PendingSong[]) => {
    for (const song of songs) {
      if (completedSongs.includes(song.id)) continue;
      
      setSyncingSongId(song.id);
      try {
        const res = await fetch('/api/auto-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lang: song.lang, id: song.id })
        });
        
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to sync');
        }
        
        setCompletedSongs(prev => [...prev, song.id]);
      } catch (err: any) {
        setError(`Lỗi khi sync bài ${song.title}: ${err.message}`);
        break; // Stop on first error
      }
    }
    setSyncingSongId(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-8 bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-4">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Auto-Sync Manager</h1>
          <p className="text-gray-400">Hệ thống tự động phát hiện bài hát mới và sử dụng AI Whisper để ghép lời 100% tự động.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
            <span>Tiến trình</span>
            <span>Trạng thái</span>
          </div>

          {isChecking ? (
            <div className="flex items-center justify-center p-8 text-gray-500 gap-3">
              <Loader2 className="animate-spin" /> Đang quét hệ thống...
            </div>
          ) : pendingSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-green-400 bg-green-400/5 rounded-2xl border border-green-400/10 gap-3">
              <CheckCircle size={48} />
              <p className="font-bold text-lg">Tất cả bài hát đã được đồng bộ!</p>
              <p className="text-sm text-green-400/60 text-center">Hệ thống của bạn đang ở trạng thái hoàn hảo. Không cần làm gì thêm.</p>
            </div>
          ) : (
            pendingSongs.map((song) => {
              const isSyncing = syncingSongId === song.id;
              const isDone = completedSongs.includes(song.id);
              
              return (
                <div 
                  key={song.id} 
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    isDone 
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : isSyncing
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-gray-800 border-gray-700 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isDone ? 'bg-green-500/20' : isSyncing ? 'bg-primary/20' : 'bg-gray-700'}`}>
                      <Music size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">{song.title}</h3>
                      <p className="text-xs opacity-60 uppercase">{song.lang}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 font-medium">
                    {isDone ? (
                      <><CheckCircle size={18} /> Hoàn tất</>
                    ) : isSyncing ? (
                      <><Loader2 className="animate-spin" size={18} /> Đang chạy AI...</>
                    ) : (
                      <span className="text-sm text-gray-500">Đang chờ...</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
