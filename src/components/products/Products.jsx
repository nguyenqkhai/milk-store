import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toSlug } from '../../utils/slug'
import SearchBox from './Search'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectFilterProducts,
  selectProducts,
  setFilterProduct,
  setSearchText,
} from '../../redux/products/productSlice'
import { productPageConfig } from '../products/data'
import {
  FiShoppingCart,
  FiHeart,
  FiEye,
  FiFilter,
  FiChevronDown,
} from 'react-icons/fi'

const Product = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const filterProducts = useSelector(selectFilterProducts)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)
  const searchText = useSelector(state => state.products.searchText)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('default')
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        'Tất cả',
        ...new Set(products.map(product => product.category)),
      ]
      setCategories(uniqueCategories)
    }
  }, [products])

  useEffect(() => {
    let filtered = [...products]

    // Lọc theo text search
    if (searchText.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    // Lọc theo danh mục
    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(
        product => product.category === selectedCategory
      )
    }

    // Sắp xếp
    if (sortBy === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    dispatch(setFilterProduct(filtered))
  }, [dispatch, searchText, products, selectedCategory, sortBy])

  const handleSearchChange = text => {
    dispatch(setSearchText(text))
  }

  const handleCategoryChange = category => {
    setSelectedCategory(category)
  }

  const handleSortChange = event => {
    setSortBy(event.target.value)
  }

  if (loading) {
    return (
      <div className='flex min-h-[500px] items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
          <p className='text-lg font-medium text-gray-700'>
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex min-h-[500px] items-center justify-center'>
        <div className='max-w-md rounded-xl bg-red-50 p-6 text-center shadow-md'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <svg
              className='h-8 w-8 text-red-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h3 className='mb-2 text-lg font-semibold text-gray-900'>
            Đã xảy ra lỗi
          </h3>
          <p className='mb-4 text-gray-600'>{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className='rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none'
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Page Header */}
      <div className='mt-20 mb-6 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>
          Sản phẩm của chúng tôi
        </h1>
        <p className='text-gray-600'>
          Khám phá các sản phẩm chất lượng cao với giá cả hợp lý
        </p>
      </div>

      {/* Search Box */}
      <div className='mb-8'>
        <SearchBox
          label='Tìm kiếm sản phẩm'
          placeholder='Nhập tên sản phẩm...'
          onSearchChange={handleSearchChange}
          className='mx-auto max-w-2xl'
        />
      </div>

      {/* Filter & Sort Area */}
      <div className='mb-8 flex flex-col justify-between space-y-4 rounded-lg bg-gray-50 p-4 md:flex-row md:items-center md:space-y-0'>
        {/* Categories - Desktop */}
        <div className='hidden md:block'>
          <div className='flex flex-wrap items-center gap-2'>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
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
                      onClick={() => handleCategoryChange(category)}
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
                  onChange={handleSortChange}
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
              onChange={handleSortChange}
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

      {/* Products Display */}
      {filterProducts.length === 0 ? (
        <div className='flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-gray-50 p-8'>
          <svg
            className='mb-4 h-16 w-16 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p className='mb-1 text-xl font-medium text-gray-800'>
            Không tìm thấy sản phẩm
          </p>
          <p className='mb-4 text-center text-gray-500'>
            {searchText ? (
              <>
                Không tìm thấy sản phẩm nào phù hợp với "
                <span className='font-medium'>{searchText}</span>"
              </>
            ) : (
              'Không có sản phẩm nào trong danh mục này'
            )}
          </p>
          <button
            onClick={() => {
              dispatch(setSearchText(''))
              setSelectedCategory('Tất cả')
            }}
            className='rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none'
          >
            Xem tất cả sản phẩm
          </button>
        </div>
      ) : (
        <>
          <p className='mb-4 text-sm text-gray-600'>
            Hiển thị {filterProducts.length} sản phẩm{' '}
            {selectedCategory !== 'Tất cả'
              ? `trong danh mục ${selectedCategory}`
              : ''}
          </p>

          <div className={productPageConfig.gridClasses}>
            {filterProducts.map(product => (
              <Link
                to={`/product/${toSlug(product.title)}`}
                key={product.id}
                state={{ product }}
                className='group block'
              >
                <div className={productPageConfig.cardClasses}>
                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className='absolute z-10 rounded-br-lg bg-red-500 px-2 py-1 text-xs font-bold text-white'>
                      -{Math.round(product.discountPercentage)}%
                    </div>
                  )}

                  {/* Product Image */}
                  <div className='relative overflow-hidden'>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className={productPageConfig.imageClasses}
                    />

                    {/* Overlay with Actions */}
                    <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100'>
                      <button className='flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-blue-600 hover:text-white'>
                        <FiEye className='h-4 w-4' />
                      </button>
                      <button className='flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-blue-600 hover:text-white'>
                        <FiHeart className='h-4 w-4' />
                      </button>
                      <button className='flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:bg-blue-600 hover:text-white'>
                        <FiShoppingCart className='h-4 w-4' />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className='flex flex-1 flex-col p-4'>
                    {/* Category */}
                    <p className='mb-1 text-xs font-medium tracking-wider text-blue-600 uppercase'>
                      {product.category}
                    </p>

                    {/* Title */}
                    <h2 className={productPageConfig.titleClasses}>
                      {product.title}
                    </h2>

                    {/* Ratings */}
                    <div className='mb-2 flex items-center'>
                      <div className='flex text-yellow-400'>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            fill={
                              i < Math.round(product.rating)
                                ? 'currentColor'
                                : 'none'
                            }
                            viewBox='0 0 24 24'
                            className='h-4 w-4'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                            />
                          </svg>
                        ))}
                      </div>
                      <span className='ml-1 text-xs text-gray-500'>
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className='mt-auto'>
                      {product.discountPercentage > 0 ? (
                        <div className='flex items-center'>
                          <p
                            className={`${productPageConfig.priceClasses} text-blue-600`}
                          >
                            {Math.round(
                              product.price *
                                (1 - product.discountPercentage / 100)
                            ).toLocaleString()}{' '}
                            đ
                          </p>
                          <p className='ml-2 text-sm text-gray-400 line-through'>
                            {product.price.toLocaleString()} đ
                          </p>
                        </div>
                      ) : (
                        <p className={productPageConfig.priceClasses}>
                          {product.price.toLocaleString()} đ
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div className='cursor-pointer px-4 pb-4'>
                    <button className={productPageConfig.buttonClasses}>
                      <span className='flex items-center justify-center gap-2'>
                        <FiShoppingCart className='h-4 w-4' />
                        Mua ngay
                      </span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Product
