import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VoucherRow = ({ id, index, voucher, isDeleted = false }) => {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);

  if (!voucher) return null;;

  const {
    voucherCode = "Chưa có mã",
    minAmount = 0,
    discountPercentage = 0,
    discountAmount = 0,
    status = -1,
  } = voucher;

  const handleEdit = () => {
    navigate(`/voucher/detail/${id}`);
  };

  const toggleVisibility = (e) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  const getStatusStyles = (status) => {
    if (status === 1) return { bgColor: "bg-[#D1F669]", text: "Hoạt động" };
    if (status === 0) return { bgColor: "bg-[#FFD75B]", text: "Tạm dừng" };
    return { bgColor: "bg-gray-300", text: "Không xác định" };
  };

  const statusInfo = getStatusStyles(status);

  return (
    <div
      className="flex pt-3 basis-1/6 min-w-0 justify-center items-center"
      onClick={handleEdit}
    >
      <Cell bg="bg-[#EBF1F9]" content={index + 1} />
      <Cell content={voucherCode} />
      <Cell bg="bg-[#EBF1F9]" content={minAmount} />
      <Cell content={`${discountPercentage}%`} />
      <Cell bg="bg-[#EBF1F9]" content={discountAmount} />
      <div className="flex basis-1/6 min-w-0 justify-center items-center">
        <button
          className={`self-center shrink w-[90%] px-3 py-2 justify-center items-center inline-flex ${statusInfo.bgColor} min-h-[2.5rem] rounded-[6.25rem]`}
          onClick={toggleVisibility}
        >
          <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
            {statusInfo.text}
          </span>
        </button>
      </div>
    </div>
  );
};

// Component Cell tái sử dụng
const Cell = ({ bg = "", content }) => (
  <div className={`flex basis-1/6 min-w-0 cursor-pointer min-h-[3.75rem] max-md:min-h-[2.75rem] justify-center p-3 items-center ${bg}`}>
    <span className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
      {content}
    </span>
  </div>
);

export default VoucherRow;
