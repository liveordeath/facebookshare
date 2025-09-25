'use client'

import { useEffect, useState } from 'react'
import { redirectConfig, urlList } from '../config/redirect'
import RedirectHandler from './RedirectHandler'

export default function RedirectManager() {
  const [config, setConfig] = useState(redirectConfig)
  const [shouldShowRedirect, setShouldShowRedirect] = useState(false)

  useEffect(() => {
    // Track page visit
    const trackPageVisit = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type: 'page' }),
        })
      } catch (error) {
        console.error('Error tracking page visit:', error)
      }
    }

    // Load config từ API
    const loadConfigAndRedirect = async () => {
      try {
        // Track page visit
        await trackPageVisit()

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
          // Track redirect visit
          const trackRedirect = async () => {
            try {
              await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'redirect', url: randomUrl }),
              })
            } catch (error) {
              console.error('Error tracking redirect:', error)
            }
          }
          
          // Redirect ngay lập tức mà không hiển thị gì
          setTimeout(async () => {
            await trackRedirect()
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
        
        setTimeout(async () => {
          // Track redirect visit for fallback
          try {
            await fetch('/api/analytics', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ type: 'redirect', url: randomUrl }),
            })
          } catch (error) {
            console.error('Error tracking redirect:', error)
          }
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
