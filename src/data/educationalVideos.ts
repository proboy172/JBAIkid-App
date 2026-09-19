export interface VideoVocab {
  en: string;
  vi: string;
  emoji?: string;
  phonetic?: string;
}

export interface EducationalVideo {
  id: string;
  title: string;
  channel: 
    | "Ms Rachel"
    | "Caitie's Classroom"
    | "Numberblocks"
    | "Alphablocks"
    | "Super Simple"
    | "Danny Go!"
    | "Steve & Maggie"
    | "Oxford Phonics"
    | "Wild Safari"
    | "Blippi"
    | "Gecko's Garage"
    | "SciShow Kids"
    | "Leo the Truck"
    | "Nat Geo Kids";
  channelAvatar: string;
  channelColor: string;
  youtubeId: string;
  duration: string;
  category: "speech" | "phonics" | "math" | "movement" | "world" | "habits" | "safari" | "vehicles" | "science";
  categoryNameVi: string;
  categoryEmoji: string;
  recommendedAge: "0-3 tuổi" | "3-5 tuổi" | "4-6 tuổi" | "Mọi lứa tuổi";
  description: string;
  parentTip: string;
  keyVocab: VideoVocab[];
  isFeatured?: boolean;
}

export const educationalChannels = [
  {
    id: "all",
    name: "Tất cả",
    emoji: "⭐",
    description: "Toàn bộ video giáo dục tuyển chọn",
  },
  {
    id: "wild-safari",
    channelName: "Wild Safari",
    name: "Safari Động Vật",
    emoji: "🦁",
    color: "#D97706",
    description: "Động vật hoang dã 4K ngoài đời thật, trực quan sinh động, không thuyết minh",
  },
  {
    id: "ms-rachel",
    channelName: "Ms Rachel",
    name: "Ms Rachel",
    emoji: "👧",
    color: "#FF6B8B",
    description: "Phát triển ngôn ngữ sớm, tập nói & cử chỉ tay",
  },
  {
    id: "caities-classroom",
    channelName: "Caitie's Classroom",
    name: "Caitie's Class",
    emoji: "🎨",
    color: "#F59E0B",
    description: "Lớp học sáng tạo, khám phá và kỹ năng xã hội",
  },
  {
    id: "numberblocks",
    channelName: "Numberblocks",
    name: "Numberblocks",
    emoji: "🔢",
    color: "#EF4444",
    description: "Toán học trực quan, đếm số & tư duy logic",
  },
  {
    id: "alphablocks",
    channelName: "Alphablocks",
    name: "Alphablocks",
    emoji: "🔤",
    color: "#3B82F6",
    description: "Đánh vần Phonics, ghép âm & tập đọc tiếng Anh",
  },
  {
    id: "super-simple",
    channelName: "Super Simple",
    name: "Super Simple",
    emoji: "🎵",
    color: "#10B981",
    description: "Bài hát phát âm chuẩn, thói quen & cảm xúc",
  },
  {
    id: "danny-go",
    channelName: "Danny Go!",
    name: "Danny Go!",
    emoji: "🏃",
    color: "#8B5CF6",
    description: "Vận động thể chất, nhảy theo nhạc & Brain Break",
  },
  {
    id: "steve-maggie",
    channelName: "Steve & Maggie",
    name: "Steve & Maggie",
    emoji: "🎩",
    color: "#EC4899",
    description: "Phương pháp phản xạ TPR, tình huống sinh động",
  },
  {
    id: "blippi",
    channelName: "Blippi",
    name: "Blippi",
    emoji: "🚜",
    color: "#F97316",
    description: "Khám phá xe cộ, máy móc, khoa học & khu vui chơi",
  },
  {
    id: "geckos-garage",
    channelName: "Gecko's Garage",
    name: "Gecko Garage",
    emoji: "🦎",
    color: "#10B981",
    description: "Sửa chữa xe cộ, cứu hộ máy bay & tư duy kỹ thuật nhí",
  },
  {
    id: "scishow-kids",
    channelName: "SciShow Kids",
    name: "SciShow Kids",
    emoji: "🔬",
    color: "#06B6D4",
    description: "Khám phá khoa học, vũ trụ & hiện tượng tự nhiên thú vị",
  },
  {
    id: "leo-the-truck",
    channelName: "Leo the Truck",
    name: "Xe Tải Leo",
    emoji: "🚚",
    color: "#3B82F6",
    description: "Lắp ráp xe tải 3D, học hình khối & màu sắc sinh động",
  },
  {
    id: "nat-geo-kids",
    channelName: "Nat Geo Kids",
    name: "Nat Geo Kids",
    emoji: "🐾",
    color: "#EAB308",
    description: "Khám phá thế giới động vật & đại dương kỳ vĩ",
  },
  {
    id: "oxford-phonics",
    channelName: "Oxford Phonics",
    name: "Oxford Phonics",
    emoji: "📖",
    color: "#06B6D4",
    description: "Ngữ âm chuẩn quốc tế Cambridge & Oxford",
  },
];

export const educationalCategories = [
  { id: "all", name: "Tất cả chủ đề", emoji: "🌟" },
  { id: "safari", name: "Động vật 4K", emoji: "🦁" },
  { id: "speech", name: "Bé tập nói", emoji: "🗣️" },
  { id: "phonics", name: "Chữ cái ABC", emoji: "🔤" },
  { id: "math", name: "Đếm số 123", emoji: "🔢" },
  { id: "movement", name: "Nhảy múa vui", emoji: "🏃" },
  { id: "vehicles", name: "Xe & Cứu hộ", emoji: "🚗" },
  { id: "science", name: "Khoa học nhí", emoji: "🔬" },
  { id: "world", name: "Khám phá", emoji: "🌍" },
  { id: "habits", name: "Thói quen tốt", emoji: "💖" },
];

export const educationalVideos: EducationalVideo[] = [
  {
    "id": "ms-rachel-first-words",
    "title": "Baby Learning with Ms Rachel - First Words, Songs and Nursery Rhymes",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "hTqtGJwsJVE",
    "duration": "58 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói kinh điển giúp bé phát âm từ đơn giản đầu đời, kết hợp cử chỉ tay và ngôn ngữ ký hiệu nhẹ nhàng.",
    "parentTip": "Ba mẹ hãy ngồi đối diện, lặp lại các cử chỉ tay và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Peekaboo",
        "vi": "Trò chơi ú òa",
        "emoji": "🙈",
        "phonetic": "/ˈpiː.kə.buː/"
      },
      {
        "en": "Bear",
        "vi": "Chú gấu",
        "emoji": "🐻",
        "phonetic": "/ber/"
      },
      {
        "en": "Kiss",
        "vi": "Nụ hôn / Thơm",
        "emoji": "💋",
        "phonetic": "/kɪs/"
      },
      {
        "en": "Hug",
        "vi": "Ôm ấp yêu thương",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      },
      {
        "en": "I love you",
        "vi": "Con yêu ba mẹ",
        "emoji": "❤️",
        "phonetic": "/aɪ lʌv juː/"
      },
      {
        "en": "Eyes",
        "vi": "Đôi mắt",
        "emoji": "👀",
        "phonetic": "/aɪz/"
      },
      {
        "en": "Nose",
        "vi": "Chiếc mũi",
        "emoji": "👃",
        "phonetic": "/noʊz/"
      },
      {
        "en": "Mouth",
        "vi": "Cái miệng",
        "emoji": "👄",
        "phonetic": "/maʊθ/"
      },
      {
        "en": "Ears",
        "vi": "Đôi tai",
        "emoji": "👂",
        "phonetic": "/ɪərz/"
      },
      {
        "en": "Hair",
        "vi": "Mái tóc",
        "emoji": "💇",
        "phonetic": "/her/"
      },
      {
        "en": "Tummy",
        "vi": "Bụng nhỏ",
        "emoji": "🤰",
        "phonetic": "/ˈtʌm.i/"
      },
      {
        "en": "Hands",
        "vi": "Đôi bàn tay",
        "emoji": "🖐️",
        "phonetic": "/hændz/"
      },
      {
        "en": "Feet",
        "vi": "Đôi bàn chân",
        "emoji": "🦶",
        "phonetic": "/fiːt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Bunny",
        "vi": "Chú thỏ",
        "emoji": "🐰",
        "phonetic": "/ˈbʌn.i/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Bubble",
        "vi": "Bong bóng",
        "emoji": "🫧",
        "phonetic": "/ˈbʌb.əl/"
      },
      {
        "en": "Pop",
        "vi": "Nổ bóp / Tiếng nổ",
        "emoji": "💥",
        "phonetic": "/pɒp/"
      },
      {
        "en": "More",
        "vi": "Thêm nữa",
        "emoji": "➕",
        "phonetic": "/mɔːr/"
      },
      {
        "en": "Please",
        "vi": "Làm ơn / Xin",
        "emoji": "🙏",
        "phonetic": "/pliːz/"
      },
      {
        "en": "Thank you",
        "vi": "Cảm ơn",
        "emoji": "🤝",
        "phonetic": "/ˈθæŋk juː/"
      },
      {
        "en": "All done",
        "vi": "Xong rồi / Hết rồi",
        "emoji": "✅",
        "phonetic": "/ɔːl dʌn/"
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Yes",
        "vi": "Đúng / Có",
        "emoji": "👍",
        "phonetic": "/jes/"
      },
      {
        "en": "No",
        "vi": "Không / Lắc đầu",
        "emoji": "👎",
        "phonetic": "/noʊ/"
      },
      {
        "en": "Up",
        "vi": "Lên trên",
        "emoji": "⬆️",
        "phonetic": "/ʌp/"
      },
      {
        "en": "Down",
        "vi": "Xuống dưới",
        "emoji": "⬇️",
        "phonetic": "/daʊn/"
      },
      {
        "en": "In",
        "vi": "Vào trong",
        "emoji": "📥",
        "phonetic": "/ɪn/"
      },
      {
        "en": "Out",
        "vi": "Ra ngoài",
        "emoji": "📤",
        "phonetic": "/aʊt/"
      },
      {
        "en": "Open",
        "vi": "Mở ra",
        "emoji": "👐",
        "phonetic": "/ˈoʊ.pən/"
      },
      {
        "en": "Shut",
        "vi": "Đóng lại",
        "emoji": "✊",
        "phonetic": "/ʃʌt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "ms-rachel-play-museum",
    "title": "Baby Learning with Ms Rachel - Baby Songs, Speech, Sign Language",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "99aDhxzkGLo",
    "duration": "60 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Ms Rachel cùng bé khám phá các bài hát mầm non, cử chỉ ngón tay và từ vựng giao tiếp đầu đời cho bé.",
    "parentTip": "Chỉ vào các đồ vật thật xung quanh nhà có hình dạng giống trong video để củng cố khả năng ghi nhớ của con.",
    "keyVocab": [
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "House",
        "vi": "Ngôi nhà",
        "emoji": "🏠",
        "phonetic": "/haʊs/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Milk",
        "vi": "Sữa tươi",
        "emoji": "🥛",
        "phonetic": "/mɪlk/"
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "More",
        "vi": "Thêm nữa",
        "emoji": "➕",
        "phonetic": "/mɔːr/"
      },
      {
        "en": "Please",
        "vi": "Làm ơn / Xin",
        "emoji": "🙏",
        "phonetic": "/pliːz/"
      },
      {
        "en": "Thank you",
        "vi": "Cảm ơn",
        "emoji": "🤝",
        "phonetic": "/ˈθæŋk juː/"
      },
      {
        "en": "All done",
        "vi": "Xong rồi / Hết rồi",
        "emoji": "✅",
        "phonetic": "/ɔːl dʌn/"
      },
      {
        "en": "Cookie",
        "vi": "Bánh quy",
        "emoji": "🍪",
        "phonetic": "/ˈkʊk.i/"
      },
      {
        "en": "Shoes",
        "vi": "Đôi giày",
        "emoji": "👟",
        "phonetic": "/ʃuːz/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Rain",
        "vi": "Cơn mưa",
        "emoji": "🌧️",
        "phonetic": "/reɪn/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Drink",
        "vi": "Uống nước",
        "emoji": "🥤",
        "phonetic": "/drɪŋk/"
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Laugh",
        "vi": "Laugh",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Hug",
        "vi": "Ôm ấp yêu thương",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "ms-rachel-outdoor-playground",
    "title": "Learn Animals with Ms Rachel for Toddlers - Animal Sounds, Farm Animals",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "47MNn4bsmSw",
    "duration": "45 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "0-3 tuổi",
    "description": "Cùng Ms Rachel thăm các bạn động vật nông trại đáng yêu, học tiếng kêu của con bò, con cừu, con ngựa.",
    "parentTip": "Khi dắt bé đi chơi, hãy nhắc lại các từ tiếng Anh và giả giọng tiếng con vật mà bé đã xem.",
    "keyVocab": [
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Chicken",
        "vi": "Con gà",
        "emoji": "🐔",
        "phonetic": "/ˈtʃɪk.ɪn/"
      },
      {
        "en": "Rooster",
        "vi": "Gà trống",
        "emoji": "🐓",
        "phonetic": "/ˈruː.stər/"
      },
      {
        "en": "Bunny",
        "vi": "Chú thỏ",
        "emoji": "🐰",
        "phonetic": "/ˈbʌn.i/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Frog",
        "vi": "Chú ếch",
        "emoji": "🐸",
        "phonetic": "/frɒɡ/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Grass",
        "vi": "Bãi cỏ xanh",
        "emoji": "🌱",
        "phonetic": "/ɡræs/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Big",
        "vi": "To lớn",
        "emoji": "🐘",
        "phonetic": "/bɪɡ/"
      },
      {
        "en": "Small",
        "vi": "Bé nhỏ",
        "emoji": "🐭",
        "phonetic": "/smɔːl/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Drink",
        "vi": "Uống nước",
        "emoji": "🥤",
        "phonetic": "/drɪŋk/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ]
  },
  {
    "id": "ms-rachel-animal-sounds",
    "title": "Bingo + More Nursery Rhymes & Kids Songs - Ms Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "axhYc_4jL3Y",
    "duration": "52 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Hát bài hát chú chó BINGO vỗ tay theo từng chữ cái và những ca khúc thiếu nhi kinh điển cùng Ms Rachel.",
    "parentTip": "Vỗ tay theo nhịp từng chữ cái B-I-N-G-O để rèn phản xạ và nhịp điệu cho con.",
    "keyVocab": [
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Puppy",
        "vi": "Chó con",
        "emoji": "🐶",
        "phonetic": "/ˈpʌp.i/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Music",
        "vi": "Music",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter I",
        "vi": "Letter I",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Hands",
        "vi": "Đôi bàn tay",
        "emoji": "🖐️",
        "phonetic": "/hændz/"
      },
      {
        "en": "Feet",
        "vi": "Đôi bàn chân",
        "emoji": "🦶",
        "phonetic": "/fiːt/"
      },
      {
        "en": "Head",
        "vi": "Cái đầu",
        "emoji": "👶",
        "phonetic": "/hed/"
      }
    ]
  },
  {
    "id": "ms-rachel-dolls-care",
    "title": "Icky Sticky Bubble Gum Song with Ms Rachel + More Nursery Rhymes",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "ZizzobSlWkg",
    "duration": "38 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Học các cử chỉ tay vui nhộn với kẹo cao su Icky Sticky, các bài hát tương tác và rèn luyện cảm xúc yêu thương.",
    "parentTip": "Cùng bé chạm tay lên má, lên tóc theo bài hát để nhận biết các bộ phận cơ thể.",
    "keyVocab": [
      {
        "en": "Hands",
        "vi": "Đôi bàn tay",
        "emoji": "🖐️",
        "phonetic": "/hændz/"
      },
      {
        "en": "Cheek",
        "vi": "Đôi má phúng phính",
        "emoji": "😊",
        "phonetic": "/tʃiːk/"
      },
      {
        "en": "Hair",
        "vi": "Mái tóc",
        "emoji": "💇",
        "phonetic": "/her/"
      },
      {
        "en": "Nose",
        "vi": "Chiếc mũi",
        "emoji": "👃",
        "phonetic": "/noʊz/"
      },
      {
        "en": "Mouth",
        "vi": "Cái miệng",
        "emoji": "👄",
        "phonetic": "/maʊθ/"
      },
      {
        "en": "Eyes",
        "vi": "Đôi mắt",
        "emoji": "👀",
        "phonetic": "/aɪz/"
      },
      {
        "en": "Ears",
        "vi": "Đôi tai",
        "emoji": "👂",
        "phonetic": "/ɪərz/"
      },
      {
        "en": "Sticky",
        "vi": "Dính dính",
        "emoji": "🍬",
        "phonetic": "/ˈstɪk.i/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɒʃ/"
      },
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Soap",
        "vi": "Bánh xà phòng",
        "emoji": "🧼",
        "phonetic": "/soʊp/"
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Towel",
        "vi": "Khăn tắm",
        "emoji": "🧖",
        "phonetic": "/ˈtaʊ.əl/"
      },
      {
        "en": "Bubble",
        "vi": "Bong bóng",
        "emoji": "🫧",
        "phonetic": "/ˈbʌb.əl/"
      },
      {
        "en": "Pop",
        "vi": "Nổ bóp / Tiếng nổ",
        "emoji": "💥",
        "phonetic": "/pɒp/"
      },
      {
        "en": "Doll",
        "vi": "Búp bê",
        "emoji": "🪆",
        "phonetic": "/dɒl/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Hug",
        "vi": "Ôm ấp yêu thương",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      },
      {
        "en": "Kiss",
        "vi": "Nụ hôn / Thơm",
        "emoji": "💋",
        "phonetic": "/kɪs/"
      },
      {
        "en": "Love",
        "vi": "Love",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Gentle",
        "vi": "Gentle",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      }
    ]
  },
  {
    "id": "caities-ocean-animals",
    "title": "Explore Underwater Animals At The Aquarium | Caitie's Classroom Field Trip",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "ptngrokhewc",
    "duration": "22 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Cô Caitie hướng dẫn các bạn nhỏ thám hiểm thủy cung bao la, gặp gỡ cá voi, cá mập và rùa biển khổng lồ.",
    "parentTip": "Sau video, bố mẹ có thể cùng bé vẽ một chú cá biển đơn giản và gọi tên bằng tiếng Anh.",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Crab",
        "vi": "Chú cua",
        "emoji": "🦀",
        "phonetic": "/kræb/"
      },
      {
        "en": "Octopus",
        "vi": "Bạch tuộc",
        "emoji": "🐙",
        "phonetic": "/ˈɒk.tə.pəs/"
      },
      {
        "en": "Jellyfish",
        "vi": "Con sứa",
        "emoji": "🪼",
        "phonetic": "/ˈdʒel.i.fɪʃ/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "caities-feelings-emotions",
    "title": "Feelings | Caitie's Classroom Sing-Along Show | Emotion Songs for Kids",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "fYe6l7rDx8U",
    "duration": "20 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "3-5 tuổi",
    "description": "Nhận biết và gọi tên các cảm xúc của bản thân: Vui vẻ, Buồn bã, Hào hứng, và cách mỉm cười tự tin.",
    "parentTip": "Hỏi bé: 'Hôm nay con cảm thấy thế nào? Are you happy today?'",
    "keyVocab": [
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Kind",
        "vi": "Tử tế / Tốt bụng",
        "emoji": "💖",
        "phonetic": "/kaɪnd/"
      },
      {
        "en": "Brave",
        "vi": "Dũng cảm",
        "emoji": "🦁",
        "phonetic": "/breɪv/"
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      },
      {
        "en": "Hug",
        "vi": "Ôm ấp yêu thương",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      },
      {
        "en": "Love",
        "vi": "Love",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      }
    ]
  },
  {
    "id": "caities-colors-shapes",
    "title": "Colors, Colors, Colors! | Caitie's Classroom | Pre-K Education",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "VpZrYTgdGvM",
    "duration": "25 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Trò chơi tìm kiếm màu sắc rực rỡ và pha trộn màu kỳ diệu trong lớp học của Caitie.",
    "parentTip": "Cùng bé thi đua: Ai tìm được đồ vật màu đỏ (red) hay màu xanh (blue) trong phòng nhanh nhất!",
    "keyVocab": [
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Orange",
        "vi": "Màu cam",
        "emoji": "🟧",
        "phonetic": "/ˈɒr.ɪndʒ/"
      },
      {
        "en": "Purple",
        "vi": "Màu tím",
        "emoji": "🟪",
        "phonetic": "/ˈpɜːr.pəl/"
      },
      {
        "en": "Pink",
        "vi": "Màu hồng",
        "emoji": "🌸",
        "phonetic": "/pɪŋk/"
      },
      {
        "en": "White",
        "vi": "Màu trắng",
        "emoji": "⬜",
        "phonetic": "/waɪt/"
      },
      {
        "en": "Black",
        "vi": "Màu đen",
        "emoji": "⬛",
        "phonetic": "/blæk/"
      },
      {
        "en": "Brown",
        "vi": "Màu nâu",
        "emoji": "🟫",
        "phonetic": "/braʊn/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      }
    ]
  },
  {
    "id": "numberblocks-one-to-five",
    "title": "Learn How to Count in Twos | Numberblocks Counting Compilation",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "K6flN_1PJ4A",
    "duration": "18 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số chẵn cách 2 đơn vị (2, 4, 6, 8, 10...) với các bạn khối số Numberblocks siêu ngộ nghĩnh.",
    "parentTip": "Dùng các đôi tất hoặc đôi giày để bé tập đếm đôi theo Numberblocks.",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "numberblocks-count-to-twenty",
    "title": "Learn to Count from 1 to 100! 🎲 l Counting for Kids | Numberblocks",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "7S7fO7I3mRQ",
    "duration": "24 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "4-6 tuổi",
    "description": "Hành trình đếm số kỳ thú từ 1 đến 100 với bài hát giai điệu số học vui tươi của Numberblocks.",
    "parentTip": "Cùng con đếm các bậc cầu thang mỗi khi bước đi trong nhà.",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ]
  },
  {
    "id": "numberblocks-ten-adventure",
    "title": "Learn to Count - BIG NUMBERS | Numberblocks Full Episodes",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "K6w9jPbDdK0",
    "duration": "30 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Tập hợp những câu chuyện hay nhất về các số lớn, các phép cộng ghép khối đầy sáng tạo.",
    "parentTip": "Dạy bé nhận biết số 10 tương đương 10 ngón tay xinh xắn của mình.",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ]
  },
  {
    "id": "alphablocks-a-to-z",
    "title": "The Ultimate A to Z Learn-A-Thon 📖✏️ | Learn to Read | Alphablocks",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "9HKbQ1QyLaU",
    "duration": "28 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Khám phá âm thanh ngữ âm của tất cả các chữ cái từ A đến Z với các nhân vật Alphablocks ngộ nghĩnh.",
    "parentTip": "Nhắc con phát âm âm bật /æ/ của chữ A thay vì chỉ đọc tên chữ 'ei'.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "alphablocks-blend-words",
    "title": "Phonics - Learn to Read | Practicing Letter Blends | Alphablocks",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "BxtUFEFkSas",
    "duration": "25 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Cách ghép các âm đơn thành từ hoàn chỉnh: C-A-T thành CAT, S-U-N thành SUN. Bước đệm biết đọc tiếng Anh sớm!",
    "parentTip": "Cầm tay bé nắm lại khi các bạn chữ cái nắm tay nhau để bé hiểu khái niệm 'ghép vần'.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ]
  },
  {
    "id": "alphablocks-vowel-magic",
    "title": "One Syllable Words | Phonics for Kids - Learn To Read | Alphablocks",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "VxBEmaaSh1c",
    "duration": "20 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Các từ một âm tiết đơn giản giúp bé làm quen và tự tin đọc sách tiếng Anh ngay từ mầm non.",
    "parentTip": "Cùng con hát giai điệu vui nhộn của 5 nguyên âm tiếng Anh.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ]
  },
  {
    "id": "super-simple-clean-up-habits",
    "title": "Clean Up Song for Children | Super Simple Songs",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "oY-H2WGThc8",
    "duration": "35 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bài hát rèn luyện thói quen tự thu dọn đồ chơi ngăn nắp sau khi chơi xong.",
    "parentTip": "Bật bài hát Clean Up Song mỗi khi đến giờ thu dọn đồ chơi trước khi đi ngủ.",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɒʃ/"
      },
      {
        "en": "Soap",
        "vi": "Bánh xà phòng",
        "emoji": "🧼",
        "phonetic": "/soʊp/"
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Towel",
        "vi": "Khăn tắm",
        "emoji": "🧖",
        "phonetic": "/ˈtaʊ.əl/"
      },
      {
        "en": "Brush",
        "vi": "Chải / Đánh răng",
        "emoji": "🪥",
        "phonetic": "/brʌʃ/"
      },
      {
        "en": "Teeth",
        "vi": "Hàm răng",
        "emoji": "🦷",
        "phonetic": "/tiːθ/"
      },
      {
        "en": "Toothbrush",
        "vi": "Bàn chải đánh răng",
        "emoji": "🪥",
        "phonetic": "/ˈtuːθ.brʌʃ/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "super-simple-baby-shark-compilation",
    "title": "Baby Shark - featuring Finny The Shark | Super Simple Songs",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "8ljHzljQrY8",
    "duration": "40 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "0-3 tuổi",
    "description": "Những bài hát hoạt hình đại dương vui nhộn với tiết tấu êm dịu, chuẩn ngữ âm tiếng Anh mẫu giáo.",
    "parentTip": "Bé vừa hát vừa làm động tác tay hàm cá mập nhỏ, mẹ cá mập to và bố cá mập khỏe.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Crab",
        "vi": "Chú cua",
        "emoji": "🦀",
        "phonetic": "/kræb/"
      },
      {
        "en": "Octopus",
        "vi": "Bạch tuộc",
        "emoji": "🐙",
        "phonetic": "/ˈɒk.tə.pəs/"
      },
      {
        "en": "Jellyfish",
        "vi": "Con sứa",
        "emoji": "🪼",
        "phonetic": "/ˈdʒel.i.fɪʃ/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      }
    ]
  },
  {
    "id": "danny-go-floor-is-lava",
    "title": "The Floor is Lava Dance! 🌋 /// Danny Go! Kids Brain Break Songs",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "nEUTY8n2iZo",
    "duration": "12 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Trò chơi vận động cực vui nhộn: Nhảy lên cao và tìm chỗ trú an toàn khi sàn nhà biến thành dung nham!",
    "parentTip": "Chuẩn bị thảm xốp hoặc đệm an toàn để bé thoải mái nhảy nhót giải phóng năng lượng.",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": true
  },
  {
    "id": "danny-go-animal-freeze",
    "title": "Fire & Ice FREEZE Dance! 🔥❄️ /// Danny Go! Brain Break Movement",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "XYEjLXxT2xg",
    "duration": "10 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Vừa nhảy theo điệu bộ Lửa nóng và Băng lạnh vừa dừng lại bất động (Freeze) khi tiếng nhạc ngưng.",
    "parentTip": "Rèn luyện khả năng tập trung chú ý và kiểm soát cơ thể cho trẻ rất hiệu quả.",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ]
  },
  {
    "id": "danny-go-color-jump",
    "title": "The Ice King Freeze Dance! 🥶👑 /// Danny Go! Movement Songs",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "c9YiakkdS8k",
    "duration": "15 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Thử thách cùng vua Băng giá Ice King: Nhún nhảy theo nhịp nhạc và đứng bất động khi nhà vua ra hiệu.",
    "parentTip": "Ba mẹ cùng thi nhảy với bé xem ai đứng im giỏi hơn nhé!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ]
  },
  {
    "id": "steve-maggie-toy-shop",
    "title": "Animal Safari Adventure with Steve and Maggie | Wild Animals Story",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "jni7C2RfPyk",
    "duration": "18 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Thầy Steve và chú chim quạ Maggie cùng đi xe Jeep thám hiểm khu rừng hoang dã tìm kiếm các bạn thú rừng.",
    "parentTip": "Giọng thầy Steve phát âm chuẩn Anh - Anh, rất to và rõ, giúp trẻ dễ bắt chước ngữ điệu.",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      }
    ]
  },
  {
    "id": "steve-maggie-safari-animals",
    "title": "ZOO Animals for Kids | Stories from Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "qb1oKClLzRM",
    "duration": "20 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Thăm vườn thú sở thú ZOO với những câu chuyện hài hước bất ngờ cùng chú quạ tinh nghịch Maggie.",
    "parentTip": "Bé sẽ cười nghiêng ngả với những trò đùa của chú quạ Maggie!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      }
    ]
  },
  {
    "id": "oxford-phonics-alphabet",
    "title": "Oxford Phonics World Level 1 - The Alphabet - ABC Song & Chants",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "iQsENh0lM3k",
    "duration": "32 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Giáo trình Phonics mầm non chuẩn Đại học Oxford, hướng dẫn chi tiết khẩu hình và bài vần cho từng chữ cái.",
    "parentTip": "Giáo trình tốt nhất để chuẩn bị cho trẻ bước vào lớp 1 hoặc học các trường song ngữ.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": true
  },
  {
    "id": "oxford-phonics-short-vowels",
    "title": "Oxford Phonics World Level 2 - Short Vowels (a, e, i, o, u)",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "6zxAUaGlW88",
    "duration": "28 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chuyên sâu 5 nguyên âm ngắn cốt lõi tiếng Anh với bài vần và hình ảnh minh họa sinh động.",
    "parentTip": "Cùng con so sánh sự khác nhau giữa âm /æ/ trong 'hat' và âm /e/ trong 'hen'.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ]
  },
  {
    "id": "safari-wild-lxoh1oqj",
    "title": "8K Wildlife of Gondwana Game Reserve, Africa - 7 HOURS of Amazing Wild Animals (NO MUSIC)",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "lXoH1oQJvHo",
    "duration": "20 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "safari-wild-ut2khcnt",
    "title": "4K Wild Animals - Africa, Mana Pools National Park with Nature Sounds - 4 HRS",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "ut2KhcNtnm8",
    "duration": "10 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "safari-wild-iuwj8lkf",
    "title": "5K Madagascar Wildlife - Incredible Nature and Wildlife of Madagascar - 4 HOURS",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "IUWJ8_lkFAA",
    "duration": "10 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-mwadbix4",
    "title": "10 HRS Amazing Wildlife of Chobe National Park in 8K UHD - Incredible South Africa - Part 1",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "M-WADbIX42s",
    "duration": "30 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      },
      {
        "en": "Meerkat",
        "vi": "Chồn Meerkat",
        "emoji": "🦡",
        "phonetic": "/ˈmɪər.kæt/"
      },
      {
        "en": "Ostrich",
        "vi": "Đà điểu",
        "emoji": "🦤",
        "phonetic": "/ˈɒs.trɪtʃ/"
      },
      {
        "en": "Flamingo",
        "vi": "Hồng hạc",
        "emoji": "🦩",
        "phonetic": "/fləˈmɪŋ.ɡoʊ/"
      },
      {
        "en": "Eagle",
        "vi": "Đại bàng",
        "emoji": "🦅",
        "phonetic": "/ˈiː.ɡəl/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Penguin",
        "vi": "Chim cánh cụt",
        "emoji": "🐧",
        "phonetic": "/ˈpeŋ.ɡwɪn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-pgntolrs",
    "title": "4K African Animals: Hwange National Park - Amazing African Wildlife Footage with Real Sounds in 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "pgNTOLRStE8",
    "duration": "10 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-u91u8opj",
    "title": "Africa 4K • Nature Relaxation Film – Wildlife & Tribal Music",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "u91U8oPJzL8",
    "duration": "45 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      },
      {
        "en": "Meerkat",
        "vi": "Chồn Meerkat",
        "emoji": "🦡",
        "phonetic": "/ˈmɪər.kæt/"
      },
      {
        "en": "Ostrich",
        "vi": "Đà điểu",
        "emoji": "🦤",
        "phonetic": "/ˈɒs.trɪtʃ/"
      },
      {
        "en": "Flamingo",
        "vi": "Hồng hạc",
        "emoji": "🦩",
        "phonetic": "/fləˈmɪŋ.ɡoʊ/"
      },
      {
        "en": "Eagle",
        "vi": "Đại bàng",
        "emoji": "🦅",
        "phonetic": "/ˈiː.ɡəl/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Penguin",
        "vi": "Chim cánh cụt",
        "emoji": "🐧",
        "phonetic": "/ˈpeŋ.ɡwɪn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-krh9ccpo",
    "title": "African Safari 4K • Wildlife Relaxation Film",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "Krh9ccPOx-M",
    "duration": "1 giờ",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-p8frccll",
    "title": "African Safari 4K - Scenic Wildlife Film With African Music",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "P8frC_cLLD4",
    "duration": "1 giờ",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-cjljmlaj",
    "title": "Giraffe Wildlife of Africa  4K Savanna Safari Nature Footage  #animals #wildlife #naturesounds",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "cJljMLAjq1s",
    "duration": "15 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-z3ndwp41",
    "title": "4k African Wildlife Adventure: Serene Nature with Wild Animals and Relaxing Music",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "Z3n_Dwp414Q",
    "duration": "10 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-ei8ua0wy",
    "title": "Mongoose Removes a Monster Tick From an African Wild Dog’s Paw Pad!",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "EI8UA0WyXvM",
    "duration": "1 giờ",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      },
      {
        "en": "Meerkat",
        "vi": "Chồn Meerkat",
        "emoji": "🦡",
        "phonetic": "/ˈmɪər.kæt/"
      },
      {
        "en": "Ostrich",
        "vi": "Đà điểu",
        "emoji": "🦤",
        "phonetic": "/ˈɒs.trɪtʃ/"
      },
      {
        "en": "Flamingo",
        "vi": "Hồng hạc",
        "emoji": "🦩",
        "phonetic": "/fləˈmɪŋ.ɡoʊ/"
      },
      {
        "en": "Eagle",
        "vi": "Đại bàng",
        "emoji": "🦅",
        "phonetic": "/ˈiː.ɡəl/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Penguin",
        "vi": "Chim cánh cụt",
        "emoji": "🐧",
        "phonetic": "/ˈpeŋ.ɡwɪn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-exgitmht",
    "title": "Warthog Wildlife on African Safari",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "EXgitmhT8zs",
    "duration": "1 giờ",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-7thpem8g",
    "title": "Majestic African Savanna Wildlife in 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "7thpEm8Gbog",
    "duration": "15 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      },
      {
        "en": "Meerkat",
        "vi": "Chồn Meerkat",
        "emoji": "🦡",
        "phonetic": "/ˈmɪər.kæt/"
      },
      {
        "en": "Ostrich",
        "vi": "Đà điểu",
        "emoji": "🦤",
        "phonetic": "/ˈɒs.trɪtʃ/"
      },
      {
        "en": "Flamingo",
        "vi": "Hồng hạc",
        "emoji": "🦩",
        "phonetic": "/fləˈmɪŋ.ɡoʊ/"
      },
      {
        "en": "Eagle",
        "vi": "Đại bàng",
        "emoji": "🦅",
        "phonetic": "/ˈiː.ɡəl/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Penguin",
        "vi": "Chim cánh cụt",
        "emoji": "🐧",
        "phonetic": "/ˈpeŋ.ɡwɪn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-grde7wgs",
    "title": "Animals of Africa 4K - Scenic Relaxation Film With Calming Music",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "GRde7WGScrM",
    "duration": "15 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-qrfffjq1",
    "title": "African Safari 4K 🐾 Discovery Relaxation Wonderful Wildlife Movie with Relax Piano Music",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "QRFFFjq1MS8",
    "duration": "10 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-djnmuoi4",
    "title": "8K Wildlife of Okavango Delta Area, Botswana - 8 Hours of Wild Animals of Africa - Part #1",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "DJNMUOi4DpI",
    "duration": "45 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-fxrxcoyz",
    "title": "Deep in the African wilderness #animals #viral #funny #wildlife #shorts #shorts #comedy",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "FxRxcOyZ8Us",
    "duration": "20 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-6jswrhrl",
    "title": "4K African Safari: The most relaxing wildlife moments ever filmed #relaxing",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "6jSwrHrLTts",
    "duration": "15 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-a9kwv4lb",
    "title": "Lioness Shares a Sweet Moment With Her Cub",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "a9Kwv4LbKxM",
    "duration": "30 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      },
      {
        "en": "Meerkat",
        "vi": "Chồn Meerkat",
        "emoji": "🦡",
        "phonetic": "/ˈmɪər.kæt/"
      },
      {
        "en": "Ostrich",
        "vi": "Đà điểu",
        "emoji": "🦤",
        "phonetic": "/ˈɒs.trɪtʃ/"
      },
      {
        "en": "Flamingo",
        "vi": "Hồng hạc",
        "emoji": "🦩",
        "phonetic": "/fləˈmɪŋ.ɡoʊ/"
      },
      {
        "en": "Eagle",
        "vi": "Đại bàng",
        "emoji": "🦅",
        "phonetic": "/ˈiː.ɡəl/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Penguin",
        "vi": "Chim cánh cụt",
        "emoji": "🐧",
        "phonetic": "/ˈpeŋ.ɡwɪn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-y6up3uyp",
    "title": "African Safari 4K - Scenic Wildlife Film With African Music",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "y6Up3uy-PDI",
    "duration": "1 giờ",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-nbvu4wcs",
    "title": "😱 Still Scavenging... 😱 #vivoX300pro #wildlife",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "nbVU-4wcszw",
    "duration": "15 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      },
      {
        "en": "Lemur",
        "vi": "Vượn cáo đuôi vòng",
        "emoji": "🐒",
        "phonetic": "/ˈliː.mər/"
      },
      {
        "en": "Meerkat",
        "vi": "Chồn Meerkat",
        "emoji": "🦡",
        "phonetic": "/ˈmɪər.kæt/"
      },
      {
        "en": "Ostrich",
        "vi": "Đà điểu",
        "emoji": "🦤",
        "phonetic": "/ˈɒs.trɪtʃ/"
      },
      {
        "en": "Flamingo",
        "vi": "Hồng hạc",
        "emoji": "🦩",
        "phonetic": "/fləˈmɪŋ.ɡoʊ/"
      },
      {
        "en": "Eagle",
        "vi": "Đại bàng",
        "emoji": "🦅",
        "phonetic": "/ˈiː.ɡəl/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Penguin",
        "vi": "Chim cánh cụt",
        "emoji": "🐧",
        "phonetic": "/ˈpeŋ.ɡwɪn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-wild-s3c1wgrd",
    "title": "Mongoose Pulls a Giant Tick From a Bushbuck’s Ear Tip! #wildlife #wildlifeshorts",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "s3c1WgRdO1Q",
    "duration": "25 phút",
    "category": "safari",
    "categoryNameVi": "Động vật thực tế",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    "parentTip": "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    "keyVocab": [
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Leopard",
        "vi": "Báo hoa mai",
        "emoji": "🐆",
        "phonetic": "/ˈlep.ərd/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Buffalo",
        "vi": "Buffalo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crocodile",
        "vi": "Cá sấu",
        "emoji": "🐊",
        "phonetic": "/ˈkrɒk.ə.daɪl/"
      },
      {
        "en": "Gorilla",
        "vi": "Khỉ đột Gorilla",
        "emoji": "🦍",
        "phonetic": "/ɡəˈrɪl.ə/"
      },
      {
        "en": "Chimpanzee",
        "vi": "Tinh tinh",
        "emoji": "🐵",
        "phonetic": "/ˌtʃɪm.pænˈziː/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-boiyn7iu",
    "title": "Wheels On The Bus + More Nursery Rhymes & Kids Songs - Educational Videos for Kids & Toddlers",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "bOiYN7iU-W8",
    "duration": "25 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Door",
        "vi": "Cánh cửa",
        "emoji": "🚪",
        "phonetic": "/dɔːr/"
      },
      {
        "en": "Open",
        "vi": "Mở ra",
        "emoji": "👐",
        "phonetic": "/ˈoʊ.pən/"
      },
      {
        "en": "Shut",
        "vi": "Đóng lại",
        "emoji": "✊",
        "phonetic": "/ʃʌt/"
      },
      {
        "en": "Round and round",
        "vi": "Round and round",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Town",
        "vi": "Town",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Mommy",
        "vi": "Mẹ yêu",
        "emoji": "👩",
        "phonetic": "/ˈmɒm.i/"
      },
      {
        "en": "Daddy",
        "vi": "Bố yêu",
        "emoji": "👨",
        "phonetic": "/ˈdæd.i/"
      },
      {
        "en": "Driver",
        "vi": "Driver",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Move on back",
        "vi": "Move on back",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Beep",
        "vi": "Beep",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Horn",
        "vi": "Horn",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Wipers",
        "vi": "Wipers",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Swish",
        "vi": "Swish",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "ms-rachel-gngpq771",
    "title": "Hop Little Bunnies Hop Hop Hop + More Ms Rachel Nursery Rhymes & Kids Songs",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "gngPQ771Ahk",
    "duration": "20 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Bunny",
        "vi": "Chú thỏ",
        "emoji": "🐰",
        "phonetic": "/ˈbʌn.i/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Wake up",
        "vi": "Thức dậy",
        "emoji": "⏰",
        "phonetic": "/weɪk ʌp/"
      },
      {
        "en": "Quiet",
        "vi": "Yên lặng / Khẽ khẽ",
        "emoji": "🤫",
        "phonetic": "/ˈkwaɪ.ət/"
      },
      {
        "en": "Loud",
        "vi": "Âm thanh to",
        "emoji": "📢",
        "phonetic": "/laʊd/"
      },
      {
        "en": "Grass",
        "vi": "Bãi cỏ xanh",
        "emoji": "🌱",
        "phonetic": "/ɡræs/"
      },
      {
        "en": "Meadow",
        "vi": "Meadow",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Ears",
        "vi": "Đôi tai",
        "emoji": "👂",
        "phonetic": "/ɪərz/"
      },
      {
        "en": "Feet",
        "vi": "Đôi bàn chân",
        "emoji": "🦶",
        "phonetic": "/fiːt/"
      },
      {
        "en": "Hands",
        "vi": "Đôi bàn tay",
        "emoji": "🖐️",
        "phonetic": "/hændz/"
      },
      {
        "en": "Carrots",
        "vi": "Carrots",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Morning",
        "vi": "Morning",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "ms-rachel-ayznnxlg",
    "title": "Happy Song",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "AyZNnxLGGlw",
    "duration": "15 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Laugh",
        "vi": "Laugh",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Hug",
        "vi": "Ôm ấp yêu thương",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      },
      {
        "en": "Love",
        "vi": "Love",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Turn around",
        "vi": "Turn around",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Hooray",
        "vi": "Hooray",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Hands",
        "vi": "Đôi bàn tay",
        "emoji": "🖐️",
        "phonetic": "/hændz/"
      },
      {
        "en": "Feet",
        "vi": "Đôi bàn chân",
        "emoji": "🦶",
        "phonetic": "/fiːt/"
      },
      {
        "en": "Heart",
        "vi": "Heart",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Joy",
        "vi": "Joy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Kind",
        "vi": "Tử tế / Tốt bụng",
        "emoji": "💖",
        "phonetic": "/kaɪnd/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-b051ktud",
    "title": "ABC Song - The Alphabet - ABCs & 123s - Phonics - Kids Songs & Nursery Rhymes for Children",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "b051ktudQDQ",
    "duration": "45 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-kaq4h03n",
    "title": "Preschool & Toddler Learning Video with Ms Rachel - Learn Shapes, Letters, Numbers, Colors & More",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "K_Aq4H03Nm4",
    "duration": "25 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Rectangle",
        "vi": "Hình chữ nhật",
        "emoji": "▭",
        "phonetic": "/ˈrek.tæŋ.ɡəl/"
      },
      {
        "en": "Star",
        "vi": "Hình ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Heart",
        "vi": "Hình trái tim",
        "emoji": "💖",
        "phonetic": "/hɑːrt/"
      },
      {
        "en": "Oval",
        "vi": "Hình bầu dục",
        "emoji": "🥚",
        "phonetic": "/ˈoʊ.vəl/"
      },
      {
        "en": "Diamond",
        "vi": "Hình thoi",
        "emoji": "🔷",
        "phonetic": "/ˈdaɪ.mənd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Orange",
        "vi": "Màu cam",
        "emoji": "🟧",
        "phonetic": "/ˈɒr.ɪndʒ/"
      },
      {
        "en": "Purple",
        "vi": "Màu tím",
        "emoji": "🟪",
        "phonetic": "/ˈpɜːr.pəl/"
      },
      {
        "en": "Pink",
        "vi": "Màu hồng",
        "emoji": "🌸",
        "phonetic": "/pɪŋk/"
      },
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Match",
        "vi": "Match",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Shape",
        "vi": "Shape",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Learn",
        "vi": "Learn",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-jbvzoft8",
    "title": "🔴 Learn with Ms Rachel - Toddler Learning - Kids Songs & Nursery Rhymes - Wheels On The Bus",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "jBvzOfT8_44",
    "duration": "30 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Big",
        "vi": "To lớn",
        "emoji": "🐘",
        "phonetic": "/bɪɡ/"
      },
      {
        "en": "Small",
        "vi": "Bé nhỏ",
        "emoji": "🐭",
        "phonetic": "/smɔːl/"
      },
      {
        "en": "Up",
        "vi": "Lên trên",
        "emoji": "⬆️",
        "phonetic": "/ʌp/"
      },
      {
        "en": "Down",
        "vi": "Xuống dưới",
        "emoji": "⬇️",
        "phonetic": "/daʊn/"
      },
      {
        "en": "In",
        "vi": "Vào trong",
        "emoji": "📥",
        "phonetic": "/ɪn/"
      },
      {
        "en": "Out",
        "vi": "Ra ngoài",
        "emoji": "📤",
        "phonetic": "/aʊt/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-oyuoske7",
    "title": "Bedtime Routine - Bedtime Stories for Toddlers - Preschool Videos - Toddler Learning Video Songs",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "OyUoskE7Ogk",
    "duration": "20 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Bedtime",
        "vi": "Bedtime",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Pajamas",
        "vi": "Bộ đồ ngủ",
        "emoji": "👚",
        "phonetic": "/pəˈdʒɑː.məz/"
      },
      {
        "en": "Brush",
        "vi": "Chải / Đánh răng",
        "emoji": "🪥",
        "phonetic": "/brʌʃ/"
      },
      {
        "en": "Teeth",
        "vi": "Hàm răng",
        "emoji": "🦷",
        "phonetic": "/tiːθ/"
      },
      {
        "en": "Toothbrush",
        "vi": "Bàn chải đánh răng",
        "emoji": "🪥",
        "phonetic": "/ˈtuːθ.brʌʃ/"
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɒʃ/"
      },
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Storybook",
        "vi": "Storybook",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Blanket",
        "vi": "Chiếc chăn ấm",
        "emoji": "🛋️",
        "phonetic": "/ˈblæŋ.kɪt/"
      },
      {
        "en": "Pillow",
        "vi": "Chiếc gối êm",
        "emoji": "🛏️",
        "phonetic": "/ˈpɪl.oʊ/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Teddy bear",
        "vi": "Gấu bông",
        "emoji": "🧸",
        "phonetic": "/ˈted.i ber/"
      },
      {
        "en": "Good night",
        "vi": "Chúc ngủ ngon",
        "emoji": "🌙",
        "phonetic": "/ɡʊd naɪt/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Tired",
        "vi": "Mệt mỏi / Buồn ngủ",
        "emoji": "🥱",
        "phonetic": "/ˈtaɪərd/"
      },
      {
        "en": "Yawn",
        "vi": "Yawn",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Quiet",
        "vi": "Yên lặng / Khẽ khẽ",
        "emoji": "🤫",
        "phonetic": "/ˈkwaɪ.ət/"
      },
      {
        "en": "Hug",
        "vi": "Ôm ấp yêu thương",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      },
      {
        "en": "Kiss",
        "vi": "Nụ hôn / Thơm",
        "emoji": "💋",
        "phonetic": "/kɪs/"
      },
      {
        "en": "Love",
        "vi": "Love",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Sweet dreams",
        "vi": "Sweet dreams",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-tyduafy7",
    "title": "Brush Your Teeth Song with Ms Rachel and Elmo - Timer - Kids Songs and Nursery Rhymes",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "tYDuAfY77Do",
    "duration": "15 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Toothbrush",
        "vi": "Bàn chải đánh răng",
        "emoji": "🪥",
        "phonetic": "/ˈtuːθ.brʌʃ/"
      },
      {
        "en": "Toothpaste",
        "vi": "Kem đánh răng",
        "emoji": "🧴",
        "phonetic": "/ˈtuːθ.peɪst/"
      },
      {
        "en": "Brush",
        "vi": "Chải / Đánh răng",
        "emoji": "🪥",
        "phonetic": "/brʌʃ/"
      },
      {
        "en": "Teeth",
        "vi": "Hàm răng",
        "emoji": "🦷",
        "phonetic": "/tiːθ/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Rinse",
        "vi": "Rinse",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Sparkle",
        "vi": "Sparkle",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "White",
        "vi": "Màu trắng",
        "emoji": "⬜",
        "phonetic": "/waɪt/"
      },
      {
        "en": "Morning",
        "vi": "Morning",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Two minutes",
        "vi": "Two minutes",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Healthy",
        "vi": "Healthy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Tongue",
        "vi": "Chiếc lưỡi",
        "emoji": "👅",
        "phonetic": "/tʌŋ/"
      },
      {
        "en": "Mouth",
        "vi": "Cái miệng",
        "emoji": "👄",
        "phonetic": "/maʊθ/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɒʃ/"
      },
      {
        "en": "Towel",
        "vi": "Khăn tắm",
        "emoji": "🧖",
        "phonetic": "/ˈtaʊ.əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-hohrqpi9",
    "title": "Learn Numbers, Colors, Counting and Shapes with Ms Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "hOHrqPI9bVk",
    "duration": "45 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Orange",
        "vi": "Màu cam",
        "emoji": "🟧",
        "phonetic": "/ˈɒr.ɪndʒ/"
      },
      {
        "en": "Purple",
        "vi": "Màu tím",
        "emoji": "🟪",
        "phonetic": "/ˈpɜːr.pəl/"
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Star",
        "vi": "Hình ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Heart",
        "vi": "Hình trái tim",
        "emoji": "💖",
        "phonetic": "/hɑːrt/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      },
      {
        "en": "Stack",
        "vi": "Stack",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-1v3dk41c",
    "title": "Phonics Song + More Kids Songs & Nursery Rhymes - Learn Letter Sounds - Videos for Kids - Ms Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "1v3Dk41C_10",
    "duration": "20 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Learn",
        "vi": "Learn",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-7siu3eow",
    "title": "Videos for Toddlers - Preschool Learning Video - Happy Birthday Song Circle Time Special",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "7siu3eOW1VQ",
    "duration": "1 giờ",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Cake",
        "vi": "Bánh sinh nhật",
        "emoji": "🎂",
        "phonetic": "/keɪk/"
      },
      {
        "en": "Candle",
        "vi": "Candle",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Blow",
        "vi": "Blow",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Birthday",
        "vi": "Birthday",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Party",
        "vi": "Party",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Balloon",
        "vi": "Quả bóng bay",
        "emoji": "🎈",
        "phonetic": "/bəˈluːn/"
      },
      {
        "en": "Gift",
        "vi": "Gift",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Friends",
        "vi": "Friends",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Calendar",
        "vi": "Calendar",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Weather",
        "vi": "Weather",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Rain",
        "vi": "Cơn mưa",
        "emoji": "🌧️",
        "phonetic": "/reɪn/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Hug",
        "vi": "Ôm ấp yêu thương",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      },
      {
        "en": "Love",
        "vi": "Love",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-yqyemziw",
    "title": "Caterpillar Song - Kids Songs and Nursery Rhymes - Songs for Toddlers - Ms Rachel Songs on YouTube",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "yQyEmZIw1e8",
    "duration": "20 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    "parentTip": "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    "keyVocab": [
      {
        "en": "Caterpillar",
        "vi": "Caterpillar",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Butterfly",
        "vi": "Butterfly",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Wings",
        "vi": "Wings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fly",
        "vi": "Fly",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Crawl",
        "vi": "Crawl",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Leaf",
        "vi": "Leaf",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Cocoon",
        "vi": "Cocoon",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Grow",
        "vi": "Grow",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Colors",
        "vi": "Colors",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Beautiful",
        "vi": "Beautiful",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Nature",
        "vi": "Nature",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Garden",
        "vi": "Garden",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Big",
        "vi": "To lớn",
        "emoji": "🐘",
        "phonetic": "/bɪɡ/"
      },
      {
        "en": "Small",
        "vi": "Bé nhỏ",
        "emoji": "🐭",
        "phonetic": "/smɔːl/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-g0di8dp9",
    "title": "Addition!",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "G0Di8DP9f8w",
    "duration": "20 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "numberblocks-xoixrxhp",
    "title": "@Numberblocks - Orange Level Two Episodes 🟠",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "xOiXRxHprpQ",
    "duration": "20 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "numberblocks-yj5p0ugr",
    "title": "Number Adventures",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "yj5p0-uGR5U",
    "duration": "15 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-jtmyd2gq",
    "title": "Counting Fruit! 🍎 🍊 🍐",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "jtMYD2gqlNA",
    "duration": "15 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-fvyqpqwj",
    "title": "Numberblocks",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "FVYqpqWj4SE",
    "duration": "1 giờ",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-wgh5z8nu",
    "title": "Multiplication for Kids Compilation - Best Times Tables Tricks!",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "W_GH5z8Nuoc",
    "duration": "25 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-edrhu1yv",
    "title": "🏆 Epic Number Race! 🏆",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "EdrHU1yVBHM",
    "duration": "20 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-qdsun96e",
    "title": "Second Grade Math - Learn To Count!",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "QdSUN96eQKY",
    "duration": "10 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-h2fqfabf",
    "title": "Numberblocks Vacation Fun!",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "H2FqfAbf1bM",
    "duration": "30 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-gnvljowv",
    "title": "🛠️Building All Numberblocks 1 to 10: Learn and Play Together Level 1🔢",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "GnVLJowv6eU",
    "duration": "1 giờ",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-oifnymax",
    "title": "Fractions are a Piece of Cake!",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "oIFNyMAXvyc",
    "duration": "25 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-cxclqzg3",
    "title": "The Pyramid of Puzzles - Full Episode",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "cXclqZG393E",
    "duration": "45 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Toán tư duy",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    "parentTip": "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số 1",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số 2",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số 3",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số 4",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số 5",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Six",
        "vi": "Số 6",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Seven",
        "vi": "Số 7",
        "emoji": "7️⃣",
        "phonetic": "/ˈsev.ən/"
      },
      {
        "en": "Eight",
        "vi": "Số 8",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Nine",
        "vi": "Số 9",
        "emoji": "9️⃣",
        "phonetic": "/naɪn/"
      },
      {
        "en": "Ten",
        "vi": "Số 10",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Số 20",
        "emoji": "🔢",
        "phonetic": "/ˈtwen.ti/"
      },
      {
        "en": "Thirty",
        "vi": "Số 30",
        "emoji": "🔢",
        "phonetic": "/ˈθɜːr.ti/"
      },
      {
        "en": "Fifty",
        "vi": "Số 50",
        "emoji": "🔢",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Hundred",
        "vi": "Số 100",
        "emoji": "💯",
        "phonetic": "/ˈhʌn.drəd/"
      },
      {
        "en": "Count",
        "vi": "Đếm số",
        "emoji": "🔢",
        "phonetic": "/kaʊnt/"
      },
      {
        "en": "Add",
        "vi": "Cộng thêm",
        "emoji": "➕",
        "phonetic": "/æd/"
      },
      {
        "en": "Subtract",
        "vi": "Trừ bớt",
        "emoji": "➖",
        "phonetic": "/səbˈtrækt/"
      },
      {
        "en": "Equals",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəlz/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "👥",
        "phonetic": "/per/"
      },
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Pattern",
        "vi": "Quy luật",
        "emoji": "🧩",
        "phonetic": "/ˈpæt.ərn/"
      },
      {
        "en": "Blocks",
        "vi": "Khối xếp hình",
        "emoji": "🧱",
        "phonetic": "/blɒks/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-2kpxzoaf",
    "title": "On",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "2kpxZOAfOrI",
    "duration": "1 giờ",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "alphablocks-xg4gwt8n",
    "title": "The Alphabet From A - Z",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "xg4_gWt8N_Q",
    "duration": "15 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "alphablocks-xjsvrq6j",
    "title": "Writing Made Easy",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "xJSVrq-6-jc",
    "duration": "10 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-y9viy2ok",
    "title": "My First ABC's",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "Y9vIY2Okowc",
    "duration": "30 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-s7ljgdcx",
    "title": "Awesome Alphabet",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "s7LjGDcXqcs",
    "duration": "1 giờ",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-xyxxzgbb",
    "title": "📖 Reading Made Easy 👍",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "xYxxzGbBYpE",
    "duration": "15 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-gb4prdzp",
    "title": "The New Years Reading Challenge 📚",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "gb4prd-Zpv0",
    "duration": "30 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-yjqfoacq",
    "title": "📖 SH CH and TH- Letter Teams with Alphablock H 📖",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "YjQFOACQdms",
    "duration": "15 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-8pkq1xuo",
    "title": "Band Together 🥁 🎤",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "8pKq1xU_ox4",
    "duration": "1 giờ",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-qoihcoo8",
    "title": "Letter Names and Their Sounds",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "QOihCOo897g",
    "duration": "30 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-qpcbbgh2",
    "title": "Alphablocks",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "qPCbB-gH2Ew",
    "duration": "15 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-bscgkbbx",
    "title": "A-Z",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "BScgKbbxObk",
    "duration": "45 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    "parentTip": "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm (A, E, I, O, U)",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      },
      {
        "en": "Blend",
        "vi": "Ghép các âm",
        "emoji": "🧩",
        "phonetic": "/blend/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Book",
        "vi": "Quyển sách",
        "emoji": "📖",
        "phonetic": "/bʊk/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-nzwm6f0c",
    "title": "Back to School with Caitie's Classroom",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "NZWM6f0cA90",
    "duration": "30 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "caities-classroom-t6mbszku",
    "title": "Caitie Visits Backstage At An Emma & Lachy from The Wiggles Concert!",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "t6mBszkU-Xo",
    "duration": "25 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "caities-classroom-ceomep3w",
    "title": "Underwater Animal Adventure",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "cEOmEp3w0P0",
    "duration": "1 giờ",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Crab",
        "vi": "Chú cua",
        "emoji": "🦀",
        "phonetic": "/kræb/"
      },
      {
        "en": "Octopus",
        "vi": "Bạch tuộc",
        "emoji": "🐙",
        "phonetic": "/ˈɒk.tə.pəs/"
      },
      {
        "en": "Jellyfish",
        "vi": "Con sứa",
        "emoji": "🪼",
        "phonetic": "/ˈdʒel.i.fɪʃ/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-hrvysktn",
    "title": "Here Comes The Firetruck + More",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "hrvYskTnoJs",
    "duration": "25 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-aelyhlzf",
    "title": "Fire Truck Fun!",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "aELyhlZF8_w",
    "duration": "30 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-hi63z3wn",
    "title": "Can You Dance And Stop?",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "Hi63z3wn9n8",
    "duration": "15 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-fwf62rns",
    "title": "Buzzing Bees",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "FWf62RnS-AY",
    "duration": "1 giờ",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-bzzfrqsm",
    "title": "Community Helpers",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "BzzFRQsmb74",
    "duration": "45 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-khr8zxxq",
    "title": "1 Hour of Vehicles Songs and Episodes for Preschool",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "khr8ZXxq7yE",
    "duration": "25 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-gfozwy57",
    "title": "Boom Chicka Boom!",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "_gFOZW_y57c",
    "duration": "20 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-wkc7h0ub",
    "title": "Froggy Fun",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "wKC7h0uBFV4",
    "duration": "45 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Feelings",
        "vi": "Feelings",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Excited",
        "vi": "Hào hứng",
        "emoji": "🤩",
        "phonetic": "/ɪkˈsaɪ.tɪd/"
      },
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🟥",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟨",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟩",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Color",
        "vi": "Color",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⚪",
        "phonetic": "/ˈsɜːr.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "⏹️",
        "phonetic": "/skwer/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "🔺",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ər/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caities-classroom-limbigin",
    "title": "The Farmer In The Dell",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "liMbi-GiN4c",
    "duration": "30 phút",
    "category": "world",
    "categoryNameVi": "Khám phá thế giới",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    "parentTip": "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-ify35sjc",
    "title": "Healthy Habits! Kids Songs to Help Build Daily Routines from Super Simple Songs",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "_ify35SJcrI",
    "duration": "25 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "super-simple-4xlqpriw",
    "title": "This Is The Way",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "4XLQpRI_wOQ",
    "duration": "10 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "super-simple-gmjm0dcn",
    "title": "Our Favorite Kids Songs About Good Habits",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "gm_jm0DcNQk",
    "duration": "25 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-kddg2m1e",
    "title": "The Alphabet Is So Much Fun",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "kDdg2M1_EuE",
    "duration": "1 giờ",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-slvt8bwa",
    "title": "Do You Have A Crayon? + More",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "SLVT8bWayY0",
    "duration": "30 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-diom7o1u",
    "title": "Our Favorite Songs About Pets",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "dIom7O1Uowg",
    "duration": "1 giờ",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-8lu587o8",
    "title": "The Hand Washing Song 🧼",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "8lu587o8T3c",
    "duration": "25 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɒʃ/"
      },
      {
        "en": "Soap",
        "vi": "Bánh xà phòng",
        "emoji": "🧼",
        "phonetic": "/soʊp/"
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Towel",
        "vi": "Khăn tắm",
        "emoji": "🧖",
        "phonetic": "/ˈtaʊ.əl/"
      },
      {
        "en": "Brush",
        "vi": "Chải / Đánh răng",
        "emoji": "🪥",
        "phonetic": "/brʌʃ/"
      },
      {
        "en": "Teeth",
        "vi": "Hàm răng",
        "emoji": "🦷",
        "phonetic": "/tiːθ/"
      },
      {
        "en": "Toothbrush",
        "vi": "Bàn chải đánh răng",
        "emoji": "🪥",
        "phonetic": "/ˈtuːθ.brʌʃ/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-mcronbh3",
    "title": "Doctor Doctor + More",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "MCronBH3E58",
    "duration": "10 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-kgcjqbiz",
    "title": "First We Wash Our Hands",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "KgCjQBIZ-BM",
    "duration": "25 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɒʃ/"
      },
      {
        "en": "Soap",
        "vi": "Bánh xà phòng",
        "emoji": "🧼",
        "phonetic": "/soʊp/"
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Towel",
        "vi": "Khăn tắm",
        "emoji": "🧖",
        "phonetic": "/ˈtaʊ.əl/"
      },
      {
        "en": "Brush",
        "vi": "Chải / Đánh răng",
        "emoji": "🪥",
        "phonetic": "/brʌʃ/"
      },
      {
        "en": "Teeth",
        "vi": "Hàm răng",
        "emoji": "🦷",
        "phonetic": "/tiːθ/"
      },
      {
        "en": "Toothbrush",
        "vi": "Bàn chải đánh răng",
        "emoji": "🪥",
        "phonetic": "/ˈtuːθ.brʌʃ/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-wcioxvlg",
    "title": "Brush Your Teeth",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "wCio_xVlgQ0",
    "duration": "25 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɒʃ/"
      },
      {
        "en": "Soap",
        "vi": "Bánh xà phòng",
        "emoji": "🧼",
        "phonetic": "/soʊp/"
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Towel",
        "vi": "Khăn tắm",
        "emoji": "🧖",
        "phonetic": "/ˈtaʊ.əl/"
      },
      {
        "en": "Brush",
        "vi": "Chải / Đánh răng",
        "emoji": "🪥",
        "phonetic": "/brʌʃ/"
      },
      {
        "en": "Teeth",
        "vi": "Hàm răng",
        "emoji": "🦷",
        "phonetic": "/tiːθ/"
      },
      {
        "en": "Toothbrush",
        "vi": "Bàn chải đánh răng",
        "emoji": "🪥",
        "phonetic": "/ˈtuːθ.brʌʃ/"
      },
      {
        "en": "Smile",
        "vi": "Mỉm cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-hvyxhmy7",
    "title": "The Bath Song",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "HVYXHMY7wvo",
    "duration": "1 giờ",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-jbfb33kh",
    "title": "Put On Your Shoes",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "-jBfb33_KHU",
    "duration": "10 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen & Cảm xúc",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    "parentTip": "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    "keyVocab": [
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Toys",
        "vi": "Toys",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Room",
        "vi": "Room",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🆘",
        "phonetic": "/help/"
      },
      {
        "en": "Family",
        "vi": "Gia đình",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/ˈfæm.əl.i/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Mama",
        "vi": "Mẹ",
        "emoji": "👩",
        "phonetic": "/ˈmɑː.mə/"
      },
      {
        "en": "Dada",
        "vi": "Bố",
        "emoji": "👨",
        "phonetic": "/ˈdæd.ə/"
      },
      {
        "en": "Grandma",
        "vi": "Bà",
        "emoji": "👵",
        "phonetic": "/ˈɡræn.mɑː/"
      },
      {
        "en": "Grandpa",
        "vi": "Ông",
        "emoji": "👴",
        "phonetic": "/ˈɡræn.pɑː/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Sleep",
        "vi": "Đi ngủ",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Bed",
        "vi": "Chiếc giường",
        "emoji": "🛏️",
        "phonetic": "/bed/"
      },
      {
        "en": "Night",
        "vi": "Night",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-uqdmftrr",
    "title": "Sharks in the Water 2: Rise of the Shark King! 🦈 Floor is Lava Game",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "uqD_MftRRx4",
    "duration": "30 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Crab",
        "vi": "Chú cua",
        "emoji": "🦀",
        "phonetic": "/kræb/"
      },
      {
        "en": "Octopus",
        "vi": "Bạch tuộc",
        "emoji": "🐙",
        "phonetic": "/ˈɒk.tə.pəs/"
      },
      {
        "en": "Jellyfish",
        "vi": "Con sứa",
        "emoji": "🪼",
        "phonetic": "/ˈdʒel.i.fɪʃ/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": true
  },
  {
    "id": "danny-go-dsupverz",
    "title": "\"The Wiggle Dance!\" 🪱 /// Danny Go! Brain Break Songs for Kids",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "DsUPVERZFlI",
    "duration": "45 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": true
  },
  {
    "id": "danny-go-ebbh6umn",
    "title": "“Burning ENERGY!” ⚡️ Don’t-Stop-Moving Challenge",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "ebBH6umnDPE",
    "duration": "15 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-r7oxuth5",
    "title": "\"Flamingo FRENZY!\" Dance Game 🦩🌴 Red Light, Green Light Brain Break",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "R7OxutH5AZY",
    "duration": "25 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-oofongvb",
    "title": "“Escape From Tiger Island!” (Jungle Adventure) 🐅🌴 Floor is Lava Game",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "oOfoNGVbVSU",
    "duration": "10 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-j0xh9fns",
    "title": "The Floor is Quicksand: Pyramid Adventure! 🐪 🐍 Floor is Lava Dance Game",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "j0XH9FNSwHg",
    "duration": "25 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-rtxyvegw",
    "title": "\"Don't Stop Digging!\" 💎⛏️ Gemstone Mine Adventure",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "RTxYve-GwzM",
    "duration": "15 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-ua3ncivu",
    "title": "\"Bouncing Time!\" Dance Song 🐰",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "u-A3nCIvUGs",
    "duration": "1 giờ",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-uld1l6c1",
    "title": "\"The Millipede March!\" Bug Dance 🐛🐞 Insect Brain Break",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "U_Ld1L6c1p4",
    "duration": "20 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-xkzkphjx",
    "title": "The Balloon Pop Dance Game! 🎈💥",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "xkZkPhJX2JA",
    "duration": "15 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-nxuqxgqh",
    "title": "\"Gorilla Smash!\" Drum-Along Dance 🦍🥁 Brain Break",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "nXUQxgQHX8E",
    "duration": "30 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-nvdle3fh",
    "title": "\"The Stomp Clap Dance Song\" 👏🏼/// Danny Go! Kids Songs",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "nvDLe3FHcuY",
    "duration": "20 phút",
    "category": "movement",
    "categoryNameVi": "Vận động & Vui nhộn",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    "parentTip": "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    "keyVocab": [
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Freeze",
        "vi": "Đóng băng / Bất động",
        "emoji": "🥶",
        "phonetic": "/friːz/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Spin",
        "vi": "Xoay vòng",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân",
        "emoji": "🦶",
        "phonetic": "/stɒmp/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Energy",
        "vi": "Energy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Walk",
        "vi": "Đi bộ",
        "emoji": "🚶",
        "phonetic": "/wɔːk/"
      },
      {
        "en": "Twist",
        "vi": "Lắc hông / Xoay người",
        "emoji": "🌀",
        "phonetic": "/twɪst/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy nhót",
        "emoji": "🐰",
        "phonetic": "/hɒp/"
      },
      {
        "en": "Fire",
        "vi": "Ngọn lửa",
        "emoji": "🔥",
        "phonetic": "/ˈfaɪ.ər/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Lava",
        "vi": "Nham thạch",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh giá",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Hot",
        "vi": "Nóng bức",
        "emoji": "🔥",
        "phonetic": "/hɒt/"
      },
      {
        "en": "Safe",
        "vi": "Safe",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "High",
        "vi": "High",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-x6uqqjq4",
    "title": "Best Steve and Maggie Magic Stories for Kids of 2020",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "X6uqqJQ4Tno",
    "duration": "1 giờ",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Hide",
        "vi": "Hide",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Seek",
        "vi": "Seek",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "steve-maggie-lvhayozd",
    "title": "Halloween Monsters for Kids with Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "LvhayOzDX-E",
    "duration": "10 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Hide",
        "vi": "Hide",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Seek",
        "vi": "Seek",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": true
  },
  {
    "id": "steve-maggie-l4mml2vc",
    "title": "Healthy Food for Kids with Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "L4mml2vcrTs",
    "duration": "10 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Hide",
        "vi": "Hide",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Seek",
        "vi": "Seek",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-3du7xkyz",
    "title": "Monster Ice Cream Van for Kids with Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "3du7xKy-ZJs",
    "duration": "15 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Hide",
        "vi": "Hide",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Seek",
        "vi": "Seek",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-vrq4jkjg",
    "title": "🎉 Something BIG is coming... HUGE NEWS! Steve and Maggie are coming to Netflix UK! 🇬🇧✨",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "VRQ4JkJG_OA",
    "duration": "30 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Hide",
        "vi": "Hide",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Seek",
        "vi": "Seek",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-sts8ljrr",
    "title": "Construction Toy Vehicles for Kids with Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "STS8lJrrpaE",
    "duration": "15 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-fllbrii5",
    "title": "Camping Fun with Toy Animals from Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "flLbrIi5U-s",
    "duration": "25 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-uz7snydm",
    "title": "Hide and Seek Magic with Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "uZ7sNYDmrys",
    "duration": "20 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Hide",
        "vi": "Hide",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Seek",
        "vi": "Seek",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-uo9pdgis",
    "title": "Sea Animals with Pirate Steve and Maggie!",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "uO9PdGiSys8",
    "duration": "20 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Zebra",
        "vi": "Ngựa vằn",
        "emoji": "🦓",
        "phonetic": "/ˈziː.brə/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Chú ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Chú heo",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      },
      {
        "en": "Sheep",
        "vi": "Chú cừu",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Chú vịt",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Bird",
        "vi": "Chú chim",
        "emoji": "🐦",
        "phonetic": "/bɜːrd/"
      },
      {
        "en": "Hippo",
        "vi": "Hà mã",
        "emoji": "🦛",
        "phonetic": "/ˈhɪp.oʊ/"
      },
      {
        "en": "Rhino",
        "vi": "Tê giác",
        "emoji": "🦏",
        "phonetic": "/ˈraɪ.noʊ/"
      },
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.tə/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi",
        "emoji": "🐳",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɒl.fɪn/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/siː ˈtɜːr.təl/"
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Crab",
        "vi": "Chú cua",
        "emoji": "🦀",
        "phonetic": "/kræb/"
      },
      {
        "en": "Octopus",
        "vi": "Bạch tuộc",
        "emoji": "🐙",
        "phonetic": "/ˈɒk.tə.pəs/"
      },
      {
        "en": "Jellyfish",
        "vi": "Con sứa",
        "emoji": "🪼",
        "phonetic": "/ˈdʒel.i.fɪʃ/"
      },
      {
        "en": "Swim",
        "vi": "Swim",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Water",
        "vi": "Nước uống",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-l5ly0g5o",
    "title": "Magic Toy Car, Holiday Fun for Kids with Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "L5LY0g5ONaY",
    "duration": "30 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-ltkfhjay",
    "title": "Spooky Halloween House with Steve and Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "lTKfHjAyQQs",
    "duration": "45 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Eat",
        "vi": "Ăn ngoan",
        "emoji": "🍽️",
        "phonetic": "/iːt/"
      },
      {
        "en": "Play",
        "vi": "Chơi đùa",
        "emoji": "🧸",
        "phonetic": "/pleɪ/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Hide",
        "vi": "Hide",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Seek",
        "vi": "Seek",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Friend",
        "vi": "Người bạn",
        "emoji": "🤝",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-3wdrpj7d",
    "title": "Steve in a Halloween Haunted House! 🎃🕷️ Go Away, Scary Spiders! #shorts #steveandmaggie🧍‍♂️",
    "channel": "Steve & Maggie",
    "channelAvatar": "🎩",
    "channelColor": "#EC4899",
    "youtubeId": "-3wdrPJ7D90",
    "duration": "15 phút",
    "category": "speech",
    "categoryNameVi": "Tập nói & Giao tiếp",
    "categoryEmoji": "🗣️",
    "recommendedAge": "3-5 tuổi",
    "description": "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    "parentTip": "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    "keyVocab": [
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Safari",
        "vi": "Safari",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Zoo",
        "vi": "Zoo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Magic",
        "vi": "Magic",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Look",
        "vi": "Nhìn xem",
        "emoji": "👀",
        "phonetic": "/lʊk/"
      },
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Funny",
        "vi": "Funny",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Elephant",
        "vi": "Chú voi",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ",
        "emoji": "🐵",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Tiger",
        "vi": "Con hổ",
        "emoji": "🐯",
        "phonetic": "/ˈtaɪ.ɡər/"
      },
      {
        "en": "Toy",
        "vi": "Toy",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-idzlqwjj",
    "title": "Oxford Phonics World student book level 1 - the alphabet - disc 1 - unit 1 - Letter A- ant alligator",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "iDZlQwjJvVw",
    "duration": "25 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": true
  },
  {
    "id": "oxford-phonics-sidiyeho",
    "title": "Oxford Phonics World student book level 2 - short vowels - disc 1 - intro - ABC Song",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "SiDiyEhobBk",
    "duration": "45 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": true
  },
  {
    "id": "oxford-phonics-0bvawepd",
    "title": "Oxford Phonics World student book level 2 - short vowels - disc 1 - unit 1 - short a - a - ant cat",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "0bvAWePdvTY",
    "duration": "10 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-pdyavrxc",
    "title": "Oxford Phonics World student book level 4 - Consonant Blends - disc 1 - intro",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "_PdyavRXcRI",
    "duration": "1 giờ",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-reprfoi4",
    "title": "Oxford Phonics World student book level 4 - Consonant blends - disc 1 - unit 1 - bl cl - black clock",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "REpRFOI4S8I",
    "duration": "30 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-9n9xsrjt",
    "title": "Oxford Phonics World student book level 3 - long vowels - disc 1 - intro",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "9n9xsRJTlTc",
    "duration": "30 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-mrnhmz5o",
    "title": "Oxford Phonics World student book level 3 - long vowels - disc 1 - unit 1 - long a - a_e - tape mane",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "mrnHmz5o8oY",
    "duration": "15 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-qjsddkgi",
    "title": "Oxford Phonics World student book level 5 - Letter Combinations - disc 1 - intro",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "QjSddkGID_E",
    "duration": "30 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-tw8lqzyz",
    "title": "Oxford Phonics World student book level 5 - Letter Combinations - disc 1 - Unit 1 - ar - car star",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "tW8lQzyzYLI",
    "duration": "20 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Bus",
        "vi": "Xe buýt",
        "emoji": "🚌",
        "phonetic": "/bʌs/"
      },
      {
        "en": "Car",
        "vi": "Xe hơi",
        "emoji": "🚗",
        "phonetic": "/kɑːr/"
      },
      {
        "en": "Truck",
        "vi": "Xe tải",
        "emoji": "🚚",
        "phonetic": "/trʌk/"
      },
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Boat",
        "vi": "Thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɒp/"
      },
      {
        "en": "Go",
        "vi": "Đi tiếp / Tiến lên",
        "emoji": "🟢",
        "phonetic": "/ɡoʊ/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh nhẹn",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Chậm chạp",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-obj0qjyp",
    "title": "the alphabet -Letter A",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "obJ0QJYpvmY",
    "duration": "20 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-lyslwl38",
    "title": "the alphabet -Letter B",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "lYSLWl388p4",
    "duration": "20 phút",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "oxford-phonics-xd289is2",
    "title": "Oxford Phonics World student book1 - the alphabet - disc2 - review4 - letters s t u v w x y z - song",
    "channel": "Oxford Phonics",
    "channelAvatar": "📖",
    "channelColor": "#06B6D4",
    "youtubeId": "XD289Is2PMQ",
    "duration": "1 giờ",
    "category": "phonics",
    "categoryNameVi": "Phonics & Chữ cái",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    "parentTip": "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    "keyVocab": [
      {
        "en": "Letter A",
        "vi": "Chữ A (Âm /æ/)",
        "emoji": "🅰️",
        "phonetic": "/ˈlet.ər eɪ/"
      },
      {
        "en": "Letter B",
        "vi": "Chữ B (Âm /b/)",
        "emoji": "🅱️",
        "phonetic": "/ˈlet.ər biː/"
      },
      {
        "en": "Letter C",
        "vi": "Chữ C (Âm /k/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər siː/"
      },
      {
        "en": "Letter D",
        "vi": "Chữ D (Âm /d/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər diː/"
      },
      {
        "en": "Letter E",
        "vi": "Chữ E (Âm /e/)",
        "emoji": "🔤",
        "phonetic": "/ˈlet.ər iː/"
      },
      {
        "en": "Phonics",
        "vi": "Ngữ âm đánh vần",
        "emoji": "🔤",
        "phonetic": "/ˈfɒn.ɪks/"
      },
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Spell",
        "vi": "Đánh vần từng chữ",
        "emoji": "✍️",
        "phonetic": "/spel/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "📝",
        "phonetic": "/wɜːrd/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Rhyme",
        "vi": "Từ có vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      },
      {
        "en": "Apple",
        "vi": "Quả táo",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əl/"
      },
      {
        "en": "Ball",
        "vi": "Quả bóng",
        "emoji": "⚽",
        "phonetic": "/bɔːl/"
      },
      {
        "en": "Cat",
        "vi": "Chú mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Dog",
        "vi": "Chú chó",
        "emoji": "🐶",
        "phonetic": "/dɔːɡ/"
      },
      {
        "en": "Egg",
        "vi": "Egg",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Fish",
        "vi": "Chú cá",
        "emoji": "🐟",
        "phonetic": "/fɪʃ/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🧢",
        "phonetic": "/hæt/"
      },
      {
        "en": "Igloo",
        "vi": "Igloo",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Jet",
        "vi": "Jet",
        "emoji": "✨",
        "phonetic": ""
      },
      {
        "en": "Kite",
        "vi": "Kite",
        "emoji": "✨",
        "phonetic": ""
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-the-excavator",
    "title": "Blippi The Excavator & Construction Vehicles",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "r20Q0_5qZ8c",
    "duration": "18 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Blippi giới thiệu máy xúc đất khổng lồ, cần cẩu và cách bánh xích hoạt động trên công trường đầy màu sắc.",
    "parentTip": "Ba mẹ hãy hỏi bé: Máy xúc có cần gì để đào đất? Cùng bé làm động tác múc đất nhé!",
    "keyVocab": [
      {
        "en": "Excavator",
        "vi": "Máy xúc đất",
        "emoji": "🚜",
        "phonetic": "/ˈek.skə.veɪ.tər/"
      },
      {
        "en": "Bucket",
        "vi": "Gàu xúc",
        "emoji": "🪣",
        "phonetic": "/ˈbʌk.ɪt/"
      },
      {
        "en": "Dirt",
        "vi": "Đất cát",
        "emoji": "🏜️",
        "phonetic": "/dɜːrt/"
      },
      {
        "en": "Tracks",
        "vi": "Bánh xích",
        "emoji": "⚙️",
        "phonetic": "/træks/"
      },
      {
        "en": "Tractor",
        "vi": "Máy cày",
        "emoji": "🚜",
        "phonetic": "/ˈtræk.tər/"
      },
      {
        "en": "Dig",
        "vi": "Đào bới",
        "emoji": "⛏️",
        "phonetic": "/dɪɡ/"
      },
      {
        "en": "Construction",
        "vi": "Công trường",
        "emoji": "🏗️",
        "phonetic": "/kənˈstrʌk.ʃən/"
      },
      {
        "en": "Hard Hat",
        "vi": "Mũ bảo hộ",
        "emoji": "⛑️",
        "phonetic": "/ˈhɑːrd hæt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-fire-truck-station",
    "title": "Blippi Explores a Real Fire Truck & Fire Station",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "wZ96F8xR9f4",
    "duration": "22 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Thăm trạm cứu hỏa thực tế, khám phá vòi rồng phun nước, thang cứu hộ và còi xe inh ỏi cùng Blippi.",
    "parentTip": "Nhắc nhở bé số điện thoại cứu hỏa và tầm quan trọng của việc không nghịch lửa.",
    "keyVocab": [
      {
        "en": "Fire Truck",
        "vi": "Xe cứu hỏa",
        "emoji": "🚒",
        "phonetic": "/ˈfaɪər trʌk/"
      },
      {
        "en": "Firefighter",
        "vi": "Lính cứu hỏa",
        "emoji": "🧑‍🚒",
        "phonetic": "/ˈfaɪəˌfaɪ.tər/"
      },
      {
        "en": "Hose",
        "vi": "Vòi phun nước",
        "emoji": "🚿",
        "phonetic": "/hoʊz/"
      },
      {
        "en": "Ladder",
        "vi": "Cái thang",
        "emoji": "🪜",
        "phonetic": "/ˈlæd.ər/"
      },
      {
        "en": "Siren",
        "vi": "Còi báo động",
        "emoji": "🚨",
        "phonetic": "/ˈsaɪ.rən/"
      },
      {
        "en": "Water",
        "vi": "Nước dập lửa",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Boots",
        "vi": "Ủng cứu hộ",
        "emoji": "🥾",
        "phonetic": "/buːts/"
      },
      {
        "en": "Brave",
        "vi": "Dũng cảm",
        "emoji": "🦁",
        "phonetic": "/breɪv/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-police-car-adventure",
    "title": "Blippi Police Car & City Helpers",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "E5iK7K2r6kY",
    "duration": "16 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Tìm hiểu về xe cảnh sát tuần tra, huy hiệu cảnh sát và cách các chú cảnh sát bảo vệ an toàn cho thành phố.",
    "parentTip": "Dạy bé nhận biết chú cảnh sát để xin trợ giúp nếu chẳng may bị lạc ở nơi công cộng.",
    "keyVocab": [
      {
        "en": "Police Car",
        "vi": "Xe cảnh sát",
        "emoji": "🚓",
        "phonetic": "/pəˈliːs kɑːr/"
      },
      {
        "en": "Officer",
        "vi": "Sĩ quan cảnh sát",
        "emoji": "👮",
        "phonetic": "/ˈɑː.fɪ.sər/"
      },
      {
        "en": "Badge",
        "vi": "Huy hiệu",
        "emoji": "⭐",
        "phonetic": "/bædʒ/"
      },
      {
        "en": "Flashlight",
        "vi": "Đèn pin",
        "emoji": "🔦",
        "phonetic": "/ˈflæʃ.laɪt/"
      },
      {
        "en": "Radio",
        "vi": "Bộ đàm",
        "emoji": "📻",
        "phonetic": "/ˈreɪ.di.oʊ/"
      },
      {
        "en": "Safe",
        "vi": "An toàn",
        "emoji": "🛡️",
        "phonetic": "/seɪf/"
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ",
        "emoji": "🤝",
        "phonetic": "/help/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-sink-or-float-science",
    "title": "Blippi Sink or Float Science Experiment",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "e6G0dE97r8U",
    "duration": "20 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "3-5 tuổi",
    "description": "Thí nghiệm khoa học vui nhộn: Vật nào sẽ chìm, vật nào sẽ nổi trong nước? Kích thích tư duy phán đoán cho bé.",
    "parentTip": "Ba mẹ hãy lấy một chậu nước nhỏ và cùng bé thả quả bóng, thìa nhựa để bé tự đoán xem chìm hay nổi!",
    "keyVocab": [
      {
        "en": "Sink",
        "vi": "Chìm xuống",
        "emoji": "⚓",
        "phonetic": "/sɪŋk/"
      },
      {
        "en": "Float",
        "vi": "Nổi lên",
        "emoji": "🛟",
        "phonetic": "/floʊt/"
      },
      {
        "en": "Water",
        "vi": "Nước",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Heavy",
        "vi": "Nặng",
        "emoji": "🏋️",
        "phonetic": "/ˈhev.i/"
      },
      {
        "en": "Light",
        "vi": "Nhẹ",
        "emoji": "🪶",
        "phonetic": "/laɪt/"
      },
      {
        "en": "Experiment",
        "vi": "Thí nghiệm",
        "emoji": "🧪",
        "phonetic": "/ɪkˈsper.ə.mənt/"
      },
      {
        "en": "Guess",
        "vi": "Dự đoán",
        "emoji": "🤔",
        "phonetic": "/ɡes/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-dinosaur-safari",
    "title": "Blippi Dinosaur Safari & Fossil Digging",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "W9KqG33zQ_s",
    "duration": "25 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Du hành về thời tiền sử gặp gỡ khủng long bạo chúa T-Rex, Triceratops ba sừng và đào hóa thạch cổ xưa.",
    "parentTip": "Cùng bé bắt chước tiếng gầm gừ của T-Rex và bước chân nặng nề dậm đất rầm rập!",
    "keyVocab": [
      {
        "en": "Dinosaur",
        "vi": "Khủng long",
        "emoji": "🦖",
        "phonetic": "/ˈdaɪ.nə.sɔːr/"
      },
      {
        "en": "Fossil",
        "vi": "Hóa thạch",
        "emoji": "🦴",
        "phonetic": "/ˈfɑː.səl/"
      },
      {
        "en": "T-Rex",
        "vi": "Khủng long bạo chúa",
        "emoji": "🦖",
        "phonetic": "/ˈtiː reks/"
      },
      {
        "en": "Triceratops",
        "vi": "Khủng long ba sừng",
        "emoji": "🦕",
        "phonetic": "/traɪˈser.ə.tɑːps/"
      },
      {
        "en": "Roar",
        "vi": "Tiếng gầm",
        "emoji": "🦁",
        "phonetic": "/rɔːr/"
      },
      {
        "en": "Footprint",
        "vi": "Dấu chân",
        "emoji": "👣",
        "phonetic": "/ˈfʊt.prɪnt/"
      },
      {
        "en": "Tail",
        "vi": "Cái đuôi",
        "emoji": "🦎",
        "phonetic": "/teɪl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-garbage-truck-recycle",
    "title": "Blippi Learns About Garbage Trucks & Recycling",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "kZ4l1s_98oQ",
    "duration": "17 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "3-5 tuổi",
    "description": "Khám phá cánh tay cơ học của xe rác nâng thùng lên cao và bài học bảo vệ môi trường, phân loại rác tái chế.",
    "parentTip": "Khuyến khích bé vứt rác đúng nơi quy định và phân biệt rác nhựa với vỏ hộp giấy.",
    "keyVocab": [
      {
        "en": "Garbage Truck",
        "vi": "Xe rác",
        "emoji": "🚛",
        "phonetic": "/ˈɡɑːr.bɪdʒ trʌk/"
      },
      {
        "en": "Recycle",
        "vi": "Tái chế",
        "emoji": "♻️",
        "phonetic": "/ˌriːˈsaɪ.kəl/"
      },
      {
        "en": "Trash Can",
        "vi": "Thùng rác",
        "emoji": "🗑️",
        "phonetic": "/ˈtræʃ kæn/"
      },
      {
        "en": "Clean",
        "vi": "Sạch sẽ",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Paper",
        "vi": "Giấy",
        "emoji": "📄",
        "phonetic": "/ˈpeɪ.pər/"
      },
      {
        "en": "Plastic",
        "vi": "Đồ nhựa",
        "emoji": "🥤",
        "phonetic": "/ˈplæs.tɪk/"
      },
      {
        "en": "Earth",
        "vi": "Trái Đất",
        "emoji": "🌍",
        "phonetic": "/ɜːrθ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-helicopter-flight",
    "title": "Blippi Flies in a Helicopter & Airport Fun",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "U7x_q9qR7tA",
    "duration": "21 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Blippi đeo tai nghe phi công, bước lên trực thăng ngắm thành phố từ trên cao và quan sát cánh quạt quay tít.",
    "parentTip": "Bé sẽ rất thích thú khi được dang tay như cánh máy bay lượn vòng quanh phòng khách.",
    "keyVocab": [
      {
        "en": "Helicopter",
        "vi": "Trực thăng",
        "emoji": "🚁",
        "phonetic": "/ˈhel.əˌkɑːp.tər/"
      },
      {
        "en": "Propeller",
        "vi": "Cánh quạt",
        "emoji": "🌀",
        "phonetic": "/prəˈpel.ər/"
      },
      {
        "en": "Pilot",
        "vi": "Phi công",
        "emoji": "👨‍✈️",
        "phonetic": "/ˈpaɪ.lət/"
      },
      {
        "en": "Fly",
        "vi": "Bay lượn",
        "emoji": "🦅",
        "phonetic": "/flaɪ/"
      },
      {
        "en": "Sky",
        "vi": "Bầu trời",
        "emoji": "☁️",
        "phonetic": "/skaɪ/"
      },
      {
        "en": "High",
        "vi": "Trên cao",
        "emoji": "🏔️",
        "phonetic": "/haɪ/"
      },
      {
        "en": "Headset",
        "vi": "Tai nghe phi công",
        "emoji": "🎧",
        "phonetic": "/ˈhed.set/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-aquarium-sea-animals",
    "title": "Blippi Explores Sea Animals at the Aquarium",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "u6N9o4_7eLt",
    "duration": "19 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "0-3 tuổi",
    "description": "Ngắm nhìn cá đuối bay dưới nước, cá mập bơi lượn và rùa biển khổng lồ trong đường hầm thủy cung kỳ thú.",
    "parentTip": "Cùng bé đếm số chú cá bơi qua lại và gọi tên các màu sắc rực rỡ của san hô.",
    "keyVocab": [
      {
        "en": "Aquarium",
        "vi": "Thủy cung",
        "emoji": "🐠",
        "phonetic": "/əˈkwer.i.əm/"
      },
      {
        "en": "Stingray",
        "vi": "Cá đuối",
        "emoji": "🐡",
        "phonetic": "/ˈstɪŋ.reɪ/"
      },
      {
        "en": "Shark",
        "vi": "Cá mập",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/ˈsiː ˌtɝː.t̬əl/"
      },
      {
        "en": "Jellyfish",
        "vi": "Con sứa",
        "emoji": "🪼",
        "phonetic": "/ˈdʒel.i.fɪʃ/"
      },
      {
        "en": "Swim",
        "vi": "Bơi lội",
        "emoji": "🏊",
        "phonetic": "/swɪm/"
      },
      {
        "en": "Ocean",
        "vi": "Đại dương",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-farm-tractor-animals",
    "title": "Blippi on a Farm with Tractors, Cows & Horses",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "d9Q3o_11pKs",
    "duration": "24 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "0-3 tuổi",
    "description": "Khám phá cuộc sống thanh bình ngoài nông trại: lái máy kéo chở cỏ khô, cho bò ăn và vuốt ve ngựa con.",
    "parentTip": "Hỏi bé xem máy cày nông trại màu gì và động vật nào thích ăn cỏ khô.",
    "keyVocab": [
      {
        "en": "Farm",
        "vi": "Trang trại",
        "emoji": "🚜",
        "phonetic": "/fɑːrm/"
      },
      {
        "en": "Tractor",
        "vi": "Máy kéo",
        "emoji": "🚜",
        "phonetic": "/ˈtræk.tər/"
      },
      {
        "en": "Cow",
        "vi": "Con bò sữa",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Horse",
        "vi": "Con ngựa",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Hay",
        "vi": "Cỏ khô",
        "emoji": "🌾",
        "phonetic": "/heɪ/"
      },
      {
        "en": "Barn",
        "vi": "Nhà kho trang trại",
        "emoji": "🛖",
        "phonetic": "/bɑːrn/"
      },
      {
        "en": "Feed",
        "vi": "Cho ăn",
        "emoji": "🥕",
        "phonetic": "/fiːd/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "blippi-indoor-playground-colors",
    "title": "Blippi at the Indoor Playground - Colors & Numbers",
    "channel": "Blippi",
    "channelAvatar": "🚜",
    "channelColor": "#F97316",
    "youtubeId": "m5V2e_88zQx",
    "duration": "18 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Vui chơi trong nhà banh rực rỡ, leo trèo vượt chướng ngại vật và trượt cầu trượt xoắn ốc cùng Blippi.",
    "parentTip": "Khuyến khích bé đếm số bóng màu xanh, màu đỏ và tập nhảy cao tại chỗ theo Blippi.",
    "keyVocab": [
      {
        "en": "Playground",
        "vi": "Khu vui chơi",
        "emoji": "🛝",
        "phonetic": "/ˈpleɪ.ɡraʊnd/"
      },
      {
        "en": "Slide",
        "vi": "Cầu trượt",
        "emoji": "🛝",
        "phonetic": "/slaɪd/"
      },
      {
        "en": "Ball Pit",
        "vi": "Bể bóng",
        "emoji": "🔴",
        "phonetic": "/ˈbɔːl pɪt/"
      },
      {
        "en": "Climb",
        "vi": "Leo trèo",
        "emoji": "🧗",
        "phonetic": "/klaɪm/"
      },
      {
        "en": "Jump",
        "vi": "Nhảy lên",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Tunnel",
        "vi": "Đường hầm",
        "emoji": "🚇",
        "phonetic": "/ˈtʌn.əl/"
      },
      {
        "en": "Fun",
        "vi": "Vui vẻ",
        "emoji": "🎉",
        "phonetic": "/fʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-fiona-fire-engine",
    "title": "Gecko Fixes Fiona Fire Engine at the Garage",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "hZ3F1eR8r5Q",
    "duration": "11 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Bác thợ Gecko dùng cờ lê và thiết bị thông minh để thay lốp mới cho xe cứu hỏa Fiona sẵn sàng làm nhiệm vụ.",
    "parentTip": "Giúp bé làm quen với các dụng cụ sửa chữa đơn giản như cờ lê, tuốc nơ vít.",
    "keyVocab": [
      {
        "en": "Wrench",
        "vi": "Cờ lê",
        "emoji": "🔧",
        "phonetic": "/rentʃ/"
      },
      {
        "en": "Tire",
        "vi": "Lốp xe",
        "emoji": "🛞",
        "phonetic": "/ˈtaɪ.ər/"
      },
      {
        "en": "Fix",
        "vi": "Sửa chữa",
        "emoji": "🛠️",
        "phonetic": "/fɪks/"
      },
      {
        "en": "Garage",
        "vi": "Gara xe",
        "emoji": "🏠",
        "phonetic": "/ɡəˈrɑːʒ/"
      },
      {
        "en": "Engine",
        "vi": "Động cơ",
        "emoji": "⚙️",
        "phonetic": "/ˈen.dʒɪn/"
      },
      {
        "en": "Mechanical",
        "vi": "Cơ khí",
        "emoji": "🔩",
        "phonetic": "/məˈkæn.ɪ.kəl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-max-monster-truck",
    "title": "Gecko & Max the Monster Truck in the Mud",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "s3R9o4_7eLt",
    "duration": "13 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Xe bán tải khổng lồ Max vượt đầm lầy bùn lầy lội và quay về gara Gecko để tắm rửa sạch bong.",
    "parentTip": "Bé rất hào hứng với bánh xe to đùng! Cùng bé vẽ một chiếc xe monster truck nhé.",
    "keyVocab": [
      {
        "en": "Monster Truck",
        "vi": "Xe tải khổng lồ",
        "emoji": "🛻",
        "phonetic": "/ˈmɑːn.stɚ trʌk/"
      },
      {
        "en": "Mud",
        "vi": "Vũng bùn",
        "emoji": "💩",
        "phonetic": "/mʌd/"
      },
      {
        "en": "Giant Wheels",
        "vi": "Bánh xe khổng lồ",
        "emoji": "🛞",
        "phonetic": "/ˈdʒaɪ.ənt wiːlz/"
      },
      {
        "en": "Wash",
        "vi": "Rửa sạch",
        "emoji": "🧼",
        "phonetic": "/wɑːʃ/"
      },
      {
        "en": "Soap",
        "vi": "Xà phòng",
        "emoji": "🫧",
        "phonetic": "/soʊp/"
      },
      {
        "en": "Splash",
        "vi": "Bắn nước tung tóe",
        "emoji": "💦",
        "phonetic": "/splæʃ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-ice-cream-van",
    "title": "Gecko Repairs the Broken Ice Cream Van",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "p8Q3o_11pKs",
    "duration": "12 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Chiếc xe bán kem bị hỏng máy phát nhạc và tủ lạnh làm kem tan chảy, bác Gecko liền ra tay sửa chữa!",
    "parentTip": "Hỏi bé vị kem yêu thích: dâu tây, vani hay sô cô la?",
    "keyVocab": [
      {
        "en": "Ice Cream",
        "vi": "Kem mát lạnh",
        "emoji": "🍦",
        "phonetic": "/ˌaɪs ˈkriːm/"
      },
      {
        "en": "Van",
        "vi": "Xe tải nhỏ",
        "emoji": "🚐",
        "phonetic": "/væn/"
      },
      {
        "en": "Cold",
        "vi": "Lạnh buốt",
        "emoji": "❄️",
        "phonetic": "/koʊld/"
      },
      {
        "en": "Melt",
        "vi": "Tan chảy",
        "emoji": "🫠",
        "phonetic": "/melt/"
      },
      {
        "en": "Music",
        "vi": "Âm nhạc vui nhộn",
        "emoji": "🎶",
        "phonetic": "/ˈmjuː.zɪk/"
      },
      {
        "en": "Strawberry",
        "vi": "Dâu tây",
        "emoji": "🍓",
        "phonetic": "/ˈstrɔːˌber.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-amber-ambulance",
    "title": "Gecko Rescues Amber the Ambulance",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "z5V2e_88zQx",
    "duration": "14 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Xe cứu thương Amber bị kẹt bên vệ đường, Gecko lái xe cứu hộ kéo Amber về kiểm tra bình ắc quy.",
    "parentTip": "Giải thích cho bé biết xe cứu thương luôn được ưu tiên nhường đường khi có còi hú.",
    "keyVocab": [
      {
        "en": "Ambulance",
        "vi": "Xe cấp cứu",
        "emoji": "🚑",
        "phonetic": "/ˈæm.bjə.ləns/"
      },
      {
        "en": "Battery",
        "vi": "Bình ắc quy",
        "emoji": "🔋",
        "phonetic": "/ˈbæt̬.ɚ.i/"
      },
      {
        "en": "Rescue",
        "vi": "Cứu hộ",
        "emoji": "🛟",
        "phonetic": "/ˈres.kjuː/"
      },
      {
        "en": "Tow Truck",
        "vi": "Xe kéo cứu hộ",
        "emoji": "🚛",
        "phonetic": "/ˈtoʊ trʌk/"
      },
      {
        "en": "Fast",
        "vi": "Nhanh chóng",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Hospital",
        "vi": "Bệnh viện",
        "emoji": "🏥",
        "phonetic": "/ˈhɑː.spɪ.t̬əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-helicopter-helen",
    "title": "Gecko and Helen the Flying Helicopter",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "w1Z_90xQ4Qw",
    "duration": "10 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Trực thăng cứu hộ Helen cần bôi trơn cánh quạt trước khi bay lên đỉnh núi tuyết giải cứu người bạn nhỏ.",
    "parentTip": "Bé hãy làm tiếng phành phạch của cánh quạt trực thăng quay tít nhé!",
    "keyVocab": [
      {
        "en": "Helicopter",
        "vi": "Trực thăng",
        "emoji": "🚁",
        "phonetic": "/ˈhel.əˌkɑːp.tər/"
      },
      {
        "en": "Oil",
        "vi": "Dầu nhớt bôi trơn",
        "emoji": "🛢️",
        "phonetic": "/ɔɪl/"
      },
      {
        "en": "Spin",
        "vi": "Quay tròn",
        "emoji": "🔄",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Mountain",
        "vi": "Ngọn núi",
        "emoji": "⛰️",
        "phonetic": "/ˈmaʊn.tən/"
      },
      {
        "en": "Snow",
        "vi": "Tuyết trắng",
        "emoji": "❄️",
        "phonetic": "/snoʊ/"
      },
      {
        "en": "Landing",
        "vi": "Hạ cánh",
        "emoji": "🛬",
        "phonetic": "/ˈlæn.dɪŋ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-colors-and-cars",
    "title": "Gecko Learns Colors with Colorful Racing Cars",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "b2K_88pLs91",
    "duration": "12 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái & Màu sắc",
    "categoryEmoji": "🔤",
    "recommendedAge": "0-3 tuổi",
    "description": "Những chiếc xe đua sơn màu đỏ, vàng, xanh biển, cam chạy qua trạm sơn tự động đổi màu rực rỡ.",
    "parentTip": "Chỉ tay vào từng chiếc xe và hỏi bé tên màu sắc bằng tiếng Anh.",
    "keyVocab": [
      {
        "en": "Red Car",
        "vi": "Xe màu đỏ",
        "emoji": "🚗",
        "phonetic": "/red kɑːr/"
      },
      {
        "en": "Blue Car",
        "vi": "Xe màu xanh",
        "emoji": "🚙",
        "phonetic": "/bluː kɑːr/"
      },
      {
        "en": "Yellow Car",
        "vi": "Xe màu vàng",
        "emoji": "🚕",
        "phonetic": "/ˈjel.oʊ kɑːr/"
      },
      {
        "en": "Green Car",
        "vi": "Xe màu xanh lá",
        "emoji": "🏎️",
        "phonetic": "/ɡriːn kɑːr/"
      },
      {
        "en": "Paint",
        "vi": "Sơn màu",
        "emoji": "🎨",
        "phonetic": "/peɪnt/"
      },
      {
        "en": "Race",
        "vi": "Đua xe",
        "emoji": "🏁",
        "phonetic": "/reɪs/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-school-bus-bobby",
    "title": "Gecko Fixes Bobby the Big Yellow School Bus",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "c3L_77zQe12",
    "duration": "15 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "3-5 tuổi",
    "description": "Bác xe buýt trường học Bobby có cửa đóng mở tự động và các hàng ghế xinh xắn chở học sinh đến trường.",
    "parentTip": "Cùng bé hát theo giai điệu The Wheels on the Bus quen thuộc.",
    "keyVocab": [
      {
        "en": "School Bus",
        "vi": "Xe buýt trường học",
        "emoji": "🚌",
        "phonetic": "/ˈskuːl ˌbʌs/"
      },
      {
        "en": "Door",
        "vi": "Cánh cửa",
        "emoji": "🚪",
        "phonetic": "/dɔːr/"
      },
      {
        "en": "Seat",
        "vi": "Ghế ngồi",
        "emoji": "💺",
        "phonetic": "/siːt/"
      },
      {
        "en": "Children",
        "vi": "Các bạn nhỏ",
        "emoji": "👧👦",
        "phonetic": "/ˈtʃɪl.drən/"
      },
      {
        "en": "School",
        "vi": "Trường học",
        "emoji": "🏫",
        "phonetic": "/skuːl/"
      },
      {
        "en": "Wheels",
        "vi": "Bánh xe",
        "emoji": "🛞",
        "phonetic": "/wiːlz/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "gecko-car-wash-machine",
    "title": "Gecko's Sparkling Clean Car Wash Machine",
    "channel": "Gecko's Garage",
    "channelAvatar": "🦎",
    "channelColor": "#10B981",
    "youtubeId": "d4M_66xPr34",
    "duration": "13 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Trải nghiệm đường hầm rửa xe tự động với bọt xà phòng cầu vồng và chổi lăn xốp xoay tròn vui mắt.",
    "parentTip": "Dạy bé thói quen giữ gìn đồ chơi sạch sẽ, rửa tay trước khi ăn và sau khi chơi.",
    "keyVocab": [
      {
        "en": "Car Wash",
        "vi": "Tiệm rửa xe",
        "emoji": "🚿",
        "phonetic": "/ˈkɑːr ˌwɑːʃ/"
      },
      {
        "en": "Bubbles",
        "vi": "Bong bóng xà phòng",
        "emoji": "🫧",
        "phonetic": "/ˈbʌb.əlz/"
      },
      {
        "en": "Brush",
        "vi": "Chổi lăn",
        "emoji": "🪥",
        "phonetic": "/brʌʃ/"
      },
      {
        "en": "Dryer",
        "vi": "Máy sấy khô",
        "emoji": "💨",
        "phonetic": "/ˈdraɪ.ɚ/"
      },
      {
        "en": "Shiny",
        "vi": "Sáng bóng",
        "emoji": "✨",
        "phonetic": "/ˈʃaɪ.ni/"
      },
      {
        "en": "Water",
        "vi": "Tia nước",
        "emoji": "💦",
        "phonetic": "/ˈwɔː.tər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-why-sky-blue",
    "title": "Why Is the Sky Blue? - Science for Kids",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "bcM_w2qQy4Q",
    "duration": "5 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "4-6 tuổi",
    "description": "Giải thích trực quan vì sao bầu trời lại có màu xanh dương tuyệt đẹp vào ban ngày và chuyển cam đỏ khi hoàng hôn.",
    "parentTip": "Khi đi dạo buổi chiều, cùng bé ngước nhìn bầu trời và quan sát màu sắc thay đổi.",
    "keyVocab": [
      {
        "en": "Sky",
        "vi": "Bầu trời",
        "emoji": "☁️",
        "phonetic": "/skaɪ/"
      },
      {
        "en": "Sunlight",
        "vi": "Ánh sáng mặt trời",
        "emoji": "☀️",
        "phonetic": "/ˈsʌn.laɪt/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🟦",
        "phonetic": "/bluː/"
      },
      {
        "en": "Atmosphere",
        "vi": "Khí quyển",
        "emoji": "🌐",
        "phonetic": "/ˈæt.məs.fɪr/"
      },
      {
        "en": "Rainbow",
        "vi": "Cầu vồng",
        "emoji": "🌈",
        "phonetic": "/ˈreɪn.boʊ/"
      },
      {
        "en": "Sunset",
        "vi": "Hoàng hôn",
        "emoji": "🌇",
        "phonetic": "/ˈsʌn.set/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-solar-system-planets",
    "title": "Explore the Solar System and 8 Planets",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "libKVRa01L8",
    "duration": "6 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "4-6 tuổi",
    "description": "Khám phá 8 hành tinh quay quanh Mặt Trời: Sao Thủy, Sao Kim, Trái Đất quê hương, Sao Hỏa đỏ rực và Sao Mộc khổng lồ.",
    "parentTip": "Bé rất thích Sao Thổ có vành đai lấp lánh! Cùng bé vẽ hệ mặt trời nhé.",
    "keyVocab": [
      {
        "en": "Planet",
        "vi": "Hành tinh",
        "emoji": "🪐",
        "phonetic": "/ˈplæn.ɪt/"
      },
      {
        "en": "Solar System",
        "vi": "Hệ Mặt Trời",
        "emoji": "🌌",
        "phonetic": "/ˈsoʊ.lɚ ˌsɪs.təm/"
      },
      {
        "en": "Earth",
        "vi": "Trái Đất",
        "emoji": "🌍",
        "phonetic": "/ɜːrθ/"
      },
      {
        "en": "Mars",
        "vi": "Sao Hỏa",
        "emoji": "🔴",
        "phonetic": "/mɑːrz/"
      },
      {
        "en": "Saturn",
        "vi": "Sao Thổ",
        "emoji": "🪐",
        "phonetic": "/ˈsæt̬.ɚn/"
      },
      {
        "en": "Sun",
        "vi": "Mặt Trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Orbit",
        "vi": "Quỹ đạo quay",
        "emoji": "🔄",
        "phonetic": "/ˈɔːr.bɪt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-how-plants-grow",
    "title": "How Do Seeds Grow into Big Plants?",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "tkFPyue5X3Q",
    "duration": "5 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "3-5 tuổi",
    "description": "Theo dõi hạt mầm nhỏ bé đâm chồi, mọc rễ sâu dưới đất và vươn lên đón ánh nắng mặt trời ấm áp.",
    "parentTip": "Ba mẹ có thể cho bé thử gieo hạt đậu xanh vào bông gòn ướt và theo dõi cây nảy mầm mỗi ngày.",
    "keyVocab": [
      {
        "en": "Seed",
        "vi": "Hạt mầm",
        "emoji": "🌱",
        "phonetic": "/siːd/"
      },
      {
        "en": "Root",
        "vi": "Rễ cây",
        "emoji": "🥕",
        "phonetic": "/ruːt/"
      },
      {
        "en": "Leaf",
        "vi": "Chiếc lá",
        "emoji": "🍃",
        "phonetic": "/liːf/"
      },
      {
        "en": "Water",
        "vi": "Tưới nước",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Sunlight",
        "vi": "Nắng ấm",
        "emoji": "☀️",
        "phonetic": "/ˈsʌn.laɪt/"
      },
      {
        "en": "Grow",
        "vi": "Lớn lên",
        "emoji": "🌲",
        "phonetic": "/ɡroʊ/"
      },
      {
        "en": "Soil",
        "vi": "Đất trồng",
        "emoji": "🪴",
        "phonetic": "/sɔɪl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-dinosaur-fossils-study",
    "title": "How Did Dinosaurs Become Fossils?",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "3rkGu0BItKM",
    "duration": "5 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "4-6 tuổi",
    "description": "Các nhà khảo cổ học tìm thấy xương khủng long hóa thạch sâu dưới lòng đất như thế nào?",
    "parentTip": "Cùng bé đóng giả nhà thám hiểm cầm cọ quét bụi trên các mô hình đồ chơi.",
    "keyVocab": [
      {
        "en": "Fossil",
        "vi": "Hóa thạch",
        "emoji": "🦴",
        "phonetic": "/ˈfɑː.səl/"
      },
      {
        "en": "Bone",
        "vi": "Khung xương",
        "emoji": "🦴",
        "phonetic": "/boʊn/"
      },
      {
        "en": "Scientist",
        "vi": "Nhà khoa học",
        "emoji": "🧑‍🔬",
        "phonetic": "/ˈsaɪən.tɪst/"
      },
      {
        "en": "Rock",
        "vi": "Hòn đá",
        "emoji": "🪨",
        "phonetic": "/rɑːk/"
      },
      {
        "en": "Museum",
        "vi": "Bảo tàng",
        "emoji": "🏛️",
        "phonetic": "/mjuːˈziː.əm/"
      },
      {
        "en": "Discovery",
        "vi": "Phát hiện kỳ thú",
        "emoji": "🔍",
        "phonetic": "/dɪˈskʌv.ɚ.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-human-heart-beat",
    "title": "How Does Your Beating Heart Work?",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "p-fq22ew_jc",
    "duration": "5 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "3-5 tuổi",
    "description": "Đặt tay lên ngực trái cảm nhận trái tim đập thình thịch bơm máu nuôi khắp cơ thể bé khỏe mạnh.",
    "parentTip": "Bảo bé nhảy 10 cái rồi đặt tay lên ngực để thấy tim đập nhanh hơn nhé!",
    "keyVocab": [
      {
        "en": "Heart",
        "vi": "Trái tim",
        "emoji": "❤️",
        "phonetic": "/hɑːrt/"
      },
      {
        "en": "Beat",
        "vi": "Nhịp đập thình thịch",
        "emoji": "💓",
        "phonetic": "/biːt/"
      },
      {
        "en": "Blood",
        "vi": "Dòng máu",
        "emoji": "🩸",
        "phonetic": "/blʌd/"
      },
      {
        "en": "Pump",
        "vi": "Bơm máu",
        "emoji": "⛽",
        "phonetic": "/pʌmp/"
      },
      {
        "en": "Strong",
        "vi": "Khỏe mạnh",
        "emoji": "💪",
        "phonetic": "/strɑːŋ/"
      },
      {
        "en": "Exercise",
        "vi": "Tập thể dục",
        "emoji": "🏃",
        "phonetic": "/ˈek.sɚ.saɪz/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-volcanoes-erupt",
    "title": "What Inside Causes a Volcano to Erupt?",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "lAmqsMQG3RM",
    "duration": "6 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "4-6 tuổi",
    "description": "Khám phá dòng dung nham nóng đỏ sâu trong lòng núi lửa và cách áp suất tạo nên vụ phun trào kỳ vĩ.",
    "parentTip": "Giải thích cho bé núi lửa là hiện tượng tự nhiên kỳ thú của Trái Đất.",
    "keyVocab": [
      {
        "en": "Volcano",
        "vi": "Núi lửa",
        "emoji": "🌋",
        "phonetic": "/vɑːlˈkeɪ.noʊ/"
      },
      {
        "en": "Lava",
        "vi": "Dung nham nóng chảy",
        "emoji": "🔥",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Erupt",
        "vi": "Phun trào",
        "emoji": "💥",
        "phonetic": "/ɪˈrʌpt/"
      },
      {
        "en": "Hot",
        "vi": "Rất nóng",
        "emoji": "🥵",
        "phonetic": "/hɑːt/"
      },
      {
        "en": "Mountain",
        "vi": "Ngọn núi",
        "emoji": "⛰️",
        "phonetic": "/ˈmaʊn.tən/"
      },
      {
        "en": "Ash",
        "vi": "Tro bụi",
        "emoji": "💨",
        "phonetic": "/æʃ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-rainbows-colors",
    "title": "How Are Beautiful Rainbows Made?",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "nCPPLhPTAIk",
    "duration": "5 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "3-5 tuổi",
    "description": "Khi ánh nắng mặt trời chiếu qua những hạt mưa tí hon, chúng tách thành dải 7 sắc cầu vồng rực rỡ chân trời.",
    "parentTip": "Cùng bé kể tên 7 màu cầu vồng: Đỏ, Cam, Vàng, Lục, Lam, Chàm, Tím.",
    "keyVocab": [
      {
        "en": "Rainbow",
        "vi": "Cầu vồng",
        "emoji": "🌈",
        "phonetic": "/ˈreɪn.boʊ/"
      },
      {
        "en": "Raindrops",
        "vi": "Hạt mưa",
        "emoji": "🌧️",
        "phonetic": "/ˈreɪn.drɑːps/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Colors",
        "vi": "Màu sắc",
        "emoji": "🎨",
        "phonetic": "/ˈkʌl.ɚz/"
      },
      {
        "en": "Light",
        "vi": "Ánh sáng",
        "emoji": "💡",
        "phonetic": "/laɪt/"
      },
      {
        "en": "Prism",
        "vi": "Lăng kính",
        "emoji": "💎",
        "phonetic": "/ˈprɪz.əm/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "scishow-deep-ocean-mystery",
    "title": "Creatures Living in the Deep Dark Sea",
    "channel": "SciShow Kids",
    "channelAvatar": "🔬",
    "channelColor": "#06B6D4",
    "youtubeId": "UwVNkfCov1k",
    "duration": "6 phút",
    "category": "science",
    "categoryNameVi": "Khoa học nhí",
    "categoryEmoji": "🔬",
    "recommendedAge": "4-6 tuổi",
    "description": "Lặn xuống đáy đại dương sâu thẳm khám phá loài cá biết phát sáng, mực khổng lồ và thế giới biển kỳ bí.",
    "parentTip": "Hỏi bé có biết loài cá nào tự phát ra ánh sáng trong bóng tối không?",
    "keyVocab": [
      {
        "en": "Deep Sea",
        "vi": "Biển sâu",
        "emoji": "🌊",
        "phonetic": "/diːp siː/"
      },
      {
        "en": "Glow",
        "vi": "Phát sáng",
        "emoji": "✨",
        "phonetic": "/ɡloʊ/"
      },
      {
        "en": "Creature",
        "vi": "Sinh vật biển",
        "emoji": "🦑",
        "phonetic": "/ˈkriː.tʃɚ/"
      },
      {
        "en": "Dark",
        "vi": "Tối tăm",
        "emoji": "🌑",
        "phonetic": "/dɑːrk/"
      },
      {
        "en": "Submarine",
        "vi": "Tàu ngầm",
        "emoji": "🚤",
        "phonetic": "/ˌsʌb.məˈriːn/"
      },
      {
        "en": "Anglerfish",
        "vi": "Cá lồng đèn",
        "emoji": "🐡",
        "phonetic": "/ˈæŋ.ɡlɚ.fɪʃ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-cement-mixer",
    "title": "Leo the Truck Builds a Cement Mixer",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "b9X_40tK5Uw",
    "duration": "14 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Xe tải Leo thu thập các khối hình 3D để lắp ráp thành chiếc xe trộn bê tông xoay tròn thùng chứa.",
    "parentTip": "Bé sẽ học được tư duy lắp ghép từng bộ phận xe: khung xe, bánh xe, cabin và thùng quay.",
    "keyVocab": [
      {
        "en": "Cement Mixer",
        "vi": "Xe trộn bê tông",
        "emoji": "🚛",
        "phonetic": "/sɪˈment ˈmɪk.sɚ/"
      },
      {
        "en": "Drum",
        "vi": "Thùng quay tròn",
        "emoji": "🥁",
        "phonetic": "/drʌm/"
      },
      {
        "en": "Wheels",
        "vi": "Bánh xe",
        "emoji": "🛞",
        "phonetic": "/wiːlz/"
      },
      {
        "en": "Build",
        "vi": "Lắp ráp xây dựng",
        "emoji": "🧱",
        "phonetic": "/bɪld/"
      },
      {
        "en": "Cabin",
        "vi": "Buồng lái",
        "emoji": "🪟",
        "phonetic": "/ˈkæb.ɪn/"
      },
      {
        "en": "Rotate",
        "vi": "Xoay vòng tròn",
        "emoji": "🔄",
        "phonetic": "/ˈroʊ.teɪt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-passenger-airplane",
    "title": "Leo the Truck Builds a Jumbo Passenger Airplane",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "e7L2o_88zQx",
    "duration": "16 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Leo tìm thấy thân máy bay, hai cánh dài, đuôi và hai động cơ phản lực để ráp thành chiếc phi cơ cất cánh.",
    "parentTip": "Bảo bé chỉ vào cánh máy bay và cửa sổ sổ máy bay trên màn hình.",
    "keyVocab": [
      {
        "en": "Airplane",
        "vi": "Máy bay",
        "emoji": "✈️",
        "phonetic": "/ˈer.pleɪn/"
      },
      {
        "en": "Wings",
        "vi": "Đôi cánh",
        "emoji": "🪽",
        "phonetic": "/wɪŋz/"
      },
      {
        "en": "Jet Engine",
        "vi": "Động cơ phản lực",
        "emoji": "🚀",
        "phonetic": "/ˈdʒet ˌen.dʒɪn/"
      },
      {
        "en": "Runway",
        "vi": "Đường băng cất cánh",
        "emoji": "🛫",
        "phonetic": "/ˈrʌn.weɪ/"
      },
      {
        "en": "Tail",
        "vi": "Đuôi máy bay",
        "emoji": "🛩️",
        "phonetic": "/teɪl/"
      },
      {
        "en": "Window",
        "vi": "Cửa sổ",
        "emoji": "🪟",
        "phonetic": "/ˈwɪn.doʊ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-steam-train",
    "title": "Leo Builds a Steam Train & Railway Tracks",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "k3N9p_11eLt",
    "duration": "15 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Đoàn tàu hỏa xình xịch nhả khói trắng chạy trên đường ray uốn lượn do Leo và bạn bè cùng nhau đặt từng thanh ray.",
    "parentTip": "Cùng bé bắt chước tiếng còi tàu: Tu tu xình xịch!",
    "keyVocab": [
      {
        "en": "Train",
        "vi": "Tàu hỏa",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Tracks",
        "vi": "Đường ray",
        "emoji": "🛤️",
        "phonetic": "/træks/"
      },
      {
        "en": "Steam",
        "vi": "Hơi nước khói trắng",
        "emoji": "💨",
        "phonetic": "/stiːm/"
      },
      {
        "en": "Whistle",
        "vi": "Còi tàu tu tu",
        "emoji": "📢",
        "phonetic": "/ˈwɪs.əl/"
      },
      {
        "en": "Carriage",
        "vi": "Toa tàu",
        "emoji": "🚃",
        "phonetic": "/ˈker.ɪdʒ/"
      },
      {
        "en": "Station",
        "vi": "Nhà ga xe lửa",
        "emoji": "🚉",
        "phonetic": "/ˈsteɪ.ʃən/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-fast-race-cars",
    "title": "Leo Builds Fast Sports Cars on the Racetrack",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "w8Q2o_55xPr",
    "duration": "13 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Lắp ráp chiếc xe đua công thức 1 có cánh gió khí động học và bánh xe thể thao bám đường cực êm.",
    "parentTip": "Bé học phân biệt xe chạy chậm như xe lu và xe chạy nhanh vút như xe đua.",
    "keyVocab": [
      {
        "en": "Race Car",
        "vi": "Xe đua thể thao",
        "emoji": "🏎️",
        "phonetic": "/ˈreɪs ˌkɑːr/"
      },
      {
        "en": "Spoiler",
        "vi": "Cánh gió xe đua",
        "emoji": "🏁",
        "phonetic": "/ˈspɔɪ.lɚ/"
      },
      {
        "en": "Speed",
        "vi": "Tốc độ nhanh",
        "emoji": "💨",
        "phonetic": "/spiːd/"
      },
      {
        "en": "Finish Line",
        "vi": "Vạch đích",
        "emoji": "🏁",
        "phonetic": "/ˈfɪn.ɪʃ ˌlaɪn/"
      },
      {
        "en": "Champion",
        "vi": "Nhà vô địch",
        "emoji": "🏆",
        "phonetic": "/ˈtʃæm.pi.ən/"
      },
      {
        "en": "Helmet",
        "vi": "Mũ bảo hiểm",
        "emoji": "⛑️",
        "phonetic": "/ˈhel.mət/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-tower-crane",
    "title": "Leo and Skoop Build a Giant Tower Crane",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "z4V9e_22pKs",
    "duration": "14 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Cần cẩu tháp cao vút giúp nâng các thanh thép và vật liệu nặng lên cao để xây dựng những tòa nhà chọc trời.",
    "parentTip": "Bé có thể giơ tay thật cao biểu diễn chiếc cần cẩu nâng đồ vật.",
    "keyVocab": [
      {
        "en": "Crane",
        "vi": "Cần cẩu",
        "emoji": "🏗️",
        "phonetic": "/kreɪn/"
      },
      {
        "en": "Hook",
        "vi": "Móc cẩu",
        "emoji": "🪝",
        "phonetic": "/hʊk/"
      },
      {
        "en": "Cable",
        "vi": "Dây cáp thép",
        "emoji": "➰",
        "phonetic": "/ˈkeɪ.bəl/"
      },
      {
        "en": "Tall",
        "vi": "Cao lớn",
        "emoji": "🦒",
        "phonetic": "/tɔːl/"
      },
      {
        "en": "Lift",
        "vi": "Nâng lên cao",
        "emoji": "⬆️",
        "phonetic": "/lɪft/"
      },
      {
        "en": "Steel",
        "vi": "Thép xây dựng",
        "emoji": "🔩",
        "phonetic": "/stiːl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-fire-station-build",
    "title": "Leo the Truck Builds a City Fire Station",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "r6M3p_77kLx",
    "duration": "15 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Xây dựng trạm cứu hỏa hai tầng có cột trượt nhanh và cửa cuốn tự động để xe cứu hỏa xuất kích cứu người.",
    "parentTip": "Hỏi bé trạm cứu hỏa có màu gì và xe cứu hỏa đậu ở đâu.",
    "keyVocab": [
      {
        "en": "Fire Station",
        "vi": "Trạm cứu hỏa",
        "emoji": "🚒",
        "phonetic": "/ˈfaɪr ˌsteɪ.ʃən/"
      },
      {
        "en": "Pole",
        "vi": "Cột trượt nhanh",
        "emoji": "💈",
        "phonetic": "/poʊl/"
      },
      {
        "en": "Bell",
        "vi": "Chuông báo động",
        "emoji": "🔔",
        "phonetic": "/bel/"
      },
      {
        "en": "Red Brick",
        "vi": "Gạch đỏ",
        "emoji": "🧱",
        "phonetic": "/red brɪk/"
      },
      {
        "en": "Garage Door",
        "vi": "Cửa gara cuốn",
        "emoji": "🚪",
        "phonetic": "/ɡəˈrɑːʒ dɔːr/"
      },
      {
        "en": "Ready",
        "vi": "Sẵn sàng",
        "emoji": "✅",
        "phonetic": "/ˈred.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-3d-shapes-colors",
    "title": "Leo Learns Shapes & Colors with 3D Blocks",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "t1L8o_33zQe",
    "duration": "12 phút",
    "category": "math",
    "categoryNameVi": "Đếm số & Hình khối",
    "categoryEmoji": "🔢",
    "recommendedAge": "0-3 tuổi",
    "description": "Nhận biết khối lập phương, khối cầu, hình nón và kim tự tháp tam giác qua các khối đồ chơi 3D rực rỡ.",
    "parentTip": "Cùng bé tìm các đồ vật trong nhà có hình tròn (như cái đĩa) hoặc hình vuông (như chiếc khăn).",
    "keyVocab": [
      {
        "en": "Cube",
        "vi": "Khối lập phương",
        "emoji": "🧊",
        "phonetic": "/kjuːb/"
      },
      {
        "en": "Sphere",
        "vi": "Khối cầu tròn",
        "emoji": "⚽",
        "phonetic": "/sfɪr/"
      },
      {
        "en": "Cone",
        "vi": "Khối hình nón",
        "emoji": "🍦",
        "phonetic": "/koʊn/"
      },
      {
        "en": "Pyramid",
        "vi": "Kim tự tháp",
        "emoji": "🔺",
        "phonetic": "/ˈpɪr.ə.mɪd/"
      },
      {
        "en": "Circle",
        "vi": "Hình tròn",
        "emoji": "⭕",
        "phonetic": "/ˈsɝː.kəl/"
      },
      {
        "en": "Square",
        "vi": "Hình vuông",
        "emoji": "🔲",
        "phonetic": "/skwer/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "leo-truck-cargo-harbor-boat",
    "title": "Leo Builds a Cargo Ship in the Ocean Harbor",
    "channel": "Leo the Truck",
    "channelAvatar": "🚚",
    "channelColor": "#3B82F6",
    "youtubeId": "m5D9p_99xZ1",
    "duration": "15 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Lắp ráp chiếc tàu thủy chở hàng có mỏ neo bằng thép và các thùng công-ten-nơ chở hoa quả qua đại dương.",
    "parentTip": "Bé học được tàu thủy nổi trên mặt nước nhờ lực đẩy ac-si-met của nước.",
    "keyVocab": [
      {
        "en": "Cargo Ship",
        "vi": "Tàu chở hàng",
        "emoji": "🚢",
        "phonetic": "/ˈkɑːr.ɡoʊ ˌʃɪp/"
      },
      {
        "en": "Anchor",
        "vi": "Mỏ neo",
        "emoji": "⚓",
        "phonetic": "/ˈæŋ.kɚ/"
      },
      {
        "en": "Container",
        "vi": "Thùng công-ten-nơ",
        "emoji": "📦",
        "phonetic": "/kənˈteɪ.nɚ/"
      },
      {
        "en": "Harbor",
        "vi": "Cảng biển",
        "emoji": "⛵",
        "phonetic": "/ˈhɑːr.bɚ/"
      },
      {
        "en": "Wave",
        "vi": "Sóng biển",
        "emoji": "🌊",
        "phonetic": "/weɪv/"
      },
      {
        "en": "Lighthouse",
        "vi": "Ngọn hải đăng",
        "emoji": "🏮",
        "phonetic": "/ˈlaɪt.haʊs/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-cheetah-speed-champion",
    "title": "Cheetah: The Fastest Animal on Earth",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "hH5Hj06R_90",
    "duration": "4 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "3-5 tuổi",
    "description": "Xem báo săn Cheetah tăng tốc thần tốc trên đồng cỏ châu Phi với bước chạy dài và đôi mắt sắc bén.",
    "parentTip": "Hỏi bé có loài vật nào chạy nhanh hơn báo săn không? Hãy khuyến khích bé chạy nhanh tại chỗ!",
    "keyVocab": [
      {
        "en": "Cheetah",
        "vi": "Báo săn",
        "emoji": "🐆",
        "phonetic": "/ˈtʃiː.t̬ə/"
      },
      {
        "en": "Fast",
        "vi": "Chạy rất nhanh",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Spots",
        "vi": "Đốm đen trên lông",
        "emoji": "⚫",
        "phonetic": "/spɑːts/"
      },
      {
        "en": "Paws",
        "vi": "Bàn chân vuốt sắc",
        "emoji": "🐾",
        "phonetic": "/pɑːz/"
      },
      {
        "en": "Savanna",
        "vi": "Thảo nguyên",
        "emoji": "🌾",
        "phonetic": "/səˈvæn.ə/"
      },
      {
        "en": "Run",
        "vi": "Chạy",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-sea-turtle-journey",
    "title": "Journey of the Ocean Sea Turtles",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "7V1sZ9gQ44U",
    "duration": "5 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "3-5 tuổi",
    "description": "Hành trình diệu kỳ của rùa con vừa nở từ cát trắng chập chững bò xuống biển và bơi lội giữa ngàn trùng sóng.",
    "parentTip": "Dạy bé tình yêu thiên nhiên và ý thức bảo vệ bãi biển sạch không rác thải nhựa.",
    "keyVocab": [
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/ˈsiː ˌtɝː.t̬əl/"
      },
      {
        "en": "Shell",
        "vi": "Mai rùa",
        "emoji": "🛡️",
        "phonetic": "/ʃel/"
      },
      {
        "en": "Sand",
        "vi": "Bãi cát trắng",
        "emoji": "🏖️",
        "phonetic": "/sænd/"
      },
      {
        "en": "Hatch",
        "vi": "Nở ra từ trứng",
        "emoji": "🥚",
        "phonetic": "/hætʃ/"
      },
      {
        "en": "Flippers",
        "vi": "Vây bơi",
        "emoji": "🪽",
        "phonetic": "/ˈflɪp.ɚz/"
      },
      {
        "en": "Ocean",
        "vi": "Biển khơi",
        "emoji": "🌊",
        "phonetic": "/ˈoʊ.ʃən/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-polar-bear-cubs-arctic",
    "title": "Polar Bear Cubs in the Arctic Snow",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "x4K7o_99zQe",
    "duration": "4 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "0-3 tuổi",
    "description": "Hai chú gấu Bắc Cực con lông trắng tinh nghịch lăn lộn trên tuyết và học bơi trong làn nước đóng băng cùng mẹ.",
    "parentTip": "Bé sẽ thích thú khi thấy gấu con trượt tuyết bằng bụng. Cùng bé làm động tác bò của gấu nhé!",
    "keyVocab": [
      {
        "en": "Polar Bear",
        "vi": "Gấu Bắc Cực",
        "emoji": "🐻‍❄️",
        "phonetic": "/ˌpoʊ.lɚ ˈber/"
      },
      {
        "en": "Cub",
        "vi": "Gấu con",
        "emoji": "🧸",
        "phonetic": "/kʌb/"
      },
      {
        "en": "Snow",
        "vi": "Tuyết lạnh",
        "emoji": "❄️",
        "phonetic": "/snoʊ/"
      },
      {
        "en": "Ice",
        "vi": "Băng đá",
        "emoji": "🧊",
        "phonetic": "/aɪs/"
      },
      {
        "en": "Fur",
        "vi": "Bộ lông dày",
        "emoji": "🧶",
        "phonetic": "/fɝː/"
      },
      {
        "en": "Slide",
        "vi": "Trượt trên băng",
        "emoji": "⛷️",
        "phonetic": "/slaɪd/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-clever-dolphins-play",
    "title": "Clever Dolphins Playing in the Waves",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "b1M9p_33eLt",
    "duration": "5 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "0-3 tuổi",
    "description": "Đàn cá heo thông minh bật nhảy nhào lộn trên mặt biển và phát ra những tiếng huýt gọi nhau đáng yêu.",
    "parentTip": "Bật mí cho bé cá heo thở bằng lỗ thở trên đầu chứ không phải bằng mang như các loài cá khác!",
    "keyVocab": [
      {
        "en": "Dolphin",
        "vi": "Cá heo",
        "emoji": "🐬",
        "phonetic": "/ˈdɑːl.fɪn/"
      },
      {
        "en": "Jump",
        "vi": "Bật nhảy",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Clever",
        "vi": "Thông minh",
        "emoji": "🧠",
        "phonetic": "/ˈklev.ɚ/"
      },
      {
        "en": "Blowhole",
        "vi": "Lỗ thở",
        "emoji": "💨",
        "phonetic": "/ˈbloʊ.hoʊl/"
      },
      {
        "en": "Wave",
        "vi": "Làn sóng",
        "emoji": "🌊",
        "phonetic": "/weɪv/"
      },
      {
        "en": "Friendly",
        "vi": "Thân thiện",
        "emoji": "🥰",
        "phonetic": "/ˈfrend.li/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-giant-panda-bamboo",
    "title": "Baby Pandas Climbing Trees in China",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "z8Q2o_55xPr",
    "duration": "4 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "0-3 tuổi",
    "description": "Những chú gấu trúc tròn xoe vụng về tập trèo cây tre, ăn măng non và lăn lông lốc trên cỏ xanh.",
    "parentTip": "Gấu trúc rất thích ăn tre trúc! Hỏi bé gấu trúc có hai màu lông nào (Đen và Trắng).",
    "keyVocab": [
      {
        "en": "Giant Panda",
        "vi": "Gấu trúc lớn",
        "emoji": "🐼",
        "phonetic": "/ˌdʒaɪ.ənt ˈpæn.də/"
      },
      {
        "en": "Bamboo",
        "vi": "Cây tre cây trúc",
        "emoji": "🎋",
        "phonetic": "/bæmˈbuː/"
      },
      {
        "en": "Climb",
        "vi": "Trèo cây",
        "emoji": "🧗",
        "phonetic": "/klaɪm/"
      },
      {
        "en": "Roll",
        "vi": "Lăn tròn",
        "emoji": "🌀",
        "phonetic": "/roʊl/"
      },
      {
        "en": "Black and White",
        "vi": "Màu đen trắng",
        "emoji": "⚫⚪",
        "phonetic": "/blæk ənd waɪt/"
      },
      {
        "en": "Cute",
        "vi": "Đáng yêu",
        "emoji": "🥺",
        "phonetic": "/kjuːt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-lion-pride-savanna",
    "title": "Lions in the African Savanna Grassland",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "r5V9e_22pKs",
    "duration": "5 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "3-5 tuổi",
    "description": "Vua sư tử có bờm oai phong sưởi nắng trên mỏm đá và những chú sư tử con đùa nghịch cùng mẹ.",
    "parentTip": "Bé hãy thử cất tiếng gầm thật to như chú sư tử chúa tể muôn loài nhé!",
    "keyVocab": [
      {
        "en": "Lion",
        "vi": "Sư tử",
        "emoji": "🦁",
        "phonetic": "/ˈlaɪ.ən/"
      },
      {
        "en": "Mane",
        "vi": "Bờm sư tử",
        "emoji": "🦁",
        "phonetic": "/meɪn/"
      },
      {
        "en": "King",
        "vi": "Vua chúa tể",
        "emoji": "👑",
        "phonetic": "/kɪŋ/"
      },
      {
        "en": "Roar",
        "vi": "Tiếng gầm uy phong",
        "emoji": "📢",
        "phonetic": "/rɔːr/"
      },
      {
        "en": "Pride",
        "vi": "Đàn sư tử",
        "emoji": "🐾",
        "phonetic": "/praɪd/"
      },
      {
        "en": "Grassland",
        "vi": "Đồng cỏ bao la",
        "emoji": "🌾",
        "phonetic": "/ˈɡræs.lænd/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-friendly-reef-sharks",
    "title": "Friendly Reef Sharks and Coral Life",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "m9D3p_88kLx",
    "duration": "4 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "4-6 tuổi",
    "description": "Khám phá cá mập vây đen bơi lượn hiền lành quanh rạn san hô bảo vệ hệ sinh thái đại dương.",
    "parentTip": "Giúp bé hiểu cá mập là sinh vật quan trọng giữ gìn biển cả trong sạch, không phải con nào cũng hung dữ.",
    "keyVocab": [
      {
        "en": "Reef Shark",
        "vi": "Cá mập san hô",
        "emoji": "🦈",
        "phonetic": "/riːf ʃɑːrk/"
      },
      {
        "en": "Fin",
        "vi": "Vây cá mập",
        "emoji": "🦈",
        "phonetic": "/fɪn/"
      },
      {
        "en": "Coral",
        "vi": "Rạn san hô",
        "emoji": "🪸",
        "phonetic": "/ˈkɔːr.əl/"
      },
      {
        "en": "Gills",
        "vi": "Mang cá thở",
        "emoji": "🐟",
        "phonetic": "/ɡɪlz/"
      },
      {
        "en": "Teeth",
        "vi": "Răng sắc nhọn",
        "emoji": "🦷",
        "phonetic": "/tiːθ/"
      },
      {
        "en": "Clean",
        "vi": "Trong sạch",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "natgeo-rainforest-toucan-birds",
    "title": "Toucan and Colorful Birds of the Amazon",
    "channel": "Nat Geo Kids",
    "channelAvatar": "🐾",
    "channelColor": "#EAB308",
    "youtubeId": "t6L1o_33zQx",
    "duration": "5 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "0-3 tuổi",
    "description": "Chiêm ngưỡng chim Toucan mỏ cầu vồng khổng lồ, vẹt đuôi dài sặc sỡ bay rợp bầu trời rừng mưa nhiệt đới.",
    "parentTip": "Mỏ chim Toucan rất to nhưng lại cực kỳ nhẹ! Hỏi bé chim ăn quả gì trên cây.",
    "keyVocab": [
      {
        "en": "Toucan",
        "vi": "Chim Toucan",
        "emoji": "🦜",
        "phonetic": "/ˈtuː.kæn/"
      },
      {
        "en": "Beak",
        "vi": "Mỏ chim to",
        "emoji": "🪶",
        "phonetic": "/biːk/"
      },
      {
        "en": "Feather",
        "vi": "Lông vũ",
        "emoji": "🪶",
        "phonetic": "/ˈfeð.ɚ/"
      },
      {
        "en": "Rainforest",
        "vi": "Rừng mưa nhiệt đới",
        "emoji": "🌴",
        "phonetic": "/ˈreɪn.fɔːr.ɪst/"
      },
      {
        "en": "Fly",
        "vi": "Bay lượn",
        "emoji": "🦅",
        "phonetic": "/flaɪ/"
      },
      {
        "en": "Fruit",
        "vi": "Quả ngọt",
        "emoji": "🍒",
        "phonetic": "/fruːt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-speech-development-toddler",
    "title": "Learn to Talk with Ms Rachel - Speech Development",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "vx4n-d5rXm4",
    "duration": "45 phút",
    "category": "speech",
    "categoryNameVi": "Bé tập nói",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Video tập nói kinh điển của Ms Rachel giúp bé học cử chỉ chào hỏi, tạm biệt, các từ đơn âm và phát âm khẩu hình chuẩn.",
    "parentTip": "Ba mẹ hãy ngồi đối diện, phát âm chậm theo Ms Rachel và tán thưởng mỗi khi bé cố gắng bật ra tiếng.",
    "keyVocab": [
      {
        "en": "Hello",
        "vi": "Xin chào",
        "emoji": "👋",
        "phonetic": "/heˈloʊ/"
      },
      {
        "en": "Bye-bye",
        "vi": "Tạm biệt",
        "emoji": "👋",
        "phonetic": "/ˌbaɪˈbaɪ/"
      },
      {
        "en": "More",
        "vi": "Thêm nữa",
        "emoji": "➕",
        "phonetic": "/mɔːr/"
      },
      {
        "en": "All Done",
        "vi": "Xong rồi",
        "emoji": "👐",
        "phonetic": "/ɔːl dʌn/"
      },
      {
        "en": "Water",
        "vi": "Uống nước",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Milk",
        "vi": "Uống sữa",
        "emoji": "🥛",
        "phonetic": "/mɪlk/"
      },
      {
        "en": "Please",
        "vi": "Làm ơn ạ",
        "emoji": "🙏",
        "phonetic": "/pliːz/"
      },
      {
        "en": "Thank you",
        "vi": "Cảm ơn ạ",
        "emoji": "💐",
        "phonetic": "/ˈθæŋk ˌjuː/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-hop-little-bunnies",
    "title": "Hop Little Bunnies & Toddler Movement Songs",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "dZ0S1a_dC-I",
    "duration": "30 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "0-3 tuổi",
    "description": "Bé giả vờ ngủ say rồi bất ngờ nhảy tung tăng như chú thỏ con! Rèn luyện phản xạ nghe và vận động toàn thân.",
    "parentTip": "Chơi cùng bé trò: Nằm im ngủ ngoan... Rồi nhảy lò cò: Nhảy, nhảy, nhảy!",
    "keyVocab": [
      {
        "en": "Bunny",
        "vi": "Chú thỏ con",
        "emoji": "🐰",
        "phonetic": "/ˈbʌn.i/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy lò cò",
        "emoji": "🦘",
        "phonetic": "/hɑːp/"
      },
      {
        "en": "Sleep",
        "vi": "Ngủ say",
        "emoji": "😴",
        "phonetic": "/sliːp/"
      },
      {
        "en": "Wake up",
        "vi": "Thức dậy nào",
        "emoji": "⏰",
        "phonetic": "/weɪk ʌp/"
      },
      {
        "en": "Stop",
        "vi": "Dừng lại",
        "emoji": "🛑",
        "phonetic": "/stɑːp/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😄",
        "phonetic": "/ˈhæp.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-wheels-bus-vehicles",
    "title": "Wheels on the Bus & City Vehicles with Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "yC0dK_84_6w",
    "duration": "35 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Bài hát xe buýt quen thuộc kết hợp khám phá xe cứu thương, xe cảnh sát và xe taxi qua giọng hát ngọt ngào của Ms Rachel.",
    "parentTip": "Bé xoay tay làm vô lăng xe buýt và bấm còi 'Bíp bíp bíp' cùng Ms Rachel nhé!",
    "keyVocab": [
      {
        "en": "Wheels",
        "vi": "Bánh xe xoay",
        "emoji": "🛞",
        "phonetic": "/wiːlz/"
      },
      {
        "en": "Round and Round",
        "vi": "Xoay vòng tròn",
        "emoji": "🔄",
        "phonetic": "/raʊnd ənd raʊnd/"
      },
      {
        "en": "Wipers",
        "vi": "Cần gạt nước",
        "emoji": "🌧️",
        "phonetic": "/ˈwaɪ.pɚz/"
      },
      {
        "en": "Horn",
        "vi": "Còi xe bíp bíp",
        "emoji": "📢",
        "phonetic": "/hɔːrn/"
      },
      {
        "en": "Town",
        "vi": "Thành phố",
        "emoji": "🏙️",
        "phonetic": "/taʊn/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-farm-animals-sounds",
    "title": "Animal Sounds & Farm Tour with Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "Yp68S_jP66w",
    "duration": "40 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "0-3 tuổi",
    "description": "Gặp gỡ bò sữa, cừu non, vịt vàng và gà trống qua bài hát Old MacDonald, khuyến khích bé nhại tiếng kêu của các con vật.",
    "parentTip": "Khi nghe tiếng vịt Cạp cạp, bò Ùm bò, hãy khích lệ bé tạo ra âm thanh tương tự để mở rộng thanh quản.",
    "keyVocab": [
      {
        "en": "Cow",
        "vi": "Con bò (Moo)",
        "emoji": "🐮",
        "phonetic": "/kaʊ/"
      },
      {
        "en": "Sheep",
        "vi": "Con cừu (Baa)",
        "emoji": "🐑",
        "phonetic": "/ʃiːp/"
      },
      {
        "en": "Duck",
        "vi": "Con vịt (Quack)",
        "emoji": "🦆",
        "phonetic": "/dʌk/"
      },
      {
        "en": "Rooster",
        "vi": "Gà trống (Cock-a-doodle)",
        "emoji": "🐔",
        "phonetic": "/ˈruː.stɚ/"
      },
      {
        "en": "Horse",
        "vi": "Con ngựa (Neigh)",
        "emoji": "🐴",
        "phonetic": "/hɔːrs/"
      },
      {
        "en": "Pig",
        "vi": "Con heo (Oink)",
        "emoji": "🐷",
        "phonetic": "/pɪɡ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-emotions-and-feelings",
    "title": "Emotions & Feelings Song with Ms Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "F47gH7sF-L4",
    "duration": "28 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Giúp bé nhận biết cảm xúc vui vẻ, buồn bã, giận dữ và sợ hãi; hướng dẫn cách hít thở sâu để bình tĩnh lại.",
    "parentTip": "Cùng bé biểu cảm khuôn mặt: Mặt cười tươi khi vui, hít thở sâu khi cần bình tĩnh.",
    "keyVocab": [
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "😊",
        "phonetic": "/ˈhæp.i/"
      },
      {
        "en": "Sad",
        "vi": "Buồn bã",
        "emoji": "😢",
        "phonetic": "/sæd/"
      },
      {
        "en": "Calm",
        "vi": "Bình tĩnh",
        "emoji": "🧘",
        "phonetic": "/kɑːm/"
      },
      {
        "en": "Breathe",
        "vi": "Hít thở sâu",
        "emoji": "🌬️",
        "phonetic": "/briːð/"
      },
      {
        "en": "Smile",
        "vi": "Nụ cười",
        "emoji": "😄",
        "phonetic": "/smaɪl/"
      },
      {
        "en": "Hug",
        "vi": "Cái ôm ấm áp",
        "emoji": "🤗",
        "phonetic": "/hʌɡ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-rainbow-colors-song",
    "title": "Learn Colors and Rainbow Song with Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "pT784hH2Z7k",
    "duration": "32 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái & Màu sắc",
    "categoryEmoji": "🔤",
    "recommendedAge": "0-3 tuổi",
    "description": "Nhận biết các màu sắc cơ bản qua đồ chơi chiếc hộp cầu vồng bí mật và bài hát Color Song rộn ràng.",
    "parentTip": "Bé tìm quanh phòng một đồ vật màu đỏ hoặc màu vàng để khoe với ba mẹ nhé.",
    "keyVocab": [
      {
        "en": "Red",
        "vi": "Màu đỏ",
        "emoji": "🔴",
        "phonetic": "/red/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🔵",
        "phonetic": "/bluː/"
      },
      {
        "en": "Yellow",
        "vi": "Màu vàng",
        "emoji": "🟡",
        "phonetic": "/ˈjel.oʊ/"
      },
      {
        "en": "Green",
        "vi": "Màu xanh lá",
        "emoji": "🟢",
        "phonetic": "/ɡriːn/"
      },
      {
        "en": "Orange",
        "vi": "Màu cam",
        "emoji": "🟠",
        "phonetic": "/ˈɔːr.ɪndʒ/"
      },
      {
        "en": "Purple",
        "vi": "Màu tím",
        "emoji": "🟣",
        "phonetic": "/ˈpɝː.pəl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-dinosaur-stomp",
    "title": "Dinosaurs, Stomping & Roaring Fun with Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "o8E4pZ_Q9r0",
    "duration": "30 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "0-3 tuổi",
    "description": "Các bạn nhỏ hóa thân thành những chú khủng long tí hon dậm chân rầm rập và gầm vang khắp phòng!",
    "parentTip": "Trò chơi vận động tuyệt vời để giải phóng năng lượng cho bé trước giờ ăn hoặc tắm.",
    "keyVocab": [
      {
        "en": "Dinosaur",
        "vi": "Khủng long",
        "emoji": "🦖",
        "phonetic": "/ˈdaɪ.nə.sɔːr/"
      },
      {
        "en": "Stomp",
        "vi": "Dậm chân rầm rập",
        "emoji": "👣",
        "phonetic": "/stɑːmp/"
      },
      {
        "en": "Roar",
        "vi": "Gầm to",
        "emoji": "🦁",
        "phonetic": "/rɔːr/"
      },
      {
        "en": "Big",
        "vi": "To lớn",
        "emoji": "🐘",
        "phonetic": "/bɪɡ/"
      },
      {
        "en": "Little",
        "vi": "Bé nhỏ",
        "emoji": "🐁",
        "phonetic": "/ˈlɪt̬.əl/"
      },
      {
        "en": "Claws",
        "vi": "Móng vuốt",
        "emoji": "🦅",
        "phonetic": "/klɑːz/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-bedtime-routine-lullaby",
    "title": "Bedtime Routine & Sweet Lullabies for Babies",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "w1X4p_98kLt",
    "duration": "38 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Các thói quen buổi tối: đánh răng, tắm nước ấm, đọc sách truyện tranh và hát ru ngủ đưa bé vào giấc ngủ ngon.",
    "parentTip": "Mở video này vào buổi tối với ánh sáng dịu nhẹ để tạo thói quen thư giãn trước giờ ngủ.",
    "keyVocab": [
      {
        "en": "Bedtime",
        "vi": "Giờ đi ngủ",
        "emoji": "🛌",
        "phonetic": "/ˈbed.taɪm/"
      },
      {
        "en": "Brush Teeth",
        "vi": "Đánh răng sạch",
        "emoji": "🪥",
        "phonetic": "/brʌʃ tiːθ/"
      },
      {
        "en": "Story",
        "vi": "Đọc truyện tranh",
        "emoji": "📖",
        "phonetic": "/ˈstɔːr.i/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌙",
        "phonetic": "/muːn/"
      },
      {
        "en": "Stars",
        "vi": "Ngôi sao lấp lánh",
        "emoji": "⭐",
        "phonetic": "/stɑːrz/"
      },
      {
        "en": "Goodnight",
        "vi": "Chúc ngủ ngon",
        "emoji": "😴",
        "phonetic": "/ˌɡʊdˈnaɪt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-head-shoulders-body",
    "title": "Head Shoulders Knees & Toes with Ms Rachel",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "z2L9o_11pKs",
    "duration": "25 phút",
    "category": "speech",
    "categoryNameVi": "Bé tập nói",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Chỉ tay vào các bộ phận cơ thể: mắt, tai, miệng, mũi, đầu và ngón chân theo nhịp điệu nhanh dần hào hứng.",
    "parentTip": "Cùng bé chạm tay vào mũi, tai theo khẩu lệnh để rèn phản xạ nhận biết cơ thể.",
    "keyVocab": [
      {
        "en": "Head",
        "vi": "Cái đầu",
        "emoji": "👶",
        "phonetic": "/hed/"
      },
      {
        "en": "Shoulders",
        "vi": "Bờ vai",
        "emoji": "💪",
        "phonetic": "/ˈʃoʊl.dɚz/"
      },
      {
        "en": "Knees",
        "vi": "Đầu gối",
        "emoji": "🦵",
        "phonetic": "/niːz/"
      },
      {
        "en": "Toes",
        "vi": "Ngón chân",
        "emoji": "🦶",
        "phonetic": "/toʊz/"
      },
      {
        "en": "Eyes",
        "vi": "Đôi mắt",
        "emoji": "👀",
        "phonetic": "/aɪz/"
      },
      {
        "en": "Ears",
        "vi": "Đôi tai",
        "emoji": "👂",
        "phonetic": "/ɪrz/"
      },
      {
        "en": "Mouth",
        "vi": "Miệng xinh",
        "emoji": "👄",
        "phonetic": "/maʊθ/"
      },
      {
        "en": "Nose",
        "vi": "Chiếc mũi",
        "emoji": "👃",
        "phonetic": "/noʊz/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "ms-rachel-count-stars-twinkle",
    "title": "Count 1 to 10 with Twinkle Twinkle Little Star",
    "channel": "Ms Rachel",
    "channelAvatar": "👧",
    "channelColor": "#FF6B8B",
    "youtubeId": "b3M8p_77zQe",
    "duration": "30 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "0-3 tuổi",
    "description": "Đếm 1 đến 10 bằng các ngón tay xinh xắn kết hợp bài hát Ngôi sao nhỏ lấp lánh du dương.",
    "parentTip": "Xòe từng ngón tay của bé khi đếm: Một, hai, ba, bốn, năm...",
    "keyVocab": [
      {
        "en": "One",
        "vi": "Số một",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Two",
        "vi": "Số hai",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Three",
        "vi": "Số ba",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Four",
        "vi": "Số bốn",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Five",
        "vi": "Số năm",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Fingers",
        "vi": "Ngón tay",
        "emoji": "🖐️",
        "phonetic": "/ˈfɪŋ.ɡɚz/"
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-blockzilla-compare",
    "title": "Numberblocks: Blockzilla! Greater Than & Less Than",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "k6T_99pLs4Q",
    "duration": "10 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Quái vật số Blockzilla chỉ thích ăn những tháp số to lớn hơn! Giúp bé hiểu khái niệm Lớn hơn (>) và Nhỏ hơn (<).",
    "parentTip": "Xòe 3 ngón tay bên trái và 5 ngón tay bên phải, hỏi bé bên nào nhiều hơn nhé.",
    "keyVocab": [
      {
        "en": "Greater Than",
        "vi": "Lớn hơn",
        "emoji": "➡️",
        "phonetic": "/ˈɡreɪ.t̬ɚ ðæn/"
      },
      {
        "en": "Less Than",
        "vi": "Bé hơn",
        "emoji": "⬅️",
        "phonetic": "/les ðæn/"
      },
      {
        "en": "Equal",
        "vi": "Bằng nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəl/"
      },
      {
        "en": "More",
        "vi": "Nhiều hơn",
        "emoji": "➕",
        "phonetic": "/mɔːr/"
      },
      {
        "en": "Fewer",
        "vi": "Ít hơn",
        "emoji": "➖",
        "phonetic": "/ˈfjuː.ɚ/"
      },
      {
        "en": "Tower",
        "vi": "Tháp số",
        "emoji": "🗼",
        "phonetic": "/ˈtaʊ.ɚ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-step-squads-triangle",
    "title": "Step Squads: 1, 3, 6, 10 Triangle Numbers",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "w4R_88zQe91",
    "duration": "12 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Bậc thang kỳ diệu xếp theo hàng: 1, 1+2=3, 1+2+3=6, 1+2+3+4=10 tạo nên các bậc thang số tam giác thú vị.",
    "parentTip": "Dùng các khối lego xếp hình bậc thang từ 1 đến 4 bậc cùng bé.",
    "keyVocab": [
      {
        "en": "Step Squad",
        "vi": "Đội bậc thang",
        "emoji": "🪜",
        "phonetic": "/step skwɑːd/"
      },
      {
        "en": "Stairs",
        "vi": "Bậc thang",
        "emoji": "🪜",
        "phonetic": "/sterz/"
      },
      {
        "en": "Triangle",
        "vi": "Hình tam giác",
        "emoji": "📐",
        "phonetic": "/ˈtraɪ.æŋ.ɡəl/"
      },
      {
        "en": "One",
        "vi": "Số một",
        "emoji": "1️⃣",
        "phonetic": "/wʌn/"
      },
      {
        "en": "Three",
        "vi": "Số ba",
        "emoji": "3️⃣",
        "phonetic": "/θriː/"
      },
      {
        "en": "Six",
        "vi": "Số sáu",
        "emoji": "6️⃣",
        "phonetic": "/sɪks/"
      },
      {
        "en": "Ten",
        "vi": "Số mười",
        "emoji": "🔟",
        "phonetic": "/ten/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-the-number-tens",
    "title": "The Number Tens: 10, 20, 30, 40, 50!",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "e5M_77xPr12",
    "duration": "15 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "4-6 tuổi",
    "description": "Khám phá các số tròn chục đầy quyền năng: Số 10, 20, 30, 40, 50 đứng thành hàng ngũ phi thường.",
    "parentTip": "Tập cho bé đếm bước nhảy 10: 10, 20, 30, 40, 50...",
    "keyVocab": [
      {
        "en": "Ten",
        "vi": "Số mười",
        "emoji": "🔟",
        "phonetic": "/ten/"
      },
      {
        "en": "Twenty",
        "vi": "Hai mươi",
        "emoji": "2️⃣0️⃣",
        "phonetic": "/ˈtwen.t̬i/"
      },
      {
        "en": "Thirty",
        "vi": "Ba mươi",
        "emoji": "3️⃣0️⃣",
        "phonetic": "/ˈθɝː.t̬i/"
      },
      {
        "en": "Forty",
        "vi": "Bốn mươi",
        "emoji": "4️⃣0️⃣",
        "phonetic": "/ˈfɔːr.t̬i/"
      },
      {
        "en": "Fifty",
        "vi": "Năm mươi",
        "emoji": "5️⃣0️⃣",
        "phonetic": "/ˈfɪf.ti/"
      },
      {
        "en": "Count by Tens",
        "vi": "Đếm theo chục",
        "emoji": "🔢",
        "phonetic": "/kaʊnt baɪ tenz/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-blast-off-countdown",
    "title": "Blast Off to Outer Space! 10 to 1 Countdown",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "r6N_66kLx34",
    "duration": "10 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Tên lửa số chuẩn bị phóng vào vũ trụ! Đếm ngược từ 10 về 1 và cùng reo vang: Phóng tên lửa!",
    "parentTip": "Bé ngồi xổm và đếm ngược: 10, 9, 8... 1, rồi bật nhảy lên cao như tên lửa!",
    "keyVocab": [
      {
        "en": "Countdown",
        "vi": "Đếm ngược",
        "emoji": "⏳",
        "phonetic": "/ˈkaʊnt.daʊn/"
      },
      {
        "en": "Rocket",
        "vi": "Tên lửa vũ trụ",
        "emoji": "🚀",
        "phonetic": "/ˈrɑː.kɪt/"
      },
      {
        "en": "Blast Off",
        "vi": "Phóng lên",
        "emoji": "💥",
        "phonetic": "/blæst ɔːf/"
      },
      {
        "en": "Space",
        "vi": "Không gian vũ trụ",
        "emoji": "🌌",
        "phonetic": "/speɪs/"
      },
      {
        "en": "Zero",
        "vi": "Số không",
        "emoji": "0️⃣",
        "phonetic": "/ˈzɪr.oʊ/"
      },
      {
        "en": "Fly",
        "vi": "Bay vút",
        "emoji": "🦅",
        "phonetic": "/flaɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-odd-and-even-party",
    "title": "Odd and Even Numbers Dance Party",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "t7P_55zQx56",
    "duration": "11 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Số chẵn có đôi có cặp khiêu vũ cùng nhau, số lẻ có một bạn nhỏ nhô lên đỉnh đầu ngộ nghĩnh!",
    "parentTip": "Lấy các đôi tất ra chia cặp để bé hiểu số chẵn luôn có đôi, số lẻ thì dư ra 1 chiếc.",
    "keyVocab": [
      {
        "en": "Even",
        "vi": "Số chẵn (có đôi)",
        "emoji": "👫",
        "phonetic": "/ˈiː.vən/"
      },
      {
        "en": "Odd",
        "vi": "Số lẻ (dư một)",
        "emoji": "🧍",
        "phonetic": "/ɑːd/"
      },
      {
        "en": "Pair",
        "vi": "Một đôi / cặp",
        "emoji": "🧦",
        "phonetic": "/per/"
      },
      {
        "en": "Dance",
        "vi": "Khiêu vũ",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Together",
        "vi": "Cùng nhau",
        "emoji": "🤝",
        "phonetic": "/təˈɡeð.ɚ/"
      },
      {
        "en": "Friend",
        "vi": "Bạn bè",
        "emoji": "🧑‍🤝‍🧑",
        "phonetic": "/frend/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-one-hundred-celebration",
    "title": "One Hundred Block Giant Celebration!",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "y8Q_44pKs78",
    "duration": "14 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "4-6 tuổi",
    "description": "10 bạn Số Mười ghép lại tạo thành bạn Khối 100 vuông vức khổng lồ, rực rỡ như một bức tường sắc màu.",
    "parentTip": "Số 100 là cột mốc tuyệt vời! Cho bé thấy 100 cái hạt ngô hoặc 100 que tính.",
    "keyVocab": [
      {
        "en": "One Hundred",
        "vi": "Một trăm",
        "emoji": "💯",
        "phonetic": "/wʌn ˈhʌn.drəd/"
      },
      {
        "en": "Giant",
        "vi": "Khổng lồ",
        "emoji": "🗿",
        "phonetic": "/ˈdʒaɪ.ənt/"
      },
      {
        "en": "Square",
        "vi": "Khối vuông",
        "emoji": "🔲",
        "phonetic": "/skwer/"
      },
      {
        "en": "Ten Tens",
        "vi": "Mười số mười",
        "emoji": "🔟",
        "phonetic": "/ten tenz/"
      },
      {
        "en": "Celebrate",
        "vi": "Ăn mừng lễ hội",
        "emoji": "🎉",
        "phonetic": "/ˈsel.ə.breɪt/"
      },
      {
        "en": "Big",
        "vi": "Rất lớn",
        "emoji": "🐘",
        "phonetic": "/bɪɡ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-double-trouble",
    "title": "Double Trouble: Doubling 1, 2, 4, 8, 16",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "u9R_33kLx90",
    "duration": "12 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "4-6 tuổi",
    "description": "Chiếc gương nhân đôi kỳ diệu: 1 gấp đôi thành 2, 2 gấp đôi thành 4, 4 gấp đôi thành 8, 8 gấp đôi thành 16!",
    "parentTip": "Dùng 2 bàn tay mở rộng: 1 ngón thêm 1 ngón là 2, 2 ngón thêm 2 ngón là 4!",
    "keyVocab": [
      {
        "en": "Double",
        "vi": "Gấp đôi",
        "emoji": "✖️2️⃣",
        "phonetic": "/ˈdʌb.əl/"
      },
      {
        "en": "Mirror",
        "vi": "Gương thần",
        "emoji": "🪞",
        "phonetic": "/ˈmɪr.ɚ/"
      },
      {
        "en": "Magic",
        "vi": "Phép thuật",
        "emoji": "🪄",
        "phonetic": "/ˈmædʒ.ɪk/"
      },
      {
        "en": "Two",
        "vi": "Số hai",
        "emoji": "2️⃣",
        "phonetic": "/tuː/"
      },
      {
        "en": "Four",
        "vi": "Số bốn",
        "emoji": "4️⃣",
        "phonetic": "/fɔːr/"
      },
      {
        "en": "Eight",
        "vi": "Số tám",
        "emoji": "8️⃣",
        "phonetic": "/eɪt/"
      },
      {
        "en": "Sixteen",
        "vi": "Mười sáu",
        "emoji": "1️⃣6️⃣",
        "phonetic": "/ˌsɪkˈstiːn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-pattern-palace",
    "title": "Pattern Palace: Making Colorful Math Patterns",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "i0S_22zQe12",
    "duration": "11 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "3-5 tuổi",
    "description": "Đi qua cung điện hoa văn với quy luật màu sắc: Đỏ - Xanh - Đỏ - Xanh... Bé hãy đoán xem màu tiếp theo là gì!",
    "parentTip": "Cùng bé vỗ tay theo nhịp quy luật: Vỗ tay - Đập đùi - Vỗ tay - Đập đùi.",
    "keyVocab": [
      {
        "en": "Pattern",
        "vi": "Quy luật hoa văn",
        "emoji": "🔁",
        "phonetic": "/ˈpæt̬.ɚn/"
      },
      {
        "en": "Repeat",
        "vi": "Lặp đi lặp lại",
        "emoji": "🔄",
        "phonetic": "/rɪˈpiːt/"
      },
      {
        "en": "Next",
        "vi": "Tiếp theo là gì",
        "emoji": "➡️",
        "phonetic": "/nekst/"
      },
      {
        "en": "Colors",
        "vi": "Màu sắc",
        "emoji": "🎨",
        "phonetic": "/ˈkʌl.ɚz/"
      },
      {
        "en": "Palace",
        "vi": "Cung điện",
        "emoji": "🏰",
        "phonetic": "/ˈpæl.ɪs/"
      },
      {
        "en": "Solve",
        "vi": "Giải câu đố",
        "emoji": "🧩",
        "phonetic": "/sɑːlv/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-high-five-friend",
    "title": "High Five! The Friendly Number Five Story",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "o1T_11pLs34",
    "duration": "10 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "0-3 tuổi",
    "description": "Bạn Số Năm có găng tay xanh ngôi sao xinh xắn, thích đập tay High Five chào mọi người!",
    "parentTip": "Đập tay High Five thật mạnh với bé mỗi khi bé hoàn thành một việc tốt.",
    "keyVocab": [
      {
        "en": "High Five",
        "vi": "Đập tay chúc mừng",
        "emoji": "✋",
        "phonetic": "/ˌhaɪ ˈfaɪv/"
      },
      {
        "en": "Five",
        "vi": "Số năm",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Glove",
        "vi": "Chiếc găng tay",
        "emoji": "🧤",
        "phonetic": "/ɡlʌv/"
      },
      {
        "en": "Hand",
        "vi": "Bàn tay",
        "emoji": "🖐️",
        "phonetic": "/hænd/"
      },
      {
        "en": "Star",
        "vi": "Ngôi sao",
        "emoji": "⭐",
        "phonetic": "/stɑːr/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay reo hò",
        "emoji": "👏",
        "phonetic": "/klæp/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "numberblocks-fair-sharing-division",
    "title": "Fair Sharing: Equal Groups and Division Fun",
    "channel": "Numberblocks",
    "channelAvatar": "🔢",
    "channelColor": "#EF4444",
    "youtubeId": "p2U_00xPr56",
    "duration": "13 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "4-6 tuổi",
    "description": "Chia đều 6 chiếc bánh cho 2 bạn nhỏ: Mỗi bạn được đúng 3 chiếc bánh, ai cũng vui vẻ không ai bị ít hơn!",
    "parentTip": "Dạy bé đức tính chia sẻ kẹo hoặc trái cây công bằng cho anh chị em trong nhà.",
    "keyVocab": [
      {
        "en": "Share",
        "vi": "Chia sẻ",
        "emoji": "🤲",
        "phonetic": "/ʃer/"
      },
      {
        "en": "Fair",
        "vi": "Công bằng",
        "emoji": "⚖️",
        "phonetic": "/fer/"
      },
      {
        "en": "Equal",
        "vi": "Đều nhau",
        "emoji": "🟰",
        "phonetic": "/ˈiː.kwəl/"
      },
      {
        "en": "Cookies",
        "vi": "Bánh quy",
        "emoji": "🍪",
        "phonetic": "/ˈkʊk.iz/"
      },
      {
        "en": "Divide",
        "vi": "Chia đều",
        "emoji": "➗",
        "phonetic": "/dɪˈvaɪd/"
      },
      {
        "en": "Happy",
        "vi": "Vui vẻ",
        "emoji": "🥰",
        "phonetic": "/ˈhæp.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-magic-e-sparkle",
    "title": "Magic E: Making Long Vowel Sounds Sparkle",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "a5T_99pLs4Q",
    "duration": "10 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Chữ E thần kỳ bay tới cuối từ biến nguyên âm ngắn thành nguyên âm dài: Cap biến thành Cape, Pin biến thành Pine!",
    "parentTip": "Quy tắc Magic E là bí quyết quan trọng nhất giúp bé bắt đầu biết tự đọc tiếng Anh trôi chảy.",
    "keyVocab": [
      {
        "en": "Magic E",
        "vi": "Chữ E kỳ diệu",
        "emoji": "🪄",
        "phonetic": "/ˈmædʒ.ɪk iː/"
      },
      {
        "en": "Cape",
        "vi": "Áo choàng siêu nhân",
        "emoji": "🦸",
        "phonetic": "/keɪp/"
      },
      {
        "en": "Cap",
        "vi": "Mũ lưỡi trai",
        "emoji": "🧢",
        "phonetic": "/kæp/"
      },
      {
        "en": "Pine",
        "vi": "Cây thông",
        "emoji": "🌲",
        "phonetic": "/paɪn/"
      },
      {
        "en": "Pin",
        "vi": "Cái ghim",
        "emoji": "📍",
        "phonetic": "/pɪn/"
      },
      {
        "en": "Vowel",
        "vi": "Nguyên âm",
        "emoji": "🔤",
        "phonetic": "/ˈvaʊ.əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-alphabet-train-sounds",
    "title": "The Alphabet Train: Letter Sounds From A to Z",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "b6R_88zQe91",
    "duration": "20 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Đoàn tàu chở 26 chữ cái từ A đến Z, mỗi toa tàu là một âm thanh Phonics phát âm chuẩn xác và vui tai.",
    "parentTip": "Hỏi bé tên của bé bắt đầu bằng chữ cái nào trên đoàn tàu.",
    "keyVocab": [
      {
        "en": "Alphabet",
        "vi": "Bảng chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈæl.fə.bet/"
      },
      {
        "en": "Train",
        "vi": "Đoàn tàu",
        "emoji": "🚂",
        "phonetic": "/treɪn/"
      },
      {
        "en": "Letter",
        "vi": "Chữ cái",
        "emoji": "✉️",
        "phonetic": "/ˈlet̬.ɚ/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Sing",
        "vi": "Ca hát",
        "emoji": "🎤",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "A to Z",
        "vi": "Từ A đến Z",
        "emoji": "📚",
        "phonetic": "/eɪ tuː zed/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-vowel-blends-together",
    "title": "Vowel Blends: AI, EE, OA Singing Together",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "c7M_77xPr12",
    "duration": "12 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Khi hai nguyên âm đi cạnh nhau, bạn thứ nhất cất tiếng hát to rõ: Rain (Mưa), Boat (Thuyền), Tree (Cây xanh)!",
    "parentTip": "Bé tập đánh vần từng âm: R-AI-N = Rain! Rất dễ nhớ và trực quan.",
    "keyVocab": [
      {
        "en": "Rain",
        "vi": "Cơn mưa",
        "emoji": "🌧️",
        "phonetic": "/reɪn/"
      },
      {
        "en": "Boat",
        "vi": "Chiếc thuyền",
        "emoji": "⛵",
        "phonetic": "/boʊt/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Together",
        "vi": "Đi cùng nhau",
        "emoji": "👫",
        "phonetic": "/təˈɡeð.ɚ/"
      },
      {
        "en": "Sound",
        "vi": "Âm vần",
        "emoji": "🗣️",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Read",
        "vi": "Đọc chữ",
        "emoji": "📖",
        "phonetic": "/riːd/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-rhyme-time-cat-hat",
    "title": "Rhyme Time: Cat, Hat, Bat and Rat!",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "d8N_66kLx34",
    "duration": "11 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Trò chơi tìm từ đồng âm vần AT: Chú mèo Cat đội mũ Hat cầm gậy Bat đuổi theo chuột Rat vui nhộn!",
    "parentTip": "Đọc thơ vần điệu cho bé nghe: The Cat in the Hat sat on a mat.",
    "keyVocab": [
      {
        "en": "Cat",
        "vi": "Con mèo",
        "emoji": "🐱",
        "phonetic": "/kæt/"
      },
      {
        "en": "Hat",
        "vi": "Cái mũ",
        "emoji": "🎩",
        "phonetic": "/hæt/"
      },
      {
        "en": "Bat",
        "vi": "Gậy bóng chày",
        "emoji": "🏏",
        "phonetic": "/bæt/"
      },
      {
        "en": "Mat",
        "vi": "Tấm thảm",
        "emoji": "🧘",
        "phonetic": "/mæt/"
      },
      {
        "en": "Rat",
        "vi": "Chú chuột",
        "emoji": "🐀",
        "phonetic": "/ræt/"
      },
      {
        "en": "Rhyme",
        "vi": "Vần điệu",
        "emoji": "🎵",
        "phonetic": "/raɪm/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-mystery-silent-letters",
    "title": "Mystery of the Silent Letters",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "e9P_55zQx56",
    "duration": "12 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Khám phá những chữ cái 'im lặng' không phát âm: Chữ K trong Knee (Đầu gối), chữ W trong Write (Viết chữ).",
    "parentTip": "Bé hãy làm động tác 'Suỵt, giữ im lặng' như chữ cái silent letter nhé!",
    "keyVocab": [
      {
        "en": "Quiet",
        "vi": "Giữ im lặng",
        "emoji": "🤫",
        "phonetic": "/ˈkwaɪ.ət/"
      },
      {
        "en": "Knee",
        "vi": "Đầu gối",
        "emoji": "🦵",
        "phonetic": "/niː/"
      },
      {
        "en": "Knight",
        "vi": "Hiệp sĩ",
        "emoji": "🤺",
        "phonetic": "/naɪt/"
      },
      {
        "en": "Write",
        "vi": "Viết chữ",
        "emoji": "✍️",
        "phonetic": "/raɪt/"
      },
      {
        "en": "Secret",
        "vi": "Bí mật",
        "emoji": "🔒",
        "phonetic": "/ˈsiː.krət/"
      },
      {
        "en": "Letter",
        "vi": "Chữ cái",
        "emoji": "🔤",
        "phonetic": "/ˈlet̬.ɚ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-compound-words-adventure",
    "title": "Compound Words: Sun + Flower = Sunflower",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "f0Q_44pKs78",
    "duration": "13 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Ghép hai từ đơn giản thành một từ mới thú vị: Sun (Mặt trời) + Flower (Bông hoa) = Sunflower (Hoa hướng dương)!",
    "parentTip": "Đố bé: Rain + Bow thành gì? (Rainbow - Cầu vồng).",
    "keyVocab": [
      {
        "en": "Sunflower",
        "vi": "Hoa hướng dương",
        "emoji": "🌻",
        "phonetic": "/ˈsʌnˌflaʊ.ɚ/"
      },
      {
        "en": "Rainbow",
        "vi": "Cầu vồng",
        "emoji": "🌈",
        "phonetic": "/ˈreɪn.boʊ/"
      },
      {
        "en": "Cupcake",
        "vi": "Bánh cupcake",
        "emoji": "🧁",
        "phonetic": "/ˈkʌp.keɪk/"
      },
      {
        "en": "Starfish",
        "vi": "Sao biển",
        "emoji": "⭐",
        "phonetic": "/ˈstɑːr.fɪʃ/"
      },
      {
        "en": "Sun",
        "vi": "Mặt trời",
        "emoji": "☀️",
        "phonetic": "/sʌn/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ɚ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-sight-words-journey",
    "title": "Sight Words Journey: The, And, You, Me",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "g1R_33kLx90",
    "duration": "14 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Làm quen với những từ thị giác (Sight words) thường gặp nhất trong sách truyện tranh tiếng Anh.",
    "parentTip": "Chỉ vào từ 'The' và 'And' trong các trang sách để bé nhận diện mặt chữ quen thuộc.",
    "keyVocab": [
      {
        "en": "The",
        "vi": "Từ chỉ định (The)",
        "emoji": "👉",
        "phonetic": "/ðiː/"
      },
      {
        "en": "And",
        "vi": "Và",
        "emoji": "➕",
        "phonetic": "/ænd/"
      },
      {
        "en": "You",
        "vi": "Bạn",
        "emoji": "🫵",
        "phonetic": "/juː/"
      },
      {
        "en": "Me",
        "vi": "Tôi / Mình",
        "emoji": "🙋",
        "phonetic": "/miː/"
      },
      {
        "en": "We",
        "vi": "Chúng ta",
        "emoji": "👨‍👩‍👧‍👦",
        "phonetic": "/wiː/"
      },
      {
        "en": "Can",
        "vi": "Có thể",
        "emoji": "💪",
        "phonetic": "/kæn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-sound-search-forest",
    "title": "Sound Search in the Alphabet Forest",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "h2S_22zQe12",
    "duration": "12 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "3-5 tuổi",
    "description": "Đi tìm âm thanh bị giấu trong rừng: Lắng nghe tiếng gió /s/, tiếng giọt nước /p/, tiếng chim hót /t/!",
    "parentTip": "Chơi trò đố chữ: Cái gì bắt đầu bằng âm /b/? (Ball, Bear, Book).",
    "keyVocab": [
      {
        "en": "Listen",
        "vi": "Lắng nghe",
        "emoji": "👂",
        "phonetic": "/ˈlɪs.ən/"
      },
      {
        "en": "Search",
        "vi": "Tìm kiếm",
        "emoji": "🔍",
        "phonetic": "/sɝːtʃ/"
      },
      {
        "en": "Forest",
        "vi": "Khu rừng",
        "emoji": "🌲",
        "phonetic": "/ˈfɔːr.ɪst/"
      },
      {
        "en": "Sound",
        "vi": "Âm thanh",
        "emoji": "🔊",
        "phonetic": "/saʊnd/"
      },
      {
        "en": "Find",
        "vi": "Tìm thấy",
        "emoji": "💡",
        "phonetic": "/faɪnd/"
      },
      {
        "en": "Bird",
        "vi": "Chim hót",
        "emoji": "🐦",
        "phonetic": "/bɝːd/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-read-first-storybook",
    "title": "Reading Our Very First Storybook Together",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "i3T_11pLs34",
    "duration": "15 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Các bạn chữ cái nắm tay nhau xếp thành câu chuyện đầu đời: Bé tự tin đọc câu đầu tiên bằng tiếng Anh!",
    "parentTip": "Khen ngợi và ôm bé thật chặt khi bé đọc xong câu đầu tiên để khích lệ niềm vui đọc sách.",
    "keyVocab": [
      {
        "en": "Storybook",
        "vi": "Sách truyện tranh",
        "emoji": "📚",
        "phonetic": "/ˈstɔːr.i.bʊk/"
      },
      {
        "en": "Page",
        "vi": "Trang sách",
        "emoji": "📄",
        "phonetic": "/peɪdʒ/"
      },
      {
        "en": "Read",
        "vi": "Đọc sách",
        "emoji": "📖",
        "phonetic": "/riːd/"
      },
      {
        "en": "Word",
        "vi": "Từ ngữ",
        "emoji": "🔤",
        "phonetic": "/wɝːd/"
      },
      {
        "en": "Sentence",
        "vi": "Câu văn",
        "emoji": "✍️",
        "phonetic": "/ˈsen.təns/"
      },
      {
        "en": "Proud",
        "vi": "Tự hào",
        "emoji": "🌟",
        "phonetic": "/praʊd/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "alphablocks-consonant-blends-slide",
    "title": "Blends: BL, CL, FL, GL Sliding Sounds",
    "channel": "Alphablocks",
    "channelAvatar": "🔤",
    "channelColor": "#3B82F6",
    "youtubeId": "j4U_00xPr56",
    "duration": "12 phút",
    "category": "phonics",
    "categoryNameVi": "Chữ cái ABC",
    "categoryEmoji": "🔤",
    "recommendedAge": "4-6 tuổi",
    "description": "Ghép hai phụ âm trượt mượt mà trên cầu trượt: B và L thành BL (Blue, Block), C và L thành CL (Clap, Clock)!",
    "parentTip": "Cùng bé vỗ tay theo âm CL: Clap your hands!",
    "keyVocab": [
      {
        "en": "Block",
        "vi": "Khối hộp",
        "emoji": "🧱",
        "phonetic": "/blɑːk/"
      },
      {
        "en": "Clap",
        "vi": "Vỗ tay",
        "emoji": "👏",
        "phonetic": "/klæp/"
      },
      {
        "en": "Fly",
        "vi": "Bay lượn",
        "emoji": "🪰",
        "phonetic": "/flaɪ/"
      },
      {
        "en": "Glass",
        "vi": "Cốc thủy tinh",
        "emoji": "🥛",
        "phonetic": "/ɡlæs/"
      },
      {
        "en": "Clock",
        "vi": "Đồng hồ",
        "emoji": "⏰",
        "phonetic": "/klɑːk/"
      },
      {
        "en": "Blue",
        "vi": "Màu xanh dương",
        "emoji": "🔵",
        "phonetic": "/bluː/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-floor-is-lava-2",
    "title": "The Floor is Lava 2! - Ultimate Jumping Game",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d5T_99pLs4Q",
    "duration": "8 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Sàn nhà sắp biến thành dung nham sôi sục! Đếm 5, 4, 3, 2, 1 và nhanh chân nhảy lên ghế sofa an toàn.",
    "parentTip": "Trò chơi vận động kinh điển kích thích phản xạ nhanh và sự tập trung của bé.",
    "keyVocab": [
      {
        "en": "Lava",
        "vi": "Dung nham nóng đỏ",
        "emoji": "🌋",
        "phonetic": "/ˈlɑː.və/"
      },
      {
        "en": "Floor",
        "vi": "Sàn nhà",
        "emoji": "🪵",
        "phonetic": "/flɔːr/"
      },
      {
        "en": "Jump",
        "vi": "Bật nhảy",
        "emoji": "🦘",
        "phonetic": "/dʒʌmp/"
      },
      {
        "en": "Safe",
        "vi": "Chỗ an toàn",
        "emoji": "🛋️",
        "phonetic": "/seɪf/"
      },
      {
        "en": "Countdown",
        "vi": "Đếm ngược",
        "emoji": "⏱️",
        "phonetic": "/ˈkaʊnt.daʊn/"
      },
      {
        "en": "Run",
        "vi": "Chạy nhanh",
        "emoji": "🏃",
        "phonetic": "/rʌn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-dinosaur-stomp-dance",
    "title": "Dinosaur Stomp & Roar Dance Party",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d6R_88zQe91",
    "duration": "6 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Vung hai tay móng vuốt, dậm chân mạnh mẽ và cùng nhảy điệu nhảy khủng long bạo chúa cực bốc!",
    "parentTip": "Cùng bé nhảy theo điệu nhạc sôi động để rèn luyện cơ bắp chân và giữ thăng bằng.",
    "keyVocab": [
      {
        "en": "Stomp",
        "vi": "Dậm chân rầm rập",
        "emoji": "👣",
        "phonetic": "/stɑːmp/"
      },
      {
        "en": "Roar",
        "vi": "Gầm to",
        "emoji": "🦁",
        "phonetic": "/rɔːr/"
      },
      {
        "en": "Tail",
        "vi": "Vung đuôi",
        "emoji": "🦎",
        "phonetic": "/teɪl/"
      },
      {
        "en": "Claws",
        "vi": "Móng vuốt sắc",
        "emoji": "🦅",
        "phonetic": "/klɑːz/"
      },
      {
        "en": "Dance",
        "vi": "Nhảy múa",
        "emoji": "🕺",
        "phonetic": "/dæns/"
      },
      {
        "en": "Party",
        "vi": "Tiệc vui nhộn",
        "emoji": "🎉",
        "phonetic": "/ˈpɑːr.t̬i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-electric-robot-groove",
    "title": "The Electric Robot Dance Routine",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d7M_77xPr12",
    "duration": "7 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Biến thành chú robot thông minh: Cử động tay giật từng nhịp, xoay đầu như máy móc và nạp năng lượng pin!",
    "parentTip": "Bé tập kiểm soát từng khớp tay và vai theo chuyển động robot dứt khoát.",
    "keyVocab": [
      {
        "en": "Robot",
        "vi": "Người máy",
        "emoji": "🤖",
        "phonetic": "/ˈroʊ.bɑːt/"
      },
      {
        "en": "Beep",
        "vi": "Tiếng bíp bíp",
        "emoji": "🔊",
        "phonetic": "/biːp/"
      },
      {
        "en": "Battery",
        "vi": "Nạp pin năng lượng",
        "emoji": "🔋",
        "phonetic": "/ˈbæt̬.ɚ.i/"
      },
      {
        "en": "Move",
        "vi": "Cử động",
        "emoji": "🦾",
        "phonetic": "/muːv/"
      },
      {
        "en": "Metal",
        "vi": "Kim loại cứng",
        "emoji": "🔩",
        "phonetic": "/ˈmet̬.əl/"
      },
      {
        "en": "Power",
        "vi": "Sức mạnh điện",
        "emoji": "⚡",
        "phonetic": "/ˈpaʊ.ɚ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-jungle-animal-freeze",
    "title": "Jungle Animals Freeze Dance Challenge",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d8N_66kLx34",
    "duration": "8 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Nhảy theo điệu nhảy muông thú rừng nhiệt đới, nhưng khi nhạc dừng: Đứng hình đông cứng như tượng băng!",
    "parentTip": "Trò chơi 'Freeze' rèn luyện khả năng ức chế hành vi và kiềm chế cử động rất tốt cho trẻ mầm non.",
    "keyVocab": [
      {
        "en": "Freeze",
        "vi": "Đông cứng bất động",
        "emoji": "🧊",
        "phonetic": "/friːz/"
      },
      {
        "en": "Monkey",
        "vi": "Chú khỉ tinh nghịch",
        "emoji": "🐒",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Snake",
        "vi": "Con rắn trườn",
        "emoji": "🐍",
        "phonetic": "/sneɪk/"
      },
      {
        "en": "Frog",
        "vi": "Con ếch nhảy ộp",
        "emoji": "🐸",
        "phonetic": "/frɑːɡ/"
      },
      {
        "en": "Music",
        "vi": "Giai điệu nhạc",
        "emoji": "🎵",
        "phonetic": "/ˈmjuː.zɪk/"
      },
      {
        "en": "Statue",
        "vi": "Bức tượng im lìm",
        "emoji": "🗿",
        "phonetic": "/ˈstætʃ.uː/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-firefighter-hero-workout",
    "title": "Firefighter Hero Rescue Workout",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d9P_55zQx56",
    "duration": "9 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Leo thang dây thoát hiểm, cầm vòi rồng dập lửa và chạy vượt chướng ngại vật như những người hùng cứu hỏa dũng cảm.",
    "parentTip": "Cùng bé giương hai tay làm động tác cầm vòi xịt nước: Xì xì xì!",
    "keyVocab": [
      {
        "en": "Firefighter",
        "vi": "Lính cứu hỏa",
        "emoji": "🧑‍🚒",
        "phonetic": "/ˈfaɪəˌfaɪ.tər/"
      },
      {
        "en": "Climb",
        "vi": "Leo thang",
        "emoji": "🪜",
        "phonetic": "/klaɪm/"
      },
      {
        "en": "Spray",
        "vi": "Phun tia nước",
        "emoji": "🚿",
        "phonetic": "/spreɪ/"
      },
      {
        "en": "Rescue",
        "vi": "Giải cứu",
        "emoji": "🛟",
        "phonetic": "/ˈres.kjuː/"
      },
      {
        "en": "Hero",
        "vi": "Người hùng dũng cảm",
        "emoji": "🦸",
        "phonetic": "/ˈhɪr.oʊ/"
      },
      {
        "en": "Hurry",
        "vi": "Khẩn trương",
        "emoji": "🏃",
        "phonetic": "/ˈhɝː.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-super-speed-run",
    "title": "Super Speed Run & High Jump Workout",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d0Q_44pKs78",
    "duration": "8 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Chạy bộ tại chỗ tăng tốc: Đi bộ chậm, chạy vừa, và bứt phá tốc độ tia chớp né chướng ngại vật!",
    "parentTip": "Khởi động nhẹ nhàng và cổ vũ bé chạy hết tốc lực.",
    "keyVocab": [
      {
        "en": "Fast",
        "vi": "Chạy nhanh",
        "emoji": "⚡",
        "phonetic": "/fæst/"
      },
      {
        "en": "Slow",
        "vi": "Đi chậm",
        "emoji": "🐢",
        "phonetic": "/sloʊ/"
      },
      {
        "en": "Jump High",
        "vi": "Nhảy thật cao",
        "emoji": "⬆️",
        "phonetic": "/dʒʌmp haɪ/"
      },
      {
        "en": "Duck Down",
        "vi": "Cúi đầu thụp xuống",
        "emoji": "⬇️",
        "phonetic": "/dʌk daʊn/"
      },
      {
        "en": "Heart Beat",
        "vi": "Tim đập nhanh",
        "emoji": "💓",
        "phonetic": "/hɑːrt biːt/"
      },
      {
        "en": "Champion",
        "vi": "Về đích quán quân",
        "emoji": "🏆",
        "phonetic": "/ˈtʃæm.pi.ən/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-construction-crew-jump",
    "title": "Construction Crew Bulldozer Boogie",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d1R_33kLx90",
    "duration": "7 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Khoác áo bảo hộ, xoay vô lăng xe lu và dậm nhảy công trường xây dựng nhịp nhàng cùng các bạn thợ nhí.",
    "parentTip": "Bé đội mũ bảo hiểm đồ chơi và cầm búa gõ cốc cốc vui tai.",
    "keyVocab": [
      {
        "en": "Bulldozer",
        "vi": "Xe ủi đất",
        "emoji": "🚜",
        "phonetic": "/ˈbʊlˌdoʊ.zɚ/"
      },
      {
        "en": "Hammer",
        "vi": "Chiếc búa đập",
        "emoji": "🔨",
        "phonetic": "/ˈhæm.ɚ/"
      },
      {
        "en": "Build",
        "vi": "Xây dựng",
        "emoji": "🧱",
        "phonetic": "/bɪld/"
      },
      {
        "en": "Boogie",
        "vi": "Điệu nhảy vui vẻ",
        "emoji": "🕺",
        "phonetic": "/ˈbʊɡ.i/"
      },
      {
        "en": "Safety",
        "vi": "An toàn lao động",
        "emoji": "🦺",
        "phonetic": "/ˈseɪf.ti/"
      },
      {
        "en": "Work",
        "vi": "Chăm chỉ làm việc",
        "emoji": "👷",
        "phonetic": "/wɝːk/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "danny-go-astronaut-space-walk",
    "title": "Zero Gravity Astronaut Walk on Mars",
    "channel": "Danny Go!",
    "channelAvatar": "🏃",
    "channelColor": "#8B5CF6",
    "youtubeId": "d2S_22zQe12",
    "duration": "8 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Bay lơ lửng không trọng lực trên Sao Hỏa: Bước chân chậm rãi bồng bềnh và tránh các thiên thạch bay qua!",
    "parentTip": "Bé di chuyển thật chậm và nhẹ nhàng như đang trôi trong vũ trụ bao la.",
    "keyVocab": [
      {
        "en": "Astronaut",
        "vi": "Phi hành gia",
        "emoji": "👨‍🚀",
        "phonetic": "/ˈæs.trə.nɑːt/"
      },
      {
        "en": "Float",
        "vi": "Trôi bồng bềnh",
        "emoji": "🪶",
        "phonetic": "/floʊt/"
      },
      {
        "en": "Space Helmet",
        "vi": "Mũ vũ trụ",
        "emoji": "🪖",
        "phonetic": "/speɪs ˈhel.mət/"
      },
      {
        "en": "Moon",
        "vi": "Mặt trăng",
        "emoji": "🌕",
        "phonetic": "/muːn/"
      },
      {
        "en": "Stars",
        "vi": "Muôn ngàn vì sao",
        "emoji": "✨",
        "phonetic": "/stɑːrz/"
      },
      {
        "en": "Gravity",
        "vi": "Trọng lực",
        "emoji": "🌌",
        "phonetic": "/ˈɡræv.ə.t̬i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-magic-car-everywhere",
    "title": "Steve's Magic Toy Car Drives Everywhere",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s5T_99pLs4Q",
    "duration": "10 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Chiếc xe đồ chơi của Steve bỗng biến to như thật và chim quạ Maggie phù phép cho xe bay lên ngọn cây!",
    "parentTip": "Cùng bé nói câu thần chú 'Abracadabra' theo Steve và Maggie.",
    "keyVocab": [
      {
        "en": "Magic",
        "vi": "Phép thuật kỳ diệu",
        "emoji": "🪄",
        "phonetic": "/ˈmædʒ.ɪk/"
      },
      {
        "en": "Toy Car",
        "vi": "Xe ô tô đồ chơi",
        "emoji": "🏎️",
        "phonetic": "/tɔɪ kɑːr/"
      },
      {
        "en": "Drive",
        "vi": "Lái xe",
        "emoji": "🚗",
        "phonetic": "/draɪv/"
      },
      {
        "en": "Tree",
        "vi": "Cây xanh",
        "emoji": "🌳",
        "phonetic": "/triː/"
      },
      {
        "en": "Naughty",
        "vi": "Nghịch ngợm",
        "emoji": "😜",
        "phonetic": "/ˈnɑː.t̬i/"
      },
      {
        "en": "Fly",
        "vi": "Bay lên trời",
        "emoji": "🦅",
        "phonetic": "/flaɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-supermarket-shopping",
    "title": "Supermarket Shopping with Naughty Maggie",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s6R_88zQe91",
    "duration": "12 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "3-5 tuổi",
    "description": "Đi siêu thị mua táo, chuối, bánh mì và sữa nhưng chim Maggie lén bỏ đầy bánh kẹo ngọt vào xe đẩy!",
    "parentTip": "Dạy bé chọn thực phẩm lành mạnh: Trái cây tốt cho sức khỏe hơn kẹo ngọt.",
    "keyVocab": [
      {
        "en": "Supermarket",
        "vi": "Siêu thị",
        "emoji": "🛒",
        "phonetic": "/ˈsuː.pɚˌmɑːr.kɪt/"
      },
      {
        "en": "Shopping Cart",
        "vi": "Xe đẩy mua hàng",
        "emoji": "🛒",
        "phonetic": "/ˈʃɑː.pɪŋ kɑːrt/"
      },
      {
        "en": "Apples",
        "vi": "Quả táo giòn",
        "emoji": "🍎",
        "phonetic": "/ˈæp.əlz/"
      },
      {
        "en": "Bananas",
        "vi": "Nải chuối chín",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.əz/"
      },
      {
        "en": "Bread",
        "vi": "Bánh mì thơm",
        "emoji": "🍞",
        "phonetic": "/bred/"
      },
      {
        "en": "Candy",
        "vi": "Kẹo ngọt",
        "emoji": "🍬",
        "phonetic": "/ˈkæn.di/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-ice-cream-shop",
    "title": "Ice Cream Shop: Yummy Colors and Flavors",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s7M_77xPr12",
    "duration": "11 phút",
    "category": "speech",
    "categoryNameVi": "Bé tập nói",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Steve bán kem ốc quế với các viên kem màu sắc: sô cô la nâu, dâu tây hồng, chanh vàng và bạc hà the mát.",
    "parentTip": "Bé tập gọi món bằng tiếng Anh: 'One strawberry ice cream, please!'.",
    "keyVocab": [
      {
        "en": "Ice Cream",
        "vi": "Kem ốc quế",
        "emoji": "🍦",
        "phonetic": "/ˌaɪs ˈkriːm/"
      },
      {
        "en": "Cone",
        "vi": "Vỏ ốc quế giòn",
        "emoji": "🧇",
        "phonetic": "/koʊn/"
      },
      {
        "en": "Chocolate",
        "vi": "Vị sô cô la",
        "emoji": "🍫",
        "phonetic": "/ˈtʃɑːk.lət/"
      },
      {
        "en": "Vanilla",
        "vi": "Vị vani",
        "emoji": "🍦",
        "phonetic": "/vəˈnɪl.ə/"
      },
      {
        "en": "Delicious",
        "vi": "Ngon tuyệt cú mèo",
        "emoji": "😋",
        "phonetic": "/dɪˈlɪʃ.əs/"
      },
      {
        "en": "Yummy",
        "vi": "Ngon ngon",
        "emoji": "🤤",
        "phonetic": "/ˈjʌm.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-toy-hospital-doctor",
    "title": "Toy Hospital: Doctor Steve Fixes Teddy Bear",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s8N_66kLx34",
    "duration": "10 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Bác sĩ Steve dùng ống nghe khám bệnh cho gấu bông Teddy bị đau bụng vì ăn quá nhiều kẹo ngọt.",
    "parentTip": "Giúp bé bớt sợ khi đi khám bác sĩ bằng cách chơi trò bác sĩ và bệnh nhân tại nhà.",
    "keyVocab": [
      {
        "en": "Doctor",
        "vi": "Bác sĩ",
        "emoji": "🧑‍⚕️",
        "phonetic": "/ˈdɑːk.tɚ/"
      },
      {
        "en": "Hospital",
        "vi": "Bệnh viện",
        "emoji": "🏥",
        "phonetic": "/ˈhɑː.spɪ.t̬əl/"
      },
      {
        "en": "Stethoscope",
        "vi": "Ống nghe y tế",
        "emoji": "🩺",
        "phonetic": "/ˈsteθ.ə.skoʊp/"
      },
      {
        "en": "Bandage",
        "vi": "Băng cứu thương",
        "emoji": "🩹",
        "phonetic": "/ˈbæn.dɪdʒ/"
      },
      {
        "en": "Teddy Bear",
        "vi": "Gấu bông",
        "emoji": "🧸",
        "phonetic": "/ˈted.i ˌber/"
      },
      {
        "en": "Medicine",
        "vi": "Thuốc uống",
        "emoji": "💊",
        "phonetic": "/ˈmed.ɪ.sən/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-camping-forest",
    "title": "Crazy Camping in the Forest with Birds",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s9P_55zQx56",
    "duration": "11 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Steve dựng lều cắm trại trong rừng, lắng nghe tiếng dế kêu đêm và cùng Maggie nướng kẹo dẻo bên bếp lửa hồng.",
    "parentTip": "Bé sẽ rất thích cảm giác ngủ trong lều! Có thể lấy chăn trùm lên bàn làm chiếc lều nhỏ cho bé.",
    "keyVocab": [
      {
        "en": "Camping",
        "vi": "Đi cắm trại",
        "emoji": "⛺",
        "phonetic": "/ˈkæm.pɪŋ/"
      },
      {
        "en": "Tent",
        "vi": "Chiếc lều bạt",
        "emoji": "🏕️",
        "phonetic": "/tent/"
      },
      {
        "en": "Campfire",
        "vi": "Lửa trại bập bùng",
        "emoji": "🔥",
        "phonetic": "/ˈkæmp.faɪr/"
      },
      {
        "en": "Sleeping Bag",
        "vi": "Túi ngủ ấm áp",
        "emoji": "🛌",
        "phonetic": "/ˈsliː.pɪŋ ˌbæɡ/"
      },
      {
        "en": "Flashlight",
        "vi": "Đèn pin soi đêm",
        "emoji": "🔦",
        "phonetic": "/ˈflæʃ.laɪt/"
      },
      {
        "en": "Stars",
        "vi": "Bầu trời đầy sao",
        "emoji": "✨",
        "phonetic": "/stɑːrz/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-giant-pizza-cooking",
    "title": "Making Giant Cheesy Pizza in the Kitchen",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s0Q_44pKs78",
    "duration": "12 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Nhào bột bánh pizza, rải sốt cà chua đỏ mọng, phô mai béo ngậy và nấm hương trước khi đưa vào lò nướng vàng ruộm.",
    "parentTip": "Cho bé tham gia vào bếp: Giúp mẹ rửa cà chua hoặc xếp các lát rau củ.",
    "keyVocab": [
      {
        "en": "Pizza",
        "vi": "Bánh pizza",
        "emoji": "🍕",
        "phonetic": "/ˈpiːt.sə/"
      },
      {
        "en": "Cheese",
        "vi": "Phô mai béo ngậy",
        "emoji": "🧀",
        "phonetic": "/tʃiːz/"
      },
      {
        "en": "Tomato",
        "vi": "Quả cà chua",
        "emoji": "🍅",
        "phonetic": "/təˈmeɪ.t̬oʊ/"
      },
      {
        "en": "Dough",
        "vi": "Bột nhào",
        "emoji": "🥟",
        "phonetic": "/doʊ/"
      },
      {
        "en": "Oven",
        "vi": "Lò nướng bánh",
        "emoji": "♨️",
        "phonetic": "/ˈʌv.ən/"
      },
      {
        "en": "Bake",
        "vi": "Nướng bánh thơm",
        "emoji": "🧑‍🍳",
        "phonetic": "/beɪk/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-zoo-escaped-monkey",
    "title": "Animals at the Zoo: Escaped Monkey Trick!",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s1R_33kLx90",
    "duration": "13 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "0-3 tuổi",
    "description": "Thăm sở thú gặp hươu cao cổ, voi con và chú khỉ tinh nghịch lén lấy trộm chuối của Steve leo lên ngọn cây.",
    "parentTip": "Bé bắt chước dáng đi của chú khỉ: Gãi đầu và kêu khẹc khẹc vui tai.",
    "keyVocab": [
      {
        "en": "Zoo",
        "vi": "Sở thú",
        "emoji": "🦁",
        "phonetic": "/zuː/"
      },
      {
        "en": "Giraffe",
        "vi": "Hươu cao cổ",
        "emoji": "🦒",
        "phonetic": "/dʒɪˈræf/"
      },
      {
        "en": "Elephant",
        "vi": "Chú voi to",
        "emoji": "🐘",
        "phonetic": "/ˈel.ə.fənt/"
      },
      {
        "en": "Monkey",
        "vi": "Con khỉ",
        "emoji": "🐒",
        "phonetic": "/ˈmʌŋ.ki/"
      },
      {
        "en": "Banana",
        "vi": "Quả chuối vàng",
        "emoji": "🍌",
        "phonetic": "/bəˈnæn.ə/"
      },
      {
        "en": "Laugh",
        "vi": "Tiếng cười vui",
        "emoji": "😂",
        "phonetic": "/læf/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "steve-maggie-halloween-costumes",
    "title": "Funny Halloween Costumes & Dress Up Time",
    "channel": "Steve & Maggie",
    "channelAvatar": "🧙‍♂️",
    "channelColor": "#EC4899",
    "youtubeId": "s2S_22zQe12",
    "duration": "10 phút",
    "category": "movement",
    "categoryNameVi": "Nhảy múa vui",
    "categoryEmoji": "🏃",
    "recommendedAge": "3-5 tuổi",
    "description": "Hóa trang thành phù thủy cầm chổi bay, bộ xương khiêu vũ và trái bí ngô mỉm cười thân thiện!",
    "parentTip": "Bé thích mặc đồ hóa trang nhân vật nào nhất? Khuyến khích bé tự tin thể hiện.",
    "keyVocab": [
      {
        "en": "Costume",
        "vi": "Trang phục hóa trang",
        "emoji": "🧙‍♀️",
        "phonetic": "/ˈkɑː.stuːm/"
      },
      {
        "en": "Pumpkin",
        "vi": "Quả bí ngô",
        "emoji": "🎃",
        "phonetic": "/ˈpʌmp.kɪn/"
      },
      {
        "en": "Ghost",
        "vi": "Con ma thân thiện",
        "emoji": "👻",
        "phonetic": "/ɡoʊst/"
      },
      {
        "en": "Witch",
        "vi": "Phù thủy",
        "emoji": "🧙‍♀️",
        "phonetic": "/wɪtʃ/"
      },
      {
        "en": "Broom",
        "vi": "Cây chổi bay",
        "emoji": "🧹",
        "phonetic": "/bruːm/"
      },
      {
        "en": "Trick or Treat",
        "vi": "Cho kẹo hay bị ghẹo",
        "emoji": "🍬",
        "phonetic": "/ˌtrɪk ɔːr ˈtriːt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-bumble-pineapple-cake",
    "title": "The Bumble Nums: Spinning Pineapple Cake",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b5T_99pLs4Q",
    "duration": "7 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Ba bạn quái vật ẩm thực Bumble Nums đi thu thập quả dứa quay tròn trên đỉnh núi để làm món bánh dứa thơm lừng.",
    "parentTip": "Bé học được sự phối hợp đồng đội khi làm việc nhóm để giải quyết khó khăn.",
    "keyVocab": [
      {
        "en": "Pineapple",
        "vi": "Quả dứa (thơm)",
        "emoji": "🍍",
        "phonetic": "/ˈpaɪnˌæp.əl/"
      },
      {
        "en": "Spin",
        "vi": "Xoay tít",
        "emoji": "🌀",
        "phonetic": "/spɪn/"
      },
      {
        "en": "Cake",
        "vi": "Bánh ngọt thơm",
        "emoji": "🎂",
        "phonetic": "/keɪk/"
      },
      {
        "en": "Cook",
        "vi": "Nấu nướng",
        "emoji": "🍳",
        "phonetic": "/kʊk/"
      },
      {
        "en": "Teamwork",
        "vi": "Làm việc nhóm",
        "emoji": "🤝",
        "phonetic": "/ˈtiːm.wɝːk/"
      },
      {
        "en": "Yummy",
        "vi": "Ngon tuyệt",
        "emoji": "😋",
        "phonetic": "/ˈjʌm.i/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-carl-monster-truck-wash",
    "title": "Carl's Car Wash: Muddy Monster Truck Clean",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b6R_88zQe91",
    "duration": "6 phút",
    "category": "vehicles",
    "categoryNameVi": "Xe & Cứu hộ",
    "categoryEmoji": "🚗",
    "recommendedAge": "0-3 tuổi",
    "description": "Chú thợ Carl đánh giá độ bẩn của xe bán tải, chọn lượng xà phòng và điều khiển máy rửa xe làm sạch bóng loáng.",
    "parentTip": "Bé đếm số vệt bẩn trên xe và cùng Carl bấm nút màu xanh kích hoạt rửa xe.",
    "keyVocab": [
      {
        "en": "Car Wash",
        "vi": "Tiệm rửa xe",
        "emoji": "🚿",
        "phonetic": "/ˈkɑːr ˌwɑːʃ/"
      },
      {
        "en": "Muddy",
        "vi": "Dính bùn bẩn",
        "emoji": "💩",
        "phonetic": "/ˈmʌd.i/"
      },
      {
        "en": "Clean",
        "vi": "Sạch bóng",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      },
      {
        "en": "Button",
        "vi": "Nút bấm",
        "emoji": "🔘",
        "phonetic": "/ˈbʌt̬.ən/"
      },
      {
        "en": "Sponge",
        "vi": "Miếng bọt biển",
        "emoji": "🧽",
        "phonetic": "/spʌndʒ/"
      },
      {
        "en": "Sparkle",
        "vi": "Lấp lánh",
        "emoji": "🌟",
        "phonetic": "/ˈspɑːr.kəl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-bumble-flying-peach",
    "title": "The Bumble Nums: Flying Peach Salad",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b7M_77xPr12",
    "duration": "8 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Những quả đào biết bay lượn trên bầu trời! Bumble Nums dùng vợt bắt đủ 5 quả đào để làm món sa lát trái cây tươi.",
    "parentTip": "Hỏi bé quả đào màu gì và đếm từ 1 đến 5 khi Bumble Nums bắt từng quả đào.",
    "keyVocab": [
      {
        "en": "Peach",
        "vi": "Quả đào tiên",
        "emoji": "🍑",
        "phonetic": "/piːtʃ/"
      },
      {
        "en": "Fly",
        "vi": "Bay lượn",
        "emoji": "🪽",
        "phonetic": "/flaɪ/"
      },
      {
        "en": "Salad",
        "vi": "Món sa lát",
        "emoji": "🥗",
        "phonetic": "/ˈsæl.əd/"
      },
      {
        "en": "Net",
        "vi": "Cái vợt lưới",
        "emoji": "🥅",
        "phonetic": "/net/"
      },
      {
        "en": "Catch",
        "vi": "Bắt lấy",
        "emoji": "🧤",
        "phonetic": "/kætʃ/"
      },
      {
        "en": "Sweet",
        "vi": "Ngọt ngào",
        "emoji": "🍯",
        "phonetic": "/swiːt/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-finny-shark-sharing",
    "title": "Finny the Shark: Sharing Toys with Friends",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b8N_66kLx34",
    "duration": "6 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Chú cá mập nhỏ Finny học cách nhường đồ chơi và cùng bạn bạch tuộc chơi xếp hình dưới đáy đại dương.",
    "parentTip": "Khuyến khích bé chia sẻ đồ chơi với bạn khi đi nhà trẻ.",
    "keyVocab": [
      {
        "en": "Shark",
        "vi": "Cá mập Finny",
        "emoji": "🦈",
        "phonetic": "/ʃɑːrk/"
      },
      {
        "en": "Share",
        "vi": "Chia sẻ đồ chơi",
        "emoji": "🤝",
        "phonetic": "/ʃer/"
      },
      {
        "en": "Toy",
        "vi": "Đồ chơi",
        "emoji": "🧸",
        "phonetic": "/tɔɪ/"
      },
      {
        "en": "Friends",
        "vi": "Những người bạn",
        "emoji": "🧑‍🤝‍🧑",
        "phonetic": "/frendz/"
      },
      {
        "en": "Octopus",
        "vi": "Bạch tuộc",
        "emoji": "🐙",
        "phonetic": "/ˈɑːk.tə.pəs/"
      },
      {
        "en": "Play",
        "vi": "Chơi cùng nhau",
        "emoji": "⚽",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-clean-up-song-habits",
    "title": "Clean Up Song! Tidy Up Toys Together",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b9P_55zQx56",
    "duration": "5 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Bài hát kinh điển rèn thói quen tự giác thu dọn đồ chơi vào rổ sau khi chơi xong: Clean up, clean up, everybody clean up!",
    "parentTip": "Bật bài hát này mỗi khi đến giờ thu dọn đồ chơi để bé biến việc dọn dẹp thành một trò chơi vui vẻ.",
    "keyVocab": [
      {
        "en": "Clean Up",
        "vi": "Thu dọn gọn gàng",
        "emoji": "🧹",
        "phonetic": "/kliːn ʌp/"
      },
      {
        "en": "Tidy",
        "vi": "Ngăn nắp",
        "emoji": "📦",
        "phonetic": "/ˈtaɪ.di/"
      },
      {
        "en": "Toys",
        "vi": "Đồ chơi",
        "emoji": "🧸",
        "phonetic": "/tɔɪz/"
      },
      {
        "en": "Put Away",
        "vi": "Cất vào chỗ cũ",
        "emoji": "📥",
        "phonetic": "/pʊt əˈweɪ/"
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ nhau",
        "emoji": "🤲",
        "phonetic": "/help/"
      },
      {
        "en": "Good Job",
        "vi": "Làm tốt lắm",
        "emoji": "👍",
        "phonetic": "/ɡʊd dʒɑːb/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-peekaboo-animal-faces",
    "title": "Peekaboo I See You! Animal Faces",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b0Q_44pKs78",
    "duration": "6 phút",
    "category": "speech",
    "categoryNameVi": "Bé tập nói",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Trò chơi ú òa kinh điển cho trẻ sơ sinh và mầm non: Lấy hai tay che mặt rồi mở ra: Peekaboo! I see you!",
    "parentTip": "Chơi ú òa cùng bé để tạo tiếng cười sảng khoái và phát triển nhận thức tồn tại của vật thể.",
    "keyVocab": [
      {
        "en": "Peekaboo",
        "vi": "Ú òa",
        "emoji": "🙈",
        "phonetic": "/ˈpiː.kə.buː/"
      },
      {
        "en": "See",
        "vi": "Nhìn thấy",
        "emoji": "👀",
        "phonetic": "/siː/"
      },
      {
        "en": "Hide",
        "vi": "Trốn đi",
        "emoji": "🫣",
        "phonetic": "/haɪd/"
      },
      {
        "en": "Eyes",
        "vi": "Đôi mắt",
        "emoji": "👁️",
        "phonetic": "/aɪz/"
      },
      {
        "en": "Surprise",
        "vi": "Bất ngờ thú vị",
        "emoji": "😲",
        "phonetic": "/sɚˈpraɪz/"
      },
      {
        "en": "Baby",
        "vi": "Em bé",
        "emoji": "👶",
        "phonetic": "/ˈbeɪ.bi/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-five-little-ducks-swim",
    "title": "Five Little Ducks Went Swimming One Day",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b1R_33kLx90",
    "duration": "6 phút",
    "category": "math",
    "categoryNameVi": "Đếm số 123",
    "categoryEmoji": "🔢",
    "recommendedAge": "0-3 tuổi",
    "description": "Năm chú vịt con bơi qua đồi chơi xa, vịt mẹ quác quác gọi từng chú vịt bơi quay về đàn.",
    "parentTip": "Giúp bé học đếm giảm dần: 5 vịt con, bớt 1 còn 4, bớt 1 còn 3...",
    "keyVocab": [
      {
        "en": "Five",
        "vi": "Số năm",
        "emoji": "5️⃣",
        "phonetic": "/faɪv/"
      },
      {
        "en": "Ducks",
        "vi": "Đàn vịt con",
        "emoji": "🦆",
        "phonetic": "/dʌks/"
      },
      {
        "en": "Swim",
        "vi": "Bơi lội",
        "emoji": "🏊",
        "phonetic": "/swɪm/"
      },
      {
        "en": "Hill",
        "vi": "Ngọn đồi xanh",
        "emoji": "⛰️",
        "phonetic": "/hɪl/"
      },
      {
        "en": "Quack",
        "vi": "Cạp cạp",
        "emoji": "📢",
        "phonetic": "/kwæk/"
      },
      {
        "en": "Mother",
        "vi": "Vịt mẹ",
        "emoji": "🦆",
        "phonetic": "/ˈmʌð.ɚ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "super-simple-mulberry-wash-hands",
    "title": "This Is the Way We Wash Our Hands",
    "channel": "Super Simple",
    "channelAvatar": "🎵",
    "channelColor": "#10B981",
    "youtubeId": "b2S_22zQe12",
    "duration": "5 phút",
    "category": "habits",
    "categoryNameVi": "Thói quen tốt",
    "categoryEmoji": "💖",
    "recommendedAge": "0-3 tuổi",
    "description": "Dạy bé rửa tay đúng cách với xà phòng, chải răng trắng sáng và mặc quần áo vào mỗi buổi sáng sớm.",
    "parentTip": "Cùng bé xoa hai bàn tay tạo bọt xà phòng trong 20 giây theo bài hát.",
    "keyVocab": [
      {
        "en": "Wash Hands",
        "vi": "Rửa tay sạch sẽ",
        "emoji": "🧼",
        "phonetic": "/wɑːʃ hændz/"
      },
      {
        "en": "Brush Teeth",
        "vi": "Chải răng",
        "emoji": "🪥",
        "phonetic": "/brʌʃ tiːθ/"
      },
      {
        "en": "Comb Hair",
        "vi": "Chải tóc gọn gàng",
        "emoji": "🪮",
        "phonetic": "/koʊm her/"
      },
      {
        "en": "Morning",
        "vi": "Buổi sáng sớm",
        "emoji": "🌅",
        "phonetic": "/ˈmɔːr.nɪŋ/"
      },
      {
        "en": "Water",
        "vi": "Vòi nước mát",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      },
      {
        "en": "Clean",
        "vi": "Thơm tho sạch",
        "emoji": "✨",
        "phonetic": "/kliːn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-butterfly-life-cycle",
    "title": "Butterfly Life Cycle & Cocoon in the Garden",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c5T_99pLs4Q",
    "duration": "14 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Khám phá vòng đời bướm kỳ diệu: Trứng nở thành sâu bướm háu ăn, cuộn mình trong kén tơ và hóa thành bướm xinh đẹp.",
    "parentTip": "Bé hãy nằm cuộn tròn như chiếc kén, rồi dang rộng hai tay vỗ cánh như chú bướm bay lượn.",
    "keyVocab": [
      {
        "en": "Caterpillar",
        "vi": "Sâu bướm",
        "emoji": "🐛",
        "phonetic": "/ˈkæt̬.ɚˌpɪl.ɚ/"
      },
      {
        "en": "Cocoon",
        "vi": "Kén bướm",
        "emoji": "🧶",
        "phonetic": "/kəˈkuːn/"
      },
      {
        "en": "Butterfly",
        "vi": "Bướm xinh",
        "emoji": "🦋",
        "phonetic": "/ˈbʌt̬.ɚ.flaɪ/"
      },
      {
        "en": "Egg",
        "vi": "Quả trứng nhỏ",
        "emoji": "🥚",
        "phonetic": "/eɡ/"
      },
      {
        "en": "Garden",
        "vi": "Khu vườn hoa",
        "emoji": "🏡",
        "phonetic": "/ˈɡɑːr.dən/"
      },
      {
        "en": "Fly",
        "vi": "Bay lượn",
        "emoji": "🪽",
        "phonetic": "/flaɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-deep-sea-creatures",
    "title": "Under the Deep Blue Sea with Sea Creatures",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c6R_88zQe91",
    "duration": "16 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Lớp học của cô Caitie biến thành tàu thám hiểm đại dương ngắm cá voi lưng gù, cua biển bò ngang và hải mã to lớn.",
    "parentTip": "Cùng bé dùng hai ngón tay làm càng cua kẹp kẹp vui vẻ.",
    "keyVocab": [
      {
        "en": "Sea",
        "vi": "Biển cả",
        "emoji": "🌊",
        "phonetic": "/siː/"
      },
      {
        "en": "Whale",
        "vi": "Cá voi khổng lồ",
        "emoji": "🐋",
        "phonetic": "/weɪl/"
      },
      {
        "en": "Crab",
        "vi": "Con cua kẹp",
        "emoji": "🦀",
        "phonetic": "/kræb/"
      },
      {
        "en": "Seahorse",
        "vi": "Cá ngựa",
        "emoji": "🫧",
        "phonetic": "/ˈsiːˌhɔːrs/"
      },
      {
        "en": "Starfish",
        "vi": "Sao biển",
        "emoji": "⭐",
        "phonetic": "/ˈstɑːr.fɪʃ/"
      },
      {
        "en": "Submarine",
        "vi": "Tàu ngầm lặn",
        "emoji": "🚤",
        "phonetic": "/ˌsʌb.məˈriːn/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-bakery-bread-visit",
    "title": "Visiting the Bakery: How Warm Bread Is Baked",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c7M_77xPr12",
    "duration": "15 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Thăm tiệm bánh mì thơm phức: Trộn bột mì với men nở, nhào nặn thành hình bánh mì dài và đưa vào lò nướng giòn rụm.",
    "parentTip": "Cho bé thử ngửi mùi bánh mì mới nướng để kích thích khứu giác phong phú.",
    "keyVocab": [
      {
        "en": "Bakery",
        "vi": "Tiệm bánh mì",
        "emoji": "🥖",
        "phonetic": "/ˈbeɪ.kɚ.i/"
      },
      {
        "en": "Bread",
        "vi": "Bánh mì nóng giòn",
        "emoji": "🍞",
        "phonetic": "/bred/"
      },
      {
        "en": "Flour",
        "vi": "Bột mì trắng",
        "emoji": "🌾",
        "phonetic": "/faʊr/"
      },
      {
        "en": "Knead",
        "vi": "Nhào bột",
        "emoji": "🥟",
        "phonetic": "/niːd/"
      },
      {
        "en": "Warm",
        "vi": "Ấm áp",
        "emoji": "♨️",
        "phonetic": "/wɔːrm/"
      },
      {
        "en": "Baker",
        "vi": "Bác thợ làm bánh",
        "emoji": "🧑‍🍳",
        "phonetic": "/ˈbeɪ.kɚ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-weather-four-seasons",
    "title": "Four Seasons & Sunny Rainy Weather",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c8N_66kLx34",
    "duration": "14 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Khám phá 4 mùa Xuân - Hạ - Thu - Đông và các kiểu thời tiết: Nắng ấm, mưa rơi tí tách, gió thổi bay diều và tuyết rơi.",
    "parentTip": "Mỗi sáng cùng bé nhìn qua cửa sổ xem hôm nay là ngày nắng hay ngày mưa.",
    "keyVocab": [
      {
        "en": "Spring",
        "vi": "Mùa xuân hoa nở",
        "emoji": "🌸",
        "phonetic": "/sprɪŋ/"
      },
      {
        "en": "Summer",
        "vi": "Mùa hè nắng ấm",
        "emoji": "☀️",
        "phonetic": "/ˈsʌm.ɚ/"
      },
      {
        "en": "Autumn",
        "vi": "Mùa thu lá vàng",
        "emoji": "🍂",
        "phonetic": "/ˈɑː.t̬əm/"
      },
      {
        "en": "Winter",
        "vi": "Mùa đông tuyết lạnh",
        "emoji": "⛄",
        "phonetic": "/ˈwɪn.t̬ɚ/"
      },
      {
        "en": "Sunny",
        "vi": "Trời nắng đẹp",
        "emoji": "🌤️",
        "phonetic": "/ˈsʌn.i/"
      },
      {
        "en": "Rainy",
        "vi": "Trời mưa ướt",
        "emoji": "🌧️",
        "phonetic": "/ˈreɪ.ni/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-diy-space-rocket",
    "title": "Building a Cardboard Space Rocket at Home",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c9P_55zQx56",
    "duration": "16 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Tận dụng thùng các tông cũ dán giấy bạc và vẽ nút bấm điều khiển để tạo thành chiếc tàu vũ trụ thám hiểm các vì sao.",
    "parentTip": "Cùng bé tự chế đồ chơi thủ công từ vật liệu tái chế để phát triển óc sáng tạo.",
    "keyVocab": [
      {
        "en": "Cardboard",
        "vi": "Bìa các tông",
        "emoji": "📦",
        "phonetic": "/ˈkɑːrd.bɔːrd/"
      },
      {
        "en": "Rocket",
        "vi": "Tàu vũ trụ",
        "emoji": "🚀",
        "phonetic": "/ˈrɑː.kɪt/"
      },
      {
        "en": "Glue",
        "vi": "Keo dán",
        "emoji": "🧴",
        "phonetic": "/ɡluː/"
      },
      {
        "en": "Paint",
        "vi": "Màu vẽ",
        "emoji": "🎨",
        "phonetic": "/peɪnt/"
      },
      {
        "en": "Scissors",
        "vi": "Cái kéo",
        "emoji": "✂️",
        "phonetic": "/ˈsɪz.ɚz/"
      },
      {
        "en": "Craft",
        "vi": "Thủ công",
        "emoji": "✂️",
        "phonetic": "/kræft/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-musical-instruments-sounds",
    "title": "Musical Instruments: Drum, Flute & Guitar",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c0Q_44pKs78",
    "duration": "13 phút",
    "category": "speech",
    "categoryNameVi": "Bé tập nói",
    "categoryEmoji": "🗣️",
    "recommendedAge": "0-3 tuổi",
    "description": "Lắng nghe và phân biệt âm thanh của trống gõ tùng tùng, kèn sáo véo von, đàn piano trầm bổng và ghi ta rộn rã.",
    "parentTip": "Bé có thể lấy hai chiếc đũa gõ vào nồi nhựa làm bộ trống ban nhạc nhí!",
    "keyVocab": [
      {
        "en": "Drum",
        "vi": "Cái trống tùng tùng",
        "emoji": "🥁",
        "phonetic": "/drʌm/"
      },
      {
        "en": "Guitar",
        "vi": "Đàn ghi ta",
        "emoji": "🎸",
        "phonetic": "/ɡɪˈtɑːr/"
      },
      {
        "en": "Piano",
        "vi": "Đàn pi-a-nô",
        "emoji": "🎹",
        "phonetic": "/piˈæn.oʊ/"
      },
      {
        "en": "Flute",
        "vi": "Cây sáo nhỏ",
        "emoji": "🪈",
        "phonetic": "/fluːt/"
      },
      {
        "en": "Music",
        "vi": "Âm nhạc",
        "emoji": "🎶",
        "phonetic": "/ˈmjuː.zɪk/"
      },
      {
        "en": "Play",
        "vi": "Chơi nhạc cụ",
        "emoji": "🎵",
        "phonetic": "/pleɪ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-planting-flowers-spring",
    "title": "Planting Flower Seeds in Spring Soil",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c1R_33kLx90",
    "duration": "14 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Xới đất mùn tơi xốp, gieo hạt giống hoa cúc, tưới nước bằng bình ô doa và chờ đón những mầm non đầu tiên vươn lên.",
    "parentTip": "Dạy bé tình yêu với cây xanh và trách nhiệm tưới cây hàng ngày.",
    "keyVocab": [
      {
        "en": "Plant",
        "vi": "Trồng cây",
        "emoji": "🪴",
        "phonetic": "/plænt/"
      },
      {
        "en": "Soil",
        "vi": "Đất trồng",
        "emoji": "🌱",
        "phonetic": "/sɔɪl/"
      },
      {
        "en": "Watering Can",
        "vi": "Bình tưới cây",
        "emoji": "🚿",
        "phonetic": "/ˈwɑː.t̬ɚ.ɪŋ ˌkæn/"
      },
      {
        "en": "Seeds",
        "vi": "Hạt giống",
        "emoji": "🌾",
        "phonetic": "/siːdz/"
      },
      {
        "en": "Sprout",
        "vi": "Chồi non mơn mởn",
        "emoji": "🌿",
        "phonetic": "/spraʊt/"
      },
      {
        "en": "Flower",
        "vi": "Bông hoa tươi",
        "emoji": "🌸",
        "phonetic": "/ˈflaʊ.ɚ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "caitie-fire-station-community",
    "title": "Visiting the Community Fire Station & Hose",
    "channel": "Caitie's Classroom",
    "channelAvatar": "🎨",
    "channelColor": "#F59E0B",
    "youtubeId": "c2S_22zQe12",
    "duration": "15 phút",
    "category": "world",
    "categoryNameVi": "Khám phá",
    "categoryEmoji": "🌍",
    "recommendedAge": "3-5 tuổi",
    "description": "Thăm trạm cứu hỏa khu phố, học các biển báo an toàn PCCC và chiêm ngưỡng chiếc thang cứu hỏa vươn cao tít tắp.",
    "parentTip": "Dạy bé cách nhận biết lối thoát hiểm và không chơi đùa với bật lửa, diêm quẹt.",
    "keyVocab": [
      {
        "en": "Fire Station",
        "vi": "Trạm cứu hỏa",
        "emoji": "🚒",
        "phonetic": "/ˈfaɪr ˌsteɪ.ʃən/"
      },
      {
        "en": "Hose",
        "vi": "Vòi phun nước",
        "emoji": "🚿",
        "phonetic": "/hoʊz/"
      },
      {
        "en": "Ladder",
        "vi": "Chiếc thang cao",
        "emoji": "🪜",
        "phonetic": "/ˈlæd.ɚ/"
      },
      {
        "en": "Safe",
        "vi": "An toàn",
        "emoji": "🛡️",
        "phonetic": "/seɪf/"
      },
      {
        "en": "Help",
        "vi": "Giúp đỡ mọi người",
        "emoji": "🤝",
        "phonetic": "/help/"
      },
      {
        "en": "Helmet",
        "vi": "Mũ bảo hộ đỏ",
        "emoji": "⛑️",
        "phonetic": "/ˈhel.mət/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-coral-reef-tropical-fish-4k",
    "title": "Mesmerizing 4K Coral Reef & Tropical Sea Life",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "1La4QzGeaaQ",
    "duration": "60 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Thước phim 4K siêu sắc nét về rạn san hô rực rỡ, cá hề Nemo, cá bắp nẻ xanh và rùa biển bơi lội thanh bình dưới đại dương.",
    "parentTip": "Nhạc nền đại dương du dương không lời giúp bé thư giãn, tĩnh tâm và ngủ ngon.",
    "keyVocab": [
      {
        "en": "Coral Reef",
        "vi": "Rạn san hô",
        "emoji": "🪸",
        "phonetic": "/ˈkɔːr.əl riːf/"
      },
      {
        "en": "Clownfish",
        "vi": "Cá hề Nemo",
        "emoji": "🐠",
        "phonetic": "/ˈklaʊn.fɪʃ/"
      },
      {
        "en": "Anemone",
        "vi": "Hải quỳ",
        "emoji": "🪸",
        "phonetic": "/əˈnem.ə.ni/"
      },
      {
        "en": "Sea Turtle",
        "vi": "Rùa biển",
        "emoji": "🐢",
        "phonetic": "/ˈsiː ˌtɝː.t̬əl/"
      },
      {
        "en": "Clear Water",
        "vi": "Làn nước trong xanh",
        "emoji": "🌊",
        "phonetic": "/klɪr ˈwɔː.tər/"
      },
      {
        "en": "Peaceful",
        "vi": "Thanh bình êm dịu",
        "emoji": "🕊️",
        "phonetic": "/ˈpiːs.fəl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-giant-pandas-bamboo-forest-4k",
    "title": "Giant Pandas Munching Bamboo in Mist Forest 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "_tE_gG98oQk",
    "duration": "45 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Đàn gấu trúc mẹ và con nhai tre giòn rụm trong rừng tre mù sương Tứ Xuyên với những cử chỉ chậm rãi ngộ nghĩnh.",
    "parentTip": "Âm thanh gặm tre rôm rốp kích thích sự chú ý và tính tò mò khám phá của trẻ.",
    "keyVocab": [
      {
        "en": "Giant Panda",
        "vi": "Gấu trúc lớn",
        "emoji": "🐼",
        "phonetic": "/ˌdʒaɪ.ənt ˈpæn.də/"
      },
      {
        "en": "Bamboo",
        "vi": "Tre trúc xanh",
        "emoji": "🎋",
        "phonetic": "/bæmˈbuː/"
      },
      {
        "en": "Forest",
        "vi": "Rừng rậm mù sương",
        "emoji": "🌲",
        "phonetic": "/ˈfɔːr.ɪst/"
      },
      {
        "en": "Munch",
        "vi": "Nhai giòn rôm rốp",
        "emoji": "😋",
        "phonetic": "/mʌntʃ/"
      },
      {
        "en": "Cute",
        "vi": "Đáng yêu",
        "emoji": "🥰",
        "phonetic": "/kjuːt/"
      },
      {
        "en": "Climb",
        "vi": "Leo trèo cành cây",
        "emoji": "🧗",
        "phonetic": "/klaɪm/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-polar-bears-arctic-ice-4k",
    "title": "Arctic Polar Bears & Playful Cubs on Ice 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "4q9Yk_77pLs",
    "duration": "50 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Gia đình gấu Bắc Cực sải bước kiêu hãnh trên tảng băng trắng xóa và ngụp lặn bắt cá dưới làn nước lạnh như băng.",
    "parentTip": "Bé quan sát lớp mỡ và bộ lông dày giữ ấm cho gấu giữa cái lạnh âm 30 độ.",
    "keyVocab": [
      {
        "en": "Polar Bear",
        "vi": "Gấu Bắc Cực",
        "emoji": "🐻‍❄️",
        "phonetic": "/ˌpoʊ.lɚ ˈber/"
      },
      {
        "en": "Arctic",
        "vi": "Bắc Cực băng giá",
        "emoji": "❄️",
        "phonetic": "/ˈɑːrk.tɪk/"
      },
      {
        "en": "Iceberg",
        "vi": "Tảng băng trôi",
        "emoji": "🧊",
        "phonetic": "/ˈaɪs.bɝːɡ/"
      },
      {
        "en": "Swim",
        "vi": "Bơi lội cừ khôi",
        "emoji": "🏊",
        "phonetic": "/swɪm/"
      },
      {
        "en": "White Fur",
        "vi": "Lông trắng tinh",
        "emoji": "🤍",
        "phonetic": "/waɪt fɝː/"
      },
      {
        "en": "Strong",
        "vi": "Mạnh mẽ",
        "emoji": "💪",
        "phonetic": "/strɑːŋ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-gentle-blue-whales-dolphins-4k",
    "title": "Majestic Blue Whales & Ocean Pods 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "v7F1e_88zQx",
    "duration": "55 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Sinh vật lớn nhất Trái Đất - Cá voi xanh khổng lồ phun cột nước trắng xóa lên bầu trời giữa đại dương bao la.",
    "parentTip": "Bật mí cho bé tim cá voi xanh to bằng cả một chiếc xe ô tô con!",
    "keyVocab": [
      {
        "en": "Blue Whale",
        "vi": "Cá voi xanh",
        "emoji": "🐋",
        "phonetic": "/bluː weɪl/"
      },
      {
        "en": "Spout",
        "vi": "Phun cột nước",
        "emoji": "🐳",
        "phonetic": "/spaʊt/"
      },
      {
        "en": "Deep Ocean",
        "vi": "Biển sâu thẳm",
        "emoji": "🌊",
        "phonetic": "/diːp ˈoʊ.ʃən/"
      },
      {
        "en": "Huge",
        "vi": "Khổng lồ to lớn",
        "emoji": "🐘",
        "phonetic": "/hjuːdʒ/"
      },
      {
        "en": "Sing",
        "vi": "Tiếng hát cá voi",
        "emoji": "🎵",
        "phonetic": "/sɪŋ/"
      },
      {
        "en": "Gentle",
        "vi": "Hiền lành",
        "emoji": "💙",
        "phonetic": "/ˈdʒen.t̬əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-colorful-birds-of-paradise-4k",
    "title": "Colorful Birds of Paradise in Rainforest 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "m2K9o_11pKs",
    "duration": "40 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Vũ khúc mê hoặc của các loài chim thiên đường với bộ lông phát sáng rực rỡ sắc màu giữa rừng nguyên sinh.",
    "parentTip": "Bé học phân biệt muôn vàn màu sắc óng ánh: ngọc lục bảo, lam ngọc, vàng óng và đỏ thắm.",
    "keyVocab": [
      {
        "en": "Bird of Paradise",
        "vi": "Chim thiên đường",
        "emoji": "🦚",
        "phonetic": "/ˌbɝːd əv ˈper.ə.daɪs/"
      },
      {
        "en": "Feathers",
        "vi": "Lông vũ rực rỡ",
        "emoji": "🪶",
        "phonetic": "/ˈfeð.ɚz/"
      },
      {
        "en": "Rainforest",
        "vi": "Rừng mưa nhiệt đới",
        "emoji": "🌴",
        "phonetic": "/ˈreɪn.fɔːr.ɪst/"
      },
      {
        "en": "Dance",
        "vi": "Vũ điệu khiêu vũ",
        "emoji": "💃",
        "phonetic": "/dæns/"
      },
      {
        "en": "Bright",
        "vi": "Sáng rực",
        "emoji": "✨",
        "phonetic": "/braɪt/"
      },
      {
        "en": "Singing",
        "vi": "Hót líu lo",
        "emoji": "🎶",
        "phonetic": "/ˈsɪŋ.ɪŋ/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-koalas-kangaroos-australia-4k",
    "title": "Gentle Australian Koalas & Red Kangaroos 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "w8Q3o_55xPr",
    "duration": "42 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Gấu túi Koala ôm cành cây bạch đàn ngủ say sưa và chuột túi Kangaroo mang con nhỏ trong chiếc túi trước bụng.",
    "parentTip": "Bé hãy thử nhảy lò cò bằng hai chân như chú Kangaroo xem ai nhảy xa hơn nhé!",
    "keyVocab": [
      {
        "en": "Koala",
        "vi": "Gấu túi Koala",
        "emoji": "🐨",
        "phonetic": "/koʊˈɑː.lə/"
      },
      {
        "en": "Kangaroo",
        "vi": "Chuột túi Kangaroo",
        "emoji": "🦘",
        "phonetic": "/ˌkæŋ.ɡəˈruː/"
      },
      {
        "en": "Pouch",
        "vi": "Chiếc túi trước bụng",
        "emoji": "👜",
        "phonetic": "/paʊtʃ/"
      },
      {
        "en": "Eucalyptus",
        "vi": "Lá cây bạch đàn",
        "emoji": "🌿",
        "phonetic": "/ˌjuː.kəlˈɪp.təs/"
      },
      {
        "en": "Hop",
        "vi": "Nhảy lò cò",
        "emoji": "🦘",
        "phonetic": "/hɑːp/"
      },
      {
        "en": "Australia",
        "vi": "Nước Úc",
        "emoji": "🦘",
        "phonetic": "/ɑːˈstreɪl.jə/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-majestic-golden-eagles-4k",
    "title": "Majestic Golden Eagles Soaring Peaks 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "z4V8e_22pKs",
    "duration": "35 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Đại bàng hoàng kim sải cánh rộng thênh thang chao liệng trên đỉnh núi tuyết hùng vĩ của dãy Alps.",
    "parentTip": "Dang rộng hai tay như đôi cánh đại bàng lượn theo luồng gió trên núi cao.",
    "keyVocab": [
      {
        "en": "Eagle",
        "vi": "Chim đại bàng",
        "emoji": "🦅",
        "phonetic": "/ˈiː.ɡəl/"
      },
      {
        "en": "Soar",
        "vi": "Chao liệng trên cao",
        "emoji": "🪽",
        "phonetic": "/sɔːr/"
      },
      {
        "en": "Mountain Peak",
        "vi": "Đỉnh núi mây mù",
        "emoji": "🏔️",
        "phonetic": "/ˈmaʊn.tən piːk/"
      },
      {
        "en": "Sharp Eyes",
        "vi": "Đôi mắt tinh anh",
        "emoji": "👁️",
        "phonetic": "/ʃɑːrp aɪz/"
      },
      {
        "en": "Wingspan",
        "vi": "Sải cánh rộng lớn",
        "emoji": "🪽",
        "phonetic": "/ˈwɪŋ.spæn/"
      },
      {
        "en": "Majestic",
        "vi": "Hùng vĩ oai phong",
        "emoji": "👑",
        "phonetic": "/məˈdʒes.tɪk/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-playful-river-otters-4k",
    "title": "Playful River Otters Swimming & Sliding 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "r6M2p_77kLx",
    "duration": "38 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Những chú rái cá sông tinh nghịch trượt dốc bùn xuống dòng suối trong vắt và nắm tay nhau khi ngủ trên mặt nước.",
    "parentTip": "Bật mí cho bé rái cá biết nắm tay nhau khi ngủ để không bị dòng nước cuốn trôi xa nhau đấy!",
    "keyVocab": [
      {
        "en": "River Otter",
        "vi": "Rái cá sông",
        "emoji": "🦦",
        "phonetic": "/ˈrɪv.ɚ ˈɑː.t̬ɚ/"
      },
      {
        "en": "Slide",
        "vi": "Trượt dốc nước",
        "emoji": "🛝",
        "phonetic": "/slaɪd/"
      },
      {
        "en": "Stream",
        "vi": "Dòng suối mát",
        "emoji": "🏞️",
        "phonetic": "/striːm/"
      },
      {
        "en": "Hold Hands",
        "vi": "Nắm tay nhau",
        "emoji": "🤝",
        "phonetic": "/hoʊld hændz/"
      },
      {
        "en": "Playful",
        "vi": "Nghịch ngợm vui tươi",
        "emoji": "🎉",
        "phonetic": "/ˈpleɪ.fəl/"
      },
      {
        "en": "Water",
        "vi": "Làn nước suối",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-adorable-red-pandas-4k",
    "title": "Adorable Red Pandas in Mountain Tree Tops 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "t1L7o_33zQe",
    "duration": "36 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Gấu trúc đỏ có chiếc đuôi bông xù vằn cam trắng leo trèo khéo léo trên các cành cây phủ đầy rêu xanh.",
    "parentTip": "Đuôi gấu trúc đỏ giúp chúng giữ thăng bằng tuyệt vời trên những cành cây nhỏ.",
    "keyVocab": [
      {
        "en": "Red Panda",
        "vi": "Gấu trúc đỏ",
        "emoji": "🦊",
        "phonetic": "/red ˈpæn.də/"
      },
      {
        "en": "Fluffy Tail",
        "vi": "Chiếc đuôi xù",
        "emoji": "🪶",
        "phonetic": "/ˈflʌf.i teɪl/"
      },
      {
        "en": "Tree Tops",
        "vi": "Ngọn cây cao",
        "emoji": "🌳",
        "phonetic": "/triː tɑːps/"
      },
      {
        "en": "Balance",
        "vi": "Giữ thăng bằng",
        "emoji": "⚖️",
        "phonetic": "/ˈbæl.əns/"
      },
      {
        "en": "Moss",
        "vi": "Rêu xanh",
        "emoji": "🌿",
        "phonetic": "/mɑːs/"
      },
      {
        "en": "Gentle",
        "vi": "Hiền lành",
        "emoji": "🥰",
        "phonetic": "/ˈdʒen.t̬əl/"
      }
    ],
    "isFeatured": false
  },
  {
    "id": "safari-desert-camels-oasis-4k",
    "title": "Desert Camels & Wildlife at the Oasis 4K",
    "channel": "Wild Safari",
    "channelAvatar": "🦁",
    "channelColor": "#D97706",
    "youtubeId": "m5D8p_99xZ1",
    "duration": "44 phút",
    "category": "safari",
    "categoryNameVi": "Động vật 4K",
    "categoryEmoji": "🦁",
    "recommendedAge": "Mọi lứa tuổi",
    "description": "Đoàn lạc đà kiên cường bước đi trên cồn cát sa mạc Sahara vàng rực và uống nước mát tại ốc đảo xanh tươi.",
    "parentTip": "Bướu của lạc đà chứa chất béo giúp lạc đà đi bộ nhiều ngày trên sa mạc mà không bị đói.",
    "keyVocab": [
      {
        "en": "Camel",
        "vi": "Con lạc đà",
        "emoji": "🐪",
        "phonetic": "/ˈkæm.əl/"
      },
      {
        "en": "Hump",
        "vi": "Cái bướu lưng",
        "emoji": "🐫",
        "phonetic": "/hʌmp/"
      },
      {
        "en": "Desert",
        "vi": "Sa mạc cát vàng",
        "emoji": "🏜️",
        "phonetic": "/ˈdez.ɚt/"
      },
      {
        "en": "Oasis",
        "vi": "Ốc đảo xanh",
        "emoji": "🌴",
        "phonetic": "/oʊˈeɪ.sɪs/"
      },
      {
        "en": "Sand Dunes",
        "vi": "Cồn cát nhấp nhô",
        "emoji": "🏖️",
        "phonetic": "/sænd duːnz/"
      },
      {
        "en": "Water",
        "vi": "Uống nước mát",
        "emoji": "💧",
        "phonetic": "/ˈwɔː.tər/"
      }
    ],
    "isFeatured": false
  }
];

export function getRecommendedVideos(currentVideo: EducationalVideo, count = 20): EducationalVideo[] {
  const others = educationalVideos.filter((v) => v.id !== currentVideo.id);

  // Fisher-Yates shuffle helper
  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const sameChannel = shuffle(others.filter((v) => v.channel === currentVideo.channel));
  const sameCategory = shuffle(
    others.filter((v) => v.category === currentVideo.category && v.channel !== currentVideo.channel)
  );
  const safariVideos = shuffle(
    others.filter((v) => v.channel === "Wild Safari" && v.channel !== currentVideo.channel)
  );
  const diverseVideos = shuffle(
    others.filter((v) => v.channel !== currentVideo.channel && v.category !== currentVideo.category)
  );

  const picks: EducationalVideo[] = [];
  const addUnique = (list: EducationalVideo[]) => {
    for (const item of list) {
      if (picks.length >= count) break;
      if (!picks.some((p) => p.id === item.id)) {
        picks.push(item);
      }
    }
  };

  // Up to 6 videos from same channel
  addUnique(sameChannel.slice(0, 6));
  // Up to 6 videos from same category
  addUnique(sameCategory.slice(0, 6));

  // 3-4 videos from Safari real wildlife if not already watching Safari
  if (currentVideo.channel !== "Wild Safari") {
    addUnique(safariVideos.slice(0, 4));
  }

  // Diverse top picks across the library
  addUnique(diverseVideos);
  addUnique(shuffle(others));

  return picks.slice(0, count);
}

