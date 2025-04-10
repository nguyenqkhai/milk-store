import React, { useState } from 'react'
import { FiFilter, FiChevronDown } from 'react-icons/fi'

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  return (
    <div className='mb-8 flex flex-col justify-between space-y-4 rounded-lg bg-gray-50 p-4 md:flex-row md:items-center md:space-y-0'>
      {/* Categories - Desktop */}
      <div className='hidden md:block'>
        <div className='flex flex-wrap items-center gap-2'>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className='relative md:hidden'>
        <button
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          className='flex w-full items-center justify-between rounded-lg bg-white px-4 py-2.5 text-gray-700 shadow-sm'
        >
          <div className='flex items-center'>
            <FiFilter className='mr-2 h-5 w-5 text-gray-500' />
            <span className='font-medium'>Lọc & Sắp xếp</span>
          </div>
          <FiChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isFilterMenuOpen && (
          <div className='absolute right-0 left-0 z-10 mt-2 rounded-lg bg-white p-4 shadow-lg'>
            <div className='mb-4'>
              <p className='mb-2 font-medium text-gray-700'>Danh mục:</p>
              <div className='flex flex-wrap gap-2'>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className='mb-2 font-medium text-gray-700'>Sắp xếp theo:</p>
              <select
                value={sortBy}
                onChange={onSortChange}
                className='block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'
              >
                <option value='default'>Mặc định</option>
                <option value='price-low-high'>Giá: Thấp - Cao</option>
                <option value='price-high-low'>Giá: Cao - Thấp</option>
                <option value='rating'>Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Sorting - Desktop */}
      <div className='hidden md:block'>
        <div className='flex items-center gap-2'>
          <label htmlFor='sort' className='text-sm font-medium text-gray-700'>
            Sắp xếp theo:
          </label>
          <select
            id='sort'
            value={sortBy}
            onChange={onSortChange}
            className='rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'
          >
            <option value='default'>Mặc định</option>
            <option value='price-low-high'>Giá: Thấp - Cao</option>
            <option value='price-high-low'>Giá: Cao - Thấp</option>
            <option value='rating'>Đánh giá cao nhất</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters
