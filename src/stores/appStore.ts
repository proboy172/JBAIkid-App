import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

// Custom storage adapter for Capacitor
const capacitorStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: name });
      return value;
    }
    return localStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key: name, value });
    } else {
      localStorage.setItem(name, value);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (Capacitor.isNativePlatform()) {
      await Preferences.remove({ key: name });
    } else {
      localStorage.removeItem(name);
    }
  },
};

interface ProgressState {
  learnedWords: Record<string, string[]>; // categoryId -> learned word EN names
  streak: number;
  lastActiveDate: string;
  totalStars: number;
  quizHighScore: number;
  unlockedStickers: string[];

  markWordLearned: (categoryId: string, wordEn: string) => void;
  addStars: (count: number) => void;
  spendStars: (count: number) => boolean;
  updateStreak: () => void;
  setQuizHighScore: (score: number) => void;
  unlockSticker: (id: string) => void;
  resetProgress: () => void;
}

const getTodayStr = () => new Date().toISOString().split("T")[0];

export const useAppStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      learnedWords: {},
      streak: 0,
      lastActiveDate: "",
      totalStars: 0,
      quizHighScore: 0,
      unlockedStickers: [],

      markWordLearned: (categoryId, wordEn) => {
        const current = get().learnedWords;
        const catWords = current[categoryId] || [];
        if (catWords.includes(wordEn)) return;
        set({
          learnedWords: {
            ...current,
            [categoryId]: [...catWords, wordEn],
          },
        });
      },

      addStars: (count) => {
        set({ totalStars: get().totalStars + count });
      },

      spendStars: (count) => {
        const currentStars = get().totalStars;
        if (currentStars >= count) {
          set({ totalStars: currentStars - count });
          return true;
        }
        return false;
      },

      unlockSticker: (id) => {
        const current = get().unlockedStickers;
        if (!current.includes(id)) {
          set({ unlockedStickers: [...current, id] });
        }
      },

      updateStreak: () => {
        const today = getTodayStr();
        const last = get().lastActiveDate;
        if (last === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        set({
          streak: last === yesterdayStr ? get().streak + 1 : 1,
          lastActiveDate: today,
        });
      },

      setQuizHighScore: (score) => {
        if (score > get().quizHighScore) {
          set({ quizHighScore: score });
        }
      },

      resetProgress: () => {
        set({
          learnedWords: {},
          streak: 0,
          lastActiveDate: "",
          totalStars: 0,
          quizHighScore: 0,
          unlockedStickers: [],
        });
      },
    }),
    { 
      name: "kidstar-progress",
      storage: createJSONStorage(() => capacitorStorage)
    }
  )
);
