export const OrderStatus = {
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED',
    CONFIRMED: 'CONFIRMED',
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SHIPPING: 'SHIPPING',
};

const OrderStatusInfo = {
    [OrderStatus.CANCELLED]: {
        name: 'Đã hủy',
        description: 'Đơn hàng đã bị hủy',
    },
    [OrderStatus.COMPLETED]: {
        name: 'Hoàn thành',
        description: 'Đơn hàng đã được giao thành công',
    },
    [OrderStatus.CONFIRMED]: {
        name: 'Đã xác nhận',
        description: 'Đơn hàng đã được xác nhận và đang chuẩn bị',
    },
    [OrderStatus.PENDING]: {
        name: 'Chờ xác nhận',
        description: 'Đơn hàng đang chờ xác nhận từ cửa hàng',
    },
    [OrderStatus.PROCESSING]: {
        name: 'Đang xử lý',
        description: 'Đơn hàng đang được xử lý và đóng gói',
    },
    [OrderStatus.SHIPPING]: {
        name: 'Đang giao hàng',
        description: 'Đơn hàng đang được vận chuyển',
    },
};

export function getOrderStatusName(statusId) {
    return OrderStatusInfo[statusId]?.name || '';
}

export function getOrderStatusDescription(statusId) {
    return OrderStatusInfo[statusId]?.description || '';
}