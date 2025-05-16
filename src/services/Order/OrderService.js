import api from '@services/apiClient';

class OrderService {
    /**
     * Get orders with pagination and filtering
     * @param {Object} queryParams - Query parameters for filtering and pagination
     * @param {number} queryParams.pageNumber - Current page number (starting from 1)
     * @param {number} queryParams.pageSize - Number of items per page (max 20)
     * @param {string} [queryParams.searchTerm] - Optional search term
     * @param {string} [queryParams.sortBy] - Sort field (default: "OrderDate")
     * @param {boolean} [queryParams.sortAscending] - Sort direction (default: true)
     * @returns {Promise} Promise containing the orders data
     */
    // async getOrders(queryParams) {
    //     try {
    //         const response = await api.get(apiConfig.order.getOrders, {
    //             pageNumber: queryParams.pageNumber || 1,
    //             pageSize: queryParams.pageSize || 10,
    //             searchTerm: queryParams.searchTerm || undefined,
    //             sortBy: queryParams.sortBy || 'OrderDate',
    //             sortAscending: queryParams.sortAscending !== undefined ? queryParams.sortAscending : true
    //         });

    //         // Map the API response to the format needed by the UI
    //         const mappedOrders = response.data.data.items.map(item => ({
    //             id: item.orderId,
    //             orderDate: item.orderDate,
    //             totalAmount: item.totalAmount,
    //             status: item.status,
    //             customerName: item.customerName,
    //             shippingAddress: item.shippingAddress,
    //         }));

    //         return {
    //             metadata: response.data.data.metadata,
    //             orders: mappedOrders
    //         };
    //     } catch (error) {
    //         console.error('Error fetching orders:', error);
    //         throw error;
    //     }
    // }
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
            console.log('Order creation response:', response);
            if (response.data.statusCode === 200) {
                return true;
            } else {
                return false;
            }
        }catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }
}

export default new OrderService();