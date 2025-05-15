import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCartItems = async (PageNumber = 1, PageSize = 10, SearchTern = "", SortBy = "", SortAscending = 0) => {
  try{
    const response = await axios.get(`${API_URL}/CartItem/get-list-cart-item`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('accessToken')}`
      },
      params: {
        PageNumber,
        PageSize,
      }
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
  }catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/CartItem/add-to-cart`,
      {
        productId,
        quantity
      },
      {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return {statusCode : response.data.statusCode, message : response.data.message};
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await axios.patch(
  `${API_URL}/CartItem/update-cart-item/${cartItemId}`,
  [
    {
      op: 'replace',
      path: '/quantity',
      value: quantity
    }
  ],
  {
    headers: {
      'Authorization': `${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json-patch+json'
    }
  }
)
    return {statusCode : response.data.statusCode, message : response.data.message};
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
}

export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/CartItem/delete-cart-item/${cartItemId}`,
      {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return {statusCode : response.data.statusCode, message : response.data.message};
  }catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
}