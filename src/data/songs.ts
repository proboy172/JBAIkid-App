export interface LyricWord {
  text: string;
  duration: number; // in seconds, how long this specific word is sung
}

export interface LyricLine {
  time: number;
  text: string;
  translation?: string; // Vietnamese translation for kids and parents
  words?: LyricWord[];
}

export interface SongVocab {
  en: string;
  vi: string;
  emoji?: string;
  phonetic?: string;
}

export interface Song {
  id: string;
  title: string;
  emoji: string;
  color: string;
  youtubeId?: string;
  localVideo?: string;
  lyrics: LyricLine[];
  introDuration?: number; // Time in seconds for the intro music
  bpm?: number; // Beats per minute for the song
  keyVocab?: SongVocab[];
}

import songsEnData from "./songs-en.json";
import songsViData from "./songs-vi.json";

export const songsEn: Song[] = songsEnData as Song[];
export const songsVi: Song[] = songsViData as Song[];

export function getRecommendedSongs(currentSong: Song, count = 16, randomMode = false): Song[] {
  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const allOtherSongs = [...songsEn, ...songsVi].filter((s) => s.id !== currentSong.id);

  if (randomMode) {
    return shuffle(allOtherSongs).slice(0, count);
  }

  const isEn = songsEn.some((s) => s.id === currentSong.id);
  const primaryPool = isEn ? songsEn : songsVi;
  const secondaryPool = isEn ? songsVi : songsEn;

  const sameLang = shuffle(primaryPool.filter((s) => s.id !== currentSong.id));
  const otherLang = shuffle(secondaryPool);

  const picks: Song[] = [];
  for (const s of sameLang) {
    if (picks.length >= count - 4) break;
    picks.push(s);
  }
  for (const s of otherLang) {
    if (picks.length >= count) break;
    picks.push(s);
  }
  return picks.slice(0, count);
}



