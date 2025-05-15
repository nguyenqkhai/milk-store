import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCartItems = async () => {
  try{
    const response = await axios.get(`${API_URL}/CartItem/get-list-cart-item`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('accessToken')}`
      }
    });
    return response.data.data.map(item => ({
      id: item.id,
      name: item.getProductToCart.productName,
      price: item.getProductToCart.productPriceIsDefault,
      quantity: item.quantity,
      image: item.getProductToCart.productImgData,
      size: item.size || ""
    }));
  }catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}