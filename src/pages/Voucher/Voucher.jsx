import React, { useState, useEffect, useRef } from "react";
import { message } from "antd";
import VoucherService from "@services/Voucher/VoucherService";
import { useAuth } from "@/context/AuthContext";
import CouponService from "@services/Coupon/CouponService";

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
        const coupons = await CouponService.getUserCouponPoints(customerId);
        setCouponPoints(coupons);

        const vouchers = await CouponService.getExchangeableVouchers();
        setExchangeableVouchers(vouchers);

        const exchanged = await VoucherService.getVouchersUser({
          pageNumber: page,
          pageSize: PAGE_SIZE,
        });
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
    // eslint-disable-next-line
  }, [customerId, page]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      hasNext &&
      !loadingMore
    ) {
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
        const newVoucher = await VoucherService.getVouchersUser();
        setUserVouchers(newVoucher.items || []);
        const coupons = await CouponService.getUserCouponPoints(customerId);
        setCouponPoints(coupons);
        setLoading(false);
      } else {
        message.error(response.message || "Đổi voucher thất bại!");
        setLoading(false);
      }
    } catch {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Đổi điểm lấy Voucher
      </h2>

      <div className="mb-8 text-center">
        <span className="text-lg">Điểm hiện tại của bạn:&nbsp;</span>
        <span className="font-bold text-blue-600 text-xl">
          {couponPoints}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-sm min-h-[480px] h-[420px] flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">
            Voucher có thể đổi:
          </h3>
          <div className="flex-1 overflow-y-auto">
            {exchangeableVouchers.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center">
                {exchangeableVouchers.map((v) => (
                  <div
                    key={v.code}
                    className="bg-white rounded-lg px-4 py-3 flex flex-col items-stretch border border-blue-200 w-80 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-700 text-lg">
                        {v.code}
                      </span>
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded ml-2">
                        {v.discount}
                        {v.discountType ? "₫" : "%"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1 flex justify-between">
                      <span>Đơn tối thiểu:</span>
                      <span className="font-medium">
                        {v.minOrder?.toLocaleString()}₫
                      </span>
                    </div>
                    {v.maxDiscount && (
                      <div className="text-xs text-gray-600 mb-1 flex justify-between">
                        <span>Giảm tối đa:</span>
                        <span className="font-medium">
                          {v.maxDiscount?.toLocaleString()}₫
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-gray-600 mb-1 flex justify-between">
                      <span>Hiệu lực:</span>
                      <span className="font-medium text-right">
                        {v.startDate} - {v.endDate}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-3 flex justify-between">
                      <span>Cần điểm:</span>
                      <span className="font-bold text-blue-600">
                        {v.pointsRequired}
                      </span>
                    </div>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 disabled:opacity-60 w-full mt-auto"
                      onClick={() => handleExchange(v)}
                      disabled={loading || couponPoints < v.pointsRequired}
                    >
                      Đổi
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">
                Không có voucher nào để đổi.
              </div>
            )}
          </div>
        </div>

        <div className="bg-green-100 border border-green-300 rounded-lg p-4 shadow-sm min-h-[480px] h-[420px] flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-green-800">
            Voucher bạn đã đổi:
          </h3>
          <div
            className="flex-1 overflow-y-auto"
            onScroll={handleScroll}
            ref={listRef}
          >
            {userVouchers.length > 0 ? (
              <ul className="space-y-3 flex flex-col items-center">
                {userVouchers.map((v, idx) => (
                  <li
                    key={v.code || idx}
                    className="bg-white rounded-lg px-4 py-3 flex flex-col border border-green-200 w-full max-w-[340px] shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-green-700 text-base">
                        {v.code}
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 mb-1">
                      <span>
                        Giảm:{" "}
                        <b>
                          {v.discount}
                          {v.discountType ? "₫" : "%"}
                        </b>
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">
                      {v.minOrder && (
                        <div>Đơn tối thiểu: {v.minOrder.toLocaleString()}₫</div>
                      )}
                      {v.maxDiscount && (
                        <div>Giảm tối đa: {v.maxDiscount.toLocaleString()}₫</div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      Hiệu lực:{" "}
                      <span className="text-green-600 font-medium">
                        {v.startDate}
                      </span>{" "}
                      -{" "}
                      <span className="text-red-500 font-medium">
                        {v.endDate}
                      </span>
                    </div>
                  </li>
                ))}
                {hasNext && (
                  <li className="text-center text-xs text-gray-400 py-2">
                    Đang tải thêm...
                  </li>
                )}
              </ul>
            ) : (
              <div className="text-gray-500 text-sm text-center mt-8">
                Bạn chưa có voucher nào.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;