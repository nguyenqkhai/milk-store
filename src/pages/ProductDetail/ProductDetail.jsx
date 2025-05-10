import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import ProductImages from './Components/ProductImages'
import ProductInfo from './Components/ProductInfo'
import RelatedProducts from './Components/RelatedProducts'
import LoadingState from '../Products/Components/LoadingState'
import ErrorState from '../Products/Components/ErrorState'
import { toSlug } from '../../utils/stringUtils'
import { fetchProducts, fetchProductById } from '../../services/productService'

const ProductDetail = () => {
  const { category, productName } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true);

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