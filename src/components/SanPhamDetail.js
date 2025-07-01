import React from 'react';
import { formatCurrency } from '../App'; // Import hàm định dạng tiền tệ

// Component hiển thị chi tiết sản phẩm
// Component for displaying product details
const SanPhamDetail = ({ sanPham, onBack }) => (
  <div className="p-4 md:p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-lg my-8">
    <button
      onClick={onBack}
      className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Quay lại
    </button>
    <h2 className="text-3xl font-bold text-purple-800 mb-4">{sanPham.TenSanPham}</h2>
    <p className="text-gray-700 text-lg mb-2">
      <span className="font-semibold">Loại:</span> {sanPham.Loai}
    </p>
    <p className="text-gray-700 text-lg mb-4">{sanPham.MoTa}</p>
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
      <span className="text-2xl font-bold text-green-700">{formatCurrency(sanPham.Gia)}</span>
      {sanPham.GiamGia > 0 && (
        <span className="bg-orange-600 text-white text-lg font-bold px-4 py-2 rounded-full">
          Giảm giá: -{sanPham.GiamGia}%
        </span>
      )}
    </div>
  </div>
);

export default SanPhamDetail;
