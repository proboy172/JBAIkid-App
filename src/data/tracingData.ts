export interface TracingPoint {
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
}

export interface TracingStroke {
  points: TracingPoint[];
}

export interface TracingItem {
  id: string;
  char: string;
  type: "letter" | "number";
  title: string;
  phonics: string;
  word: string;
  emoji: string;
  color: string;
  strokes: TracingStroke[];
}

export const tracingLetters: TracingItem[] = [
  {
    id: "letter-a",
    char: "A",
    type: "letter",
    title: "Chữ A",
    phonics: "A is for Apple! /æ/ /æ/ Apple",
    word: "Apple",
    emoji: "🍎",
    color: "#EF4444",
    strokes: [
      {
        points: [
          { x: 0.5, y: 0.15 },
          { x: 0.35, y: 0.5 },
          { x: 0.2, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.5, y: 0.15 },
          { x: 0.65, y: 0.5 },
          { x: 0.8, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.3, y: 0.58 },
          { x: 0.5, y: 0.58 },
          { x: 0.7, y: 0.58 },
        ],
      },
    ],
  },
  {
    id: "letter-b",
    char: "B",
    type: "letter",
    title: "Chữ B",
    phonics: "B is for Ball! /b/ /b/ Ball",
    word: "Ball",
    emoji: "⚽",
    color: "#3B82F6",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.25, y: 0.5 },
          { x: 0.25, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.6, y: 0.2 },
          { x: 0.65, y: 0.35 },
          { x: 0.5, y: 0.5 },
          { x: 0.25, y: 0.5 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.5 },
          { x: 0.65, y: 0.55 },
          { x: 0.7, y: 0.7 },
          { x: 0.55, y: 0.85 },
          { x: 0.25, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-c",
    char: "C",
    type: "letter",
    title: "Chữ C",
    phonics: "C is for Cat! /k/ /k/ Cat",
    word: "Cat",
    emoji: "🐱",
    color: "#F59E0B",
    strokes: [
      {
        points: [
          { x: 0.75, y: 0.25 },
          { x: 0.5, y: 0.15 },
          { x: 0.25, y: 0.35 },
          { x: 0.2, y: 0.5 },
          { x: 0.25, y: 0.65 },
          { x: 0.5, y: 0.85 },
          { x: 0.75, y: 0.75 },
        ],
      },
    ],
  },
  {
    id: "letter-d",
    char: "D",
    type: "letter",
    title: "Chữ D",
    phonics: "D is for Dog! /d/ /d/ Dog",
    word: "Dog",
    emoji: "🐶",
    color: "#10B981",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.25, y: 0.5 },
          { x: 0.25, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.6, y: 0.2 },
          { x: 0.75, y: 0.4 },
          { x: 0.75, y: 0.6 },
          { x: 0.6, y: 0.8 },
          { x: 0.25, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-e",
    char: "E",
    type: "letter",
    title: "Chữ E",
    phonics: "E is for Elephant! /e/ /e/ Elephant",
    word: "Elephant",
    emoji: "🐘",
    color: "#8B5CF6",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.25, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.75, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.5 },
          { x: 0.65, y: 0.5 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.85 },
          { x: 0.75, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-f",
    char: "F",
    type: "letter",
    title: "Chữ F",
    phonics: "F is for Fish! /f/ /f/ Fish",
    word: "Fish",
    emoji: "🐟",
    color: "#06B6D4",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.25, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.75, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.5 },
          { x: 0.65, y: 0.5 },
        ],
      },
    ],
  },
  {
    id: "letter-g",
    char: "G",
    type: "letter",
    title: "Chữ G",
    phonics: "G is for Giraffe! /dʒ/ /dʒ/ Giraffe",
    word: "Giraffe",
    emoji: "🦒",
    color: "#EC4899",
    strokes: [
      {
        points: [
          { x: 0.75, y: 0.25 },
          { x: 0.5, y: 0.15 },
          { x: 0.25, y: 0.35 },
          { x: 0.2, y: 0.5 },
          { x: 0.25, y: 0.7 },
          { x: 0.5, y: 0.85 },
          { x: 0.75, y: 0.85 },
          { x: 0.75, y: 0.55 },
          { x: 0.55, y: 0.55 },
        ],
      },
    ],
  },
  {
    id: "letter-h",
    char: "H",
    type: "letter",
    title: "Chữ H",
    phonics: "H is for Hat! /h/ /h/ Hat",
    word: "Hat",
    emoji: "🧢",
    color: "#F97316",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.25, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.75, y: 0.15 },
          { x: 0.75, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.5 },
          { x: 0.75, y: 0.5 },
        ],
      },
    ],
  },
  {
    id: "letter-i",
    char: "I",
    type: "letter",
    title: "Chữ I",
    phonics: "I is for Ice cream! /aɪ/ /aɪ/ Ice cream",
    word: "Ice cream",
    emoji: "🍦",
    color: "#14B8A6",
    strokes: [
      {
        points: [
          { x: 0.3, y: 0.15 },
          { x: 0.7, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.5, y: 0.15 },
          { x: 0.5, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.3, y: 0.85 },
          { x: 0.7, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-j",
    char: "J",
    type: "letter",
    title: "Chữ J",
    phonics: "J is for Jellyfish! /dʒ/ /dʒ/ Jellyfish",
    word: "Jellyfish",
    emoji: "🪼",
    color: "#A855F7",
    strokes: [
      {
        points: [
          { x: 0.3, y: 0.15 },
          { x: 0.7, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.6, y: 0.15 },
          { x: 0.6, y: 0.7 },
          { x: 0.5, y: 0.85 },
          { x: 0.35, y: 0.8 },
          { x: 0.3, y: 0.65 },
        ],
      },
    ],
  },
  {
    id: "letter-k",
    char: "K",
    type: "letter",
    title: "Chữ K",
    phonics: "K is for Kite! /k/ /k/ Kite",
    word: "Kite",
    emoji: "🪁",
    color: "#F43F5E",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.25, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.7, y: 0.15 },
          { x: 0.25, y: 0.5 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.5 },
          { x: 0.7, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-l",
    char: "L",
    type: "letter",
    title: "Chữ L",
    phonics: "L is for Lion! /l/ /l/ Lion",
    word: "Lion",
    emoji: "🦁",
    color: "#EAB308",
    strokes: [
      {
        points: [
          { x: 0.3, y: 0.15 },
          { x: 0.3, y: 0.85 },
          { x: 0.75, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-m",
    char: "M",
    type: "letter",
    title: "Chữ M",
    phonics: "M is for Monkey! /m/ /m/ Monkey",
    word: "Monkey",
    emoji: "🐒",
    color: "#84CC16",
    strokes: [
      {
        points: [
          { x: 0.2, y: 0.85 },
          { x: 0.2, y: 0.15 },
          { x: 0.5, y: 0.6 },
          { x: 0.8, y: 0.15 },
          { x: 0.8, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-n",
    char: "N",
    type: "letter",
    title: "Chữ N",
    phonics: "N is for Nest! /n/ /n/ Nest",
    word: "Nest",
    emoji: "🪺",
    color: "#0284C7",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.85 },
          { x: 0.25, y: 0.15 },
          { x: 0.75, y: 0.85 },
          { x: 0.75, y: 0.15 },
        ],
      },
    ],
  },
  {
    id: "letter-o",
    char: "O",
    type: "letter",
    title: "Chữ O",
    phonics: "O is for Octopus! /ɑː/ /ɑː/ Octopus",
    word: "Octopus",
    emoji: "🐙",
    color: "#FB923C",
    strokes: [
      {
        points: [
          { x: 0.5, y: 0.15 },
          { x: 0.25, y: 0.35 },
          { x: 0.2, y: 0.5 },
          { x: 0.25, y: 0.7 },
          { x: 0.5, y: 0.85 },
          { x: 0.75, y: 0.7 },
          { x: 0.8, y: 0.5 },
          { x: 0.75, y: 0.35 },
          { x: 0.5, y: 0.15 },
        ],
      },
    ],
  },
  {
    id: "letter-p",
    char: "P",
    type: "letter",
    title: "Chữ P",
    phonics: "P is for Panda! /p/ /p/ Panda",
    word: "Panda",
    emoji: "🐼",
    color: "#059669",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.85 },
          { x: 0.25, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.65, y: 0.2 },
          { x: 0.7, y: 0.35 },
          { x: 0.6, y: 0.5 },
          { x: 0.25, y: 0.5 },
        ],
      },
    ],
  },
  {
    id: "letter-q",
    char: "Q",
    type: "letter",
    title: "Chữ Q",
    phonics: "Q is for Queen! /kw/ /kw/ Queen",
    word: "Queen",
    emoji: "👑",
    color: "#7C3AED",
    strokes: [
      {
        points: [
          { x: 0.5, y: 0.15 },
          { x: 0.25, y: 0.35 },
          { x: 0.2, y: 0.5 },
          { x: 0.25, y: 0.7 },
          { x: 0.5, y: 0.85 },
          { x: 0.75, y: 0.7 },
          { x: 0.8, y: 0.5 },
          { x: 0.75, y: 0.35 },
          { x: 0.5, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.55, y: 0.65 },
          { x: 0.8, y: 0.9 },
        ],
      },
    ],
  },
  {
    id: "letter-r",
    char: "R",
    type: "letter",
    title: "Chữ R",
    phonics: "R is for Rainbow! /r/ /r/ Rainbow",
    word: "Rainbow",
    emoji: "🌈",
    color: "#2563EB",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.85 },
          { x: 0.25, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.65, y: 0.2 },
          { x: 0.7, y: 0.35 },
          { x: 0.6, y: 0.5 },
          { x: 0.25, y: 0.5 },
        ],
      },
      {
        points: [
          { x: 0.5, y: 0.5 },
          { x: 0.75, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-s",
    char: "S",
    type: "letter",
    title: "Chữ S",
    phonics: "S is for Sun! /s/ /s/ Sun",
    word: "Sun",
    emoji: "☀️",
    color: "#F59E0B",
    strokes: [
      {
        points: [
          { x: 0.75, y: 0.25 },
          { x: 0.5, y: 0.15 },
          { x: 0.3, y: 0.25 },
          { x: 0.35, y: 0.45 },
          { x: 0.65, y: 0.55 },
          { x: 0.7, y: 0.75 },
          { x: 0.5, y: 0.85 },
          { x: 0.25, y: 0.75 },
        ],
      },
    ],
  },
  {
    id: "letter-t",
    char: "T",
    type: "letter",
    title: "Chữ T",
    phonics: "T is for Tiger! /t/ /t/ Tiger",
    word: "Tiger",
    emoji: "🐯",
    color: "#EA580C",
    strokes: [
      {
        points: [
          { x: 0.2, y: 0.15 },
          { x: 0.8, y: 0.15 },
        ],
      },
      {
        points: [
          { x: 0.5, y: 0.15 },
          { x: 0.5, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-u",
    char: "U",
    type: "letter",
    title: "Chữ U",
    phonics: "U is for Umbrella! /ʌ/ /ʌ/ Umbrella",
    word: "Umbrella",
    emoji: "☂️",
    color: "#0891B2",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.25, y: 0.65 },
          { x: 0.35, y: 0.85 },
          { x: 0.65, y: 0.85 },
          { x: 0.75, y: 0.65 },
          { x: 0.75, y: 0.15 },
        ],
      },
    ],
  },
  {
    id: "letter-v",
    char: "V",
    type: "letter",
    title: "Chữ V",
    phonics: "V is for Van! /v/ /v/ Van",
    word: "Van",
    emoji: "🚐",
    color: "#9333EA",
    strokes: [
      {
        points: [
          { x: 0.2, y: 0.15 },
          { x: 0.5, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.5, y: 0.85 },
          { x: 0.8, y: 0.15 },
        ],
      },
    ],
  },
  {
    id: "letter-w",
    char: "W",
    type: "letter",
    title: "Chữ W",
    phonics: "W is for Whale! /w/ /w/ Whale",
    word: "Whale",
    emoji: "🐳",
    color: "#0284C7",
    strokes: [
      {
        points: [
          { x: 0.15, y: 0.15 },
          { x: 0.35, y: 0.85 },
          { x: 0.5, y: 0.35 },
          { x: 0.65, y: 0.85 },
          { x: 0.85, y: 0.15 },
        ],
      },
    ],
  },
  {
    id: "letter-x",
    char: "X",
    type: "letter",
    title: "Chữ X",
    phonics: "X is for Xylophone! /z/ /z/ Xylophone",
    word: "Xylophone",
    emoji: "🎵",
    color: "#D97706",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.75, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.75, y: 0.15 },
          { x: 0.25, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-y",
    char: "Y",
    type: "letter",
    title: "Chữ Y",
    phonics: "Y is for Yo-yo! /j/ /j/ Yo-yo",
    word: "Yo-yo",
    emoji: "🪀",
    color: "#16A34A",
    strokes: [
      {
        points: [
          { x: 0.2, y: 0.15 },
          { x: 0.5, y: 0.5 },
        ],
      },
      {
        points: [
          { x: 0.8, y: 0.15 },
          { x: 0.5, y: 0.5 },
        ],
      },
      {
        points: [
          { x: 0.5, y: 0.5 },
          { x: 0.5, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "letter-z",
    char: "Z",
    type: "letter",
    title: "Chữ Z",
    phonics: "Z is for Zebra! /z/ /z/ Zebra",
    word: "Zebra",
    emoji: "🦓",
    color: "#475569",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.75, y: 0.15 },
          { x: 0.25, y: 0.85 },
          { x: 0.75, y: 0.85 },
        ],
      },
    ],
  },
];

export const tracingNumbers: TracingItem[] = [
  {
    id: "num-1",
    char: "1",
    type: "number",
    title: "Số 1",
    phonics: "Number One! 1 One apple",
    word: "One",
    emoji: "1️⃣",
    color: "#EF4444",
    strokes: [
      {
        points: [
          { x: 0.35, y: 0.3 },
          { x: 0.5, y: 0.15 },
          { x: 0.5, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.3, y: 0.85 },
          { x: 0.7, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "num-2",
    char: "2",
    type: "number",
    title: "Số 2",
    phonics: "Number Two! 2 Two balls",
    word: "Two",
    emoji: "2️⃣",
    color: "#F97316",
    strokes: [
      {
        points: [
          { x: 0.3, y: 0.3 },
          { x: 0.5, y: 0.15 },
          { x: 0.7, y: 0.3 },
          { x: 0.7, y: 0.45 },
          { x: 0.3, y: 0.85 },
          { x: 0.75, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "num-3",
    char: "3",
    type: "number",
    title: "Số 3",
    phonics: "Number Three! 3 Three stars",
    word: "Three",
    emoji: "3️⃣",
    color: "#F59E0B",
    strokes: [
      {
        points: [
          { x: 0.3, y: 0.2 },
          { x: 0.65, y: 0.2 },
          { x: 0.45, y: 0.48 },
          { x: 0.7, y: 0.65 },
          { x: 0.55, y: 0.85 },
          { x: 0.3, y: 0.8 },
        ],
      },
    ],
  },
  {
    id: "num-4",
    char: "4",
    type: "number",
    title: "Số 4",
    phonics: "Number Four! 4 Four cars",
    word: "Four",
    emoji: "4️⃣",
    color: "#10B981",
    strokes: [
      {
        points: [
          { x: 0.65, y: 0.15 },
          { x: 0.25, y: 0.6 },
          { x: 0.8, y: 0.6 },
        ],
      },
      {
        points: [
          { x: 0.65, y: 0.35 },
          { x: 0.65, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "num-5",
    char: "5",
    type: "number",
    title: "Số 5",
    phonics: "Number Five! 5 Five fingers",
    word: "Five",
    emoji: "5️⃣",
    color: "#3B82F6",
    strokes: [
      {
        points: [
          { x: 0.65, y: 0.15 },
          { x: 0.35, y: 0.15 },
          { x: 0.35, y: 0.45 },
          { x: 0.65, y: 0.55 },
          { x: 0.65, y: 0.75 },
          { x: 0.5, y: 0.85 },
          { x: 0.3, y: 0.8 },
        ],
      },
    ],
  },
  {
    id: "num-6",
    char: "6",
    type: "number",
    title: "Số 6",
    phonics: "Number Six! 6 Six cats",
    word: "Six",
    emoji: "6️⃣",
    color: "#8B5CF6",
    strokes: [
      {
        points: [
          { x: 0.65, y: 0.2 },
          { x: 0.4, y: 0.4 },
          { x: 0.3, y: 0.65 },
          { x: 0.45, y: 0.85 },
          { x: 0.7, y: 0.75 },
          { x: 0.7, y: 0.55 },
          { x: 0.45, y: 0.5 },
          { x: 0.3, y: 0.65 },
        ],
      },
    ],
  },
  {
    id: "num-7",
    char: "7",
    type: "number",
    title: "Số 7",
    phonics: "Number Seven! 7 Seven colors",
    word: "Seven",
    emoji: "7️⃣",
    color: "#EC4899",
    strokes: [
      {
        points: [
          { x: 0.25, y: 0.15 },
          { x: 0.75, y: 0.15 },
          { x: 0.45, y: 0.85 },
        ],
      },
    ],
  },
  {
    id: "num-8",
    char: "8",
    type: "number",
    title: "Số 8",
    phonics: "Number Eight! 8 Eight legs",
    word: "Eight",
    emoji: "8️⃣",
    color: "#14B8A6",
    strokes: [
      {
        points: [
          { x: 0.5, y: 0.15 },
          { x: 0.35, y: 0.3 },
          { x: 0.65, y: 0.65 },
          { x: 0.5, y: 0.85 },
          { x: 0.35, y: 0.65 },
          { x: 0.65, y: 0.3 },
          { x: 0.5, y: 0.15 },
        ],
      },
    ],
  },
  {
    id: "num-9",
    char: "9",
    type: "number",
    title: "Số 9",
    phonics: "Number Nine! 9 Nine clouds",
    word: "Nine",
    emoji: "9️⃣",
    color: "#06B6D4",
    strokes: [
      {
        points: [
          { x: 0.65, y: 0.45 },
          { x: 0.4, y: 0.45 },
          { x: 0.3, y: 0.3 },
          { x: 0.45, y: 0.15 },
          { x: 0.65, y: 0.25 },
          { x: 0.7, y: 0.5 },
          { x: 0.55, y: 0.85 },
          { x: 0.35, y: 0.8 },
        ],
      },
    ],
  },
  {
    id: "num-10",
    char: "10",
    type: "number",
    title: "Số 10",
    phonics: "Number Ten! 10 Ten fingers",
    word: "Ten",
    emoji: "🔟",
    color: "#EAB308",
    strokes: [
      {
        points: [
          { x: 0.2, y: 0.3 },
          { x: 0.35, y: 0.15 },
          { x: 0.35, y: 0.85 },
        ],
      },
      {
        points: [
          { x: 0.7, y: 0.15 },
          { x: 0.55, y: 0.35 },
          { x: 0.55, y: 0.65 },
          { x: 0.7, y: 0.85 },
          { x: 0.85, y: 0.65 },
          { x: 0.85, y: 0.35 },
          { x: 0.7, y: 0.15 },
        ],
      },
    ],
  },
];
