import ImageWithFallback from './components/ImageWithFallback'
import RedirectManager from './components/RedirectManager'

export default function Home() {
  return (
    <>
      <RedirectManager />
      <div className="container">
      <div className="header">
        <h1>4 Tips Cho Cuộc Sống Cân Bằng Bằng</h1>
        <p className="subtitle">Khám phá bí quyết đơn giản để có cuộc sống hạnh phúc và cân bằng hơn</p>
      </div>
      
      <div className="content">
        <div className="demo-image">
          <ImageWithFallback 
            src={process.env.NODE_ENV === 'production' ? '/facebookshare/images/image.png' : '/images/image.png'} 
            alt="4 Tips Cho Cuộc Sống Cân Bằng" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
            fallbackText="4 Tips Cho Cuộc Sống Cân Bằng"
          />
        </div>

        <p>Trong cuộc sống hiện đại bận rộn, việc duy trì sự cân bằng giữa công việc, gia đình và bản thân là một thách thức lớn. Tại Candid, chúng tôi tin rằng một cuộc sống cân bằng bắt đầu từ việc chăm sóc bản thân một cách toàn diện. Dưới đây là 4 tips đơn giản nhưng hiệu quả để bạn có thể áp dụng ngay hôm nay.</p>
        
        <div className="meta-info">
          <h3>🌟 Tip 1: Thiết lập Routine Skincare Đơn Giản</h3>
          <p>Một làn da khỏe mạnh là nền tảng của sự tự tin. Không cần quá phức tạp, chỉ cần 3 bước cơ bản:</p>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li><strong>Làm sạch:</strong> Sử dụng sữa rửa mặt dịu nhẹ mỗi sáng và tối</li>
            <li><strong>Dưỡng ẩm:</strong> Thoa kem dưỡng ẩm phù hợp với loại da</li>
            <li><strong>Bảo vệ:</strong> Luôn sử dụng kem chống nắng SPF 30+ vào ban ngày</li>
          </ul>
          <p>Routine đơn giản này chỉ mất 5 phút mỗi ngày nhưng sẽ mang lại hiệu quả lâu dài cho làn da của bạn.</p>
        </div>

        <div className="meta-info">
          <h3>🧘‍♀️ Tip 2: Thực Hành Mindfulness Mỗi Ngày</h3>
          <p>Mindfulness không chỉ là thiền định, mà là cách bạn sống trong hiện tại một cách có ý thức:</p>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li><strong>Hít thở sâu:</strong> Dành 5 phút mỗi sáng để hít thở sâu và tập trung</li>
            <li><strong>Ăn uống có ý thức:</strong> Thưởng thức từng miếng ăn, không vừa ăn vừa xem điện thoại</li>
            <li><strong>Đi bộ thiền:</strong> Đi bộ chậm rãi và quan sát xung quanh</li>
          </ul>
          <p>Những hoạt động nhỏ này giúp giảm stress và tăng cường sự tập trung trong công việc.</p>
        </div>

        <div className="meta-info">
          <h3>💤 Tip 3: Ưu Tiên Giấc Ngủ Chất Lượng</h3>
          <p>Giấc ngủ là thời gian cơ thể tự phục hồi và tái tạo. Để có giấc ngủ ngon:</p>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li><strong>Thời gian cố định:</strong> Đi ngủ và thức dậy cùng một giờ mỗi ngày</li>
            <li><strong>Không gian thoải mái:</strong> Phòng ngủ tối, mát mẻ và yên tĩnh</li>
            <li><strong>Tránh màn hình:</strong> Tắt điện thoại và TV 1 giờ trước khi ngủ</li>
            <li><strong>Routine trước ngủ:</strong> Đọc sách, nghe nhạc nhẹ hoặc thiền</li>
          </ul>
          <p>Một giấc ngủ ngon 7-8 tiếng sẽ giúp bạn tỉnh táo và năng động hơn vào ngày hôm sau.</p>
        </div>

        <div className="meta-info">
          <h3>🎯 Tip 4: Đặt Ranh Giới Rõ Ràng</h3>
          <p>Học cách nói "không" và đặt ranh giới là kỹ năng quan trọng để bảo vệ năng lượng của bạn:</p>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li><strong>Thời gian làm việc:</strong> Tắt thông báo sau giờ làm việc</li>
            <li><strong>Nghỉ ngơi:</strong> Dành ít nhất 1 ngày cuối tuần cho bản thân</li>
            <li><strong>Ưu tiên:</strong> Lập danh sách việc quan trọng và tập trung vào đó</li>
            <li><strong>Giao tiếp:</strong> Thể hiện nhu cầu của bạn một cách rõ ràng</li>
          </ul>
          <p>Ranh giới rõ ràng giúp bạn tránh kiệt sức và duy trì năng lượng tích cực.</p>
        </div>

        <div className="nextjs-info">
          <h3>💡 Lời Khuyên Từ Candid</h3>
          <p>Cuộc sống cân bằng không phải là đích đến mà là một hành trình. Hãy bắt đầu với những thay đổi nhỏ và kiên trì thực hiện. Tại Candid, chúng tôi tin rằng skincare đơn giản và hiệu quả là bước đầu tiên để bạn cảm thấy tự tin và hạnh phúc hơn.</p>
          <p><strong>Nhớ rằng:</strong> Bạn xứng đáng được chăm sóc và yêu thương. Hãy dành thời gian cho bản thân mỗi ngày, dù chỉ là 10 phút.</p>
        </div>

      </div>
      
      <div className="footer">
        <p>Chia sẻ bài viết này với bạn bè và bắt đầu hành trình cân bằng cuộc sống ngay hôm nay!</p>
        <button className="btn">Chia sẻ</button>
        <button className="btn">Khám phá Candid</button>
      </div>
    </div>
    </>
  )
}
