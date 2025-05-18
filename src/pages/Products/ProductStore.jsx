import { create } from 'zustand';
import ProductService from '../../services/Product/ProductServices';
import CategoryService from '../../services/Category/CategoryServices';
import CartService from '@services/Cart/CartService';
/**
 * ProductStore - Quản lý trạng thái toàn cục cho các sản phẩm
 * Sử dụng Zustand để tạo store đơn giản và hiệu quả
 */
export const useProductStore = create((set, get) => ({
  // State
  products: [],
  productDetails: null,
  loading: false,
  error: null,
  cartLoading: false,
  cartError: null,
  cartMessage: null,
  pagination: {
    currentPage: 1,
    pageSize: 12,
    totalItems: 0,
    totalPages: 0
  },
  filters: {
    categoryId: null,
    trendId: null,
    searchTerm: '',
    sortBy: 'ProductName',
    sortAscending: true
  },
  categories: [
    { id: null, value: 'Tất cả' },
  ],
  categoriesLoading: false,

  // Actions
  fetchCategories: async () => {
    try {
      set({ categoriesLoading: true });
      
      const response = await CategoryService.getAllCategories();
      // Access the data property of the response which contains the categories array
      const categoriesData = response.data;
      
      // Format categories data
      const formattedCategories = [
        { id: null, value: 'Tất cả' },
        ...categoriesData.map(category => ({
          id: category.categoryid,
          value: category.categoryName
        }))
      ];
      
      set({
        categories: formattedCategories,
        categoriesLoading: false
      });
      
      return formattedCategories;
    } catch (error) {
      console.error('Error in ProductStore.fetchCategories:', error);
      set({ categoriesLoading: false });
      throw error;
    }
  },
  /**
   * Lấy danh sách sản phẩm với các tham số lọc và phân trang
   */
  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      
      const { filters, pagination } = get();
      const queryParams = {
        pageNumber: pagination.currentPage,
        pageSize: pagination.pageSize,
        ...filters
      };

      const response = await ProductService.getProducts(queryParams);
      
      set({
        products: response.products,
        pagination: {
          ...get().pagination,
          totalItems: response.metadata.totalCount,
          totalPages: response.metadata.totalPages
        },
        loading: false
      });
      
      return response;
    } catch (error) {
      console.error('Error in ProductStore.fetchProducts:', error);
      set({ 
        error: error.message || 'Có lỗi xảy ra khi tải sản phẩm', 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Lấy chi tiết sản phẩm theo ID
   * @param {string} productId - ID của sản phẩm
   */
  fetchProductDetails: async (productId) => {
    try {
      set({ loading: true, error: null, productDetails: null });
      
      const response = await ProductService.getProductById(productId);
      
      set({
        productDetails: response.data,
        loading: false
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error in ProductStore.fetchProductDetails for ID ${productId}:`, error);
      set({ 
        error: error.message || 'Có lỗi xảy ra khi tải chi tiết sản phẩm', 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param {string} productId - ID của sản phẩm
   * @param {number} quantity - Số lượng sản phẩm
   */
  addCart: async (productId, quantity) => {
    try {
      set({ cartLoading: true, cartError: null, cartMessage: null });
      
      const response = await CartService.addToCart(productId, quantity);
      
      set({
        cartLoading: false,
        cartMessage: response.message
      });
      
      return response;
    } catch (error) {
      console.error(`Error in ProductStore.addCart for product ID ${productId}:`, error);
      set({ 
        cartError: error.message || 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng', 
        cartLoading: false 
      });
      throw error;
    }
  },

  /**
   * Cập nhật các bộ lọc và tải lại sản phẩm
   * @param {Object} newFilters - Các bộ lọc mới
   */
  updateFilters: async (newFilters) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...newFilters
      },
      pagination: {
        ...state.pagination,
        currentPage: 1 // Reset về trang đầu tiên khi thay đổi bộ lọc
      }
    }));
    
    return await get().fetchProducts();
  },

  /**
   * Thay đổi trang và tải sản phẩm mới
   * @param {number} pageNumber - Số trang mới
   */
  changePage: async (pageNumber) => {
    set(state => ({
      pagination: {
        ...state.pagination,
        currentPage: pageNumber
      }
    }));
    
    return await get().fetchProducts();
  },

  /**
   * Thay đổi số lượng sản phẩm trên mỗi trang
   * @param {number} pageSize - Số lượng sản phẩm trên mỗi trang
   */
  changePageSize: async (pageSize) => {
    set(state => ({
      pagination: {
        ...state.pagination,
        pageSize,
        currentPage: 1 // Reset về trang đầu tiên khi thay đổi kích thước trang
      }
    }));
    
    return await get().fetchProducts();
  },

  /**
   * Reset trạng thái của store về giá trị mặc định
   */
  resetStore: () => {
    set({
      products: [],
      productDetails: null,
      loading: false,
      error: null,
      cartLoading: false,
      cartError: null,
      cartMessage: null,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0
      },
      filters: {
        categoryId: null,
        trendId: null,
        searchTerm: '',
        sortBy: 'ProductName',
        sortAscending: true
      }
    });
  }
}));

export default useProductStore;