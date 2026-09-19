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
    | "Wild Safari";
  channelAvatar: string;
  channelColor: string;
  youtubeId: string;
  duration: string;
  category: "speech" | "phonics" | "math" | "movement" | "world" | "habits" | "safari";
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
    name: "🦁 Safari Động Vật",
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
    id: "oxford-phonics",
    channelName: "Oxford Phonics",
    name: "Oxford Phonics",
    emoji: "📖",
    color: "#06B6D4",
    description: "Ngữ âm chuẩn quốc tế Cambridge & Oxford",
  },
];

export const educationalCategories = [
  { id: "all", name: "Tất cả", emoji: "🌟" },
  { id: "safari", name: "🦁 Động vật thực tế", emoji: "🦁" },
  { id: "speech", name: "Tập nói & Giao tiếp", emoji: "🗣️" },
  { id: "phonics", name: "Phonics & Chữ cái", emoji: "🔤" },
  { id: "math", name: "Đếm số & Toán tư duy", emoji: "🔢" },
  { id: "movement", name: "Vận động & Vui nhộn", emoji: "🏃" },
  { id: "world", name: "Khám phá thế giới", emoji: "🌍" },
  { id: "habits", name: "Thói quen & Cảm xúc", emoji: "💖" },
];

export const educationalVideos: EducationalVideo[] = [
// ===== MS RACHEL =====
  {
    id: "ms-rachel-first-words",
    title: "Baby Learning with Ms Rachel - First Words, Songs and Nursery Rhymes",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "hTqtGJwsJVE",
    duration: "58 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói kinh điển giúp bé phát âm từ đơn giản đầu đời, kết hợp cử chỉ tay và ngôn ngữ ký hiệu nhẹ nhàng.",
    parentTip: "Ba mẹ hãy ngồi đối diện, lặp lại các cử chỉ tay và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
      { en: "Mama", vi: "Mẹ", emoji: "👩" },
      { en: "Dada", vi: "Bố", emoji: "👨" },
      { en: "Ball", vi: "Quả bóng", emoji: "⚽" },
      { en: "More", vi: "Thêm nữa", emoji: "➕" },
      { en: "Please", vi: "Làm ơn / Xin", emoji: "🙏" },
    ],
    isFeatured: true,
  },
  {
    id: "ms-rachel-play-museum",
    title: "Baby Learning with Ms Rachel - Baby Songs, Speech, Sign Language",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "99aDhxzkGLo",
    duration: "60 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Ms Rachel cùng bé khám phá các bài hát mầm non, cử chỉ ngón tay và từ vựng giao tiếp đầu đời cho bé.",
    parentTip: "Chỉ vào các đồ vật thật xung quanh nhà có hình dạng giống trong video để củng cố khả năng ghi nhớ của con.",
    keyVocab: [
      { en: "Car", vi: "Xe hơi", emoji: "🚗" },
      { en: "House", vi: "Ngôi nhà", emoji: "🏠" },
      { en: "Apple", vi: "Quả táo", emoji: "🍎" },
      { en: "Help", vi: "Giúp đỡ", emoji: "🤝" },
    ],
    isFeatured: true,
  },
  {
    id: "ms-rachel-outdoor-playground",
    title: "Learn Animals with Ms Rachel for Toddlers - Animal Sounds, Farm Animals",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "47MNn4bsmSw",
    duration: "45 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "0-3 tuổi",
    description: "Cùng Ms Rachel thăm các bạn động vật nông trại đáng yêu, học tiếng kêu của con bò, con cừu, con ngựa.",
    parentTip: "Khi dắt bé đi chơi, hãy nhắc lại các từ tiếng Anh và giả giọng tiếng con vật mà bé đã xem.",
    keyVocab: [
      { en: "Cow", vi: "Con bò", emoji: "🐮" },
      { en: "Sheep", vi: "Con cừu", emoji: "🐑" },
      { en: "Horse", vi: "Con ngựa", emoji: "🐴" },
      { en: "Pig", vi: "Con heo", emoji: "🐷" },
    ],
  },
  {
    id: "ms-rachel-animal-sounds",
    title: "Bingo + More Nursery Rhymes & Kids Songs - Ms Rachel",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "axhYc_4jL3Y",
    duration: "52 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Hát bài hát chú chó BINGO vỗ tay theo từng chữ cái và những ca khúc thiếu nhi kinh điển cùng Ms Rachel.",
    parentTip: "Vỗ tay theo nhịp từng chữ cái B-I-N-G-O để rèn phản xạ và nhịp điệu cho con.",
    keyVocab: [
      { en: "Dog", vi: "Chú chó", emoji: "🐶" },
      { en: "Clap", vi: "Vỗ tay", emoji: "👏" },
      { en: "Spell", vi: "Đánh vần", emoji: "🔤" },
      { en: "Friend", vi: "Người bạn", emoji: "🤝" },
    ],
  },
  {
    id: "ms-rachel-dolls-care",
    title: "Icky Sticky Bubble Gum Song with Ms Rachel + More Nursery Rhymes",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "ZizzobSlWkg",
    duration: "38 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Học các cử chỉ tay vui nhộn với kẹo cao su Icky Sticky, các bài hát tương tác và rèn luyện cảm xúc yêu thương.",
    parentTip: "Cùng bé chạm tay lên má, lên tóc theo bài hát để nhận biết các bộ phận cơ thể.",
    keyVocab: [
      { en: "Hands", vi: "Bàn tay", emoji: "🖐️" },
      { en: "Cheek", vi: "Đôi má", emoji: "😊" },
      { en: "Hair", vi: "Mái tóc", emoji: "💇" },
      { en: "Sticky", vi: "Dính dính", emoji: "🍬" },
    ],
  },

  // ===== CAITIE'S CLASSROOM =====
  {
    id: "caities-ocean-animals",
    title: "Explore Underwater Animals At The Aquarium | Caitie's Classroom Field Trip",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "ptngrokhewc",
    duration: "22 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Cô Caitie hướng dẫn các bạn nhỏ thám hiểm thủy cung bao la, gặp gỡ cá voi, cá mập và rùa biển khổng lồ.",
    parentTip: "Sau video, bố mẹ có thể cùng bé vẽ một chú cá biển đơn giản và gọi tên bằng tiếng Anh.",
    keyVocab: [
      { en: "Ocean", vi: "Đại dương", emoji: "🌊" },
      { en: "Whale", vi: "Cá voi", emoji: "🐳" },
      { en: "Shark", vi: "Cá mập", emoji: "🦈" },
      { en: "Swim", vi: "Bơi lội", emoji: "🏊" },
    ],
    isFeatured: true,
  },
  {
    id: "caities-feelings-emotions",
    title: "Feelings | Caitie's Classroom Sing-Along Show | Emotion Songs for Kids",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "fYe6l7rDx8U",
    duration: "20 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "3-5 tuổi",
    description: "Nhận biết và gọi tên các cảm xúc của bản thân: Vui vẻ, Buồn bã, Hào hứng, và cách mỉm cười tự tin.",
    parentTip: "Hỏi bé: 'Hôm nay con cảm thấy thế nào? Are you happy today?'",
    keyVocab: [
      { en: "Happy", vi: "Vui vẻ", emoji: "😊" },
      { en: "Sad", vi: "Buồn bã", emoji: "😢" },
      { en: "Smile", vi: "Nụ cười", emoji: "😄" },
      { en: "Feelings", vi: "Cảm xúc", emoji: "💖" },
    ],
  },
  {
    id: "caities-colors-shapes",
    title: "Colors, Colors, Colors! | Caitie's Classroom | Pre-K Education",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "VpZrYTgdGvM",
    duration: "25 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Trò chơi tìm kiếm màu sắc rực rỡ và pha trộn màu kỳ diệu trong lớp học của Caitie.",
    parentTip: "Cùng bé thi đua: Ai tìm được đồ vật màu đỏ (red) hay màu xanh (blue) trong phòng nhanh nhất!",
    keyVocab: [
      { en: "Red", vi: "Màu đỏ", emoji: "🟥" },
      { en: "Blue", vi: "Màu xanh dương", emoji: "🟦" },
      { en: "Yellow", vi: "Màu vàng", emoji: "🟨" },
      { en: "Color", vi: "Màu sắc", emoji: "🎨" },
    ],
  },

  // ===== NUMBERBLOCKS =====
  {
    id: "numberblocks-one-to-five",
    title: "Learn How to Count in Twos | Numberblocks Counting Compilation",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "K6flN_1PJ4A",
    duration: "18 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số chẵn cách 2 đơn vị (2, 4, 6, 8, 10...) với các bạn khối số Numberblocks siêu ngộ nghĩnh.",
    parentTip: "Dùng các đôi tất hoặc đôi giày để bé tập đếm đôi theo Numberblocks.",
    keyVocab: [
      { en: "Two", vi: "Số 2", emoji: "2️⃣" },
      { en: "Four", vi: "Số 4", emoji: "4️⃣" },
      { en: "Six", vi: "Số 6", emoji: "6️⃣" },
      { en: "Pair", vi: "Một đôi / Một cặp", emoji: "👟" },
    ],
    isFeatured: true,
  },
  {
    id: "numberblocks-count-to-twenty",
    title: "Learn to Count from 1 to 100! 🎲 l Counting for Kids | Numberblocks",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "7S7fO7I3mRQ",
    duration: "24 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "4-6 tuổi",
    description: "Hành trình đếm số kỳ thú từ 1 đến 100 với bài hát giai điệu số học vui tươi của Numberblocks.",
    parentTip: "Cùng con đếm các bậc cầu thang mỗi khi bước đi trong nhà.",
    keyVocab: [
      { en: "Ten", vi: "Số 10", emoji: "🔟" },
      { en: "Twenty", vi: "Số 20", emoji: "🔢" },
      { en: "Hundred", vi: "Số 100", emoji: "💯" },
      { en: "Count", vi: "Đếm số", emoji: "🧮" },
    ],
  },
  {
    id: "numberblocks-ten-adventure",
    title: "Learn to Count - BIG NUMBERS | Numberblocks Full Episodes",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "K6w9jPbDdK0",
    duration: "30 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Tập hợp những câu chuyện hay nhất về các số lớn, các phép cộng ghép khối đầy sáng tạo.",
    parentTip: "Dạy bé nhận biết số 10 tương đương 10 ngón tay xinh xắn của mình.",
    keyVocab: [
      { en: "Ten", vi: "Số 10", emoji: "🔟" },
      { en: "Rocket", vi: "Tên lửa vũ trụ", emoji: "🚀" },
      { en: "Add", vi: "Cộng thêm", emoji: "➕" },
      { en: "Together", vi: "Cùng nhau", emoji: "🤝" },
    ],
  },

  // ===== ALPHABLOCKS =====
  {
    id: "alphablocks-a-to-z",
    title: "The Ultimate A to Z Learn-A-Thon 📖✏️ | Learn to Read | Alphablocks",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "9HKbQ1QyLaU",
    duration: "28 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Khám phá âm thanh ngữ âm của tất cả các chữ cái từ A đến Z với các nhân vật Alphablocks ngộ nghĩnh.",
    parentTip: "Nhắc con phát âm âm bật /æ/ của chữ A thay vì chỉ đọc tên chữ 'ei'.",
    keyVocab: [
      { en: "Letter A", vi: "Chữ A (Âm /æ/)", emoji: "🍎" },
      { en: "Letter B", vi: "Chữ B (Âm /b/)", emoji: "⚽" },
      { en: "Letter C", vi: "Chữ C (Âm /k/)", emoji: "🐱" },
      { en: "Sound", vi: "Âm thanh", emoji: "🔊" },
    ],
    isFeatured: true,
  },
  {
    id: "alphablocks-blend-words",
    title: "Phonics - Learn to Read | Practicing Letter Blends | Alphablocks",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "BxtUFEFkSas",
    duration: "25 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Cách ghép các âm đơn thành từ hoàn chỉnh: C-A-T thành CAT, S-U-N thành SUN. Bước đệm biết đọc tiếng Anh sớm!",
    parentTip: "Cầm tay bé nắm lại khi các bạn chữ cái nắm tay nhau để bé hiểu khái niệm 'ghép vần'.",
    keyVocab: [
      { en: "Cat (C-A-T)", vi: "Con mèo", emoji: "🐱" },
      { en: "Sun (S-U-N)", vi: "Mặt trời", emoji: "☀️" },
      { en: "Dog (D-O-G)", vi: "Con chó", emoji: "🐶" },
      { en: "Read", vi: "Đọc chữ", emoji: "📖" },
    ],
  },
  {
    id: "alphablocks-vowel-magic",
    title: "One Syllable Words | Phonics for Kids - Learn To Read | Alphablocks",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "VxBEmaaSh1c",
    duration: "20 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Các từ một âm tiết đơn giản giúp bé làm quen và tự tin đọc sách tiếng Anh ngay từ mầm non.",
    parentTip: "Cùng con hát giai điệu vui nhộn của 5 nguyên âm tiếng Anh.",
    keyVocab: [
      { en: "Word", vi: "Từ ngữ", emoji: "🔤" },
      { en: "Spell", vi: "Đánh vần", emoji: "✍️" },
      { en: "Book", vi: "Cuốn sách", emoji: "📖" },
    ],
  },

  // ===== SUPER SIMPLE SONGS =====
  {
    id: "super-simple-clean-up-habits",
    title: "Clean Up Song for Children | Super Simple Songs",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "oY-H2WGThc8",
    duration: "35 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bài hát rèn luyện thói quen tự thu dọn đồ chơi ngăn nắp sau khi chơi xong.",
    parentTip: "Bật bài hát Clean Up Song mỗi khi đến giờ thu dọn đồ chơi trước khi đi ngủ.",
    keyVocab: [
      { en: "Clean up", vi: "Thu dọn sạch", emoji: "🧹" },
      { en: "Toys", vi: "Đồ chơi", emoji: "🧸" },
      { en: "Put away", vi: "Cất vào chỗ", emoji: "📦" },
    ],
    isFeatured: true,
  },
  {
    id: "super-simple-baby-shark-compilation",
    title: "Baby Shark - featuring Finny The Shark | Super Simple Songs",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "8ljHzljQrY8",
    duration: "40 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "0-3 tuổi",
    description: "Những bài hát hoạt hình đại dương vui nhộn với tiết tấu êm dịu, chuẩn ngữ âm tiếng Anh mẫu giáo.",
    parentTip: "Bé vừa hát vừa làm động tác tay hàm cá mập nhỏ, mẹ cá mập to và bố cá mập khỏe.",
    keyVocab: [
      { en: "Baby Shark", vi: "Cá mập con", emoji: "🦈" },
      { en: "Sea", vi: "Biển cả", emoji: "🌊" },
      { en: "Swim", vi: "Bơi nhanh", emoji: "🏊" },
    ],
  },

  // ===== DANNY GO! (ACTIVE MOVEMENT & BRAIN BREAKS) =====
  {
    id: "danny-go-floor-is-lava",
    title: "The Floor is Lava Dance! 🌋 /// Danny Go! Kids Brain Break Songs",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "nEUTY8n2iZo",
    duration: "12 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Trò chơi vận động cực vui nhộn: Nhảy lên cao và tìm chỗ trú an toàn khi sàn nhà biến thành dung nham!",
    parentTip: "Chuẩn bị thảm xốp hoặc đệm an toàn để bé thoải mái nhảy nhót giải phóng năng lượng.",
    keyVocab: [
      { en: "Jump", vi: "Nhảy cao", emoji: "🦘" },
      { en: "Run", vi: "Chạy nhanh", emoji: "🏃" },
      { en: "Lava", vi: "Dung nham nóng", emoji: "🔥" },
      { en: "Safe", vi: "An toàn", emoji: "🛡️" },
    ],
    isFeatured: true,
  },
  {
    id: "danny-go-animal-freeze",
    title: "Fire & Ice FREEZE Dance! 🔥❄️ /// Danny Go! Brain Break Movement",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "XYEjLXxT2xg",
    duration: "10 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Vừa nhảy theo điệu bộ Lửa nóng và Băng lạnh vừa dừng lại bất động (Freeze) khi tiếng nhạc ngưng.",
    parentTip: "Rèn luyện khả năng tập trung chú ý và kiểm soát cơ thể cho trẻ rất hiệu quả.",
    keyVocab: [
      { en: "Freeze", vi: "Đóng băng / Đứng im", emoji: "🧊" },
      { en: "Fire", vi: "Ngọn lửa nóng", emoji: "🔥" },
      { en: "Ice", vi: "Tảng băng lạnh", emoji: "❄️" },
      { en: "Dance", vi: "Nhảy múa", emoji: "💃" },
    ],
  },
  {
    id: "danny-go-color-jump",
    title: "The Ice King Freeze Dance! 🥶👑 /// Danny Go! Movement Songs",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "c9YiakkdS8k",
    duration: "15 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Thử thách cùng vua Băng giá Ice King: Nhún nhảy theo nhịp nhạc và đứng bất động khi nhà vua ra hiệu.",
    parentTip: "Ba mẹ cùng thi nhảy với bé xem ai đứng im giỏi hơn nhé!",
    keyVocab: [
      { en: "King", vi: "Vua băng giá", emoji: "👑" },
      { en: "Cold", vi: "Lạnh buốt", emoji: "🥶" },
      { en: "Stop", vi: "Dừng lại", emoji: "🛑" },
    ],
  },

  // ===== STEVE AND MAGGIE (WOW ENGLISH TV) =====
  {
    id: "steve-maggie-toy-shop",
    title: "Animal Safari Adventure with Steve and Maggie | Wild Animals Story",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "jni7C2RfPyk",
    duration: "18 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Thầy Steve và chú chim quạ Maggie cùng đi xe Jeep thám hiểm khu rừng hoang dã tìm kiếm các bạn thú rừng.",
    parentTip: "Giọng thầy Steve phát âm chuẩn Anh - Anh, rất to và rõ, giúp trẻ dễ bắt chước ngữ điệu.",
    keyVocab: [
      { en: "Safari", vi: "Thám hiểm động vật", emoji: "🚙" },
      { en: "Camera", vi: "Máy chụp ảnh", emoji: "📷" },
      { en: "Magic", vi: "Phép màu", emoji: "🪄" },
      { en: "Look", vi: "Nhìn xem kìa", emoji: "👀" },
    ],
  },
  {
    id: "steve-maggie-safari-animals",
    title: "ZOO Animals for Kids | Stories from Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "qb1oKClLzRM",
    duration: "20 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Thăm vườn thú sở thú ZOO với những câu chuyện hài hước bất ngờ cùng chú quạ tinh nghịch Maggie.",
    parentTip: "Bé sẽ cười nghiêng ngả với những trò đùa của chú quạ Maggie!",
    keyVocab: [
      { en: "Zoo", vi: "Sở thú", emoji: "🦁" },
      { en: "Elephant", vi: "Con voi", emoji: "🐘" },
      { en: "Monkey", vi: "Con khỉ", emoji: "🐒" },
      { en: "Funny", vi: "Hài hước", emoji: "😂" },
    ],
  },

  // ===== OXFORD PHONICS WORLD =====
  {
    id: "oxford-phonics-alphabet",
    title: "Oxford Phonics World Level 1 - The Alphabet - ABC Song & Chants",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "iQsENh0lM3k",
    duration: "32 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Giáo trình Phonics mầm non chuẩn Đại học Oxford, hướng dẫn chi tiết khẩu hình và bài vần cho từng chữ cái.",
    parentTip: "Giáo trình tốt nhất để chuẩn bị cho trẻ bước vào lớp 1 hoặc học các trường song ngữ.",
    keyVocab: [
      { en: "Apple", vi: "Quả táo (/æ/)", emoji: "🍎" },
      { en: "Ball", vi: "Quả bóng (/b/)", emoji: "⚽" },
      { en: "Cat", vi: "Con mèo (/k/)", emoji: "🐱" },
      { en: "Phonics", vi: "Ngữ âm học", emoji: "📚" },
    ],
    isFeatured: true,
  },
  {
    id: "oxford-phonics-short-vowels",
    title: "Oxford Phonics World Level 2 - Short Vowels (a, e, i, o, u)",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "6zxAUaGlW88",
    duration: "28 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chuyên sâu 5 nguyên âm ngắn cốt lõi tiếng Anh với bài vần và hình ảnh minh họa sinh động.",
    parentTip: "Cùng con so sánh sự khác nhau giữa âm /æ/ trong 'hat' và âm /e/ trong 'hen'.",
    keyVocab: [
      { en: "Cat / Hat", vi: "Nguyên âm ngắn 'a'", emoji: "🧢" },
      { en: "Bed / Red", vi: "Nguyên âm ngắn 'e'", emoji: "🛏️" },
      { en: "Pig / Big", vi: "Nguyên âm ngắn 'i'", emoji: "🐷" },
    ],
  },

  // ===== WILD SAFARI (BỔ SUNG MỚI) =====
  {
    id: "safari-wild-lxoh1oqj",
    title: "8K Wildlife of Gondwana Game Reserve, Africa - 7 HOURS of Amazing Wild Animals (NO MUSIC)",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "lXoH1oQJvHo",
    duration: "20 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
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
                "en": "Cheetah",
                "vi": "Báo săn",
                "emoji": "🐆",
                "phonetic": "/ˈtʃiː.tə/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "safari-wild-ut2khcnt",
    title: "4K Wild Animals - Africa, Mana Pools National Park with Nature Sounds - 4 HRS",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "ut2KhcNtnm8",
    duration: "10 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Elephant",
                "vi": "Con voi",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
          },
          {
                "en": "Hippo",
                "vi": "Hà mã",
                "emoji": "🦛",
                "phonetic": "/ˈhɪp.oʊ/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "safari-wild-iuwj8lkf",
    title: "5K Madagascar Wildlife - Incredible Nature and Wildlife of Madagascar - 4 HOURS",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "IUWJ8_lkFAA",
    duration: "10 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Waterhole",
                "vi": "Hồ nước tự nhiên",
                "emoji": "💧",
                "phonetic": "/ˈwɔː.tə.həʊl/"
          },
          {
                "en": "Whale",
                "vi": "Cá voi",
                "emoji": "🐋",
                "phonetic": "/weɪl/"
          },
          {
                "en": "Giraffe",
                "vi": "Hươu cao cổ",
                "emoji": "🦒",
                "phonetic": "/dʒɪˈrɑːf/"
          },
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-mwadbix4",
    title: "10 HRS Amazing Wildlife of Chobe National Park in 8K UHD - Incredible South Africa - Part 1",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "M-WADbIX42s",
    duration: "30 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
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
                "en": "Waterhole",
                "vi": "Hồ nước tự nhiên",
                "emoji": "💧",
                "phonetic": "/ˈwɔː.tə.həʊl/"
          },
          {
                "en": "Giraffe",
                "vi": "Hươu cao cổ",
                "emoji": "🦒",
                "phonetic": "/dʒɪˈrɑːf/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-pgntolrs",
    title: "4K African Animals: Hwange National Park - Amazing African Wildlife Footage with Real Sounds in 4K",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "pgNTOLRStE8",
    duration: "10 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
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
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-u91u8opj",
    title: "Africa 4K • Nature Relaxation Film – Wildlife & Tribal Music",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "u91U8oPJzL8",
    duration: "45 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
          },
          {
                "en": "Dolphin",
                "vi": "Cá heo",
                "emoji": "🐬",
                "phonetic": "/ˈdɒl.fɪn/"
          },
          {
                "en": "Penguin",
                "vi": "Chim cánh cụt",
                "emoji": "🐧",
                "phonetic": "/ˈpeŋ.ɡwɪn/"
          },
          {
                "en": "Polar Bear",
                "vi": "Gấu bắc cực",
                "emoji": "🐻‍❄️",
                "phonetic": "/ˈpoʊ.lɚ ber/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-krh9ccpo",
    title: "African Safari 4K • Wildlife Relaxation Film",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "Krh9ccPOx-M",
    duration: "1 giờ",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Polar Bear",
                "vi": "Gấu bắc cực",
                "emoji": "🐻‍❄️",
                "phonetic": "/ˈpoʊ.lɚ ber/"
          },
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
          },
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-p8frccll",
    title: "African Safari 4K - Scenic Wildlife Film With African Music",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "P8frC_cLLD4",
    duration: "1 giờ",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Cheetah",
                "vi": "Báo săn",
                "emoji": "🐆",
                "phonetic": "/ˈtʃiː.tə/"
          },
          {
                "en": "Penguin",
                "vi": "Chim cánh cụt",
                "emoji": "🐧",
                "phonetic": "/ˈpeŋ.ɡwɪn/"
          },
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-cjljmlaj",
    title: "Giraffe Wildlife of Africa  4K Savanna Safari Nature Footage  #animals #wildlife #naturesounds",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "cJljMLAjq1s",
    duration: "15 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Hippo",
                "vi": "Hà mã",
                "emoji": "🦛",
                "phonetic": "/ˈhɪp.oʊ/"
          },
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Rhino",
                "vi": "Tê giác",
                "emoji": "🦏",
                "phonetic": "/ˈraɪ.noʊ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-z3ndwp41",
    title: "4k African Wildlife Adventure: Serene Nature with Wild Animals and Relaxing Music",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "Z3n_Dwp414Q",
    duration: "10 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Rhino",
                "vi": "Tê giác",
                "emoji": "🦏",
                "phonetic": "/ˈraɪ.noʊ/"
          },
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
          },
          {
                "en": "Polar Bear",
                "vi": "Gấu bắc cực",
                "emoji": "🐻‍❄️",
                "phonetic": "/ˈpoʊ.lɚ ber/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-ei8ua0wy",
    title: "Mongoose Removes a Monster Tick From an African Wild Dog’s Paw Pad!",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "EI8UA0WyXvM",
    duration: "1 giờ",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Savanna",
                "vi": "Thảo nguyên",
                "emoji": "🌾",
                "phonetic": "/səˈvæn.ə/"
          },
          {
                "en": "Cheetah",
                "vi": "Báo săn",
                "emoji": "🐆",
                "phonetic": "/ˈtʃiː.tə/"
          },
          {
                "en": "Rhino",
                "vi": "Tê giác",
                "emoji": "🦏",
                "phonetic": "/ˈraɪ.noʊ/"
          },
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-exgitmht",
    title: "Warthog Wildlife on African Safari",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "EXgitmhT8zs",
    duration: "1 giờ",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Penguin",
                "vi": "Chim cánh cụt",
                "emoji": "🐧",
                "phonetic": "/ˈpeŋ.ɡwɪn/"
          },
          {
                "en": "Rhino",
                "vi": "Tê giác",
                "emoji": "🦏",
                "phonetic": "/ˈraɪ.noʊ/"
          },
          {
                "en": "Giraffe",
                "vi": "Hươu cao cổ",
                "emoji": "🦒",
                "phonetic": "/dʒɪˈrɑːf/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-7thpem8g",
    title: "Majestic African Savanna Wildlife in 4K",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "7thpEm8Gbog",
    duration: "15 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Waterhole",
                "vi": "Hồ nước tự nhiên",
                "emoji": "💧",
                "phonetic": "/ˈwɔː.tə.həʊl/"
          },
          {
                "en": "Rhino",
                "vi": "Tê giác",
                "emoji": "🦏",
                "phonetic": "/ˈraɪ.noʊ/"
          },
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Penguin",
                "vi": "Chim cánh cụt",
                "emoji": "🐧",
                "phonetic": "/ˈpeŋ.ɡwɪn/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-grde7wgs",
    title: "Animals of Africa 4K - Scenic Relaxation Film With Calming Music",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "GRde7WGScrM",
    duration: "15 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Dolphin",
                "vi": "Cá heo",
                "emoji": "🐬",
                "phonetic": "/ˈdɒl.fɪn/"
          },
          {
                "en": "Savanna",
                "vi": "Thảo nguyên",
                "emoji": "🌾",
                "phonetic": "/səˈvæn.ə/"
          },
          {
                "en": "Giraffe",
                "vi": "Hươu cao cổ",
                "emoji": "🦒",
                "phonetic": "/dʒɪˈrɑːf/"
          },
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-qrfffjq1",
    title: "African Safari 4K 🐾 Discovery Relaxation Wonderful Wildlife Movie with Relax Piano Music",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "QRFFFjq1MS8",
    duration: "10 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Hippo",
                "vi": "Hà mã",
                "emoji": "🦛",
                "phonetic": "/ˈhɪp.oʊ/"
          },
          {
                "en": "Cheetah",
                "vi": "Báo săn",
                "emoji": "🐆",
                "phonetic": "/ˈtʃiː.tə/"
          },
          {
                "en": "Waterhole",
                "vi": "Hồ nước tự nhiên",
                "emoji": "💧",
                "phonetic": "/ˈwɔː.tə.həʊl/"
          },
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-djnmuoi4",
    title: "8K Wildlife of Okavango Delta Area, Botswana - 8 Hours of Wild Animals of Africa - Part #1",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "DJNMUOi4DpI",
    duration: "45 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Penguin",
                "vi": "Chim cánh cụt",
                "emoji": "🐧",
                "phonetic": "/ˈpeŋ.ɡwɪn/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
          },
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-fxrxcoyz",
    title: "Deep in the African wilderness #animals #viral #funny #wildlife #shorts #shorts #comedy",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "FxRxcOyZ8Us",
    duration: "20 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Penguin",
                "vi": "Chim cánh cụt",
                "emoji": "🐧",
                "phonetic": "/ˈpeŋ.ɡwɪn/"
          },
          {
                "en": "Dolphin",
                "vi": "Cá heo",
                "emoji": "🐬",
                "phonetic": "/ˈdɒl.fɪn/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-6jswrhrl",
    title: "4K African Safari: The most relaxing wildlife moments ever filmed #relaxing",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "6jSwrHrLTts",
    duration: "15 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Dolphin",
                "vi": "Cá heo",
                "emoji": "🐬",
                "phonetic": "/ˈdɒl.fɪn/"
          },
          {
                "en": "Savanna",
                "vi": "Thảo nguyên",
                "emoji": "🌾",
                "phonetic": "/səˈvæn.ə/"
          },
          {
                "en": "Giraffe",
                "vi": "Hươu cao cổ",
                "emoji": "🦒",
                "phonetic": "/dʒɪˈrɑːf/"
          },
          {
                "en": "Hippo",
                "vi": "Hà mã",
                "emoji": "🦛",
                "phonetic": "/ˈhɪp.oʊ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-a9kwv4lb",
    title: "Lioness Shares a Sweet Moment With Her Cub",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "a9Kwv4LbKxM",
    duration: "30 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Penguin",
                "vi": "Chim cánh cụt",
                "emoji": "🐧",
                "phonetic": "/ˈpeŋ.ɡwɪn/"
          },
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-y6up3uyp",
    title: "African Safari 4K - Scenic Wildlife Film With African Music",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "y6Up3uy-PDI",
    duration: "1 giờ",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
          },
          {
                "en": "Savanna",
                "vi": "Thảo nguyên",
                "emoji": "🌾",
                "phonetic": "/səˈvæn.ə/"
          },
          {
                "en": "Giraffe",
                "vi": "Hươu cao cổ",
                "emoji": "🦒",
                "phonetic": "/dʒɪˈrɑːf/"
          },
          {
                "en": "Dolphin",
                "vi": "Cá heo",
                "emoji": "🐬",
                "phonetic": "/ˈdɒl.fɪn/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-nbvu4wcs",
    title: "😱 Still Scavenging... 😱 #vivoX300pro #wildlife",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "nbVU-4wcszw",
    duration: "15 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Lion",
                "vi": "Sư tử",
                "emoji": "🦁",
                "phonetic": "/ˈlaɪ.ən/"
          },
          {
                "en": "Savanna",
                "vi": "Thảo nguyên",
                "emoji": "🌾",
                "phonetic": "/səˈvæn.ə/"
          },
          {
                "en": "Dolphin",
                "vi": "Cá heo",
                "emoji": "🐬",
                "phonetic": "/ˈdɒl.fɪn/"
          },
          {
                "en": "Zebra",
                "vi": "Ngựa vằn",
                "emoji": "🦓",
                "phonetic": "/ˈzeb.rə/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "safari-wild-s3c1wgrd",
    title: "Mongoose Pulls a Giant Tick From a Bushbuck’s Ear Tip! #wildlife #wildlifeshorts",
    channel: "Wild Safari",
    channelAvatar: "🦁",
    channelColor: "#D97706",
    youtubeId: "s3c1WgRdO1Q",
    duration: "25 phút",
    category: "safari",
    categoryNameVi: "Động vật thực tế",
    categoryEmoji: "🦁",
    recommendedAge: "Mọi lứa tuổi",
    description: "Khám phá thế giới động vật hoang dã thực tế 4K ngoài đời thật, âm thanh thiên nhiên thuần khiết giúp bé phát triển thị giác và tình yêu thiên nhiên. Tác phẩm đặc sắc từ kênh Wild Safari.",
    parentTip: "Video thiên nhiên thực tế không thuyết minh, ba mẹ hãy cùng bé gọi tên các loài vật và lắng nghe âm thanh kỳ thú của thế giới tự nhiên nhé!",
    keyVocab: [
          {
                "en": "Sea Turtle",
                "vi": "Rùa biển",
                "emoji": "🐢",
                "phonetic": "/siː ˈtɜː.təl/"
          },
          {
                "en": "Dolphin",
                "vi": "Cá heo",
                "emoji": "🐬",
                "phonetic": "/ˈdɒl.fɪn/"
          },
          {
                "en": "Cheetah",
                "vi": "Báo săn",
                "emoji": "🐆",
                "phonetic": "/ˈtʃiː.tə/"
          },
          {
                "en": "Waterhole",
                "vi": "Hồ nước tự nhiên",
                "emoji": "💧",
                "phonetic": "/ˈwɔː.tə.həʊl/"
          }
    ],
    isFeatured: false,
  },

  // ===== MS RACHEL (BỔ SUNG MỚI) =====
  {
    id: "ms-rachel-boiyn7iu",
    title: "Wheels On The Bus + More Nursery Rhymes & Kids Songs - Educational Videos for Kids & Toddlers",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "bOiYN7iU-W8",
    duration: "25 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          },
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          },
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "ms-rachel-gngpq771",
    title: "Hop Little Bunnies Hop Hop Hop + More Ms Rachel Nursery Rhymes & Kids Songs",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "gngPQ771Ahk",
    duration: "20 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          },
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          },
          {
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "ms-rachel-ayznnxlg",
    title: "Happy Song",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "AyZNnxLGGlw",
    duration: "15 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          },
          {
                "en": "Mama",
                "vi": "Mẹ",
                "emoji": "👩",
                "phonetic": "/ˈmɑː.mə/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          },
          {
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-b051ktud",
    title: "ABC Song - The Alphabet - ABCs & 123s - Phonics - Kids Songs & Nursery Rhymes for Children",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "b051ktudQDQ",
    duration: "45 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
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
                "en": "Baby",
                "vi": "Em bé",
                "emoji": "👶",
                "phonetic": "/ˈbeɪ.bi/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-kaq4h03n",
    title: "Preschool & Toddler Learning Video with Ms Rachel - Learn Shapes, Letters, Numbers, Colors & More",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "K_Aq4H03Nm4",
    duration: "25 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
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
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
          },
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-jbvzoft8",
    title: "🔴 Learn with Ms Rachel - Toddler Learning - Kids Songs & Nursery Rhymes - Wheels On The Bus",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "jBvzOfT8_44",
    duration: "30 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
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
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-oyuoske7",
    title: "Bedtime Routine - Bedtime Stories for Toddlers - Preschool Videos - Toddler Learning Video Songs",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "OyUoskE7Ogk",
    duration: "20 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Mama",
                "vi": "Mẹ",
                "emoji": "👩",
                "phonetic": "/ˈmɑː.mə/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
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
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-tyduafy7",
    title: "Brush Your Teeth Song with Ms Rachel and Elmo - Timer - Kids Songs and Nursery Rhymes",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "tYDuAfY77Do",
    duration: "15 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Hug",
                "vi": "Ôm yêu thương",
                "emoji": "🤗",
                "phonetic": "/hʌɡ/"
          },
          {
                "en": "Baby",
                "vi": "Em bé",
                "emoji": "👶",
                "phonetic": "/ˈbeɪ.bi/"
          },
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          },
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-hohrqpi9",
    title: "Learn Numbers, Colors, Counting and Shapes with Ms Rachel",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "hOHrqPI9bVk",
    duration: "45 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Smile",
                "vi": "Mỉm cười",
                "emoji": "😄",
                "phonetic": "/smaɪl/"
          },
          {
                "en": "Baby",
                "vi": "Em bé",
                "emoji": "👶",
                "phonetic": "/ˈbeɪ.bi/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          },
          {
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-1v3dk41c",
    title: "Phonics Song + More Kids Songs & Nursery Rhymes - Learn Letter Sounds - Videos for Kids - Ms Rachel",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "1v3Dk41C_10",
    duration: "20 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          },
          {
                "en": "Hug",
                "vi": "Ôm yêu thương",
                "emoji": "🤗",
                "phonetic": "/hʌɡ/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          },
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-7siu3eow",
    title: "Videos for Toddlers - Preschool Learning Video - Happy Birthday Song Circle Time Special",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "7siu3eOW1VQ",
    duration: "1 giờ",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          },
          {
                "en": "Mama",
                "vi": "Mẹ",
                "emoji": "👩",
                "phonetic": "/ˈmɑː.mə/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          },
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "ms-rachel-yqyemziw",
    title: "Caterpillar Song - Kids Songs and Nursery Rhymes - Songs for Toddlers - Ms Rachel Songs on YouTube",
    channel: "Ms Rachel",
    channelAvatar: "👧",
    channelColor: "#FF6B8B",
    youtubeId: "yQyEmZIw1e8",
    duration: "20 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "0-3 tuổi",
    description: "Chương trình tập nói và phát triển ngôn ngữ sớm cho bé với các bài hát ngắn, cử chỉ tay và biểu cảm sinh động. Tác phẩm đặc sắc từ kênh Ms Rachel.",
    parentTip: "Ba mẹ hãy ngồi đối diện bé, nhắc lại các cử chỉ và khẩu hình miệng của Ms Rachel để bé bắt chước theo nhé!",
    keyVocab: [
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
                "en": "Mama",
                "vi": "Mẹ",
                "emoji": "👩",
                "phonetic": "/ˈmɑː.mə/"
          },
          {
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
          }
    ],
    isFeatured: false,
  },

  // ===== NUMBERBLOCKS (BỔ SUNG MỚI) =====
  {
    id: "numberblocks-g0di8dp9",
    title: "Addition!",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "G0Di8DP9f8w",
    duration: "20 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Three",
                "vi": "Số ba",
                "emoji": "3️⃣",
                "phonetic": "/θriː/"
          },
          {
                "en": "Two",
                "vi": "Số hai",
                "emoji": "2️⃣",
                "phonetic": "/tuː/"
          },
          {
                "en": "Small",
                "vi": "Nhỏ bé",
                "emoji": "🐜",
                "phonetic": "/smɔːl/"
          },
          {
                "en": "One",
                "vi": "Số một",
                "emoji": "1️⃣",
                "phonetic": "/wʌn/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "numberblocks-xoixrxhp",
    title: "@Numberblocks - Orange Level Two Episodes 🟠",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "xOiXRxHprpQ",
    duration: "20 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Add",
                "vi": "Cộng vào",
                "emoji": "➕",
                "phonetic": "/æd/"
          },
          {
                "en": "Count",
                "vi": "Đếm số",
                "emoji": "🔢",
                "phonetic": "/kaʊnt/"
          },
          {
                "en": "Three",
                "vi": "Số ba",
                "emoji": "3️⃣",
                "phonetic": "/θriː/"
          },
          {
                "en": "Two",
                "vi": "Số hai",
                "emoji": "2️⃣",
                "phonetic": "/tuː/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "numberblocks-yj5p0ugr",
    title: "Number Adventures",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "yj5p0-uGR5U",
    duration: "15 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Add",
                "vi": "Cộng vào",
                "emoji": "➕",
                "phonetic": "/æd/"
          },
          {
                "en": "Square",
                "vi": "Hình vuông",
                "emoji": "⏹️",
                "phonetic": "/skweər/"
          },
          {
                "en": "Minus",
                "vi": "Trừ đi",
                "emoji": "➖",
                "phonetic": "/ˈmaɪ.nəs/"
          },
          {
                "en": "Count",
                "vi": "Đếm số",
                "emoji": "🔢",
                "phonetic": "/kaʊnt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-jtmyd2gq",
    title: "Counting Fruit! 🍎 🍊 🍐",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "jtMYD2gqlNA",
    duration: "15 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Three",
                "vi": "Số ba",
                "emoji": "3️⃣",
                "phonetic": "/θriː/"
          },
          {
                "en": "One",
                "vi": "Số một",
                "emoji": "1️⃣",
                "phonetic": "/wʌn/"
          },
          {
                "en": "Circle",
                "vi": "Hình tròn",
                "emoji": "⚪",
                "phonetic": "/ˈsɜː.kəl/"
          },
          {
                "en": "Minus",
                "vi": "Trừ đi",
                "emoji": "➖",
                "phonetic": "/ˈmaɪ.nəs/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-fvyqpqwj",
    title: "Numberblocks",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "FVYqpqWj4SE",
    duration: "1 giờ",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
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
                "en": "Count",
                "vi": "Đếm số",
                "emoji": "🔢",
                "phonetic": "/kaʊnt/"
          },
          {
                "en": "Big",
                "vi": "To lớn",
                "emoji": "🐘",
                "phonetic": "/bɪɡ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-wgh5z8nu",
    title: "Multiplication for Kids Compilation - Best Times Tables Tricks!",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "W_GH5z8Nuoc",
    duration: "25 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Square",
                "vi": "Hình vuông",
                "emoji": "⏹️",
                "phonetic": "/skweər/"
          },
          {
                "en": "Three",
                "vi": "Số ba",
                "emoji": "3️⃣",
                "phonetic": "/θriː/"
          },
          {
                "en": "Two",
                "vi": "Số hai",
                "emoji": "2️⃣",
                "phonetic": "/tuː/"
          },
          {
                "en": "Minus",
                "vi": "Trừ đi",
                "emoji": "➖",
                "phonetic": "/ˈmaɪ.nəs/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-edrhu1yv",
    title: "🏆 Epic Number Race! 🏆",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "EdrHU1yVBHM",
    duration: "20 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "One",
                "vi": "Số một",
                "emoji": "1️⃣",
                "phonetic": "/wʌn/"
          },
          {
                "en": "Count",
                "vi": "Đếm số",
                "emoji": "🔢",
                "phonetic": "/kaʊnt/"
          },
          {
                "en": "Circle",
                "vi": "Hình tròn",
                "emoji": "⚪",
                "phonetic": "/ˈsɜː.kəl/"
          },
          {
                "en": "Add",
                "vi": "Cộng vào",
                "emoji": "➕",
                "phonetic": "/æd/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-qdsun96e",
    title: "Second Grade Math - Learn To Count!",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "QdSUN96eQKY",
    duration: "10 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Two",
                "vi": "Số hai",
                "emoji": "2️⃣",
                "phonetic": "/tuː/"
          },
          {
                "en": "Add",
                "vi": "Cộng vào",
                "emoji": "➕",
                "phonetic": "/æd/"
          },
          {
                "en": "One",
                "vi": "Số một",
                "emoji": "1️⃣",
                "phonetic": "/wʌn/"
          },
          {
                "en": "Circle",
                "vi": "Hình tròn",
                "emoji": "⚪",
                "phonetic": "/ˈsɜː.kəl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-h2fqfabf",
    title: "Numberblocks Vacation Fun!",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "H2FqfAbf1bM",
    duration: "30 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
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
                "en": "Circle",
                "vi": "Hình tròn",
                "emoji": "⚪",
                "phonetic": "/ˈsɜː.kəl/"
          },
          {
                "en": "Three",
                "vi": "Số ba",
                "emoji": "3️⃣",
                "phonetic": "/θriː/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-gnvljowv",
    title: "🛠️Building All Numberblocks 1 to 10: Learn and Play Together Level 1🔢",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "GnVLJowv6eU",
    duration: "1 giờ",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Circle",
                "vi": "Hình tròn",
                "emoji": "⚪",
                "phonetic": "/ˈsɜː.kəl/"
          },
          {
                "en": "One",
                "vi": "Số một",
                "emoji": "1️⃣",
                "phonetic": "/wʌn/"
          },
          {
                "en": "Small",
                "vi": "Nhỏ bé",
                "emoji": "🐜",
                "phonetic": "/smɔːl/"
          },
          {
                "en": "Two",
                "vi": "Số hai",
                "emoji": "2️⃣",
                "phonetic": "/tuː/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-oifnymax",
    title: "Fractions are a Piece of Cake!",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "oIFNyMAXvyc",
    duration: "25 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Square",
                "vi": "Hình vuông",
                "emoji": "⏹️",
                "phonetic": "/skweər/"
          },
          {
                "en": "Circle",
                "vi": "Hình tròn",
                "emoji": "⚪",
                "phonetic": "/ˈsɜː.kəl/"
          },
          {
                "en": "Minus",
                "vi": "Trừ đi",
                "emoji": "➖",
                "phonetic": "/ˈmaɪ.nəs/"
          },
          {
                "en": "Big",
                "vi": "To lớn",
                "emoji": "🐘",
                "phonetic": "/bɪɡ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "numberblocks-cxclqzg3",
    title: "The Pyramid of Puzzles - Full Episode",
    channel: "Numberblocks",
    channelAvatar: "🔢",
    channelColor: "#EF4444",
    youtubeId: "cXclqZG393E",
    duration: "45 phút",
    category: "math",
    categoryNameVi: "Đếm số & Toán tư duy",
    categoryEmoji: "🔢",
    recommendedAge: "3-5 tuổi",
    description: "Học đếm số, nhận biết số lượng và làm quen với các phép tính cộng trừ qua các nhân vật khối số diệu kỳ. Tác phẩm đặc sắc từ kênh Numberblocks.",
    parentTip: "Ba mẹ cùng đếm ngón tay hoặc xếp các khối đồ chơi theo số lượng nhân vật Numberblocks trong tập phim nhé!",
    keyVocab: [
          {
                "en": "Big",
                "vi": "To lớn",
                "emoji": "🐘",
                "phonetic": "/bɪɡ/"
          },
          {
                "en": "Square",
                "vi": "Hình vuông",
                "emoji": "⏹️",
                "phonetic": "/skweər/"
          },
          {
                "en": "Count",
                "vi": "Đếm số",
                "emoji": "🔢",
                "phonetic": "/kaʊnt/"
          },
          {
                "en": "Three",
                "vi": "Số ba",
                "emoji": "3️⃣",
                "phonetic": "/θriː/"
          }
    ],
    isFeatured: false,
  },

  // ===== ALPHABLOCKS (BỔ SUNG MỚI) =====
  {
    id: "alphablocks-2kpxzoaf",
    title: "On",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "2kpxZOAfOrI",
    duration: "1 giờ",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          },
          {
                "en": "Dog",
                "vi": "Con chó (D)",
                "emoji": "🐶",
                "phonetic": "/dɒɡ/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "alphablocks-xg4gwt8n",
    title: "The Alphabet From A - Z",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "xg4_gWt8N_Q",
    duration: "15 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Sun",
                "vi": "Mặt trời (S)",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "alphablocks-xjsvrq6j",
    title: "Writing Made Easy",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "xJSVrq-6-jc",
    duration: "10 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-y9viy2ok",
    title: "My First ABC's",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "Y9vIY2Okowc",
    duration: "30 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Dog",
                "vi": "Con chó (D)",
                "emoji": "🐶",
                "phonetic": "/dɒɡ/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          },
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-s7ljgdcx",
    title: "Awesome Alphabet",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "s7LjGDcXqcs",
    duration: "1 giờ",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-xyxxzgbb",
    title: "📖 Reading Made Easy 👍",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "xYxxzGbBYpE",
    duration: "15 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Sun",
                "vi": "Mặt trời (S)",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Dog",
                "vi": "Con chó (D)",
                "emoji": "🐶",
                "phonetic": "/dɒɡ/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-gb4prdzp",
    title: "The New Years Reading Challenge 📚",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "gb4prd-Zpv0",
    duration: "30 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          },
          {
                "en": "Sun",
                "vi": "Mặt trời (S)",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-yjqfoacq",
    title: "📖 SH CH and TH- Letter Teams with Alphablock H 📖",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "YjQFOACQdms",
    duration: "15 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Dog",
                "vi": "Con chó (D)",
                "emoji": "🐶",
                "phonetic": "/dɒɡ/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          },
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-8pkq1xuo",
    title: "Band Together 🥁 🎤",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "8pKq1xU_ox4",
    duration: "1 giờ",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          },
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-qoihcoo8",
    title: "Letter Names and Their Sounds",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "QOihCOo897g",
    duration: "30 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Dog",
                "vi": "Con chó (D)",
                "emoji": "🐶",
                "phonetic": "/dɒɡ/"
          },
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-qpcbbgh2",
    title: "Alphablocks",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "qPCbB-gH2Ew",
    duration: "15 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "alphablocks-bscgkbbx",
    title: "A-Z",
    channel: "Alphablocks",
    channelAvatar: "🔤",
    channelColor: "#3B82F6",
    youtubeId: "BScgKbbxObk",
    duration: "45 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "3-5 tuổi",
    description: "Thế giới ngữ âm Phonics sống động giúp bé nhận diện mặt chữ cái, ghép vần và bắt đầu tập đọc từ vựng tiếng Anh. Tác phẩm đặc sắc từ kênh Alphablocks.",
    parentTip: "Khuyến khích bé phát âm theo âm thanh đặc trưng của từng chữ cái Alphablock khi các bạn nắm tay ghép vần!",
    keyVocab: [
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          }
    ],
    isFeatured: false,
  },

  // ===== CAITIE'S CLASSROOM (BỔ SUNG MỚI) =====
  {
    id: "caities-classroom-nzwm6f0c",
    title: "Back to School with Caitie's Classroom",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "NZWM6f0cA90",
    duration: "30 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Doctor",
                "vi": "Bác sĩ",
                "emoji": "🩺",
                "phonetic": "/ˈdɒk.tər/"
          },
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "Sun",
                "vi": "Mặt trời",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Rainbow",
                "vi": "Cầu vồng",
                "emoji": "🌈",
                "phonetic": "/ˈreɪn.bəʊ/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "caities-classroom-t6mbszku",
    title: "Caitie Visits Backstage At An Emma & Lachy from The Wiggles Concert!",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "t6mBszkU-Xo",
    duration: "25 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "School",
                "vi": "Trường học",
                "emoji": "🏫",
                "phonetic": "/skuːl/"
          },
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "Doctor",
                "vi": "Bác sĩ",
                "emoji": "🩺",
                "phonetic": "/ˈdɒk.tər/"
          },
          {
                "en": "Rainbow",
                "vi": "Cầu vồng",
                "emoji": "🌈",
                "phonetic": "/ˈreɪn.bəʊ/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "caities-classroom-ceomep3w",
    title: "Underwater Animal Adventure",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "cEOmEp3w0P0",
    duration: "1 giờ",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
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
                "en": "Rainbow",
                "vi": "Cầu vồng",
                "emoji": "🌈",
                "phonetic": "/ˈreɪn.bəʊ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-hrvysktn",
    title: "Here Comes The Firetruck + More",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "hrvYskTnoJs",
    duration: "25 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Rain",
                "vi": "Cơn mưa",
                "emoji": "🌧️",
                "phonetic": "/reɪn/"
          },
          {
                "en": "School",
                "vi": "Trường học",
                "emoji": "🏫",
                "phonetic": "/skuːl/"
          },
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "Flower",
                "vi": "Bông hoa",
                "emoji": "🌸",
                "phonetic": "/ˈflaʊ.ər/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-aelyhlzf",
    title: "Fire Truck Fun!",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "aELyhlZF8_w",
    duration: "30 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Flower",
                "vi": "Bông hoa",
                "emoji": "🌸",
                "phonetic": "/ˈflaʊ.ər/"
          },
          {
                "en": "Doctor",
                "vi": "Bác sĩ",
                "emoji": "🩺",
                "phonetic": "/ˈdɒk.tər/"
          },
          {
                "en": "School",
                "vi": "Trường học",
                "emoji": "🏫",
                "phonetic": "/skuːl/"
          },
          {
                "en": "Dinosaur",
                "vi": "Khủng long",
                "emoji": "🦖",
                "phonetic": "/ˈdaɪ.nə.sɔːr/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-hi63z3wn",
    title: "Can You Dance And Stop?",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "Hi63z3wn9n8",
    duration: "15 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "School",
                "vi": "Trường học",
                "emoji": "🏫",
                "phonetic": "/skuːl/"
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
    isFeatured: false,
  },
  {
    id: "caities-classroom-fwf62rns",
    title: "Buzzing Bees",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "FWf62RnS-AY",
    duration: "1 giờ",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "Dinosaur",
                "vi": "Khủng long",
                "emoji": "🦖",
                "phonetic": "/ˈdaɪ.nə.sɔːr/"
          },
          {
                "en": "Flower",
                "vi": "Bông hoa",
                "emoji": "🌸",
                "phonetic": "/ˈflaʊ.ər/"
          },
          {
                "en": "Rain",
                "vi": "Cơn mưa",
                "emoji": "🌧️",
                "phonetic": "/reɪn/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-bzzfrqsm",
    title: "Community Helpers",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "BzzFRQsmb74",
    duration: "45 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
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
                "en": "School",
                "vi": "Trường học",
                "emoji": "🏫",
                "phonetic": "/skuːl/"
          },
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-khr8zxxq",
    title: "1 Hour of Vehicles Songs and Episodes for Preschool",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "khr8ZXxq7yE",
    duration: "25 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
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
                "en": "Doctor",
                "vi": "Bác sĩ",
                "emoji": "🩺",
                "phonetic": "/ˈdɒk.tər/"
          },
          {
                "en": "Dinosaur",
                "vi": "Khủng long",
                "emoji": "🦖",
                "phonetic": "/ˈdaɪ.nə.sɔːr/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-gfozwy57",
    title: "Boom Chicka Boom!",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "_gFOZW_y57c",
    duration: "20 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "Rainbow",
                "vi": "Cầu vồng",
                "emoji": "🌈",
                "phonetic": "/ˈreɪn.bəʊ/"
          },
          {
                "en": "Doctor",
                "vi": "Bác sĩ",
                "emoji": "🩺",
                "phonetic": "/ˈdɒk.tər/"
          },
          {
                "en": "Rain",
                "vi": "Cơn mưa",
                "emoji": "🌧️",
                "phonetic": "/reɪn/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-wkc7h0ub",
    title: "Froggy Fun",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "wKC7h0uBFV4",
    duration: "45 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Flower",
                "vi": "Bông hoa",
                "emoji": "🌸",
                "phonetic": "/ˈflaʊ.ər/"
          },
          {
                "en": "School",
                "vi": "Trường học",
                "emoji": "🏫",
                "phonetic": "/skuːl/"
          },
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "Doctor",
                "vi": "Bác sĩ",
                "emoji": "🩺",
                "phonetic": "/ˈdɒk.tər/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "caities-classroom-limbigin",
    title: "The Farmer In The Dell",
    channel: "Caitie's Classroom",
    channelAvatar: "🎨",
    channelColor: "#F59E0B",
    youtubeId: "liMbi-GiN4c",
    duration: "30 phút",
    category: "world",
    categoryNameVi: "Khám phá thế giới",
    categoryEmoji: "🌍",
    recommendedAge: "3-5 tuổi",
    description: "Lớp học tương tác kỳ thú của cô Caitie giúp bé khám phá khoa học mầm non, làm đồ thủ công và hiểu về cuộc sống quanh mình. Tác phẩm đặc sắc từ kênh Caitie's Classroom.",
    parentTip: "Sau bài học của cô Caitie, ba mẹ hãy cùng bé thử làm một món đồ thủ công đơn giản hoặc trò chuyện về chủ đề bài học.",
    keyVocab: [
          {
                "en": "Fire truck",
                "vi": "Xe cứu hỏa",
                "emoji": "🚒",
                "phonetic": "/ˈfaɪə ˌtrʌk/"
          },
          {
                "en": "Flower",
                "vi": "Bông hoa",
                "emoji": "🌸",
                "phonetic": "/ˈflaʊ.ər/"
          },
          {
                "en": "School",
                "vi": "Trường học",
                "emoji": "🏫",
                "phonetic": "/skuːl/"
          },
          {
                "en": "Rainbow",
                "vi": "Cầu vồng",
                "emoji": "🌈",
                "phonetic": "/ˈreɪn.bəʊ/"
          }
    ],
    isFeatured: false,
  },

  // ===== SUPER SIMPLE (BỔ SUNG MỚI) =====
  {
    id: "super-simple-ify35sjc",
    title: "Healthy Habits! Kids Songs to Help Build Daily Routines from Super Simple Songs",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "_ify35SJcrI",
    duration: "25 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Fruit",
                "vi": "Hoa quả",
                "emoji": "🍎",
                "phonetic": "/fruːt/"
          },
          {
                "en": "Brush teeth",
                "vi": "Đánh răng",
                "emoji": "🪥",
                "phonetic": "/brʌʃ tiːθ/"
          },
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          },
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "super-simple-4xlqpriw",
    title: "This Is The Way",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "4XLQpRI_wOQ",
    duration: "10 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Brush teeth",
                "vi": "Đánh răng",
                "emoji": "🪥",
                "phonetic": "/brʌʃ tiːθ/"
          },
          {
                "en": "Sleep",
                "vi": "Đi ngủ",
                "emoji": "💤",
                "phonetic": "/sliːp/"
          },
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          },
          {
                "en": "Help",
                "vi": "Giúp đỡ",
                "emoji": "🤝",
                "phonetic": "/help/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "super-simple-gmjm0dcn",
    title: "Our Favorite Kids Songs About Good Habits",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "gm_jm0DcNQk",
    duration: "25 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          },
          {
                "en": "Fruit",
                "vi": "Hoa quả",
                "emoji": "🍎",
                "phonetic": "/fruːt/"
          },
          {
                "en": "Help",
                "vi": "Giúp đỡ",
                "emoji": "🤝",
                "phonetic": "/help/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-kddg2m1e",
    title: "The Alphabet Is So Much Fun",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "kDdg2M1_EuE",
    duration: "1 giờ",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          },
          {
                "en": "Brush teeth",
                "vi": "Đánh răng",
                "emoji": "🪥",
                "phonetic": "/brʌʃ tiːθ/"
          },
          {
                "en": "Water",
                "vi": "Uống nước",
                "emoji": "🥛",
                "phonetic": "/ˈwɔː.tər/"
          },
          {
                "en": "Help",
                "vi": "Giúp đỡ",
                "emoji": "🤝",
                "phonetic": "/help/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-slvt8bwa",
    title: "Do You Have A Crayon? + More",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "SLVT8bWayY0",
    duration: "30 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          },
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          },
          {
                "en": "Fruit",
                "vi": "Hoa quả",
                "emoji": "🍎",
                "phonetic": "/fruːt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-diom7o1u",
    title: "Our Favorite Songs About Pets",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "dIom7O1Uowg",
    duration: "1 giờ",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          },
          {
                "en": "Fruit",
                "vi": "Hoa quả",
                "emoji": "🍎",
                "phonetic": "/fruːt/"
          },
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-8lu587o8",
    title: "The Hand Washing Song 🧼",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "8lu587o8T3c",
    duration: "25 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Help",
                "vi": "Giúp đỡ",
                "emoji": "🤝",
                "phonetic": "/help/"
          },
          {
                "en": "Sleep",
                "vi": "Đi ngủ",
                "emoji": "💤",
                "phonetic": "/sliːp/"
          },
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          },
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-mcronbh3",
    title: "Doctor Doctor + More",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "MCronBH3E58",
    duration: "10 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          },
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          },
          {
                "en": "Brush teeth",
                "vi": "Đánh răng",
                "emoji": "🪥",
                "phonetic": "/brʌʃ tiːθ/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-kgcjqbiz",
    title: "First We Wash Our Hands",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "KgCjQBIZ-BM",
    duration: "25 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          },
          {
                "en": "Brush teeth",
                "vi": "Đánh răng",
                "emoji": "🪥",
                "phonetic": "/brʌʃ tiːθ/"
          },
          {
                "en": "Sleep",
                "vi": "Đi ngủ",
                "emoji": "💤",
                "phonetic": "/sliːp/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-wcioxvlg",
    title: "Brush Your Teeth",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "wCio_xVlgQ0",
    duration: "25 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Brush teeth",
                "vi": "Đánh răng",
                "emoji": "🪥",
                "phonetic": "/brʌʃ tiːθ/"
          },
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          },
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-hvyxhmy7",
    title: "The Bath Song",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "HVYXHMY7wvo",
    duration: "1 giờ",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Brush teeth",
                "vi": "Đánh răng",
                "emoji": "🪥",
                "phonetic": "/brʌʃ tiːθ/"
          },
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          },
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "super-simple-jbfb33kh",
    title: "Put On Your Shoes",
    channel: "Super Simple",
    channelAvatar: "🎵",
    channelColor: "#10B981",
    youtubeId: "-jBfb33_KHU",
    duration: "10 phút",
    category: "habits",
    categoryNameVi: "Thói quen & Cảm xúc",
    categoryEmoji: "💖",
    recommendedAge: "0-3 tuổi",
    description: "Bộ sưu tập bài hát giáo dục rèn luyện thói quen tự lập, điều hòa cảm xúc và cách ứng xử lễ phép cho bé mầm non. Tác phẩm đặc sắc từ kênh Super Simple.",
    parentTip: "Cùng hát theo những giai điệu vui tươi và rèn luyện thói quen đánh răng, rửa tay, dọn đồ chơi hàng ngày nhé!",
    keyVocab: [
          {
                "en": "Eat",
                "vi": "Ăn ngoan",
                "emoji": "🥣",
                "phonetic": "/iːt/"
          },
          {
                "en": "Clean up",
                "vi": "Dọn dẹp đồ chơi",
                "emoji": "🧹",
                "phonetic": "/kliːn ʌp/"
          },
          {
                "en": "Water",
                "vi": "Uống nước",
                "emoji": "🥛",
                "phonetic": "/ˈwɔː.tər/"
          },
          {
                "en": "Wash hands",
                "vi": "Rửa tay",
                "emoji": "🧼",
                "phonetic": "/wɒʃ hændz/"
          }
    ],
    isFeatured: false,
  },

  // ===== DANNY GO! (BỔ SUNG MỚI) =====
  {
    id: "danny-go-uqdmftrr",
    title: "Sharks in the Water 2: Rise of the Shark King! 🦈 Floor is Lava Game",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "uqD_MftRRx4",
    duration: "30 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Dance",
                "vi": "Nhảy múa",
                "emoji": "💃",
                "phonetic": "/dɑːns/"
          },
          {
                "en": "Run",
                "vi": "Chạy nhanh",
                "emoji": "🏃",
                "phonetic": "/rʌn/"
          },
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
          },
          {
                "en": "Turn around",
                "vi": "Xoay vòng tròn",
                "emoji": "🔄",
                "phonetic": "/tɜːn əˈraʊnd/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "danny-go-dsupverz",
    title: "\"The Wiggle Dance!\" 🪱 /// Danny Go! Brain Break Songs for Kids",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "DsUPVERZFlI",
    duration: "45 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
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
                "en": "Shake",
                "vi": "Lắc lư",
                "emoji": "🪇",
                "phonetic": "/ʃeɪk/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "danny-go-ebbh6umn",
    title: "“Burning ENERGY!” ⚡️ Don’t-Stop-Moving Challenge",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "ebBH6umnDPE",
    duration: "15 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
          },
          {
                "en": "Turn around",
                "vi": "Xoay vòng tròn",
                "emoji": "🔄",
                "phonetic": "/tɜːn əˈraʊnd/"
          },
          {
                "en": "Stomp",
                "vi": "Dậm chân",
                "emoji": "🦶",
                "phonetic": "/stɒmp/"
          },
          {
                "en": "Run",
                "vi": "Chạy nhanh",
                "emoji": "🏃",
                "phonetic": "/rʌn/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-r7oxuth5",
    title: "\"Flamingo FRENZY!\" Dance Game 🦩🌴 Red Light, Green Light Brain Break",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "R7OxutH5AZY",
    duration: "25 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Stomp",
                "vi": "Dậm chân",
                "emoji": "🦶",
                "phonetic": "/stɒmp/"
          },
          {
                "en": "Run",
                "vi": "Chạy nhanh",
                "emoji": "🏃",
                "phonetic": "/rʌn/"
          },
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
          },
          {
                "en": "Clap",
                "vi": "Vỗ tay",
                "emoji": "👏",
                "phonetic": "/klæp/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-oofongvb",
    title: "“Escape From Tiger Island!” (Jungle Adventure) 🐅🌴 Floor is Lava Game",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "oOfoNGVbVSU",
    duration: "10 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
          },
          {
                "en": "Dance",
                "vi": "Nhảy múa",
                "emoji": "💃",
                "phonetic": "/dɑːns/"
          },
          {
                "en": "Jump",
                "vi": "Nhảy lên",
                "emoji": "🦘",
                "phonetic": "/dʒʌmp/"
          },
          {
                "en": "Shake",
                "vi": "Lắc lư",
                "emoji": "🪇",
                "phonetic": "/ʃeɪk/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-j0xh9fns",
    title: "The Floor is Quicksand: Pyramid Adventure! 🐪 🐍 Floor is Lava Dance Game",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "j0XH9FNSwHg",
    duration: "25 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Turn around",
                "vi": "Xoay vòng tròn",
                "emoji": "🔄",
                "phonetic": "/tɜːn əˈraʊnd/"
          },
          {
                "en": "Dance",
                "vi": "Nhảy múa",
                "emoji": "💃",
                "phonetic": "/dɑːns/"
          },
          {
                "en": "Run",
                "vi": "Chạy nhanh",
                "emoji": "🏃",
                "phonetic": "/rʌn/"
          },
          {
                "en": "Shake",
                "vi": "Lắc lư",
                "emoji": "🪇",
                "phonetic": "/ʃeɪk/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-rtxyvegw",
    title: "\"Don't Stop Digging!\" 💎⛏️ Gemstone Mine Adventure",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "RTxYve-GwzM",
    duration: "15 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Turn around",
                "vi": "Xoay vòng tròn",
                "emoji": "🔄",
                "phonetic": "/tɜːn əˈraʊnd/"
          },
          {
                "en": "Jump",
                "vi": "Nhảy lên",
                "emoji": "🦘",
                "phonetic": "/dʒʌmp/"
          },
          {
                "en": "Run",
                "vi": "Chạy nhanh",
                "emoji": "🏃",
                "phonetic": "/rʌn/"
          },
          {
                "en": "Shake",
                "vi": "Lắc lư",
                "emoji": "🪇",
                "phonetic": "/ʃeɪk/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-ua3ncivu",
    title: "\"Bouncing Time!\" Dance Song 🐰",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "u-A3nCIvUGs",
    duration: "1 giờ",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Shake",
                "vi": "Lắc lư",
                "emoji": "🪇",
                "phonetic": "/ʃeɪk/"
          },
          {
                "en": "Jump",
                "vi": "Nhảy lên",
                "emoji": "🦘",
                "phonetic": "/dʒʌmp/"
          },
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
          },
          {
                "en": "Stomp",
                "vi": "Dậm chân",
                "emoji": "🦶",
                "phonetic": "/stɒmp/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-uld1l6c1",
    title: "\"The Millipede March!\" Bug Dance 🐛🐞 Insect Brain Break",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "U_Ld1L6c1p4",
    duration: "20 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
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
                "en": "Run",
                "vi": "Chạy nhanh",
                "emoji": "🏃",
                "phonetic": "/rʌn/"
          },
          {
                "en": "Dance",
                "vi": "Nhảy múa",
                "emoji": "💃",
                "phonetic": "/dɑːns/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-xkzkphjx",
    title: "The Balloon Pop Dance Game! 🎈💥",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "xkZkPhJX2JA",
    duration: "15 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Dance",
                "vi": "Nhảy múa",
                "emoji": "💃",
                "phonetic": "/dɑːns/"
          },
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
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
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-nxuqxgqh",
    title: "\"Gorilla Smash!\" Drum-Along Dance 🦍🥁 Brain Break",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "nXUQxgQHX8E",
    duration: "30 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
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
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
          },
          {
                "en": "Dance",
                "vi": "Nhảy múa",
                "emoji": "💃",
                "phonetic": "/dɑːns/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "danny-go-nvdle3fh",
    title: "\"The Stomp Clap Dance Song\" 👏🏼/// Danny Go! Kids Songs",
    channel: "Danny Go!",
    channelAvatar: "🏃",
    channelColor: "#8B5CF6",
    youtubeId: "nvDLe3FHcuY",
    duration: "20 phút",
    category: "movement",
    categoryNameVi: "Vận động & Vui nhộn",
    categoryEmoji: "🏃",
    recommendedAge: "3-5 tuổi",
    description: "Những màn nhảy sôi động, trò chơi tương tác vượt chướng ngại vật giúp bé giải phóng năng lượng và phát triển thể chất toàn diện. Tác phẩm đặc sắc từ kênh Danny Go!.",
    parentTip: "Dành không gian rộng rãi để bé cùng cả nhà nhảy múa, xả năng lượng và tăng cường phản xạ thể chất!",
    keyVocab: [
          {
                "en": "Jump",
                "vi": "Nhảy lên",
                "emoji": "🦘",
                "phonetic": "/dʒʌmp/"
          },
          {
                "en": "Freeze",
                "vi": "Đứng yên!",
                "emoji": "❄️",
                "phonetic": "/friːz/"
          },
          {
                "en": "Shake",
                "vi": "Lắc lư",
                "emoji": "🪇",
                "phonetic": "/ʃeɪk/"
          },
          {
                "en": "Run",
                "vi": "Chạy nhanh",
                "emoji": "🏃",
                "phonetic": "/rʌn/"
          }
    ],
    isFeatured: false,
  },

  // ===== STEVE & MAGGIE (BỔ SUNG MỚI) =====
  {
    id: "steve-maggie-x6uqqjq4",
    title: "Best Steve and Maggie Magic Stories for Kids of 2020",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "X6uqqJQ4Tno",
    duration: "1 giờ",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
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
                "en": "Hug",
                "vi": "Ôm yêu thương",
                "emoji": "🤗",
                "phonetic": "/hʌɡ/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "steve-maggie-lvhayozd",
    title: "Halloween Monsters for Kids with Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "LvhayOzDX-E",
    duration: "10 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          },
          {
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
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
          }
    ],
    isFeatured: true,
  },
  {
    id: "steve-maggie-l4mml2vc",
    title: "Healthy Food for Kids with Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "L4mml2vcrTs",
    duration: "10 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Hug",
                "vi": "Ôm yêu thương",
                "emoji": "🤗",
                "phonetic": "/hʌɡ/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
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
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-3du7xkyz",
    title: "Monster Ice Cream Van for Kids with Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "3du7xKy-ZJs",
    duration: "15 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          },
          {
                "en": "Baby",
                "vi": "Em bé",
                "emoji": "👶",
                "phonetic": "/ˈbeɪ.bi/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-vrq4jkjg",
    title: "🎉 Something BIG is coming... HUGE NEWS! Steve and Maggie are coming to Netflix UK! 🇬🇧✨",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "VRQ4JkJG_OA",
    duration: "30 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
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
                "en": "Smile",
                "vi": "Mỉm cười",
                "emoji": "😄",
                "phonetic": "/smaɪl/"
          },
          {
                "en": "Hug",
                "vi": "Ôm yêu thương",
                "emoji": "🤗",
                "phonetic": "/hʌɡ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-sts8ljrr",
    title: "Construction Toy Vehicles for Kids with Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "STS8lJrrpaE",
    duration: "15 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          },
          {
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-fllbrii5",
    title: "Camping Fun with Toy Animals from Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "flLbrIi5U-s",
    duration: "25 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          },
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          },
          {
                "en": "Smile",
                "vi": "Mỉm cười",
                "emoji": "😄",
                "phonetic": "/smaɪl/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-uz7snydm",
    title: "Hide and Seek Magic with Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "uZ7sNYDmrys",
    duration: "20 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          },
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          },
          {
                "en": "Smile",
                "vi": "Mỉm cười",
                "emoji": "😄",
                "phonetic": "/smaɪl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-uo9pdgis",
    title: "Sea Animals with Pirate Steve and Maggie!",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "uO9PdGiSys8",
    duration: "20 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Smile",
                "vi": "Mỉm cười",
                "emoji": "😄",
                "phonetic": "/smaɪl/"
          },
          {
                "en": "Thank you",
                "vi": "Cảm ơn",
                "emoji": "🙏",
                "phonetic": "/ˈθæŋk ˌjuː/"
          },
          {
                "en": "Baby",
                "vi": "Em bé",
                "emoji": "👶",
                "phonetic": "/ˈbeɪ.bi/"
          },
          {
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-l5ly0g5o",
    title: "Magic Toy Car, Holiday Fun for Kids with Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "L5LY0g5ONaY",
    duration: "30 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Mama",
                "vi": "Mẹ",
                "emoji": "👩",
                "phonetic": "/ˈmɑː.mə/"
          },
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          },
          {
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
          },
          {
                "en": "Hug",
                "vi": "Ôm yêu thương",
                "emoji": "🤗",
                "phonetic": "/hʌɡ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-ltkfhjay",
    title: "Spooky Halloween House with Steve and Maggie",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "lTKfHjAyQQs",
    duration: "45 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          },
          {
                "en": "Baby",
                "vi": "Em bé",
                "emoji": "👶",
                "phonetic": "/ˈbeɪ.bi/"
          },
          {
                "en": "Listen",
                "vi": "Lắng nghe",
                "emoji": "👂",
                "phonetic": "/ˈlɪs.ən/"
          },
          {
                "en": "Play",
                "vi": "Chơi đùa",
                "emoji": "🧸",
                "phonetic": "/pleɪ/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "steve-maggie-3wdrpj7d",
    title: "Steve in a Halloween Haunted House! 🎃🕷️ Go Away, Scary Spiders! #shorts #steveandmaggie🧍‍♂️",
    channel: "Steve & Maggie",
    channelAvatar: "🎩",
    channelColor: "#EC4899",
    youtubeId: "-3wdrPJ7D90",
    duration: "15 phút",
    category: "speech",
    categoryNameVi: "Tập nói & Giao tiếp",
    categoryEmoji: "🗣️",
    recommendedAge: "3-5 tuổi",
    description: "Phương pháp phản xạ ngôn ngữ TPR kết hợp tình huống hài hước, giúp bé tiếp thu tiếng Anh tự nhiên như tiếng mẹ đẻ. Tác phẩm đặc sắc từ kênh Steve & Maggie.",
    parentTip: "Cười vui cùng các tình huống ngộ nghĩnh của thầy Steve và chú chim Maggie, nhắc lại các cụm từ tiếng Anh tự nhiên!",
    keyVocab: [
          {
                "en": "Mama",
                "vi": "Mẹ",
                "emoji": "👩",
                "phonetic": "/ˈmɑː.mə/"
          },
          {
                "en": "Happy",
                "vi": "Vui vẻ",
                "emoji": "😊",
                "phonetic": "/ˈhæp.i/"
          },
          {
                "en": "Look",
                "vi": "Nhìn xem",
                "emoji": "👀",
                "phonetic": "/lʊk/"
          },
          {
                "en": "Dada",
                "vi": "Bố",
                "emoji": "👨",
                "phonetic": "/ˈdæd.ə/"
          }
    ],
    isFeatured: false,
  },

  // ===== OXFORD PHONICS (BỔ SUNG MỚI) =====
  {
    id: "oxford-phonics-idzlqwjj",
    title: "Oxford Phonics World student book level 1 - the alphabet - disc 1 - unit 1 - Letter A- ant alligator",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "iDZlQwjJvVw",
    duration: "25 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Dog",
                "vi": "Con chó (D)",
                "emoji": "🐶",
                "phonetic": "/dɒɡ/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "oxford-phonics-sidiyeho",
    title: "Oxford Phonics World student book level 2 - short vowels - disc 1 - intro - ABC Song",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "SiDiyEhobBk",
    duration: "45 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          },
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          }
    ],
    isFeatured: true,
  },
  {
    id: "oxford-phonics-0bvawepd",
    title: "Oxford Phonics World student book level 2 - short vowels - disc 1 - unit 1 - short a - a - ant cat",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "0bvAWePdvTY",
    duration: "10 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Dog",
                "vi": "Con chó (D)",
                "emoji": "🐶",
                "phonetic": "/dɒɡ/"
          },
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-pdyavrxc",
    title: "Oxford Phonics World student book level 4 - Consonant Blends - disc 1 - intro",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "_PdyavRXcRI",
    duration: "1 giờ",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-reprfoi4",
    title: "Oxford Phonics World student book level 4 - Consonant blends - disc 1 - unit 1 - bl cl - black clock",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "REpRFOI4S8I",
    duration: "30 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-9n9xsrjt",
    title: "Oxford Phonics World student book level 3 - long vowels - disc 1 - intro",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "9n9xsRJTlTc",
    duration: "30 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          },
          {
                "en": "Elephant",
                "vi": "Con voi (E)",
                "emoji": "🐘",
                "phonetic": "/ˈel.ɪ.fənt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-mrnhmz5o",
    title: "Oxford Phonics World student book level 3 - long vowels - disc 1 - unit 1 - long a - a_e - tape mane",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "mrnHmz5o8oY",
    duration: "15 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Sun",
                "vi": "Mặt trời (S)",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Cat",
                "vi": "Con mèo (C)",
                "emoji": "🐱",
                "phonetic": "/kæt/"
          },
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-qjsddkgi",
    title: "Oxford Phonics World student book level 5 - Letter Combinations - disc 1 - intro",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "QjSddkGID_E",
    duration: "30 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Sun",
                "vi": "Mặt trời (S)",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-tw8lqzyz",
    title: "Oxford Phonics World student book level 5 - Letter Combinations - disc 1 - Unit 1 - ar - car star",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "tW8lQzyzYLI",
    duration: "20 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-obj0qjyp",
    title: "the alphabet -Letter A",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "obJ0QJYpvmY",
    duration: "20 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Sun",
                "vi": "Mặt trời (S)",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Write",
                "vi": "Viết chữ",
                "emoji": "✏️",
                "phonetic": "/raɪt/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-lyslwl38",
    title: "the alphabet -Letter B",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "lYSLWl388p4",
    duration: "20 phút",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Tree",
                "vi": "Cái cây (T)",
                "emoji": "🌳",
                "phonetic": "/triː/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Fish",
                "vi": "Con cá (F)",
                "emoji": "🐟",
                "phonetic": "/fɪʃ/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          }
    ],
    isFeatured: false,
  },
  {
    id: "oxford-phonics-xd289is2",
    title: "Oxford Phonics World student book1 - the alphabet - disc2 - review4 - letters s t u v w x y z - song",
    channel: "Oxford Phonics",
    channelAvatar: "📖",
    channelColor: "#06B6D4",
    youtubeId: "XD289Is2PMQ",
    duration: "1 giờ",
    category: "phonics",
    categoryNameVi: "Phonics & Chữ cái",
    categoryEmoji: "🔤",
    recommendedAge: "4-6 tuổi",
    description: "Chương trình ngữ âm chuẩn quốc tế Oxford Phonics World rèn luyện phát âm chính xác từ chữ cái đến nguyên âm và phụ âm ghép. Tác phẩm đặc sắc từ kênh Oxford Phonics.",
    parentTip: "Luyện phát âm chuẩn xác từng âm tiết, giúp bé xây dựng nền tảng ngữ âm vững vàng theo chuẩn Cambridge & Oxford.",
    keyVocab: [
          {
                "en": "Sun",
                "vi": "Mặt trời (S)",
                "emoji": "☀️",
                "phonetic": "/sʌn/"
          },
          {
                "en": "Apple",
                "vi": "Quả táo (A)",
                "emoji": "🍎",
                "phonetic": "/ˈæp.əl/"
          },
          {
                "en": "Read",
                "vi": "Đọc sách",
                "emoji": "📖",
                "phonetic": "/riːd/"
          },
          {
                "en": "Ball",
                "vi": "Quả bóng (B)",
                "emoji": "⚽",
                "phonetic": "/bɔːl/"
          }
    ],
    isFeatured: false,
  },

];

export function getRecommendedVideos(currentVideo: EducationalVideo, count = 6): EducationalVideo[] {
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

  // 2 videos from same channel or category
  addUnique(sameChannel.slice(0, 2));
  addUnique(sameCategory.slice(0, 2));

  // 1-2 videos from Safari real wildlife if not already watching Safari
  if (currentVideo.channel !== "Wild Safari") {
    addUnique(safariVideos.slice(0, 1));
  }

  // Diverse top picks across the library
  addUnique(diverseVideos);
  addUnique(shuffle(others));

  return picks.slice(0, count);
}

