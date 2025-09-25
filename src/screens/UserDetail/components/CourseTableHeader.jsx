import * as React from "react";

export default function CourseTableHeader() {

  return (
    <div className="flex overflow-hidden w-full rounded-t-[1.5rem] bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem]">
      {/* STT */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center text-white">
        <span className="text-center">Số thứ tự</span>
      </div>

      {/* Tên khóa */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Tên khóa</span>
      </div>

      {/* Ngày tham gia */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center text-white">
        <span className="text-center">Ngày bắt đầu học</span>
      </div>

      {/* Lần cuối cập nhật */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Lần cuối cập nhật</span>
      </div>

      {/* Trạng thái */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center text-white">
        <span className="text-center">Trạng thái</span>
      </div>
    </div>
  );
}