import api from '@services/apiClient';

const RETURN_URL = import.meta.env.VITE_RETURN_URL;
const CANCEL_URL = import.meta.env.VITE_CANCEL_URL;

class PaymentService {
    static async getStatusPayos(paymentLinkId){
        try {
            const headers = {
                'Content-Type': 'application/json',
            }
            const response = await api.get(`/Payos/check-status${paymentLinkId}`, headers);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching status payo:', error);
            return [];
        }
    }

    static async createPaymentPayos(params) {
        try {
            const headers = {
                'Content-Type': 'application/json-patch+json',
            }
            params ={
                orderId: params.orderId,
                returnUrl: RETURN_URL | 'https://milk-store-h6ra.vercel.app/don-hang',
                cancelUrl: CANCEL_URL | 'https://milk-store-h6ra.vercel.app/san-pham'
            }
            console.log('params', params);
            const response = await api.post('/Payos/create-payment', params, headers);
            return response.data;
        } catch (error) {
            console.error('Error creating payment payo:', error);
            return [];
        }
    }
}

export default PaymentService;