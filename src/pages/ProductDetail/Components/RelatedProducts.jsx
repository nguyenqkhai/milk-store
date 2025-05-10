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
      </div>
    </div>
  )
}

export default RelatedProducts