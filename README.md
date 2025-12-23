# Milk Store

## Overview

- Ứng dụng web bán lẻ sữa: duyệt sản phẩm, giỏ hàng, đặt/ thanh toán đơn và theo dõi trạng thái.
- Điều hướng với React Router; xác thực qua cookie + AuthContext, gọi API qua axios client có interceptor.
- Trang nội dung đầy đủ: giới thiệu, liên hệ, hướng dẫn mua/ thanh toán, chính sách vận chuyển/đổi trả.

## Demo

- (Chèn video/GIF hoặc link demo sản phẩm tại đây)

## Key Features

- Danh mục & chi tiết sản phẩm, lọc/ phân trang, sản phẩm liên quan.
- Giỏ hàng, mã giảm giá, tính tổng tiền; luồng đặt hàng + thanh toán PayOS.
- Theo dõi đơn: pending/processing/shipping/waiting/confirmed.
- Auth: đăng ký OTP, đăng nhập, quên/đặt lại mật khẩu, cập nhật hồ sơ; token lưu bằng cookie.
- Trang voucher riêng cho người dùng đăng nhập; gợi ý/hiển thị mã giảm giá.

## Tech Stack

![React 18](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite 6](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![React Router 7](https://img.shields.io/badge/React%20Router-7-ca4245?logo=react-router&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)
![Ant Design 5](https://img.shields.io/badge/Ant%20Design-5-0170fe?logo=antdesign&logoColor=white)
![Axios 1](https://img.shields.io/badge/Axios-1-5a29e4)
![Redux Toolkit 2](https://img.shields.io/badge/Redux_Toolkit-2-764abc?logo=redux&logoColor=white)
![Zustand 4](https://img.shields.io/badge/Zustand-4-4a5568)
![Framer Motion 12](https://img.shields.io/badge/Framer_Motion-12-0055ff?logo=framer&logoColor=white)

- Frontend: Vite + React 18, React Router 7.
- UI: Tailwind CSS, Ant Design, Framer Motion, React Icons.
- State/data: Context API (Auth), custom hooks; axios client + interceptor; có Redux Toolkit/Zustand trong dependencies.
- Tiện ích: date-fns, moment, js-cookie.

## Environment Variables

Tạo file `.env` (hoặc `.env.local`) tại thư mục gốc:

```
VITE_API_BASE_URL
VITE_RETURN_URL
VITE_CANCEL_URL
```

- `VITE_API_BASE_URL`: base URL cho axios client và các service.
- `VITE_RETURN_URL`, `VITE_CANCEL_URL`: URL redirect sau thanh toán/cancel; code có fallback domain Vercel nếu thiếu.

## Local Development

- Yêu cầu: Node 18+ (khuyến nghị 18/20), npm.
- Cài đặt: `npm install`
- Chạy dev: `npm run dev` (mặc định http://localhost:5173).
- Kiểm tra lint (tùy chọn): `npm run lint`

## Build & Production Preview

- Build: `npm run build`
- Preview sản phẩm build: `npm run preview` (chạy server để kiểm tra thử trước khi deploy).
