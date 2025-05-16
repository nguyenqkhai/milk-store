import React, { useState, useEffect } from 'react';
import ProductCard from './Components/ProductCard';
import LoadingState from './Components/LoadingState';
import ErrorState from './Components/ErrorState';
import Pagination from './Components/Pagination';
import {
  Search,
  Check,
  ChevronDown,
  FilterX,
  SlidersHorizontal,
  Star,
  X
} from 'lucide-react';
import { useProductStore } from './ProductStore';

const Products = () => {
  const [searchText, setSearchText] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, value: 'Tất cả' });
  const {
    products,
    loading,
    error,
    pagination,
    filters,
    fetchProducts,
    updateFilters,
    changePage,
    fetchCategories,
    categories
  } = useProductStore();

  useEffect(() => {
    fetchCategories()
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let currentFilters = [];

    if (selectedCategory.id !== null) {
      currentFilters.push({ type: 'category', value: selectedCategory.value });
    }

    if (filters.searchTerm) {
      currentFilters.push({ type: 'search', value: filters.searchTerm });
    }

    let sortLabel = '';
    switch (filters.sortBy) {
      case 'priceActive':
        sortLabel = filters.sortAscending ? 'Giá thấp đến cao' : 'Giá cao đến thấp';
        break;
      case 'ProductName':
        sortLabel = 'Tên sản phẩm';
        break;
      default:
        break;
    }

    if (filters.sortBy !== 'ProductName' || !filters.sortAscending) {
      currentFilters.push({ type: 'sort', value: sortLabel });
    }

    setActiveFilters(currentFilters);
  }, [filters, selectedCategory]);

  const handlePageChange = (pageNumber) => {
    changePage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    updateFilters({ searchTerm: searchText });
  };

  const removeFilter = (filter) => {
    if (filter.type === 'category') {
      setSelectedCategory({ id: null, value: 'Tất cả' });
      updateFilters({ categoryId: null });
    } else if (filter.type === 'search') {
      setSearchText('');
      updateFilters({ searchTerm: '' });
    } else if (filter.type === 'sort') {
      updateFilters({
        sortBy: 'ProductName',
        sortAscending: true
      });
    }
  };

  const resetAllFilters = () => {
    setSearchText('');
    setSelectedCategory({ id: null, value: 'Tất cả' });
    setShowMobileFilters(false);
    setShowCategoryDropdown(false);
    setShowSortDropdown(false);

    updateFilters({
      categoryId: null,
      trendId: null,
      searchTerm: '',
      sortBy: 'ProductName',
      sortAscending: true
    });
  };

  const handleClearSearch = () => {
    setSearchText('');
    updateFilters({ searchTerm: '' });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateFilters({
      categoryId: category.id
    });
    setShowCategoryDropdown(false);
  };

  const handleSortChange = (sortOption) => {
    let sortBy = 'ProductName';
    let sortAscending = true;

    switch (sortOption) {
      case 'price-low-high':
        sortBy = 'price-low-high';
        sortAscending = true;
        break;
      case 'price-high-low':
        sortBy = 'price-high-low';
        sortAscending = false;
        break;
      default:
        sortBy = 'ProductName';
        sortAscending = true;
    }

    updateFilters({ sortBy, sortAscending });
    setShowSortDropdown(false);
  };

  if (loading && !products.length) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchProducts} />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile search & filter toggle */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </button>
            {searchText && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <X size={16} />
              </button>
            )}
          </form>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center justify-center h-10 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal size={18} className="mr-1" />
            Lọc
          </button>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Lọc theo:</span>
            {activeFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                <span>{filter.value}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-1 p-1 rounded-full hover:bg-blue-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={resetAllFilters}
              className="ml-2 text-sm text-red-600 hover:text-red-800 flex items-center"
            >
              <FilterX size={16} className="mr-1" />
              Xóa tất cả
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Hidden on mobile unless toggled */}
          <div className={`lg:w-1/4 lg:pr-8 lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:sticky lg:top-4 lg:self-start`}>
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h3 className="text-lg font-medium">Bộ lọc</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Search Box - Hidden on mobile */}
              <div className="mb-6 hidden md:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={18} />
                  </button>
                  {searchText && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </form>
              </div>

              {/* Categories Dropdown */}
              <div className="mb-6">
                <div className="relative">
                  <button
                    className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    <span>Danh mục: {selectedCategory.value}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${showCategoryDropdown ? 'transform rotate-180' : ''}`}
                    />
                  </button>

                  {showCategoryDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-auto">
                      {categories.map(category => (
                        <button
                          key={category.id || 'all'}
                          onClick={() => handleCategoryChange(category)}
                          className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${selectedCategory.id === category.id
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <span>{category.value}</span>
                          {selectedCategory.id === category.id && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sort Options Dropdown */}
              <div className="mb-6">
                <div className="relative">
                  <button
                    className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <span>
                      {
                        filters.sortBy === 'priceActive' && filters.sortAscending ? 'Sắp xếp: Giá thấp đến cao' :
                          filters.sortBy === 'priceActive' && !filters.sortAscending ? 'Sắp xếp: Giá cao đến thấp' :
                            'Sắp xếp: Mặc định'
                      }
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${showSortDropdown ? 'transform rotate-180' : ''}`}
                    />
                  </button>

                  {showSortDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200">
                      {[
                        { value: 'default', label: 'Mặc định' },
                        { value: 'price-low-high', label: 'Giá: Thấp đến Cao' },
                        { value: 'price-high-low', label: 'Giá: Cao đến Thấp' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${(option.value === 'price-low-high' && filters.sortBy === 'priceActive' && filters.sortAscending) ||
                              (option.value === 'price-high-low' && filters.sortBy === 'priceActive' && !filters.sortAscending) ||
                              (option.value === 'default' && filters.sortBy === 'ProductName')
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <span>{option.label}</span>
                          {
                            (option.value === 'price-low-high' && filters.sortBy === 'priceActive' && filters.sortAscending) ||
                            (option.value === 'price-high-low' && filters.sortBy === 'priceActive' && !filters.sortAscending) ||
                            (option.value === 'default' && filters.sortBy === 'ProductName') && <Check size={16} />
                          }
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Promotion Filters */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Khuyến mãi</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-md">
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mr-2">%</span>
                      <span className="text-sm text-gray-700">Đang giảm giá</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">
                      {products.filter(p => p.discountPercentage > 0).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-700">Đánh giá 4.5+</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {products.filter(p => p.rating >= 4.5).length}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Stats - Desktop */}
            <div className="hidden md:flex justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="text-sm text-gray-600">
                <span>Hiển thị </span>
                <span className="font-medium">
                  {pagination.totalItems === 0 ? 0 : ((pagination.currentPage - 1) * pagination.pageSize) + 1}-
                  {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
                </span>
                <span> trên </span>
                <span className="font-medium">{pagination.totalItems}</span>
                <span> sản phẩm</span>
              </div>
              {/* <div className="relative w-48">
                <select
                  value={
                    filters.sortBy === 'ProductName' ? 'default' : 
                    filters.sortBy === 'priceActive' && filters.sortAscending ? 'price-low-high' : 'price-high-low'
                  }
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="default">Sắp xếp: Mặc định</option>
                  <option value="price-low-high">Giá: Thấp đến Cao</option>
                  <option value="price-high-low">Giá: Cao đến Thấp</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div> */}
            </div>

            {products.length === 0 ? (
              <div className="rounded-lg bg-white p-8 shadow-sm text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                  alt="Không tìm thấy sản phẩm"
                  className="w-20 h-20 mx-auto opacity-70"
                />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
                <p className="mt-2 text-gray-500">
                  {filters.searchTerm ? `Không có sản phẩm nào phù hợp với "${filters.searchTerm}"` : 'Không có sản phẩm nào trong danh mục này'}
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={pagination.pageSize}
                    totalItems={pagination.totalItems}
                    hasPrevious={pagination.currentPage > 1}
                    hasNext={pagination.currentPage < pagination.totalPages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;