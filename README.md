# KENG Vietnam - Hệ sinh thái Zalo Marketing (Mini App & Zalo Bot)

Dự án phát triển toàn diện hệ sinh thái Zalo cho **KENG Vietnam - Agency Marketing Thực chiến**:
1. **`keng_vietnam/`**: Zalo Mini App chuẩn ZaUI Component & kiến trúc Vite 5 + React 18 + TailwindCSS, tối ưu Safe Area iPhone 16 (Dynamic Island) và phân tách đa tab (Trang chủ gói dịch vụ & Tab Media Portfolio 12 dự án thực tế).
2. **`keng_bot/`**: Zalo Bot CSKH tự động (`node-zalo-bot`) tích hợp kịch bản trả lời 24/7, bắn thông báo nổ Lead vào Nhóm Zalo nội bộ và cơ chế **Claim khách hàng độc quyền 1 người duy nhất**.

---

## 1. Cấu trúc Dự án
- `keng_vietnam/`:
  - `src/pages/index.tsx`: Trang chủ dịch vụ, hero bất đối xứng, Quick Action 50-50, search pill và 4 demo nổi bật.
  - `src/pages/media.tsx`: Showcase 12 dự án Media thực chiến (Branding, Video Viral, Fanpage, Web UI/UX, Event Recap, Performance Ads).
  - `src/components/BookingSheet.tsx`: Form đặt lịch hẹn 1 chạm tích hợp auto-fill Tên & Avatar từ Zalo SDK (`getUserInfo`).
  - `src/components/ServiceDetailModal.tsx`: Popup chi tiết gói dịch vụ chuẩn tương phản cao (Light mode, chữ đen sắc nét).
- `keng_bot/`:
  - `index.js`: Server Zalo Bot xử lý tin nhắn, long-polling, định dạng markdown, và webhook nhóm CSKH.

---

## 2. Hướng dẫn phát triển & Chạy thử nghiệm

### A. Zalo Mini App (`keng_vietnam`)
```bash
cd keng_vietnam

# Cài đặt thư viện
yarn install

# Chạy môi trường giả lập (Local Dev)
yarn dev

# Đóng gói sản phẩm
yarn build

# Deploy bản thử nghiệm lên Zalo CDN
zmp login
zmp deploy
```

### B. Zalo Bot (`keng_bot`)
```bash
cd keng_bot

# Cài đặt dependencies
npm install

# Khởi động Bot (chế độ polling)
node index.js
```

---

## 3. Bản quyền
Phát triển bởi **Vietstrix Agency** cho **KENG Vietnam**. Mọi quyền được bảo lưu.
