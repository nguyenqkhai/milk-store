import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectFilterProducts,
  selectProducts,
  setFilterProduct,
  setSearchText,
} from '../../redux/products/productSlice'
import ProductFilters from './Components/ProductFilters'
import ProductList from './Components/ProductList'
import NotFoundProduct from './Components/NotFoundProduct'
import LoadingState from './Components/LoadingState'
import ErrorState from './Components/ErrorState'

const Products = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const filterProducts = useSelector(selectFilterProducts)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)
  const searchText = useSelector(state => state.products.searchText)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('default')

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

  if (loading) return <LoadingState />
  if (error)
    return (
      <ErrorState error={error} onRetry={() => dispatch(fetchProducts())} />
    )

  return (
    <div className='container mx-auto mt-20 px-4 py-8'>
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      {filterProducts.length === 0 ? (
        <NotFoundProduct
          searchText={searchText}
          onReset={() => {
            dispatch(setSearchText(''))
            setSelectedCategory('Tất cả')
          }}
        />
      ) : (
        <ProductList
          products={filterProducts}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  )
}

export default Products
