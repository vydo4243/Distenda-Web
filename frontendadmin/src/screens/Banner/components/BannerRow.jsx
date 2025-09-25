import * as React from "react";
import { useNavigate } from "react-router-dom";

function BannerRow({ id, index, name, linkedCourse, role }) {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng
  const [isHidden, setIsHidden] = React.useState(false); // Trạng thái ẩn hoặc hiện

  const handleEdit = () => {
    // Điều hướng đến trang UpdateBannerPage
    navigate(`/banner/edit/${id}`);
  };

  const toggleVisibility = () => {
    // Chuyển đổi trạng thái ẩn hoặc hiện
    setIsHidden(!isHidden);
  };

  return (
    <div className="flex overflow-hidden flex-wrap mt-3 w-full bg-white min-h-[3.75rem] max-md:min-h-[2.75rem]  max-md:max-w-full">
      {/* Cột ID */}
      <div className="flex basis-1/6 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem]  justify-center items-center bg-[#EBF1F9] px-[0.25rem]">
        <div className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium truncate">
          {index}
        </div>
      </div>

      {/* Cột Tên */}
      <div className="flex basis-1/3 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem]  shrink gap-3 justify-center items-center px-[0.25rem] max-md:max-w-full">
      <div className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium truncate">
          {name}
        </div>
      </div>

      {/* Cột Khóa học liên kết */}
      <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem]  shrink gap-3 justify-center items-center px-[0.25rem] bg-[#EBF1F9] max-md:max-w-full">
        <div className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium truncate">
          {linkedCourse}
        </div>
      </div>

      {/* Cột Hành động */}
      <div className="flex basis-1/4 min-w-0 shrink gap-3 justify-center items-center px-[0.75rem] min-h-[3.75rem] max-md:min-h-[2.75rem]  max-md:max-w-full">
        {/* Nút Sửa */}
        <button
          disabled={!role?.RolePermissions?.includes("banner_edit")}
          className={`flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-[0.75rem] rounded-[99px] ${
            role?.RolePermissions?.includes("banner_edit")
              ? "bg-[#D1F669] hover:bg-[#a3e635]"
              : "bg-[#f0ffc7] cursor-not-allowed"
          }`}
          onClick={handleEdit}
        >
          <div className="self-center shrink w-[90%] max-w-full p-[0.75rem] rounded-[99px] justify-center items-center inline-flex text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium">
            Sửa
          </div>
        </button>

        {/* Nút Ẩn/Bỏ Ẩn */}
        <button
          disabled={!role?.RolePermissions?.includes("banner_edit")}
          className={`flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-[0.75rem]  ${
            isHidden ? "bg-gray-300" : "bg-[#FFD75B]"
          } basis-0 rounded-[99px] ${
            role?.RolePermissions?.includes("banner_edit")
              ? isHidden
                ? "bg-[#d1d5db] hover:bg-[#a7b4c8"
                : "bg-[#FFD75B] hover:bg-[#ffd042]"
              : isHidden
              ? "bg-[#dadada] cursor-not-allowed"
              : "bg-[#ffeeba] cursor-not-allowed"
          }`}
          onClick={toggleVisibility}
        >
          <div className="self-center shrink w-[90%] max-w-full p-[0.75rem] rounded-[99px] justify-center items-center inline-flex text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium">
            {isHidden ? "Bỏ Ẩn" : "Ẩn"}
          </div>
        </button>
      </div>
    </div>
  );
}

export default BannerRow;
