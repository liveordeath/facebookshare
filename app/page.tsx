import ImageWithFallback from './components/ImageWithFallback'
import RedirectManager from './components/RedirectManager'

export default async function Home() {
  // Load page settings from API
      let pageSettings = {
        title: ':) Muốn cuộc sống cân bằng hãy làm theo tips này',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&crop=center'
      }

  try {
    const response = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/config?t=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    if (response.ok) {
      const data = await response.json()
      console.log('Page: Fetched pageSettings from admin:', data.pageSettings)
      if (data.pageSettings) {
        pageSettings = data.pageSettings
        console.log('Page: Updated pageSettings to:', pageSettings)
      }
    } else {
      console.log('Page: API response not ok:', response.status)
    }
  } catch (error) {
    console.error('Page: Error loading page settings:', error)
  }
  return (
    <>
      <RedirectManager />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '3px solid #667eea',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ 
            color: '#667eea', 
            fontSize: '18px', 
            fontWeight: 'bold',
            margin: 0
          }}>
            Đang tải...
          </p>
        </div>
        
      </div>
    </>
  )
}
