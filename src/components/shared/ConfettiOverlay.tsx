"use client";

export function ConfettiOverlay({
  pieces,
}: {
  pieces: Array<{ id: number; left: number; color: string; delay: number }>;
}) {
  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            width: `${8 + Math.random() * 8}px`,
            height: `${8 + Math.random() * 8}px`,
          }}
        />
      ))}
    </div>
  );
}
