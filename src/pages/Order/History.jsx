import React, { useEffect, useState, useRef } from 'react';
import { useOrderStore } from './OrderStore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Loader2,
  ShoppingBag
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderHistory = () => {
  // Lấy state và actions từ store
  const {
    ordersHistory,
    loading,
    error,
    pagination,
    filters,
    statuses,
    fetchOrdersHistory,
    updateFilters,
    changePage,
    changePageSize,
  } = useOrderStore();

  // State cho date picker
  const [dateRange, setDateRange] = useState([filters.startDate, filters.endDate]);
  const [startDate, endDate] = dateRange;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // State để theo dõi đơn hàng nào đang được hover
  const [hoveredOrder, setHoveredOrder] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
  // Ref cho container
  const containerRef = useRef(null);

  useEffect(() => {
    fetchOrdersHistory();
  }, []);

  // Xử lý khi thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    updateFilters({ searchTerm });
  };

  // Xử lý khi thay đổi trạng thái
  const handleStatusChange = (e) => {
    const statusId = e.target.value === "null" ? null : e.target.value;
    updateFilters({ statusId });
  };

  // Xử lý khi thay đổi ngày
  const handleDateChange = (update) => {
    setDateRange(update);
    
    // Chỉ cập nhật filter khi cả hai ngày đều được chọn
    if (update[0] && update[1]) {
      updateFilters({
        startDate: update[0],
        endDate: update[1]
      });
    }
  };

  // Xử lý khi thay đổi sắp xếp
  const handleSortChange = (sortField) => {
    if (filters.sortBy === sortField) {
      // Nếu đang sắp xếp theo trường này thì đảo chiều sắp xếp
      updateFilters({ sortAscending: !filters.sortAscending });
    } else {
      // Nếu chọn trường mới thì mặc định sắp xếp giảm dần
      updateFilters({ sortBy: sortField, sortAscending: false });
    }
  };

  // Hàm định dạng trạng thái đơn hàng
  const getStatusColor = (statusId) => {
    switch(statusId) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'SHIPPING': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMouseEnter = (order, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    let top = rect.bottom - containerRect.top;
    let left = rect.left - containerRect.left;
    const tooltipHeight = 400;
    const spaceBelow = containerRect.bottom - rect.bottom;
    
    if (spaceBelow < tooltipHeight && rect.top - containerRect.top > tooltipHeight) {
      top = rect.top - containerRect.top - tooltipHeight;
    }
    
    setTooltipPosition({ top: top - 60, left: left + 1000 });
    setHoveredOrder(order);
  };

  const Pagination = () => {
    const pageNumbers = [];
    const { currentPage, totalPages } = pagination;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="text-sm text-gray-700">
            Hiển thị <span className="font-medium">{(currentPage - 1) * pagination.pageSize + 1}</span> đến <span className="font-medium">{Math.min(currentPage * pagination.pageSize, pagination.totalItems)}</span> trong tổng số <span className="font-medium">{pagination.totalItems}</span> đơn hàng
          </span>
        </div>
        <div>
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => changePage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              Trước
            </button>
            
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => changePage(number)}
                className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              Tiếp
            </button>
          </nav>
        </div>
      </div>
    );
  };

  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field) {
      return <ArrowUpDown className="w-4 h-4 ml-1" />;
    }
    return filters.sortAscending ? 
      <ArrowUp className="w-4 h-4 ml-1" /> : 
      <ArrowDown className="w-4 h-4 ml-1" />;
  };

  const OrderDetailsTooltip = ({ order }) => {
    if (!order || !order.orderDetails || order.orderDetails.length === 0) {
      return null;
    }

    return (
      <div className="fixed z-50 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4" 
           style={{ 
             top: `${tooltipPosition.top}px`, 
             left: `${tooltipPosition.left}px`,
             maxHeight: '400px',
             overflowY: 'auto'
           }}>
        <div className="flex items-center mb-3">
          <ShoppingBag className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Chi tiết đơn hàng</h3>
        </div>
        
        <div className="space-y-2">
          {/* Thông tin chi tiết đơn hàng */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Mã đơn hàng:</p>
              <p className="text-sm text-gray-900">{order.orderNumber || order.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Ngày đặt:</p>
              <p className="text-sm text-gray-900">{format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Phí vận chuyển:</p>
              <p className="text-sm text-gray-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.shippingFee || 0)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Ghi chú:</p>
              <p className="text-sm text-gray-900">{order.notes || 'Không có'}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Sản phẩm:</h4>
            {order.orderDetails.map((item, index) => (
              <div key={item.orderDetailId || index} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="w-12 h-12 flex-shrink-0 mr-3">
                  {item.img ? (
                    <img src={item.img} alt={item.productName} className="w-full h-full object-cover rounded" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.productName}</p>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>SL: {item.quantity}</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.productPrice || 0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {order.appliedVouchers && order.appliedVouchers.length > 0 && (
            <div className="border-t border-gray-200 pt-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Vouchers áp dụng:</h4>
              {order.appliedVouchers.map((voucher, index) => (
                <div key={index} className="text-sm text-gray-700">
                  {voucher.code}: {voucher.description || voucher.discountValue}
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-3 mt-2">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-700">Tổng cộng:</span>
              <span className="text-blue-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'dd/MM/yyyy')} - ${format(endDate, 'dd/MM/yyyy')}`;
    }
    return "Chọn khoảng thời gian";
  };

  return (
    <div className="container mx-auto px-4 py-8" ref={containerRef}>
      <h1 className="text-2xl font-bold mb-6">Lịch sử đơn hàng</h1>
      
      {/* Phần Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tìm kiếm */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              value={filters.searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Lọc theo trạng thái */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="w-4 h-4 text-gray-500" />
            </div>
            <select
              value={filters.statusId === null ? "null" : filters.statusId}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map((status) => (
                <option key={status.id || "null"} value={status.id || "null"}>
                  {status.value}
                </option>
              ))}
            </select>
          </div>
          
          {/* Lọc theo ngày - Custom DatePicker */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="w-4 h-4 text-gray-500" />
            </div>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={formatDateRange()}
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              {isDatePickerOpen && (
                <div className="absolute z-40 mt-1 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    dateFormat="dd/MM/yyyy"
                    locale={vi}
                    monthsShown={2}
                    onClickOutside={() => setIsDatePickerOpen(false)}
                  />
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => {
                        setDateRange([null, null]);
                        updateFilters({ startDate: null, endDate: null });
                        setIsDatePickerOpen(false);
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => setIsDatePickerOpen(false)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hiển thị lỗi */}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {/* Danh sách đơn hàng */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSortChange('orderDate')}
                >
                  <div className="flex items-center">
                    Ngày đặt hàng
                    <SortIcon field="orderDate" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSortChange('totalAmount')}
                >
                  <div className="flex items-center">
                    Tổng tiền
                    <SortIcon field="totalAmount" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ giao hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
                  </td>
                </tr>
              ) : ordersHistory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Không có đơn hàng nào
                  </td>
                </tr>
              ) : (
                ordersHistory.map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-blue-50"
                    onMouseLeave={() => setHoveredOrder(null)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600" onMouseEnter={(e) => handleMouseEnter(order, e)}>
                      {order.orderNumber || order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.statusId)}`}>
                        {statuses.find(s => s.id === order.statusId)?.value || order.statusId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.paymentMethodName || order.paymentMethod}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {order.shippingAddress}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {order.notes || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Phân trang */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination />
          
          <div className="mt-2 flex items-center">
            <span className="mr-2 text-sm text-gray-700">Hiển thị:</span>
            <select
              value={pagination.pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Hiển thị tooltip tách biệt khỏi bảng */}
      {hoveredOrder && <OrderDetailsTooltip order={hoveredOrder} />}
    </div>
  );
};

export default OrderHistory;