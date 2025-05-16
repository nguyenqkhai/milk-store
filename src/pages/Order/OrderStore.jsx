import { create } from 'zustand';
import OrderService from '../../services/Order/OrderService';

/**
 * OrderStore - Quản lý trạng thái toàn cục cho các đơn hàng
 * Sử dụng Zustand để tạo store đơn giản và hiệu quả
 */
export const useOrderStore = create((set, get) => ({
  // State
  ordersHistory: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  },
  filters: {
    statusId: null,
    searchTerm: '',
    sortBy: 'orderDate',
    sortAscending: false,
    startDate: null,
    endDate: null
  },
  statuses: [
    { id: null, value: 'Tất cả' },
    { id: 'PENDING', value: 'Đang xử lý' },
    { id: 'CONFIRMED', value: 'Đã xác nhận' },
    { id: 'SHIPPING', value: 'Đang giao hàng' },
    { id: 'COMPLETED', value: 'Đã hoàn thành' },
    { id: 'CANCELLED', value: 'Đã hủy' }
  ],

  // Actions
  /**
   * Lấy danh sách đơn hàng với các tham số lọc và phân trang
   */
  fetchOrdersHistory: async () => {
    try {
      set({ loading: true, error: null });
      
      const { filters, pagination } = get();
      const queryParams = {
        pageNumber: pagination.currentPage,
        pageSize: pagination.pageSize,
        ...filters
      };

      const response = await OrderService.getOrdersHistory(queryParams);
      
      set({
        ordersHistory: response.orders,
        pagination: {
          ...get().pagination,
          totalItems: response.metadata.totalCount,
          totalPages: response.metadata.totalPages
        },
        loading: false
      });
      
      return response;
    } catch (error) {
      console.error('Error in OrderStore.fetchOrders:', error);
      set({ 
        error: error.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng', 
        loading: false 
      });
      throw error;
    }
  },

  /**
   * Cập nhật các bộ lọc và tải lại đơn hàng
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
    
    return await get().fetchOrdersHistory();
  },

  /**
   * Thay đổi trang và tải đơn hàng mới
   * @param {number} pageNumber - Số trang mới
   */
  changePage: async (pageNumber) => {
    set(state => ({
      pagination: {
        ...state.pagination,
        currentPage: pageNumber
      }
    }));
    
    return await get().fetchOrdersHistory();
  },

  /**
   * Thay đổi số lượng đơn hàng trên mỗi trang
   * @param {number} pageSize - Số lượng đơn hàng trên mỗi trang
   */
  changePageSize: async (pageSize) => {
    set(state => ({
      pagination: {
        ...state.pagination,
        pageSize,
        currentPage: 1
      }
    }));
    
    return await get().fetchOrdersHistory();
  },

  /**
   * Reset trạng thái của store về giá trị mặc định
   */
  resetStore: () => {
    set({
      ordersHistory: [],
      loading: false,
      error: null,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0
      },
      filters: {
        statusId: null,
        searchTerm: '',
        sortBy: 'orderDate',
        sortAscending: false,
        startDate: null,
        endDate: null
      }
    });
  }
}));

export default useOrderStore;