import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import LoadingState from './Components/LoadingState';
import ErrorState from './Components/ErrorState';
import Pagination from './Components/Pagination';
import { fetchProducts, fetchPaginatedProducts } from '../../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [categories, setCategories] = useState(['Tất cả']);
  const [sortBy, setSortBy] = useState('ProductName');
  const [sortAscending, setSortAscending] = useState(true);
  const [metadata, setMetadata] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPrevious: false,
    hasNext: false
  });
  const pageSize = 10;

  // Fetch featured products for sidebar
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        // Call the API to get a small set of products for the featured section
        const productData = await fetchProducts();

        // Get products with high ratings for the featured section
        const featured = productData
          .filter(product => product.rating >= 4.5)
          .slice(0, 4);

        setFeaturedProducts(featured);

        // Extract unique categories
        const uniqueCategories = [
          'Tất cả',
          ...new Set(productData.map(product => product.category))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      }
    };

    getFeaturedProducts();
  }, []);

  // Fetch paginated products
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        // Map frontend sort options to backend sort fields
        let backendSortBy = 'ProductName';
        let backendSortAscending = true;

        if (sortBy === 'price-low-high') {
          backendSortBy = 'PriceActive';
          backendSortAscending = true;
        } else if (sortBy === 'price-high-low') {
          backendSortBy = 'PriceActive';
          backendSortAscending = false;
        } else if (sortBy === 'rating') {
          backendSortBy = 'ProductName'; // Backend doesn't support rating sort, fallback to name
          backendSortAscending = true;
        } else if (sortBy === 'default') {
          backendSortBy = 'ProductName';
          backendSortAscending = true;
        }

        // Prepare search parameters
        const searchParams = {
          pageNumber: currentPage,
          pageSize: pageSize,
          sortBy: backendSortBy,
          sortAscending: backendSortAscending
        };

        // Add search term if provided
        if (searchText.trim() !== '') {
          searchParams.searchTerm = searchText.trim();
        }

        // Add category filter if selected
        if (selectedCategory !== 'Tất cả') {
          // Note: Backend expects categoryId, but we're using category names
          // This is a simplification - in a real app, you'd map category names to IDs
          // searchParams.categoryId = selectedCategory;
        }

        // Call the API with the search parameters
        const result = await fetchPaginatedProducts(searchParams);

        setProducts(result.items);
        setMetadata(result.metadata);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage, searchText, selectedCategory, sortBy, pageSize]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/4 md:pr-6 mb-6 md:mb-0">
          {/* Search Box */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category} className="flex items-center">
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`text-sm w-full text-left py-1 ${
                      selectedCategory === category
                        ? 'font-semibold text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {category}
                    {selectedCategory === category && (
                      <span className="ml-1 text-xs">
                        ({metadata.totalCount})
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter by Price */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Lọc theo giá</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSortBy('price-low-high')}
                className={`block px-3 py-2 text-sm rounded border ${
                  sortBy === 'price-low-high'
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Giá: Thấp đến Cao
              </button>
              <button
                onClick={() => setSortBy('price-high-low')}
                className={`block px-3 py-2 text-sm rounded border ${
                  sortBy === 'price-high-low'
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Giá: Cao đến Thấp
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`block px-3 py-2 text-sm rounded border ${
                  sortBy === 'rating'
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Xếp hạng cao nhất
              </button>
              <button
                onClick={() => setSortBy('default')}
                className={`block px-3 py-2 text-sm rounded border ${
                  sortBy === 'default'
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Mặc định
              </button>
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <h3 className="text-lg font-medium mb-3">Sản phẩm nổi bật</h3>
            <div className="space-y-4">
              {featuredProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/san-pham/${product.id}`}
                      state={{ product, allProducts: products }}
                      className="text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                      {product.title}
                    </Link>
                    <p className="text-sm font-medium text-blue-600">
                      {product.price.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">

          {products.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
              <p className="mt-2 text-gray-500">
                {searchText ? `Không có sản phẩm nào phù hợp với "${searchText}"` : 'Không có sản phẩm nào trong danh mục này'}
              </p>
              <button
                onClick={() => {
                  setSearchText('');
                  setSelectedCategory('Tất cả');
                  setSortBy('default');
                }}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Hiển thị tất cả sản phẩm
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/san-pham/${product.id}`}
                    state={{ product, allProducts: products }}
                  >
                    <ProductCard product={product} renderLink={false} allProducts={products} />
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {metadata.totalPages > 1 && (
                <Pagination
                  currentPage={metadata.pageNumber}
                  totalPages={metadata.totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={pageSize}
                  totalItems={metadata.totalCount}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;