import React, { useState, useEffect } from 'react';
import CartHeader from './Components/CartHeader';
import CartItemsList from './Components/CartItemsList';
import CartSummary from './Components/CartSummary';
import EmptyCart from './Components/EmptyCart';
import { fetchCartItems } from '../../api/cartApi';

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