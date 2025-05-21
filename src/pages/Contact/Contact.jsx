import { Carousel } from 'antd'
import { FaCalendarAlt, FaMotorcycle } from 'react-icons/fa'
import { IoIosWifi } from 'react-icons/io'
import {
  IoChatbubbleEllipsesSharp,
  IoHome,
  IoLocationSharp,
} from 'react-icons/io5'
import { LuMilk } from 'react-icons/lu'
import { MdLocalPhone, MdPayment, MdPolicy, MdSecurity } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import bgcity from '/src/assets/bgcity5.jpg'
import shipper from '/src/assets/shipper.webp'
import milkstore from '/src/assets/store2.png'

const utilities = [
  {
    icon: <FaMotorcycle className='mb-2 size-15 text-red-500' />,
    label: 'Giữ xe miễn phí',
  },
  {
    icon: <IoIosWifi className='mb-2 size-15 text-red-500' />,
    label: 'Wifi miễn phí',
  },
  {
    icon: <LuMilk className='mb-2 size-15 text-red-500' />,
    label: (
      <>
        Xem và trải nghiệm
        <br />
        sản phẩm miễn phí
      </>
    ),
  },
  {
    icon: <IoChatbubbleEllipsesSharp className='mb-2 size-15 text-red-500' />,
    label: (
      <>
        Được tư vấn chuyên sâu
        <br />
        về sản phẩm và dịch vụ
      </>
    ),
  },
  {
    icon: <MdSecurity className='mb-2 size-15 text-red-500' />,
    label: (
      <>
        Sản phẩm
        <br />
        chính hãng 100%
      </>
    ),
  },
  {
    icon: <MdPolicy className='mb-2 size-15 text-red-500' />,
    label: (
      <>
        Có chính sách
        <br />
        bán hàng trả góp
      </>
    ),
  },
  {
    icon: <MdPayment className='mb-2 size-15 text-red-500' />,
    label: 'Thanh toán dễ dàng',
  },
  {
    icon: <TbTruckDelivery className='mb-2 size-15 text-red-500' />,
    label: 'Giao hàng tận nhà',
  },
]
const urlImg = [
  {
    img: 'https://res.cloudinary.com/dwbcqjupj/image/upload/v1747588508/nguon-hang-sua_mpxzom.webp',
    alt: 'image1',
  },
  {
    img: 'https://res.cloudinary.com/dwbcqjupj/image/upload/v1747588506/anh-mo-ta_ssgavh.jpg',
    alt: 'image2',
  },
  {
    img: 'https://res.cloudinary.com/dwbcqjupj/image/upload/v1747588500/anh_cua_hang_sua_ctfahi.jpg',
    alt: 'image3',
  },
]
const Contact = () => {
  const scrollToSection = () => {
    const target = document.getElementById('target-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className='relative flex min-h-screen flex-col items-center justify-center'
      style={{ backgroundImage: `url(${bgcity})` }}
    >
      {/* <div className="absolute inset-0 bg-white/60"></div> */}
      <div className='absolute top-40 left-10 w-[95vw]'>
        <div className='w-full'>
          <h1 className='text-4xl font-semibold'>
            HỆ THỐNG SHOWROOM MILKSTORE
          </h1>
          <h1 className='mt-2 text-xl font-semibold'>
            Địa điểm trải nghiệm và mua sắm sữa uống chất lượng
          </h1>
          <button
            onClick={scrollToSection}
            className='text-md mt-8 rounded-xl bg-blue-600 px-10 py-3 font-semibold text-white transition hover:bg-blue-700'
          >
            XEM NGAY
          </button>
          <img
            src={shipper}
            alt='shipper'
            className='animate-moveRight absolute bottom-[-175px] h-[240px]'
          />
          <img
            src={milkstore}
            alt='store'
            className='absolute right-0 bottom-[-190px] h-[350px]'
          />
          <img
            src={milkstore}
            alt='store'
            className='absolute right-73 bottom-[-180px] h-[280px]'
          />
        </div>
      </div>
      {/* <div className='absolute -mt-230 w-full'>
        <hr className='border-t-12 border-gray-700' />
      </div> */}
      <div className='absolute top-[460px] right-0 left-0 z-1000'>
        <hr className='border-t-[8px] border-gray-700' />
      </div>
      <div className='h-[70vh]' /> {/*Tạo khoảng trống để có cái để cuộn*/}
      <div
        id='target-section'
        className='flex w-full flex-col items-center justify-center bg-gray-200'
      >
        <div className='mt-20 flex w-full flex-col gap-6 p-6 lg:flex-row'>
          <div className='w-full rounded-lg bg-white p-6 shadow-lg lg:w-1/2'>
            <h2 className='mb-3 text-2xl font-medium text-blue-900'>
              MILKSTORE
            </h2>
            <p className='mb-4 text-5xl font-semibold text-blue-900'>
              LẠC LONG QUÂN
            </p>
            <hr className='w-40 border-t-5 p-2' />
            <div className='space-y-3 text-gray-700'>
              <p className='flex items-center font-semibold'>
                <MdLocalPhone className='mr-2 size-5 text-blue-500' />
                09779796975
              </p>

              <p className='flex items-center font-semibold'>
                <FaCalendarAlt className='mr-2 size-5 text-red-500' />
                Thời gian làm việc: 8:00 - 21:00 | Thứ 2 - Chủ Nhật
              </p>
              <p className='flex items-center font-semibold'>
                <IoHome className='mr-2 size-5 text-green-500' />
                129/1T Lạc Long Quân P.1, Q.11, TP.HCM
              </p>
            </div>

            {/* Google Maps */}
            <div className='mt-4'>
              <iframe
                className='h-64 w-full rounded-lg shadow-md'
                src='https://www.google.com/maps?q=10.758142236592212,106.63786218934307&z=16&output=embed'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
          <div className='flex w-full flex-col items-center rounded-lg bg-blue-500 p-6 shadow-lg lg:w-1/2'>
            <div className='mt-6 max-w-full rounded-sm border-6 border-white'>
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
                      className='h-85 w-full object-cover'
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className='mt-3 w-full'>
              <p className='flex items-center font-semibold text-white'>
                <IoLocationSharp className='mr-2 size-15 text-white' />
                <div className='mt-5 flex flex-col'>
                  <span className='text-2xl'>129/1T Lạc Long Quân</span>
                  <span className='text-xl'>
                    Phường 1, Quận 11, Thành phố Hồ Chí Minh
                  </span>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className='my-24 flex w-full flex-col items-center px-6'>
          <h2 className='mb-16 text-4xl font-semibold text-blue-950'>
            CÁC TIỆN ÍCH TẠI SHOWROOM MILKSTORE
          </h2>
          <div className='grid grid-cols-4 gap-6 gap-y-8'>
            {utilities.map((item, index) => (
              <div
                key={index}
                className='flex flex-col items-center text-center text-lg font-medium text-blue-950'
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Contact
