import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muốn cuộc sống cân bằng hãy làm theo tips này',
  description: 'Khám phá 4 bí quyết đơn giản để có cuộc sống cân bằng và hạnh phúc hơn. Từ skincare đến mindfulness, tìm hiểu cách chăm sóc bản thân toàn diện.',
  keywords: 'tips cuộc sống, cân bằng, skincare, mindfulness, self-care, candid',
  authors: [{ name: 'Candid Skincare' }],
    openGraph: {
      title: ':) Muốn cuộc sống cân bằng hãy làm theo tips này',
      description: 'Khám phá 4 bí quyết đơn giản để có cuộc sống cân bằng và hạnh phúc hơn. Từ skincare đến mindfulness, tìm hiểu cách chăm sóc bản thân toàn diện.',
      url: 'https://example.com/',
      siteName: 'Candid Skincare',
      images: [
        {
          url: '/images/image.png',
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
      title: 'Muốn cuộc sống cân bằng hãy làm theo tips này nhé',
      description: 'Khám phá 4 bí quyết đơn giản để có cuộc sống cân bằng và hạnh phúc hơn.',
      images: ['/images/image.png'],
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
