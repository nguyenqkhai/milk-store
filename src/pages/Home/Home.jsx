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
  { img: "https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_5_18c522f89e.webp", alt: "Promotion 3" },
]
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
            <div className='text-xl w-80 text-shadow flex justify-between items-center '>
              <span className='font-mono text-blue-900'>Sữa tươi thanh trùng</span>
              <HiOutlineArrowRight className=' text-blue-900 mt-2 h-5 w-8 ' />
            </div>
            <hr className='w-80 mt-1 px-2 border-blue-900' />
          </div>

        </div>
      </div>

      <div className='grid grid-cols-5 overflow-x-hidden'>
        {promotion.map((item, index) => (
          <div
            key={index}
            className={` transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'transform scale-x-130 z-10' : ''
              }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
              <img
                src={item.img}
                alt={item.alt}
                className='w-full h-160 object-cover transition-transform duration-300'
              />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
