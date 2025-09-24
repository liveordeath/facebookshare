# 🚀 Random Redirect Tool

Tool quản lý random redirect với admin panel và API routes.

## ✨ Tính năng

- 🎲 **Random Redirect**: Chọn ngẫu nhiên URL từ danh sách
- 🔧 **Admin Panel**: Quản lý config và URL list  
- 🌐 **API Routes**: Cross-device sync
- ⚡ **Real-time**: Cập nhật config ngay lập tức
- 📱 **Responsive**: Hoạt động trên mọi thiết bị
- 🔒 **TypeScript**: Type safety đầy đủ

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

## 🔧 Tùy chỉnh Meta Tags

Chỉnh sửa file `app/layout.tsx` để thay đổi các meta tags:

```typescript
export const metadata: Metadata = {
  title: 'Tiêu đề của bạn',
  description: 'Mô tả của bạn',
  openGraph: {
    title: 'Tiêu đề Open Graph',
    description: 'Mô tả Open Graph',
    url: 'https://your-domain.com',
    images: ['https://your-image.jpg'],
  },
}
```

## 🌐 Deploy lên Vercel

### Bước 1: Chuẩn bị
```bash
npm install
npm run build
```

### Bước 2: Deploy
1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com)
3. Import repository
4. Deploy tự động

### URLs sau deploy:
- **Public**: `https://your-project.vercel.app/`
- **Admin**: `https://your-project.vercel.app/admin`
- **API**: `https://your-project.vercel.app/api/config`

## 🔧 Development

```bash
# Local development
npm run dev

# Build
npm run build

# Test
npm run lint
```

## 📱 Meta Tags được cấu hình

- `og:title` - Tiêu đề bài viết
- `og:description` - Mô tả ngắn gọn
- `og:image` - Hình ảnh đại diện
- `og:url` - URL của trang
- `og:type` - Loại nội dung
- `og:site_name` - Tên website
- `twitter:card` - Twitter Card format
- `twitter:title` - Tiêu đề cho Twitter
- `twitter:description` - Mô tả cho Twitter
- `twitter:image` - Hình ảnh cho Twitter

## 🎨 Styling

Sử dụng CSS modules và global styles trong `app/globals.css`.

## 📁 Assets

### Cấu trúc thư mục assets:
```
public/
├── images/           # Hình ảnh chính
│   ├── og-image.jpg # Hình ảnh Open Graph (1200x630px)
│   ├── hero.jpg     # Hình ảnh hero
│   └── logo.png     # Logo website
├── icons/           # Icons và favicon
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── android-chrome-192x192.png
└── assets/          # Assets khác
    ├── fonts/       # Font files
    ├── videos/      # Video files
    └── documents/   # PDF, docs
```

### Cách sử dụng hình ảnh:
```tsx
// Trong component
<img src="/images/og-image.jpg" alt="Description" />

// Trong CSS
background-image: url('/images/hero.jpg');
```

### Tối ưu hình ảnh:
- **Open Graph**: 1200x630px, JPG/PNG, < 1MB
- **Hero images**: 1920x1080px, JPG, < 500KB
- **Icons**: 32x32px (favicon), 192x192px (Android)
- **Logo**: SVG hoặc PNG với background trong suốt
