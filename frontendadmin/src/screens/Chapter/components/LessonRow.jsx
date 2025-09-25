import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { videoDeleteController } from "../../../controllers/lesson.controller";

import { PopupConfirm } from "../../../components/PopupConfirm";
import { PopupSuccess } from "../../../components/PopupSuccess";
import { PopupError } from "../../../components/PopupError";

export default function LessonRow({ setLoading, video, role }) {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/courses/lesson/video/edit/${video._id}`);
  };

  const onClick = () => {
    navigate(`/courses/lesson/video/detail/${video._id}`);
  };

  const handleDeleteClick = () => {
    setPopupContent("Bạn có chắc chắn muốn xoá video này?");
    setPopupVisible(true);
  };

  const confirmAction = async () => {
    const result = await videoDeleteController(setLoading, video._id);
    if (result.code === 200) {
      console.log("thanh cong!!");
      setSuccessPopupVisible(true);
    } else {
      setErrorPopupVisible(true);
    }
  };
  const closePopup = () => {
    setPopupVisible(false);
    setPopupContent("");
  };
  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    // window.location.reload();
  };
  const closeErrorPopup = () => {
    setErrorPopupVisible(false); // Ẩn popup thành công
    // window.location.reload();
  };
  return (
    <>
      <div className="flex overflow-hidden flex-wrap mt-3 w-full bg-white min-h-[3.75rem] max-md:min-h-[2.75rem] cursor-pointer">
        {/* STT */}
        <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] shrink justify-center items-center px-3 bg-[#EBF1F9]  ">
          <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate">
            {video._id}
          </span>
        </div>

        {/* Tên bài học */}
        <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] shrink justify-center items-center px-3 bg-white  ">
          <button
            onClick={onClick}
            className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate"
          >
            {video.VideoName}
          </button>
        </div>

        {/* Lần cuối cập nhật */}
        <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] justify-center items-center px-3 bg-[#EBF1F9] ">
          <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate">
            {moment(
              video?.editedBy?.[video.editedBy?.length - 1]?.editedAt ||
                video?.createdAt
            ).format("DD/MM/YYYY")}
          </span>
        </div>

        {/* Hành động */}
        <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-2.5 justify-center px-3 py-2">
          {/* Button Sửa */}
          <button
            disabled={
              !(
                role?.RolePermissions?.includes("course_edit") ||
                role?.RolePermissions?.includes("course_only")
              )
            }
            className={`flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-3 rounded-[99px] text-neutral-900 transition-colors ${
              role?.RolePermissions?.includes("course_edit") ||
              role?.RolePermissions?.includes("course_only")
                ? "bg-[#D1F669] hover:bg-[#a3e635]"
                : "bg-[#f0ffc7] cursor-not-allowed"
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
            onClick={handleDeleteClick}
            className={`flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-3 text-white rounded-[99px] transition-colors ${
              role?.RolePermissions?.includes("course_delete") ||
              role?.RolePermissions?.includes("course_only")
                ? "bg-[#DF322B] hover:bg-[#902723]"
                : "bg-[#ffd1d1] cursor-not-allowed"
            }`}
          >
            <div className="self-center shrink w-[90%] max-w-full px-4 py-2 rounded-[99px] justify-center items-center inline-flex text-center md:text-[1.25rem] text-[1rem]  font-medium">
              Xóa
            </div>
          </button>
        </div>
      </div>
      {/* Popup xác nhận */}
      <PopupConfirm
        isVisible={isPopupVisible}
        content={popupContent}
        onConfirm={confirmAction}
        onClose={closePopup}
      />

      {/* Popup thành công */}
      <PopupSuccess
        isVisible={successPopupVisible}
        message="Xoá thành công!"
        onClose={closeSuccessPopup}
      />
      {/* Popup thất bại */}
      <PopupError
        isVisible={errorPopupVisible}
        message="Cập nhật thất bại. Vui lòng thử lại sau!"
        onClose={closeErrorPopup}
      />
    </>
  );
}
