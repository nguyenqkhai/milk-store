import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import ProductImages from './Components/ProductImages'
import ProductInfo from './Components/ProductInfo'
import RelatedProducts from './Components/RelatedProducts'
import LoadingState from '../Products/Components/LoadingState'
import ErrorState from '../Products/Components/ErrorState'
<<<<<<< HEAD
import { toSlug } from '../../utils/stringUtils'
import { fetchProducts, fetchProductById } from '../../services/productService'
=======
import { toSlug } from '../../utils/stringUtils'    
import NotFound from './Components/ProductNotFound'
import { useScrollToTop } from '../../hooks/useScrollToTop'

const mockProducts = [
  {
    id: 1,
    title: 'Sữa Tươi Có Đường Vinamilk 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi tiệt trùng có đường Vinamilk giàu dinh dưỡng',
    price: 30.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'Vinamilk'
  },
  {
    id: 2,
    title: 'Sữa Tươi Không Đường Vinamilk 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi tiệt trùng không đường Vinamilk, tốt cho sức khỏe',
    price: 30.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 5,
    brand: 'Vinamilk'
  },
  {
    id: 3,
    title: 'Sữa Hạt Óc Chó Vinamilk',
    category: 'Sữa hạt',
    description: 'Sữa óc chó thơm ngon, bổ dưỡng từ Vinamilk',
    price: 32.000,
    rating: 4.8,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 10,
    brand: 'Vinamilk'
  },
  {
    id: 4,
    title: 'Sữa Đậu Nành Vinamilk 1L',
    category: 'Sữa hạt',
    description: 'Sữa đậu nành nguyên chất, ít đường',
    price: 27.000,
    rating: 4.5,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'Vinamilk'
  },
  {
    id: 5,
    title: 'Sữa Tươi TH True Milk 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi sạch từ trang trại TH',
    price: 31.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'TH True Milk'
  },
  {
    id: 6,
    title: 'Sữa Tươi Ít Đường TH True Milk 1L',
    category: 'Sữa tươi',
    description: 'Sữa ít đường từ thương hiệu TH True Milk',
    price: 31.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 3,
    brand: 'TH True Milk'
  },
  {
    id: 7,
    title: 'Sữa Hạt TH True Nut Óc Chó',
    category: 'Sữa hạt',
    description: 'Sữa hạt óc chó thơm ngon từ TH True Nut',
    price: 34.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 5,
    brand: 'TH True Milk'
  },
  {
    id: 8,
    title: 'Sữa Đậu Đen TH True Nut',
    category: 'Sữa hạt',
    description: 'Sữa đậu đen nguyên chất, thơm ngon và lành mạnh',
    price: 35.000,
    rating: 4.4,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'TH True Milk'
  },
  {
    id: 9,
    title: 'Sữa Tươi Có Đường Dutch Lady 1L',
    category: 'Sữa tươi',
    description: 'Sữa tươi thơm ngon từ Hà Lan',
    price: 29.000,
    rating: 4.5,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'Dutch Lady'
  },
  {
    id: 10,
    title: 'Sữa Tươi Không Đường Dutch Lady 1L',
    category: 'Sữa tươi',
    description: 'Sữa không đường phù hợp người ăn kiêng',
    price: 29.000,
    rating: 4.3,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'Dutch Lady'
  },
  {
    id: 11,
    title: 'Sữa Bắp Nutifood 1L',
    category: 'Sữa hạt',
    description: 'Sữa bắp Nutifood thơm ngon tự nhiên',
    price: 28.000,
    rating: 4.4,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'Nutifood'
  },
  {
    id: 12,
    title: 'Sữa Dinh Dưỡng Nuti IQ Gold',
    category: 'Sữa bột',
    description: 'Sữa dành cho trẻ em phát triển trí tuệ và chiều cao',
    price: 250.000,
    rating: 4.9,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 15,
    brand: 'Nutifood'
  },
  {
    id: 13,
    title: 'Sữa Dielac Alpha Vinamilk 900g',
    category: 'Sữa bột',
    description: 'Sữa bột cho trẻ từ 1-6 tuổi hỗ trợ phát triển trí não',
    price: 220.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 10,
    brand: 'Vinamilk'
  },
  {
    id: 14,
    title: 'Sữa Dinh Dưỡng GrowPLUS+ 1L',
    category: 'Sữa dinh dưỡng',
    description: 'Hỗ trợ tăng cân và chiều cao cho trẻ em suy dinh dưỡng',
    price: 33.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 7,
    brand: 'Nutifood'
  },
  {
    id: 15,
    title: 'Sữa Nuti EnPlus Diamond',
    category: 'Sữa dinh dưỡng',
    description: 'Sữa dành cho người lớn tuổi và người bệnh',
    price: 230.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 5,
    brand: 'Nutifood'
  },
  {
    id: 16,
    title: 'Sữa Sure Prevent Gold Vinamilk',
    category: 'Sữa dinh dưỡng',
    description: 'Hỗ trợ tim mạch, bổ sung canxi cho người cao tuổi',
    price: 255.000,
    rating: 4.8,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 10,
    brand: 'Vinamilk'
  },
  {
    id: 17,
    title: 'Sữa Đặc Ông Thọ Trắng 380g',
    category: 'Sữa đặc',
    description: 'Sữa đặc có đường ông Thọ dùng pha cà phê hoặc làm bánh',
    price: 25.000,
    rating: 4.9,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'Vinamilk'
  },
  {
    id: 18,
    title: 'Sữa Đặc Ông Thọ Xanh 380g',
    category: 'Sữa đặc',
    description: 'Sữa đặc ít đường thích hợp với người ăn kiêng',
    price: 26.000,
    rating: 4.6,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 0,
    brand: 'Vinamilk'
  },
  {
    id: 19,
    title: 'Sữa Tươi Nguyên Kem Meadow Fresh 1L',
    category: 'Sữa tươi',
    description: 'Sữa nguyên kem nhập khẩu từ New Zealand',
    price: 35.000,
    rating: 4.5,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 8,
    brand: 'Meadow Fresh'
  },
  {
    id: 20,
    title: 'Sữa Hạt Ngũ Cốc TH True Nut',
    category: 'Sữa hạt',
    description: 'Kết hợp dinh dưỡng từ 5 loại hạt tốt cho sức khỏe',
    price: 36.000,
    rating: 4.7,
    thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
    discountPercentage: 6,
    brand: 'TH True Milk'
  }
];
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b

// Hàm lọc sản phẩm liên quan
const getRelatedProducts = (currentProduct, allProducts) => {
  if (!currentProduct) return [];
  
  // Lấy ra các thông tin cần thiết
  const { id, category, brand } = currentProduct;
  
  // Ưu tiên 1: Sản phẩm cùng danh mục và cùng thương hiệu
  const sameCategoryAndBrand = allProducts.filter(p => 
    p.id !== id && 
    p.category === category && 
    p.brand === brand
  );
  
  // Ưu tiên 2: Sản phẩm cùng danh mục nhưng khác thương hiệu
  const sameCategoryDifferentBrand = allProducts.filter(p => 
    p.id !== id && 
    p.category === category && 
    p.brand !== brand
  );
  
  // Ưu tiên 3: Sản phẩm cùng thương hiệu nhưng khác danh mục
  const sameBrandDifferentCategory = allProducts.filter(p => 
    p.id !== id && 
    p.category !== category && 
    p.brand === brand
  );
  
  // Kết hợp các danh sách với thứ tự ưu tiên và lấy tối đa 8 sản phẩm
  const relatedProducts = [
    ...sameCategoryAndBrand,
    ...sameCategoryDifferentBrand,
    ...sameBrandDifferentCategory
  ].slice(0, 8);
  
  return relatedProducts;
};

const ProductDetail = () => {
  useScrollToTop()
  const { category, productName } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Thêm useEffect để cuộn lên đầu trang khi component mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
<<<<<<< HEAD
    const getProductData = async () => {
      try {
        setLoading(true);
=======
    const id = parseInt(productName)
    if (!isNaN(id)) {
      const productById = mockProducts.find(p => p.id === id)
      if (productById) {
        navigate(`/${toSlug(productById.category)}/${toSlug(productById.title)}`, { replace: true })
        return
      }
    }

    const fetchProduct = () => {
      try {
        setTimeout(() => {
          const foundProduct = mockProducts.find(
            p => toSlug(p.category) === category && toSlug(p.title) === productName
          )
          
          if (foundProduct) {
            setProduct(foundProduct)
            // Tìm sản phẩm liên quan
            const related = getRelatedProducts(foundProduct, mockProducts)
            setRelatedProducts(related)
          } else {
            setError('Không tìm thấy sản phẩm')
          }
          setLoading(false)
        }, 800) // Giảm thời gian loading
      } catch (err) {
        setError('Có lỗi xảy ra khi tải sản phẩm')
        setLoading(false)
      }
    }
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b

        // Check if this is an ID format
        if (productName.match(/^[P][0-9]+$/) || productName.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
          // This is a product ID, fetch directly by ID
          const productData = await fetchProductById(productName);
          if (productData) {
            console.log('Product data from API:', productData);
            setProduct(productData);
          } else {
            setError('Không tìm thấy sản phẩm');
          }
        } else {
          // This is a slug, first try to find by slug in the URL
          try {
            // Get all products and find by slug
            const allProducts = await fetchProducts();
            const foundProduct = allProducts.find(
              p => toSlug(p.category) === category && toSlug(p.title) === productName
            );

            if (foundProduct) {
              // If found by slug, fetch the full product details by ID
              const productData = await fetchProductById(foundProduct.id);
              if (productData) {
                setProduct(productData);
              } else {
                setProduct(foundProduct); // Fallback to the basic product data
              }
            } else {
              setError('Không tìm thấy sản phẩm');
            }
          } catch (slugErr) {
            console.error('Error finding product by slug:', slugErr);
            setError('Có lỗi xảy ra khi tải sản phẩm');
          }
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải sản phẩm');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [category, productName, navigate])

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (!product) return <NotFound />

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link 
          to={`/${toSlug(product.category)}`} 
          className="text-gray-500 hover:text-blue-600"
        >
          {product.category}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="font-medium text-gray-800 truncate">{product.title}</span>
      </nav>

      {/* Chi tiết sản phẩm */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
<<<<<<< HEAD
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
=======
      
      {/* Mô tả chi tiết */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700">{product.description}</p>
          
          {/* Thông số sản phẩm */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Thông số sản phẩm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Thương hiệu:</span>
                <span className="text-gray-600">{product.brand}</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Loại sản phẩm:</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Xuất xứ:</span>
                <span className="text-gray-600">Việt Nam</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Đánh giá:</span>
                <span className="text-gray-600">{product.rating}/5 ⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sản phẩm liên quan */}
      <RelatedProducts products={relatedProducts} />
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
    </div>
  )
}

export default ProductDetail