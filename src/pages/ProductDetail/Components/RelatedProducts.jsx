import React from 'react'
import ProductCard from '../../Products/Components/ProductCard'

const RelatedProducts = ({ products }) => {
  if (products.length === 0) return null

  return (
    <div className='mb-8'>
      <h2 className='mb-6 text-2xl font-semibold'>Sản phẩm liên quan</h2>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
