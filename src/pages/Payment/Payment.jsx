import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Get form data from location state
    const formData = location.state?.formData || {};
    const paymentMethod = location.state?.paymentMethod || 'cash';

    const handleProcessPayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            // Redirect to order confirmation after 2 seconds
            setTimeout(() => {
                navigate('/order-confirmation');
            }, 2000);
        }, 3000);
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
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg md:p-6 "
                >
                    {/* Order Summary */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-800">Name:</p>
                                    <p className="font-medium ">{formData.firstName} {formData.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-800">Email:</p>
                                    <p className="font-medium">{formData.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-800">Shipping Address:</p>
                                    <p className="font-medium">
                                        {formData.city}, {formData.state} {formData.zipCode}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-800">Payment Method:</p>
                                    <p className="font-medium flex items-center gap-2">
                                        {paymentMethod === 'credit' ? (
                                            <>
                                                <FaCreditCard className="text-blue-500 text-lg" />
                                                Credit Card
                                            </>
                                        ) : (
                                            <>
                                                <FaMoneyBillWave className="text-green-500 text-lg" />
                                                Cash on Delivery
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                <span className="font-medium">$99.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">$5.00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">$9.90</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="font-bold text-lg">$113.90</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Payment;