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

export function playVoiceBeep(isStart: boolean) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isStart) {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } else {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {}
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

// ===== Web Audio Real-Life Animal & Vehicle Sound Synthesizer =====
// 100% offline, zero-latency, plays authentic sound effects for kids
function synthesizeRealSound(type?: string) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    switch (type) {
      case "bee": {
        // Authentic bee buzzing sound: dual saw waves with fast vibrato LFO
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        const masterGain = ctx.createGain();

        osc1.type = "sawtooth";
        osc2.type = "sawtooth";
        osc1.frequency.setValueAtTime(215, now);
        osc2.frequency.setValueAtTime(223, now);

        // LFO for buzzing wing flutter (38Hz)
        lfo.frequency.setValueAtTime(38, now);
        lfoGain.gain.setValueAtTime(18, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfoGain.connect(osc2.frequency);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(750, now);
        filter.Q.setValueAtTime(3, now);

        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.22, now + 0.05);
        masterGain.gain.setValueAtTime(0.22, now + 0.7);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        lfo.start(now);
        osc1.stop(now + 1.0);
        osc2.stop(now + 1.0);
        lfo.stop(now + 1.0);
        triggerHaptic([20, 20, 20]);
        break;
      }

      case "dog": {
        // Two playful woof bursts
        [0, 0.22].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + delay;

          osc.type = "triangle";
          osc.frequency.setValueAtTime(360, t);
          osc.frequency.exponentialRampToValueAtTime(95, t + 0.14);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 0.17);
        });
        triggerHaptic([30, 20, 30]);
        break;
      }

      case "cat": {
        // Expressive Meow (rising then sliding down)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(720, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(420, now + 0.7);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
        triggerHaptic(25);
        break;
      }

      case "bird": {
        // High-pitched chirps
        [0, 0.12, 0.28].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = now + delay;

          osc.type = "sine";
          osc.frequency.setValueAtTime(2200 + idx * 300, t);
          osc.frequency.exponentialRampToValueAtTime(3100, t + 0.04);
          osc.frequency.exponentialRampToValueAtTime(2400, t + 0.08);

          gain.gain.setValueAtTime(0.22, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 0.1);
        });
        triggerHaptic(15);
        break;
      }

      case "duck": {
        // Nasal double quack
        [0, 0.25].forEach((delay) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          const t = now + delay;

          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(290, t);
          osc.frequency.exponentialRampToValueAtTime(170, t + 0.18);

          filter.type = "bandpass";
          filter.frequency.setValueAtTime(950, t);
          filter.Q.setValueAtTime(4, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 0.22);
        });
        triggerHaptic(25);
        break;
      }

      case "car_horn": {
        // Dual-tone European/US car horn (beep beep!)
        [0, 0.25].forEach((delay) => {
          const t = now + delay;
          [425, 520].forEach((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
            gain.gain.setValueAtTime(0.22, t + 0.14);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            osc.stop(t + 0.2);
          });
        });
        triggerHaptic([30, 20, 30]);
        break;
      }

      case "siren": {
        // Police/Ambulance two-tone siren
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.linearRampToValueAtTime(920, now + 0.35);
        osc.frequency.linearRampToValueAtTime(680, now + 0.7);
        osc.frequency.linearRampToValueAtTime(920, now + 1.05);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gain.gain.setValueAtTime(0.25, now + 1.0);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.25);
        triggerHaptic(40);
        break;
      }

      case "train": {
        // Steam train chord whistle (Choo-choooo!)
        const chord = [311.13, 370.0, 466.16];
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, now);

          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(freq * 1.5, now);
          filter.Q.setValueAtTime(3, now);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
          gain.gain.setValueAtTime(0.18, now + 0.65);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.95);
        });
        triggerHaptic([40, 80]);
        break;
      }

      case "cow": {
        // Warm low pitch Moo
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(125, now);
        osc.frequency.linearRampToValueAtTime(155, now + 0.35);
        osc.frequency.linearRampToValueAtTime(110, now + 0.9);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(480, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.26, now + 0.1);
        gain.gain.setValueAtTime(0.26, now + 0.7);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.05);
        triggerHaptic(35);
        break;
      }

      case "lion": {
        // Deep roaring growl with low vibrato
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(95, now);
        osc.frequency.exponentialRampToValueAtTime(75, now + 0.8);

        lfo.frequency.setValueAtTime(28, now);
        lfoGain.gain.setValueAtTime(25, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(380, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.32, now + 0.08);
        gain.gain.setValueAtTime(0.32, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        lfo.start(now);
        osc.stop(now + 1.0);
        lfo.stop(now + 1.0);
        triggerHaptic([40, 60]);
        break;
      }

      case "elephant": {
        // Brassy trumpet slide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.linearRampToValueAtTime(680, now + 0.25);
        osc.frequency.linearRampToValueAtTime(560, now + 0.7);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1100, now);
        filter.Q.setValueAtTime(3, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.04);
        gain.gain.setValueAtTime(0.28, now + 0.55);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.8);
        triggerHaptic([30, 40]);
        break;
      }

      case "sheep": {
        // Tremolo "Baaa"
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(240, now + 0.5);

        lfo.frequency.setValueAtTime(14, now);
        lfoGain.gain.setValueAtTime(0.12, now);
        lfo.connect(gain.gain);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        lfo.start(now);
        osc.stop(now + 0.7);
        lfo.stop(now + 0.7);
        triggerHaptic(25);
        break;
      }

      case "horse": {
        // Playful neigh slide
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.6);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
        triggerHaptic(30);
        break;
      }

      case "frog": {
        // Low ribbit croak
        [0, 0.18].forEach((tOff) => {
          const t = now + tOff;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(130, t);
          osc.frequency.linearRampToValueAtTime(210, t + 0.06);
          osc.frequency.linearRampToValueAtTime(110, t + 0.14);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.28, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 0.16);
        });
        triggerHaptic([20, 20]);
        break;
      }

      case "dolphin": {
        // Playful dolphin high clicks & whistle
        [0, 0.1, 0.25].forEach((tOff, i) => {
          const t = now + tOff;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(3200 + i * 400, t);
          osc.frequency.exponentialRampToValueAtTime(4800, t + 0.06);

          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 0.08);
        });
        triggerHaptic(20);
        break;
      }

      default: {
        // Fallback: cheerful star chime
        playSFX("pop");
        break;
      }
    }
  } catch {
    // ignore
  }
}

// Play real-life sound: checks if local MP3 audio exists, otherwise synthesizes seamlessly
export function playRealLifeSound(soundType?: string, soundFile?: string) {
  if (typeof window === "undefined") return;

  if (soundFile) {
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.85;
      audio
        .play()
        .then(() => {
          triggerHaptic(30);
        })
        .catch(() => {
          // If browser blocks audio or file is missing, synthesize smoothly
          synthesizeRealSound(soundType);
        });
      return;
    } catch {
      synthesizeRealSound(soundType);
      return;
    }
  }

  synthesizeRealSound(soundType);
}

