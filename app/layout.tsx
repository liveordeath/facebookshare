import type { Metadata } from 'next'
import './globals.css'

// Dynamic metadata function
export async function generateMetadata(): Promise<Metadata> {
      let pageSettings = {
        title: '.',
        image: 'https://raw.githubusercontent.com/liveordeath/facebookshare/refs/heads/main/public/images/IMG_7488.jpg' // ← Thay bằng URL Imgur của bạn
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
      url: 'test',
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
      site: '@candid_skincare',
      creator: '@candid_skincare',
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
    other: {
      'og:site_name': 'Candid Skincare',
      'og:type': 'website',
      'og:locale': 'vi_VN',
      'twitter:site': '@candid_skincare',
      'twitter:creator': '@candid_skincare',
      'twitter:domain': 'candid-skincare.com',
      'application-name': 'Candid Skincare',
      'apple-mobile-web-app-title': 'Candid Skincare',
      'msapplication-TileColor': '#667eea',
      'theme-color': '#667eea',
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