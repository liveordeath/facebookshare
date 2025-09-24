'use client'

import { useEffect, useState } from 'react'
import { redirectConfig, urlList } from '../config/redirect'
import RedirectHandler from './RedirectHandler'

export default function RedirectManager() {
  const [config, setConfig] = useState(redirectConfig)
  const [shouldShowRedirect, setShouldShowRedirect] = useState(false)

  useEffect(() => {
    // Đọc danh sách URLs từ localStorage
    const savedUrls = localStorage.getItem('urlList')
    let urlsToUse = urlList
    
    if (savedUrls) {
      urlsToUse = JSON.parse(savedUrls)
    }
    
    // Lấy URL ngẫu nhiên từ danh sách active
    const activeUrls = urlsToUse.filter((item: any) => item.active)
    let randomUrl = 'https://example.com'
    
    if (activeUrls.length > 0) {
      const randomIndex = Math.floor(Math.random() * activeUrls.length)
      randomUrl = activeUrls[randomIndex].url
    }
    
    // Đọc cấu hình từ localStorage
    const savedConfig = localStorage.getItem('redirectConfig')
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig)
      setConfig(parsedConfig)
      
      if (parsedConfig.showNotification) {
        // Hiển thị màn hình redirect với thông báo
        setShouldShowRedirect(true)
      } else {
        // Redirect ngay lập tức mà không hiển thị gì
        setTimeout(() => {
          window.location.href = randomUrl
        }, parsedConfig.delay)
      }
    } else {
      // Sử dụng config mặc định
      if (redirectConfig.showNotification) {
        setShouldShowRedirect(true)
      } else {
        setTimeout(() => {
          window.location.href = randomUrl
        }, redirectConfig.delay)
      }
    }
  }, [])

  if (shouldShowRedirect) {
    return <RedirectHandler />
  }

  return null
}
