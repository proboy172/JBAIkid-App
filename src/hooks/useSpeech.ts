"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Safari WebKit Bug 174066: Garbage collector clears utterances mid-speech if not held in a global/module reference
const activeUtterances = new Set<SpeechSynthesisUtterance>();

// Global flag to track if Safari speech engine has been unlocked
let isSafariSpeechUnlocked = false;

function unlockSafariSpeech() {
  if (isSafariSpeechUnlocked || typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    const silent = new SpeechSynthesisUtterance("");
    silent.volume = 0;
    silent.rate = 1;
    activeUtterances.add(silent);
    silent.onend = () => activeUtterances.delete(silent);
    silent.onerror = () => activeUtterances.delete(silent);
    window.speechSynthesis.speak(silent);
    isSafariSpeechUnlocked = true;
  } catch (e) {
    // Ignore unlock errors
  }
}

export function useSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    synthRef.current = window.speechSynthesis;

    const loadVoices = () => {
      if (!window.speechSynthesis) return;
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Safari iOS & Android WebView reload fallback: Poll briefly for voices
    const timer1 = setTimeout(loadVoices, 250);
    const timer2 = setTimeout(loadVoices, 1000);
    const timer3 = setTimeout(loadVoices, 2500);

    // Auto unlock Safari speech engine on first user interaction
    const handleFirstTouch = () => {
      unlockSafariSpeech();
      window.removeEventListener("touchstart", handleFirstTouch, true);
      window.removeEventListener("pointerdown", handleFirstTouch, true);
    };

    window.addEventListener("touchstart", handleFirstTouch, { capture: true, once: true, passive: true });
    window.addEventListener("pointerdown", handleFirstTouch, { capture: true, once: true, passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("touchstart", handleFirstTouch, true);
      window.removeEventListener("pointerdown", handleFirstTouch, true);
    };
  }, []);

  const speak = useCallback((text: string, lang: "en-US" | "vi-VN" = "en-US", customRate?: number) => {
    if (typeof window === "undefined") return;
    if (!synthRef.current) synthRef.current = window.speechSynthesis;
    const synth = synthRef.current;
    if (!synth) return;

    // Safari Fix: Resume synth if paused or stuck
    if (synth.paused) {
      try {
        synth.resume();
      } catch (e) {}
    }

    // Force voice refresh if none loaded
    let voices = synth.getVoices();
    if (!voices || voices.length === 0) {
      try {
        voices = synth.getVoices();
      } catch (e) {}
    }

    // Cancel current speech safely
    try {
      synth.cancel();
    } catch (e) {}

    // Cleanup previous utterance reference
    if (currentUtteranceRef.current) {
      activeUtterances.delete(currentUtteranceRef.current);
      currentUtteranceRef.current = null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = customRate !== undefined ? customRate : (lang === "en-US" ? 0.82 : 0.72);
    utterance.pitch = 1.05;

    // Safari WebKit Fix: Keep strong reference in Set to prevent Garbage Collection mid-speech
    activeUtterances.add(utterance);
    currentUtteranceRef.current = utterance;

    const cleanup = () => {
      activeUtterances.delete(utterance);
      if (currentUtteranceRef.current === utterance) {
        currentUtteranceRef.current = null;
      }
    };

    utterance.onend = cleanup;
    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      cleanup();
    };

    // Voice selection with Safari (Apple Siri / Linh / Mai / Samantha / Alex) priority
    let match: SpeechSynthesisVoice | undefined;

    if (voices && voices.length > 0) {
      if (lang === "vi-VN") {
        const viVoices = voices.filter((v) => {
          const l = v.lang.toLowerCase().replace("_", "-");
          return l.startsWith("vi");
        });
        if (viVoices.length > 0) {
          // Priority: Apple iOS native (Linh, Mai, Siri) -> Google / Natural -> any Vietnamese
          match =
            viVoices.find((v) => {
              const name = v.name.toLowerCase();
              return name.includes("linh") || name.includes("mai") || name.includes("siri") || name.includes("apple");
            }) ||
            viVoices.find((v) => {
              const name = v.name.toLowerCase();
              return name.includes("google") || name.includes("natural") || name.includes("hoai");
            }) ||
            viVoices[0];
        }
      } else if (lang === "en-US") {
        const enVoices = voices.filter((v) => {
          const l = v.lang.toLowerCase().replace("_", "-");
          return l.startsWith("en");
        });
        if (enVoices.length > 0) {
          // Priority: Apple iOS native (Samantha, Alex, Siri, Daniel) -> Google / Natural -> any English
          match =
            enVoices.find((v) => {
              const name = v.name.toLowerCase();
              return (
                name.includes("samantha") ||
                name.includes("alex") ||
                name.includes("siri") ||
                name.includes("daniel") ||
                name.includes("karen")
              );
            }) ||
            enVoices.find((v) => {
              const name = v.name.toLowerCase();
              return name.includes("google") || name.includes("natural");
            }) ||
            enVoices.find((v) => v.lang.toLowerCase().replace("_", "-") === "en-us") ||
            enVoices[0];
        }
      }
    }

    if (match) {
      utterance.voice = match;
    }

    try {
      synth.speak(utterance);
    } catch (e) {
      cleanup();
    }
  }, []);

  return { speak, voicesLoaded };
}

