import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ProductImages from './Components/ProductImages'
import ProductInfo from './Components/ProductInfo'
import RelatedProducts from './Components/RelatedProducts'
import LoadingState from '../Products/Components/LoadingState'
import ErrorState from '../Products/Components/ErrorState'
import NotFound from './Components/ProductNotFound'
import { useScrollToTop } from '../../hooks/useScrollToTop'
import ProductService from '../../services/Product/ProductServices';

const ProductDetail = () => {
  useScrollToTop()
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition !== null) {
        window.scrollTo({ top: parseInt(savedPosition), behavior: 'auto' });
        sessionStorage.removeItem('scrollPosition'); // Clear after use
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const timer = setTimeout(restoreScrollPosition, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Use passed product from navigation state if available
        if (navigate.location?.state?.product) {
          setProduct(navigate.location.state.product);
          setLoading(false);
          return;
        }
        
        // Fetch product by ID
        if (id) {
          try {
            console.log(`Fetching product by ID: ${id}`);
            const response = await ProductService.getProductById(id);
            
            if (response?.data) {
              setProduct(response.data);
            } else {
              setError('Không tìm thấy sản phẩm');
            }
          } catch (error) {
            console.error('Error fetching product by ID:', error);
            setError('Có lỗi xảy ra khi tải sản phẩm');
          }
        } else {
          setError('Không tìm thấy ID sản phẩm');
        }
      } catch (err) {
        console.error('Error in product fetch process:', err);
        setError('Có lỗi xảy ra khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
          to="/products" 
          className="text-gray-500 hover:text-blue-600"
        >
          Sản phẩm
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="font-medium text-gray-800 truncate">{product.title || product.name}</span>
      </nav>

      {/* Chi tiết sản phẩm */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
      
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
                <span className="text-gray-600">
                  {typeof product.brand === 'object' ? product.brand.name : product.brand || 'Không có thông tin'}
                </span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Loại sản phẩm:</span>
                <span className="text-gray-600">{product.category || 'Không có thông tin'}</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Mã SKU:</span>
                <span className="text-gray-600">{product.sku || 'Không có thông tin'}</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Xuất xứ:</span>
                <span className="text-gray-600">Việt Nam</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Đánh giá:</span>
                <span className="text-gray-600">{product.rating || 0}/5 ⭐</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Số lượng kho:</span>
                <span className="text-gray-600">{product.stockQuantity || product.stockquantity || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sản phẩm liên quan từ API */}
      <RelatedProducts product={product} />
    </div>
  )
}

export default ProductDetail