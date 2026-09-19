"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SingVietnamesePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/videos?tab=sing_vi");
  }, [router]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-rose-50 to-orange-50">
      <div className="text-center p-6">
        <span className="text-5xl animate-bounce block mb-2">🇻🇳</span>
        <h2 className="text-lg font-bold text-slate-700" style={{ fontFamily: "var(--font-heading)" }}>
          Đang chuyển đến Bài Hát Việt...
        </h2>
      </div>
    </div>
  );
}
