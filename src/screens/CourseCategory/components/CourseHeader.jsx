import React from "react";
import { useNavigate } from "react-router-dom";

function CourseHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/courses"); // Điều hướng đến trang CoursePage
  };

  return (
    <div className="flex flex-wrap gap-3 items-start self-end mt-3 text-[1.5rem] max-md:text-[1.125rem] text-white max-md:max-w-full">
      <button
        className="flex gap-2 justify-center items-center p-3 max-md:p-2 rounded-lg bg-[#6C8299] lg:min-w-[12rem] hover:bg-[#55657a] transition-colors"
        onClick={handleClick}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cf676d627b2f833ae67882b1dffed7d8581857d8a7974f900b597f3f3b8dfd1?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
          alt="Icon Khóa học"
          className="w-[1.875rem] max-md:w-[18px] shrink-0 self-stretch aspect-square"
        />
        <span>Khóa học</span>
      </button>
    </div>
  );
}

export default CourseHeader;
