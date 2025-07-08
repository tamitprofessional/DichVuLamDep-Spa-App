import React, { useState, useEffect } from 'react';

const DichVuForm = ({ dichVu, onSubmit, onCancel }) => {
  // Sử dụng state để quản lý dữ liệu form
  const [formData, setFormData] = useState({
    TenDichVu: '',
    Gia: '',
    MoTa: '',
    KhuyenMai: 0,
  });

  // useEffect để điền dữ liệu vào form khi ở chế độ chỉnh sửa
  useEffect(() => {
    if (dichVu) {
      setFormData({
        TenDichVu: dichVu.TenDichVu,
        Gia: dichVu.Gia,
        MoTa: dichVu.MoTa,
        KhuyenMai: dichVu.KhuyenMai,
      });
    }
  }, [dichVu]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'Gia' || name === 'KhuyenMai' ? Number(value) : value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dichVu ? { ...dichVu, ...formData } : formData);
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg my-8">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
        {dichVu ? 'Chỉnh Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="TenDichVu" className="block text-gray-700 text-sm font-bold mb-2">
            Tên Dịch Vụ:
          </label>
          <input
            type="text"
            id="TenDichVu"
            name="TenDichVu"
            value={formData.TenDichVu}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="Gia" className="block text-gray-700 text-sm font-bold mb-2">
            Giá:
          </label>
          <input
            type="number"
            id="Gia"
            name="Gia"
            value={formData.Gia}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="MoTa" className="block text-gray-700 text-sm font-bold mb-2">
            Mô Tả:
          </label>
          <textarea
            id="MoTa"
            name="MoTa"
            value={formData.MoTa}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="KhuyenMai" className="block text-gray-700 text-sm font-bold mb-2">
            Khuyến Mãi (%):
          </label>
          <input
            type="number"
            id="KhuyenMai"
            name="KhuyenMai"
            value={formData.KhuyenMai}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="0"
            max="100"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            {dichVu ? 'Cập Nhật' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DichVuForm;
