import React from 'react';
import { formatCurrency } from '../App'; // Import hàm định dạng tiền tệ

// Component hiển thị danh sách dịch vụ
// Component for displaying services list
const DichVuList = ({ onSelectDichVu, mockDichVu }) => (
  <div className="p-4 md:p-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dịch Vụ Của Chúng Tôi</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockDichVu.map((dv) => (
        <div
          key={dv.MaDichVu}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={() => onSelectDichVu(dv)}
        >
          <div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{dv.TenDichVu}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{dv.MoTa}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-green-600">{formatCurrency(dv.Gia)}</span>
            {dv.KhuyenMai > 0 && (
              <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{dv.KhuyenMai}%
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DichVuList;
