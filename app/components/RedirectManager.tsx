'use client'

import { useEffect, useState } from 'react'
import { redirectConfig, urlList } from '../config/redirect'
import RedirectHandler from './RedirectHandler'

export default function RedirectManager() {
  const [config, setConfig] = useState(redirectConfig)
  const [shouldShowRedirect, setShouldShowRedirect] = useState(false)

  useEffect(() => {
    // Load config từ API
    const loadConfigAndRedirect = async () => {
      try {
        const response = await fetch('/api/config')
        let configToUse = redirectConfig
        let urlsToUse = urlList
        
        if (response.ok) {
          const data = await response.json()
          configToUse = data.config
          urlsToUse = data.urls
        }
        
        // Lấy URL ngẫu nhiên từ danh sách active
        const activeUrls = urlsToUse.filter((item: any) => item.active)
        let randomUrl = 'https://example.com'
        
        if (activeUrls.length > 0) {
          const randomIndex = Math.floor(Math.random() * activeUrls.length)
          randomUrl = activeUrls[randomIndex].url
        }
        
        // Lưu URL ngẫu nhiên vào localStorage để RedirectHandler có thể sử dụng
        localStorage.setItem('randomUrl', randomUrl)
        
        // Thêm targetUrl vào config
        const configWithTarget = { ...configToUse, targetUrl: randomUrl }
        setConfig(configWithTarget)
        
        if (configWithTarget.showNotification) {
          // Hiển thị màn hình redirect với thông báo
          setShouldShowRedirect(true)
        } else {
          // Redirect ngay lập tức mà không hiển thị gì
          setTimeout(() => {
            window.location.href = randomUrl
          }, configWithTarget.delay)
        }
      } catch (error) {
        console.error('Error loading config:', error)
        // Fallback: sử dụng config mặc định
        const activeUrls = urlList.filter((item: any) => item.active)
        let randomUrl = 'https://example.com'
        
        if (activeUrls.length > 0) {
          const randomIndex = Math.floor(Math.random() * activeUrls.length)
          randomUrl = activeUrls[randomIndex].url
        }
        
        setTimeout(() => {
          window.location.href = randomUrl
        }, redirectConfig.delay)
      }
    }
    
    loadConfigAndRedirect()
  }, [])

  if (shouldShowRedirect) {
    return <RedirectHandler />
  }

  return null
}
