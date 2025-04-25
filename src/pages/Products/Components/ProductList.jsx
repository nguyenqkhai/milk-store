import React from 'react'
import { productPageConfig } from '../../../components/products/data'
import ProductCard from './ProductCard'

const ProductList = ({ products, selectedCategory, onAddToCart }) => {
  return (
    <>
      <p className='mb-4 text-sm text-gray-600'>
        Hiển thị {products.length} sản phẩm{' '}
        {selectedCategory !== 'Tất cả'
          ? `trong danh mục ${selectedCategory}`
          : ''}
      </p>

      <div className={productPageConfig.gridClasses}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            allProducts={products}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList
