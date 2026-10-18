import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../src/data/educationalVideos.json');

const storylineBooks = [
  {
    id: "storyline-the-rainbow-fish",
    title: "The Rainbow Fish | Kể Chuyện Thiếu Nhi Đoạt Giải Quốc Tế",
    channel: "Storyline Online",
    channelAvatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80",
    channelColor: "#0284C7",
    youtubeId: "r9mryuEKkKc",
    duration: "11:00",
    category: "story",
    categoryNameVi: "Đọc truyện nhí",
    categoryEmoji: "📚",
    recommendedAge: "3-5 tuổi",
    description: "Câu chuyện kinh điển về chú cá cầu vồng học cách sẻ chia những vảy lấp lánh để tìm thấy niềm vui và tình bạn thật sự.",
    parentTip: "Hỏi bé cảm xúc của các chú cá khi được chia sẻ vảy bạc, giúp con thấu hiểu giá trị của lòng vị tha và tình bạn.",
    keyVocab: [
      { en: "Fish", vi: "Con cá", emoji: "🐟" },
      { en: "Rainbow", vi: "Cầu vồng", emoji: "🌈" },
      { en: "Share", vi: "Chia sẻ", emoji: "🎁" },
      { en: "Friend", vi: "Bạn bè", emoji: "🤝" }
    ],
    isFeatured: true,
    isNew: true
  },
  {
    id: "storyline-room-on-the-broom",
    title: "Room on the Broom | Đọc Truyện Tiếng Anh Với Kate Winslet",
    channel: "Storyline Online",
    channelAvatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80",
    channelColor: "#0284C7",
    youtubeId: "qg6KK0iv9QI",
    duration: "12:30",
    category: "story",
    categoryNameVi: "Đọc truyện nhí",
    categoryEmoji: "📚",
    recommendedAge: "4-6 tuổi",
    description: "Câu chuyện tranh vần điệu đáng yêu về lòng hiếu khách và tinh thần tương trợ giữa cô phù thủy tốt bụng cùng các bạn động vật.",
    parentTip: "Cùng bé lặp lại các câu vần tiếng Anh giàu nhịp điệu để con cảm thụ ngôn ngữ tự nhiên.",
    keyVocab: [
      { en: "Broom", vi: "Cây chổi", emoji: "🧹" },
      { en: "Cat", vi: "Con mèo", emoji: "🐱" },
      { en: "Dog", vi: "Chú chó", emoji: "🐶" },
      { en: "Help", vi: "Giúp đỡ", emoji: "🤲" }
    ],
    isFeatured: true,
    isNew: true
  },
  {
    id: "storyline-the-three-little-pigs",
    title: "The Three Little Pigs and the Somewhat Bad Wolf | Ba Chú Heo Con",
    channel: "Storyline Online",
    channelAvatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80",
    channelColor: "#0284C7",
    youtubeId: "bY4FWXqxTlc",
    duration: "13:45",
    category: "story",
    categoryNameVi: "Đọc truyện nhí",
    categoryEmoji: "📚",
    recommendedAge: "3-5 tuổi",
    description: "Phiên bản kể chuyện hài hước và ấm áp về ba chú heo con thông minh cùng chú sói đáng mến, giọng đọc truyền cảm bởi Kaia Gerber.",
    parentTip: "Khuyến khích bé kể lại xem ngôi nhà nào kiên cố nhất và vì sao sự chăm chỉ luôn mang lại kết quả tốt.",
    keyVocab: [
      { en: "Pig", vi: "Chú heo", emoji: "🐷" },
      { en: "Wolf", vi: "Chó sói", emoji: "🐺" },
      { en: "House", vi: "Ngôi nhà", emoji: "🏡" },
      { en: "Build", vi: "Xây dựng", emoji: "🧱" }
    ],
    isFeatured: false,
    isNew: true
  },
  {
    id: "storyline-the-king-of-kindergarten",
    title: "The King of Kindergarten | Bé Vui Bước Vào Mầm Non Tự Tin",
    channel: "Storyline Online",
    channelAvatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80",
    channelColor: "#0284C7",
    youtubeId: "mz6o8b2bFd0",
    duration: "10:15",
    category: "story",
    categoryNameVi: "Đọc truyện nhí",
    categoryEmoji: "📚",
    recommendedAge: "3-5 tuổi",
    description: "Cuốn sách tuyệt vời giúp bé chuẩn bị tâm lý tự tin, hào hứng khi đến trường mầm non với nụ cười rạng rỡ, diễn đọc bởi Terry Crews.",
    parentTip: "Cùng con xem trước ngày đi học để truyền cảm hứng tự lập, tự hào khi bé chuẩn bị đến trường cùng thầy cô, bạn bè.",
    keyVocab: [
      { en: "King", vi: "Vua nhí", emoji: "👑" },
      { en: "School", vi: "Trường học", emoji: "🏫" },
      { en: "Smile", vi: "Nụ cười", emoji: "😊" },
      { en: "Ready", vi: "Sẵn sàng", emoji: "⭐" }
    ],
    isFeatured: false,
    isNew: true
  },
  {
    id: "storyline-library-lion",
    title: "Library Lion | Chú Sư Tử Yêu Sách Trong Thư Viện",
    channel: "Storyline Online",
    channelAvatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80",
    channelColor: "#0284C7",
    youtubeId: "T18NCobS43c",
    duration: "15:20",
    category: "story",
    categoryNameVi: "Đọc truyện nhí",
    categoryEmoji: "📚",
    recommendedAge: "4-6 tuổi",
    description: "Một chú sư tử to lớn bước vào thư viện và học cách giữ yên lặng, giúp đỡ mọi người và tình yêu sâu sắc với những trang sách.",
    parentTip: "Bài học ý nghĩa về việc tuân thủ nội quy nơi công cộng nhưng luôn biết cách linh hoạt khi có người cần giúp đỡ khẩn cấp.",
    keyVocab: [
      { en: "Lion", vi: "Sư tử", emoji: "🦁" },
      { en: "Library", vi: "Thư viện", emoji: "🏛️" },
      { en: "Book", vi: "Cuốn sách", emoji: "📖" },
      { en: "Quiet", vi: "Giữ yên lặng", emoji: "🤫" }
    ],
    isFeatured: false,
    isNew: true
  },
  {
    id: "storyline-arnie-the-doughnut",
    title: "Arnie the Doughnut | Chiếc Bánh Donut Vui Tính & Thông Minh",
    channel: "Storyline Online",
    channelAvatar: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&q=80",
    channelColor: "#0284C7",
    youtubeId: "6E67n1vZZjQ",
    duration: "15:00",
    category: "story",
    categoryNameVi: "Đọc truyện nhí",
    categoryEmoji: "📚",
    recommendedAge: "3-5 tuổi",
    description: "Hành trình hài hước đáng kinh ngạc của chiếc bánh donut Arnie tìm kiếm vị trí đặc biệt của mình trên đời, đọc bởi Chris O'Dowd.",
    parentTip: "Khuyến khích bé tư duy tích cực rằng mỗi người đều có nét đặc biệt riêng và luôn có chỗ đứng ý nghĩa trong cuộc sống.",
    keyVocab: [
      { en: "Doughnut", vi: "Bánh donut", emoji: "🍩" },
      { en: "Bakery", vi: "Tiệm bánh", emoji: "🥖" },
      { en: "Friendship", vi: "Tình bạn", emoji: "💛" }
    ],
    isFeatured: false,
    isNew: true
  }
];

// Curated Art for Kids Hub step-by-step drawing classics
const artForKidsClassics = [
  {
    id: "art-draw-cute-puppy",
    title: "How To Draw A Cute Puppy Dog | Bé Tập Vẽ Cún Con Đáng Yêu",
    channel: "Art for Kids Hub",
    channelAvatar: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&q=80",
    channelColor: "#E11D48",
    youtubeId: "O9u-zY1K5lE",
    duration: "08:30",
    category: "art",
    categoryNameVi: "Bé vẽ sáng tạo",
    categoryEmoji: "🎨",
    recommendedAge: "3-5 tuổi",
    description: "Bố Rob và con trai hướng dẫn bé vẽ từng đường nét đơn giản để hoàn thành chú cún con siêu dễ thương và tô màu rực rỡ.",
    parentTip: "Đừng lo nếu nét vẽ của bé chưa thẳng. Điều quan trọng nhất là con cầm bút tự tin và hào hứng với tác phẩm của mình.",
    keyVocab: [
      { en: "Draw", vi: "Vẽ tranh", emoji: "✏️" },
      { en: "Puppy", vi: "Cún con", emoji: "🐶" },
      { en: "Color", vi: "Tô màu", emoji: "🖍️" }
    ],
    isFeatured: true,
    isNew: true
  },
  {
    id: "art-draw-cute-kitten",
    title: "How To Draw A Cute Kitten | Bé Tập Vẽ Mèo Con Ngộ Nghĩnh",
    channel: "Art for Kids Hub",
    channelAvatar: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&q=80",
    channelColor: "#E11D48",
    youtubeId: "5j93s-V-k_s",
    duration: "09:10",
    category: "art",
    categoryNameVi: "Bé vẽ sáng tạo",
    categoryEmoji: "🎨",
    recommendedAge: "3-5 tuổi",
    description: "Từng bước vẽ chú mèo con với đôi tai xinh và chiếc đuôi uốn lượn, hoạt động gắn kết sáng tạo tuyệt vời cho cả gia đình.",
    parentTip: "Cùng bé chọn màu lông cho chú mèo con và khen ngợi sự tập trung tỉ mỉ của con.",
    keyVocab: [
      { en: "Kitten", vi: "Mèo con", emoji: "🐱" },
      { en: "Tail", vi: "Cái đuôi", emoji: "🐾" },
      { en: "Happy", vi: "Vui mừng", emoji: "😸" }
    ],
    isFeatured: false,
    isNew: true
  }
];

// Curated Cosmic Kids Yoga adventures
const cosmicYogaClassics = [
  {
    id: "cosmic-yoga-frozen-adventure",
    title: "Frozen A Cosmic Kids Yoga Adventure | Yoga Nữ Hoàng Băng Giá",
    channel: "Cosmic Kids Yoga",
    channelAvatar: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&q=80",
    channelColor: "#8B5CF6",
    youtubeId: "xlg052EKMtk",
    duration: "30:00",
    category: "yoga",
    categoryNameVi: "Yoga & Cảm xúc",
    categoryEmoji: "🧘‍♀️",
    recommendedAge: "3-5 tuổi",
    description: "Chuyến phiêu lưu yoga Frozen kỳ diệu cùng cô Jaime: vừa vận động dẻo dai cơ thể vừa rèn luyện hơi thở sâu và bình tĩnh.",
    parentTip: "Cùng con đóng vai các nhân vật Frozen trên thảm tập, vận động sau giờ học bài để giải tỏa căng thẳng.",
    keyVocab: [
      { en: "Breathe", vi: "Hít thở", emoji: "🌬️" },
      { en: "Balance", vi: "Thăng bằng", emoji: "⚖️" },
      { en: "Calm", vi: "Bình tĩnh", emoji: "🧘" }
    ],
    isFeatured: true,
    isNew: true
  },
  {
    id: "cosmic-yoga-safari-adventure",
    title: "Safari Yoga Adventure | Yoga Thám Hiểm Muôn Loài Hoang Dã",
    channel: "Cosmic Kids Yoga",
    channelAvatar: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&q=80",
    channelColor: "#8B5CF6",
    youtubeId: "C4CaR0syf1g",
    duration: "22:00",
    category: "yoga",
    categoryNameVi: "Yoga & Cảm xúc",
    categoryEmoji: "🧘‍♀️",
    recommendedAge: "3-5 tuổi",
    description: "Hóa thân thành chú hươu cao cổ vươn cao, sư tử mạnh mẽ và chim hồng hạc giữ thăng bằng qua bài tập yoga đầy cảm hứng.",
    parentTip: "Khuyến khích bé cảm nhận sự dẻo dai của cột sống và các nhóm cơ khi duỗi người cùng các bạn thú rừng.",
    keyVocab: [
      { en: "Giraffe", vi: "Hươu cao cổ", emoji: "🦒" },
      { en: "Stretch", vi: "Vươn vai duỗi người", emoji: "🙆" },
      { en: "Strong", vi: "Khỏe khoắn", emoji: "💪" }
    ],
    isFeatured: false,
    isNew: true
  }
];

function updateLibrary() {
  const current = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`Current library: ${current.length} items.`);

  // Remove the 5 actor interviews that were fetched from Storyline Online RSS
  const interviewIds = new Set(['34uBkUbyb3o', 'iIOK_8s-88I', '6JvKQMhN9x4', 'xLTuaqYeKzk', 'KrDk8NKPqok']);
  const cleaned = current.filter(v => !interviewIds.has(v.youtubeId));

  const existingYtIds = new Set(cleaned.map(v => v.youtubeId));
  const toAdd = [];

  for (const item of [...storylineBooks, ...artForKidsClassics, ...cosmicYogaClassics]) {
    if (!existingYtIds.has(item.youtubeId)) {
      toAdd.push(item);
      existingYtIds.add(item.youtubeId);
    }
  }

  const finalLibrary = [...toAdd, ...cleaned];
  fs.writeFileSync(DATA_FILE, JSON.stringify(finalLibrary, null, 2), 'utf8');
  console.log(`✨ Successfully updated library: ${finalLibrary.length} videos (added ${toAdd.length} curated picture books & adventures).`);
}

updateLibrary();
