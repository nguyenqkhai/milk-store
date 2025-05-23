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

  /**
   * Cancel an order by orderId
   * @param {string|number} orderId - The ID of the order to cancel
   * @returns {Promise} Promise containing the result of the cancellation
   */
  async cancelOrder(orderId) {
    try {
      const response = await api.post(`/Order/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
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
 * Create a new order and automatically remove ordered items from cart
 * @param {Object} orderData - Order data to be created
 * @returns {Promise} Promise containing the result of the order creation
 */
  async createOrder(orderData) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      // Create the order
      const response = await api.post('/Order', orderData, headers);

      // If order creation is successful, delete cart items
      if (response.data && response.data.statusCode === 200) {
        // Extract productIds from orderDetails
        const productIds = orderData.orderDetails.map(item => item.productId);

        // Delete cart items for each product
        await this.deleteCartItemsByProductIds(productIds);
      }

      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Delete cart items by product IDs
   * @param {Array} productIds - Array of product IDs to remove from cart
   * @returns {Promise} Promise containing the result of cart cleanup
   */
  async deleteCartItemsByProductIds(productIds) {
    try {
      // First, get current cart items to find cartItemIds
      const cartItems = await this.getCartItems(); // Assume you have this method

      // Filter cart items that match the product IDs
      const itemsToDelete = cartItems.filter(cartItem =>
        productIds.includes(cartItem.productId)
      );

      // Delete each cart item
      const deletePromises = itemsToDelete.map(item =>
        this.deleteCartItem(item.cartItemId)
      );

      // Wait for all deletions to complete
      await Promise.all(deletePromises);

      console.log(`Successfully deleted ${itemsToDelete.length} items from cart`);

    } catch (error) {
      console.error('Error deleting cart items:', error);
      // Don't throw error here to avoid affecting order creation
    }
  }

  /**
   * Alternative approach: Delete cart items by cartItemId directly
   * Use this if you have cartItemId available in your order flow
   */
  async createOrderWithCartItemIds(orderData, cartItemIds) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      // Create the order
      const response = await api.post('/Order', orderData, headers);

      // If order creation is successful, delete cart items
      if (response.data && response.data.statusCode === 200) {
        // Delete specific cart items
        const deletePromises = cartItemIds.map(cartItemId =>
          this.deleteCartItem(cartItemId)
        );

        await Promise.all(deletePromises);
        console.log('Cart items deleted successfully');
      }

      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Your existing deleteCartItem method
  static async deleteCartItem(cartItemId) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      const response = await api.delete(`/CartItem/delete-cart-item/${cartItemId}`, headers);
      return { statusCode: response.data.statusCode, message: response.data.message };
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  }
}

export default new OrderService()
