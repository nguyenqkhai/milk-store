import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../Products/Components/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductService from '../../../services/Product/ProductServices';
import { useNavigate } from 'react-router-dom';
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
        const filtered = result.products.filter(p =>
          p.id !== product.id && p.id !== product.productid
        ).slice(0, 8)

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
  const navigate = useNavigate();

  // Kiểm tra xem có thể cuộn không
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return

      // Hiển thị/ẩn nút cuộn trái
      setShowLeftArrow(container.scrollLeft > 20)

      // Hiển thị/ẩn nút cuộn phải
      const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 10
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

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
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

  const handleProductClick = (product) => {
    sessionStorage.setItem('scrollPosition', window.scrollY);

    // Simplify navigation to just use the product ID as requested
    navigate(`/product/${product.id}`, {
      state: { product }
    });
  };

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!relatedProducts || relatedProducts.length === 0) return null

  return (
    <div className="mb-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="relative">
        {/* Nút cuộn trái */}
        {showLeftArrow && relatedProducts.length > 4 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md text-gray-700 border border-gray-200 hover:bg-gray-50 transition-opacity"
            style={{ opacity: showLeftArrow ? 1 : 0, pointerEvents: showLeftArrow ? 'auto' : 'none' }}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Container với thanh cuộn ngang */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide pb-4 pt-2 px-2 snap-x scroll-pl-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Padding đầu tiên */}
          <div className="flex-shrink-0 w-1 md:w-3"></div>

          {relatedProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[45%] sm:w-[33%] md:w-[25%] lg:w-[20%] px-2 snap-start"
              style={{
                scrollSnapAlign: 'start',
                animation: `fadeSlideIn 0.5s ease-out ${index * 0.05}s both`
              }}
              onClick={() => handleProductClick(product)}
            >
              <div className="h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white rounded-lg overflow-hidden cursor-pointer">
                <ProductCard product={product} />
              </div>
            </div>
          ))}

          {/* Padding cuối cùng */}
          <div className="flex-shrink-0 w-1 md:w-3"></div>
        </div>

        {/* Nút cuộn phải */}
        {showRightArrow && relatedProducts.length > 4 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md text-gray-700 border border-gray-200 hover:bg-gray-50 transition-opacity"
            style={{ opacity: showRightArrow ? 1 : 0, pointerEvents: showRightArrow ? 'auto' : 'none' }}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Hiệu ứng gradient làm mờ 2 bên */}
      <div className="absolute top-16 bottom-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
      <div className="absolute top-16 bottom-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

      {/* CSS cho hiệu ứng */}
      <style jsx="true">{`
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