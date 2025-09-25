import * as React from "react";

function TableHeader() {
  return (
    <div className="flex overflow-hidden w-full rounded-t-[1.5rem] bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem]">
      {/* Mã hóa đơn */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Mã hóa đơn</span>
      </div>

      {/* Tên người dùng */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
        <span className="text-center">Tên người dùng</span>
      </div>

      {/* Mã khóa học */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Tên khóa học</span>
      </div>

      {/* Giá */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
        <span className="text-center">Giá</span>
      </div>

      {/* Thời gian */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Thời gian</span>
      </div>

      {/* Trạng thái */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
        <span className="text-center">Trạng thái</span>
      </div>
    </div>
  );
}

export default TableHeader;
