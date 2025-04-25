import React from 'react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Anchor } from 'antd';

const { Link } = Anchor;

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>


        {/* Header Section */}
        <div className='text-center mb-16' id="header-section">
          <h1 className='text-4xl md:text-5xl font-bold text-blue-800 mb-3'>
            <span className='block text-3xl'>Táo bạo. Quyết tâm.</span>
            <span className='block text-blue-600'>Luôn là chính mình.</span>
          </h1>
          <div className='w-24 h-1 bg-blue-500 mx-auto mt-6'></div>
        </div>
        {/* Ant Design Anchor Navigation */}
        {/* Ant Design Anchor Navigation - Improved Version */}
        <div className="top-0  bg-white/80 border-2 border-blue-900 backdrop-blur-sm z-10 py-6 shadow-sm mb-35">
          <Anchor
            affix={false}
            targetOffset={100}
            className="flex flex-col space-y-4 max-w-2xl -mx-0.5"
          >
            <div className="flex items-center group">
              <span className="text-lg font-semibold text-black ml-2 mr-4">01</span>
              <Link
                href="#ceo-message"
                title="Thông điệp từ giám đốc"
                className="text-lg font-normal text-gray-800 group-hover:text-xl group-hover:text-blue-600 transition-all duration-200"
              />
              <div className="flex-1 brder-t border-gray-200 ml-2 mr-4"></div>
            </div>

            <div className="flex items-center group">
              <span className="text-lg font-semibold text-black ml-2 mr-4">02</span>
              <Link
                href="#promise-section"
                title="Lời hứa của MilkStore"
                className="text-lg font-normal text-gray-800 group-hover:text-xl group-hover:text-blue-600 transition-all duration-200"
              />
              <hr/>
            </div>

            <div className="flex items-center group">
              <span className="text-lg font-semibold text-black ml-2 mr-4">03</span>
              <Link
                href="#leadership-section"
                title="Người dẫn đường"
                className="text-lg font-normal text-gray-800 group-hover:text-xl group-hover:text-blue-600 transition-all duration-200"
              />
            </div>
          </Anchor>
        </div>

        {/* Content Section - Thông điệp từ giám đốc */}
        <div className='flex flex-col lg:flex-row gap-8' id="ceo-message">
          {/* Image Section */}
          <div className='lg:w-1/2 relative overflow-hidden shadow-2xl h-[670px]'>
            <img
              src='https://res.cloudinary.com/dvxnesld4/image/upload/v1745487749/SnapBG.ai_1745487733643_cyudqc.png'
              alt='CEO MilkStore'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent'></div>
            <div className='absolute bottom-8 left-8 text-white'>
              <p className='text-sm'>Trịnh Trung Hiển</p>
              <p className='text-xl font-medium'>Tổng giám đốc MilkStore</p>
            </div>
          </div>

          {/* Text Section */}
          <div className='lg:w-1/2 bg-white p-8 shadow-lg'>
            <h2 className='text-3xl font-bold text-blue-800'>
              Thông điệp từ Tổng Giám Đốc
            </h2>
            <div className='mb-10 pt-6'>
              <p className='text-blue-800 italic font-bold'>Trịnh Trung Hiển</p>
              <p className='text-blue-600'>Tổng giám đốc Công ty CP Sữa MilkStore</p>
              <hr className='text-blue-400 w-full mt-2' />
            </div>
            <div className='mb-8'>
              <div className='flex items-center text-blue-700 mb-2'>
                <RiDoubleQuotesL className='text-5xl mr-2 -mt-8' />
                <p className='italic text-xl font-medium'>
                  Muốn có sản phẩm đi đầu thì phải luôn sáng tạo. Sáng tạo là yếu tố sống còn.
                </p>
              </div>
            </div>

            <div className='space-y-6 text-gray-700'>
              <p className='leading-relaxed'>
                <span className='font-semibold text-blue-800'>Năm 2025</span>, chúng tôi bắt đầu hành trình với vô vàn khó khăn, nhưng mục tiêu luôn rõ ràng: để dinh dưỡng là quyền lợi của mọi trẻ em Việt Nam. Không vốn, không chuyên gia – chỉ có quyết tâm. Milkstore vượt qua mọi hoài nghi để chứng minh rằng người Việt có thể tạo ra sản phẩm dinh dưỡng chất lượng cho mọi nhà.
              </p>

              <p className='leading-relaxed'>
                Từ nhà máy đầu tiên khôi phục hoàn toàn bằng kỹ thuật Việt, đến trang trại và dây chuyền sản xuất đạt chứng nhận trung hoà carbon. Từ công thức phù hợp thể trạng trẻ em Việt, đến hơn 200 sản phẩm cho mọi độ tuổi – mỗi sản phẩm là một lời hứa của Milkstore: bạn có thể chăm sóc tốt cho bản thân và người thân yêu.
              </p>

              <p className='leading-relaxed'>
                Chúng tôi hiểu rằng ngày mai luôn còn nhiều thử thách. Nhưng Milkstore sẽ không ngừng sáng tạo, không ngừng tiến bước – cùng bạn, và vì bạn.
              </p>
            </div>
          </div>
        </div>

        {/* Lời hứa của MilkStore */}
        <div id="promise-section">
          <div className='flex flex-col lg:flex-row gap-8 mt-30'>
            {/* Text Section */}
            <div className='lg:w-1/2 bg-white p-8 shadow-lg'>
              <h2 className='text-3xl font-bold text-blue-800 mb-10'>
                Lời hứa của MilkStore
              </h2>

              <div className='space-y-6 text-gray-700'>
                <p className='leading-relaxed'>
                  <div className="flex items-center justify-between">
                    <span className='font-bold text-blue-800 italic'>Nói là làm</span>
                    <span className="italic text-blue-800">01</span>
                  </div>
                  <hr className='w-full mt-3 size-4' />
                  Tại MilkStore, minh bạch không chỉ là lời hứa.
                  Chúng tôi hợp tác với các đối tác toàn cầu để chọn lọc nguyên liệu an toàn, đạt chuẩn quốc tế, cùng quy trình sản xuất tiên tiến. Mọi quyết định về nguyên liệu đều vì bạn và những người bạn yêu thương.
                </p>

                <p className='leading-relaxed'>
                  <div className="flex items-center justify-between">
                    <span className='font-bold text-blue-800 italic'>Cầu tiến không ngừng</span>
                    <span className="italic text-blue-800">02</span>
                  </div>
                  <hr className='w-full mt-3 size-4' />
                  Tại MilkStore, mỗi sản phẩm đều phải vượt qua các tiêu chuẩn chất lượng nghiêm ngặt nhất trước khi đến tay bạn.
                  Nhưng với chúng tôi, tốt là chưa đủ. Chúng tôi luôn tự thử thách để ngày mai tốt hơn hôm nay.
                </p>

                <p className='leading-relaxed'>
                  <div className="flex items-center justify-between">
                    <span className='font-bold text-blue-800 italic'>Thật lòng, không lòng vòng</span>
                    <span className="italic text-blue-800">03</span>
                  </div>
                  <hr className='w-full mt-3 size-4' />
                  Toàn bộ nội dung truyền thông của chúng tôi đều chân thật và trực diện. Chúng tôi tự hào về chất lượng nguyên liệu của mình nên sẽ luôn minh bạch với bạn. Thành phần nào không ghi trên bao bì, nghĩa là không có trong sản phẩm.
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className='lg:w-1/2 relative overflow-hidden shadow-2xl'>
              <img
                src={"https://d8um25gjecm9v.cloudfront.net/store-front-cms/promise_cc9c5dc816.png"}
                alt='CEO MilkStore'
                className='w-full h-full object-cover min-h-[400px]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent'></div>
            </div>
          </div>
        </div>

        {/* Người dẫn đường */}
        <div className='mt-30 border-b-1' id="leadership-section">
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-blue-800 mb-6'>Người dẫn đường</h2>
            <div className='w-100 mx-auto p-2 border-1 border-blue-800 rounded-sm'>
              <div className='w-full bg-blue-800 p-1 rounded-sm'>
                <span className='text-xl text-white'>BAN ĐIỀU HÀNH</span>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 mb-3'>
            {/* Column 1 */}
            <div className='text-center border-r-1'>
              <h3 className='text-xl font-bold text-blue-800 mb-2'> <span className='font-normal text-lg'>Ông</span> Trịnh Trung Hiển</h3>
              <p className='text-blue-800 italic'>Tổng Giám Đốc</p>
            </div>

            {/* Column 2 */}
            <div className='text-center border-r-1'>
              <h3 className='text-xl font-bold text-blue-800 mb-2'> <span className='font-normal text-lg'>Ông</span> Nguyễn Quang Khải</h3>
              <p className='text-blue-800 italic'>Giám Đốc Điều Hành Tài Chính</p>
            </div>

            {/* Column 3 */}
            <div className='text-center border-r-1'>
              <h3 className='text-xl font-bold text-blue-800 mb-2'><span className='font-normal text-lg'>Ông</span> Nguyễn Đức Tâm</h3>
              <p className='text-blue-800 italic'>Giám Đốc Điều Hành Sản Xuất</p>
            </div>

            {/* Column 4 */}
            <div className='text-center'>
              <h3 className='text-xl font-bold text-blue-800 mb-2'><span className='font-normal text-lg'>Ông</span> Nguyễn Khánh Hoài</h3>
              <p className='text-blue-800 italic'>Phó Tổng Giám Đốc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;