import React, { useRef } from "react";

/* eslint-disable jsx-a11y/img-redundant-alt */
export function AccountHeader({
  name,
  email,
  avatarSrc,
  updateIconSrc,
  openPopup,
  onAvatarChange,
  uploadImagePreviewRef,
}) {
  const fileInputRef = useRef(null); // Tham chiếu đến input file

  // Hàm xử lý nhấp vào ảnh
  const handleImageClick = () => {
    fileInputRef.current.click(); // Kích hoạt input file
  };

  return (
    <div className="flex flex-wrap gap-[1.5rem] items-start w-full max-md:max-w-full ">
      <div className="flex flex-wrap flex-1 shrink gap-3 items-center basis-4 min-w-[15rem] max-md:max-w-full">
        <div className="flex flex-col">
          {/* Ảnh đại diện */}
          <img
            ref={uploadImagePreviewRef}
            loading="lazy"
            src={avatarSrc}
            alt={`Profile picture of ${name}`}
            className="object-cover shrink-0 self-stretch my-auto aspect-square rounded-full w-[7.5rem] max-md:w-[4rem]   cursor-pointer"
            onClick={handleImageClick} // Gọi hàm khi nhấp vào ảnh
          />
          {/* Input file ẩn */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Ẩn input file
            accept="image/*" // Chỉ nhận file ảnh
            onChange={onAvatarChange} // Gọi hàm xử lý khi người dùng chọn ảnh
          />
        </div>
        <div className="flex flex-col self-stretch my-auto">
          <div className="flex flex-col">
            <div className="text-[1.5rem] max-md:text-[1.25rem] font-semibold text-neutral-900">
              {name}
            </div>
            <div className="mt-3 text-[1.125rem] max-md:text-[1rem] font-medium text-neutral-900 text-opacity-50">
              {email}
            </div>
          </div>
        </div>
      </div>
      {/* Nút Cập nhật */}
      <button
        className="flex gap-3 justify-center items-center px-[0.75rem] py-[0.75rem] max-md:px-[0.5rem] max-md:py-[0.5rem] text-[1.25rem] max-md:text-[1rem] font-medium text-white rounded-lg bg-[#6C8299] w-fit"
        onClick={openPopup} // Gọi hàm mở popup
        tabIndex="0"
      >
        <img
          loading="lazy"
          src={updateIconSrc}
          alt=""
          className="object-contain shrink-0 self-center my-auto w-[1.5rem] aspect-square"
        />
        <span className="gap-2.5 self-center text-center my-auto">
          Cập nhật
        </span>
      </button>
    </div>
  );
}
