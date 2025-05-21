import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../Products/Components/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductService from '../../../services/Product/ProductServices'
import { useNavigate } from 'react-router-dom'
import LoadingState from '../../Products/Components/LoadingState'

const RelatedProducts = ({ product, title = 'Sản phẩm liên quan' }) => {
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch related products from API
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return

      try {
        setLoading(true)

        // Use the product's category or brand to find related products
        // You might need to adjust these query parameters based on your API
        const queryParams = {
          pageNumber: 1,
          pageSize: 20,
        }

        if (product.brand) {
          // Assuming brand is either a string or an object with a name property
          // const brandName = typeof product.brand === 'object' ? product.brand.name : product.brand
          // queryParams.searchTerm = brandName
        }

        const result = await ProductService.getProducts(queryParams)

        // Filter out the current product from related products
        const filtered = result.products
          .filter(p => p.id !== product.id && p.id !== product.productid)
          .slice(0, 8)

        setRelatedProducts(filtered)
      } catch (error) {
        console.error('Error fetching related products:', error)
        // Fallback to empty array in case of error
        setRelatedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [product])
  const navigate = useNavigate()

  // Kiểm tra xem có thể cuộn không
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return

      // Hiển thị/ẩn nút cuộn trái
      setShowLeftArrow(container.scrollLeft > 20)

      // Hiển thị/ẩn nút cuộn phải
      const isAtEnd =
        Math.ceil(container.scrollLeft + container.clientWidth) >=
        container.scrollWidth - 10
      setShowRightArrow(!isAtEnd)
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      checkScroll()

      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(container)

      return () => {
        container.removeEventListener('scroll', checkScroll)
        resizeObserver.disconnect()
      }
    }
  }, [relatedProducts])

  const scroll = direction => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const handleTouchStart = e => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && showRightArrow) {
      scroll('right')
    } else if (isRightSwipe && showLeftArrow) {
      scroll('left')
    }
  }

  const handleProductClick = product => {
    sessionStorage.setItem('scrollPosition', window.scrollY)

    // Simplify navigation to just use the product ID as requested
    navigate(`/san-pham/${product.id}`, {
      state: { product },
    })
  }

  if (loading) {
    return (
      <div className='mb-8'>
        <h2 className='mb-6 text-2xl font-semibold text-gray-800'>{title}</h2>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {[1, 2, 3, 4].map(item => (
            <div key={item} className='animate-pulse'>
              <div className='mb-2 h-48 rounded-lg bg-gray-200'></div>
              <div className='mb-2 h-4 w-3/4 rounded bg-gray-200'></div>
              <div className='h-4 w-1/2 rounded bg-gray-200'></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!relatedProducts || relatedProducts.length === 0) return null

  return (
    <div className='relative mt-12 mb-8 overflow-hidden'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-gray-800'>{title}</h2>
      </div>

      <div className='relative'>
        {/* Nút cuộn trái */}
        {showLeftArrow && relatedProducts.length > 4 && (
          <button
            onClick={() => scroll('left')}
            className='absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md transition-opacity hover:bg-gray-50'
            style={{
              opacity: showLeftArrow ? 1 : 0,
              pointerEvents: showLeftArrow ? 'auto' : 'none',
            }}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Container với thanh cuộn ngang */}
        <div
          ref={scrollContainerRef}
          className='scrollbar-hide flex snap-x scroll-pl-6 overflow-x-auto px-2 pt-2 pb-4'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Padding đầu tiên */}
          <div className='w-1 flex-shrink-0 md:w-3'></div>

          {relatedProducts.map((product, index) => (
            <div
              key={product.id}
              className='w-[45%] flex-shrink-0 snap-start px-2 sm:w-[33%] md:w-[25%] lg:w-[20%]'
              style={{
                scrollSnapAlign: 'start',
                animation: `fadeSlideIn 0.5s ease-out ${index * 0.05}s both`,
              }}
              onClick={() => handleProductClick(product)}
            >
              <div className='h-full transform cursor-pointer overflow-hidden rounded-lg bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
                <ProductCard product={product} />
              </div>
            </div>
          ))}

          {/* Padding cuối cùng */}
          <div className='w-1 flex-shrink-0 md:w-3'></div>
        </div>

        {/* Nút cuộn phải */}
        {showRightArrow && relatedProducts.length > 4 && (
          <button
            onClick={() => scroll('right')}
            className='absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-md transition-opacity hover:bg-gray-50'
            style={{
              opacity: showRightArrow ? 1 : 0,
              pointerEvents: showRightArrow ? 'auto' : 'none',
            }}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Hiệu ứng gradient làm mờ 2 bên */}
      <div className='pointer-events-none absolute top-16 bottom-0 left-0 w-8 bg-gradient-to-r from-white to-transparent'></div>
      <div className='pointer-events-none absolute top-16 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent'></div>

      {/* CSS cho hiệu ứng */}
      <style jsx='true'>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0.5;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default RelatedProducts
