import ProductService from '@services/Product/ProductServices'
import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const urlImg = [
  {
    img: 'https://res.cloudinary.com/dvxnesld4/image/upload/v1745991785/a2111df8-e321-4ba8-b520-f91b80d048bb_nshigg.png',
    alt: 'image1',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Hero_1_5cbd9c8358.webp',
    alt: 'image2',
  },
  {
    img: 'https://res.cloudinary.com/dwbcqjupj/image/upload/v1747592344/f91ff7ce-ff16-4c19-8cd9-fee9046a7406_iydza5.jpg',
    alt: 'image3',
  },
]

const awards = [
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_1_fe08b5b4cd.svg',
    alt: 'Quality award',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_2_959a72e121.svg',
    alt: 'Quality award',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_3_298d151332.svg',
    alt: 'Quality award',
  },

  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_4_271868f252.svg',
    alt: 'Customer satisfaction award',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/award_5_83186cbade.svg',
    alt: 'Innovation award',
  },
]
const imagePairs = [
  {
    img: 'https://res.cloudinary.com/dwbcqjupj/image/upload/v1747605726/%C3%A1nhua_n7h6kg.png',
    alt: 'Promotion 1',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp',
    alt: 'Promotion 2',
  },
]
const promotion = [
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp',
    alt: 'Promotion 1',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_3_f42cd34695.webp',
    alt: 'Promotion 2',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_5_18c522f89e.webp',
    alt: 'Promotion 3',
  },
  {
    img: 'https://res.cloudinary.com/dwbcqjupj/image/upload/v1747605194/b%C3%B2_cyqsof.jpg',
    alt: 'Promotion 2',
  },
]

const action = [
  {
    number: '01',
    title: "Mảnh ghép mới trong hệ thống nhà máy 'xanh'",
    content:
      'Trước thềm Đại hội đồng cổ đông thường niên 2024, MilkStore công bố Nhà máy Nước giải khát Việt Nam đạt trung hòa Carbon theo tiêu chuẩn quốc tế PAS.',
    image:
      'https://d8um25gjecm9v.cloudfront.net/store-front-cms/De_tam_hanh_dong_1_bb1abfa116.png',
    alt: 'Nhà máy xanh',
  },
  {
    number: '02',
    title: '3 đơn vị đạt chứng nhận về trung hòa Carbon',
    content:
      'MilkStore đang sở hữu 2 nhà máy và 1 trang trại đạt chứng nhận về trung hòa Carbon, cho thấy những bước tiến quyết liệt trên con đường tiến đến mục tiêu Net Zero vào năm 2050.',
    image:
      'https://d8um25gjecm9v.cloudfront.net/store-front-cms/De_tam_hanh_dong_2_4aa913b700.png',
    alt: 'Chứng nhận Carbon',
  },
  {
    number: '03',
    title: 'Cam kết và Lộ trình tiến đến Net Zero vào năm 2050',
    content:
      'Tiên phong về phát triển bền vững, MilkStore đặt mục tiêu cắt giảm 15% phát thải khí nhà kính vào 2027, 55% vào năm 2035 và tiến đến phát thải ròng bằng 0 vào năm 2050.',
    image:
      'https://d8um25gjecm9v.cloudfront.net/store-front-cms/De_tam_hanh_dong_3_d9f4b80a79.png',
    alt: 'Lộ trình Net Zero',
  },
]

const horizontalImages = [
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp',
    alt: 'Product 1',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp',
    alt: 'Product 2',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_3_f42cd34695.webp',
    alt: 'Product 3',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_5_18c522f89e.webp',
    alt: 'Product 4',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp',
    alt: 'Product 5',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp',
    alt: 'Product 6',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_3_f42cd34695.webp',
    alt: 'Product 7',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_5_18c522f89e.webp',
    alt: 'Product 8',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/New_2_51cba411a8.webp',
    alt: 'Product 9',
  },
  {
    img: 'https://d8um25gjecm9v.cloudfront.net/store-front-cms/Cautien_2_4aef1fd870.webp',
    alt: 'Product 10',
  },
]

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch products with default parameters
        const response = await ProductService.getProducts({
          pageNumber: 1,
          pageSize: 10,
          sortBy: 'ProductName',
          sortAscending: true,
        })

        setProducts(response.products)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className='flex flex-col bg-gradient-to-b from-blue-50 to-white'>
      <div className='h-full w-full cursor-pointer'>
        <Carousel arrows infinite={true} autoplay={true} autoplaySpeed={3000}>
          {/* Banner 1 */}
          <div className='relative overflow-hidden'>
            <img
              src={urlImg[0].img}
              alt={urlImg[0].alt}
              className='h-145 w-full object-cover blur-[1px] brightness-90'
            />
            <div className='absolute inset-0 bg-green-600 opacity-10'></div>
            <div className='absolute bottom-15 left-1/2 -translate-x-1/2 transform text-center'>
              <p className='rounded-lg bg-green-800/30 px-8 py-4 text-8xl font-semibold text-white shadow-lg backdrop-blur-[1px] md:text-4xl'>
                Luôn vắt tươi ngon <br />
                <span className='text-3xl font-light text-white italic'>
                  từ 5 trang trại xanh toàn quốc
                </span>
              </p>
            </div>
          </div>

          {/* Banner 2 */}
          <div className='relative'>
            <img
              src={urlImg[1].img}
              alt={urlImg[1].alt}
              className='h-145 w-full object-cover blur-[1px] brightness-90'
            />
            <div className='absolute bottom-15 left-1/2 -translate-x-1/2 transform text-center'>
              <p className='bg-opacity-50 rounded-lg bg-green-800/30 px-6 py-3 text-8xl font-normal text-white shadow-lg backdrop-blur-[2px] md:text-4xl'>
                Luôn sạch tinh khiết <br />
                <span className='text-3xl font-light text-white italic'>
                  từ 2 nhà máy công nghệ hàng đầu
                </span>
              </p>
            </div>
          </div>

          {/* Banner 3 */}
          <div className='relative'>
            <img
              src={urlImg[2].img}
              alt={urlImg[2].alt}
              className='h-145 w-full object-cover blur-[1px] brightness-90'
            />
            <div className='absolute bottom-15 left-1/2 -translate-x-1/2 transform text-center'>
              <p className='bg-opacity-50 rounded-lg bg-green-800/30 px-6 py-3 text-8xl font-normal text-white shadow-lg backdrop-blur-[1px] md:text-4xl'>
                Milkstore ưu đãi tháng 5 <br />
                <span className='text-3xl font-light text-white italic'>
                  xem ngay
                </span>
              </p>
            </div>
          </div>
        </Carousel>
      </div>
      <div className='grid grid-cols-5 bg-blue-900 md:grid-cols-5'>
        {awards.map((item, index) => (
          <div key={index} className='col-span-1'>
            <img src={item.img} alt={item.alt} className='h-25 w-90' />
          </div>
        ))}
      </div>

      <div className='relative flex w-full'>
        {imagePairs.map((item, index) => (
          <div key={index} className='w-1/2'>
            <img src={item.img} alt={item.alt} className='h-160 w-full' />
          </div>
        ))}
        <div className='absolute inset-0 left-5/10 flex flex-col items-center justify-center text-white'>
          <div className='rounded-lg bg-[#E1F29D] p-8 text-center text-[#087E30]'>
            <h2 className='text-shadow mb-4 text-8xl font-bold'>
              Mới! <br />
              Mới! <br />
              Mới!
            </h2>
            <div className='text-shadow flex w-80 cursor-pointer items-center justify-between text-xl'>
              <Link to='/san-pham/P020' className='font-mono text-blue-900'>
                Sữa tươi thanh trùng
              </Link>
              <HiOutlineArrowRight className='mt-2 h-5 w-8 text-blue-900' />
            </div>
            <hr className='mt-1 w-80 border-blue-900 px-2' />
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='flex w-full flex-col items-center justify-center p-10 text-blue-900'>
          <p className='text-5xl font-semibold'>Mời bạn sắm sửa</p>

          {/* Horizontal Scrollable Carousel */}
          <div className='scrollbar-hide mt-12 w-full overflow-x-auto'>
            {loading ? (
              <div className='flex h-64 items-center justify-center'>
                <div className='h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500'></div>
              </div>
            ) : error ? (
              <div className='flex h-64 items-center justify-center text-red-500'>
                {error}
              </div>
            ) : (
              <div className='flex min-w-max space-x-6 pb-4'>
                {products.length > 0
                  ? products.map(product => (
                      <Link
                        key={product.id}
                        to={`/san-pham/${product.id}`}
                        className='h-64 w-64 flex-none cursor-pointer overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl'
                      >
                        <div className='relative h-64'>
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                          />
                          {product.discountPercentage > 0 && (
                            <div className='absolute top-2 right-2 rounded-md bg-red-500 px-2 py-1 text-sm font-bold text-white'>
                              -{product.discountPercentage}%
                            </div>
                          )}
                        </div>
                      </Link>
                    ))
                  : // Fallback to static images if no products are available
                    horizontalImages.map((item, index) => (
                      <div
                        key={index}
                        className='h-64 w-64 flex-none cursor-pointer overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl'
                      >
                        <img
                          src={item.img}
                          alt={item.alt}
                          className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                        />
                      </div>
                    ))}
              </div>
            )}
          </div>

          <div className='flex w-full justify-center'>
            <hr className='mt-1 w-full rounded-full border-4 border-blue-900 font-bold' />
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='flex w-full justify-between p-10 text-blue-900'>
          <p className='text-5xl font-semibold'>
            Cầu tiến là <br /> bí quyết
          </p>
          <p className='p-4 text-xl italic'>
            Không ngừng tìm kiếm, ứng dụng công nghệ sản xuất tiên <br /> tiến
            nhất để đáp ứng những tiêu chuẩn khắt khe nhất của <br /> chính
            MilkStore.
          </p>
        </div>
        <div className='grid grid-cols-4 overflow-x-hidden'>
          {promotion.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ease-in-out ${
                hoveredIndex === index ? 'z-10 scale-x-140 transform' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={item.img}
                alt={item.alt}
                className='h-160 w-full object-cover transition-transform duration-200'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='mt-5 mb-5 flex flex-col items-center justify-center'>
        <div className='mb-4 flex w-full justify-between p-10 text-blue-900'>
          <p className='text-5xl font-semibold'>
            Để tâm <br /> hành động
          </p>
          <p className='p-4 text-xl italic'>
            Chỉ 1 năm sau kế hoạch Net Zero 2050, MilkStore có 3 đơn vị <br />{' '}
            đạt Chứng nhận Quốc tế về Trung hòa Carbon
          </p>
        </div>
        <div className='grid w-full grid-cols-3 gap-0 border-gray-200'>
          {action.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col p-6 ${index < 2 ? 'border-r border-gray-200' : ''}`}
              >
                <span className='mb-4 text-4xl font-bold text-blue-900'>
                  {item.number}
                </span>
                <h3 className='mb-4 text-xl font-semibold text-blue-900'>
                  {item.title}
                </h3>
                <p className='mb-6 text-blue-900'>{item.content}</p>
                <div className='mt-auto'>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className='h-52 w-full rounded-lg object-cover'
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
