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

