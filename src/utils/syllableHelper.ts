// Dictionary and phonics utility for English syllable breakdown in JBAIkid

const SYLLABLE_MAP: Record<string, string[]> = {
  // Animals
  dog: ["Dog"],
  cat: ["Cat"],
  bird: ["Bird"],
  fish: ["Fish"],
  cow: ["Cow"],
  pig: ["Pig"],
  duck: ["Duck"],
  chicken: ["Chick", "en"],
  horse: ["Horse"],
  sheep: ["Sheep"],
  lion: ["Li", "on"],
  tiger: ["Ti", "ger"],
  elephant: ["El", "e", "phant"],
  monkey: ["Mon", "key"],
  bear: ["Bear"],
  zebra: ["Ze", "bra"],
  giraffe: ["Gi", "raffe"],
  snake: ["Snake"],
  crocodile: ["Croc", "o", "dile"],
  panda: ["Pan", "da"],

  // Colors
  red: ["Red"],
  blue: ["Blue"],
  yellow: ["Yel", "low"],
  green: ["Green"],
  pink: ["Pink"],
  orange: ["Or", "ange"],
  purple: ["Pur", "ple"],
  black: ["Black"],
  white: ["White"],
  brown: ["Brown"],

  // Numbers
  one: ["One"],
  two: ["Two"],
  three: ["Three"],
  four: ["Four"],
  five: ["Five"],
  six: ["Six"],
  seven: ["Sev", "en"],
  eight: ["Eight"],
  nine: ["Nine"],
  ten: ["Ten"],

  // Fruits & Food
  apple: ["Ap", "ple"],
  banana: ["Ba", "na", "na"],
  grapes: ["Grapes"],
  watermelon: ["Wa", "ter", "mel", "on"],
  strawberry: ["Straw", "ber", "ry"],
  mango: ["Man", "go"],
  pineapple: ["Pine", "ap", "ple"],
  cherry: ["Cher", "ry"],
  peach: ["Peach"],
  bread: ["Bread"],
  rice: ["Rice"],
  egg: ["Egg"],
  meat: ["Meat"],
  cheese: ["Cheese"],
  cake: ["Cake"],
  "ice cream": ["Ice", "cream"],
  pizza: ["Piz", "za"],
  burger: ["Bur", "ger"],

  // Family
  father: ["Fa", "ther"],
  mother: ["Moth", "er"],
  brother: ["Broth", "er"],
  sister: ["Sis", "ter"],
  baby: ["Ba", "by"],
  grandfather: ["Grand", "fa", "ther"],
  grandmother: ["Grand", "moth", "er"],
  uncle: ["Un", "cle"],
  aunt: ["Aunt"],
  cousin: ["Cou", "sin"],

  // Vehicles
  car: ["Car"],
  bus: ["Bus"],
  train: ["Train"],
  bicycle: ["Bi", "cy", "cle"],
  motorcycle: ["Mo", "tor", "cy", "cle"],
  airplane: ["Air", "plane"],
  boat: ["Boat"],
  helicopter: ["Hel", "i", "cop", "ter"],
  truck: ["Truck"],
  "police car": ["Po", "lice", "Car"],

  // Clothes
  shirt: ["Shirt"],
  pants: ["Pants"],
  dress: ["Dress"],
  skirt: ["Skirt"],
  shoes: ["Shoes"],
  socks: ["Socks"],
  hat: ["Hat"],
  jacket: ["Jack", "et"],
  glasses: ["Glass", "es"],
  watch: ["Watch"],

  // Body Parts
  head: ["Head"],
  face: ["Face"],
  eye: ["Eye"],
  ear: ["Ear"],
  nose: ["Nose"],
  mouth: ["Mouth"],
  tooth: ["Tooth"],
  hand: ["Hand"],
  arm: ["Arm"],
  leg: ["Leg"],
  foot: ["Foot"],

  // Emotions
  happy: ["Hap", "py"],
  sad: ["Sad"],
  angry: ["An", "gry"],
  surprised: ["Sur", "prised"],
  scared: ["Scared"],
  tired: ["Tired"],
  hungry: ["Hun", "gry"],
  thirsty: ["Thir", "sty"],
  sleepy: ["Slee", "py"],
  excited: ["Ex", "ci", "ted"],

  // Nature
  sun: ["Sun"],
  moon: ["Moon"],
  star: ["Star"],
  cloud: ["Cloud"],
  rain: ["Rain"],
  snow: ["Snow"],
  tree: ["Tree"],
  flower: ["Flow", "er"],
  mountain: ["Moun", "tain"],
  river: ["Riv", "er"],

  // Jobs
  doctor: ["Doc", "tor"],
  teacher: ["Teach", "er"],
  police: ["Po", "lice"],
  firefighter: ["Fire", "figh", "ter"],
  farmer: ["Farm", "er"],
  chef: ["Chef"],
  pilot: ["Pi", "lot"],
  nurse: ["Nurse"],
  singer: ["Sing", "er"],
  artist: ["Art", "ist"],

  // Actions
  run: ["Run"],
  walk: ["Walk"],
  jump: ["Jump"],
  swim: ["Swim"],
  fly: ["Fly"],
  sleep: ["Sleep"],
  eat: ["Eat"],
  drink: ["Drink"],
  read: ["Read"],
  write: ["Write"],

  // House
  house: ["House"],
  door: ["Door"],
  window: ["Win", "dow"],
  bed: ["Bed"],
  chair: ["Chair"],
  table: ["Ta", "ble"],
  lamp: ["Lamp"],
  clock: ["Clock"],
  mirror: ["Mir", "ror"],
  toilet: ["Toi", "let"],

  // School
  school: ["School"],
  book: ["Book"],
  pen: ["Pen"],
  pencil: ["Pen", "cil"],
  eraser: ["E", "ras", "er"],
  ruler: ["Ru", "ler"],
  bag: ["Bag"],
  desk: ["Desk"],
  paper: ["Pa", "per"],
  crayon: ["Cray", "on"],
};

/**
 * Returns an array of syllables for an English word.
 * Falls back to rule-based segmentation if not found in dictionary.
 */
export function getWordSyllables(word: string): string[] {
  if (!word || !word.trim()) return [];
  const normalized = word.trim().toLowerCase();

  // 1. Direct dictionary match
  if (SYLLABLE_MAP[normalized]) {
    return SYLLABLE_MAP[normalized];
  }

  // 2. Multi-word phrase fallback (e.g. "Ice cream", "Police car")
  if (normalized.includes(" ")) {
    const parts = word.split(/\s+/);
    return parts.flatMap(p => getWordSyllables(p));
  }

  // 3. Simple phonetic vowel-cluster heuristic for unknown words
  const matches = word.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi);
  if (matches && matches.length > 1) {
    return matches.map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
  }

  return [word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()];
}
