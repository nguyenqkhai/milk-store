import React, { useState, useEffect, useRef } from "react";
import { message, Skeleton } from "antd";
import VoucherService from "@services/Voucher/VoucherService";
import { useAuth } from "@/context/AuthContext";
import CouponService from "@services/Coupon/CouponService";
import { GoGoal } from "react-icons/go"; 
const PAGE_SIZE = 10;

const Voucher = () => {
  const [couponPoints, setCouponPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [exchangeableVouchers, setExchangeableVouchers] = useState([]);
  const [userVouchers, setUserVouchers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { currentUser } = useAuth();
  const customerId = currentUser?.data?.customerId;
  const listRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coupons, vouchers, exchanged] = await Promise.all([
          CouponService.getUserCouponPoints(customerId),
          CouponService.getExchangeableVouchers(),
          VoucherService.getVouchersUser({
            pageNumber: page,
            pageSize: PAGE_SIZE,
          })
        ]);

        setCouponPoints(coupons);
        setExchangeableVouchers(vouchers);

        if (page === 1) {
          setUserVouchers(exchanged.items || []);
        } else {
          setUserVouchers((prev) => [...prev, ...(exchanged.items || [])]);
        }
        setHasNext(exchanged.metadata?.hasNext);
      } catch {
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      } finally {
        setLoadingMore(false);
      }
    };

    fetchData();
  }, [customerId, page]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasNext && !loadingMore) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  const handleExchange = async (voucher) => {
    if (couponPoints < voucher.requiredPoints) {
      message.warning("Bạn không đủ điểm để đổi voucher này!");
      return;
    }

    setLoading(true);
    try {
      const response = await CouponService.exchangeVoucher(voucher.id);
      if (response.success) {
        message.success("Đổi voucher thành công!");
        const [newVoucher, coupons] = await Promise.all([
          VoucherService.getVouchersUser(),
          CouponService.getUserCouponPoints(customerId)
        ]);
        setUserVouchers(newVoucher.items || []);
        setCouponPoints(coupons);
      } else {
        message.error(response.message || "Đổi voucher thất bại!");
      }
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Voucher Của Bạn</h1>
        <p className="text-gray-600">Đổi điểm tích lũy để nhận ưu đãi hấp dẫn</p>
      </div>

      {/* Points Balance Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 mb-10 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Điểm tích lũy hiện có</p>
            <h2 className="text-4xl font-bold">{couponPoints}</h2>
          </div>
          <div className=" bg-opacity-20 rounded-full p-3">
            <GoGoal className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Voucher Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Vouchers */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-blue-100 px-6 py-4 border-b border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Voucher Có Thể Đổi
            </h3>
          </div>

          <div className="p-6 h-[500px] overflow-y-auto">
            {exchangeableVouchers.length > 0 ? (
              <div className="space-y-4">
                {exchangeableVouchers.map((v) => (
                  <div key={v.code} className="relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>

                    <div className="p-5 pl-7">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{v.code}</h4>
                          <p className="text-sm text-gray-500">Giảm {v.discount}{v.discountType ? "₫" : "%"} đơn từ {v.minOrder?.toLocaleString()}₫</p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {v.pointsRequired} điểm
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <p>HSD: {v.endDate}</p>
                          {v.maxDiscount && <p>Giảm tối đa: {v.maxDiscount?.toLocaleString()}₫</p>}
                        </div>

                        <button
                          onClick={() => handleExchange(v)}
                          disabled={loading || couponPoints < v.pointsRequired}
                          className={`px-4 py-2 rounded-lg font-medium text-sm ${couponPoints >= v.pointsRequired
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            } transition-colors`}
                        >
                          {loading ? 'Đang xử lý...' : 'Đổi ngay'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
                <p>Hiện không có voucher nào để đổi</p>
              </div>
            )}
          </div>
        </div>

        {/* User's Vouchers */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-green-100 px-6 py-4 border-b border-green-200">
            <h3 className="text-xl font-semibold text-green-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Voucher Của Tôi
            </h3>
          </div>

          <div
            className="p-6 h-[500px] overflow-y-auto"
            onScroll={handleScroll}
            ref={listRef}
          >
            {userVouchers.length > 0 ? (
              <div className="space-y-4">
                {userVouchers.map((v, idx) => (
                  <div key={v.code || idx} className="relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>

                    <div className="p-5 pl-7">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{v.code}</h4>
                          <p className="text-sm text-gray-500">Giảm {v.discount}{v.discountType ? "₫" : "%"} đơn từ {v.minOrder?.toLocaleString()}₫</p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Đã đổi
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <p>HSD: {v.endDate}</p>
                          {v.maxDiscount && <p>Giảm tối đa: {v.maxDiscount?.toLocaleString()}₫</p>}
                        </div>

                        <div className="text-xs text-gray-500">
                          <p>Ngày đổi: {v.startDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {hasNext && (
                  <div className="flex justify-center py-4">
                    <button
                      onClick={() => {
                        setLoadingMore(true);
                        setPage(prev => prev + 1);
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {loadingMore ? 'Đang tải...' : 'Xem thêm'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 012-2h.5a2 2 0 011.983 1.738l3.11-1.382A1 1 0 0121 5.582v12.836a1 1 0 01-1.407.914l-3.11-1.382A2 2 0 0114.5 18H12a2 2 0 01-2-2z" />
                </svg>
                <p>Bạn chưa có voucher nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;