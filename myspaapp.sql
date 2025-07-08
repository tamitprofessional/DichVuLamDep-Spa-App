create database DichVuLamDep
go
use DichVuLamDep 
go

-- Bảng DichVu
CREATE TABLE DichVu
(
    MaDichVu CHAR(10) NOT NULL PRIMARY KEY,
    TenDichVu NVARCHAR(50) NOT NULL,
    Gia MONEY NOT NULL,
    MoTa NVARCHAR(MAX) NOT NULL,
    KhuyenMai SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT CK_DichVu_Gia CHECK (Gia >= 0),
    CONSTRAINT CK_DichVu_KhuyenMai CHECK (KhuyenMai >= 0 AND KhuyenMai <= 100)
);

-- Bảng SanPham
CREATE TABLE SanPham
(
    MaSanPham CHAR(10) NOT NULL PRIMARY KEY,
    TenSanPham NVARCHAR(50) NOT NULL,
    Loai NVARCHAR(50) NOT NULL, -- Có thể chi tiết hơn như "Chăm sóc da", "Trang điểm", v.v.
    Gia MONEY NOT NULL,
    MoTa NVARCHAR(MAX) NOT NULL,
    GiamGia SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT CK_SanPham_Gia CHECK (Gia >= 0),
    CONSTRAINT CK_SanPham_GiamGia CHECK (GiamGia >= 0 AND GiamGia <= 100)
);

-- Bảng KhachHang
CREATE TABLE KhachHang
(
    MaKhachHang CHAR(10) NOT NULL PRIMARY KEY,
    TenKhachHang NVARCHAR(50) NOT NULL,
    DiaChi NVARCHAR(100) NOT NULL, -- Tăng độ dài địa chỉ
    SoDienThoaiChinh VARCHAR(20), -- Số điện thoại chính
);

-- Bảng NhanVien
CREATE TABLE NhanVien
(
    MaNhanVien CHAR(10) NOT NULL PRIMARY KEY,
    TenNhanVien NVARCHAR(50) NOT NULL,
    ChucVu NVARCHAR(50) NOT NULL, -- Tăng độ dài chức vụ
    SoDienThoaiChinh VARCHAR(20), -- Số điện thoại chính
);

-- Bảng TaiKhoan (Mật khẩu nên được băm và thêm muối)
CREATE TABLE TaiKhoan
(
    MaTaiKhoan CHAR(10) NOT NULL PRIMARY KEY,
    MatKhauHash VARCHAR(128) NOT NULL, -- Lưu trữ mật khẩu đã băm
    MaNhanVien CHAR(10) NOT NULL UNIQUE, -- Mỗi nhân viên có 1 tài khoản duy nhất
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- Bảng BaoCao (Nếu là báo cáo được tạo ra)
CREATE TABLE BaoCao
(
    MaBaoCao CHAR(10) NOT NULL PRIMARY KEY,
    TenBaoCao NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(MAX),
    NgayTao DATETIME NOT NULL DEFAULT GETDATE(), -- Ngày tạo báo cáo
    MaNhanVien CHAR(10) NOT NULL,
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- Bảng KhachHang_SoDienThoai (cho phép nhiều số điện thoại phụ)
CREATE TABLE KhachHang_SoDienThoai
(
    SoDienThoai VARCHAR(20) NOT NULL,
    MaKhachHang CHAR(10) NOT NULL,
    PRIMARY KEY (SoDienThoai, MaKhachHang),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang)
);

-- Bảng NhanVien_SoDienThoai (cho phép nhiều số điện thoại phụ)
CREATE TABLE NhanVien_SoDienThoai
(
    SoDienThoai VARCHAR(20) NOT NULL,
    MaNhanVien CHAR(10) NOT NULL,
    PRIMARY KEY (SoDienThoai, MaNhanVien),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- Bảng PhieuDichVu
CREATE TABLE PhieuDichVu
(
    MaPhieu CHAR(10) NOT NULL PRIMARY KEY,
    NgayLapPhieu DATE NOT NULL DEFAULT GETDATE(), -- Đổi tên thành NgayLapPhieu cho rõ ràng
    TongSoLuongMatHang INT NOT NULL DEFAULT 0, -- Tổng số lượng sản phẩm và dịch vụ trong phiếu
    TongThanhToan MONEY NOT NULL,
    TrangThaiThanhToan NVARCHAR(30) NOT NULL, -- Ví dụ: 'Chưa thanh toán', 'Đã thanh toán', 'Đã hủy'
    GhiChu NVARCHAR(MAX),
    MaKhachHang CHAR(10) NOT NULL,
    MaNhanVien CHAR(10) NOT NULL,
    CONSTRAINT CK_PhieuDichVu_TongSoLuongMatHang CHECK (TongSoLuongMatHang >= 0),
    CONSTRAINT CK_PhieuDichVu_TongThanhToan CHECK (TongThanhToan >= 0),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- Bảng ChiTietPhieuDichVu (Gộp chi tiết dịch vụ và sản phẩm)
CREATE TABLE ChiTietPhieuDichVu
(
    MaChiTietPhieuDichVu CHAR(10) NOT NULL PRIMARY KEY,
    MaPhieu CHAR(10) NOT NULL,
    LoaiChiTiet NVARCHAR(20) NOT NULL, -- 'DichVu' hoặc 'SanPham'
    MaDichVu CHAR(10), -- NULL nếu là sản phẩm
    MaSanPham CHAR(10), -- NULL nếu là dịch vụ
    SoLuong INT NOT NULL DEFAULT 1,
    DonGia MONEY NOT NULL, -- Giá tại thời điểm giao dịch
    ThanhTien MONEY NOT NULL, -- SoLuong * DonGia
    GhiChu NVARCHAR(MAX),
    CONSTRAINT CK_CTPDV_LoaiChiTiet CHECK (LoaiChiTiet IN ('DichVu', 'SanPham')),
    CONSTRAINT CK_CTPDV_MaDichVu_MaSanPham CHECK (
        (LoaiChiTiet = 'DichVu' AND MaDichVu IS NOT NULL AND MaSanPham IS NULL) OR
        (LoaiChiTiet = 'SanPham' AND MaSanPham IS NOT NULL AND MaDichVu IS NULL)
    ),
    CONSTRAINT CK_CTPDV_SoLuong CHECK (SoLuong > 0),
    CONSTRAINT CK_CTPDV_DonGia CHECK (DonGia >= 0),
    CONSTRAINT CK_CTPDV_ThanhTien CHECK (ThanhTien >= 0),
    FOREIGN KEY (MaPhieu) REFERENCES PhieuDichVu(MaPhieu),
    FOREIGN KEY (MaDichVu) REFERENCES DichVu(MaDichVu),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham)
);
select * from DichVu