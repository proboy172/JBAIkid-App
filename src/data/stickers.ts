export interface Sticker {
  id: string;
  name: string;
  emoji: string;
  price: number;
  category: "animals" | "vehicles" | "fantasy";
}

export const STICKERS: Sticker[] = [
  { id: "s1", name: "Cún Con", emoji: "🐶", price: 10, category: "animals" },
  { id: "s2", name: "Mèo Mướp", emoji: "🐱", price: 10, category: "animals" },
  { id: "s3", name: "Cáo Nhỏ", emoji: "🦊", price: 20, category: "animals" },
  { id: "s4", name: "Hổ Dũng Mãnh", emoji: "🐯", price: 30, category: "animals" },
  { id: "s5", name: "Sư Tử", emoji: "🦁", price: 40, category: "animals" },
  { id: "s6", name: "Gấu Trúc", emoji: "🐼", price: 50, category: "animals" },
  
  { id: "s7", name: "Ô tô đỏ", emoji: "🚗", price: 20, category: "vehicles" },
  { id: "s8", name: "Xe cảnh sát", emoji: "🚓", price: 30, category: "vehicles" },
  { id: "s9", name: "Máy bay", emoji: "✈️", price: 50, category: "vehicles" },
  { id: "s10", name: "Tên lửa", emoji: "🚀", price: 100, category: "vehicles" },
  
  { id: "s11", name: "Kỳ Lân", emoji: "🦄", price: 150, category: "fantasy" },
  { id: "s12", name: "Rồng Lửa", emoji: "🐉", price: 200, category: "fantasy" },
];
