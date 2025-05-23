import { create } from 'zustand'
import OrderService from '../../services/Order/OrderService'

/**
 * OrderStore - Quản lý trạng thái toàn cục cho các đơn hàng
 * Sử dụng Zustand để tạo store đơn giản và hiệu quả
 */
export const useOrderStore = create((set, get) => ({
  // State
  ordersPending: [],
  paginationPending: {
    currentPage: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  },
  filtersPending: {
    statusId: null,
    searchTerm: '',
    sortBy: 'orderDate',
    sortAscending: false,
    startDate: null,
    endDate: null,
  },

<<<<<<< HEAD
=======
  // Thêm state cho PROCESSING
  ordersProcessing: [],
  paginationProcessing: {
    currentPage: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  },
  filtersProcessing: {
    statusId: null,
    searchTerm: '',
    sortBy: 'orderDate',
    sortAscending: false,
    startDate: null,
    endDate: null,
  },

>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
  // Thêm state cho CONFIRMED
  ordersConfirmed: [],
  paginationConfirmed: {
    currentPage: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  },
  filtersConfirmed: {
    statusId: null,
    searchTerm: '',
    sortBy: 'orderDate',
    sortAscending: false,
    startDate: null,
    endDate: null,
  },

  // Thêm state cho SHIPPING
  ordersShipping: [],
  paginationShipping: {
    currentPage: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  },
  filtersShipping: {
    statusId: null,
    searchTerm: '',
    sortBy: 'orderDate',
    sortAscending: false,
    startDate: null,
    endDate: null,
  },

  ordersHistory: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  },
  filters: {
    statusId: null,
    searchTerm: '',
    sortBy: 'orderDate',
    sortAscending: false,
    startDate: null,
    endDate: null,
  },
  statuses: [
    { id: null, value: 'Tất cả' },
    { id: 'PENDING', value: 'Chờ xác nhận' },
    { id: 'PROCESSING', value: 'Đang xử lý' },
    { id: 'CONFIRMED', value: 'Đã xác nhận' },
    { id: 'SHIPPING', value: 'Đang giao hàng' },
    { id: 'COMPLETED', value: 'Đã hoàn thành' },
    { id: 'CANCELLED', value: 'Đã hủy' },
  ],
  HistoryStatuses: [
    { id: null, value: 'Tất cả' },
    { id: 'COMPLETED', value: 'Đã hoàn thành' },
    { id: 'CANCELLED', value: 'Đã hủy' },
  ],

  // Actions
  /**
   * Lấy danh sách đơn hàng đang xử lý với các tham số lọc và phân trang
   */
  fetchOrdersPending: async () => {
    try {
      set({ loading: true, error: null })

      const { filtersPending, paginationPending } = get()
      const queryParams = {
        pageNumber: paginationPending.currentPage,
        pageSize: paginationPending.pageSize,
        ...filtersPending,
      }

      const response = await OrderService.getPendingOrders(queryParams)

<<<<<<< HEAD
      const response = await OrderService.getPendingOrders(queryParams);

=======
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
      set({
        ordersPending: response.orders,
        paginationPending: {
          ...get().paginationPending,
          totalItems: response.metadata.totalCount,
          totalPages: response.metadata.totalPages,
        },
<<<<<<< HEAD
        loading: false
      });

      return response;
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersPending:', error);
      set({
        error: error.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng đang xử lý',
        loading: false
      });
      throw error;
=======
        loading: false,
      })

      return response
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersPending:', error)
      set({
        error:
          error.message ||
          'Có lỗi xảy ra khi tải danh sách đơn hàng đang xử lý',
        loading: false,
      })
      throw error
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
    }
  },

  /**
   * Cập nhật các bộ lọc và tải lại đơn hàng đang xử lý
   * @param {Object} newFilters - Các bộ lọc mới
   */
  updatePendingFilters: async newFilters => {
    set(state => ({
      filtersPending: {
        ...state.filtersPending,
        ...newFilters,
      },
      paginationPending: {
        ...state.paginationPending,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersPending()
  },

  /**
   * Thay đổi trang và tải đơn hàng đang xử lý mới
   * @param {number} pageNumber - Số trang mới
   */
  changePendingPage: async pageNumber => {
    set(state => ({
      paginationPending: {
        ...state.paginationPending,
        currentPage: pageNumber,
      },
    }))

    return await get().fetchOrdersPending()
  },

  /**
   * Thay đổi số lượng đơn hàng đang xử lý trên mỗi trang
   * @param {number} pageSize - Số lượng đơn hàng trên mỗi trang
   */
  changePendingPageSize: async pageSize => {
    set(state => ({
      paginationPending: {
        ...state.paginationPending,
        pageSize,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersPending()
  },

  // Thêm actions cho PROCESSING
  /**
   * Lấy danh sách đơn hàng đang xử lý với các tham số lọc và phân trang
   */
  fetchOrdersProcessing: async () => {
    try {
      set({ loading: true, error: null })

      const { filtersProcessing, paginationProcessing } = get()
      const queryParams = {
        pageNumber: paginationProcessing.currentPage,
        pageSize: paginationProcessing.pageSize,
        ...filtersProcessing,
      }

      const response = await OrderService.getProcessingOrders(queryParams)

      set({
        ordersProcessing: response.orders,
        paginationProcessing: {
          ...get().paginationProcessing,
          totalItems: response.metadata.totalCount,
          totalPages: response.metadata.totalPages,
        },
        loading: false,
      })

      return response
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersProcessing:', error)
      set({
        error:
          error.message ||
          'Có lỗi xảy ra khi tải danh sách đơn hàng đang xử lý',
        loading: false,
      })
      throw error
    }
  },

  /**
   * Cập nhật các bộ lọc và tải lại đơn hàng đang xử lý
   * @param {Object} newFilters - Các bộ lọc mới
   */
  updateProcessingFilters: async newFilters => {
    set(state => ({
      filtersProcessing: {
        ...state.filtersProcessing,
        ...newFilters,
      },
      paginationProcessing: {
        ...state.paginationProcessing,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersProcessing()
  },

  /**
   * Thay đổi trang và tải đơn hàng đang xử lý mới
   * @param {number} pageNumber - Số trang mới
   */
  changeProcessingPage: async pageNumber => {
    set(state => ({
      paginationProcessing: {
        ...state.paginationProcessing,
        currentPage: pageNumber,
      },
    }))

    return await get().fetchOrdersProcessing()
  },

  /**
   * Thay đổi số lượng đơn hàng đang xử lý trên mỗi trang
   * @param {number} pageSize - Số lượng đơn hàng trên mỗi trang
   */
  changeProcessingPageSize: async pageSize => {
    set(state => ({
      paginationProcessing: {
        ...state.paginationProcessing,
        pageSize,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersProcessing()
  },

  // Thêm actions cho CONFIRMED
  /**
   * Lấy danh sách đơn hàng đã xác nhận với các tham số lọc và phân trang
   */
  fetchOrdersConfirmed: async () => {
    try {
      set({ loading: true, error: null })

      const { filtersConfirmed, paginationConfirmed } = get()
      const queryParams = {
        pageNumber: paginationConfirmed.currentPage,
        pageSize: paginationConfirmed.pageSize,
        ...filtersConfirmed,
      }

      const response = await OrderService.getConfirmedOrders(queryParams)

<<<<<<< HEAD
      const response = await OrderService.getConfirmedOrders(queryParams);

=======
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
      set({
        ordersConfirmed: response.orders,
        paginationConfirmed: {
          ...get().paginationConfirmed,
          totalItems: response.metadata.totalCount,
          totalPages: response.metadata.totalPages,
        },
<<<<<<< HEAD
        loading: false
      });

      return response;
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersConfirmed:', error);
      set({
        error: error.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng đã xác nhận',
        loading: false
      });
      throw error;
=======
        loading: false,
      })

      return response
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersConfirmed:', error)
      set({
        error:
          error.message ||
          'Có lỗi xảy ra khi tải danh sách đơn hàng đã xác nhận',
        loading: false,
      })
      throw error
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
    }
  },

  /**
   * Cập nhật các bộ lọc và tải lại đơn hàng đã xác nhận
   * @param {Object} newFilters - Các bộ lọc mới
   */
  updateConfirmedFilters: async newFilters => {
    set(state => ({
      filtersConfirmed: {
        ...state.filtersConfirmed,
        ...newFilters,
      },
      paginationConfirmed: {
        ...state.paginationConfirmed,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersConfirmed()
  },

  /**
   * Thay đổi trang và tải đơn hàng đã xác nhận mới
   * @param {number} pageNumber - Số trang mới
   */
  changeConfirmedPage: async pageNumber => {
    set(state => ({
      paginationConfirmed: {
        ...state.paginationConfirmed,
        currentPage: pageNumber,
      },
    }))

    return await get().fetchOrdersConfirmed()
  },

  /**
   * Thay đổi số lượng đơn hàng đã xác nhận trên mỗi trang
   * @param {number} pageSize - Số lượng đơn hàng trên mỗi trang
   */
  changeConfirmedPageSize: async pageSize => {
    set(state => ({
      paginationConfirmed: {
        ...state.paginationConfirmed,
        pageSize,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersConfirmed()
  },

  // Thêm actions cho SHIPPING
  /**
   * Lấy danh sách đơn hàng đang giao với các tham số lọc và phân trang
   */
  fetchOrdersShipping: async () => {
    try {
      set({ loading: true, error: null })

      const { filtersShipping, paginationShipping } = get()
      const queryParams = {
        pageNumber: paginationShipping.currentPage,
        pageSize: paginationShipping.pageSize,
        ...filtersShipping,
      }

      const response = await OrderService.getShippingOrders(queryParams)

<<<<<<< HEAD
      const response = await OrderService.getShippingOrders(queryParams);

=======
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
      set({
        ordersShipping: response.orders,
        paginationShipping: {
          ...get().paginationShipping,
          totalItems: response.metadata.totalCount,
          totalPages: response.metadata.totalPages,
        },
<<<<<<< HEAD
        loading: false
      });

      return response;
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersShipping:', error);
      set({
        error: error.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng đang giao',
        loading: false
      });
      throw error;
=======
        loading: false,
      })

      return response
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersShipping:', error)
      set({
        error:
          error.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng đang giao',
        loading: false,
      })
      throw error
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
    }
  },

  /**
   * Cập nhật các bộ lọc và tải lại đơn hàng đang giao
   * @param {Object} newFilters - Các bộ lọc mới
   */
  updateShippingFilters: async newFilters => {
    set(state => ({
      filtersShipping: {
        ...state.filtersShipping,
        ...newFilters,
      },
      paginationShipping: {
        ...state.paginationShipping,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersShipping()
  },

  /**
   * Thay đổi trang và tải đơn hàng đang giao mới
   * @param {number} pageNumber - Số trang mới
   */
  changeShippingPage: async pageNumber => {
    set(state => ({
      paginationShipping: {
        ...state.paginationShipping,
        currentPage: pageNumber,
      },
    }))

    return await get().fetchOrdersShipping()
  },

  /**
   * Thay đổi số lượng đơn hàng đang giao trên mỗi trang
   * @param {number} pageSize - Số lượng đơn hàng trên mỗi trang
   */
  changeShippingPageSize: async pageSize => {
    set(state => ({
      paginationShipping: {
        ...state.paginationShipping,
        pageSize,
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersShipping()
  },

  /**
   * Lấy danh sách đơn hàng lịch sử với các tham số lọc và phân trang
   */
  fetchOrdersHistory: async () => {
    try {
<<<<<<< HEAD
      set({ loading: true, error: null });

      const { filters, pagination } = get();
=======
      set({ loading: true, error: null })

      const { filters, pagination } = get()
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
      const queryParams = {
        pageNumber: pagination.currentPage,
        pageSize: pagination.pageSize,
        ...filters,
      }

      const response = await OrderService.getOrdersHistory(queryParams)

<<<<<<< HEAD
      const response = await OrderService.getOrdersHistory(queryParams);

=======
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
      set({
        ordersHistory: response.orders,
        pagination: {
          ...get().pagination,
          totalItems: response.metadata.totalCount,
          totalPages: response.metadata.totalPages,
        },
<<<<<<< HEAD
        loading: false
      });

      return response;
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersHistory:', error);
      set({
        error: error.message || 'Có lỗi xảy ra khi tải danh sách lịch sử đơn hàng',
        loading: false
      });
      throw error;
=======
        loading: false,
      })

      return response
    } catch (error) {
      console.error('Error in OrderStore.fetchOrdersHistory:', error)
      set({
        error:
          error.message || 'Có lỗi xảy ra khi tải danh sách lịch sử đơn hàng',
        loading: false,
      })
      throw error
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
    }
  },

  /**
   * Cập nhật các bộ lọc và tải lại đơn hàng lịch sử
   * @param {Object} newFilters - Các bộ lọc mới
   */
  updateFilters: async newFilters => {
    set(state => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
      pagination: {
        ...state.pagination,
<<<<<<< HEAD
        currentPage: 1 // Reset về trang đầu tiên khi thay đổi bộ lọc
      }
    }));

    return await get().fetchOrdersHistory();
=======
        currentPage: 1, // Reset về trang đầu tiên khi thay đổi bộ lọc
      },
    }))

    return await get().fetchOrdersHistory()
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
  },

  /**
   * Thay đổi trang và tải đơn hàng lịch sử mới
   * @param {number} pageNumber - Số trang mới
   */
  changePage: async pageNumber => {
    set(state => ({
      pagination: {
        ...state.pagination,
<<<<<<< HEAD
        currentPage: pageNumber
      }
    }));

    return await get().fetchOrdersHistory();
=======
        currentPage: pageNumber,
      },
    }))

    return await get().fetchOrdersHistory()
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
  },

  /**
   * Thay đổi số lượng đơn hàng lịch sử trên mỗi trang
   * @param {number} pageSize - Số lượng đơn hàng trên mỗi trang
   */
  changePageSize: async pageSize => {
    set(state => ({
      pagination: {
        ...state.pagination,
        pageSize,
<<<<<<< HEAD
        currentPage: 1
      }
    }));

    return await get().fetchOrdersHistory();
=======
        currentPage: 1,
      },
    }))

    return await get().fetchOrdersHistory()
>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
  },

  /**
   * Reset trạng thái của store về giá trị mặc định
   */
  resetStore: () => {
    set({
      ordersPending: [],
      paginationPending: {
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        totalPages: 0,
      },
      filtersPending: {
        statusId: null,
        searchTerm: '',
        sortBy: 'orderDate',
        sortAscending: false,
        startDate: null,
        endDate: null,
      },

<<<<<<< HEAD
=======
      ordersProcessing: [],
      paginationProcessing: {
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        totalPages: 0,
      },
      filtersProcessing: {
        statusId: null,
        searchTerm: '',
        sortBy: 'orderDate',
        sortAscending: false,
        startDate: null,
        endDate: null,
      },

>>>>>>> 2d753818d68bee604697c9263d1b00868af7bed7
      ordersConfirmed: [],
      paginationConfirmed: {
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        totalPages: 0,
      },
      filtersConfirmed: {
        statusId: null,
        searchTerm: '',
        sortBy: 'orderDate',
        sortAscending: false,
        startDate: null,
        endDate: null,
      },

      ordersShipping: [],
      paginationShipping: {
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        totalPages: 0,
      },
      filtersShipping: {
        statusId: null,
        searchTerm: '',
        sortBy: 'orderDate',
        sortAscending: false,
        startDate: null,
        endDate: null,
      },

      ordersHistory: [],
      loading: false,
      error: null,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
        totalPages: 0,
      },
      filters: {
        statusId: null,
        searchTerm: '',
        sortBy: 'orderDate',
        sortAscending: false,
        startDate: null,
        endDate: null,
      },
    })
  },
}))

export default useOrderStore
