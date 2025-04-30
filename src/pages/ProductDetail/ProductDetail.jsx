import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import ProductImages from './Components/ProductImages'
import ProductInfo from './Components/ProductInfo'
import RelatedProducts from './Components/RelatedProducts'
import LoadingState from '../Products/Components/LoadingState'
import ErrorState from '../Products/Components/ErrorState'
import { toSlug } from '../../utils/stringUtils'

const mockProducts = [
  {
    id: 1,
    title: 'Sữa Tươi Có Đường Vinamilk 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi tiệt trùng có đường Vinamilk giàu dinh dưỡng',
    price: 30.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 2,
    title: 'Sữa Tươi Không Đường Vinamilk 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi tiệt trùng không đường Vinamilk, tốt cho sức khỏe',
    price: 30.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 5
  },
  {
    id: 3,
    title: 'Sữa Hạt Óc Chó Vinamilk',
    category: 'Sữa hạt',
    description: 'Sữa óc chó thơm ngon, bổ dưỡng từ Vinamilk',
    price: 32.000,
    rating: 4.8,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 10
  },
  {
    id: 4,
    title: 'Sữa Đậu Nành Vinamilk 1L',
    category: 'Sữa hạt',
    description: 'Sữa đậu nành nguyên chất, ít đường',
    price: 27.000,
    rating: 4.5,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 5,
    title: 'Sữa Tươi TH True Milk 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi sạch từ trang trại TH',
    price: 31.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 6,
    title: 'Sữa Tươi Ít Đường TH True Milk 1L',
    category: 'Sữa tươi',
    description: 'Sữa ít đường từ thương hiệu TH True Milk',
    price: 31.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 3
  },
  {
    id: 7,
    title: 'Sữa Hạt TH True Nut Óc Chó',
    category: 'Sữa hạt',
    description: 'Sữa hạt óc chó thơm ngon từ TH True Nut',
    price: 34.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 5
  },
  {
    id: 8,
    title: 'Sữa Đậu Đen TH True Nut',
    category: 'Sữa hạt',
    description: 'Sữa đậu đen nguyên chất, thơm ngon và lành mạnh',
    price: 35.000,
    rating: 4.4,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 9,
    title: 'Sữa Tươi Có Đường Dutch Lady 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi thơm ngon từ Hà Lan',
    price: 29.000,
    rating: 4.5,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 10,
    title: 'Sữa Tươi Không Đường Dutch Lady 1L',
    category: 'Sữa tươi',
    description: 'Sữa không đường phù hợp người ăn kiêng',
    price: 29.000,
    rating: 4.3,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 11,
    title: 'Sữa Bắp Nutifood 1L',
    category: 'Sữa hạt',
    description: 'Sữa bắp Nutifood thơm ngon tự nhiên',
    price: 28.000,
    rating: 4.4,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 12,
    title: 'Sữa Dinh Dưỡng Nuti IQ Gold',
    category: 'Sữa bột',
    description: 'Sữa dành cho trẻ em phát triển trí tuệ và chiều cao',
    price: 250.000,
    rating: 4.9,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 15
  },
  {
    id: 13,
    title: 'Sữa Dielac Alpha Vinamilk 900g',
    category: 'Sữa bột',
    description: 'Sữa bột cho trẻ từ 1-6 tuổi hỗ trợ phát triển trí não',
    price: 220.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 10
  },
  {
    id: 14,
    title: 'Sữa Dinh Dưỡng GrowPLUS+ 1L',
    category: 'Sữa dinh dưỡng',
    description: 'Hỗ trợ tăng cân và chiều cao cho trẻ em suy dinh dưỡng',
    price: 33.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 7
  },
  {
    id: 15,
    title: 'Sữa Nuti EnPlus Diamond',
    category: 'Sữa dinh dưỡng',
    description: 'Sữa dành cho người lớn tuổi và người bệnh',
    price: 230.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 5
  },
  {
    id: 16,
    title: 'Sữa Sure Prevent Gold Vinamilk',
    category: 'Sữa dinh dưỡng',
    description: 'Hỗ trợ tim mạch, bổ sung canxi cho người cao tuổi',
    price: 255.000,
    rating: 4.8,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 10
  },
  {
    id: 17,
    title: 'Sữa Đặc Ông Thọ Trắng 380g',
    category: 'Sữa đặc',
    description: 'Sữa đặc có đường ông Thọ dùng pha cà phê hoặc làm bánh',
    price: 25.000,
    rating: 4.9,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 18,
    title: 'Sữa Đặc Ông Thọ Xanh 380g',
    category: 'Sữa đặc',
    description: 'Sữa đặc ít đường thích hợp với người ăn kiêng',
    price: 26.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0
  },
  {
    id: 19,
    title: 'Sữa Tươi Nguyên Kem Meadow Fresh 1L',
    category: 'Sữa tươi',
    description: 'Sữa nguyên kem nhập khẩu từ New Zealand',
    price: 35.000,
    rating: 4.5,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 8
  },
  {
    id: 20,
    title: 'Sữa Hạt Ngũ Cốc TH True Nut',
    category: 'Sữa hạt',
    description: 'Kết hợp dinh dưỡng từ 5 loại hạt tốt cho sức khỏe',
    price: 36.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 6
  }
];

const ProductDetail = () => {
  const { category, productName } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if this is an old URL format (using ID)
    const id = parseInt(productName)
    if (!isNaN(id)) {
      const productById = mockProducts.find(p => p.id === id)
      if (productById) {
        // Redirect to new URL format immediately
        navigate(`/${toSlug(productById.category)}/${toSlug(productById.title)}`, { replace: true })
        return
      }
    }

    const fetchProduct = () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const foundProduct = mockProducts.find(
            p => toSlug(p.category) === category && toSlug(p.title) === productName
          )
          
          if (foundProduct) {
            setProduct(foundProduct)
          } else {
            setError('Không tìm thấy sản phẩm')
          }
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError('Có lỗi xảy ra khi tải sản phẩm')
        setLoading(false)
      }
    }

    fetchProduct()
  }, [category, productName, navigate])

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (!product) return <ProductNotFound />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages product={product} />
        <ProductInfo product={product} />
      </div>
      <RelatedProducts 
        currentProductId={product.id} 
        category={product.category}
        products={mockProducts} 
      />
    </div>
  )
}

const ProductNotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
      <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <Link
        to="/product"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Quay về trang sản phẩm
      </Link>
    </div>
  </div>
)

export default ProductDetail