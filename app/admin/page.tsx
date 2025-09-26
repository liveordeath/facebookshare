'use client'

import { useState, useEffect } from 'react'
import { redirectConfig, urlList } from '../config/redirect'

export default function AdminPage() {
  const [config, setConfig] = useState(redirectConfig)
  const [urls, setUrls] = useState(urlList)
  const [isSaved, setIsSaved] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    todayVisits: 0,
    dailyVisits: {},
    urlVisits: {},
    lastReset: ''
  })

  useEffect(() => {
    // Load config từ API
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/config')
        if (response.ok) {
          const data = await response.json()
          setConfig(data.config)
          setUrls(data.urls)
        }
      } catch (error) {
        console.error('Error loading config:', error)
      }
    }

    // Load analytics từ API
    const loadAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics')
        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        }
      } catch (error) {
        console.error('Error loading analytics:', error)
      }
    }

    loadConfig()
    loadAnalytics()
  }, [])

  const handleSave = async () => {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config, urls }),
      })
      
      if (response.ok) {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
      } else {
        console.error('Failed to save config')
      }
    } catch (error) {
      console.error('Error saving config:', error)
    }
  }

  const handleReset = () => {
    setConfig(redirectConfig)
    setUrls(urlList)
  }

  const handleAddUrl = () => {
    if (newUrl) {
      const newId = Math.max(...urls.map(u => u.id), 0) + 1
      setUrls([...urls, { id: newId, url: newUrl, active: true }])
      setNewUrl('')
    }
  }

  const handleDeleteUrl = (id: number) => {
    setUrls(urls.filter(url => url.id !== id))
  }

  const handleToggleUrl = (id: number) => {
    setUrls(urls.map(url => 
      url.id === id ? { ...url, active: !url.active } : url
    ))
  }

  const handleEditUrl = (id: number, value: string) => {
    setUrls(urls.map(url => 
      url.id === id ? { ...url, url: value } : url
    ))
  }

  const handleResetAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics', {
        method: 'DELETE'
      })
      if (response.ok) {
        // Reload analytics
        const analyticsResponse = await fetch('/api/analytics')
        if (analyticsResponse.ok) {
          const data = await analyticsResponse.json()
          setAnalytics(data)
        }
      }
    } catch (error) {
      console.error('Error resetting analytics:', error)
    }
  }


  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '30px 40px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            📊 Analytics Dashboard
          </h1>
          <p style={{ 
            margin: '10px 0 0 0', 
            fontSize: '1.1rem', 
            opacity: 0.9 
          }}>
            Quản lý Random Redirect URLs & Thống kê truy cập
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '40px' }}>

          {/* Analytics Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '25px', 
            marginBottom: '40px' 
          }}>
            {/* Total Visits Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '30px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📈</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
                {analytics.totalVisits}
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Tổng lượt truy cập</div>
            </div>

            {/* Today Visits Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              padding: '30px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(240, 147, 251, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔥</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
                {analytics.todayVisits}
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Hôm nay</div>
            </div>

            {/* Active URLs Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '30px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(79, 172, 254, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔗</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
                {urls.filter(u => u.active).length}
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>URLs hoạt động</div>
            </div>
          </div>

          {/* Top URLs Section */}
          {Object.keys(analytics.urlVisits).length > 0 && (
            <div style={{ 
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '30px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ 
                color: '#2c3e50', 
                marginBottom: '20px',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                🏆 Top URLs được truy cập nhiều nhất
              </h3>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {Object.entries(analytics.urlVisits)
                  .sort(([,a], [,b]) => (b as number) - (a as number))
                  .slice(0, 10)
                  .map(([url, visits], index) => (
                    <div key={url} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px 20px',
                      background: index % 2 === 0 ? '#f8f9fa' : 'white',
                      borderRadius: '10px',
                      marginBottom: '8px',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          marginRight: '15px'
                        }}>
                          {index + 1}
                        </div>
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#495057', 
                          wordBreak: 'break-all',
                          flex: 1
                        }}>
                          {url}
                        </span>
                      </div>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        color: 'white',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        minWidth: '40px',
                        textAlign: 'center'
                      }}>
                        {visits as number}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            <button
              onClick={handleResetAnalytics}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 5px 15px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.3)'
              }}
            >
              🗑️ Reset thống kê
            </button>
          </div>


          {/* Add New URL Section */}
          <div style={{ 
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              marginBottom: '20px',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              ➕ Thêm URL mới
            </h3>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <input
                type="url"
                placeholder="https://example.com"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                style={{
                  flex: 1,
                  padding: '15px 20px',
                  border: '2px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8f9fa'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea'
                  e.target.style.background = 'white'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef'
                  e.target.style.background = '#f8f9fa'
                }}
              />
              <button
                onClick={handleAddUrl}
                style={{
                  padding: '15px 30px',
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  boxShadow: '0 5px 15px rgba(40, 167, 69, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.3)'
                }}
              >
                ➕ Thêm
              </button>
            </div>
          </div>

          {/* URLs List Section */}
          <div style={{ 
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              marginBottom: '20px',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              📋 Danh sách URLs ({urls.filter(u => u.active).length} active)
            </h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {urls.map((url, index) => (
                <div key={url.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '20px',
                  marginBottom: '15px',
                  background: url.active 
                    ? 'linear-gradient(135deg, #e8f5e8 0%, #f0fff4 100%)' 
                    : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                  border: `2px solid ${url.active ? '#28a745' : '#e9ecef'}`,
                  borderRadius: '15px',
                  boxShadow: url.active 
                    ? '0 5px 15px rgba(40, 167, 69, 0.2)' 
                    : '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={url.active}
                      onChange={() => handleToggleUrl(url.id)}
                      style={{ 
                        transform: 'scale(1.3)',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: url.active 
                        ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' 
                        : 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <input
                    type="url"
                    value={url.url}
                    onChange={(e) => handleEditUrl(url.id, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: url.active ? 'white' : '#f8f9fa',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea'
                      e.target.style.background = 'white'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e9ecef'
                      e.target.style.background = url.active ? 'white' : '#f8f9fa'
                    }}
                  />
                  
                  <button
                    onClick={() => handleDeleteUrl(url.id)}
                    style={{
                      padding: '12px 16px',
                      background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      boxShadow: '0 3px 10px rgba(220, 53, 69, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(220, 53, 69, 0.4)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(220, 53, 69, 0.3)'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration Section */}
          <div style={{ 
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              marginBottom: '25px',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              ⚙️ Cấu hình hệ thống
            </h3>

            {/* Delay Configuration */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '15px', 
                fontWeight: '600',
                fontSize: '16px',
                color: '#495057'
              }}>
                ⏱️ Thời gian delay (milliseconds):
              </label>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                <input
                  type="number"
                  value={config.delay}
                  onChange={(e) => setConfig(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
                  style={{
                    width: '200px',
                    padding: '15px 20px',
                    border: '2px solid #e9ecef',
                    borderRadius: '25px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    background: '#f8f9fa'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea'
                    e.target.style.background = 'white'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e9ecef'
                    e.target.style.background = '#f8f9fa'
                  }}
                  min="0"
                  max="30000"
                  placeholder="3000"
                />
                <div style={{ 
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {Math.round(config.delay / 1000 * 10) / 10}s
                </div>
              </div>
              <div style={{ marginBottom: '15px', fontSize: '14px', color: '#6c757d' }}>
                💡 Gợi ý: 1000ms = 1s, 3000ms = 3s, 5000ms = 5s
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
                      padding: '8px 16px',
                      background: config.delay === value 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                      color: config.delay === value ? 'white' : '#6c757d',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: config.delay === value 
                        ? '0 3px 10px rgba(102, 126, 234, 0.3)' 
                        : '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => {
                      if (config.delay !== value) {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (config.delay !== value) {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Configuration */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '15px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#495057'
              }}>
                <input
                  type="checkbox"
                  checked={config.showNotification}
                  onChange={(e) => setConfig(prev => ({ ...prev, showNotification: e.target.checked }))}
                  style={{ 
                    marginRight: '15px',
                    transform: 'scale(1.3)',
                    cursor: 'pointer'
                  }}
                />
                🔔 Hiển thị thông báo redirect
              </label>
            </div>

            {/* Notification Message */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '15px', 
                fontWeight: '600',
                fontSize: '16px',
                color: '#495057'
              }}>
                💬 Thông báo:
              </label>
              <input
                type="text"
                value={config.notificationMessage}
                onChange={(e) => setConfig(prev => ({ ...prev, notificationMessage: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  border: '2px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: '#f8f9fa'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea'
                  e.target.style.background = 'white'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef'
                  e.target.style.background = '#f8f9fa'
                }}
                placeholder="Nhập thông báo hiển thị cho người dùng..."
              />
            </div>
          </div>


          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            <button
              onClick={handleSave}
              style={{
                padding: '15px 30px',
                background: isSaved 
                  ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: isSaved 
                  ? '0 5px 15px rgba(40, 167, 69, 0.3)' 
                  : '0 5px 15px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = isSaved 
                  ? '0 8px 25px rgba(40, 167, 69, 0.4)' 
                  : '0 8px 25px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = isSaved 
                  ? '0 5px 15px rgba(40, 167, 69, 0.3)' 
                  : '0 5px 15px rgba(102, 126, 234, 0.3)'
              }}
            >
              {isSaved ? '✅ Đã lưu!' : '💾 Lưu cấu hình'}
            </button>
            
            <button
              onClick={handleReset}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 5px 15px rgba(108, 117, 125, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(108, 117, 125, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(108, 117, 125, 0.3)'
              }}
            >
              🔄 Reset
            </button>

            <button
              onClick={() => window.open('/', '_blank')}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 5px 15px rgba(0, 123, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)'
              }}
            >
              👁️ Xem trang public
            </button>
          </div>

          {/* Current Configuration */}
          <div style={{ 
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ 
              color: '#2c3e50', 
              marginBottom: '20px',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              📋 Cấu hình hiện tại
            </h3>
            <pre style={{ 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
              padding: '20px', 
              borderRadius: '10px',
              overflow: 'auto',
              fontSize: '14px',
              border: '1px solid #e9ecef',
              margin: 0
            }}>
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
