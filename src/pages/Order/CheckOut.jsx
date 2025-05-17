import { useState } from 'react';
import creditImage from '/src/assets/creditImage.png'
import { FaArrowRight } from "react-icons/fa6";
import { FaCreditCard, FaMoneyBillWave, FaCashRegister } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';
const Checkout = () => {
    const navigate = useNavigate();
    const [onCreditCard, setOnCreditCard] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        state: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const location = useLocation();
    const order = location.state?.order || {};
    const handleCheckout = () => {
        navigate('/xac-nhan-thanh-toan', {
            state: {
                order: order,
                formData,
                paymentMethod: onCreditCard ? 'credit' : 'cash'
            }
        });
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center min-h-screen bg-gray-50 pb-10"
        >
            {/* Header Banner */}
            <div className="m-auto bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 h-44 w-full  px-4 py-3 mb-6  shadow-md">
                <div className="mt-4 flex items-center justify-center gap-3">
                    <FaCashRegister className="text-4xl text-blue-800" />
                    <h1 className="text-4xl font-bold tracking-wide text-blue-800 drop-shadow-sm uppercase">
                        Checkout
                    </h1>
                </div>
                <div className="w-fit mx-auto">
                    <div className="mt-5 px-4 py-2 bg-white rounded-full shadow text-sm text-gray-600 flex items-center gap-1 text-sm">
                        <span className="hover:text-blue-200 cursor-pointer transition" onClick={() => navigate('/trang-chu')}>Home</span>
                        <span>→</span>
                        <span className="hover:text-blue-200 cursor-pointer transition" onClick={() => navigate('/gio-hang')}>Cart</span>
                        <span>→</span>
                        <span className="font-medium">Checkout</span>
                    </div>
                </div>

            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto w-full px-4 ">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg md:p-8"
                >
                    {/* Billing Information */}
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Billing Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 ">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 ">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 ">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 ">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 ">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                        <div className="space-y-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${onCreditCard ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                onClick={() => setOnCreditCard(true)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <FaCreditCard className={`text-xl ${onCreditCard ? 'text-blue-500' : 'text-gray-400'}`} />
                                        <span className="font-medium">Credit Card</span>
                                    </div>
                                    <img src={creditImage} className="h-6" alt="credit cards" />
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${!onCreditCard ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                onClick={() => setOnCreditCard(false)}
                            >
                                <div className="flex items-center space-x-3">
                                    <FaMoneyBillWave className={`text-xl ${!onCreditCard ? 'text-blue-500' : 'text-gray-400'}`} />
                                    <span className="font-medium">Cash on Delivery</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Credit Card Form */}
                        {onCreditCard && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6 space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 ">Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 ">Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 ">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:outline-none focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        <span>Complete Checkout</span>
                        <FaArrowRight />
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>

    );
}

export default Checkout;