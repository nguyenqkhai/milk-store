import api from '@services/apiClient';

class VoucherService {
    static async getVouchers(pageNumber = 1, pageSize = 10) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const params = {
                pageNumber,
                pageSize,
            };
            const response = await api.get('/Voucher', params, headers);
            const vouchers = response.data.data.items.map(item => ({
                id: item.voucherid,
                code: item.code,
                discount: item.discountValue,
                startDate: item.startDate,
                endDate: item.endDate,
            }));
            const metadata = {
                totalPages: response.data.data.metadata.totalPages,
                pageSize: response.data.data.metadata.pageSize,
                totalCount: response.data.data.metadata.totalCount,
                hasPrevious: response.data.data.metadata.hasPrevious,
                hasNext: response.data.data.metadata.hasNext
            };
            return {
                items: vouchers,
                metadata: metadata
            };
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            return [];
        }
    }
}

export default VoucherService;