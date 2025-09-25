import * as React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function TableHeader({ role }) {
  const navigate = useNavigate(); // Khởi tạo navigate

  // Hàm xử lý khi nhấn vào nút "Banner mới"
  const handleAddBanner = () => {
    navigate("/banner/create"); // Chuyển hướng đến trang AddBannerPage
  };

  return (
    <div className="flex overflow-hidden mt-3 flex-wrap w-full rounded-t-3xl bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem]  max-md:max-w-full">
      <div className="flex basis-1/6 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem]  gap-3 justify-center items-center  whitespace-nowrap bg-[#EBF1F9] px-[0.25rem]">
        <div className="gap-2.5 self-stretch text-center my-auto">STT</div>
      </div>
      <div className="flex basis-1/3 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem]  shrink gap-3 justify-center items-center  text-white max-md:max-w-full px-[0.25rem]">
        <div className="gap-2.5 self-stretch text-center my-auto">
          Tên banner
        </div>
      </div>
      <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem]  shrink gap-3 justify-center items-center  bg-[#EBF1F9] max-md:max-w-full px-[0.25rem]">
        <div className="gap-2.5 self-stretch text-center my-auto">
          Khóa học liên kết
        </div>
      </div>
      <button
        disabled={!role?.RolePermissions?.includes("banner_create")}
        className={`flex basis-1/4 min-w-0 gap-[0.75rem] text-center justify-center items-center min-h-[3.75rem] max-md:min-h-[2.75rem] text-white px-[0.25rem] ${
          role?.RolePermissions?.includes("banner_create")
            ? "bg-[#6C8299] hover:bg-[#55657a]"
            : "bg-[#CDD5DF] cursor-not-allowed"
        }`}
        onClick={handleAddBanner} // Gắn sự kiện onClick để điều hướng
      >
        <img
          loading="lazy"
          src={process.env.PUBLIC_URL + "./icons/paper_plus.svg"}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[1.875rem]"
        />
        <div className="gap-2.5 self-stretch text-center my-auto">
          Banner mới
        </div>
      </button>
    </div>
  );
}

export default TableHeader;
