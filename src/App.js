import React, { useState } from 'react';
import DichVuList from './components/DichVuList';
import DichVuDetail from './components/DichVuDetail';
import SanPhamList from './components/SanPhamList';
import SanPhamDetail from './components/SanPhamDetail';

// Dữ liệu giả định cho Dịch vụ và Sản phẩm
// Mock data for Services and Products
const mockDichVu = [
  {
    MaDichVu: 'DV001',
    TenDichVu: 'Chăm sóc da mặt cơ bản',
    Gia: 350000,
    MoTa: 'Làm sạch sâu, tẩy tế bào chết, massage và đắp mặt nạ dưỡng ẩm.',
    KhuyenMai: 10,
  },
  {
    MaDichVu: 'DV002',
    TenDichVu: 'Massage toàn thân thư giãn',
    Gia: 500000,
    MoTa: 'Massage chuyên sâu giúp giảm căng thẳng, thư giãn cơ bắp.',
    KhuyenMai: 0,
  },
  {
    MaDichVu: 'DV003',
    TenDichVu: 'Trị liệu mụn chuyên sâu',
    Gia: 600000,
    MoTa: 'Quy trình làm sạch, lấy mụn và đắp mặt nạ kháng viêm.',
    KhuyenMai: 5,
  },
  {
    MaDichVu: 'DV004',
    TenDichVu: 'Nail Art cao cấp',
    Gia: 200000,
    MoTa: 'Thiết kế móng nghệ thuật với nhiều mẫu mã đa dạng.',
    KhuyenMai: 15,
  },
  {
    MaDichVu: 'DV005',
    TenDichVu: 'Gội đầu dưỡng sinh',
    Gia: 150000,
    MoTa: 'Gội đầu kết hợp massage đầu, vai, gáy giúp thư giãn và phục hồi tóc.',
    KhuyenMai: 0,
  },
];

const mockSanPham = [
  {
    MaSanPham: 'SP001',
    TenSanPham: 'Sữa rửa mặt dịu nhẹ',
    Loai: 'Chăm sóc da',
    Gia: 250000,
    MoTa: 'Sữa rửa mặt không gây kích ứng, phù hợp cho mọi loại da.',
    GiamGia: 0,
  },
  {
    MaSanPham: 'SP002',
    TenSanPham: 'Kem dưỡng ẩm ban đêm',
    Loai: 'Chăm sóc da',
    Gia: 400000,
    MoTa: 'Cung cấp độ ẩm sâu, tái tạo da trong khi ngủ.',
    GiamGia: 10,
  },
  {
    MaSanPham: 'SP003',
    TenSanPham: 'Son môi lì lâu trôi',
    Loai: 'Trang điểm',
    Gia: 180000,
    MoTa: 'Son môi với màu sắc tươi tắn, giữ màu lâu trôi.',
    GiamGia: 5,
  },
  {
    MaSanPham: 'SP004',
    TenSanPham: 'Tinh dầu trị liệu', /* Thêm TenSanPham bị thiếu ở đây */
    Loai: 'Trị liệu',
    Gia: 300000,
    MoTa: 'Tinh dầu thiên nhiên giúp thư giãn tinh thần và cơ thể.',
    GiamGia: 0,
  },
  {
    MaSanPham: 'SP005',
    TenSanPham: 'Mặt nạ giấy dưỡng trắng',
    Loai: 'Chăm sóc da',
    Gia: 50000,
    MoTa: 'Mặt nạ giấy giúp dưỡng trắng và làm đều màu da.',
    GiamGia: 20,
  },
];

// Hàm định dạng tiền tệ
// Currency formatting function
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'dichVuList', 'sanPhamList', 'dichVuDetail', 'sanPhamDetail'
  const [selectedDichVu, setSelectedDichVu] = useState(null);
  const [selectedSanPham, setSelectedSanPham] = useState(null);

  const handleSelectDichVu = (dv) => {
    setSelectedDichVu(dv);
    setCurrentView('dichVuDetail');
  };

  const handleSelectSanPham = (sp) => {
    setSelectedSanPham(sp);
    setCurrentView('sanPhamDetail');
  };

  const handleBackToList = () => {
    if (currentView === 'dichVuDetail') {
      setCurrentView('dichVuList');
    } else if (currentView === 'sanPhamDetail') {
      setCurrentView('sanPhamList');
    }
    setSelectedDichVu(null);
    setSelectedSanPham(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 font-sans text-gray-900">
      {/* Các liên kết CDN và font đã được chuyển sang public/index.html */}
      {/* Tailwind CSS CDN and font links have been moved to public/index.html */}

      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center rounded-b-3xl">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 md:mb-0">Dịch Vụ Làm Đẹp</h1>
        <nav className="flex space-x-4">
          <button
            onClick={() => setCurrentView('dichVuList')}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300
              ${currentView.startsWith('dichVu') ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Dịch Vụ
          </button>
          <button
            onClick={() => setCurrentView('sanPhamList')}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300
              ${currentView.startsWith('sanPham') ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Sản Phẩm
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {currentView === 'dichVuList' && <DichVuList onSelectDichVu={handleSelectDichVu} mockDichVu={mockDichVu} />}
        {currentView === 'dichVuDetail' && selectedDichVu && (
          <DichVuDetail dichVu={selectedDichVu} onBack={handleBackToList} />
        )}
        {currentView === 'sanPhamList' && <SanPhamList onSelectSanPham={handleSelectSanPham} mockSanPham={mockSanPham} />}
        {currentView === 'sanPhamDetail' && selectedSanPham && (
          <SanPhamDetail sanPham={selectedSanPham} onBack={handleBackToList} />
        )}
        {currentView === 'home' && (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Chào mừng đến với Spa của chúng tôi!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Khám phá các dịch vụ làm đẹp và sản phẩm chăm sóc da chất lượng cao của chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setCurrentView('dichVuList')}
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                Xem Dịch Vụ
              </button>
              <button
                onClick={() => setCurrentView('sanPhamList')}
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
              >
                Xem Sản Phẩm
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6 mt-8 rounded-t-3xl">
        <p>&copy; 2025 DichVuLamDep. Tất cả quyền được bảo lưu.</p>
        <p className="text-sm mt-2">Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</p>
        <p className="text-sm">Điện thoại: 0123 456 789 | Email: info@dichvulamdep.com</p>
      </footer>
    </div>
  );
}
