export interface LyricWord {
  text: string;
  duration: number; // in seconds, how long this specific word is sung
}

export interface LyricLine {
  time: number;
  text: string;
  words?: LyricWord[];
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
}

// Import từ các file đã được nghiên cứu và đồng bộ thủ công
import { songsEnNew } from "./songs-en";
import { songsViNew } from "./songs-vi";

export const songsEn: Song[] = songsEnNew;
export const songsVi: Song[] = songsViNew;
