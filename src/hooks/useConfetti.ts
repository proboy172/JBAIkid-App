"use client";
import { useState, useCallback } from "react";

export function useConfetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  const fire = useCallback(() => {
    const colors = ["#FF6B9D", "#C084FC", "#34D399", "#FBBF24", "#38BDF8", "#FB923C"];
    const newPieces = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.8,
    }));
    setPieces(newPieces);
    setTimeout(() => setPieces([]), 3000);
  }, []);

  return { pieces, fire };
}
