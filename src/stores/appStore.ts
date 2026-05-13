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

// ===== SRS (Spaced Repetition) Types =====
export interface SRSCard {
  wordEn: string;
  categoryId: string;
  nextReview: string; // ISO date string
  interval: number;   // days until next review
  easeFactor: number; // SM-2 ease factor (min 1.3)
  repetitions: number;
}

// SM-2 quality ratings
export type SRSQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0-1: complete blackout, 2: wrong but remembered after seeing answer
// 3: correct with difficulty, 4: correct, 5: perfect/easy

// ===== Daily Reward =====
const DAILY_REWARDS = [2, 3, 4, 5, 6, 8, 10]; // Stars per day in a 7-day cycle

interface ProgressState {
  learnedWords: Record<string, string[]>; // categoryId -> learned word EN names
  streak: number;
  lastActiveDate: string;
  totalStars: number;
  quizHighScore: number;
  unlockedStickers: string[];

  // SRS
  srsCards: Record<string, SRSCard>; // key = wordEn
  
  // Daily Reward
  lastDailyReward: string;     // ISO date of last claim
  dailyRewardStreak: number;   // consecutive days claimed

  markWordLearned: (categoryId: string, wordEn: string) => void;
  addStars: (count: number) => void;
  spendStars: (count: number) => boolean;
  updateStreak: () => void;
  setQuizHighScore: (score: number) => void;
  unlockSticker: (id: string) => void;
  resetProgress: () => void;

  // SRS actions
  addToSRS: (categoryId: string, wordEn: string) => void;
  reviewWord: (wordEn: string, quality: SRSQuality) => void;
  getDueWords: () => SRSCard[];
  
  // Daily Reward actions
  canClaimDailyReward: () => boolean;
  claimDailyReward: () => number; // returns stars earned
}

const getTodayStr = () => new Date().toISOString().split("T")[0];

// SM-2 Algorithm Implementation
function calculateSM2(card: SRSCard, quality: SRSQuality): Partial<SRSCard> {
  let { interval, easeFactor, repetitions } = card;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect - reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    interval,
    easeFactor: Math.round(easeFactor * 100) / 100,
    repetitions,
    nextReview: nextDate.toISOString().split("T")[0],
  };
}

export const useAppStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      learnedWords: {},
      streak: 0,
      lastActiveDate: "",
      totalStars: 0,
      quizHighScore: 0,
      unlockedStickers: [],
      srsCards: {},
      lastDailyReward: "",
      dailyRewardStreak: 0,

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
        // Also add to SRS automatically
        get().addToSRS(categoryId, wordEn);
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
          srsCards: {},
          lastDailyReward: "",
          dailyRewardStreak: 0,
        });
      },

      // ===== SRS Actions =====
      addToSRS: (categoryId, wordEn) => {
        const cards = get().srsCards;
        if (cards[wordEn]) return; // Already in SRS
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        set({
          srsCards: {
            ...cards,
            [wordEn]: {
              wordEn,
              categoryId,
              nextReview: tomorrow.toISOString().split("T")[0],
              interval: 1,
              easeFactor: 2.5,
              repetitions: 0,
            },
          },
        });
      },

      reviewWord: (wordEn, quality) => {
        const cards = get().srsCards;
        const card = cards[wordEn];
        if (!card) return;

        const updates = calculateSM2(card, quality);
        set({
          srsCards: {
            ...cards,
            [wordEn]: { ...card, ...updates },
          },
        });
      },

      getDueWords: () => {
        const today = getTodayStr();
        const cards = get().srsCards;
        return Object.values(cards).filter(
          (card) => card.nextReview <= today
        );
      },

      // ===== Daily Reward Actions =====
      canClaimDailyReward: () => {
        const today = getTodayStr();
        return get().lastDailyReward !== today;
      },

      claimDailyReward: () => {
        const today = getTodayStr();
        if (!get().canClaimDailyReward()) return 0;

        const last = get().lastDailyReward;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        const isConsecutive = last === yesterdayStr;
        const newStreak = isConsecutive ? get().dailyRewardStreak + 1 : 1;
        const dayIndex = (newStreak - 1) % DAILY_REWARDS.length;
        const stars = DAILY_REWARDS[dayIndex];

        set({
          lastDailyReward: today,
          dailyRewardStreak: newStreak,
          totalStars: get().totalStars + stars,
        });

        return stars;
      },
    }),
    { 
      name: "kidstar-progress",
      storage: createJSONStorage(() => capacitorStorage)
    }
  )
);
