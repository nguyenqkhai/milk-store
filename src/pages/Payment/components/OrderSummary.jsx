import React from "react";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const OrderSummary = ({ formData, paymentMethod }) => (
  <div className="mb-4 bg-white rounded-xl shadow p-6">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-800">Name:</p>
          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
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
);

export default OrderSummary;