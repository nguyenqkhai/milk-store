import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation  } from 'react-router-dom'
import ProductImages from './Components/ProductImages'
import ProductInfo from './Components/ProductInfo'
import RelatedProducts from './Components/RelatedProducts'
import LoadingState from '../Products/Components/LoadingState'
import ErrorState from '../Products/Components/ErrorState'
import { toSlug } from '../../utils/stringUtils'    
import NotFound from './Components/ProductNotFound'
import { useScrollToTop } from '../../hooks/useScrollToTop'
import ProductService from '../../services/Product/ProductServices';

const ProductDetail = () => {
  useScrollToTop()
  const { category, productName, id } = useParams()
  const navigate = useNavigate()
  const location = useLocation();
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
        let productData = null;

        if (location.state?.product) {
          productData = location.state.product;
          setProduct(productData);
          setLoading(false);
          return;
        }

        const searchParams = new URLSearchParams(location.search);
        const productIdFromQuery = searchParams.get('pid');
        
        if (productIdFromQuery) {
          try {
            console.log(`Fetching product by ID from query parameter: ${productIdFromQuery}`);
            const response = await ProductService.getProductById(productIdFromQuery);
            
            if (response?.data) {
              productData = response.data;
              setProduct(productData);
              setLoading(false);
              return;
            }
          } catch (queryIdError) {
            console.error('Error fetching product by ID from query parameter:', queryIdError);
          }
        }

        if (id) {
          try {
            console.log(`Fetching product by ID: ${id}`);
            const response = await ProductService.getProductById(id);
            
            if (response?.data) {
              productData = response.data;
              const seoUrl = `/${toSlug(productData.category || 'san-pham')}/${toSlug(productData.name || productData.title)}?pid=${encodeURIComponent(productData.id)}`;
              
              if (location.pathname !== seoUrl.split('?')[0]) {
                navigate(seoUrl, { 
                  replace: true, 
                  state: { product: productData } 
                });
                return;
              }
            }
          } catch (idError) {
            console.error('Error fetching product by ID:', idError);
          }
        }
        
        if (!productData && productName && !id) {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (uuidRegex.test(productName)) {
            try {
              console.log(`Detected UUID in productName: ${productName}`);
              const response = await ProductService.getProductById(productName);
              
              if (response?.data) {
                productData = response.data;
      
                navigate(`/${toSlug(productData.category || 'san-pham')}/${toSlug(productData.name || productData.title)}`, 
                  { replace: true, state: { product: productData } }
                );
                return;
              }
            } catch (uuidError) {
              console.error('Error fetching by UUID in productName:', uuidError);
            }
          }
        }
        
        if (!productData && productName && !id) {
          const simpleIdRegex = /^[A-Za-z0-9]{1,10}$/;
          
          if (simpleIdRegex.test(productName)) {
            try {
              console.log(`Trying productName as simple ID: ${productName}`);
              const response = await ProductService.getProductById(productName);
              
              if (response?.data) {
                productData = response.data;
                navigate(`/${toSlug(productData.category || 'san-pham')}/${toSlug(productData.name || productData.title)}`, 
                  { replace: true, state: { product: productData } }
                );
                return;
              }
            } catch (simpleIdError) {
              console.error('Error fetching by simple ID:', simpleIdError);
            }
          }
        }
        
        if (!productData && category && productName) {
          try {
            console.log(`Searching for product with term: ${productName.replace(/-/g, ' ')}`);
            const queryParams = {
              pageNumber: 1,
              pageSize: 100,
              searchTerm: productName.replace(/-/g, ' ')
            };
            
            const result = await ProductService.getProducts(queryParams);
            
            if (result.products && result.products.length > 0) {
              const exactMatches = result.products.filter(p => 
                toSlug(p.category || '') === category && 
                toSlug(p.title || p.name || '') === productName
              );
              
              if (exactMatches.length > 0) {
                exactMatches.sort((a, b) => {
                  const aIsSimpleId = /^[A-Za-z0-9]{1,10}$/.test(a.id);
                  const bIsSimpleId = /^[A-Za-z0-9]{1,10}$/.test(b.id);
                  
                  if (aIsSimpleId && !bIsSimpleId) return -1;
                  if (!aIsSimpleId && bIsSimpleId) return 1;
                  
                  const aDate = new Date(a.updatedAt || a.createdAt || 0);
                  const bDate = new Date(b.updatedAt || b.createdAt || 0);
                  return bDate - aDate;
                });
                const bestMatch = exactMatches[0];
                try {
                  // Get detailed product information
                  console.log(`Found best match from ${exactMatches.length} matches: ${bestMatch.id}`);
                  const detailedResult = await ProductService.getProductById(bestMatch.id);
                  productData = detailedResult.data;
                } catch (detailError) {
                  // Fallback to basic product info
                  console.log('Using basic product info due to detail fetch error');
                  productData = bestMatch;
                }
              } else {
                const partialMatches = result.products.filter(p => {
                  const productSlug = toSlug(p.title || p.name || '');
                  return productSlug.includes(productName) || productName.includes(productSlug);
                });
                
                if (partialMatches.length > 0) {
                  partialMatches.sort((a, b) => {
                    const aIsSimpleId = /^[A-Za-z0-9]{1,10}$/.test(a.id);
                    const bIsSimpleId = /^[A-Za-z0-9]{1,10}$/.test(b.id);
                    
                    if (aIsSimpleId && !bIsSimpleId) return -1;
                    if (!aIsSimpleId && bIsSimpleId) return 1;
                    
                    // Then sort by updated date
                    const aDate = new Date(a.updatedAt || a.createdAt || 0);
                    const bDate = new Date(b.updatedAt || b.createdAt || 0);
                    return bDate - aDate; // Most recent first
                  });
                  
                  const bestPartialMatch = partialMatches[0];
                  try {
                    console.log(`Found best partial match from ${partialMatches.length} matches: ${bestPartialMatch.id}`);
                    const detailedResult = await ProductService.getProductById(bestPartialMatch.id);
                    productData = detailedResult.data;
                  } catch (detailError) {
                    productData = bestPartialMatch;
                  }
                }
              }
            }
          } catch (searchError) {
            console.error('Error searching for product:', searchError);
          }
        }

        if (productData) {
          setProduct(productData);
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        console.error('Error in product fetch process:', err);
        setError('Có lỗi xảy ra khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, productName, id, navigate, location]);

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
          to={`/${toSlug(product.category || 'san-pham')}`} 
          className="text-gray-500 hover:text-blue-600"
        >
          {product.category || 'Sản phẩm'}
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