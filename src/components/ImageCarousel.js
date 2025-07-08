import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect để tự động chuyển ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Chuyển ảnh mỗi 4 giây
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [images.length]); // Chạy lại khi số lượng ảnh thay đổi

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-lg mb-8">
      {/* Container cho các ảnh, sử dụng flexbox để xếp ảnh ngang hàng */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Dịch chuyển container ảnh
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full flex-shrink-0 object-cover h-64 md:h-96" // Đảm bảo ảnh chiếm toàn bộ chiều rộng và có chiều cao cố định
          />
        ))}
      </div>
      {/* Các nút điều hướng (chấm tròn) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
