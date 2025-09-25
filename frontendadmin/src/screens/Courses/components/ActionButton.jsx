import React, { useState } from "react";
import CourseSelection from "./CourseSelection";
import { useNavigate } from "react-router-dom";

function ActionButton({ text, role }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (text === "Danh mục") {
      navigate("/category"); // Điều hướng tới trang CourseCategorypage
    } else if (text === "Thêm khóa học") {
      navigate("/courses/create");
      // togglePopup(); // Hiển thị popup
    } else {
      console.log(`Action for "${text}" not implemented.`);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      {/* Nút Action */}
      <button
        disabled={
          !(
            role?.RolePermissions?.includes("course_create") ||
            role?.RolePermissions?.includes("course_only") ||
            text === "Danh mục"
          )
        }
        className={`flex gap-3 justify-center items-center p-[0.813rem] max-md:p-[0.5rem] rounded-lg transition-colors ${
          role?.RolePermissions?.includes("course_create") ||
          role?.RolePermissions?.includes("course_only") ||
          text === "Danh mục"
            ? "bg-[#6C8299] hover:bg-[#55657a]"
            : "bg-[#CDD5DF]"
        }`}
        onClick={handleClick}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/ce9d43b270ae41158192dec03af70a1a/63efcc48669f127d74e546af9bf5839c0403a27b9d45018b06ece519a1baf104?apiKey=ce9d43b270ae41158192dec03af70a1a&"
          className="object-contain shrink-0 self-stretch my-auto w-[1.875rem] max-md:w-[18px] aspect-square"
          alt="Icon"
        />
        <span className="gap-2.5 self-stretch my-auto">{text}</span>
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={togglePopup} // Đóng popup khi click ra ngoài
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            onClick={(e) => e.stopPropagation()} // Ngăn đóng popup khi click vào nội dung
          >
            <CourseSelection onClose={togglePopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionButton;
