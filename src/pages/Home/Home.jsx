import React, { useState } from 'react'
import { Carousel } from 'antd'
import { FaLongArrowAltRight } from "react-icons/fa"
import { HiOutlineArrowRight } from "react-icons/hi2"

const urlImg = [
  { img: "https://res.cloudinary.com/dvxnesld4/image/upload/v1745991785/a2111df8-e321-4ba8-b520-f91b80d048bb_nshigg.png", alt: 'image1' },
  { img: "https://res.cloudinary.com/dvxnesld4/image/upload/v1745991785/a2111df8-e321-4ba8-b520-f91b80d048bb_nshigg.png", alt: 'image2' },
  { img: "https://res.cloudinary.com/dvxnesld4/image/upload/v1745991785/a2111df8-e321-4ba8-b520-f91b80d048bb_nshigg.png", alt: 'image3' },
]

const awards = [
  {
    img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_1_fe08b5b4cd.svg",
    alt: 'Quality award'
  },
  {
    img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_2_959a72e121.svg",
    alt: 'Quality award'
  },
  {
    img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_3_298d151332.svg",
    alt: 'Quality award'
  },

  {
    img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_4_271868f252.svg",
    alt: 'Customer satisfaction award'
  },
  {
    img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_5_83186cbade.svg",
    alt: 'Innovation award'
  },
];
const imagePairs = [

  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp", alt: 'Promotion 1' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp", alt: 'Promotion 2' }

];
const promotion = [
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp", alt: "Promotion 1" },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_3_f42cd34695.webp", alt: "Promotion 2" },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_5_18c522f89e.webp", alt: "Promotion 3" },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_3_f42cd34695.webp", alt: "Promotion 2" },
]

const action = [
  {
    number: "01",
    title: "Mảnh ghép mới trong hệ thống nhà máy 'xanh'",
    content: "Trước thềm Đại hội đồng cổ đông thường niên 2024, MilkStore công bố Nhà máy Nước giải khát Việt Nam đạt trung hòa Carbon theo tiêu chuẩn quốc tế PAS.",
    image: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/De_tam_hanh_dong_1_bb1abfa116.png",
    alt: "Nhà máy xanh"
  },
  {
    number: "02",
    title: "3 đơn vị đạt chứng nhận về trung hòa Carbon",
    content: "MilkStore đang sở hữu 2 nhà máy và 1 trang trại đạt chứng nhận về trung hòa Carbon, cho thấy những bước tiến quyết liệt trên con đường tiến đến mục tiêu Net Zero vào năm 2050.",
    image: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/De_tam_hanh_dong_2_4aa913b700.png",
    alt: "Chứng nhận Carbon"
  },
  {
    number: "03",
    title: "Cam kết và Lộ trình tiến đến Net Zero vào năm 2050",
    content: "Tiên phong về phát triển bền vững, MilkStore đặt mục tiêu cắt giảm 15% phát thải khí nhà kính vào 2027, 55% vào năm 2035 và tiến đến phát thải ròng bằng 0 vào năm 2050.",
    image: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/De_tam_hanh_dong_3_d9f4b80a79.png",
    alt: "Lộ trình Net Zero"
  }
]

const horizontalImages = [
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp", alt: 'Product 1' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp", alt: 'Product 2' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_3_f42cd34695.webp", alt: 'Product 3' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_5_18c522f89e.webp", alt: 'Product 4' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp", alt: 'Product 5' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp", alt: 'Product 6' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_3_f42cd34695.webp", alt: 'Product 7' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_5_18c522f89e.webp", alt: 'Product 8' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp", alt: 'Product 9' },
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp", alt: 'Product 10' },
];

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className='flex  flex-col  bg-gradient-to-b from-blue-50 to-white'>
      <div className='w-full h-full'>
        <Carousel
          arrows
          infinite={true}
          autoplay={true}
          autoplaySpeed={3000}
        >
          {urlImg.map((item, index) => (
            <div key={index}>
              <img
                src={item.img}
                alt={item.alt}
                className='h-145 w-full object-cover'
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className='grid grid-cols-5 bg-blue-900 md:grid-cols-5'>
        {awards.map((item, index) => (
          <div key={index} className='col-span-1'>
            <img src={item.img} alt={item.alt} className='w-90 h-25 ' />
          </div>
        ))}
      </div>


      <div className='relative w-full flex'>

        {imagePairs.map((item, index) => (
          <div key={index} className='w-1/2'>
            <img src={item.img} alt={item.alt} className='w-full h-160 ' />
          </div>
        ))}
        <div className='absolute inset-0 flex flex-col justify-center items-center left-5/10 text-white '>

          <div className="text-[#087E30] text-center bg-[#E1F29D] p-8 rounded-lg">
            <h2 className='text-8xl font-bold mb-4 text-shadow'>Mới! <br />Mới! <br />Mới!</h2>
            <div className='text-xl w-80 text-shadow flex justify-between items-center cursor-pointer'>
              <span className='font-mono text-blue-900'>Sữa tươi thanh trùng</span>
              <HiOutlineArrowRight className=' text-blue-900 mt-2 h-5 w-8 ' />
            </div>
            <hr className='w-80 mt-1 px-2 border-blue-900' />
          </div>

        </div>
      </div>

      <div className='mt-10'>
        <div className='w-full flex flex-col items-center justify-center p-10 text-blue-900'>
          <p className='text-6xl font-semibold'>Mời bạn sắm sửa</p>
          
          {/* Horizontal Scrollable Carousel */}
          <div className='w-full mt-12 overflow-x-auto scrollbar-hide'>
            <div className='flex space-x-6 pb-4 min-w-max'>
              {horizontalImages.map((item, index) => (
                <div 
                  key={index} 
                  className='flex-none w-64 h-64 rounded-lg cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
                >
                  <img 
                    src={item.img} 
                    alt={item.alt} 
                    className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <hr className='w-full mt-1 font-bold border-4 border-blue-900 rounded-full' />
          </div>
        </div>
      </div>

      <div className='mt-10'>
      <div className='w-full flex justify-between p-10 text-blue-900'>
          <p className='text-6xl font-semibold'>Cầu tiến là <br /> bí quyết</p>
          <p className='text-xl p-4 italic'>
            Không ngừng tìm kiếm, ứng dụng công nghệ sản xuất tiên <br/> tiến nhất để đáp ứng những tiêu chuẩn khắt khe nhất của <br/> chính MilkStore.
          </p>
        </div>
        <div className='grid grid-cols-4 overflow-x-hidden'>
          {promotion.map((item, index) => (
            <div
              key={index}
              className={` transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'transform scale-x-140 z-10' : ''
                }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.img}
                alt={item.alt}
                className='w-full h-160 object-cover transition-transform duration-200'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col mt-5 mb-5 items-center justify-center'>
        <div className='w-full flex justify-between p-10 text-blue-900'>
          <p className='text-6xl font-semibold'>Để tâm <br /> hành động</p>
          <p className='text-xl p-4 italic'>Chỉ 1 năm sau kế hoạch Net Zero 2050, MilkStore có 3 đơn vị <br /> đạt Chứng nhận Quốc tế về Trung hòa Carbon</p>
        </div>
        <div className="w-full grid grid-cols-3 gap-0 border-gray-200">

          {action.map((item, index) => {
            return (
              <div
                key={index}
                className={`p-6 flex flex-col ${index < 2 ? 'border-r border-gray-200' : ''}`}
              >
                <span className="text-4xl font-bold text-blue-900 mb-4">{item.number}</span>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">{item.title}</h3>
                <p className="text-blue-900 mb-6">{item.content}</p>
                <div className="mt-auto">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                </div>

              </div>
            )
          })}
        </div>

      </div>

    </div>
  )
}

export default Home
