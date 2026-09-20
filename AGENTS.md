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
