// Cấu hình URL redirect
export const redirectConfig = {
  // Thời gian delay trước khi redirect (milliseconds)
  delay: 1, // 2 giây - để có thể thấy random hoạt động
  
  // Có hiển thị thông báo redirect không
  showNotification: false,
  
  // Thông báo hiển thị cho người dùng
  notificationMessage: '',
  
  // Có hiển thị nút "Chuyển ngay" không
  showSkipButton: false,
  
  // Text cho nút skip
  skipButtonText: '',
  
  // Có hiển thị countdown không
  showCountdown: false,
}

// Danh sách URL để random redirect
export const urlList = [
  {
    id: 1,
    url: 'https://s.shopee.vn/8zw3h5XsET',
    active: true
  },
  {
    id: 2,
    url: 'https://s.shopee.vn/803YA0thcT',
    active: true
  },
  {
    id: 3,
    url: 'https://s.shopee.vn/qaNbxKec0', 
    active: true
  },
  {
    id: 4,
    url: 'https://s.shopee.vn/9fBm8DHphG', 
    active: true
  },
  {
    id: 5,
    url: 'https://s.shopee.vn/9pVCKeDxzy', 
    active: true
  },
  {
    id: 6,
    url: 'https://s.shopee.vn/1qSuo1G8q2', 
    active: true
  },
  {
    id: 7,
    url: 'https://s.shopee.vn/8zw5L86u99', 
    active: true
  },
  {
    id: 8,
    url: 'https://s.shopee.vn/gGxPvjq1q', 
    active: true
  },
  {
    id: 9,
    url: 'https://s.shopee.vn/AKRSvi02aZ', 
    active: true
  },
  {
    id: 10,
    url: 'https://s.shopee.vn/3qDzBoeU9Z', 
    active: true
  },
  {
    id: 11,
    url: 'https://s.shopee.vn/1qSuo9uhWA', 
    active: true
  },
  {
    id: 12,
    url: 'https://s.shopee.vn/70B0yTTd6E', 
    active: true
  },
  
  

]

// Hàm lấy URL ngẫu nhiên từ danh sách
export function getRandomUrl() {
  const activeUrls = urlList.filter(item => item.active)
  if (activeUrls.length === 0) {
    return 'https://example.com'
  }
  const randomIndex = Math.floor(Math.random() * activeUrls.length)
  return activeUrls[randomIndex].url
}
