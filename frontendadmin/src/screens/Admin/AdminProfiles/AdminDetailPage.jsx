import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PersonalInfo from "./components/PersonalInfo";
import CourseTableRow from "./components/CourseTableRow";
import {
  adminDetailController,
  adminUpdatePostController,
  adminDeleteController,
} from "../../../controllers/admin.controller";

import Loading from "../../../components/Loading";
import uploadImage from "../../../components/UploadImage";
import { PopupConfirm } from "../../../components/PopupConfirm";
import { PopupSuccess } from "../../../components/PopupSuccess";
import { PopupError } from "../../../components/PopupError";
import AdminDetailHistory from "./components/AdminDetailHistory";
import { useRole } from "../../../layouts/AppContext";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../../components/PopupLoading";

function AdminDetailPage() {
  const navigate = useNavigate();
  const { AdminID } = useParams(); // Lấy giá trị UserID từ URL
  console.log("ID from URL: ", AdminID);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const [roles, setRoles] = useState([]); // Mảng roles duy nhất
  const [action, setAction] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const { role } = useRole();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await adminDetailController(AdminID);

      if (result) {
        setData(result);

        setSelectedFileName(result.AdminAvatar);
        setRoles((prevRoles) => [
          { _id: "", RoleName: "Chọn chức vụ", disabled: true },
          ...result.roles,
        ]);
      }
      setLoading(false);
    }

    fetchData();
  }, [AdminID]);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    setLoadingPopup(true);
    let uploadedImageUrl = data.AdminAvatar;
    // Upload ảnh nếu người dùng đã chọn
    console.log("selectedFileName", selectedFileName);
    if (selectedFileName) {
      uploadedImageUrl = await uploadImage(selectedFileName);
      console.log("Uploaded Image URL:", uploadedImageUrl);
    }
    const updatedData = {
      ...data,
      CoursePicture: uploadedImageUrl,
    };

    console.log("Data sent to ActionButton:", updatedData);
    setData(updatedData);
    setLoadingPopup(false);
    return updatedData;
  };

  // Hàm cập nhật dữ liệu khi người dùng nhập vào
  const handleChange = (e) => {
    // Kiểm tra nếu e.target tồn tại (dành cho input và select)
    if (e?.target) {
      const { id, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [id]: value, // Cập nhật theo id của input
      }));
    } else if (e) {
      // Nếu không có e.target (TinyMCE)
      setData((prevData) => ({
        ...prevData,
        [e.id]: e.getContent(), // Lấy nội dung từ TinyMCE và cập nhật theo id
      }));
    }
  };

  const handlePopup = (actionType) => {
    setAction(actionType);
    if (actionType === "update") {
      setPopupContent("Bạn có chắc chắn muốn cập nhật những thay đổi không?");
    } else if (actionType === "delete") {
      setPopupContent(
        <>
          Bạn muốn xóa người này?
          <br />
          Bạn sẽ không thể khôi phục sau khi xóa.
        </>
      );
    }
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupContent("");
  };

  const confirmAction = async () => {
    setPopupVisible(false);
    //
    if (action === "update") {
      setLoadingPopup(true);
      const newData = await handleSubmit();
      console.log("newData", newData);
      const result = await adminUpdatePostController(data._id, newData);
      setLoadingPopup(false);
      if (result.code === 200) {
        setSuccessPopupVisible(true);
      } else {
        setErrorPopupVisible(true);
      }
    } else {
      setLoadingPopup(true);
      const result = await adminDeleteController(data._id);
      if (result.code === 200) {
        setSuccessPopupVisible(true);
      } else {
        setErrorPopupVisible(true);
      }
      setLoadingPopup(false);
    }
  };

  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    if (action === "update") {
      window.location.reload();
    } else {
      navigate("/admin");
    }
  };
  const closeErrorPopup = () => {
    setErrorPopupVisible(false); // Ẩn popup thành công
    // window.location.reload();
  };

  const handleToggle = () => {
    setData((prevData) => ({
      ...prevData,
      AdminStatus: prevData.AdminStatus === 1 ? 0 : 1,
    }));
  };

  console.log("Admin Detail => ", data);
  const totalCourse = data?.course.length || 0; // Đảm bảo không lỗi nếu data undefined

  const handleHistoryRequest = () => {
    setIsHistoryVisible(true);
  };

  const handleCloseHistoryRequest = () => {
    setIsHistoryVisible(false);
  };

  return (
    <>
      <Helmet>
        <title>
          {data?.AdminFullName ? data.AdminFullName : "Chi tiết người dùng"}
        </title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <div className="flex overflow-hidden flex-col p-[4rem] bg-white min-h-screen max-md:px-[1.25rem]">
        <div className="flex flex-wrap gap-[2.5rem] items-start w-full max-md:max-w-full">
          {/* Thông tin giảng viên */}
          <div className="flex flex-wrap flex-1 shrink gap-4 items-center basis-0 min-w-[15rem] max-md:max-w-full">
            <img
              loading="lazy"
              src={data?.AdminAvatar ? data.AdminAvatar : "/profile.svg"}
              alt="Instructor profile"
              className="object-cover rounded-full shrink-0 self-stretch my-auto aspect-square w-[9rem]"
            />
            <div className="flex flex-col self-stretch my-auto">
              <div className="text-2xl font-semibold text-[#171717]">
                {data?.AdminFullName ? data?.AdminFullName : "Null"}
              </div>
              <div className="mt-3 text-[1.125rem] max-md:text-[1rem] font-medium text-[#171717] text-opacity-50">
                {data?.AdminEmail ? data.AdminEmail : "Null"}
              </div>
            </div>
          </div>
          {/* Nút hành động */}
          <div className="flex gap-2.5 items-center text-[1.25rem] max-md:text-[1rem] font-medium leading-none text-white min-w-[15rem]">
            <button
              disabled={!role?.RolePermissions?.includes("admin_edit")}
              className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem] ${
                role?.RolePermissions?.includes("admin_edit")
                  ? "bg-[#6C8299] hover:bg-[#55657a]"
                  : "bg-[#CDD5DF] cursor-not-allowed"
              }`}
              onClick={() => handlePopup("update")}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/84fdfd4c4d34c64c558acb40d245b2d594b0b0f000c7b4c1dd0353682f135f9d?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <span className="gap-2.5 self-stretch my-auto">Cập nhật</span>
            </button>
            <button
              disabled={!role?.RolePermissions?.includes("admin_delete")}
              className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto whitespace-nowrap bg-red-600 rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem] ${
                role?.RolePermissions?.includes("admin_delete")
                  ? "bg-[#DF322B] hover:bg-[#902723]"
                  : "bg-[#ffd1d1] cursor-not-allowed"
              }`}
              onClick={() => handlePopup("delete")}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/39a71fd8008a53a09d7a877aea83770214d261a5f742c728f7c5a0a06accb635?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <span className="gap-2.5 self-stretch my-auto">Xoá</span>
            </button>
          </div>
        </div>

        {/* Thông tin cá nhân */}
        <PersonalInfo
          data={data}
          roles={roles}
          handleChange={handleChange}
          handleToggle={handleToggle}
          handleHistoryRequest={handleHistoryRequest}
        />

        {/* Tiêu đề Khóa học */}
        <div className="flex flex-col mt-[2.5rem] w-full text-[1.25rem] max-md:text-[1rem] text-[#171717] max-md:max-w-full">
          <div className="flex flex-wrap gap-[1.5rem] items-start w-full max-md:max-w-full">
            <div className="font-semibold">Khóa học giảng viên</div>
            <div className="flex-1 shrink font-medium leading-none text-right basis-0 max-md:max-w-full">
              Tổng số khóa học: {totalCourse}
            </div>
          </div>

          {/* Header Table */}
          <div className="flex overflow-hidden mt-[1.5rem] w-full font-medium text-[#171717] rounded-t-[1.5rem] bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem]">
            <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
              <span className="text-center">Tên khóa học</span>
            </div>
            <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
              <span className="text-center">Tên giảng viên</span>
            </div>
            <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
              <span className="text-center">Đã bán</span>
            </div>
            <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
              <span className="text-center">Giá</span>
            </div>
            <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
              <span className="text-center">Lợi nhuận</span>
            </div>
            <div className="flex basis-1/6 min-w-0 justify-center items-center text-white">
              <span className="text-center">Trạng thái</span>
            </div>
          </div>

          {/* Dữ liệu Table */}
          <div className="flex overflow-hidden flex-wrap w-full bg-white text-[#131313] min-h-[3.75rem] cursor-pointer">
            {data &&
              data.course &&
              data.course.length > 0 &&
              data.course.map((course, index) => (
                <CourseTableRow
                  index={index}
                  name={data?.AdminFullName}
                  course={course}
                />
              ))}
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
          message="Cập nhật thành công!"
          onClose={closeSuccessPopup}
        />
        {/* Popup thất bại */}
        <PopupError
          isVisible={errorPopupVisible}
          message="Cập nhật thất bại. Vui lòng thử lại sau!"
          onClose={closeErrorPopup}
        />
      </div>
      {isHistoryVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 max-md:px-[] overflow-hidden">
          <AdminDetailHistory onClose={handleCloseHistoryRequest} />
        </div>
      )}
    </>
  );
}

export default AdminDetailPage;
