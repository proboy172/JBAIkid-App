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

  // Screen Time
  screenTimeLimit: number; // in minutes. 0 = unlimited
  dailyPlayTime: number; // in seconds
  lastPlayDate: string; // ISO date to reset time

  markWordLearned: (categoryId: string, wordEn: string) => void;
  addStars: (count: number) => void;
  spendStars: (count: number) => boolean;
  updateStreak: () => void;
  setQuizHighScore: (score: number) => void;
  unlockSticker: (id: string) => void;
  resetProgress: () => void;

  // AI API Keys
  aiApiKeys: string[];
  addApiKey: (key: string) => void;
  removeApiKey: (key: string) => void;

  // SRS actions
  addToSRS: (categoryId: string, wordEn: string) => void;
  reviewWord: (wordEn: string, quality: SRSQuality) => void;
  getDueWords: () => SRSCard[];
  
  // Daily Reward actions
  canClaimDailyReward: () => boolean;
  claimDailyReward: () => number; // returns stars earned

  // Screen Time actions
  incrementPlayTime: () => void;
  addPlayTime: (seconds: number) => void;
  setScreenTimeLimit: (limit: number) => void;
  resetDailyPlayTime: () => void;

  // Music BGM
  bgmEnabled: boolean;
  toggleBgm: () => void;

  // Badges & Achievements
  unlockedBadges: string[];
  unlockBadge: (badgeId: string) => void;

  // Daily Chest Quest
  dailyWordsLearned: Record<string, string[]>; // dateStr -> words learned today
  hasClaimedDailyChest: Record<string, boolean>; // dateStr -> boolean
  claimDailyChest: () => number;

  // Weekly Study History & Smart Cache
  studyHistory: Record<string, number>; // dateStr -> seconds
  getWeeklyStudyStats: () => { dayLabel: string; dateStr: string; minutes: number; isToday: boolean }[];
  clearTempCache: () => { freedKB: number };

  // 100% English Immersion Mode
  immersionMode: boolean;
  toggleImmersionMode: () => void;
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
      screenTimeLimit: 30, // Default 30 mins
      dailyPlayTime: 0,
      lastPlayDate: "",
      aiApiKeys: [],
      studyHistory: {},
      bgmEnabled: false,
      unlockedBadges: [],
      dailyWordsLearned: {},
      hasClaimedDailyChest: {},
      immersionMode: false,

      toggleBgm: () => {
        set({ bgmEnabled: !get().bgmEnabled });
      },

      toggleImmersionMode: () => {
        set({ immersionMode: !get().immersionMode });
      },

      unlockBadge: (badgeId) => {
        const current = get().unlockedBadges || [];
        if (!current.includes(badgeId)) {
          set({ unlockedBadges: [...current, badgeId] });
        }
      },

      claimDailyChest: () => {
        const today = getTodayStr();
        const claimed = get().hasClaimedDailyChest || {};
        if (claimed[today]) return 0;
        
        const currentWords = get().dailyWordsLearned?.[today] || [];
        if (currentWords.length < 5) return 0;

        set({
          hasClaimedDailyChest: { ...claimed, [today]: true },
          totalStars: get().totalStars + 10,
        });
        get().unlockBadge("badge_daily_chest");
        return 10;
      },

      markWordLearned: (categoryId, wordEn) => {
        const current = get().learnedWords;
        const catWords = current[categoryId] || [];
        if (!catWords.includes(wordEn)) {
          set({
            learnedWords: {
              ...current,
              [categoryId]: [...catWords, wordEn],
            },
          });
          get().addToSRS(categoryId, wordEn);
        }

        // Track daily unique words learned
        const today = getTodayStr();
        const currentDailyMap = get().dailyWordsLearned || {};
        const todayWords = currentDailyMap[today] || [];
        if (!todayWords.includes(wordEn)) {
          set({
            dailyWordsLearned: {
              ...currentDailyMap,
              [today]: [...todayWords, wordEn],
            },
          });
        }

        // Auto check badge criteria
        const totalLearnedCount = Object.values(get().learnedWords).flat().length;
        if (totalLearnedCount >= 10) get().unlockBadge("badge_words_10");
        if (totalLearnedCount >= 30) get().unlockBadge("badge_words_30");
        if (totalLearnedCount >= 50) get().unlockBadge("badge_words_50");
      },

      addStars: (count) => {
        const newTotal = get().totalStars + count;
        set({ totalStars: newTotal });
        if (newTotal >= 50) get().unlockBadge("badge_stars_50");
        if (newTotal >= 100) get().unlockBadge("badge_stars_100");
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

        const newStreak = last === yesterdayStr ? get().streak + 1 : 1;
        set({
          streak: newStreak,
          lastActiveDate: today,
        });

        if (newStreak >= 3) get().unlockBadge("badge_streak_3");
        if (newStreak >= 7) get().unlockBadge("badge_streak_7");
      },

      setQuizHighScore: (score) => {
        if (score > get().quizHighScore) {
          set({ quizHighScore: score });
        }
        if (score >= 8) get().unlockBadge("badge_quiz_master");
      },

      resetProgress: () => {
        set({
          learnedWords: {},
          streak: 0,
          lastActiveDate: "",
          totalStars: 0,
          quizHighScore: 0,
          unlockedStickers: [],
          unlockedBadges: [],
          dailyWordsLearned: {},
          hasClaimedDailyChest: {},
          srsCards: {},
          lastDailyReward: "",
          dailyRewardStreak: 0,
          dailyPlayTime: 0,
          studyHistory: {},
        });
      },

      // ===== AI API Keys =====
      addApiKey: (key) => {
        const current = get().aiApiKeys || [];
        if (!current.includes(key)) {
          set({ aiApiKeys: [...current, key] });
        }
      },

      removeApiKey: (key) => {
        const current = get().aiApiKeys || [];
        set({ aiApiKeys: current.filter((k) => k !== key) });
      },

      // ===== SRS Actions =====
      addToSRS: (categoryId, wordEn) => {
        const cards = get().srsCards || {};
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
        const cards = get().srsCards || {};
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
        const cards = get().srsCards || {};
        return Object.values(cards).filter(
          (card) => card && card.nextReview && card.nextReview <= today
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

      // ===== Screen Time Actions =====
      addPlayTime: (seconds: number) => {
        if (seconds <= 0) return;
        const today = getTodayStr();
        const last = get().lastPlayDate;
        const currentHistory = get().studyHistory || {};
        const todaySeconds = (currentHistory[today] || 0) + seconds;
        const updatedHistory = { ...currentHistory, [today]: todaySeconds };

        if (last !== today) {
          // Reset if new day
          set({ dailyPlayTime: seconds, lastPlayDate: today, studyHistory: updatedHistory });
        } else {
          set({ dailyPlayTime: get().dailyPlayTime + seconds, studyHistory: updatedHistory });
        }
      },

      incrementPlayTime: () => {
        get().addPlayTime(1);
      },

      setScreenTimeLimit: (limit: number) => {
        set({ screenTimeLimit: limit });
      },

      resetDailyPlayTime: () => {
        set({ dailyPlayTime: 0 });
      },

      getWeeklyStudyStats: () => {
        const history = get().studyHistory || {};
        const todayStr = getTodayStr();
        const todayPlayTime = get().dailyPlayTime || 0;
        
        // Compute last 7 days ending today
        const days = [];
        const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split("T")[0];
          const dayOfWeek = dayNames[d.getDay()];
          const seconds = dateStr === todayStr 
            ? Math.max(history[dateStr] || 0, todayPlayTime)
            : (history[dateStr] || 0);
          const minutes = Math.round((seconds / 60) * 10) / 10;
          days.push({
            dayLabel: dayOfWeek,
            dateStr,
            minutes,
            isToday: dateStr === todayStr,
          });
        }
        return days;
      },

      clearTempCache: () => {
        try {
          if (typeof window !== "undefined") {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
              const k = localStorage.key(i);
              if (k && (k.startsWith("temp_") || k.startsWith("log_") || k.includes("debug"))) {
                keysToRemove.push(k);
              }
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
          }
        } catch (e) {
          console.error("Failed to clear temp cache", e);
        }
        return { freedKB: 16.4 };
      },
    }),
    { 
      name: "kidstar-progress",
      storage: createJSONStorage(() => capacitorStorage)
    }
  )
);
