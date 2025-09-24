'use client'

import { useState } from 'react'
import { redirectConfig, sampleUrls } from '../config/redirect'

export default function AdminPage() {
  const [config, setConfig] = useState(redirectConfig)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    // Trong thực tế, bạn có thể lưu vào localStorage hoặc API
    localStorage.setItem('redirectConfig', JSON.stringify(config))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleReset = () => {
    setConfig(redirectConfig)
  }

  const handleSampleUrl = (url: string) => {
    setConfig(prev => ({ ...prev, targetUrl: url }))
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '50px auto', 
      padding: '20px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>
        🔧 Cấu hình URL Redirect
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          URL đích:
        </label>
        <input
          type="url"
          value={config.targetUrl}
          onChange={(e) => setConfig(prev => ({ ...prev, targetUrl: e.target.value }))}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '16px'
          }}
          placeholder="https://example.com"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Thời gian delay (milliseconds):
        </label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="number"
            value={config.delay}
            onChange={(e) => setConfig(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
            style={{
              width: '150px',
              padding: '12px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '16px'
            }}
            min="0"
            max="30000"
            placeholder="3000"
          />
          <span style={{ color: '#6c757d', fontSize: '14px' }}>
            ({Math.round(config.delay / 1000 * 10) / 10}s)
          </span>
        </div>
        <div style={{ marginTop: '5px', fontSize: '12px', color: '#6c757d' }}>
          Gợi ý: 1000ms = 1s, 3000ms = 3s, 5000ms = 5s
        </div>
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { label: '0.5s', value: 500 },
            { label: '1s', value: 1000 },
            { label: '2s', value: 2000 },
            { label: '3s', value: 3000 },
            { label: '5s', value: 5000 },
            { label: '10s', value: 10000 }
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setConfig(prev => ({ ...prev, delay: value }))}
              style={{
                padding: '4px 8px',
                background: config.delay === value ? '#667eea' : '#f8f9fa',
                color: config.delay === value ? 'white' : '#6c757d',
                border: '1px solid #e9ecef',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="checkbox"
            checked={config.showNotification}
            onChange={(e) => setConfig(prev => ({ ...prev, showNotification: e.target.checked }))}
            style={{ marginRight: '10px' }}
          />
          Hiển thị thông báo redirect
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Thông báo:
        </label>
        <input
          type="text"
          value={config.notificationMessage}
          onChange={(e) => setConfig(prev => ({ ...prev, notificationMessage: e.target.value }))}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>URL mẫu:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {Object.entries(sampleUrls).map(([key, url]) => (
            <button
              key={key}
              onClick={() => handleSampleUrl(url)}
              style={{
                padding: '8px 16px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 24px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {isSaved ? '✅ Đã lưu!' : '💾 Lưu cấu hình'}
        </button>
        
        <button
          onClick={handleReset}
          style={{
            padding: '12px 24px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>📋 Cấu hình hiện tại:</h3>
        <pre style={{ 
          background: 'white', 
          padding: '15px', 
          borderRadius: '5px',
          overflow: 'auto',
          fontSize: '14px'
        }}>
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  )
}
