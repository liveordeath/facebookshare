import type { Metadata } from 'next'
import './globals.css'

// Dynamic metadata function
export async function generateMetadata(): Promise<Metadata> {
      let pageSettings = {
        title: ':) Muốn cuộc sống cân bằng hãy làm theo tips này',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&crop=center'
      }

  try {
    const response = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/config`, {
      cache: 'no-store'
    })
    if (response.ok) {
      const data = await response.json()
      if (data.pageSettings) {
        pageSettings = data.pageSettings
      }
    }
  } catch (error) {
    console.error('Error loading page settings:', error)
  }

  return {
    metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://facebookshare-roan.vercel.app'),
    title: pageSettings.title,
    description: 'Khám phá 4 bí quyết đơn giản để có cuộc sống cân bằng và hạnh phúc hơn. Từ skincare đến mindfulness, tìm hiểu cách chăm sóc bản thân toàn diện.',
    keywords: 'tips cuộc sống, cân bằng, skincare, mindfulness, self-care, candid',
    authors: [{ name: 'Candid Skincare' }],
    openGraph: {
      title: pageSettings.title,
      description: 'Khám phá 4 bí quyết đơn giản để có cuộc sống cân bằng và hạnh phúc hơn. Từ skincare đến mindfulness, tìm hiểu cách chăm sóc bản thân toàn diện.',
      url: '/',
      siteName: 'Candid Skincare',
      images: [
        {
          url: pageSettings.image,
          width: 1200,
          height: 630,
          alt: 'Hình ảnh demo',
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSettings.title,
      description: 'Khám phá 4 bí quyết đơn giản để có cuộc sống cân bằng và hạnh phúc hơn.',
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