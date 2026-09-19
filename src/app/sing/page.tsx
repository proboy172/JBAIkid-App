"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SingPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/videos?tab=sing_en");
  }, [router]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-sky-50 to-indigo-50">
      <div className="text-center p-6">
        <span className="text-5xl animate-bounce block mb-2">🎵</span>
        <h2 className="text-lg font-bold text-slate-700" style={{ fontFamily: "var(--font-heading)" }}>
          Đang chuyển đến Kênh Xem & Hát...
        </h2>
        <p className="text-xs text-text-light mt-1">Chuẩn bị hát cùng bé nhé!</p>
      </div>
    </div>
  );
}
