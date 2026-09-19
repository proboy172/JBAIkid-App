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

export function getRecommendedSongs(currentSong: Song, count = 3): Song[] {
  const isEn = songsEn.some((s) => s.id === currentSong.id);
  const pool = isEn ? songsEn : songsVi;
  const currentIndex = pool.findIndex((s) => s.id === currentSong.id);

  const recommendations: Song[] = [];
  for (let i = 1; i < pool.length && recommendations.length < count; i++) {
    const nextSong = pool[(currentIndex + i) % pool.length];
    if (nextSong.id !== currentSong.id) {
      recommendations.push(nextSong);
    }
  }
  return recommendations;
}


