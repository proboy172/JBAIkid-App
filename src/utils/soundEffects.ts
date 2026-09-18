"use client";

// Web Audio API Sound Effects Synthesizer for Kids
// 100% Offline, Zero-Latency, Zero-File-Size

type SoundType = "pop" | "star" | "correct" | "boop" | "cheer" | "tap" | "giggle";

let audioCtx: AudioContext | null = null;
let bgmInterval: any = null;
let bgmGainNode: GainNode | null = null;
let isBgmRunning = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Trigger subtle haptic feedback
export function triggerHaptic(duration: number | number[] = 15) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (e) {
      // Ignore vibration errors
    }
  }
}

// ===== Web Audio Cheerful BGM Generator (Kalimba / Music Box) =====
// C major pentatonic nursery progression: C - G - Am - F
const BGM_NOTES: number[][] = [
  // C major: C4, E4, G4, C5
  [261.63, 329.63, 392.00, 523.25],
  // G major: G3, B3, D4, G4
  [196.00, 246.94, 293.66, 392.00],
  // A minor: A3, C4, E4, A4
  [220.00, 261.63, 329.63, 440.00],
  // F major: F3, A3, C4, F4
  [174.61, 220.00, 261.63, 349.23],
];

let currentChordIdx = 0;
let currentNoteInChord = 0;

function playNextBgmNote() {
  const ctx = getAudioContext();
  if (!ctx || !isBgmRunning) return;

  const now = ctx.currentTime;
  const chord = BGM_NOTES[currentChordIdx];
  const freq = chord[currentNoteInChord];

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Soft sine tone like a warm music box / marimba
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0, now);
  // Very soft volume (0.04 - 0.06) so it's gentle and soothing
  gain.gain.linearRampToValueAtTime(0.045, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.6);

  currentNoteInChord++;
  if (currentNoteInChord >= chord.length) {
    currentNoteInChord = 0;
    currentChordIdx = (currentChordIdx + 1) % BGM_NOTES.length;
  }
}

export function startBGM() {
  if (isBgmRunning) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  isBgmRunning = true;
  currentChordIdx = 0;
  currentNoteInChord = 0;
  
  playNextBgmNote();
  bgmInterval = setInterval(playNextBgmNote, 380); // ~158 BPM eighth-note pulse
}

export function stopBGM() {
  isBgmRunning = false;
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

export function isBGMActive(): boolean {
  return isBgmRunning;
}

// Random kid-encouragement voice cheer in Vietnamese
export function speakCheer(customText?: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const cheers = [
    "Bé giỏi quá!",
    "Hoan hô con!",
    "Xuất sắc lắm!",
    "Tuyệt vời!",
    "Bé thông minh quá!",
  ];
  const text = customText || cheers[Math.floor(Math.random() * cheers.length)];

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = 1.05;
    utterance.pitch = 1.25; // Playful, higher pitch for friendly cartoon feel
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    // Fallback ignore
  }
}

export function playSFX(type: SoundType) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (type) {
      case "giggle": {
        // Playful mascot giggle sound (quick rising arpeggio)
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + idx * 0.05;

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.25, noteTime + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 0.14);
        });
        triggerHaptic(20);
        break;
      }

      case "pop": {
        // Cheerful bubble pop sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
        triggerHaptic(10);
        break;
      }

      case "tap": {
        // Subtle clean UI tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
        triggerHaptic(8);
        break;
      }

      case "star": {
        // Sparkling fairy bell chime (E6 -> G#6 -> B6)
        const notes = [1318.51, 1661.22, 1975.53];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + idx * 0.08;

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.25, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 0.36);
        });
        triggerHaptic([15, 30, 20]);
        break;
      }

      case "correct": {
        // Triumphant Kids Major Chord (C5 -> E5 -> G5 -> C6)
        const chord = [523.25, 659.25, 783.99, 1046.5];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + idx * 0.06;

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.25, noteTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 0.52);
        });
        triggerHaptic([30, 40, 50]);
        break;
      }

      case "boop": {
        // Gentle cartoon boing / encouragement tone (friendly, non-punitive)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
        triggerHaptic(25);
        break;
      }

      case "cheer": {
        // Victory fanfare arpeggio
        const fanfare = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        fanfare.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + idx * 0.08;

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.28, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 0.65);
        });
        triggerHaptic([40, 60, 40, 80]);
        break;
      }
    }
  } catch (e) {
    // Graceful fallback if Web Audio is blocked or unsupported
  }
}
