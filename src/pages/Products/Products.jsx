import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import LoadingState from './Components/LoadingState';
import ErrorState from './Components/ErrorState';
import Pagination from './Components/Pagination';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [categories, setCategories] = useState(['Tất cả']);
  const [sortBy, setSortBy] = useState('default');
  const productsPerPage = 12;

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Mock data - in a real app, this would be an API call
        const mockProducts = [
          {
            id: 1,
            title: 'Sữa Tươi Có Đường Vinamilk 1L',
            category: 'Sữa tươi',
            description: 'Sữa tươi tiệt trùng có đường Vinamilk giàu dinh dưỡng',
            price: 30.000,
            rating: 4.7,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 2,
            title: 'Sữa Tươi Không Đường Vinamilk 1L',
            category: 'Sữa tươi',
            description: 'Sữa tươi tiệt trùng không đường Vinamilk, tốt cho sức khỏe',
            price: 30.000,
            rating: 4.6,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 5
          },
          {
            id: 3,
            title: 'Sữa Hạt Óc Chó Vinamilk',
            category: 'Sữa hạt',
            description: 'Sữa óc chó thơm ngon, bổ dưỡng từ Vinamilk',
            price: 32.000,
            rating: 4.8,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 10
          },
          {
            id: 4,
            title: 'Sữa Đậu Nành Vinamilk 1L',
            category: 'Sữa hạt',
            description: 'Sữa đậu nành nguyên chất, ít đường',
            price: 27.000,
            rating: 4.5,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 5,
            title: 'Sữa Tươi TH True Milk 1L',
            category: 'Sữa tươi',
            description: 'Sữa tươi sạch từ trang trại TH',
            price: 31.000,
            rating: 4.6,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 6,
            title: 'Sữa Tươi Ít Đường TH True Milk 1L',
            category: 'Sữa tươi',
            description: 'Sữa ít đường từ thương hiệu TH True Milk',
            price: 31.000,
            rating: 4.7,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 3
          },
          {
            id: 7,
            title: 'Sữa Hạt TH True Nut Óc Chó',
            category: 'Sữa hạt',
            description: 'Sữa hạt óc chó thơm ngon từ TH True Nut',
            price: 34.000,
            rating: 4.6,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 5
          },
          {
            id: 8,
            title: 'Sữa Đậu Đen TH True Nut',
            category: 'Sữa hạt',
            description: 'Sữa đậu đen nguyên chất, thơm ngon và lành mạnh',
            price: 35.000,
            rating: 4.4,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 9,
            title: 'Sữa Tươi Có Đường Dutch Lady 1L',
            category: 'Sữa tươi',
            description: 'Sữa tươi thơm ngon từ Hà Lan',
            price: 29.000,
            rating: 4.5,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 10,
            title: 'Sữa Tươi Không Đường Dutch Lady 1L',
            category: 'Sữa tươi',
            description: 'Sữa không đường phù hợp người ăn kiêng',
            price: 29.000,
            rating: 4.3,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 11,
            title: 'Sữa Bắp Nutifood 1L',
            category: 'Sữa hạt',
            description: 'Sữa bắp Nutifood thơm ngon tự nhiên',
            price: 28.000,
            rating: 4.4,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 12,
            title: 'Sữa Dinh Dưỡng Nuti IQ Gold',
            category: 'Sữa bột',
            description: 'Sữa dành cho trẻ em phát triển trí tuệ và chiều cao',
            price: 250.000,
            rating: 4.9,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 15
          },
          {
            id: 13,
            title: 'Sữa Dielac Alpha Vinamilk 900g',
            category: 'Sữa bột',
            description: 'Sữa bột cho trẻ từ 1-6 tuổi hỗ trợ phát triển trí não',
            price: 220.000,
            rating: 4.7,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 10
          },
          {
            id: 14,
            title: 'Sữa Dinh Dưỡng GrowPLUS+ 1L',
            category: 'Sữa dinh dưỡng',
            description: 'Hỗ trợ tăng cân và chiều cao cho trẻ em suy dinh dưỡng',
            price: 33.000,
            rating: 4.6,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 7
          },
          {
            id: 15,
            title: 'Sữa Nuti EnPlus Diamond',
            category: 'Sữa dinh dưỡng',
            description: 'Sữa dành cho người lớn tuổi và người bệnh',
            price: 230.000,
            rating: 4.7,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 5
          },
          {
            id: 16,
            title: 'Sữa Sure Prevent Gold Vinamilk',
            category: 'Sữa dinh dưỡng',
            description: 'Hỗ trợ tim mạch, bổ sung canxi cho người cao tuổi',
            price: 255.000,
            rating: 4.8,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 10
          },
          {
            id: 17,
            title: 'Sữa Đặc Ông Thọ Trắng 380g',
            category: 'Sữa đặc',
            description: 'Sữa đặc có đường ông Thọ dùng pha cà phê hoặc làm bánh',
            price: 25.000,
            rating: 4.9,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 18,
            title: 'Sữa Đặc Ông Thọ Xanh 380g',
            category: 'Sữa đặc',
            description: 'Sữa đặc ít đường thích hợp với người ăn kiêng',
            price: 26.000,
            rating: 4.6,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 0
          },
          {
            id: 19,
            title: 'Sữa Tươi Nguyên Kem Meadow Fresh 1L',
            category: 'Sữa tươi',
            description: 'Sữa nguyên kem nhập khẩu từ New Zealand',
            price: 35.000,
            rating: 4.5,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 8
          },
          {
            id: 20,
            title: 'Sữa Hạt Ngũ Cốc TH True Nut',
            category: 'Sữa hạt',
            description: 'Kết hợp dinh dưỡng từ 5 loại hạt tốt cho sức khỏe',
            price: 36.000,
            rating: 4.7,
            thumbnail: 'https://product.hstatic.net/1000141988/product/sua_tuoi_tiet_trung_co_duong_vinamilk_viet_nam__1l__2f553e41e7f54abba37116456aa94db3_grande.png',
            discountPercentage: 6
          }
        ];
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        
        // Extract unique categories
        const uniqueCategories = [
          'Tất cả',
          ...new Set(mockProducts.map(product => product.category))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to simulate loading
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (selectedCategory !== 'Tất cả') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchText.trim() !== '') {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, selectedCategory, searchText, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
                        ({filteredProducts.length})
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
              {products
                .filter(product => product.rating >= 4.7)
                .slice(0, 4)
                .map(product => (
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
                        to={`/product/${product.id}`}
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
          <div className="mb-6 flex items-center justify-between">
            {/* <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1> */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">Sắp xếp:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded border px-2 py-1 text-sm focus:outline-none"
              >
                <option value="default">Mặc định</option>
                <option value="price-low-high">Giá: Thấp đến Cao</option>
                <option value="price-high-low">Giá: Cao đến Thấp</option>
                <option value="rating">Xếp hạng cao nhất</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
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
                {currentProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    state={{ product, allProducts: products }}
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={productsPerPage}
                  totalItems={filteredProducts.length}
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