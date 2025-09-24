import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tiêu đề bài viết',
  description: 'Mô tả ngắn gọn',
  keywords: 'demo, website, open graph, nextjs',
  authors: [{ name: 'Demo Author' }],
  openGraph: {
    title: 'Tiêu đề bài viết',
    description: 'Mô tả ngắn gọn',
    url: 'https://example.com/',
    siteName: 'Website Demo',
    images: [
      {
        url: 'https://example.com/image.jpg',
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
    title: 'Tiêu đề bài viết',
    description: 'Mô tả ngắn gọn',
    images: ['https://example.com/image.jpg'],
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
