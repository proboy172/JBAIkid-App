<div align="center">
  <img src="https://raw.githubusercontent.com/proboy172/JBAIkid-App/main/public/icon.png" width="120" alt="JBAIkid Logo" />
  <h1>🌟 JBAIkid - Học Hay, Vui Sáng Tạo 🌟</h1>
  <p><strong>Nền tảng Học tập & Giải trí Tiếng Anh An Toàn Tuyệt Đối cho Trẻ Em (Web App / PWA)</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
  [![Kid-Safe](https://img.shields.io/badge/Safety-COPPA%20Compliant%20%7C%20No%20Ads-green)](#)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 📌 Giới Thiệu (About JBAIkid)

**JBAIkid** là nền tảng Web App giáo dục – giải trí tương tác được thiết kế riêng cho trẻ mầm non và tiểu học. Ứng dụng chạy trực tiếp trên trình duyệt Web (hỗ trợ cài đặt PWA trên máy tính bảng, iPad, máy tính và điện thoại), mang đến môi trường học tập **an toàn 100%, không quảng cáo (Ad-Free), không mã theo dõi độc hại**.

---

## 🚀 Tính Năng Nổi Bật (Key Features)

### 📚 Kho Video Giáo Dục Chọn Lọc (148+ Video Đã Thẩm Định 100%)
- Tuyển tập 148 video chất lượng cao từ các kênh giáo dục trẻ em hàng đầu (VTV7 Kids, Cocomelon, Super Simple Songs, ChuChu TV, Pinkfong, Numberblocks, SciShow Kids...).
- Phân loại rõ ràng: **Tiếng Anh, Toán tư duy, Khoa học & Tự nhiên, Bài hát thiếu nhi, Kỹ năng sống**.
- Toàn bộ video được kiểm duyệt và xác thực đường truyền, loại bỏ 100% video lỗi/không khả dụng.

### 🎵 Trình Phát Video Bài Hát & Học Từ Vựng
- Hơn 40 bài hát song ngữ Anh - Việt quen thuộc cho bé.
- Khung hiển thị **Từ vựng trọng tâm** kèm phát âm chuẩn bản ngữ qua Web Speech Audio.
- Bảng phụ đề và lời dịch song ngữ trực quan cho phụ huynh cùng học với bé, giữ khung hình video sạch sẽ và rõ nét.

### 🗣️ Học Tương Tác & Luyện Phát Âm
- **Cô giáo AI (AI Teacher)**: Trò chuyện và giải đáp thắc mắc của bé bằng giọng đọc thân thiện.
- **Cuộc gọi Chú Cảnh Sát (Police Call)**: Tình huống rèn luyện kỹ năng an toàn và thói quen tốt.
- **Thẻ Flashcards**: Học từ vựng theo chủ đề với hình ảnh minh họa sinh động và chấm điểm phát âm.

### 🎮 Trạm Game Tư Duy (Minigames)
- **Lật Thẻ Nhớ (Memory Game)**: Rèn luyện trí nhớ thị giác.
- **Nghe & Chọn (Quiz Game)**: Luyện nghe nhận biết từ vựng.
- **Nối Hình (Match Game)**: Rèn phản xạ ghép cặp từ và hình ảnh.

### 🎁 Cửa Hàng Nhãn Dán (Sticker Store)
- Bé tích lũy "Sao Thưởng" qua mỗi bài học, video và trò chơi để đổi các nhãn dán sticker ngộ nghĩnh.
- Lưu trữ dữ liệu học tập an toàn trên trình duyệt qua Local Storage / Preferences.

---

## 🛠️ Ngăn Xếp Công Nghệ (Tech Stack)

- **Core Framework:** Next.js 15 (App Router, Static Export `output: "export"`).
- **UI & Animation:** React 19, TailwindCSS, Framer Motion, Lucide Icons.
- **Audio & Speech:** Web Speech API, Web Audio Context Singleton.
- **Deployment Target:** Web App / PWA (Firebase Hosting, Vercel, Cloudflare Pages).
- **Data Pipeline:** Node.js / Python kiểm định chất lượng nội dung và định dạng JSON tĩnh tối ưu bộ nhớ.

---

## 💻 Hướng Dẫn Cài Đặt & Phát Triển (Development)

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Development Server):
```bash
npm run dev
```
Truy cập ứng dụng tại `http://localhost:3000`.

### 3. Đóng gói bản chạy sản xuất (Production Static Build):
```bash
npm run build
```
Toàn bộ mã nguồn tĩnh được xuất ra thư mục `/out`, sẵn sàng deploy lên bất kỳ nền tảng Web Hosting tĩnh nào (Firebase, Vercel, Netlify, Nginx, GitHub Pages).

---

## 🏗️ Cấu Trúc Thư Mục (Project Structure)

- `src/app/`: Các trang giao diện (Trang chủ, Videos giáo dục, Video bài hát, AI Teacher, Minigames, Sticker Store).
- `src/components/`: Các thành phần giao diện tái sử dụng (SafeVideoModal, KaraokePlayer, Audio Controls, Navigation).
- `src/data/`: Cơ sở dữ liệu tĩnh đã được làm sạch và chuẩn hóa (`educationalVideos.json`, `songs-en.json`, `songs-vi.json`, `flashcards.ts`).
- `src/hooks/`: Các React hooks tối ưu (`useSpeechRecognition`, `useAudio`).
- `src/utils/`: Tiện ích âm thanh singleton và bộ phát audio an toàn.
- `public/`: Tài nguyên tĩnh, biểu tượng, hình ảnh minh họa cho bé.

---
*Phát triển với tình yêu thương và cam kết an toàn cho trẻ nhỏ ❤️*
