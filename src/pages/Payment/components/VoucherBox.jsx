import React, { useState, useEffect } from "react";
import VoucherService from "@services/Voucher/VoucherService";

const VoucherBox = ({ onApply }) => {
  const [voucherInput, setVoucherInput] = useState("");
  const [listVoucher, setListVoucher] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const response = await VoucherService.getVouchers();
        setListVoucher(response.items || []);
        const found = response.items?.find(v => v.code === voucherInput);
        setSelectedVoucher(found || null);
      } catch (error) {
        setListVoucher([]);
        setSelectedVoucher(null);
        console.error("Failed to fetch vouchers:", error);
      }
      setLoading(false);
    };

    fetchVouchers();
//   }, [voucherInput]);
    }, []);

  const handleApply = () => {
    const found = listVoucher.find(v => v.code === voucherInput);
    if (onApply) onApply(found || null);
    setSelectedVoucher(found || null);
  };

  const handleSelectVoucher = (code) => {
    setVoucherInput(code);
    const found = listVoucher.find(v => v.code === code);
    setSelectedVoucher(found || null);
    if (onApply) onApply(found || null);
  };

  return (
    <div className="mb-4 bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Voucher</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={voucherInput}
          onChange={e => setVoucherInput(e.target.value)}
          placeholder="Nhập mã giảm giá"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Áp dụng
        </button>
      </div>
      {/* Danh sách gợi ý voucher */}
      {loading && (
        <div className="mt-4 text-sm text-gray-500">Đang tìm kiếm...</div>
      )}
      {!loading && listVoucher.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">
            {voucherInput ? "Kết quả tìm kiếm:" : "Mã gợi ý:"}
          </div>
          <div className="flex flex-wrap gap-2">
            {listVoucher.slice(0, 3).map((v) => (
              <button
                key={v.code}
                type="button"
                onClick={() => handleSelectVoucher(v.code)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition border border-blue-200"
              >
                {v.code}
              </button>
            ))}
          </div>
        </div>
      )}
      {!loading && voucherInput && listVoucher.length === 0 && (
        <div className="mt-4 text-sm text-gray-500">Không tìm thấy mã phù hợp.</div>
      )}
    </div>
  );
};

export default VoucherBox;