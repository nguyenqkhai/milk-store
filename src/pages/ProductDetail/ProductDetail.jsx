import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectProducts,
} from '../../redux/products/productSlice'
import { toSlug } from '../../utils/slug'
import ProductImages from './Components/ProductImages'
import ProductInfo from './Components/ProductInfo'
import RelatedProducts from './Components/RelatedProducts'
import LoadingState from '../Products/Components/LoadingState'
import ErrorState from '../Products/Components/ErrorState'

const ProductDetail = () => {
  const { slug } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product)
    }
  }, [location.state])

  useEffect(() => {
    if (!product && products.length > 0) {
      const foundProduct = products.find(p => toSlug(p.title) === slug)
      if (foundProduct) {
        setProduct(foundProduct)
      }
    }
  }, [slug, products, product])

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products])

  useEffect(() => {
    if (product && products.length > 0) {
      const related = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [product, products])

  if (loading) return <LoadingState />
  if (error)
    return (
      <ErrorState error={error} onRetry={() => dispatch(fetchProducts())} />
    )
  if (!product) return <ProductNotFound />

  return (
    <div className='container mx-auto mt-20 px-4 py-8'>
      <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
        <ProductImages product={product} />

        <ProductInfo product={product} />
      </div>

      <div className='mb-12'>
        <h2 className='mb-4 text-2xl font-semibold'>Thông tin chi tiết</h2>
        <div className='prose max-w-none rounded-lg bg-white p-6 shadow-sm'>
          <p>{product.description}</p>
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

const ProductNotFound = () => (
  <div className='flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-gray-50 p-8'>
    <svg
      className='mb-4 h-16 w-16 text-gray-400'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
    <p className='mb-1 text-xl font-medium text-gray-800'>
      Không tìm thấy sản phẩm
    </p>
    <p className='mb-4 text-center text-gray-500'>
      Sản phẩm này không tồn tại hoặc đã bị xóa
    </p>
    <a
      href='/product'
      className='rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none'
    >
      Xem tất cả sản phẩm
    </a>
  </div>
)

export default ProductDetail
