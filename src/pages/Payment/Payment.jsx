import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from './components/OrderSummary';
import VoucherBox from './components/VoucherBox';
import OrderService from '@services/Order/OrderService';
import CartService from "@services/Cart/CartService";
import { message } from 'antd';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [voucher, setVoucher] = useState(null);
    const [discountValue, setDiscountValue] = useState(0);

    // Get form data from location state
    const formData = location.state?.formData || {};
    const paymentMethod = location.state?.paymentMethod || 'cash';
    const order = location.state?.order || {};
    const buyNow = location.state?.buyNow || {};

    // const discountValue = order?.total * (voucher?.discount || 0) / 100 || 0;

    useEffect(() => {
        if (voucher) {
            if (order?.total < voucher.minOrder) {
                setVoucher(null);
                message.error(`Đơn hàng tối thiểu để áp dụng mã giảm giá là ${formatPrice(voucher?.minOrder || 0)}`);
                return;
            }
            const calculatedDiscount = order?.subtotal * (voucher.discount || 0) / 100;
            if (voucher.maxDiscount && calculatedDiscount > voucher.maxDiscount) {
                setDiscountValue(voucher.maxDiscount);
            }
            else {
                setDiscountValue(calculatedDiscount);
            }
        }else{
            setDiscountValue(0);
        }
    }, [voucher]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
        }).format(price);
    };

    const handleProcessPayment = () => {
        setIsProcessing(true);
        const orderData = {
            shippingAddress: formData.state + ', ' + formData.city,
            shippingFee: order.shipping,
            paymentMethod: paymentMethod,
            notes: '',
            voucherCodes: voucher?.code ? [voucher.code] : [],
            orderDetails: order.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        }
        // Call OrderService to create order
        OrderService.createOrder(orderData)
            .then(async (response) => {
                if (response) {
                    if (!buyNow){
                        for (const item of order.items) {
                            try {
                                await CartService.deleteCartItem(item.cartItemId || item.id);
                            } catch (err) {
                                console.error('Error deleting cart item:', err);
                            }
                        }
                    }
                    setIsProcessing(false);
                    setIsSuccess(true);
                    setTimeout(() => {
                        navigate('/san-pham');
                    }, 2000);
                } else {
                    setIsProcessing(false);
                    setIsSuccess(false);
                    message.error('Payment failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error processing payment:', error);
                setIsProcessing(false);
                setIsSuccess(false);
                alert('Payment failed. Please try again.');
            });
    };

    const handleApplyVoucher = (voucherObj) => {
        setVoucher(voucherObj);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Header */}
            <div className="m-auto bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 h-44 w-full  px-4 py-3 mb-5 shadow-md">
                <div className="flex mt-4 justify-center items-center gap-3">
                    <FaCreditCard className="text-4xl text-blue-800" />
                    <h1 className="text-4xl font-bold tracking-wide text-blue-800 drop-shadow-sm uppercase">
                        Payment
                    </h1>
                </div>

                <div className="w-fit mx-auto">
                    <div className="mt-5 px-4 py-2 bg-white rounded-full shadow text-sm text-gray-600 flex items-center gap-1 text-sm">
                        <span className="hover:text-blue-200 cursor-pointer transition" onClick={() => navigate('/trang-chu')}>Home</span>
                        <span>→</span>
                        <span className="hover:text-blue-200 cursor-pointer transition" onClick={() => navigate('/gio-hang')}>Cart</span>
                        <span>→</span>
                        <span className="hover:text-blue-200 cursor-pointer transition" onClick={() => navigate('/thanh-toan')}>Checkout</span>
                        <span>→</span>
                        <span className="font-medium">Payment</span>
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-8 ">
                <div className="grid md:grid-cols-2 gap-6">
                    <OrderSummary formData={formData} paymentMethod={paymentMethod} />
                    <VoucherBox onApply={handleApplyVoucher} />
                </div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg md:p-6 "
                >
                    {/* Payment Status */}
                    <div className="text-center">
                        {!isProcessing && !isSuccess && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleProcessPayment}
                                className="w-full max-w-md bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
                            >
                                Confirm Payment
                            </motion.button>
                        )}

                        {isProcessing && (
                            <div className="space-y-4">
                                <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                                <p className="text-lg text-gray-600">Processing your payment...</p>
                            </div>
                        )}

                        {isSuccess && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="space-y-4"
                            >
                                <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                                <p className="text-lg text-gray-600">Payment successful!</p>
                                <p className="text-sm text-gray-500">Redirecting to order confirmation...</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Details */}
                    <div className="mt-4 border-t pt-2">
                        <h3 className="text-lg font-semibold mb-2">📦 Order Details</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">{formatPrice(order?.subtotal || 0)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">{formatPrice(order.shipping || 0)}</span>
                            </div>
                            <div className="flex justify-between text-sm border-t pt-2">
                                <span className="text-gray-600">Voucher:</span>
                                <span className="font-medium">-{formatPrice(discountValue)}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="font-bold text-lg">{formatPrice(order?.total - discountValue || 0)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Payment;