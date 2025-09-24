// Cấu hình URL redirect
export const redirectConfig = {
  // Thời gian delay trước khi redirect (milliseconds)
  delay: 100, // 100ms = 0.1 giây
  
  // Có hiển thị thông báo redirect không
  showNotification: false,
  
  // Thông báo hiển thị cho người dùng
  notificationMessage: '',
  
  // Có hiển thị nút "Chuyển ngay" không
  showSkipButton: true,
  
  // Text cho nút skip
  skipButtonText: 'Chuyển ngay',
  
  // Có hiển thị countdown không
  showCountdown: true,
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
    url: 'https://s.shopee.vn/8zw3h5XsET',
    active: true
  },
  {
    id: 3,
    url: 'https://s.shopee.vn/8zw3h5XsET', 
    active: true
  }
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
