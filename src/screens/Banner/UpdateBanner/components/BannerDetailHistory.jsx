import React, { useEffect, useState } from "react";
import { bannerDetailHistoryController } from "../../../../controllers/history.controller";
import { useParams } from "react-router-dom";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hhmmss = d.toTimeString().split(" ")[0];
  return `${dd}/${mm}/${yyyy} @ ${hhmmss}`;
}

// Chuyển hành động thành text + màu
const getActionStyle = (action) => {
  switch (action) {
    case "create":
      return { text: "THÊM", color: "text-[#34A853]" };
    case "edit":
      return { text: "SỬA", color: "text-[#F19F19]" };
    case "delete":
      return { text: "XÓA", color: "text-[#DF322B]" };
    default:
      return { text: "KHÁC", color: "text-gray-500" };
  }
};

export default function BannerDetailHistory({ onClose }) {
  const [isOpen, setIsOpen] = useState(true); // Trạng thái popup
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { BannerID } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await bannerDetailHistoryController(
          setLoading,
          BannerID
        );
        // console.log(result)
        if (result) {
          setData(result); // Lưu dữ liệu nếu hợp lệ
        }
      } catch (error) {
        console.error("Error fetching lesson history:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [BannerID]);

  console.log("Banner detail history => ", data);

  // Hàm đóng popup
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); // Gọi hàm cha nếu có
  };

  // Nếu popup bị đóng, không render nữa
  if (!isOpen) return null;

  const filteredData = data?.filter((item) => {
    const keyword = searchTerm.toLowerCase();
    const formatted = formatDate(item.timestamp).toLowerCase();
    const actionText = getActionStyle(item.action).text.toLowerCase();
    return (
      item.userName?.toLowerCase().includes(keyword) ||
      formatted.includes(keyword) ||
      actionText.includes(keyword)
    );
  });

  if (loading) {
    return "Đang tải...";
  }
  return (
    <main className="relative flex overflow-hidden flex-col justify-start items-center md:p-[2.5rem] p-[1.5rem] text-[1.5rem] font-medium leading-6 text-white rounded-[1.125rem] bg-white max-md:max-w-[90%] max-w-[60%] w-full max-h-[85%] max-md:p-5">
      {/* Nút đóng popup */}
      <img
        loading="lazy"
        src="/icons/CloseSquare.svg"
        className="w-6 h-6 object-contain z-10 cursor-pointer self-end"
        alt="Close icon"
        onClick={handleClose}
      />
      <div className="flex gap-3 items-center md:text-[1.25rem] text-[1rem] px-[0.75rem] py-[0.5rem] mt-2 w-full leading-none text-[#6C8299] bg-white backdrop-blur-[100px] min-h-[3rem] rounded-[100px] border border-solid border-[#6C8299] max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/669888cc237b300e928dbfd847b76e4236ef4b5a?placeholderIfAbsent=true&apiKey=d911d70ad43c41e78d81b9650623c816"
          alt="Search icon"
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[1.875rem]"
        />
        <input
          type="search"
          id="search-input"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 md:text-[1.25rem] text-[1rem] bg-transparent border-none outline-none placeholder-[#6C8299] text-[#6C8299] focus:ring-2 focus:ring-red-dark focus:ring-opacity-50"
        />
      </div>
      {!data && (
        <p className="text-black text-base">Không có dữ liệu lịch sử.</p>
      )}
      {filteredData && filteredData.length > 0 ? (
        <div className="flex flex-col gap-3 justify-start self-start w-full mt-4 max-h-[70vh] overflow-y-auto">
          {filteredData.map((history, index) => {
            const name = history.userName;
            const avatar = history.userAvatar;
            const time = formatDate(history.timestamp);
            const { text, color } = getActionStyle(history.action);
            return (
              <div
                key={index}
                className="flex gap-2 justify-start items-center w-full"
              >
                <img
                  loading="lazy"
                  src={avatar}
                  alt="Avatar"
                  className="rounded-full object-cover shrink-0 w-[2rem] h-[2rem] max-md:w-[1.85rem] max-md:h-[1.85rem]"
                />
                <h4 className="font-medium md:text-[1.125rem] text-[1rem] text-black">
                  {name}, ({time})
                </h4>
                <span className={`${color} font-medium md:text-[1.125rem] text-[1rem]`}>{text}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-black text-base">Không có dữ liệu lịch sử.</p>
      )}
    </main>
  );
}
