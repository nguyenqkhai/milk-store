import React, { useState } from 'react'

const ProductImages = ({ product }) => {
  // Use the first image as the main image initially
  const [mainImage, setMainImage] = useState(
    product.thumbnail || (product.images && product.images.length > 0 ? product.images[0].url : '')
  )
  
  // Create an array of images for the thumbnails
  // If product has an images array, use that; otherwise create an array with just the thumbnail
  const imageList = product.images 
    ? product.images.map(img => img.url) 
    : product.thumbnail 
      ? [product.thumbnail] 
      : []

  // If there are no images, show a placeholder
  if (imageList.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm flex items-center justify-center">
        <div className="text-gray-400 p-8">Không có hình ảnh</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm border">
        <img
          src={mainImage}
          alt={product.title || product.name}
          className="h-[400px] w-full object-contain p-2"
        />
      </div>

      {/* Thumbnails - only show if we have more than one image */}
      {imageList.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              className={`overflow-hidden rounded-md border-2 ${
                mainImage === image ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => setMainImage(image)}
            >
              <img
                src={image}
                alt={`${product.title || product.name} - Ảnh ${index + 1}`}
                className="h-16 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImages