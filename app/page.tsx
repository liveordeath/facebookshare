export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>Tiêu đề bài viết</h1>
        <p className="subtitle">Mô tả ngắn gọn</p>
      </div>
      
      <div className="content">
        <p>Đây là trang web demo được xây dựng với Next.js và các meta tags Open Graph được cấu hình sẵn. Các meta tags này sẽ giúp hiển thị thông tin đẹp mắt khi chia sẻ link trên các mạng xã hội như Facebook, Twitter, LinkedIn, v.v.</p>
        
        <div className="demo-image">
          Hình ảnh demo
        </div>
        
        <div className="nextjs-info">
          <h3>🚀 Next.js Features:</h3>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li>Server-Side Rendering (SSR)</li>
            <li>Static Site Generation (SSG)</li>
            <li>Automatic Code Splitting</li>
            <li>Built-in CSS Support</li>
            <li>API Routes</li>
            <li>Image Optimization</li>
          </ul>
        </div>
        
        <div className="meta-info">
          <h3>🔗 Các Meta Tags Open Graph đã được cấu hình:</h3>
          <div className="meta-tag">&lt;meta property="og:title" content="Tiêu đề bài viết"&gt;</div>
          <div className="meta-tag">&lt;meta property="og:description" content="Mô tả ngắn gọn"&gt;</div>
          <div className="meta-tag">&lt;meta property="og:image" content="https://example.com/image.jpg"&gt;</div>
          <div className="meta-tag">&lt;meta property="og:url" content="https://example.com/"&gt;</div>
        </div>
        
        <p>Bạn có thể tùy chỉnh các giá trị trong file <code>app/layout.tsx</code> để phù hợp với nội dung thực tế của trang web. Khi chia sẻ link này trên Facebook hoặc các mạng xã hội khác, chúng sẽ hiển thị thông tin theo các meta tags đã cấu hình.</p>
        
        <div className="meta-info">
          <h3>📝 Cách tùy chỉnh Meta Tags:</h3>
          <p>Mở file <code>app/layout.tsx</code> và chỉnh sửa các giá trị trong object <code>metadata</code>:</p>
          <div className="meta-tag">
            export const metadata: Metadata = {'{'}
            <br />
            &nbsp;&nbsp;title: 'Tiêu đề của bạn',
            <br />
            &nbsp;&nbsp;description: 'Mô tả của bạn',
            <br />
            &nbsp;&nbsp;openGraph: {'{'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;title: 'Tiêu đề Open Graph',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;description: 'Mô tả Open Graph',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;url: 'https://your-domain.com',
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;images: ['https://your-image.jpg']
            <br />
            &nbsp;&nbsp;{'}'}
            <br />
            {'}'}
          </div>
        </div>
      </div>
      
      <div className="footer">
        <p>Trang web demo với Next.js và Open Graph Meta Tags</p>
        <button className="btn">Chia sẻ</button>
        <button className="btn">Liên hệ</button>
      </div>
    </div>
  )
}
