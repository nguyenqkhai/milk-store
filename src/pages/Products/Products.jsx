import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './Components/ProductCard';
import LoadingState from './Components/LoadingState';
import ErrorState from './Components/ErrorState';
import Pagination from './Components/Pagination';
<<<<<<< HEAD
import { fetchProducts, fetchPaginatedProducts } from '../../services/productService';
=======
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
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b

const Products = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [categories, setCategories] = useState(['Tất cả']);
<<<<<<< HEAD
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
=======
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  const navigate = useNavigate();
  const productsPerPage = 12;

  // Mock data - replace with actual API call in production
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
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b

  // Fetch featured products for sidebar
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
<<<<<<< HEAD
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
=======
        setLoading(true);
        
        // Thêm thương hiệu vào mỗi sản phẩm
        const productsWithBrands = mockProducts.map(product => {
          let brand = 'Vinamilk';
          if (product.title.includes('TH True')) brand = 'TH True Milk';
          else if (product.title.includes('Dutch Lady')) brand = 'Dutch Lady';
          else if (product.title.includes('Nuti')) brand = 'Nutifood';
          else if (product.title.includes('Meadow')) brand = 'Meadow Fresh';
          
          return { ...product, brand };
        });

        setProducts(productsWithBrands);
        setFilteredProducts(productsWithBrands);
        
        // Extract unique categories
        const uniqueCategories = [
          'Tất cả',
          ...new Set(productsWithBrands.map(product => product.category))
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
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

<<<<<<< HEAD
    getProducts();
  }, [currentPage, searchText, selectedCategory, sortBy, pageSize]);
=======
    // Simulate loading delay
    const timer = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    let currentFilters = [];

    // Apply category filter
    if (selectedCategory !== 'Tất cả') {
      result = result.filter(product => product.category === selectedCategory);
      currentFilters.push({ type: 'category', value: selectedCategory });
    }

    // Apply search filter
    if (searchText.trim() !== '') {
      const searchTerm = searchText.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      currentFilters.push({ type: 'search', value: searchText });
    }

    // Apply sorting
    let sortLabel = '';
    switch(sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        sortLabel = 'Giá thấp đến cao';
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        sortLabel = 'Giá cao đến thấp';
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        sortLabel = 'Đánh giá cao nhất';
        break;
      case 'discount':
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        sortLabel = 'Giảm giá nhiều nhất';
        break;
      default:
        break;
    }
    
    if (sortBy !== 'default' && sortLabel) {
      currentFilters.push({ type: 'sort', value: sortLabel });
    }

    setActiveFilters(currentFilters);
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, selectedCategory, searchText, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b

  // Helper functions
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleProductClick = (product) => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    navigate(`/${toSlug(product.category)}/${toSlug(product.title)}`);
  };
  
  const removeFilter = (filter) => {
    if (filter.type === 'category') setSelectedCategory('Tất cả');
    else if (filter.type === 'search') setSearchText('');
    else if (filter.type === 'sort') setSortBy('default');
  };
  
  const resetAllFilters = () => {
    setSearchText('');
    setSelectedCategory('Tất cả');
    setSortBy('default');
    setShowMobileFilters(false);
    setShowCategoryDropdown(false);
    setShowSortDropdown(false);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;

  return (
<<<<<<< HEAD
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
=======
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile search & filter toggle */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <div className="relative flex-1 mr-2">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchText && (
              <button 
                onClick={() => setSearchText('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
              >
                <X size={16} />
              </button>
<<<<<<< HEAD
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
=======
            )}
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center justify-center h-10 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal size={18} className="mr-1" />
            Lọc
          </button>
        </div>

<<<<<<< HEAD
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
=======
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
                  onClick={() => removeFilter(filter)}ư
                  className="ml-1 p-1 rounded-full hover:bg-blue-100"
                >
                  <X size={14} />
                </button>
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
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

<<<<<<< HEAD
              {/* Pagination */}
              {metadata.totalPages > 1 && (
                <Pagination
                  currentPage={metadata.pageNumber}
                  totalPages={metadata.totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={pageSize}
                  totalItems={metadata.totalCount}
=======
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
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  {searchText && (
                    <button 
                      onClick={() => setSearchText('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
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
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${
                            selectedCategory === category 
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
                      {sortBy === 'default' ? 'Sắp xếp: Mặc định' : 
                       sortBy === 'price-low-high' ? 'Sắp xếp: Giá thấp đến cao' :
                       sortBy === 'price-high-low' ? 'Sắp xếp: Giá cao đến thấp' :
                       sortBy === 'rating' ? 'Sắp xếp: Đánh giá cao nhất' :
                       'Sắp xếp: Giảm giá nhiều nhất'}
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
                        { value: 'price-high-low', label: 'Giá: Cao đến Thấp' },
                        { value: 'rating', label: 'Đánh giá cao nhất' },
                        { value: 'discount', label: 'Giảm giá nhiều nhất' }
                      ].map(option => (
                        <button 
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${
                            sortBy === option.value 
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
              
              {/* Featured Products */}
              <div>
                <h3 className="text-lg font-medium mb-3">Sản phẩm nổi bật</h3>
                <div className="space-y-4">
                  {products
                    .filter(product => product.rating >= 4.7)
                    .slice(0, 3)
                    .map(product => (
                      <div 
                        key={product.id} 
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                          {product.discountPercentage > 0 && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 font-bold">
                              -{product.discountPercentage}%
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-700 line-clamp-2">
                            {product.title}
                          </h4>
                          <div className="flex items-center">
                            <Star size={12} className="text-yellow-500 mr-1" />
                            <span className="text-xs text-gray-500">{product.rating}</span>
                          </div>
                          <p className="text-sm font-medium text-blue-600">
                            {product.price.toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                    ))}
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
                <span className="font-medium">{Math.min(indexOfFirstProduct + 1, filteredProducts.length)}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span>
                <span> trên </span>
                <span className="font-medium">{filteredProducts.length}</span>
                <span> sản phẩm</span>
              </div>
              <div className="relative w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="default">Sắp xếp: Mặc định</option>
                  <option value="price-low-high">Giá: Thấp đến Cao</option>
                  <option value="price-high-low">Giá: Cao đến Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="discount">Giảm giá nhiều nhất</option>
                </select>
                <ChevronDown 
                  size={16} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" 
>>>>>>> 36f64d078968078ecf389dfde4b6a89a6420c19b
                />
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-lg bg-white p-8 shadow-sm text-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" 
                  alt="Không tìm thấy sản phẩm" 
                  className="w-20 h-20 mx-auto opacity-70"
                />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy sản phẩm</h3>
                <p className="mt-2 text-gray-500">
                  {searchText ? `Không có sản phẩm nào phù hợp với "${searchText}"` : 'Không có sản phẩm nào trong danh mục này'}
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
                  {currentProducts.map((product) => (
                    <div key={product.id} onClick={() => handleProductClick(product)}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      itemsPerPage={productsPerPage}
                      totalItems={filteredProducts.length}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;