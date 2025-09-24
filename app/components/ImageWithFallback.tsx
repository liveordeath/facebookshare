'use client'

import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  style?: React.CSSProperties
  fallbackText?: string
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  style, 
  fallbackText = 'Hình ảnh demo' 
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div style={{ 
        ...style, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        color: 'white',
        fontSize: '1.2em',
        fontWeight: 'bold',
        borderRadius: '10px'
      }}>
        {fallbackText}
      </div>
    )
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      style={style}
      onError={() => setHasError(true)}
    />
  )
}
