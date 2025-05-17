import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ProductImages from './Components/ProductImages'
import ProductInfo from './Components/ProductInfo'
import Reviews from './Components/ProductReview'
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

  // Get the first dimension object if available
  const dimension = product.dimensions && product.dimensions.length > 0 ? product.dimensions[0] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link 
          to="/san-pham" 
          className="text-gray-500 hover:text-blue-600"
        >
          Sản phẩm
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="font-medium text-gray-800 truncate">{product.name}</span>
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
                <span className="text-gray-600">{product.category || 'Sữa'}</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Mã SKU:</span>
                <span className="text-gray-600">{product.sku || 'Không có thông tin'}</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Mã vạch:</span>
                <span className="text-gray-600">{product.barcode || 'Không có thông tin'}</span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Đơn vị:</span>
                <span className="text-gray-600">
                  {typeof product.unit === 'object' ? product.unit.name : product.unit || 'Không có thông tin'}
                </span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Trạng thái:</span>
                <span className="text-gray-600">
                  {typeof product.status === 'object' ? product.status.name : product.status || 'Đang hoạt động'}
                </span>
              </div>
    
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Số lượng kho:</span>
                <span className="text-gray-600">{product.stockQuantity || 0}</span>
              </div>
              
              {/* Hiển thị thông tin kích thước nếu có */}
              {dimension && (
                <>
                  <div className="flex border-b border-gray-100 py-2">
                    <span className="font-medium w-32">Chiều dài:</span>
                    <span className="text-gray-600">{dimension.lengthValue || 0} cm</span>
                  </div>
                  <div className="flex border-b border-gray-100 py-2">
                    <span className="font-medium w-32">Chiều rộng:</span>
                    <span className="text-gray-600">{dimension.widthValue || 0} cm</span>
                  </div>
                  <div className="flex border-b border-gray-100 py-2">
                    <span className="font-medium w-32">Chiều cao:</span>
                    <span className="text-gray-600">{dimension.heightValue || 0} cm</span>
                  </div>
                  <div className="flex border-b border-gray-100 py-2">
                    <span className="font-medium w-32">Trọng lượng:</span>
                    <span className="text-gray-600">{dimension.weightValue || 0} g</span>
                  </div>
                </>
              )}
              
              {/* Thông tin thời gian */}
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Ngày tạo:</span>
                <span className="text-gray-600">
                  {product.createdAt 
                    ? new Date(product.createdAt).toLocaleDateString('vi-VN') 
                    : 'Không có thông tin'}
                </span>
              </div>
              <div className="flex border-b border-gray-100 py-2">
                <span className="font-medium w-32">Cập nhật:</span>
                <span className="text-gray-600">
                  {product.updatedAt 
                    ? new Date(product.updatedAt).toLocaleDateString('vi-VN') 
                    : 'Không có thông tin'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Đánh giá sản phẩm */}
      <Reviews productId={id} />
      
      {/* Sản phẩm liên quan từ API */}
      <RelatedProducts product={product} />
    </div>
  )
}

export default ProductDetail