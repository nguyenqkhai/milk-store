const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCartItems = async () => {
  try{
    const response = await fetch(`${API_URL}/CartItem/get-list-cart-item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('accessToken')}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.map(item => ({
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