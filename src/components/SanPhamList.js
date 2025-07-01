import React from 'react';
import { formatCurrency } from '../App'; // Import hàm định dạng tiền tệ

// Component hiển thị danh sách sản phẩm
// Component for displaying products list
const SanPhamList = ({ onSelectSanPham, mockSanPham }) => (
  <div className="p-4 md:p-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sản Phẩm Của Chúng Tôi</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockSanPham.map((sp) => (
        <div
          key={sp.MaSanPham}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={() => onSelectSanPham(sp)}
        >
          <div>
            <h3 className="text-xl font-semibold text-purple-700 mb-2">{sp.TenSanPham}</h3>
            <p className="text-gray-600 text-sm mb-2">Loại: {sp.Loai}</p>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{sp.MoTa}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-green-600">{formatCurrency(sp.Gia)}</span>
            {sp.GiamGia > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{sp.GiamGia}%
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SanPhamList;
