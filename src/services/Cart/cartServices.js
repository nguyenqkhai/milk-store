import apiConfig from "@/config/apiConfig";
import api from "@services/apiClient";

const API_BASE_URL = apiConfig.API_BASE_URL;

class CartService {
  static async fetchCartItems(PageNumber = 1, PageSize = 10, SearchTern = "", SortBy = "", SortAscending = 0) {
    try {

      const headers = {
        'Content-Type': 'application/json',
      }

      const params = {
        PageNumber,
        PageSize,
      }
      const response = await api.get('/CartItem/get-list-cart-item', params, headers);
      const cartItems = response.data.data.items.map(item => ({
        id: item.id,
        name: item.getProductToCart.productName,
        priceDefault: item.getProductToCart.productPriceIsDefault,
        price: item.getProductToCart.productPriceIsActive,
        quantity: item.quantity,
        image: item.getProductToCart.productImgData,
        size: item.size || "",
        available: item.availableStock
      }));
      const metadata = {
        totalPages: response.data.data.metadata.totalPages,
        pageSize: response.data.data.metadata.pageSize,
        totalCount: response.data.data.metadata.totalCount,
        hasPrevious: response.data.data.metadata.hasPrevious,
        hasNext: response.data.data.metadata.hasNext
      };
      return {
        items: cartItems,
        metadata: metadata
      };
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  }

  static async addToCart(productId, quantity) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      const params = {
        productId,
        quantity
      }
      const response = await api.post('/CartItem/add-to-cart', params, headers);
      return { statusCode: response.data.statusCode, message: response.data.message };
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  static async updateCartItem(cartItemId, quantity) {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
      }
      const data = {
        op: 'replace',
        path: '/quantity',
        value: quantity
      }
      const response = await api.patch(`/CartItem/update-cart-item/${cartItemId}`, [data], headers);
      return { statusCode: response.data.statusCode, message: response.data.message };
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

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

export default CartService;