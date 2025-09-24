# 🚀 Hướng dẫn Deploy lên Vercel

## 📋 Yêu cầu
- Tài khoản GitHub
- Tài khoản Vercel (miễn phí)
- Dự án đã push lên GitHub

## 🔧 Bước 1: Chuẩn bị dự án

### 1.1. Cập nhật package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 1.2. Cấu hình next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['fs']
  }
}

module.exports = nextConfig
```

## 🌐 Bước 2: Deploy lên Vercel

### 2.1. Truy cập Vercel
1. Vào [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. Nhấn "New Project"

### 2.2. Import từ GitHub
1. Chọn repository `tool_fb`
2. Vercel tự động detect Next.js
3. Nhấn "Deploy"

### 2.3. Cấu hình Environment Variables
```
NODE_ENV=production
```

## ✅ Bước 3: Kiểm tra deployment

### 3.1. URLs sau khi deploy
- **Public**: `https://your-project.vercel.app/`
- **Admin**: `https://your-project.vercel.app/admin`
- **API**: `https://your-project.vercel.app/api/config`

### 3.2. Test tính năng
1. Vào `/admin` → Cập nhật config → Lưu
2. Vào `/` → Kiểm tra redirect hoạt động
3. Test trên thiết bị khác

## 🔄 Bước 4: Auto-deploy từ GitHub

### 4.1. Cấu hình auto-deploy
- Mỗi lần push code lên GitHub
- Vercel tự động build và deploy
- Không cần làm gì thêm

### 4.2. Custom domain (tùy chọn)
1. Vào Vercel Dashboard
2. Settings → Domains
3. Thêm domain tùy chỉnh

## 🛠️ Troubleshooting

### Lỗi thường gặp:
1. **API không hoạt động**: Kiểm tra Vercel Functions
2. **Build failed**: Kiểm tra dependencies
3. **Config không lưu**: Kiểm tra file permissions

### Debug:
```bash
# Local test
npm run dev

# Check build
npm run build
```

## 📊 Monitoring

### Vercel Dashboard:
- Deployments history
- Function logs
- Performance metrics
- Error tracking

## 🎯 Kết quả

Sau khi deploy thành công:
- ✅ API routes hoạt động
- ✅ Admin page lưu config
- ✅ Public page nhận config
- ✅ Random redirect hoạt động
- ✅ Cross-device sync

## 🔗 Links hữu ích

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Functions](https://vercel.com/docs/functions)
