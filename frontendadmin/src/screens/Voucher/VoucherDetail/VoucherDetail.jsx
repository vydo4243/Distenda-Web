import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import VoucherInfoUpdate from "./components/VoucherInfoUpdate"; // Component cập nhật voucher
import { voucherDetailService } from "./../../../services/voucher.service.js"; // Dịch vụ lấy dữ liệu voucher chi tiết

function VoucherDetail() {
  const { VoucherID } = useParams(); 
  const [voucherData, setVoucherData] = useState(null); // State để lưu dữ liệu voucher

  useEffect(() => {
    const fetchVoucherData = async () => {
      const data = await voucherDetailService(VoucherID); // Gửi VoucherID tới API
      if (data) {
        setVoucherData(data); // Lưu dữ liệu vào state nếu có
      } else {
        console.error("Không tìm thấy voucher với ID:", VoucherID);
      }
    };

    fetchVoucherData(); // Gọi hàm fetchVoucherData
  }, [VoucherID]); // Chạy lại khi VoucherID thay đổi

  if (!voucherData) return <div>Loading...</div>; // Hiển thị khi dữ liệu chưa có

  return (
    <main className="flex flex-col flex-1 shrink p-[4rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[15rem] min-h-screen max-md:px-[1.25rem] max-md:max-w-full">
      <VoucherInfoUpdate voucher={voucherData} />
    </main>
  );
}

export default VoucherDetail;
