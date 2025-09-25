import * as React from "react";
import { useNavigate } from "react-router-dom";

function TableHeader() {
  const navigate = useNavigate();

  const handleAddVoucher = () => {
    navigate("/voucher/create");
  };

  return (
    <div className="flex overflow-hidden w-full rounded-t-[1.5rem] bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem]">
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center text-[#131313] text-[1.25rem] max-md:text-[1rem] font-medium truncate">STT</span>
      </div>
      <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
        <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">Mã voucher</span>
      </div>
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center text-[#131313] text-[1.25rem] max-md:text-[1rem] font-medium truncate">Giá tối thiểu</span>
      </div>
      <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
        <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">Giảm giá</span>
      </div>
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center text-[#131313] text-[1.25rem] max-md:text-[1rem] font-medium truncate">Giới hạn</span>
      </div>
      <button
        className="flex gap-[0.5rem] basis-1/6 min-w-0 justify-center items-center text-white"
        onClick={handleAddVoucher}>
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "/icons/paper_plus.svg"}
          alt=""
          className="object-contain aspect-square w-[1.875rem]"
        />
        <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">Voucher mới</span>
      </button>
    </div>
  );
}

export default TableHeader;
