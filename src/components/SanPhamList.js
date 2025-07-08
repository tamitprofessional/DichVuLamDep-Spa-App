import React from 'react';
import { formatCurrency } from '../App';

// Component hiển thị danh sách sản phẩm
const SanPhamList = ({ sanPhamData, onSelectSanPham, onEditSanPham, onDeleteSanPham, onAddSanPham }) => (
  <div className="p-4 md:p-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sản Phẩm Của Chúng Tôi</h2>
    <div className="flex justify-end mb-4">
      <button
        onClick={onAddSanPham}
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors duration-300"
      >
        Thêm Sản Phẩm Mới
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sanPhamData.map((sp) => (
        <div
          key={sp.MaSanPham}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between card"
        >
          <div onClick={() => onSelectSanPham(sp)} className="cursor-pointer">
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
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => onEditSanPham(sp)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              title="Chỉnh sửa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
              </svg>
            </button>
            <button
              onClick={() => onDeleteSanPham(sp.MaSanPham)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
              title="Xóa"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm6 3a1 1 0 100 2v1a1 1 0 102 0v-1a1 1 0 100-2h-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SanPhamList;
