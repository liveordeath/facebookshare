'use client'

import { useEffect, useState } from 'react'
import { redirectConfig } from '../config/redirect'

export default function RedirectHandler() {
  const [config, setConfig] = useState({...redirectConfig, targetUrl: ''})
  const [countdown, setCountdown] = useState(Math.ceil(redirectConfig.delay / 1000))
  const [countdownMs, setCountdownMs] = useState(redirectConfig.delay)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Đọc cấu hình từ localStorage nếu có
    const savedConfig = localStorage.getItem('redirectConfig')
    const randomUrl = localStorage.getItem('randomUrl')
    
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig)
      // Đảm bảo có targetUrl
      if (!parsedConfig.targetUrl && randomUrl) {
        parsedConfig.targetUrl = randomUrl
      }
      setConfig(parsedConfig)
      setCountdown(Math.ceil(parsedConfig.delay / 1000))
      setCountdownMs(parsedConfig.delay)
      
      // Nếu không hiển thị thông báo, redirect ngay lập tức
      if (!parsedConfig.showNotification) {
        setTimeout(() => {
          window.location.href = parsedConfig.targetUrl || randomUrl || 'https://example.com'
        }, parsedConfig.delay)
        return
      }
    } else if (randomUrl) {
      // Nếu không có config nhưng có randomUrl, sử dụng config mặc định
      const defaultConfig = { ...redirectConfig, targetUrl: randomUrl }
      setConfig(defaultConfig)
      setCountdown(Math.ceil(redirectConfig.delay / 1000))
      setCountdownMs(redirectConfig.delay)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownMs(prev => {
        if (prev <= 1000) {
          setIsRedirecting(true)
          const targetUrl = config.targetUrl || localStorage.getItem('randomUrl') || 'https://example.com'
          
          // Track redirect visit
          const trackRedirect = async () => {
            try {
              await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'redirect', url: targetUrl }),
              })
            } catch (error) {
              console.error('Error tracking redirect:', error)
            }
          }
          
          trackRedirect().then(() => {
            window.location.href = targetUrl
          })
          return 0
        }
        return prev - 1000
      })
      setCountdown(prev => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [config])

  const handleSkip = async () => {
    setIsRedirecting(true)
    const targetUrl = config.targetUrl || localStorage.getItem('randomUrl') || 'https://example.com'
    
    // Track redirect visit
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'redirect', url: targetUrl }),
      })
    } catch (error) {
      console.error('Error tracking redirect:', error)
    }
    
    window.location.href = targetUrl
  }

  // Nếu không hiển thị thông báo, không render gì cả
  if (!config.showNotification) {
    return null
  }

  if (isRedirecting) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        color: 'white',
        fontSize: '1.2em'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid white',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Đang chuyển hướng...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white',
      fontSize: '1.2em'
    }}>
      <div style={{ 
        textAlign: 'center', 
        background: 'rgba(255,255,255,0.1)',
        padding: '40px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em' }}>
          {config.notificationMessage}
        </h2>
        
        {config.showCountdown && (
          <div style={{ 
            fontSize: '2em', 
            fontWeight: 'bold', 
            margin: '20px 0',
            color: '#ffd700'
          }}>
            {countdown}.{Math.floor((countdownMs % 1000) / 100)}
          </div>
        )}
        
        {config.showSkipButton && (
          <button
            onClick={handleSkip}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid white',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '20px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = '#667eea'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = 'white'
            }}
          >
            {config.skipButtonText}
          </button>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
