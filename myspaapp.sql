create database DichVuLamDep
go
use DichVuLamDep 
go

-- B?ng DichVu
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

-- B?ng SanPham
CREATE TABLE SanPham
(
    MaSanPham CHAR(10) NOT NULL PRIMARY KEY,
    TenSanPham NVARCHAR(50) NOT NULL,
    Loai NVARCHAR(50) NOT NULL, -- C� th? chi ti?t h?n nh? "Ch?m s�c da", "Trang ?i?m", v.v.
    Gia MONEY NOT NULL,
    MoTa NVARCHAR(MAX) NOT NULL,
    GiamGia SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT CK_SanPham_Gia CHECK (Gia >= 0),
    CONSTRAINT CK_SanPham_GiamGia CHECK (GiamGia >= 0 AND GiamGia <= 100)
);

-- B?ng KhachHang
CREATE TABLE KhachHang
(
    MaKhachHang CHAR(10) NOT NULL PRIMARY KEY,
    TenKhachHang NVARCHAR(50) NOT NULL,
    DiaChi NVARCHAR(100) NOT NULL, -- T?ng ?? d�i ??a ch?
    SoDienThoaiChinh VARCHAR(20), -- S? ?i?n tho?i ch�nh
);

-- B?ng NhanVien
CREATE TABLE NhanVien
(
    MaNhanVien CHAR(10) NOT NULL PRIMARY KEY,
    TenNhanVien NVARCHAR(50) NOT NULL,
    ChucVu NVARCHAR(50) NOT NULL, -- T?ng ?? d�i ch?c v?
    SoDienThoaiChinh VARCHAR(20), -- S? ?i?n tho?i ch�nh
);

-- B?ng TaiKhoan (M?t kh?u n�n ???c b?m v� th�m mu?i)
CREATE TABLE TaiKhoan
(
    MaTaiKhoan CHAR(10) NOT NULL PRIMARY KEY,
    MatKhauHash VARCHAR(128) NOT NULL, -- L?u tr? m?t kh?u ?� b?m
    MaNhanVien CHAR(10) NOT NULL UNIQUE, -- M?i nh�n vi�n c� 1 t�i kho?n duy nh?t
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- B?ng BaoCao (N?u l� b�o c�o ???c t?o ra)
CREATE TABLE BaoCao
(
    MaBaoCao CHAR(10) NOT NULL PRIMARY KEY,
    TenBaoCao NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(MAX),
    NgayTao DATETIME NOT NULL DEFAULT GETDATE(), -- Ng�y t?o b�o c�o
    MaNhanVien CHAR(10) NOT NULL,
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- B?ng KhachHang_SoDienThoai (cho ph�p nhi?u s? ?i?n tho?i ph?)
CREATE TABLE KhachHang_SoDienThoai
(
    SoDienThoai VARCHAR(20) NOT NULL,
    MaKhachHang CHAR(10) NOT NULL,
    PRIMARY KEY (SoDienThoai, MaKhachHang),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang)
);

-- B?ng NhanVien_SoDienThoai (cho ph�p nhi?u s? ?i?n tho?i ph?)
CREATE TABLE NhanVien_SoDienThoai
(
    SoDienThoai VARCHAR(20) NOT NULL,
    MaNhanVien CHAR(10) NOT NULL,
    PRIMARY KEY (SoDienThoai, MaNhanVien),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- B?ng PhieuDichVu
CREATE TABLE PhieuDichVu
(
    MaPhieu CHAR(10) NOT NULL PRIMARY KEY,
    NgayLapPhieu DATE NOT NULL DEFAULT GETDATE(), -- ??i t�n th�nh NgayLapPhieu cho r� r�ng
    TongSoLuongMatHang INT NOT NULL DEFAULT 0, -- T?ng s? l??ng s?n ph?m v� d?ch v? trong phi?u
    TongThanhToan MONEY NOT NULL,
    TrangThaiThanhToan NVARCHAR(30) NOT NULL, -- V� d?: 'Ch?a thanh to�n', '?� thanh to�n', '?� h?y'
    GhiChu NVARCHAR(MAX),
    MaKhachHang CHAR(10) NOT NULL,
    MaNhanVien CHAR(10) NOT NULL,
    CONSTRAINT CK_PhieuDichVu_TongSoLuongMatHang CHECK (TongSoLuongMatHang >= 0),
    CONSTRAINT CK_PhieuDichVu_TongThanhToan CHECK (TongThanhToan >= 0),
    FOREIGN KEY (MaKhachHang) REFERENCES KhachHang(MaKhachHang),
    FOREIGN KEY (MaNhanVien) REFERENCES NhanVien(MaNhanVien)
);

-- B?ng ChiTietPhieuDichVu (G?p chi ti?t d?ch v? v� s?n ph?m)
CREATE TABLE ChiTietPhieuDichVu
(
    MaChiTietPhieuDichVu CHAR(10) NOT NULL PRIMARY KEY,
    MaPhieu CHAR(10) NOT NULL,
    LoaiChiTiet NVARCHAR(20) NOT NULL, -- 'DichVu' ho?c 'SanPham'
    MaDichVu CHAR(10), -- NULL n?u l� s?n ph?m
    MaSanPham CHAR(10), -- NULL n?u l� d?ch v?
    SoLuong INT NOT NULL DEFAULT 1,
    DonGia MONEY NOT NULL, -- Gi� t?i th?i ?i?m giao d?ch
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