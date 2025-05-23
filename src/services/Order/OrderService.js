import api from '@services/apiClient'

class OrderService {
  async getPendingOrders(queryParams) {
    try {
      const response = await api.get('/Order/user/status/PENDING', {
        PageNumber: queryParams.pageNumber || 1,
        PageSize: queryParams.pageSize || 10,
        searchTerm: queryParams.searchTerm || undefined,
        SortBy: queryParams.sortBy || 'orderdate',
        SortAscending:
          queryParams.sortAscending !== undefined
            ? queryParams.sortAscending
            : false,
        startDate: queryParams.startDate || undefined,
        endDate: queryParams.endDate || undefined,
      })

      const mappedOrders = response.data.data.items.map(item => ({
        id: item.orderId,
        orderNumber: item.orderNumber,
        customerId: item.customerId,
        orderDate: item.orderDate,
        shippingAddress: item.shippingAddress,
        shippingFee: item.shippingFee,
        shippingCode: item.shippingCode,
        totalPrice: item.totalPrice,
        paymentMethod: item.paymentMethod,
        paymentMethodName: item.paymentMethodName,
        notes: item.notes,
        createdAt: item.createdAt,
        statusId: item.statusId,
        isSuccess: item.isSuccess,
        orderDetails: item.orderDetails,
        appliedVouchers: item.appliedVouchers || [],
      }))

      return {
        metadata: response.data.data.metadata,
        orders: mappedOrders,
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }

  async getProcessingOrders(queryParams) {
    try {
      const response = await api.get('/Order/user/status/PROCESSING', {
        PageNumber: queryParams.pageNumber || 1,
        PageSize: queryParams.pageSize || 10,
        searchTerm: queryParams.searchTerm || undefined,
        SortBy: queryParams.sortBy || 'orderdate',
        SortAscending:
          queryParams.sortAscending !== undefined
            ? queryParams.sortAscending
            : false,
        startDate: queryParams.startDate || undefined,
        endDate: queryParams.endDate || undefined,
      })

      const mappedOrders = response.data.data.items.map(item => ({
        id: item.orderId,
        orderNumber: item.orderNumber,
        customerId: item.customerId,
        orderDate: item.orderDate,
        shippingAddress: item.shippingAddress,
        shippingFee: item.shippingFee,
        shippingCode: item.shippingCode,
        totalPrice: item.totalPrice,
        paymentMethod: item.paymentMethod,
        paymentMethodName: item.paymentMethodName,
        notes: item.notes,
        createdAt: item.createdAt,
        statusId: item.statusId,
        isSuccess: item.isSuccess,
        orderDetails: item.orderDetails,
        appliedVouchers: item.appliedVouchers || [],
      }))

      return {
        metadata: response.data.data.metadata,
        orders: mappedOrders,
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }

  async getConfirmedOrders(queryParams) {
    try {
      const response = await api.get('/Order/user/status/CONFIRMED', {
        PageNumber: queryParams.pageNumber || 1,
        PageSize: queryParams.pageSize || 10,
        searchTerm: queryParams.searchTerm || undefined,
        SortBy: queryParams.sortBy || 'orderdate',
        SortAscending:
          queryParams.sortAscending !== undefined
            ? queryParams.sortAscending
            : false,
        startDate: queryParams.startDate || undefined,
        endDate: queryParams.endDate || undefined,
      })

      const mappedOrders = response.data.data.items.map(item => ({
        id: item.orderId,
        orderNumber: item.orderNumber,
        customerId: item.customerId,
        orderDate: item.orderDate,
        shippingAddress: item.shippingAddress,
        shippingFee: item.shippingFee,
        shippingCode: item.shippingCode,
        totalPrice: item.totalPrice,
        paymentMethod: item.paymentMethod,
        paymentMethodName: item.paymentMethodName,
        notes: item.notes,
        createdAt: item.createdAt,
        statusId: item.statusId,
        isSuccess: item.isSuccess,
        orderDetails: item.orderDetails,
        appliedVouchers: item.appliedVouchers || [],
      }))

      return {
        metadata: response.data.data.metadata,
        orders: mappedOrders,
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }

  async getShippingOrders(queryParams) {
    try {
      const response = await api.get('/Order/user/status/SHIPPING', {
        PageNumber: queryParams.pageNumber || 1,
        PageSize: queryParams.pageSize || 10,
        searchTerm: queryParams.searchTerm || undefined,
        SortBy: queryParams.sortBy || 'orderdate',
        SortAscending:
          queryParams.sortAscending !== undefined
            ? queryParams.sortAscending
            : false,
        startDate: queryParams.startDate || undefined,
        endDate: queryParams.endDate || undefined,
      })

      const mappedOrders = response.data.data.items.map(item => ({
        id: item.orderId,
        orderNumber: item.orderNumber,
        customerId: item.customerId,
        orderDate: item.orderDate,
        shippingAddress: item.shippingAddress,
        shippingFee: item.shippingFee,
        shippingCode: item.shippingCode,
        totalPrice: item.totalPrice,
        paymentMethod: item.paymentMethod,
        paymentMethodName: item.paymentMethodName,
        notes: item.notes,
        createdAt: item.createdAt,
        statusId: item.statusId,
        isSuccess: item.isSuccess,
        orderDetails: item.orderDetails,
        appliedVouchers: item.appliedVouchers || [],
      }))

      return {
        metadata: response.data.data.metadata,
        orders: mappedOrders,
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }

  /**
   * Get orders with pagination and filtering
   * @param {Object} queryParams - Query parameters for filtering and pagination
   * @param {number} queryParams.pageNumber - Current page number (starting from 1)
   * @param {number} queryParams.pageSize - Number of items per page (max 20)
   * @param {string} [queryParams.customerId] - Optional customer ID filter
   * @param {string} [queryParams.statusId] - Optional status ID filter (PENDING, COMPLETED, etc.)
   * @param {string} [queryParams.searchTerm] - Optional search term (order number, customer name, etc.)
   * @param {string} [queryParams.sortBy] - Sort field (default: "orderDate")
   * @param {boolean} [queryParams.sortAscending] - Sort direction (default: false)
   * @param {string} [queryParams.fromDate] - Optional start date filter (ISO format)
   * @param {string} [queryParams.toDate] - Optional end date filter (ISO format)
   * @returns {Promise} Promise containing the orders data
   */
  async getOrdersHistory(queryParams) {
    try {
      const response = await api.get('/Order/history', {
        PageNumber: queryParams.pageNumber || 1,
        PageSize: queryParams.pageSize || 10,
        customerId: queryParams.customerId || undefined,
        statusId: queryParams.statusId || undefined,
        searchTerm: queryParams.searchTerm || undefined,
        SortBy: queryParams.sortBy || 'orderdate',
        SortAscending:
          queryParams.sortAscending !== undefined
            ? queryParams.sortAscending
            : false,
        startDate: queryParams.startDate || undefined,
        endDate: queryParams.endDate || undefined,
      })

      // Map the API response to the format needed by the UI
      const mappedOrders = response.data.data.items.map(item => ({
        id: item.orderId,
        orderNumber: item.orderNumber,
        customerId: item.customerId,
        orderDate: item.orderDate,
        shippingAddress: item.shippingAddress,
        shippingFee: item.shippingFee,
        shippingCode: item.shippingCode,
        totalPrice: item.totalPrice,
        paymentMethod: item.paymentMethod,
        paymentMethodName: item.paymentMethodName,
        notes: item.notes,
        createdAt: item.createdAt,
        statusId: item.statusId,
        isSuccess: item.isSuccess,
        orderDetails: item.orderDetails,
        appliedVouchers: item.appliedVouchers || [],
      }))

            return {
                metadata: response.data.data.metadata,
                orders: mappedOrders
            };
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }
    /**
     * Create a new order
     * @param {Object} orderData - Order data to be created
     * @returns {Promise} Promise containing the result of the order creation
     */
    async createOrder(orderData) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await api.post('/Order', orderData, headers);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}

export default new OrderService()
