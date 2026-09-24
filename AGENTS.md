<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- BEGIN:auto-deploy-rules -->
# QUY TẮC BẮT BUỘC: TỰ ĐỘNG DEPLOY LÊN GITHUB & WEB CHÍNH

Sau khi hoàn thành bất kỳ tác vụ nào (thêm tính năng, sửa bug, cập nhật dữ liệu...):
1. **Build sản xuất**: Chạy `npm run build` để kiểm tra TypeScript và xuất bản tĩnh ra thư mục `out/`.
2. **Deploy Web chính**: Chạy `cmd.exe /c "firebase deploy --only hosting:jbaikid"` để cập nhật ngay lập tức lên web chính `https://jbaikid.web.app`.
3. **Đẩy mã nguồn GitHub**: Chạy `git add .`, `git commit -m "..."` và `git push origin main`.
4. **Báo cáo**: Xác nhận trạng thái deploy thành công và cung cấp liên kết web chính cho người dùng.
<!-- END:auto-deploy-rules -->

<!-- BEGIN:video-management-rules -->
# QUY TẮC QUẢN LÝ VIDEO (BẮT BUỘC)

Khi thêm hoặc cập nhật video cho kho video học tập (`src/data/educationalVideos.json`) hoặc danh mục bài hát:
1. **TUYỆT ĐỐI KHÔNG THÊM VIDEO SHORT**:
   - Chỉ thêm video màn hình ngang chuẩn 16:9, thời lượng dài (tối thiểu từ 2-3 phút trở lên, tốt nhất là 5 - 60 phút).
   - Tuyệt đối không lấy video định dạng dọc (Shorts), teaser quảng cáo, trailer ngắn dưới 1 phút hoặc video có gắn thẻ `#shorts` / `#short`.
2. **KIỂM TRA KHẢ DỤNG & CHO PHÉP NHÚNG (EMBED)**:
   - Trước khi lưu bất kỳ video ID nào vào hệ thống, bắt buộc phải kiểm tra video có đang hoạt động công khai và cho phép phát trên web bên thứ ba (không bị chặn nhúng Error 101/150).
<!-- END:video-management-rules -->

