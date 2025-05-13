<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import ProductCard from '../../Products/Components/ProductCard'
import { fetchProducts } from '../../../services/productService'
import LoadingState from '../../Products/Components/LoadingState'

const RelatedProducts = ({ currentProductId, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchProducts()

        // Filter products by category and exclude current product
        let related = allProducts.filter(
          product => product.category === category && product.id !== currentProductId
        )

        // Limit to 4 products
        related = related.slice(0, 4)

        setRelatedProducts(related)
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }

    getRelatedProducts()
  }, [category, currentProductId])

  if (loading) return <LoadingState />
  if (relatedProducts.length === 0) return null

  return (
    <div className='mb-8'>
      <h2 className='mb-6 text-2xl font-semibold'>Sản phẩm liên quan</h2>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} allProducts={relatedProducts} />
        ))}
=======
import React, { useRef, useEffect, useState } from 'react'
import ProductCard from '../../Products/Components/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const RelatedProducts = ({ products, title = 'Sản phẩm liên quan' }) => {
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  
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
      // Kiểm tra ban đầu
      checkScroll()
      
      // Resize observer để kiểm tra lại khi kích thước thay đổi
      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(container)
      
      return () => {
        container.removeEventListener('scroll', checkScroll)
        resizeObserver.disconnect()
      }
    }
  }, [products])
  
  // Hàm xử lý cuộn
  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return
    
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
  
  // Mobile touch handlers
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
  
  if (!products || products.length === 0) return null
  
  return (
    <div className="mb-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
      </div>
      
      <div className="relative">
        {/* Nút cuộn trái */}
        {showLeftArrow && products.length > 4 && (
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
          
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[45%] sm:w-[33%] md:w-[25%] lg:w-[20%] px-2 snap-start"
              style={{ 
                scrollSnapAlign: 'start',
                animation: `fadeSlideIn 0.5s ease-out ${index * 0.05}s both` 
              }}
            >
              <div className="h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white rounded-lg overflow-hidden">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
          
          {/* Padding cuối cùng */}
          <div className="flex-shrink-0 w-1 md:w-3"></div>
        </div>
        
        {/* Nút cuộn phải */}
        {showRightArrow && products.length > 4 && (
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