import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import LoadingState from './Components/LoadingState';
import ErrorState from './Components/ErrorState';
import Pagination from './Components/Pagination';
import { toSlug } from '../../utils/stringUtils';
import {
  Search,
  Check,
  ChevronDown,
  FilterX,
  SlidersHorizontal,
  Star,
  X
} from 'lucide-react';
import ProductService from '../../services/Product/ProductServices';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Thêm state mới để lưu giá trị tìm kiếm đã xác nhận
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [categories, setCategories] = useState(['Tất cả']);
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [paginationMeta, setPaginationMeta] = useState({
    totalCount: 0,
    totalPages: 0,
    pageSize: 12,
    hasPrevious: false,
    hasNext: false
  });

  const navigate = useNavigate();
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const apiParams = {
          pageNumber: currentPage,
          pageSize: productsPerPage,
          searchTerm: searchQuery,
          sortBy: sortBy === 'default' ? 'ProductName' : sortBy,
          sortAscending: sortBy !== 'price-high-low' && sortBy !== 'discount' && sortBy !== 'rating'
        };

        if (selectedCategory !== 'Tất cả') {
          apiParams.categoryId = selectedCategory;
        }

        const result = await ProductService.getProducts(apiParams);
        if (result && result.products && Array.isArray(result.products)) {
          setProducts(result.products);

          if (result.metadata) {
            setPaginationMeta({
              totalCount: result.metadata.totalCount || 0,
              totalPages: result.metadata.totalPages || 0,
              pageSize: result.metadata.pageSize || productsPerPage,
              hasPrevious: result.metadata.hasPrevious || false,
              hasNext: result.metadata.hasNext || false
            });
          }

          const uniqueCategories = [
            'Tất cả',
            ...new Set(result.products.map(product => product.category))
          ];
          setCategories(uniqueCategories);
        } else {
          throw new Error('Invalid data format received from API');
        }

      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(timer);
  }, [currentPage, productsPerPage, searchQuery, sortBy, selectedCategory]);

  useEffect(() => {
    let currentFilters = [];

    if (selectedCategory !== 'Tất cả') {
      currentFilters.push({ type: 'category', value: selectedCategory });
    }

    if (searchQuery.trim() !== '') {
      currentFilters.push({ type: 'search', value: searchQuery });
    }

    let sortLabel = '';
    switch (sortBy) {
      case 'price-low-high':
        sortLabel = 'Giá thấp đến cao';
        break;
      case 'price-high-low':
        sortLabel = 'Giá cao đến thấp';
        break;
      default:
        break;
    }

    if (sortBy !== 'default' && sortLabel) {
      currentFilters.push({ type: 'sort', value: sortLabel });
    }

    setActiveFilters(currentFilters);
  }, [selectedCategory, searchQuery, sortBy]);

  // Helper functions
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    setSearchQuery(searchText);
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    sessionStorage.setItem('scrollPosition', window.scrollY);

    const isComplexId = /[0-9a-f]{8}-[0-9a-f]{4}/i.test(product.id);
    const productSlug = toSlug(product.title || product.name || '');

    if (isComplexId) {
      navigate(
        `/${toSlug(product.category || 'san-pham')}/${productSlug}?pid=${encodeURIComponent(product.id)}`,
        {
          state: { product }
        }
      );
    } else {
      navigate(
        `/${toSlug(product.category || 'san-pham')}/${productSlug}?pid=${encodeURIComponent(product.id)}`,
        {
          state: { product }
        }
      );
    }
  };

  const removeFilter = (filter) => {
    if (filter.type === 'category') {
      setSelectedCategory('Tất cả');
    } else if (filter.type === 'search') {
      setSearchText('');
      setSearchQuery('');
    } else if (filter.type === 'sort') {
      setSortBy('default');
    }

    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearchText('');
    setSearchQuery('');
    setSelectedCategory('Tất cả');
    setSortBy('default');
    setCurrentPage(1);
    setShowMobileFilters(false);
    setShowCategoryDropdown(false);
    setShowSortDropdown(false);
  };

  const handleClearSearch = () => {
    setSearchText('');
    if (searchQuery) {
      setSearchQuery('');
      setCurrentPage(1);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;

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
                    <span>Danh mục: {selectedCategory}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${showCategoryDropdown ? 'transform rotate-180' : ''}`}
                    />
                  </button>

                  {showCategoryDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-auto">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1); // Reset to first page on category change
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${selectedCategory === category
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <span>{category}</span>
                          {selectedCategory === category && <Check size={16} />}
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
                        sortBy === 'price-low-high' ? 'Sắp xếp: Giá thấp đến cao' :
                          sortBy === 'price-high-low' ? 'Sắp xếp: Giá cao đến thấp' : 'Sắp xếp: Mặc định'}
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
                          onClick={() => {
                            setSortBy(option.value);
                            setCurrentPage(1); // Reset to first page on sort change
                            setShowSortDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${sortBy === option.value
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && <Check size={16} />}
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
                  {paginationMeta.totalCount === 0 ? 0 : ((currentPage - 1) * paginationMeta.pageSize) + 1}-
                  {Math.min(currentPage * paginationMeta.pageSize, paginationMeta.totalCount)}
                </span>
                <span> trên </span>
                <span className="font-medium">{paginationMeta.totalCount}</span>
                <span> sản phẩm</span>
              </div>
              <div className="relative w-48">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1); // Reset to first page on sort change
                  }}
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
              </div>
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
                  {searchQuery ? `Không có sản phẩm nào phù hợp với "${searchQuery}"` : 'Không có sản phẩm nào trong danh mục này'}
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
                    <div key={product.id} onClick={() => handleProductClick(product)}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={paginationMeta.totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={paginationMeta.pageSize}
                    totalItems={paginationMeta.totalCount}
                    hasPrevious={paginationMeta.hasPrevious}
                    hasNext={paginationMeta.hasNext}
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