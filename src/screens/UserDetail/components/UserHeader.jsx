import React, { useState } from "react";
import BlockUserModal from "./BlockUserModal";
import {
  userUnblockController,
  userBlockController,
} from "../../../controllers/user.controller";

function UserHeader({ data, role, setLoadingPopup }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isBlocked, setIsBlocked] = useState(!data?.UserStatus); // Trạng thái chặn người dùng

  // Hàm mở popup
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  // Hàm đóng popup
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // Hàm xử lý khi xác nhận chặn người dùng
  const handleBlockUser = async () => {
    const result = await userBlockController(setLoadingPopup, data._id);
    if (result.code === 200) {
      setIsBlocked(true); // Chuyển trạng thái thành "đã chặn"
      setIsPopupVisible(false); // Đóng popup
    }
  };

  // Hàm xử lý khi xác nhận bỏ chặn người dùng
  const handleUnblockUser = async () => {
    // Gọi API đổi trạng thái
    const result = await userUnblockController(setLoadingPopup, data._id);
    if (result.code === 200) {
      setIsBlocked(false); // Chuyển trạng thái thành "không bị chặn"
      setIsPopupVisible(false); // Đóng popup
    }
  };

  return (
    <div className="flex flex-wrap gap-3 items-center w-full font-medium max-md:max-w-full">
      <img
        loading="lazy"
        src={
          data?.UserAvatar
            ? data.UserAvatar
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/bbae0514e8058efa2ff3c88f32951fbd7beba3099187677c6ba1c2f96547ea3f?placeholderIfAbsent=true&apiKey=e677dfd035d54dfb9bce1976069f6b0e"
        }
        alt="User profile avatar"
        className="object-cover rounded-full shrink-0 self-stretch my-auto aspect-square w-[9rem]"
      />
      <div className="flex flex-col flex-1 shrink items-start self-stretch my-auto text-[1.125rem] max-md:text-[1rem] basis-[1.5rem] min-w-[15rem] max-md:max-w-full">
        <div className="flex flex-col">
          <div className="text-2xl font-semibold text-[#171717]">
            {data.UserFullName}
          </div>
          <div className="flex gap-1 items-center self-start mt-3">
            <div className="self-stretch my-auto text-[#171717] text-opacity-50">
              Tổng hóa đơn:
            </div>
            <div className="self-stretch my-auto text-[#171717]">
              {data.UserMoney ? data.UserMoney : 0}
            </div>
          </div>
          <div className="mt-3 text-[#171717] text-opacity-50">
            {data.UserEmail}
          </div>
        </div>
      </div>

      {/* Nút chặn hoặc bỏ chặn */}
      {isBlocked ? (
        <button
          disabled={!role?.RolePermissions?.includes("user_edit")}
          className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto text-[1.25rem] max-md:text-[1rem] leading-none text-white whitespace-nowrap rounded-lg min-h-[2rem] ${
            role?.RolePermissions?.includes("user_edit")
              ? "bg-[#6C8299] hover:bg-[#55657a]"
              : "bg-[#CDD5DF] cursor-not-allowed"
          }`}
          aria-label="Block user"
          onClick={showPopup} // Mở popup để xác nhận bỏ chặn
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/unlock.svg`}
            className="object-contain shrink-0 my-auto w-6 aspect-square"
            alt="Unlock icon" // Cung cấp thông tin alt nếu icon mang ý nghĩa quan trọng
          />
          <span className="gap-2.5 self-stretch my-auto">Bỏ chặn</span>
        </button>
      ) : (
        <button
          disabled={!role?.RolePermissions?.includes("user_edit")}
          className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto text-[1.25rem] max-md:text-[1rem] leading-none text-white whitespace-nowrap rounded-lg min-h-[46px] ${
            role?.RolePermissions?.includes("user_edit")
              ? "bg-[#DF322B] hover:bg-[#902723]"
              : "bg-[#ffd1d1] cursor-not-allowed"
          }`}
          aria-label="Block user"
          onClick={showPopup} // Mở popup để xác nhận chặn
        >
          <img
            src={`${process.env.PUBLIC_URL}/icons/lock.svg`}
            className="object-contain shrink-0 my-auto w-6 aspect-square"
            alt="Lock icon" // Cung cấp thông tin alt nếu icon mang ý nghĩa quan trọng
          />
          <span className="gap-2.5 self-stretch my-auto">Chặn</span>
        </button>
      )}

      {/* Sử dụng BlockUserModal */}
      {isPopupVisible && (
        <BlockUserModal
          isBlocked={isBlocked} // Truyền trạng thái isBlocked để biết modal dùng cho chặn hay bỏ chặn
          onConfirm={isBlocked ? handleUnblockUser : handleBlockUser} // Xác nhận chặn hoặc bỏ chặn
          onCancel={closePopup} // Đóng popup khi hủy
        />
      )}
    </div>
  );
}

export default UserHeader;
