import * as React from "react";
import moment from "moment";

export default function PaymentRow({ pay, onRowClick }) {
  console.log("pay", pay);
  const getStatusStyles = (status) => {
    switch (status) {
      case -1: //Chờ thanh toán
        return "bg-[#FFD75B]";
      case 1: //Đã thanh toán
        return "bg-[#D1F669]";
      case 0: //Đã hủy
        return "bg-[#DF322B] text-white";
      default:
        return "bg-[#FFD75B]";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case -1:
        return "Chờ thanh toán";
      case 1:
        return "Đã thanh toán";
      case 0:
        return "Đã hủy";
      default:
        return "Chờ thanh toán";
    }
  };

  return (
    <div
      className="flex overflow-hidden flex-wrap mt-3 w-full bg-white text-[#131313] min-h-[3.75rem] max-md:min-h-[2.75rem] cursor-pointer"
      onClick={() => onRowClick && onRowClick(pay)} // Truyền toàn bộ `pay` khi gọi onRowClick
    >
      {/* Mã thanh toán */}
      <div className="flex basis-1/6 min-w-0 justify-center px-[0.25rem] items-center bg-[#EBF1F9]">
        <span className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {pay.orderId ? pay.orderId : pay._id}
        </span>
      </div>

      {/* Tên người dùng */}
      <div className="flex basis-1/6 min-w-0 justify-center px-[0.25rem] items-center">
        <span className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {pay.UserId?.UserFullName}
        </span>
      </div>

      {/* Mã khóa học */}
      <div className="flex basis-1/6 min-w-0 justify-center px-[0.25rem] items-center bg-[#EBF1F9]">
        <span className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {pay.CourseId?.CourseName}
        </span>
      </div>

      {/* Giá */}
      <div className="flex basis-1/6 min-w-0 justify-center px-[0.25rem] items-center">
        <span className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {pay.PayTotal ? pay.PayTotal : 0}
        </span>
      </div>

      {/* Thời gian */}
      <div className="flex basis-1/6 min-w-0 justify-center px-[0.25rem] items-center bg-[#EBF1F9]">
        <span className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {moment(pay.createdBy.createdAt).format("DD/MM/YYYY hh:mm:ss")}
        </span>
      </div>

      {/* Trạng thái */}
      <div className="flex basis-1/6 min-w-0 justify-center px-[0.25rem] items-center">
        <div
          className={`self-center shrink w-[90%] px-3 py-2 justify-center items-center inline-flex ${getStatusStyles(
            pay.PayStatus
          )} min-h-[2.5rem] max-md:min-h-[2.75rem] rounded-[6.25rem]`}
        >
          <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
            {getStatusText(pay.PayStatus)}
          </span>
        </div>
      </div>
    </div>
  );
}
