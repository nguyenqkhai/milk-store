import React, { useState, useEffect } from 'react'

const ProductImages = ({ product }) => {
  // Process images from the product
  const processImages = () => {
    const imageList = [];
    const seenUrls = new Set(); // To track URLs we've already added

    // Add the thumbnail as the first image
    if (product.thumbnail) {
      imageList.push(product.thumbnail);
      seenUrls.add(product.thumbnail);
    }

    // Add images from imageDTOs if available (these are already sorted by order)
    if (product.imageDTOs && Array.isArray(product.imageDTOs)) {
      product.imageDTOs.forEach(img => {
        if (img.imageData && !seenUrls.has(img.imageData)) {
          imageList.push(img.imageData);
          seenUrls.add(img.imageData);
        }
      });
    }
    // Fallback to legacy images array if imageDTOs is not available
    else if (product.images && Array.isArray(product.images)) {
      product.images.forEach(imageUrl => {
        if (!seenUrls.has(imageUrl)) {
          imageList.push(imageUrl);
          seenUrls.add(imageUrl);
        }
      });
    }

    return imageList;
  };

  const imageList = processImages();
  const [mainImage, setMainImage] = useState(imageList.length > 0 ? imageList[0] : '');

  // Update main image if product changes
  useEffect(() => {
    const images = processImages();
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [product]);

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-lg bg-white shadow-sm'>
        <img
          src={mainImage}
          alt={product.title}
          className='h-[400px] w-full object-contain'
        />
      </div>

      {imageList.length > 1 && (
        <div className='grid grid-cols-5 gap-2'>
          {imageList.map((image, index) => (
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
      )}
    </div>
  )
}

export default ProductImages