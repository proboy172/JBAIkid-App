"use client";

import { useState, useCallback, useRef } from "react";
import stringSimilarity from "string-similarity";
import { playSFX } from "@/utils/soundEffects";

export type PronunciationScore = 0 | 1 | 2 | 3;
export type PronunciationGrade = "perfect" | "good" | "retry" | null;

interface SpeechRecognitionResult {
  transcript: string;
  similarity: number;
  stars: PronunciationScore;
  grade: PronunciationGrade;
}

export function useSpeechRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [similarity, setSimilarity] = useState(0);
  const [stars, setStars] = useState<PronunciationScore>(0);
  const [grade, setGrade] = useState<PronunciationGrade>(null);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const reset = useCallback(() => {
    setIsRecording(false);
    setTranscript("");
    setSimilarity(0);
    setStars(0);
    setGrade(null);
    setError(null);
  }, []);

  const evaluatePronunciation = useCallback((spokenText: string, targetWord: string): SpeechRecognitionResult => {
    const cleanSpoken = spokenText.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const cleanTarget = targetWord.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

    const sim = stringSimilarity.compareTwoStrings(cleanSpoken, cleanTarget);

    let starScore: PronunciationScore = 1;
    let gradeResult: PronunciationGrade = "retry";

    if (sim >= 0.82 || cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
      starScore = 3;
      gradeResult = "perfect";
    } else if (sim >= 0.50) {
      starScore = 2;
      gradeResult = "good";
    } else {
      starScore = 1;
      gradeResult = "retry";
    }

    setTranscript(spokenText);
    setSimilarity(sim);
    setStars(starScore);
    setGrade(gradeResult);

    if (starScore === 3) {
      playSFX("correct");
    } else if (starScore === 2) {
      playSFX("star");
    } else {
      playSFX("boop");
    }

    return {
      transcript: spokenText,
      similarity: sim,
      stars: starScore,
      grade: gradeResult,
    };
  }, []);

  const startListening = useCallback(async (targetWord: string): Promise<Promise<SpeechRecognitionResult | null>> => {
    reset();
    setError(null);

    return new Promise(async (resolve) => {
      // 1. Native Capacitor APK Platform
      if (typeof window !== "undefined") {
        try {
          const { Capacitor } = await import("@capacitor/core");
          if (Capacitor.isNativePlatform()) {
            const { SpeechRecognition } = await import("@capacitor-community/speech-recognition");
            let permStatus = await SpeechRecognition.checkPermissions();
            if (permStatus.speechRecognition !== "granted") {
              permStatus = await SpeechRecognition.requestPermissions();
            }

            if (permStatus.speechRecognition !== "granted") {
              setError("Vui lòng cấp quyền micro để bé luyện nói!");
              resolve(null);
              return;
            }

            setIsRecording(true);
            await SpeechRecognition.start({
              language: "en-US",
              maxResults: 1,
              prompt: `Đọc to từ: ${targetWord}`,
              partialResults: false,
            });

            SpeechRecognition.addListener("partialResults", (data: any) => {
              if (data.matches && data.matches.length > 0) {
                const text = data.matches[0];
                const res = evaluatePronunciation(text, targetWord);
                setIsRecording(false);
                SpeechRecognition.stop();
                resolve(res);
              }
            });

            setTimeout(() => {
              SpeechRecognition.stop();
              setIsRecording(false);
            }, 6000);

            return;
          }
        } catch (err) {
          console.warn("Capacitor Speech fallback to Web Speech:", err);
        }
      }

      // 2. Web Speech API (Chrome, Safari, Edge, Android Chrome)
      const WebSpeech =
        typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

      if (!WebSpeech) {
        setError("Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge mới nhất!");
        resolve(null);
        return;
      }

      try {
        const recognition = new WebSpeech();
        recognitionRef.current = recognition;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          const result = evaluatePronunciation(spoken, targetWord);
          setIsRecording(false);
          resolve(result);
        };

        recognition.onerror = (event: any) => {
          setIsRecording(false);
          if (event.error !== "no-speech") {
            setError("Chưa nghe rõ âm thanh, bé hãy thử lại nhé!");
          }
          resolve(null);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (e) {
        setIsRecording(false);
        setError("Không thể khởi động micro!");
        resolve(null);
      }
    });
  }, [reset, evaluatePronunciation]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
  }, []);

  return {
    isRecording,
    transcript,
    similarity,
    stars,
    grade,
    error,
    startListening,
    stopListening,
    reset,
  };
}
