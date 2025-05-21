import React from 'react'

const PaymentMethods = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hình Thức Thanh Toán</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp nhiều phương thức thanh toán an toàn và thuận tiện cho khách hàng.
            Hãy lựa chọn hình thức phù hợp nhất với nhu cầu của bạn.
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl bg-white p-8 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Thanh toán trực tuyến</h2>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thanh toán nhanh chóng và an toàn</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Được bảo mật theo tiêu chuẩn quốc tế</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Nhận xác nhận thanh toán ngay lập tức</span>
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 mb-3">Chúng tôi chấp nhận:</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white p-2 rounded border">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" viewBox="0 0 24 24" fill="#172B85">
                          <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.1,9,20.8v-1.6c0-0.3-0.3-0.6-0.6-0.6H8.2c-1.9,0-3.4-1.5-3.4-3.4c0-0.8,0.3-1.5,0.8-2.2C5.9,12.5,6,12.4,6,12.2v-0.8c0-0.3-0.2-0.6-0.5-0.6c-1.3,0-2.4,1.1-2.4,2.4v9.3c0,0.3,0.3,0.6,0.6,0.6h9.6c0.3,0,0.6-0.3,0.6-0.6V4.8C14,2.4,12.6,1,10.9,2.1z"></path>
                          <path d="M18.6,6.6C19.4,7.3,20,8.4,20,9.6c0,1.9-1.1,3.4-2.7,4.3c-0.4,0.2-0.7,0.6-0.7,1v2.7c0,0.3,0.3,0.6,0.6,0.6h0.8c0.3,0,0.6-0.3,0.6-0.6V20c0-0.3,0.2-0.6,0.5-0.6c1.6-0.3,2.9-1.8,2.9-3.6c0-1.7-1.2-3.2-2.9-3.6c-0.3,0-0.5-0.3-0.5-0.6v-0.8c0-0.3,0.2-0.6,0.5-0.6c1.1,0,2-0.9,2-2c0-1-0.9-1.9-1.9-2l-0.1,0c-0.3,0-0.6-0.2-0.6-0.6V5.4c0-0.3,0.3-0.6,0.6-0.6h0.8c0.3,0,0.6-0.3,0.6-0.6V4.8C19.4,4.3,19.1,4,18.8,4h-1.6c-1.1,0-2,0.9-2,2v0.8c0,0.3,0.3,0.6,0.6,0.6h0.8c0.3,0,0.6,0.3,0.6,0.6v0.8c0,0.3-0.3,0.6-0.6,0.6h-0.8c-0.3,0-0.6,0.3-0.6,0.6v0.8c0,0.3,0.2,0.5,0.4,0.6C16.1,5.7,17.7,5.6,18.6,6.6z"></path>
                        </svg>
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">Visa</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" viewBox="0 0 24 24">
                          <circle cx="7" cy="12" r="7" fill="#EB001B"></circle>
                          <circle cx="17" cy="12" r="7" fill="#F79E1B"></circle>
                          <path d="M12 17a7 7 0 0 0 0-10" opacity="0.6" fill="#FF5F00"></path>
                        </svg>
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">MasterCard</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" viewBox="0 0 24 24" fill="#1434CB">
                          <path d="M21.5,12a9.5,9.5,0,1,1-9.5-9.5A9.5,9.5,0,0,1,21.5,12Zm-9.5,7a7,7,0,1,0-7-7A7,7,0,0,0,12,19Z" fill="#FFB600"></path>
                          <path d="M11,9.5a2.5,2.5,0,0,1,5,0v5a2.5,2.5,0,0,1-5,0Z" fill="#1434CB"></path>
                        </svg>
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">UnionPay</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" viewBox="0 0 24 24" fill="#003087">
                          <path d="M20,8h-3V6c0-2.2-1.8-4-4-4H7C4.8,2,3,3.8,3,6v12c0,2.2,1.8,4,4,4h10c2.2,0,4-1.8,4-4v-6C21,9.3,20.7,8,20,8z M7,6h6c1.1,0,2,0.9,2,2H7V6z M17,18H7v-8h10V18z M18,14h-1v-2h1V14z"></path>
                        </svg>
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">PayPal</p>
                    </div>  
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 italic">
                    <span className="font-medium">Lưu ý:</span> Thông tin thanh toán của bạn được mã hóa và bảo mật. Chúng tôi không lưu trữ thông tin thẻ của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Chuyển khoản ngân hàng/Mobile Banking</h2>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Chuyển khoản qua ứng dụng ngân hàng trên điện thoại hoặc Internet Banking</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hỗ trợ tất cả các ngân hàng tại Việt Nam</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Không mất phí giao dịch (tùy theo chính sách của ngân hàng)</span>
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 mb-3">Thông tin tài khoản:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <p><span className="font-medium">Ngân hàng:</span> Vietcombank</p>
                    <p><span className="font-medium">Số tài khoản:</span> 1234567890</p>
                    <p><span className="font-medium">Chủ tài khoản:</span> CÔNG TY TNHH MILK STORE</p>
                    <p><span className="font-medium">Chi nhánh:</span> Hồ Chí Minh</p>
                    <p><span className="font-medium">Nội dung chuyển khoản:</span> [Mã đơn hàng] - [Tên của bạn]</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 italic">
                    <span className="font-medium">Quan trọng:</span> Vui lòng ghi đúng nội dung chuyển khoản để chúng tôi có thể xác nhận đơn hàng của bạn nhanh chóng.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Ví điện tử</h2>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thanh toán nhanh chóng qua các ví điện tử phổ biến</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hỗ trợ nhiều khuyến mãi từ các đối tác ví điện tử</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Giao dịch được xác nhận ngay lập tức</span>
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 mb-3">Ví điện tử được hỗ trợ:</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-white p-2 rounded border">
                      <div className="h-8 w-16 bg-orange-500 rounded flex items-center justify-center text-white font-bold">
                        Momo
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">MoMo</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="h-8 w-16 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                        Zalo
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">ZaloPay</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="h-8 w-16 bg-green-600 rounded flex items-center justify-center text-white font-bold">
                        Viettel
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">ViettelPay</p>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <div className="h-8 w-16 bg-red-600 rounded flex items-center justify-center text-white font-bold">
                        ShopeePay
                      </div>
                      <p className="text-xs mt-1 text-center text-gray-600">ShopeePay</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 italic">
                    <span className="font-medium">Mẹo:</span> Theo dõi các chương trình khuyến mãi từ đối tác ví điện tử để được giảm giá thêm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-start">
              <div className="mr-6 flex-shrink-0">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Thanh toán khi nhận hàng (COD)</h2>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thanh toán bằng tiền mặt khi nhận hàng</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Kiểm tra hàng trước khi thanh toán</span>
                  </p>
                  <p className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Áp dụng cho tất cả các đơn hàng có giá trị dưới 5 triệu đồng</span>
                  </p>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 italic">
                    <span className="font-medium">Lưu ý:</span> Vui lòng chuẩn bị đúng số tiền để thanh toán cho nhân viên giao hàng. Một số khu vực có thể không hỗ trợ COD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods