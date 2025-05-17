import React, { useState, useEffect } from 'react';
import CartHeader from './Components/CartHeader';
import CartItemsList from './Components/CartItemsList';
import CartSummary from './Components/CartSummary';
import EmptyCart from './Components/EmptyCart';
import CartService from '@services/Cart/CartService';
import Pagination from '@/pages/Products/Components/Pagination';
import { message } from 'antd';
import { setGlobalCartCount } from '@/hooks/useCart';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [shipping] = useState(20000);
  const [subTotal, setSubTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({
    totalPages: 1,
    pageSize: 2,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const fetchItems = async () => {
    const { items, metadata } = await CartService.fetchCartItems(currentPage, paginationMeta.pageSize);
    setItems(items);
    setItemCount(metadata.totalCount);
    setPaginationMeta({
      totalPages: metadata.totalPages,
      pageSize: metadata.pageSize,
      totalCount: metadata.totalCount,
      hasPrevious: metadata.hasPrevious,
      hasNext: metadata.hasNext
    });
    setGlobalCartCount(metadata.totalCount);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchItems();
    }
    , 300);
  }, [currentPage, paginationMeta.pageSize]);

  // useEffect(() => {
  //   console.log('items', items);
  //   const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  //   setSubTotal(newTotal);
  // }, [items]);

  useEffect(() => {
    const newTotal = checkedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubTotal(newTotal);
  }, [checkedItems]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItems = items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setItems(updatedItems);

      const updatedCheckedItems = checkedItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
      setCheckedItems(updatedCheckedItems);

      const { statusCode, message: apiMessage } = await CartService.updateCartItem(itemId, newQuantity);
      if (statusCode !== 200) {
        message.error(apiMessage);
      }
    }
  };

  const handleRemoveItem = async (itemId) => {
    const { statusCode, message: apiMessage } = await CartService.deleteCartItem(itemId);
    if (statusCode === 200) {
      message.success(apiMessage);
      // const updatedItems = items.filter(item => item.id !== itemId);
      // setItems(updatedItems);
      const newItems = await CartService.fetchCartItems(currentPage, paginationMeta.pageSize);
      setItems(newItems.items);
      setItemCount(newItems.metadata.totalCount);
      setPaginationMeta({
        totalPages: newItems.metadata.totalPages,
        pageSize: newItems.metadata.pageSize,
        totalCount: newItems.metadata.totalCount,
        hasPrevious: newItems.metadata.hasPrevious,
        hasNext: newItems.metadata.hasNext
      });
      setGlobalCartCount(newItems.metadata.totalCount);
    } else {
      message.error(apiMessage);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckedItemsChange = (newChecked) => {
    setCheckedItems(newChecked);
  };

  const grandTotal = subTotal + shipping;
  // const itemCount = items.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <CartHeader />

      <div className="container mx-auto px-4 pb-12">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CartItemsList
                  items={items}
                  itemCount={itemCount}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleRemoveItem={handleRemoveItem}
                  checkedItems={checkedItems}
                  onCheckedItemsChange={handleCheckedItemsChange}
                />
              </div>
              
              <div className="lg:col-span-1">
                <CartSummary 
                  subTotal={subTotal} 
                  shipping={shipping} 
                  grandTotal={grandTotal}
                  checkedItems={checkedItems}
                />
              </div>
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={paginationMeta.totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={paginationMeta.pageSize}
                totalItems={paginationMeta.totalCount}
                hasPrevious={paginationMeta.hasPrevious}
                hasNext={paginationMeta.hasNext}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;