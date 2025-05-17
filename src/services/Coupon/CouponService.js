import api from '@services/apiClient';

class CouponService {
    static async getUserCouponPoints(userId) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await api.get(`/Coupon/current-points/${userId}`, {}, headers);
            const coupons = response.data.data
            return coupons;
        } catch (error) {
            console.error('Error fetching coupons:', error);
            return [];
        }
    }

    static async getExchangeableVouchers(){
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await api.get('/Coupon/available-vouchers', {}, headers);
            const coupons = response.data.data.map(item => ({
                id: item.voucherId,
                code: item.code,
                discount: item.discountValue,
                discountType: item.discountType,
                startDate: item.startDate,
                endDate: item.endDate,
                minOrder: item.minOrder,
                maxDiscount: item.maxDiscount,
                pointsRequired: item.pointsRequired,
            }));
            return coupons;
        } catch (error) {
            console.error('Error fetching coupons:', error);
            return [];
        }
    }

    static async exchangeVoucher(voucherId) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const params = {
                voucherId,
            };
            const response = await api.post(`/Coupon/redeem`, params, headers);
            return response.data;
        } catch (error) {
            console.error('Error exchanging voucher:', error);
            return false;
        }
    }
}

export default CouponService;