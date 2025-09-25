import * as React from "react";

function OrderTableRow({ data }) {
  return (
    <div className="flex overflow-hidden flex-wrap mt-3 w-full bg-white text-[#171717] min-h-[3.75rem] cursor-pointer">
      {/* Mã khóa học */}
      <div className="flex basis-1/3 min-w-0 justify-center items-center ">
        <div className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {data._id}
        </div>
      </div>
      {/* Tên khóa học */}
      <div className="flex basis-1/3 min-w-0 justify-center items-center p-3 bg-[#EBF1F9] text-[#171717]">
        <div className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {data.CourseName}
        </div>
      </div>
      {/* Giá */}
      <div className="flex basis-1/3 min-w-0 justify-center items-center ">
        <div className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {data.CoursePrice * ((100 - data.CourseDiscount) / 100)}
        </div>
      </div>
    </div>
  );
}

export default OrderTableRow;
