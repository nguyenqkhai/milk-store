import React, { useState } from 'react'

const ProductImages = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.thumbnail)
  const images = [product.thumbnail, ...(product.images || [])]

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-lg bg-white shadow-sm'>
        <img
          src={mainImage}
          alt={product.title}
          className='h-[400px] w-full object-contain'
        />
      </div>

      <div className='grid grid-cols-5 gap-2'>
        {images.map((image, index) => (
          <button
            key={index}
            className={`overflow-hidden rounded-md border-2 ${
              mainImage === image ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setMainImage(image)}
          >
            <img
              src={image}
              alt={`${product.title} - Ảnh ${index + 1}`}
              className='h-16 w-full object-cover'
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImages