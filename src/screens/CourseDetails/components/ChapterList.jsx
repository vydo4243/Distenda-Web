import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import PopUp from "./PopUp"; // Component popup

export function ChapterList({ data, lessonChange, role }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const chapters = [
  //   {
  //     id: 1,
  //     title: "Tổng quan về HTML",
  //     lastUpdate: "29/11/2024 23:13",
  //   },
  //   {
  //     id: 2,
  //     title: "HTML cơ bản",
  //     lastUpdate: "29/11/2024 23:13",
  //   },
  // ];

  const handleAddCategoryClick = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div className="flex flex-col mt-10 w-full md:text-[1.25rem] text-[1rem]  text-neutral-900 max-md:max-w-full">
      {/* Header */}
      <div className="flex flex-wrap gap-6 w-full max-md:max-w-full">
        <div className="self-start font-semibold">Danh sách chương</div>
        <div className="flex-1 shrink font-medium leading-none text-right basis-0 max-md:max-w-full">
          Tổng số chương: {data?.lesson?.length || "0"}
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col pb-16 mt-6 w-full font-medium leading-none max-md:max-w-full">
        <ChapterHeader
          onAddCategoryClick={handleAddCategoryClick}
          role={role}
        />
        {data?.lesson?.length > 0 &&
          data.lesson.map((chapter, index) => (
            <ChapterRow
              key={index}
              id={index}
              lesson={chapter}
              lessonChange={lessonChange}
              role={role}
            />
          ))}
      </div>

      {/* Pop-up */}
      {isPopupOpen && <PopUp onClose={handleClosePopup} courseID={data._id} />}
    </div>
  );
}

function ChapterHeader({ onAddCategoryClick, role }) {
  return (
    <div className="flex shrink overflow-hidden w-full rounded-t-3xl mt-3 bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem] max-md:max-w-full">
      <div className="flex basis-1/6 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-center items-center px-3 bg-[#EBF1F9]">
        <span className="text-center">STT</span>
      </div>
      <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] justify-center items-center px-3 text-white">
        <span className="text-center">Tên chương</span>
      </div>
      <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-center items-center px-3 bg-[#EBF1F9]">
        <span className="text-center">Lần cuối cập nhật</span>
      </div>
      <button
        disabled={
          !(
            role?.RolePermissions?.includes("course_edit") ||
            role?.RolePermissions?.includes("course_only")
          )
        }
        className={`flex basis-1/3 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-center items-center px-3  text-white  ${
          role?.RolePermissions?.includes("course_edit") ||
          role?.RolePermissions?.includes("course_only")
            ? "bg-[#6C8299] hover:bg-[#55657a]"
            : "bg-[#CDD5DF] cursor-not-allowed"
        }`}
        onClick={onAddCategoryClick}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8c4b8a9ea3e04a3f28765b51e5832394bc0fb959c8132d5d62ff26652eebc19?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
          alt="Icon"
          className="w-[30px] aspect-square"
        />
        <span className="text-center">Chương mới</span>
      </button>
    </div>
  );
}

function ChapterRow({ id, lesson, lessonChange, role }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);
  const handleSaveClick = () => {
    console.log("Lưu thay đổi:");
    setIsEditing(false);
  };

  const handleRowClick = () => {
    navigate(`/courses/lesson/detail/${lesson._id}`);
  };

  return (
    <div className="flex overflow-hidden mt-3 w-full bg-white  text-neutral-900 min-h-[3.75rem] max-md:min-h-[2.75rem] cursor-pointer">
      {/* STT */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <div className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate">
          {id + 1}
        </div>
      </div>

      {/* Tên chương */}
      <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] shrink gap-3 justify-center items-center px-3   text-neutral-900 max-md:max-w-full">
        {isEditing ? (
          <input
            onChange={(e) => lessonChange(lesson._id, e)}
            type="text"
            value={lesson.LessonName}
            className="w-full px-3 py-2 text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <button
            className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate"
            onClick={handleRowClick}
          >
            {lesson.LessonName}
          </button>
        )}
      </div>

      {/* Lần cuối cập nhật */}
      <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-center items-center px-3  bg-[#EBF1F9] text-neutral-900 w-[240px]">
        <div className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate">
          {moment(
            lesson?.editedBy?.[lesson.editedBy?.length - 1]?.editedAt ||
              lesson?.createdAt
          ).format("DD/MM/YYYY")}
        </div>
      </div>

      {/* Actions */}
      <div className="flex basis-1/3 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-2.5 justify-center px-3 py-2 bg-white">
        {isEditing &&
        (role?.RolePermissions?.includes("course_edit") ||
          role?.RolePermissions?.includes("course_only")) ? (
          <>
            {/* Button Xong */}
            <button
              className="flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-3  bg-[#D1F669] rounded-[99px] text-neutral-900 hover:bg-lime-400 transition-colors"
              onClick={handleSaveClick}
            >
              <div className="gap-2.5 self-stretch my-auto">Xong</div>
            </button>
            {/* Button Hủy */}
            <button
              className="flex basis-1/2 min-w-0 justify-center items-center px-3  rounded-[99px] shrink gap-3 bg-gray-300 text-neutral-900 hover:bg-gray-400 transition-colors"
              onClick={handleCancelClick}
            >
              <div className="gap-2.5 self-stretch my-auto">Hủy</div>
            </button>
          </>
        ) : (
          <>
            {/* Button Sửa */}
            <button
              disabled={
                !(
                  role?.RolePermissions?.includes("course_edit") ||
                  role?.RolePermissions?.includes("course_only")
                )
              }
              className={`flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-3 rounded-[99px]  transition-colors ${
                role?.RolePermissions?.includes("course_edit") ||
                role?.RolePermissions?.includes("course_only")
                  ? "bg-[#D1F669] hover:bg-[#a3e635] text-neutral-900"
                  : "bg-[#f0ffc7] cursor-not-allowed text-neutral-300"
              }`}
              onClick={handleEditClick}
            >
              <div className="gap-2.5 self-stretch my-auto">Sửa</div>
            </button>
            {/* Button Xóa */}
            <button
              disabled={
                !(
                  role?.RolePermissions?.includes("course_delete") ||
                  role?.RolePermissions?.includes("course_only")
                )
              }
              className={`flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-3  text-white rounded-[99px] transition-colors ${
                role?.RolePermissions?.includes("course_delete") ||
                role?.RolePermissions?.includes("course_only")
                  ? "bg-[#DF322B] hover:bg-[#902723]"
                  : "bg-[#ffd1d1] cursor-not-allowed"
              }`}
            >
              <div className="gap-2.5 self-stretch my-auto">Xóa</div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
