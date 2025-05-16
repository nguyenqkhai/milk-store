import api from '../apiClient';

// Các hàm xử lý giỏ hàng
export const fetchCartItems = async (PageNumber = 1, PageSize = 10) => {
  try {
    const response = await api.get('/CartItem/get-list-cart-item', {
      PageNumber,
      PageSize,
    });
    
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
    return { items: [], metadata: {} };
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post('/CartItem/add-to-cart', {
      productId,
      quantity
    });
    
    return {
      statusCode: response.data.statusCode,
      message: response.data.message
    };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const operations = [
      {
        op: 'replace',
        path: '/quantity',
        value: quantity
      }
    ];
    
    const response = await api.jsonPatch(
      `/CartItem/update-cart-item/${cartItemId}`,
      operations
    );
    
    return {
      statusCode: response.data.statusCode,
      message: response.data.message
    };
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await api.delete(
      `/CartItem/delete-cart-item/${cartItemId}`
    );
    
    return {
      statusCode: response.data.statusCode,
      message: response.data.message
    };
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};