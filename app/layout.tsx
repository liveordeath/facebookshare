import type { Metadata } from 'next'
import './globals.css'

// Dynamic metadata function
export async function generateMetadata(): Promise<Metadata> {
      let pageSettings = {
        title: '.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1000&fit=crop&crop=center'
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
      console.log('Layout: Fetched pageSettings from admin:', data.pageSettings)
      if (data.pageSettings) {
        pageSettings = data.pageSettings
        console.log('Layout: Updated pageSettings to:', pageSettings)
      }
    } else {
      console.log('Layout: API response not ok:', response.status)
    }
  } catch (error) {
    console.error('Layout: Error loading page settings:', error)
  }

  return {
    metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://facebookshare-roan.vercel.app'),
    title: pageSettings.title,
    description: '',
    keywords: 'tips cuộc sống, cân bằng, skincare, mindfulness, self-care, candid',
    authors: [{ name: 'Candid Skincare' }],
    openGraph: {
      title: pageSettings.title,
      description: '',
      url: '/',
      siteName: 'Candid Skincare',
      images: [
        {
          url: pageSettings.image,
          width: 900,
          height: 1200,
          alt: 'Hình ảnh demo',
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSettings.title,
      description: '',
      images: [pageSettings.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}