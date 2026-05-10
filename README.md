<div align="center">
  <img src="https://raw.githubusercontent.com/proboy172/JBAIkid-App/main/public/icon.png" width="120" alt="JBAIkid Logo" />
  <h1>🌟 JBAIkid - Học Hay, Hát Giỏi 🌟</h1>
  <p><strong>Nền tảng Giải trí & Học tập Tiếng Anh Offline 100% dành riêng cho Trẻ Em</strong></p>

  [![Build Android APK](https://github.com/proboy172/JBAIkid-App/actions/workflows/build-apk.yml/badge.svg)](https://github.com/proboy172/JBAIkid-App/actions/workflows/build-apk.yml)
  [![Capacitor](https://img.shields.io/badge/Capacitor-Native-blue?logo=capacitor)](https://capacitorjs.com/)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 📌 Về Ứng Dụng (About)

**JBAIkid** là một siêu ứng dụng di động giáo dục - giải trí được thiết kế đặc biệt dành cho trẻ mầm non và tiểu học. Khác biệt với các ứng dụng thông thường, JBAIkid hoạt động **hoàn toàn Offline (không cần mạng)**, đảm bảo môi trường học tập an toàn tuyệt đối, không quảng cáo, không nội dung độc hại.

Sản phẩm được phát triển bằng **Next.js** và "hóa cốt" thành ứng dụng Android Native bằng **Capacitor**, tích hợp trí tuệ nhân tạo (Whisper AI) để xử lý dữ liệu chuẩn xác nhất.

## 🚀 Tính Năng Nổi Bật (Key Features)

### 🎵 Karaoke Đồng Bộ Bằng AI
- Hơn 30 bài hát song ngữ Anh - Việt.
- Lời bài hát (Karaoke Lyrics) được đồng bộ **đến từng chữ (Word-level)** bằng thuật toán **Whisper AI** và Heuristic Sync, mang lại trải nghiệm ngân nga cực mượt.
- Tự động phát (Autoplay) và Tự động lặp lại thông minh.

### 🗣️ Học Từ Vựng Thực Tế ảo (Flashcards + Voice)
- Học từ vựng qua thẻ bài hình ảnh sinh động.
- **Tích hợp Native Speech Recognition**: Sử dụng công nghệ nhận diện giọng nói gốc của Android để nghe và chấm điểm phát âm tiếng Anh của bé ngay lập tức.
- Phát âm từ vựng chuẩn bản xứ (Web Speech API).

### 🎮 Trạm Game Tư Duy (Minigames)
Hệ thống game được thiết kế giúp bé kiếm "Sao" sau những giờ học:
- **Lật Thẻ Nhớ (Memory Game)**: Luyện trí nhớ ngắn hạn.
- **Nghe & Chọn (Quiz Game)**: Nghe phát âm và nhặt đúng hình.
- **Nối Hình (Match Game)**: Rèn luyện logic nối từ và hình.

### 🎁 Cửa Hàng Nhãn Dán (Sticker Store)
- Bé dùng sao (Star) tích lũy được từ việc học và chơi game để đổi lấy các Nhãn Dán (Stickers) cực ngầu (Khủng long, Siêu xe, Động vật...).

### 🛡️ Lưu Trữ Vĩnh Viễn (Native Persistence)
- Sử dụng **Capacitor Preferences** chọc sâu vào lõi thiết bị Android. Tiến trình học, điểm số và số sao của bé được bảo vệ tuyệt đối, không bị mất ngay cả khi phụ huynh lỡ tay "Xóa Cache" điện thoại.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend:** Next.js (App Router), React, TailwindCSS, Framer Motion.
- **Mobile Engine:** Capacitor (Android).
- **Native Plugins:** 
  - `@capacitor/preferences` (Lưu trữ)
  - `@capacitor-community/speech-recognition` (Thu âm)
- **AI Processing (Build-time):** OpenAI Whisper (Python), FFmpeg, Heuristic Timings.
- **CI/CD:** GitHub Actions (Tự động biên dịch ra tệp APK).

---

## 📦 Cách Tải & Cài Đặt (Installation)

### Dành Cho Phụ Huynh (Người dùng)
Bạn không cần biết lập trình! Chỉ cần tải file ứng dụng và cài đặt:
1. Vào mục **[Actions](https://github.com/proboy172/JBAIkid-App/actions)** trên kho lưu trữ này.
2. Bấm vào luồng chạy **Build Android APK** gần nhất có dấu tích xanh (✅).
3. Kéo xuống dưới cùng phần **Artifacts**, tải file `JBAIkid-App.zip` về giải nén ra sẽ có file `.apk`.
4. Gửi file `.apk` vào điện thoại Android của bé và cài đặt. Mọi video bài hát đã được nhúng sẵn, bé có thể xem ngay không cần WiFi!

### Dành Cho Lập Trình Viên (Developers)

**1. Clone dự án về máy:**
```bash
git clone https://github.com/proboy172/JBAIkid-App.git
cd JBAIkid-App
```

**2. Cài đặt thư viện:**
```bash
npm install
```

**3. Chạy thử nghiệm trên Web (Development):**
```bash
npm run dev
```

**4. Build ra file Android (.apk) ngay trên máy tính của bạn:**
Yêu cầu: Máy tính phải cài đặt sẵn `Java JDK 17` và `Android Studio`.
```bash
# Build Web thành thư mục /out
npm run build

# Đồng bộ dữ liệu tĩnh xuống thư mục lõi Android
npx cap sync android

# Mở Android Studio để tự tay Build APK
npx cap open android
```

---

## 🏗️ Cấu Trúc Dự Án (Project Structure)
- `src/app`: Giao diện ứng dụng (UI/UX) chia theo chức năng.
- `src/components`: Các mảnh ghép giao diện (Nút bấm, Header, Hiệu ứng pháo hoa).
- `src/data`: Cấu trúc dữ liệu bài hát, từ vựng (Đã được nắn chỉnh AI).
- `public/videos`: Chứa file video siêu nén (Offline 100%).
- `android/`: Nền tảng gốc của ứng dụng Android sau khi được hóa cốt từ Web.
- `*.py / *.js` ở thư mục gốc: Các công cụ cào dữ liệu, gọi AI Whisper và cắt video tự động.

---
*Phát triển bằng tình yêu thương dành cho trẻ nhỏ ❤️*
