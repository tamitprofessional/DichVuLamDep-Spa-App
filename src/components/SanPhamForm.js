import React, { useState, useEffect } from 'react';

const SanPhamForm = ({ sanPham, onSubmit, onCancel }) => {
  // Sử dụng state để quản lý dữ liệu form
  const [formData, setFormData] = useState({
    TenSanPham: '',
    Loai: '',
    Gia: '',
    MoTa: '',
    GiamGia: 0,
  });

  // useEffect để điền dữ liệu vào form khi ở chế độ chỉnh sửa
  useEffect(() => {
    if (sanPham) {
      setFormData({
        TenSanPham: sanPham.TenSanPham,
        Loai: sanPham.Loai,
        Gia: sanPham.Gia,
        MoTa: sanPham.MoTa,
        GiamGia: sanPham.GiamGia,
      });
    }
  }, [sanPham]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'Gia' || name === 'GiamGia' ? Number(value) : value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sanPham ? { ...sanPham, ...formData } : formData);
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg my-8">
      <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
        {sanPham ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="TenSanPham" className="block text-gray-700 text-sm font-bold mb-2">
            Tên Sản Phẩm:
          </label>
          <input
            type="text"
            id="TenSanPham"
            name="TenSanPham"
            value={formData.TenSanPham}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="Loai" className="block text-gray-700 text-sm font-bold mb-2">
            Loại:
          </label>
          <input
            type="text"
            id="Loai"
            name="Loai"
            value={formData.Loai}
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
          <label htmlFor="GiamGia" className="block text-gray-700 text-sm font-bold mb-2">
            Giảm Giá (%):
          </label>
          <input
            type="number"
            id="GiamGia"
            name="GiamGia"
            value={formData.GiamGia}
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
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            {sanPham ? 'Cập Nhật' : 'Thêm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SanPhamForm;
