import { Song } from "./songs";

// ====================================================================
// DỮ LIỆU ĐÃ ĐƯỢC WHISPER AI PHÂN TÍCH VÀ ĐỒNG BỘ TỰ ĐỘNG
// Timestamp lấy từ Whisper speech recognition, lời viết tay chuẩn
// ====================================================================

export const songsEnNew: Song[] = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    emoji: "⭐",
    color: "#FBBF24",
    youtubeId: "yCjJyiqpAuU",
    localVideo: "/videos/twinkle.mp4",
    lyrics: [
      { 
        time: 10.48,
        text: "Twinkle, twinkle, little star",
        words: [
          { text: "Twinkle,", duration: 0.5 }, { text: "twinkle,", duration: 0.5 }, { text: "little", duration: 0.25 }, { text: "star", duration: 0.75 }
        ]
      },
      { 
        time: 17,
        text: "How I wonder what you are",
        words: [
          { text: "How", duration: 0.38 }, { text: "I", duration: 0.38 }, { text: "wonder", duration: 0.38 }, { text: "what", duration: 0.38 }, { text: "you", duration: 0.38 }, { text: "are", duration: 1.13 }
        ]
      },
      { 
        time: 23,
        text: "Up above the world so high",
        words: [
          { text: "Up", duration: 0.38 }, { text: "above", duration: 0.38 }, { text: "the", duration: 0.38 }, { text: "world", duration: 0.38 }, { text: "so", duration: 0.38 }, { text: "high", duration: 1.13 }
        ]
      },
      { 
        time: 29,
        text: "Like a diamond in the sky",
        words: [
          { text: "Like", duration: 0.38 }, { text: "a", duration: 0.38 }, { text: "diamond", duration: 0.38 }, { text: "in", duration: 0.38 }, { text: "the", duration: 0.38 }, { text: "sky", duration: 1.13 }
        ]
      },
      { 
        time: 35,
        text: "Twinkle, twinkle, little star",
        words: [
          { text: "Twinkle,", duration: 0.5 }, { text: "twinkle,", duration: 0.5 }, { text: "little", duration: 0.25 }, { text: "star", duration: 0.75 }
        ]
      },
      { 
        time: 41,
        text: "How I wonder what you are",
        words: [
          { text: "How", duration: 0.38 }, { text: "I", duration: 0.38 }, { text: "wonder", duration: 0.38 }, { text: "what", duration: 0.38 }, { text: "you", duration: 0.38 }, { text: "are", duration: 1.13 }
        ]
      },
      { 
        time: 52,
        text: "Twinkle, twinkle, little star",
        words: [
          { text: "Twinkle,", duration: 0.5 }, { text: "twinkle,", duration: 0.5 }, { text: "little", duration: 0.25 }, { text: "star", duration: 0.75 }
        ]
      },
      { 
        time: 58,
        text: "How I wonder what you are",
        words: [
          { text: "How", duration: 0.38 }, { text: "I", duration: 0.38 }, { text: "wonder", duration: 0.38 }, { text: "what", duration: 0.38 }, { text: "you", duration: 0.38 }, { text: "are", duration: 1.13 }
        ]
      },
      { 
        time: 64,
        text: "Up above the world so high",
        words: [
          { text: "Up", duration: 0.38 }, { text: "above", duration: 0.38 }, { text: "the", duration: 0.38 }, { text: "world", duration: 0.38 }, { text: "so", duration: 0.38 }, { text: "high", duration: 1.13 }
        ]
      },
      { 
        time: 70,
        text: "Like a diamond in the sky",
        words: [
          { text: "Like", duration: 0.38 }, { text: "a", duration: 0.38 }, { text: "diamond", duration: 0.38 }, { text: "in", duration: 0.38 }, { text: "the", duration: 0.38 }, { text: "sky", duration: 1.13 }
        ]
      },
      { 
        time: 76,
        text: "Twinkle, twinkle, little star",
        words: [
          { text: "Twinkle,", duration: 0.5 }, { text: "twinkle,", duration: 0.5 }, { text: "little", duration: 0.25 }, { text: "star", duration: 0.75 }
        ]
      },
      { 
        time: 82,
        text: "How I wonder what you are",
        words: [
          { text: "How", duration: 0.6 }, { text: "I", duration: 0.6 }, { text: "wonder", duration: 0.6 }, { text: "what", duration: 0.6 }, { text: "you", duration: 0.6 }, { text: "are", duration: 1.8 }
        ]
      }
    ]
  },
  {
    id: "old-macdonald",
    title: "Old MacDonald Had a Farm",
    emoji: "🐄",
    color: "#34D399",
    youtubeId: "_6HzoUcx3eo",
    localVideo: "/videos/old-macdonald.mp4",
    lyrics: [
      { 
        time: 14.22,
        text: "Old MacDonald had a farm, E-I-E-I-O!",
        words: [
          { text: "Old", duration: 0.41 }, { text: "MacDonald", duration: 0.41 }, { text: "had", duration: 0.41 }, { text: "a", duration: 0.41 }, { text: "farm,", duration: 0.81 }, { text: "E-I-E-I-O!", duration: 1.22 }
        ]
      },
      { 
        time: 18.08,
        text: "And on his farm he had a cow, E-I-E-I-O!",
        words: [
          { text: "And", duration: 0.3 }, { text: "on", duration: 0.3 }, { text: "his", duration: 0.3 }, { text: "farm", duration: 0.3 }, { text: "he", duration: 0.3 }, { text: "had", duration: 0.3 }, { text: "a", duration: 0.3 }, { text: "cow,", duration: 0.59 }, { text: "E-I-E-I-O!", duration: 0.89 }
        ]
      },
      { 
        time: 21.82,
        text: "With a moo-moo here and a moo-moo there",
        words: [
          { text: "With", duration: 0.4 }, { text: "a", duration: 0.4 }, { text: "moo-moo", duration: 0.4 }, { text: "here", duration: 0.4 }, { text: "and", duration: 0.4 }, { text: "a", duration: 0.4 }, { text: "moo-moo", duration: 0.4 }, { text: "there", duration: 1.19 }
        ]
      },
      { 
        time: 26,
        text: "Here a moo, there a moo, everywhere a moo-moo",
        words: [
          { text: "Here", duration: 0.29 }, { text: "a", duration: 0.29 }, { text: "moo,", duration: 0.58 }, { text: "there", duration: 0.29 }, { text: "a", duration: 0.29 }, { text: "moo,", duration: 0.58 }, { text: "everywhere", duration: 0.29 }, { text: "a", duration: 0.29 }, { text: "moo-moo", duration: 0.88 }
        ]
      },
      { 
        time: 30,
        text: "Old MacDonald had a farm, E-I-E-I-O!",
        words: [
          { text: "Old", duration: 0.33 }, { text: "MacDonald", duration: 0.33 }, { text: "had", duration: 0.33 }, { text: "a", duration: 0.33 }, { text: "farm,", duration: 0.67 }, { text: "E-I-E-I-O!", duration: 1 }
        ]
      },
      { 
        time: 38,
        text: "Old MacDonald had a farm, E-I-E-I-O!",
        words: [
          { text: "Old", duration: 0.33 }, { text: "MacDonald", duration: 0.33 }, { text: "had", duration: 0.33 }, { text: "a", duration: 0.33 }, { text: "farm,", duration: 0.67 }, { text: "E-I-E-I-O!", duration: 1 }
        ]
      },
      { 
        time: 44,
        text: "And on his farm he had a pig, E-I-E-I-O!",
        words: [
          { text: "And", duration: 0.48 }, { text: "on", duration: 0.48 }, { text: "his", duration: 0.48 }, { text: "farm", duration: 0.48 }, { text: "he", duration: 0.48 }, { text: "had", duration: 0.48 }, { text: "a", duration: 0.48 }, { text: "pig,", duration: 0.97 }, { text: "E-I-E-I-O!", duration: 1.45 }
        ]
      },
      { 
        time: 50,
        text: "With an oink-oink here and an oink-oink there",
        words: [
          { text: "With", duration: 0.38 }, { text: "an", duration: 0.38 }, { text: "oink-oink", duration: 0.38 }, { text: "here", duration: 0.38 }, { text: "and", duration: 0.38 }, { text: "an", duration: 0.38 }, { text: "oink-oink", duration: 0.38 }, { text: "there", duration: 1.14 }
        ]
      },
      { 
        time: 54,
        text: "Here an oink, there an oink, everywhere an oink-oink",
        words: [
          { text: "Here", duration: 0.29 }, { text: "an", duration: 0.29 }, { text: "oink,", duration: 0.58 }, { text: "there", duration: 0.29 }, { text: "an", duration: 0.29 }, { text: "oink,", duration: 0.58 }, { text: "everywhere", duration: 0.29 }, { text: "an", duration: 0.29 }, { text: "oink-oink", duration: 0.88 }
        ]
      },
      { 
        time: 58,
        text: "Old MacDonald had a farm, E-I-E-I-O!",
        words: [
          { text: "Old", duration: 0.33 }, { text: "MacDonald", duration: 0.33 }, { text: "had", duration: 0.33 }, { text: "a", duration: 0.33 }, { text: "farm,", duration: 0.67 }, { text: "E-I-E-I-O!", duration: 1 }
        ]
      },
      { 
        time: 66,
        text: "Old MacDonald had a farm, E-I-E-I-O!",
        words: [
          { text: "Old", duration: 0.33 }, { text: "MacDonald", duration: 0.33 }, { text: "had", duration: 0.33 }, { text: "a", duration: 0.33 }, { text: "farm,", duration: 0.67 }, { text: "E-I-E-I-O!", duration: 1 }
        ]
      },
      { 
        time: 72,
        text: "And on his farm he had a duck, E-I-E-I-O!",
        words: [
          { text: "And", duration: 0.48 }, { text: "on", duration: 0.48 }, { text: "his", duration: 0.48 }, { text: "farm", duration: 0.48 }, { text: "he", duration: 0.48 }, { text: "had", duration: 0.48 }, { text: "a", duration: 0.48 }, { text: "duck,", duration: 0.97 }, { text: "E-I-E-I-O!", duration: 1.45 }
        ]
      },
      { 
        time: 78,
        text: "With a quack-quack here and a quack-quack there",
        words: [
          { text: "With", duration: 0.38 }, { text: "a", duration: 0.38 }, { text: "quack-quack", duration: 0.38 }, { text: "here", duration: 0.38 }, { text: "and", duration: 0.38 }, { text: "a", duration: 0.38 }, { text: "quack-quack", duration: 0.38 }, { text: "there", duration: 1.14 }
        ]
      },
      { 
        time: 82,
        text: "Here a quack, there a quack, everywhere a quack-quack",
        words: [
          { text: "Here", duration: 0.29 }, { text: "a", duration: 0.29 }, { text: "quack,", duration: 0.58 }, { text: "there", duration: 0.29 }, { text: "a", duration: 0.29 }, { text: "quack,", duration: 0.58 }, { text: "everywhere", duration: 0.29 }, { text: "a", duration: 0.29 }, { text: "quack-quack", duration: 0.88 }
        ]
      },
      { 
        time: 86,
        text: "Old MacDonald had a farm, E-I-E-I-O!",
        words: [
          { text: "Old", duration: 0.53 }, { text: "MacDonald", duration: 0.53 }, { text: "had", duration: 0.53 }, { text: "a", duration: 0.53 }, { text: "farm,", duration: 1.07 }, { text: "E-I-E-I-O!", duration: 1.6 }
        ]
      }
    ]
  },
  {
    id: "baby-shark",
    title: "Baby Shark",
    emoji: "🦈",
    color: "#38BDF8",
    youtubeId: "XqZsoesa55w",
    localVideo: "/videos/baby-shark.mp4",
    lyrics: [
      { 
        time: 13,
        text: "Baby shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Baby", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 16,
        text: "Baby shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Baby", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 19,
        text: "Baby shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Baby", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 22,
        text: "Baby shark!",
        words: [
          { text: "Baby", duration: 0.38 }, { text: "shark!", duration: 1.13 }
        ]
      },
      { 
        time: 25,
        text: "Mommy shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Mommy", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 28,
        text: "Mommy shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Mommy", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 31,
        text: "Mommy shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Mommy", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 34,
        text: "Mommy shark!",
        words: [
          { text: "Mommy", duration: 0.38 }, { text: "shark!", duration: 1.13 }
        ]
      },
      { 
        time: 37,
        text: "Daddy shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Daddy", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 40,
        text: "Daddy shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Daddy", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 43,
        text: "Daddy shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Daddy", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 46,
        text: "Daddy shark!",
        words: [
          { text: "Daddy", duration: 0.38 }, { text: "shark!", duration: 1.13 }
        ]
      },
      { 
        time: 49,
        text: "Grandma shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Grandma", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 52,
        text: "Grandma shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Grandma", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 55,
        text: "Grandma shark, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Grandma", duration: 0.28 }, { text: "shark,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo,", duration: 0.56 }, { text: "doo-doo", duration: 0.84 }
        ]
      },
      { 
        time: 58,
        text: "Grandma shark!",
        words: [
          { text: "Grandma", duration: 0.38 }, { text: "shark!", duration: 1.13 }
        ]
      },
      { 
        time: 61,
        text: "Let's go hunt, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Let's", duration: 0.25 }, { text: "go", duration: 0.25 }, { text: "hunt,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo", duration: 0.76 }
        ]
      },
      { 
        time: 64,
        text: "Let's go hunt, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Let's", duration: 0.25 }, { text: "go", duration: 0.25 }, { text: "hunt,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo", duration: 0.76 }
        ]
      },
      { 
        time: 67,
        text: "Let's go hunt, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Let's", duration: 0.25 }, { text: "go", duration: 0.25 }, { text: "hunt,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo", duration: 0.76 }
        ]
      },
      { 
        time: 70,
        text: "Let's go hunt!",
        words: [
          { text: "Let's", duration: 0.3 }, { text: "go", duration: 0.3 }, { text: "hunt!", duration: 0.9 }
        ]
      },
      { 
        time: 73,
        text: "Run away! Doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Run", duration: 0.31 }, { text: "away!", duration: 0.31 }, { text: "Doo-doo,", duration: 0.62 }, { text: "doo-doo,", duration: 0.62 }, { text: "doo-doo", duration: 0.93 }
        ]
      },
      { 
        time: 76,
        text: "Run away! Doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Run", duration: 0.31 }, { text: "away!", duration: 0.31 }, { text: "Doo-doo,", duration: 0.62 }, { text: "doo-doo,", duration: 0.62 }, { text: "doo-doo", duration: 0.93 }
        ]
      },
      { 
        time: 79,
        text: "Run away! Doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Run", duration: 0.31 }, { text: "away!", duration: 0.31 }, { text: "Doo-doo,", duration: 0.62 }, { text: "doo-doo,", duration: 0.62 }, { text: "doo-doo", duration: 0.93 }
        ]
      },
      { 
        time: 82,
        text: "Run away!",
        words: [
          { text: "Run", duration: 0.38 }, { text: "away!", duration: 1.13 }
        ]
      },
      { 
        time: 85,
        text: "Safe at last, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Safe", duration: 0.25 }, { text: "at", duration: 0.25 }, { text: "last,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo", duration: 0.76 }
        ]
      },
      { 
        time: 88,
        text: "Safe at last, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Safe", duration: 0.25 }, { text: "at", duration: 0.25 }, { text: "last,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo", duration: 0.76 }
        ]
      },
      { 
        time: 91,
        text: "Safe at last, doo-doo, doo-doo, doo-doo",
        words: [
          { text: "Safe", duration: 0.25 }, { text: "at", duration: 0.25 }, { text: "last,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo,", duration: 0.51 }, { text: "doo-doo", duration: 0.76 }
        ]
      },
      { 
        time: 94,
        text: "Safe at last!",
        words: [
          { text: "Safe", duration: 0.48 }, { text: "at", duration: 0.48 }, { text: "last!", duration: 1.44 }
        ]
      }
    ]
  },
  {
    id: "wheels-on-bus",
    title: "Wheels On The Bus",
    emoji: "🚌",
    color: "#FB923C",
    youtubeId: "e_04ZrNroTo",
    localVideo: "/videos/wheels-on-bus.mp4",
    lyrics: [
      { 
        time: 12,
        text: "The wheels on the bus go round and round",
        words: [
          { text: "The", duration: 0.44 }, { text: "wheels", duration: 0.44 }, { text: "on", duration: 0.44 }, { text: "the", duration: 0.44 }, { text: "bus", duration: 0.44 }, { text: "go", duration: 0.44 }, { text: "round", duration: 0.44 }, { text: "and", duration: 0.44 }, { text: "round", duration: 1.31 }
        ]
      },
      { 
        time: 17,
        text: "Round and round, round and round",
        words: [
          { text: "Round", duration: 0.33 }, { text: "and", duration: 0.33 }, { text: "round,", duration: 0.67 }, { text: "round", duration: 0.33 }, { text: "and", duration: 0.33 }, { text: "round", duration: 1 }
        ]
      },
      { 
        time: 22,
        text: "The wheels on the bus go round and round",
        words: [
          { text: "The", duration: 0.44 }, { text: "wheels", duration: 0.44 }, { text: "on", duration: 0.44 }, { text: "the", duration: 0.44 }, { text: "bus", duration: 0.44 }, { text: "go", duration: 0.44 }, { text: "round", duration: 0.44 }, { text: "and", duration: 0.44 }, { text: "round", duration: 1.31 }
        ]
      },
      { 
        time: 27,
        text: "All through the town!",
        words: [
          { text: "All", duration: 0.33 }, { text: "through", duration: 0.33 }, { text: "the", duration: 0.33 }, { text: "town!", duration: 1 }
        ]
      },
      { 
        time: 36,
        text: "The doors on the bus go open and shut",
        words: [
          { text: "The", duration: 0.44 }, { text: "doors", duration: 0.44 }, { text: "on", duration: 0.44 }, { text: "the", duration: 0.44 }, { text: "bus", duration: 0.44 }, { text: "go", duration: 0.44 }, { text: "open", duration: 0.44 }, { text: "and", duration: 0.44 }, { text: "shut", duration: 1.31 }
        ]
      },
      { 
        time: 41,
        text: "Open and shut, open and shut",
        words: [
          { text: "Open", duration: 0.33 }, { text: "and", duration: 0.33 }, { text: "shut,", duration: 0.67 }, { text: "open", duration: 0.33 }, { text: "and", duration: 0.33 }, { text: "shut", duration: 1 }
        ]
      },
      { 
        time: 46,
        text: "The doors on the bus go open and shut",
        words: [
          { text: "The", duration: 0.44 }, { text: "doors", duration: 0.44 }, { text: "on", duration: 0.44 }, { text: "the", duration: 0.44 }, { text: "bus", duration: 0.44 }, { text: "go", duration: 0.44 }, { text: "open", duration: 0.44 }, { text: "and", duration: 0.44 }, { text: "shut", duration: 1.31 }
        ]
      },
      { 
        time: 51,
        text: "All through the town!",
        words: [
          { text: "All", duration: 0.33 }, { text: "through", duration: 0.33 }, { text: "the", duration: 0.33 }, { text: "town!", duration: 1 }
        ]
      },
      { 
        time: 60.7,
        text: "The wipers on the bus go swish, swish, swish",
        words: [
          { text: "The", duration: 0.32 }, { text: "wipers", duration: 0.32 }, { text: "on", duration: 0.32 }, { text: "the", duration: 0.32 }, { text: "bus", duration: 0.32 }, { text: "go", duration: 0.32 }, { text: "swish,", duration: 0.63 }, { text: "swish,", duration: 0.63 }, { text: "swish", duration: 0.95 }
        ]
      },
      { 
        time: 65,
        text: "Swish, swish, swish, swish, swish, swish",
        words: [
          { text: "Swish,", duration: 0.46 }, { text: "swish,", duration: 0.46 }, { text: "swish,", duration: 0.46 }, { text: "swish,", duration: 0.46 }, { text: "swish,", duration: 0.46 }, { text: "swish", duration: 0.69 }
        ]
      },
      { 
        time: 70,
        text: "The wipers on the bus go swish, swish, swish",
        words: [
          { text: "The", duration: 0.37 }, { text: "wipers", duration: 0.37 }, { text: "on", duration: 0.37 }, { text: "the", duration: 0.37 }, { text: "bus", duration: 0.37 }, { text: "go", duration: 0.37 }, { text: "swish,", duration: 0.74 }, { text: "swish,", duration: 0.74 }, { text: "swish", duration: 1.11 }
        ]
      },
      { 
        time: 75,
        text: "All through the town!",
        words: [
          { text: "All", duration: 0.33 }, { text: "through", duration: 0.33 }, { text: "the", duration: 0.33 }, { text: "town!", duration: 1 }
        ]
      },
      { 
        time: 84,
        text: "The horn on the bus goes beep, beep, beep",
        words: [
          { text: "The", duration: 0.37 }, { text: "horn", duration: 0.37 }, { text: "on", duration: 0.37 }, { text: "the", duration: 0.37 }, { text: "bus", duration: 0.37 }, { text: "goes", duration: 0.37 }, { text: "beep,", duration: 0.74 }, { text: "beep,", duration: 0.74 }, { text: "beep", duration: 1.11 }
        ]
      },
      { 
        time: 89,
        text: "Beep, beep, beep, beep, beep, beep",
        words: [
          { text: "Beep,", duration: 0.46 }, { text: "beep,", duration: 0.46 }, { text: "beep,", duration: 0.46 }, { text: "beep,", duration: 0.46 }, { text: "beep,", duration: 0.46 }, { text: "beep", duration: 0.69 }
        ]
      },
      { 
        time: 94,
        text: "The horn on the bus goes beep, beep, beep",
        words: [
          { text: "The", duration: 0.37 }, { text: "horn", duration: 0.37 }, { text: "on", duration: 0.37 }, { text: "the", duration: 0.37 }, { text: "bus", duration: 0.37 }, { text: "goes", duration: 0.37 }, { text: "beep,", duration: 0.74 }, { text: "beep,", duration: 0.74 }, { text: "beep", duration: 1.11 }
        ]
      },
      { 
        time: 99,
        text: "All through the town!",
        words: [
          { text: "All", duration: 0.53 }, { text: "through", duration: 0.53 }, { text: "the", duration: 0.53 }, { text: "town!", duration: 1.6 }
        ]
      }
    ]
  },
  {
    id: "head-shoulders",
    title: "Head, Shoulders, Knees & Toes",
    emoji: "🧒",
    color: "#C084FC",
    youtubeId: "WX8HmogNyCY",
    localVideo: "/videos/head-shoulders.mp4",
    lyrics: [
      { 
        time: 7,
        text: "Head, shoulders, knees and toes",
        words: [
          { text: "Head,", duration: 0.62 }, { text: "shoulders,", duration: 0.62 }, { text: "knees", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "toes", duration: 0.93 }
        ]
      },
      { 
        time: 10,
        text: "Knees and toes",
        words: [
          { text: "Knees", duration: 0.36 }, { text: "and", duration: 0.36 }, { text: "toes", duration: 1.08 }
        ]
      },
      { 
        time: 12,
        text: "Head, shoulders, knees and toes",
        words: [
          { text: "Head,", duration: 0.62 }, { text: "shoulders,", duration: 0.62 }, { text: "knees", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "toes", duration: 0.93 }
        ]
      },
      { 
        time: 15,
        text: "Knees and toes",
        words: [
          { text: "Knees", duration: 0.36 }, { text: "and", duration: 0.36 }, { text: "toes", duration: 1.08 }
        ]
      },
      { 
        time: 17,
        text: "And eyes, and ears, and mouth, and nose",
        words: [
          { text: "And", duration: 0.29 }, { text: "eyes,", duration: 0.58 }, { text: "and", duration: 0.29 }, { text: "ears,", duration: 0.58 }, { text: "and", duration: 0.29 }, { text: "mouth,", duration: 0.58 }, { text: "and", duration: 0.29 }, { text: "nose", duration: 0.88 }
        ]
      },
      { 
        time: 21,
        text: "Head, shoulders, knees and toes",
        words: [
          { text: "Head,", duration: 0.62 }, { text: "shoulders,", duration: 0.62 }, { text: "knees", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "toes", duration: 0.93 }
        ]
      },
      { 
        time: 24,
        text: "Knees and toes!",
        words: [
          { text: "Knees", duration: 0.3 }, { text: "and", duration: 0.3 }, { text: "toes!", duration: 0.9 }
        ]
      },
      { 
        time: 30,
        text: "Head, shoulders, knees and toes",
        words: [
          { text: "Head,", duration: 0.62 }, { text: "shoulders,", duration: 0.62 }, { text: "knees", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "toes", duration: 0.93 }
        ]
      },
      { 
        time: 33,
        text: "Knees and toes",
        words: [
          { text: "Knees", duration: 0.36 }, { text: "and", duration: 0.36 }, { text: "toes", duration: 1.08 }
        ]
      },
      { 
        time: 35,
        text: "Head, shoulders, knees and toes",
        words: [
          { text: "Head,", duration: 0.62 }, { text: "shoulders,", duration: 0.62 }, { text: "knees", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "toes", duration: 0.93 }
        ]
      },
      { 
        time: 38,
        text: "Knees and toes",
        words: [
          { text: "Knees", duration: 0.36 }, { text: "and", duration: 0.36 }, { text: "toes", duration: 1.08 }
        ]
      },
      { 
        time: 40,
        text: "And eyes, and ears, and mouth, and nose",
        words: [
          { text: "And", duration: 0.29 }, { text: "eyes,", duration: 0.58 }, { text: "and", duration: 0.29 }, { text: "ears,", duration: 0.58 }, { text: "and", duration: 0.29 }, { text: "mouth,", duration: 0.58 }, { text: "and", duration: 0.29 }, { text: "nose", duration: 0.88 }
        ]
      },
      { 
        time: 44,
        text: "Head, shoulders, knees and toes",
        words: [
          { text: "Head,", duration: 0.62 }, { text: "shoulders,", duration: 0.62 }, { text: "knees", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "toes", duration: 0.93 }
        ]
      },
      { 
        time: 47,
        text: "Knees and toes!",
        words: [
          { text: "Knees", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "toes!", duration: 1.44 }
        ]
      }
    ]
  },
  {
    id: "itsy-bitsy-spider",
    title: "Itsy Bitsy Spider",
    emoji: "🕷️",
    color: "#60A5FA",
    youtubeId: "TbKI-jjpPx8",
    localVideo: "/videos/itsy-bitsy-spider.mp4",
    lyrics: [
      { 
        time: 12.66,
        text: "The itsy bitsy spider climbed up the waterspout",
        words: [
          { text: "The", duration: 0.4 }, { text: "itsy", duration: 0.4 }, { text: "bitsy", duration: 0.4 }, { text: "spider", duration: 0.4 }, { text: "climbed", duration: 0.4 }, { text: "up", duration: 0.4 }, { text: "the", duration: 0.4 }, { text: "waterspout", duration: 1.2 }
        ]
      },
      { 
        time: 18.74,
        text: "Down came the rain and washed the spider out",
        words: [
          { text: "Down", duration: 0.1 }, { text: "came", duration: 0.1 }, { text: "the", duration: 0.1 }, { text: "rain", duration: 0.1 }, { text: "and", duration: 0.1 }, { text: "washed", duration: 0.1 }, { text: "the", duration: 0.1 }, { text: "spider", duration: 0.1 }, { text: "out", duration: 0.29 }
        ]
      },
      { 
        time: 20,
        text: "Out came the sun and dried up all the rain",
        words: [
          { text: "Out", duration: 0.48 }, { text: "came", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "sun", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "dried", duration: 0.48 }, { text: "up", duration: 0.48 }, { text: "all", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "rain", duration: 1.45 }
        ]
      },
      { 
        time: 26,
        text: "And the itsy bitsy spider climbed up the spout again",
        words: [
          { text: "And", duration: 0.42 }, { text: "the", duration: 0.42 }, { text: "itsy", duration: 0.42 }, { text: "bitsy", duration: 0.42 }, { text: "spider", duration: 0.42 }, { text: "climbed", duration: 0.42 }, { text: "up", duration: 0.42 }, { text: "the", duration: 0.42 }, { text: "spout", duration: 0.42 }, { text: "again", duration: 1.25 }
        ]
      },
      { 
        time: 38.5,
        text: "The itsy bitsy spider climbed up the waterspout",
        words: [
          { text: "The", duration: 0.4 }, { text: "itsy", duration: 0.4 }, { text: "bitsy", duration: 0.4 }, { text: "spider", duration: 0.4 }, { text: "climbed", duration: 0.4 }, { text: "up", duration: 0.4 }, { text: "the", duration: 0.4 }, { text: "waterspout", duration: 1.2 }
        ]
      },
      { 
        time: 46.88,
        text: "Down came the rain and washed the spider out",
        words: [
          { text: "Down", duration: 0.41 }, { text: "came", duration: 0.41 }, { text: "the", duration: 0.41 }, { text: "rain", duration: 0.41 }, { text: "and", duration: 0.41 }, { text: "washed", duration: 0.41 }, { text: "the", duration: 0.41 }, { text: "spider", duration: 0.41 }, { text: "out", duration: 1.23 }
        ]
      },
      { 
        time: 54.46,
        text: "Out came the sun and dried up all the rain",
        words: [
          { text: "Out", duration: 0.48 }, { text: "came", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "sun", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "dried", duration: 0.48 }, { text: "up", duration: 0.48 }, { text: "all", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "rain", duration: 1.44 }
        ]
      },
      { 
        time: 60.44,
        text: "And the itsy bitsy spider climbed up the spout again",
        words: [
          { text: "And", duration: 0.67 }, { text: "the", duration: 0.67 }, { text: "itsy", duration: 0.67 }, { text: "bitsy", duration: 0.67 }, { text: "spider", duration: 0.67 }, { text: "climbed", duration: 0.67 }, { text: "up", duration: 0.67 }, { text: "the", duration: 0.67 }, { text: "spout", duration: 0.67 }, { text: "again", duration: 2 }
        ]
      }
    ]
  },
  {
    id: "five-little-monkeys",
    title: "Five Little Monkeys",
    emoji: "🐒",
    color: "#F472B6",
    youtubeId: "b0NHrFNZWh0",
    localVideo: "/videos/five-little-monkeys.mp4",
    lyrics: [
      { 
        time: 6,
        text: "Five little monkeys jumping on the bed",
        words: [
          { text: "Five", duration: 0.53 }, { text: "little", duration: 0.53 }, { text: "monkeys", duration: 0.53 }, { text: "jumping", duration: 0.53 }, { text: "on", duration: 0.53 }, { text: "the", duration: 0.53 }, { text: "bed", duration: 1.6 }
        ]
      },
      { 
        time: 11,
        text: "One fell off and bumped his head",
        words: [
          { text: "One", duration: 0.42 }, { text: "fell", duration: 0.42 }, { text: "off", duration: 0.42 }, { text: "and", duration: 0.42 }, { text: "bumped", duration: 0.42 }, { text: "his", duration: 0.42 }, { text: "head", duration: 1.27 }
        ]
      },
      { 
        time: 15,
        text: "Mama called the doctor and the doctor said",
        words: [
          { text: "Mama", duration: 0.48 }, { text: "called", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "said", duration: 1.44 }
        ]
      },
      { 
        time: 20,
        text: "No more monkeys jumping on the bed!",
        words: [
          { text: "No", duration: 0.39 }, { text: "more", duration: 0.39 }, { text: "monkeys", duration: 0.39 }, { text: "jumping", duration: 0.39 }, { text: "on", duration: 0.39 }, { text: "the", duration: 0.39 }, { text: "bed!", duration: 1.17 }
        ]
      },
      { 
        time: 27,
        text: "Four little monkeys jumping on the bed",
        words: [
          { text: "Four", duration: 0.53 }, { text: "little", duration: 0.53 }, { text: "monkeys", duration: 0.53 }, { text: "jumping", duration: 0.53 }, { text: "on", duration: 0.53 }, { text: "the", duration: 0.53 }, { text: "bed", duration: 1.6 }
        ]
      },
      { 
        time: 32,
        text: "One fell off and bumped his head",
        words: [
          { text: "One", duration: 0.42 }, { text: "fell", duration: 0.42 }, { text: "off", duration: 0.42 }, { text: "and", duration: 0.42 }, { text: "bumped", duration: 0.42 }, { text: "his", duration: 0.42 }, { text: "head", duration: 1.27 }
        ]
      },
      { 
        time: 36,
        text: "Mama called the doctor and the doctor said",
        words: [
          { text: "Mama", duration: 0.48 }, { text: "called", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "said", duration: 1.44 }
        ]
      },
      { 
        time: 41,
        text: "No more monkeys jumping on the bed!",
        words: [
          { text: "No", duration: 0.39 }, { text: "more", duration: 0.39 }, { text: "monkeys", duration: 0.39 }, { text: "jumping", duration: 0.39 }, { text: "on", duration: 0.39 }, { text: "the", duration: 0.39 }, { text: "bed!", duration: 1.17 }
        ]
      },
      { 
        time: 48,
        text: "Three little monkeys jumping on the bed",
        words: [
          { text: "Three", duration: 0.53 }, { text: "little", duration: 0.53 }, { text: "monkeys", duration: 0.53 }, { text: "jumping", duration: 0.53 }, { text: "on", duration: 0.53 }, { text: "the", duration: 0.53 }, { text: "bed", duration: 1.6 }
        ]
      },
      { 
        time: 53,
        text: "One fell off and bumped his head",
        words: [
          { text: "One", duration: 0.42 }, { text: "fell", duration: 0.42 }, { text: "off", duration: 0.42 }, { text: "and", duration: 0.42 }, { text: "bumped", duration: 0.42 }, { text: "his", duration: 0.42 }, { text: "head", duration: 1.27 }
        ]
      },
      { 
        time: 57,
        text: "Mama called the doctor and the doctor said",
        words: [
          { text: "Mama", duration: 0.48 }, { text: "called", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "said", duration: 1.44 }
        ]
      },
      { 
        time: 62,
        text: "No more monkeys jumping on the bed!",
        words: [
          { text: "No", duration: 0.39 }, { text: "more", duration: 0.39 }, { text: "monkeys", duration: 0.39 }, { text: "jumping", duration: 0.39 }, { text: "on", duration: 0.39 }, { text: "the", duration: 0.39 }, { text: "bed!", duration: 1.17 }
        ]
      },
      { 
        time: 69,
        text: "Two little monkeys jumping on the bed",
        words: [
          { text: "Two", duration: 0.53 }, { text: "little", duration: 0.53 }, { text: "monkeys", duration: 0.53 }, { text: "jumping", duration: 0.53 }, { text: "on", duration: 0.53 }, { text: "the", duration: 0.53 }, { text: "bed", duration: 1.6 }
        ]
      },
      { 
        time: 74,
        text: "One fell off and bumped his head",
        words: [
          { text: "One", duration: 0.42 }, { text: "fell", duration: 0.42 }, { text: "off", duration: 0.42 }, { text: "and", duration: 0.42 }, { text: "bumped", duration: 0.42 }, { text: "his", duration: 0.42 }, { text: "head", duration: 1.27 }
        ]
      },
      { 
        time: 78,
        text: "Mama called the doctor and the doctor said",
        words: [
          { text: "Mama", duration: 0.48 }, { text: "called", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "said", duration: 1.44 }
        ]
      },
      { 
        time: 83,
        text: "No more monkeys jumping on the bed!",
        words: [
          { text: "No", duration: 0.39 }, { text: "more", duration: 0.39 }, { text: "monkeys", duration: 0.39 }, { text: "jumping", duration: 0.39 }, { text: "on", duration: 0.39 }, { text: "the", duration: 0.39 }, { text: "bed!", duration: 1.17 }
        ]
      },
      { 
        time: 90,
        text: "One little monkey jumping on the bed",
        words: [
          { text: "One", duration: 0.53 }, { text: "little", duration: 0.53 }, { text: "monkey", duration: 0.53 }, { text: "jumping", duration: 0.53 }, { text: "on", duration: 0.53 }, { text: "the", duration: 0.53 }, { text: "bed", duration: 1.6 }
        ]
      },
      { 
        time: 95,
        text: "He fell off and bumped his head",
        words: [
          { text: "He", duration: 0.42 }, { text: "fell", duration: 0.42 }, { text: "off", duration: 0.42 }, { text: "and", duration: 0.42 }, { text: "bumped", duration: 0.42 }, { text: "his", duration: 0.42 }, { text: "head", duration: 1.27 }
        ]
      },
      { 
        time: 99,
        text: "Mama called the doctor and the doctor said",
        words: [
          { text: "Mama", duration: 0.48 }, { text: "called", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "doctor", duration: 0.48 }, { text: "said", duration: 1.44 }
        ]
      },
      { 
        time: 104,
        text: "No more monkeys jumping on the bed!",
        words: [
          { text: "No", duration: 0.62 }, { text: "more", duration: 0.62 }, { text: "monkeys", duration: 0.62 }, { text: "jumping", duration: 0.62 }, { text: "on", duration: 0.62 }, { text: "the", duration: 0.62 }, { text: "bed!", duration: 1.87 }
        ]
      }
    ]
  },
  {
    id: "baa-baa-black-sheep",
    title: "Baa Baa Black Sheep",
    emoji: "🐑",
    color: "#9CA3AF",
    youtubeId: "CRHvTTOR8Ns",
    localVideo: "/videos/baa-baa-black-sheep.mp4",
    lyrics: [
      { 
        time: 3.58,
        text: "Baa, baa, black sheep, have you any wool?",
        words: [
          { text: "Baa,", duration: 0.62 }, { text: "baa,", duration: 0.62 }, { text: "black", duration: 0.31 }, { text: "sheep,", duration: 0.62 }, { text: "have", duration: 0.31 }, { text: "you", duration: 0.31 }, { text: "any", duration: 0.31 }, { text: "wool?", duration: 0.92 }
        ]
      },
      { 
        time: 14,
        text: "Yes, sir, yes, sir, three bags full",
        words: [
          { text: "Yes,", duration: 0.54 }, { text: "sir,", duration: 0.54 }, { text: "yes,", duration: 0.54 }, { text: "sir,", duration: 0.54 }, { text: "three", duration: 0.27 }, { text: "bags", duration: 0.27 }, { text: "full", duration: 0.81 }
        ]
      },
      { 
        time: 20,
        text: "One for the master, and one for the dame",
        words: [
          { text: "One", duration: 0.48 }, { text: "for", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "master,", duration: 0.97 }, { text: "and", duration: 0.48 }, { text: "one", duration: 0.48 }, { text: "for", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "dame", duration: 1.45 }
        ]
      },
      { 
        time: 26,
        text: "And one for the little boy who lives down the lane",
        words: [
          { text: "And", duration: 0.42 }, { text: "one", duration: 0.42 }, { text: "for", duration: 0.42 }, { text: "the", duration: 0.42 }, { text: "little", duration: 0.42 }, { text: "boy", duration: 0.42 }, { text: "who", duration: 0.42 }, { text: "lives", duration: 0.42 }, { text: "down", duration: 0.42 }, { text: "the", duration: 0.42 }, { text: "lane", duration: 1.25 }
        ]
      },
      { 
        time: 31.62,
        text: "Baa, baa, black sheep, have you any wool?",
        words: [
          { text: "Baa,", duration: 0.65 }, { text: "baa,", duration: 0.65 }, { text: "black", duration: 0.33 }, { text: "sheep,", duration: 0.65 }, { text: "have", duration: 0.33 }, { text: "you", duration: 0.33 }, { text: "any", duration: 0.33 }, { text: "wool?", duration: 0.98 }
        ]
      },
      { 
        time: 36.06,
        text: "Yes, sir, yes, sir, three bags full",
        words: [
          { text: "Yes,", duration: 0.57 }, { text: "sir,", duration: 0.57 }, { text: "yes,", duration: 0.57 }, { text: "sir,", duration: 0.57 }, { text: "three", duration: 0.28 }, { text: "bags", duration: 0.28 }, { text: "full", duration: 0.85 }
        ]
      },
      { 
        time: 39.94,
        text: "One for the master, and one for the dame",
        words: [
          { text: "One", duration: 0.38 }, { text: "for", duration: 0.38 }, { text: "the", duration: 0.38 }, { text: "master,", duration: 0.75 }, { text: "and", duration: 0.38 }, { text: "one", duration: 0.38 }, { text: "for", duration: 0.38 }, { text: "the", duration: 0.38 }, { text: "dame", duration: 1.13 }
        ]
      },
      { 
        time: 50,
        text: "And one for the little boy who lives down the lane",
        words: [
          { text: "And", duration: 0.68 }, { text: "one", duration: 0.68 }, { text: "for", duration: 0.68 }, { text: "the", duration: 0.68 }, { text: "little", duration: 0.68 }, { text: "boy", duration: 0.68 }, { text: "who", duration: 0.68 }, { text: "lives", duration: 0.68 }, { text: "down", duration: 0.68 }, { text: "the", duration: 0.68 }, { text: "lane", duration: 2.03 }
        ]
      }
    ]
  },
  {
    id: "if-youre-happy",
    title: "If You're Happy and You Know It",
    emoji: "😊",
    color: "#34D399",
    youtubeId: "l4WNrvVjiTw",
    localVideo: "/videos/if-youre-happy.mp4",
    lyrics: [
      { 
        time: 8.4,
        text: "If you're happy and you know it, clap your hands",
        words: [
          { text: "If", duration: 0.18 }, { text: "you're", duration: 0.18 }, { text: "happy", duration: 0.18 }, { text: "and", duration: 0.18 }, { text: "you", duration: 0.18 }, { text: "know", duration: 0.18 }, { text: "it,", duration: 0.37 }, { text: "clap", duration: 0.18 }, { text: "your", duration: 0.18 }, { text: "hands", duration: 0.55 }
        ]
      },
      { 
        time: 11,
        text: "If you're happy and you know it, clap your hands",
        words: [
          { text: "If", duration: 0.37 }, { text: "you're", duration: 0.37 }, { text: "happy", duration: 0.37 }, { text: "and", duration: 0.37 }, { text: "you", duration: 0.37 }, { text: "know", duration: 0.37 }, { text: "it,", duration: 0.74 }, { text: "clap", duration: 0.37 }, { text: "your", duration: 0.37 }, { text: "hands", duration: 1.11 }
        ]
      },
      { 
        time: 16,
        text: "If you're happy and you know it",
        words: [
          { text: "If", duration: 0.31 }, { text: "you're", duration: 0.31 }, { text: "happy", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "you", duration: 0.31 }, { text: "know", duration: 0.31 }, { text: "it", duration: 0.93 }
        ]
      },
      { 
        time: 19,
        text: "And you really want to show it",
        words: [
          { text: "And", duration: 0.31 }, { text: "you", duration: 0.31 }, { text: "really", duration: 0.31 }, { text: "want", duration: 0.31 }, { text: "to", duration: 0.31 }, { text: "show", duration: 0.31 }, { text: "it", duration: 0.93 }
        ]
      },
      { 
        time: 22,
        text: "If you're happy and you know it, clap your hands",
        words: [
          { text: "If", duration: 0.38 }, { text: "you're", duration: 0.38 }, { text: "happy", duration: 0.38 }, { text: "and", duration: 0.38 }, { text: "you", duration: 0.38 }, { text: "know", duration: 0.38 }, { text: "it,", duration: 0.77 }, { text: "clap", duration: 0.38 }, { text: "your", duration: 0.38 }, { text: "hands", duration: 1.15 }
        ]
      },
      { 
        time: 30,
        text: "If you're happy and you know it, stomp your feet",
        words: [
          { text: "If", duration: 0.45 }, { text: "you're", duration: 0.45 }, { text: "happy", duration: 0.45 }, { text: "and", duration: 0.45 }, { text: "you", duration: 0.45 }, { text: "know", duration: 0.45 }, { text: "it,", duration: 0.89 }, { text: "stomp", duration: 0.45 }, { text: "your", duration: 0.45 }, { text: "feet", duration: 1.34 }
        ]
      },
      { 
        time: 36,
        text: "If you're happy and you know it, stomp your feet",
        words: [
          { text: "If", duration: 0.37 }, { text: "you're", duration: 0.37 }, { text: "happy", duration: 0.37 }, { text: "and", duration: 0.37 }, { text: "you", duration: 0.37 }, { text: "know", duration: 0.37 }, { text: "it,", duration: 0.74 }, { text: "stomp", duration: 0.37 }, { text: "your", duration: 0.37 }, { text: "feet", duration: 1.11 }
        ]
      },
      { 
        time: 41,
        text: "If you're happy and you know it",
        words: [
          { text: "If", duration: 0.31 }, { text: "you're", duration: 0.31 }, { text: "happy", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "you", duration: 0.31 }, { text: "know", duration: 0.31 }, { text: "it", duration: 0.93 }
        ]
      },
      { 
        time: 44,
        text: "And you really want to show it",
        words: [
          { text: "And", duration: 0.31 }, { text: "you", duration: 0.31 }, { text: "really", duration: 0.31 }, { text: "want", duration: 0.31 }, { text: "to", duration: 0.31 }, { text: "show", duration: 0.31 }, { text: "it", duration: 0.93 }
        ]
      },
      { 
        time: 47,
        text: "If you're happy and you know it, stomp your feet",
        words: [
          { text: "If", duration: 0.38 }, { text: "you're", duration: 0.38 }, { text: "happy", duration: 0.38 }, { text: "and", duration: 0.38 }, { text: "you", duration: 0.38 }, { text: "know", duration: 0.38 }, { text: "it,", duration: 0.77 }, { text: "stomp", duration: 0.38 }, { text: "your", duration: 0.38 }, { text: "feet", duration: 1.15 }
        ]
      },
      { 
        time: 55,
        text: "If you're happy and you know it, shout hooray!",
        words: [
          { text: "If", duration: 0.48 }, { text: "you're", duration: 0.48 }, { text: "happy", duration: 0.48 }, { text: "and", duration: 0.48 }, { text: "you", duration: 0.48 }, { text: "know", duration: 0.48 }, { text: "it,", duration: 0.97 }, { text: "shout", duration: 0.48 }, { text: "hooray!", duration: 1.45 }
        ]
      },
      { 
        time: 61,
        text: "If you're happy and you know it, shout hooray!",
        words: [
          { text: "If", duration: 0.4 }, { text: "you're", duration: 0.4 }, { text: "happy", duration: 0.4 }, { text: "and", duration: 0.4 }, { text: "you", duration: 0.4 }, { text: "know", duration: 0.4 }, { text: "it,", duration: 0.8 }, { text: "shout", duration: 0.4 }, { text: "hooray!", duration: 1.2 }
        ]
      },
      { 
        time: 66,
        text: "If you're happy and you know it",
        words: [
          { text: "If", duration: 0.31 }, { text: "you're", duration: 0.31 }, { text: "happy", duration: 0.31 }, { text: "and", duration: 0.31 }, { text: "you", duration: 0.31 }, { text: "know", duration: 0.31 }, { text: "it", duration: 0.93 }
        ]
      },
      { 
        time: 69,
        text: "And you really want to show it",
        words: [
          { text: "And", duration: 0.31 }, { text: "you", duration: 0.31 }, { text: "really", duration: 0.31 }, { text: "want", duration: 0.31 }, { text: "to", duration: 0.31 }, { text: "show", duration: 0.31 }, { text: "it", duration: 0.93 }
        ]
      },
      { 
        time: 72,
        text: "If you're happy and you know it, shout hooray!",
        words: [
          { text: "If", duration: 0.6 }, { text: "you're", duration: 0.6 }, { text: "happy", duration: 0.6 }, { text: "and", duration: 0.6 }, { text: "you", duration: 0.6 }, { text: "know", duration: 0.6 }, { text: "it,", duration: 1.2 }, { text: "shout", duration: 0.6 }, { text: "hooray!", duration: 1.8 }
        ]
      }
    ]
  },
  {
    id: "row-your-boat",
    title: "Row, Row, Row Your Boat",
    emoji: "🛶",
    color: "#38BDF8",
    youtubeId: "PZJS2_pWMpE",
    localVideo: "/videos/row-your-boat.mp4",
    lyrics: [
      { 
        time: 6,
        text: "Row, row, row your boat",
        words: [
          { text: "Row,", duration: 0.84 }, { text: "row,", duration: 0.84 }, { text: "row", duration: 0.42 }, { text: "your", duration: 0.42 }, { text: "boat", duration: 1.27 }
        ]
      },
      { 
        time: 10,
        text: "Gently down the stream",
        words: [
          { text: "Gently", duration: 0.33 }, { text: "down", duration: 0.33 }, { text: "the", duration: 0.33 }, { text: "stream", duration: 1 }
        ]
      },
      { 
        time: 14,
        text: "Merrily, merrily, merrily, merrily",
        words: [
          { text: "Merrily,", duration: 0.44 }, { text: "merrily,", duration: 0.44 }, { text: "merrily,", duration: 0.44 }, { text: "merrily", duration: 0.67 }
        ]
      },
      { 
        time: 18,
        text: "Life is but a dream",
        words: [
          { text: "Life", duration: 0.36 }, { text: "is", duration: 0.36 }, { text: "but", duration: 0.36 }, { text: "a", duration: 0.36 }, { text: "dream", duration: 1.07 }
        ]
      },
      { 
        time: 24,
        text: "Row, row, row your boat",
        words: [
          { text: "Row,", duration: 0.84 }, { text: "row,", duration: 0.84 }, { text: "row", duration: 0.42 }, { text: "your", duration: 0.42 }, { text: "boat", duration: 1.27 }
        ]
      },
      { 
        time: 28,
        text: "Gently down the stream",
        words: [
          { text: "Gently", duration: 0.33 }, { text: "down", duration: 0.33 }, { text: "the", duration: 0.33 }, { text: "stream", duration: 1 }
        ]
      },
      { 
        time: 32,
        text: "Merrily, merrily, merrily, merrily",
        words: [
          { text: "Merrily,", duration: 0.44 }, { text: "merrily,", duration: 0.44 }, { text: "merrily,", duration: 0.44 }, { text: "merrily", duration: 0.67 }
        ]
      },
      { 
        time: 36,
        text: "Life is but a dream",
        words: [
          { text: "Life", duration: 0.36 }, { text: "is", duration: 0.36 }, { text: "but", duration: 0.36 }, { text: "a", duration: 0.36 }, { text: "dream", duration: 1.07 }
        ]
      },
      { 
        time: 42,
        text: "Row, row, row your boat",
        words: [
          { text: "Row,", duration: 0.84 }, { text: "row,", duration: 0.84 }, { text: "row", duration: 0.42 }, { text: "your", duration: 0.42 }, { text: "boat", duration: 1.27 }
        ]
      },
      { 
        time: 46,
        text: "Gently down the stream",
        words: [
          { text: "Gently", duration: 0.33 }, { text: "down", duration: 0.33 }, { text: "the", duration: 0.33 }, { text: "stream", duration: 1 }
        ]
      },
      { 
        time: 50,
        text: "If you see a crocodile",
        words: [
          { text: "If", duration: 0.54 }, { text: "you", duration: 0.54 }, { text: "see", duration: 0.54 }, { text: "a", duration: 0.54 }, { text: "crocodile", duration: 1.63 }
        ]
      },
      { 
        time: 54,
        text: "Don't forget to scream!",
        words: [
          { text: "Don't", duration: 0.53 }, { text: "forget", duration: 0.53 }, { text: "to", duration: 0.53 }, { text: "scream!", duration: 1.6 }
        ]
      }
    ]
  },
  {
    id: "bingo",
    title: "BINGO",
    emoji: "🐶",
    color: "#FBBF24",
    youtubeId: "9mmF8zOlh_g",
    localVideo: "/videos/bingo.mp4",
    lyrics: [
      { 
        time: 2.24,
        text: "There was a farmer had a dog",
        words: [
          { text: "There", duration: 0.39 }, { text: "was", duration: 0.39 }, { text: "a", duration: 0.39 }, { text: "farmer", duration: 0.39 }, { text: "had", duration: 0.39 }, { text: "a", duration: 0.39 }, { text: "dog", duration: 1.17 }
        ]
      },
      { 
        time: 11,
        text: "And Bingo was his name-o",
        words: [
          { text: "And", duration: 0.54 }, { text: "Bingo", duration: 0.54 }, { text: "was", duration: 0.54 }, { text: "his", duration: 0.54 }, { text: "name-o", duration: 1.63 }
        ]
      },
      { 
        time: 15,
        text: "B-I-N-G-O, B-I-N-G-O, B-I-N-G-O",
        words: [
          { text: "B-I-N-G-O,", duration: 0.43 }, { text: "B-I-N-G-O,", duration: 0.43 }, { text: "B-I-N-G-O", duration: 0.64 }
        ]
      },
      { 
        time: 22,
        text: "And Bingo was his name-o",
        words: [
          { text: "And", duration: 0.36 }, { text: "Bingo", duration: 0.36 }, { text: "was", duration: 0.36 }, { text: "his", duration: 0.36 }, { text: "name-o", duration: 1.07 }
        ]
      },
      { 
        time: 28,
        text: "There was a farmer had a dog",
        words: [
          { text: "There", duration: 0.42 }, { text: "was", duration: 0.42 }, { text: "a", duration: 0.42 }, { text: "farmer", duration: 0.42 }, { text: "had", duration: 0.42 }, { text: "a", duration: 0.42 }, { text: "dog", duration: 1.27 }
        ]
      },
      { 
        time: 32,
        text: "And Bingo was his name-o",
        words: [
          { text: "And", duration: 0.54 }, { text: "Bingo", duration: 0.54 }, { text: "was", duration: 0.54 }, { text: "his", duration: 0.54 }, { text: "name-o", duration: 1.63 }
        ]
      },
      { 
        time: 36,
        text: "(clap)-I-N-G-O, (clap)-I-N-G-O, (clap)-I-N-G-O",
        words: [
          { text: "(clap)-I-N-G-O,", duration: 0.43 }, { text: "(clap)-I-N-G-O,", duration: 0.43 }, { text: "(clap)-I-N-G-O", duration: 0.64 }
        ]
      },
      { 
        time: 43,
        text: "And Bingo was his name-o",
        words: [
          { text: "And", duration: 0.36 }, { text: "Bingo", duration: 0.36 }, { text: "was", duration: 0.36 }, { text: "his", duration: 0.36 }, { text: "name-o", duration: 1.07 }
        ]
      },
      { 
        time: 49,
        text: "There was a farmer had a dog",
        words: [
          { text: "There", duration: 0.42 }, { text: "was", duration: 0.42 }, { text: "a", duration: 0.42 }, { text: "farmer", duration: 0.42 }, { text: "had", duration: 0.42 }, { text: "a", duration: 0.42 }, { text: "dog", duration: 1.27 }
        ]
      },
      { 
        time: 53,
        text: "And Bingo was his name-o",
        words: [
          { text: "And", duration: 0.54 }, { text: "Bingo", duration: 0.54 }, { text: "was", duration: 0.54 }, { text: "his", duration: 0.54 }, { text: "name-o", duration: 1.63 }
        ]
      },
      { 
        time: 57,
        text: "(clap-clap)-N-G-O, (clap-clap)-N-G-O",
        words: [
          { text: "(clap-clap)-N-G-O,", duration: 0.6 }, { text: "(clap-clap)-N-G-O", duration: 0.9 }
        ]
      },
      { 
        time: 67.68,
        text: "And Bingo was his name-o",
        words: [
          { text: "And", duration: 0.57 }, { text: "Bingo", duration: 0.57 }, { text: "was", duration: 0.57 }, { text: "his", duration: 0.57 }, { text: "name-o", duration: 1.71 }
        ]
      }
    ]
  },
  {
    id: "abc-song",
    title: "ABC Song",
    emoji: "🔤",
    color: "#A78BFA",
    youtubeId: "n8PyUO2PL4A",
    localVideo: "/videos/abc-song.mp4",
    lyrics: [
      { 
        time: 7.44,
        text: "A, B, C, D, E, F, G",
        words: [
          { text: "A,", duration: 0.58 }, { text: "B,", duration: 0.58 }, { text: "C,", duration: 0.58 }, { text: "D,", duration: 0.58 }, { text: "E,", duration: 0.58 }, { text: "F,", duration: 0.58 }, { text: "G", duration: 0.87 }
        ]
      },
      { 
        time: 12,
        text: "H, I, J, K, L, M, N, O, P",
        words: [
          { text: "H,", duration: 0.61 }, { text: "I,", duration: 0.61 }, { text: "J,", duration: 0.61 }, { text: "K,", duration: 0.61 }, { text: "L,", duration: 0.61 }, { text: "M,", duration: 0.61 }, { text: "N,", duration: 0.61 }, { text: "O,", duration: 0.61 }, { text: "P", duration: 0.92 }
        ]
      },
      { 
        time: 18,
        text: "Q, R, S, T, U, V",
        words: [
          { text: "Q,", duration: 0.46 }, { text: "R,", duration: 0.46 }, { text: "S,", duration: 0.46 }, { text: "T,", duration: 0.46 }, { text: "U,", duration: 0.46 }, { text: "V", duration: 0.69 }
        ]
      },
      { 
        time: 24,
        text: "W, X, Y and Z",
        words: [
          { text: "W,", duration: 0.56 }, { text: "X,", duration: 0.56 }, { text: "Y", duration: 0.28 }, { text: "and", duration: 0.28 }, { text: "Z", duration: 0.83 }
        ]
      },
      { 
        time: 30,
        text: "Now I know my ABCs",
        words: [
          { text: "Now", duration: 0.36 }, { text: "I", duration: 0.36 }, { text: "know", duration: 0.36 }, { text: "my", duration: 0.36 }, { text: "ABCs", duration: 1.07 }
        ]
      },
      { 
        time: 36,
        text: "Next time won't you sing with me?",
        words: [
          { text: "Next", duration: 0.39 }, { text: "time", duration: 0.39 }, { text: "won't", duration: 0.39 }, { text: "you", duration: 0.39 }, { text: "sing", duration: 0.39 }, { text: "with", duration: 0.39 }, { text: "me?", duration: 1.17 }
        ]
      },
      { 
        time: 46,
        text: "A, B, C, D, E, F, G",
        words: [
          { text: "A,", duration: 0.47 }, { text: "B,", duration: 0.47 }, { text: "C,", duration: 0.47 }, { text: "D,", duration: 0.47 }, { text: "E,", duration: 0.47 }, { text: "F,", duration: 0.47 }, { text: "G", duration: 0.7 }
        ]
      },
      { 
        time: 52,
        text: "H, I, J, K, L, M, N, O, P",
        words: [
          { text: "H,", duration: 0.61 }, { text: "I,", duration: 0.61 }, { text: "J,", duration: 0.61 }, { text: "K,", duration: 0.61 }, { text: "L,", duration: 0.61 }, { text: "M,", duration: 0.61 }, { text: "N,", duration: 0.61 }, { text: "O,", duration: 0.61 }, { text: "P", duration: 0.92 }
        ]
      },
      { 
        time: 58,
        text: "Q, R, S, T, U, V",
        words: [
          { text: "Q,", duration: 0.46 }, { text: "R,", duration: 0.46 }, { text: "S,", duration: 0.46 }, { text: "T,", duration: 0.46 }, { text: "U,", duration: 0.46 }, { text: "V", duration: 0.69 }
        ]
      },
      { 
        time: 64,
        text: "W, X, Y and Z",
        words: [
          { text: "W,", duration: 0.56 }, { text: "X,", duration: 0.56 }, { text: "Y", duration: 0.28 }, { text: "and", duration: 0.28 }, { text: "Z", duration: 0.83 }
        ]
      },
      { 
        time: 70,
        text: "Now I know my ABCs",
        words: [
          { text: "Now", duration: 0.36 }, { text: "I", duration: 0.36 }, { text: "know", duration: 0.36 }, { text: "my", duration: 0.36 }, { text: "ABCs", duration: 1.07 }
        ]
      },
      { 
        time: 78.58,
        text: "Next time won't you sing with me?",
        words: [
          { text: "Next", duration: 0.62 }, { text: "time", duration: 0.62 }, { text: "won't", duration: 0.62 }, { text: "you", duration: 0.62 }, { text: "sing", duration: 0.62 }, { text: "with", duration: 0.62 }, { text: "me?", duration: 1.87 }
        ]
      }
    ]
  },
  {
    id: "hickory-dickory",
    title: "Hickory Dickory Dock",
    emoji: "🕰️",
    color: "#F87171",
    youtubeId: "RXJ9pET9Zzw",
    localVideo: "/videos/hickory-dickory.mp4",
    lyrics: [
      { 
        time: 8,
        text: "Hickory dickory dock",
        words: [
          { text: "Hickory", duration: 0.3 }, { text: "dickory", duration: 0.3 }, { text: "dock", duration: 0.9 }
        ]
      },
      { 
        time: 12,
        text: "The mouse ran up the clock",
        words: [
          { text: "The", duration: 0.48 }, { text: "mouse", duration: 0.48 }, { text: "ran", duration: 0.48 }, { text: "up", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "clock", duration: 1.42 }
        ]
      },
      { 
        time: 16,
        text: "The clock struck one",
        words: [
          { text: "The", duration: 0.47 }, { text: "clock", duration: 0.47 }, { text: "struck", duration: 0.47 }, { text: "one", duration: 1.4 }
        ]
      },
      { 
        time: 19,
        text: "The mouse ran down",
        words: [
          { text: "The", duration: 0.47 }, { text: "mouse", duration: 0.47 }, { text: "ran", duration: 0.47 }, { text: "down", duration: 1.4 }
        ]
      },
      { 
        time: 22,
        text: "Hickory dickory dock",
        words: [
          { text: "Hickory", duration: 0.3 }, { text: "dickory", duration: 0.3 }, { text: "dock", duration: 0.9 }
        ]
      },
      { 
        time: 28,
        text: "Tick tock, tick tock, tick tock, tick tock",
        words: [
          { text: "Tick", duration: 0.31 }, { text: "tock,", duration: 0.62 }, { text: "tick", duration: 0.31 }, { text: "tock,", duration: 0.62 }, { text: "tick", duration: 0.31 }, { text: "tock,", duration: 0.62 }, { text: "tick", duration: 0.31 }, { text: "tock", duration: 0.92 }
        ]
      },
      { 
        time: 36,
        text: "Hickory dickory dock",
        words: [
          { text: "Hickory", duration: 0.3 }, { text: "dickory", duration: 0.3 }, { text: "dock", duration: 0.9 }
        ]
      },
      { 
        time: 40,
        text: "The mouse ran up the clock",
        words: [
          { text: "The", duration: 0.48 }, { text: "mouse", duration: 0.48 }, { text: "ran", duration: 0.48 }, { text: "up", duration: 0.48 }, { text: "the", duration: 0.48 }, { text: "clock", duration: 1.42 }
        ]
      },
      { 
        time: 44,
        text: "The clock struck two",
        words: [
          { text: "The", duration: 0.47 }, { text: "clock", duration: 0.47 }, { text: "struck", duration: 0.47 }, { text: "two", duration: 1.4 }
        ]
      },
      { 
        time: 47,
        text: "The mouse said boo!",
        words: [
          { text: "The", duration: 0.47 }, { text: "mouse", duration: 0.47 }, { text: "said", duration: 0.47 }, { text: "boo!", duration: 1.4 }
        ]
      },
      { 
        time: 50,
        text: "Hickory dickory dock",
        words: [
          { text: "Hickory", duration: 0.3 }, { text: "dickory", duration: 0.3 }, { text: "dock", duration: 0.9 }
        ]
      },
      { 
        time: 56,
        text: "Tick tock, tick tock, tick tock, tick tock",
        words: [
          { text: "Tick", duration: 0.49 }, { text: "tock,", duration: 0.98 }, { text: "tick", duration: 0.49 }, { text: "tock,", duration: 0.98 }, { text: "tick", duration: 0.49 }, { text: "tock,", duration: 0.98 }, { text: "tick", duration: 0.49 }, { text: "tock", duration: 1.48 }
        ]
      }
    ]
  },
  {
    id: "london-bridge",
    title: "London Bridge Is Falling Down",
    emoji: "🌉",
    color: "#60A5FA",
    youtubeId: "0-Y7Qi3fMs0",
    localVideo: "/videos/london-bridge.mp4",
    lyrics: [
      { 
        time: 7,
        text: "London Bridge is falling down",
        words: [
          { text: "London", duration: 0.54 }, { text: "Bridge", duration: 0.54 }, { text: "is", duration: 0.54 }, { text: "falling", duration: 0.54 }, { text: "down", duration: 1.63 }
        ]
      },
      { 
        time: 11,
        text: "Falling down, falling down",
        words: [
          { text: "Falling", duration: 0.29 }, { text: "down,", duration: 0.57 }, { text: "falling", duration: 0.29 }, { text: "down", duration: 0.86 }
        ]
      },
      { 
        time: 15,
        text: "London Bridge is falling down",
        words: [
          { text: "London", duration: 0.54 }, { text: "Bridge", duration: 0.54 }, { text: "is", duration: 0.54 }, { text: "falling", duration: 0.54 }, { text: "down", duration: 1.63 }
        ]
      },
      { 
        time: 19,
        text: "My fair lady",
        words: [
          { text: "My", duration: 0.3 }, { text: "fair", duration: 0.3 }, { text: "lady", duration: 0.9 }
        ]
      },
      { 
        time: 25,
        text: "Build it up with iron bars",
        words: [
          { text: "Build", duration: 0.48 }, { text: "it", duration: 0.48 }, { text: "up", duration: 0.48 }, { text: "with", duration: 0.48 }, { text: "iron", duration: 0.48 }, { text: "bars", duration: 1.42 }
        ]
      },
      { 
        time: 29,
        text: "Iron bars, iron bars",
        words: [
          { text: "Iron", duration: 0.29 }, { text: "bars,", duration: 0.57 }, { text: "iron", duration: 0.29 }, { text: "bars", duration: 0.86 }
        ]
      },
      { 
        time: 33,
        text: "Build it up with iron bars",
        words: [
          { text: "Build", duration: 0.48 }, { text: "it", duration: 0.48 }, { text: "up", duration: 0.48 }, { text: "with", duration: 0.48 }, { text: "iron", duration: 0.48 }, { text: "bars", duration: 1.42 }
        ]
      },
      { 
        time: 37,
        text: "My fair lady",
        words: [
          { text: "My", duration: 0.3 }, { text: "fair", duration: 0.3 }, { text: "lady", duration: 0.9 }
        ]
      },
      { 
        time: 43,
        text: "London Bridge is falling down",
        words: [
          { text: "London", duration: 0.54 }, { text: "Bridge", duration: 0.54 }, { text: "is", duration: 0.54 }, { text: "falling", duration: 0.54 }, { text: "down", duration: 1.63 }
        ]
      },
      { 
        time: 47,
        text: "Falling down, falling down",
        words: [
          { text: "Falling", duration: 0.29 }, { text: "down,", duration: 0.57 }, { text: "falling", duration: 0.29 }, { text: "down", duration: 0.86 }
        ]
      },
      { 
        time: 51,
        text: "London Bridge is falling down",
        words: [
          { text: "London", duration: 0.54 }, { text: "Bridge", duration: 0.54 }, { text: "is", duration: 0.54 }, { text: "falling", duration: 0.54 }, { text: "down", duration: 1.63 }
        ]
      },
      { 
        time: 55,
        text: "My fair lady",
        words: [
          { text: "My", duration: 0.48 }, { text: "fair", duration: 0.48 }, { text: "lady", duration: 1.44 }
        ]
      }
    ]
  },
  {
    id: "mary-had-lamb",
    title: "Mary Had a Little Lamb",
    emoji: "🐑",
    color: "#34D399",
    youtubeId: "uyvdG39-Gzk",
    localVideo: "/videos/mary-had-lamb.mp4",
    lyrics: [
      { 
        time: 8,
        text: "Mary had a little lamb",
        words: [
          { text: "Mary", duration: 0.54 }, { text: "had", duration: 0.54 }, { text: "a", duration: 0.54 }, { text: "little", duration: 0.54 }, { text: "lamb", duration: 1.63 }
        ]
      },
      { 
        time: 12,
        text: "Little lamb, little lamb",
        words: [
          { text: "Little", duration: 0.29 }, { text: "lamb,", duration: 0.57 }, { text: "little", duration: 0.29 }, { text: "lamb", duration: 0.86 }
        ]
      },
      { 
        time: 16,
        text: "Mary had a little lamb",
        words: [
          { text: "Mary", duration: 0.54 }, { text: "had", duration: 0.54 }, { text: "a", duration: 0.54 }, { text: "little", duration: 0.54 }, { text: "lamb", duration: 1.63 }
        ]
      },
      { 
        time: 20,
        text: "Its fleece was white as snow",
        words: [
          { text: "Its", duration: 0.38 }, { text: "fleece", duration: 0.38 }, { text: "was", duration: 0.38 }, { text: "white", duration: 0.38 }, { text: "as", duration: 0.38 }, { text: "snow", duration: 1.13 }
        ]
      },
      { 
        time: 26,
        text: "And everywhere that Mary went",
        words: [
          { text: "And", duration: 0.07 }, { text: "everywhere", duration: 0.07 }, { text: "that", duration: 0.07 }, { text: "Mary", duration: 0.07 }, { text: "went", duration: 0.21 }
        ]
      },
      { 
        time: 26.1,
        text: "Mary went, Mary went",
        words: [
          { text: "Mary", duration: 0.29 }, { text: "went,", duration: 0.57 }, { text: "Mary", duration: 0.29 }, { text: "went", duration: 0.86 }
        ]
      },
      { 
        time: 34,
        text: "Everywhere that Mary went",
        words: [
          { text: "Everywhere", duration: 0.33 }, { text: "that", duration: 0.33 }, { text: "Mary", duration: 0.33 }, { text: "went", duration: 1 }
        ]
      },
      { 
        time: 38,
        text: "The lamb was sure to go",
        words: [
          { text: "The", duration: 0.38 }, { text: "lamb", duration: 0.38 }, { text: "was", duration: 0.38 }, { text: "sure", duration: 0.38 }, { text: "to", duration: 0.38 }, { text: "go", duration: 1.13 }
        ]
      },
      { 
        time: 44,
        text: "It followed her to school one day",
        words: [
          { text: "It", duration: 0.42 }, { text: "followed", duration: 0.42 }, { text: "her", duration: 0.42 }, { text: "to", duration: 0.42 }, { text: "school", duration: 0.42 }, { text: "one", duration: 0.42 }, { text: "day", duration: 1.27 }
        ]
      },
      { 
        time: 48,
        text: "School one day, school one day",
        words: [
          { text: "School", duration: 0.42 }, { text: "one", duration: 0.42 }, { text: "day,", duration: 0.84 }, { text: "school", duration: 0.42 }, { text: "one", duration: 0.42 }, { text: "day", duration: 1.27 }
        ]
      },
      { 
        time: 52,
        text: "It followed her to school one day",
        words: [
          { text: "It", duration: 0.42 }, { text: "followed", duration: 0.42 }, { text: "her", duration: 0.42 }, { text: "to", duration: 0.42 }, { text: "school", duration: 0.42 }, { text: "one", duration: 0.42 }, { text: "day", duration: 1.27 }
        ]
      },
      { 
        time: 56,
        text: "Which was against the rules",
        words: [
          { text: "Which", duration: 0.57 }, { text: "was", duration: 0.57 }, { text: "against", duration: 0.57 }, { text: "the", duration: 0.57 }, { text: "rules", duration: 1.71 }
        ]
      }
    ]
  }
];
