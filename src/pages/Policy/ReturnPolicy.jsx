import React from 'react'
import { Link } from 'react-router-dom'

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">Chính sách đổi trả hàng</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Điều kiện đổi trả</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng</li>
                <li>Còn đầy đủ bao bì, nhãn mác, tem niêm phong của nhà sản xuất</li>
                <li>Có hóa đơn mua hàng hoặc email xác nhận đơn hàng</li>
                <li>Thời gian yêu cầu đổi trả trong vòng 7 ngày kể từ ngày nhận hàng</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Trường hợp được đổi trả</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Sản phẩm bị lỗi do nhà sản xuất</li>
                <li>Sản phẩm không đúng với mô tả trên website</li>
                <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
                <li>Sản phẩm hết hạn sử dụng</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Quy trình đổi trả</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                <li>Liên hệ bộ phận chăm sóc khách hàng qua hotline hoặc email</li>
                <li>Cung cấp thông tin đơn hàng và lý do đổi trả</li>
                <li>Chuẩn bị sản phẩm theo hướng dẫn của nhân viên</li>
                <li>Nhân viên sẽ đến nhận hàng hoặc hướng dẫn gửi hàng về kho</li>
                <li>Kiểm tra và xác nhận đổi trả trong vòng 3-5 ngày làm việc</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Chi phí đổi trả</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Miễn phí đổi trả đối với sản phẩm lỗi do nhà sản xuất</li>
                <li>Khách hàng chịu phí vận chuyển đối với trường hợp đổi trả do không ưng ý</li>
                <li>Hoàn tiền qua tài khoản ngân hàng hoặc ví điện tử trong vòng 7 ngày làm việc</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Liên hệ</h2>
              <p className="text-gray-600">
                Mọi thắc mắc về chính sách đổi trả, vui lòng liên hệ:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-2">
                <li>Hotline: 1900 1234</li>
                <li>Email: support@milkstore.com</li>
                <li>Thời gian làm việc: 8:00 - 17:00 từ Thứ 2 đến Thứ 6</li>
              </ul>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnPolicy 