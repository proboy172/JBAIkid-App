"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      // Android WebView Fix: Force voice reload after a short delay
      const timer = setTimeout(loadVoices, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const speak = useCallback((text: string, lang: "en-US" | "vi-VN" = "en-US") => {
    if (typeof window === "undefined") return;
    if (!synthRef.current) synthRef.current = window.speechSynthesis;
    const synth = synthRef.current;

    // Force voice refresh if none loaded (common on Android)
    if (synth.getVoices().length === 0) {
      console.warn("SpeechSynthesis: No voices found, attempting reload...");
      synth.getVoices(); 
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = lang === "en-US" ? 0.8 : 0.9;
    utterance.pitch = 1.1;

    // Android/WebView requires speech to be triggered by a user gesture
    // This is usually handled by the onClick event in the UI
    
    const voices = synth.getVoices();
    let match: SpeechSynthesisVoice | undefined;

    if (lang === "vi-VN") {
      const viVoices = voices.filter((v) => v.lang.toLowerCase().includes("vi"));
      if (viVoices.length > 0) {
        match = viVoices.find(v => v.name.toLowerCase().includes("google") || v.name.toLowerCase().includes("hoai")) || viVoices[0];
      }
    } else if (lang === "en-US") {
      const enVoices = voices.filter((v) => v.lang.toLowerCase().includes("en"));
      if (enVoices.length > 0) {
        match = enVoices.find(v => v.lang === "en-US" && (v.name.includes("Google") || v.name.includes("Natural"))) || enVoices[0];
      }
    }

    if (match) {
      utterance.voice = match;
    }

    synth.speak(utterance);
  }, []);

  return { speak, voicesLoaded };
}
