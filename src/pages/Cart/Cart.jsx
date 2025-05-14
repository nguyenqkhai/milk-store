import React, { useState, useEffect } from 'react';
import CartHeader from './Components/CartHeader';
import CartItemsList from './Components/CartItemsList';
import CartSummary from './Components/CartSummary';
import EmptyCart from './Components/EmptyCart';
import { fetchCartItems } from '../../api/cartApi';
// import PropTypes from 'prop-types';

// const API_URL = import.meta.env.VITE_API_BASE_URL;

// CartItemsList.PropTypes = {
//   id: PropTypes.number,
//   name: PropTypes.string,
//   price: PropTypes.number,
//   quantity: PropTypes.number,
//   image: PropTypes.string,
//   size: PropTypes.string,
// }

// const fetchCartItems = async () => {
//   try{
//     const response = await fetch(`${API_URL}/CartItem/get-list-cart-item`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `${localStorage.getItem('accessToken')}`
//       }
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data.data.map(item => ({
//       id: item.id,
//       name: item.getProductToCart.productName,
//       price: item.getProductToCart.productPriceIsDefault,
//       quantity: item.quantity,
//       image: item.getProductToCart.productImgData,
//       size: item.size || ""
//     }));
//   }catch (error) {
//     console.error('Error fetching cart items:', error);
//     return [];
//   }
// }

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Sữa tươi Vinamilk",
      price: 30000,
      quantity: 3,
      image: "https://suatuoiuc.vn/wp-content/uploads/2024/01/Sua-tuoi-huu-co-organic-vinamilk-180ml-1.webp",
      size: "180ml"
    },
    {
      id: 2,
      name: "Sữa chua Vinamilk",
      price: 25000,
      quantity: 4,
      image: "https://suatuoiuc.vn/wp-content/uploads/2024/01/Sua-tuoi-huu-co-organic-vinamilk-180ml-1.webp",
      size: "100g"
    },
    {
      id: 3,
      name: "Sữa đặc Ông Thọ",
      price: 35000,
      quantity: 4,
      image: "https://suatuoiuc.vn/wp-content/uploads/2024/01/Sua-tuoi-huu-co-organic-vinamilk-180ml-1.webp",
      size: "380g"
    },
    {
      id: 4,
      name: "Sữa bột Dielac",
      price: 450000,
      quantity: 2,
      image: "https://suatuoiuc.vn/wp-content/uploads/2024/01/Sua-tuoi-huu-co-organic-vinamilk-180ml-1.webp",
      size: "900g"
    }
  ]);
  const [shipping] = useState(20000);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      const cartItems = await fetchCartItems();
      setItems(cartItems);
      console.log('Fetched cart items:', cartItems);
    };

    fetchItems();
  } , []);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubTotal(newTotal);
  }, [items]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItems = items.map(item => 
        item.id === itemId ? {...item, quantity: newQuantity} : item
      );
      setItems(updatedItems);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };

  const grandTotal = subTotal + shipping;
  const itemCount = items.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <CartHeader />

      <div className="container mx-auto px-4 pb-12">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsList
                items={items} 
                itemCount={itemCount}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary 
                subTotal={subTotal} 
                shipping={shipping} 
                grandTotal={grandTotal} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;