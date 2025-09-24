// Cấu hình URL redirect
export const redirectConfig = {
  // URL đích mà bạn muốn redirect đến
  targetUrl: 'https://candid.com.vn',
  
  // Thời gian delay trước khi redirect (milliseconds)
  delay: 3000, // 3000ms = 3 giây
  
  // Có hiển thị thông báo redirect không
  showNotification: true,
  
  // Thông báo hiển thị cho người dùng
  notificationMessage: 'Đang chuyển hướng đến Candid Skincare...',
  
  // Có hiển thị nút "Chuyển ngay" không
  showSkipButton: true,
  
  // Text cho nút skip
  skipButtonText: 'Chuyển ngay',
  
  // Có hiển thị countdown không
  showCountdown: true,
}

// Các URL mẫu khác bạn có thể sử dụng:
export const sampleUrls = {
  facebook: 'https://facebook.com/candid',
  shopee: 'https://shopee.vn/candid',
  tiktok: 'https://tiktok.com/@candid',
}
