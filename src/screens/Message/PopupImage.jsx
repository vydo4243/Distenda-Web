import React from "react";

// Component để hiển thị hình ảnh với bóng đổ
// function ImageWithShadow({ src, alt }) {
//   return (
//     <img
//       loading="lazy"
//       src={src}
//       alt={alt}
//       className="object-contain shrink-0 bg-none w-[60px]"
//     />
//   );
// }

function PopupImage({ onClose, content }) {
  const [isOpen, setIsOpen] = React.useState(true); // Trạng thái popup

  // Hàm đóng popup
  const handleClose = (e) => {
    // Kiểm tra nếu người dùng click vào nền đen hoặc icon đóng
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      onClose && onClose(); // Đảm bảo gọi onClose từ cha nếu có
    }
  };

  // Dữ liệu hình ảnh trang trí ở các góc
  // const cornerImages = [
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/59b9819b2f8bcba5a532bac25a2a11282419b6aabd38e3a3bd70b97c7bbec430?placeholderIfAbsent=true&apiKey=e677dfd035d54dfb9bce1976069f6b0e",
  //     alt: "Top left decorative element",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/631194690e0d3936d5085113c8d86eb3414e79c243145ce47d95df9316e6e37e?placeholderIfAbsent=true&apiKey=e677dfd035d54dfb9bce1976069f6b0e",
  //     alt: "Top right decorative element",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/29ca412ec35dc720602a949c8cfc32eb796543795e2d5aa33c030019556c26ae?placeholderIfAbsent=true&apiKey=e677dfd035d54dfb9ce1976069f6b0e",
  //     alt: "Bottom left decorative element",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/37fc4790a46aa078c69f7f7e2592a3795899a59503c0ea27bb49607794680bdf?placeholderIfAbsent=true&apiKey=e677dfd035d54dfb9bce1976069f6b0e",
  //     alt: "Bottom right decorative element",
  //   },
  // ];

  // Nếu popup đã đóng, không render gì
  if (!isOpen) return null;

    return (
        <div
            className="fixed top-0 object-contain inset-0 z-50 bg-none h-screen w-screen"
            onClick={handleClose}
        >
            <div className="flex flex-col justify-center max-w-full h-full bg-black bg-opacity-50 backdrop-blur-[60px]  p-[20px] ">
                <div className="">
                    <button className="w-full h-[20px]">
                        
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbfb14016c67d4716e0a6366eed76fac938e5a78f6cba88c3ed041abcc52d72?placeholderIfAbsent=true&apiKey=e677dfd035d54dfb9bce1976069f6b0e"
                            className="absolute top-[20px] right-[2rem] w-[1.5rem] h-[1.5rem] object-contain z-50"
                            alt="Close icon"
                            onClick={handleClose} // Gọi hàm handleClose khi click vào icon
                        />
                    </button>
                </div>

                {/* Nội dung chính của popup chỉ hiển thị ảnh */}
                <div className="justify-center self-center items-center  max-h-screen">
                    <img
                        loading="lazy"
                        src={content || ""}
                        alt="abc"
                        className="self-center object-cover"
                        style={{
                            objectFit: 'contain', // Dùng 'contain' để giữ tỷ lệ
                            width: '100%', // Đặt chiều rộng là 100% của container
                            height: '100%', // Tự động tính chiều cao theo tỷ lệ
                            boxShadow: '2px 2px 100px rgba(0, 0, 0, 0.3)',
                        }}
                        />
                    </div>
            
                </div>
            </div>
        );
    }
    
    export default PopupImage;
    