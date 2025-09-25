import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { AdminInfoField } from "./components/AdminInfo";
import { AccountHeader } from "./components/AccountHeader";
import {
  myAccountPostController,
  myAccountController,
} from "../../../controllers/myAccount.controller";
import moment from "moment";
import uploadImage from "../../../components/UploadImage";
import Loading from "../../../components/Loading";
import { PopupLoading } from "../../../components/PopupLoading";

function ProfileCard() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);

  // Hàm mở popup
  const openPopup = () => {
    setIsPopupVisible(true);
  };

  // Hàm đóng popup
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // Hàm xử lý xác nhận cập nhật
  const handleConfirmUpdate = async () => {
    setIsPopupVisible(false); // Ẩn popup xác nhận
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
      AdminAvatar: uploadedImageUrl,
    };

    console.log("Data sent to ActionButton:", updatedData);
    setData(updatedData);
    await updateUserInfo(updatedData); // Gọi hàm cập nhật
    setLoadingPopup(false);
    setSuccessPopupVisible(true);
    console.log("Cập nhật thông tin thành công!");
  };
  // Hàm đóng popup thành công
  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    window.location.reload();
  };

  const [data, setData] = useState();
  const [userFields, setUserFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(""); // State lưu trữ ảnh đại diện mới
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await myAccountController(setLoading);
      if (result) {
        setData(result); // Lưu dữ liệu nếu hợp lệ
        setAvatar(result?.AdminAvatar || ""); // Gán avatar ban đầu
        const fields = [
          { label: "Họ và tên", value: result.AdminFullName, editable: true },
          { label: "Gmail", value: result.AdminEmail, editable: true },
          { label: "Số điện thoại", value: result.AdminPhone, editable: true },
          {
            label: "Ngày tham gia",
            value: moment(result.createdBy?.createdAt).format(
              "DD/MM/YYYY hh:mm:ss"
            ),
            editable: false,
          },
          { label: "Chức vụ", value: result.role, editable: false },
        ];
        setUserFields(fields);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  const [selectedFileName, setSelectedFileName] = useState("");
  const uploadImagePreviewRef = useRef(null);

  // Hàm xử lý khi upload ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      // setImageSrc(imageURL);
      setSelectedFileName(file); // Lưu tên tệp đã chọn

      if (uploadImagePreviewRef.current) {
        uploadImagePreviewRef.current.src = imageURL;
      }
    }
  };

  async function updateUserInfo(updatedData) {
    try {
      const response = await myAccountPostController(updatedData);
      if (response.code === 200) {
        console.log("Cập nhật thành công:", response);
        setSuccessPopupVisible(true); // Hiển thị popup thành công
      } else {
        console.error("Cập nhật thất bại:", response.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
    }
  }

  const handleFieldChange = (label, newValue) => {
    setUserFields((prevFields) =>
      prevFields.map((field) =>
        field.label === label ? { ...field, value: newValue } : field
      )
    );

    setData((prevData) => {
      if (!prevData) return prevData; // Nếu chưa có data thì bỏ qua

      const updatedData = { ...prevData };

      switch (label) {
        case "Họ và tên":
          updatedData.AdminFullName = newValue;
          break;
        case "Gmail":
          updatedData.AdminEmail = newValue;
          break;
        case "Số điện thoại":
          updatedData.AdminPhone = newValue;
          break;
        // Các field không editable (Ngày tham gia, Chức vụ) thì không cần đổi
        default:
          break;
      }

      return updatedData;
    });
  };
  console.log("My account => ", data);
  console.log("My account field => ", userFields);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Tài khoản</title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <main className="flex flex-col flex-1 shrink p-16 max-md:p-8 text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[240px] min-h-screen max-md:px-5 max-md:max-w-full">
        {/* Header */}
        <AccountHeader
          name={data?.AdminFullName?.split(" ").slice(-2).join(" ")}
          email={data?.AdminEmail}
          uploadImagePreviewRef={uploadImagePreviewRef}
          avatarSrc={avatar}
          updateIconSrc="https://cdn.builder.io/api/v1/image/assets/ce9d43b270ae41158192dec03af70a1a/e9c84cc0d21b5241ee40d83334bf9289f4fc6a242a7bb8a736e90effdbd86720?apiKey=bb36f631e8e54463aa9d0d8a1339282b&"
          openPopup={openPopup}
          onAvatarChange={handleImageChange} // Truyền hàm xử lý upload ảnh
        />

        {/* Popup xác nhận */}
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] px-2">
            <div className="flex flex-col justify-center md:px-[2.5rem] md:py-[4rem] py-[2rem] px-[1.5rem] bg-white rounded-3xl md:w-[37rem] w-[25rem] font-semibold">
              <div className="flex flex-col items-center w-full text-center">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/charcoal_dot.svg`}
                  className="object-contain shrink-0 my-auto w-[3.5rem] max-md:w-[2.5rem] aspect-square"
                  alt="Icon"
                />
                <p className="mt-6 text-[1.25rem] max-md:text-[1rem] text-neutral-900 font-medium text-center">
                  Bạn có chắc chắn muốn cập nhật những thay đổi không?
                </p>
                <div className="mt-4 flex gap-3 justify-center items-center rounded-lg text-[1.5rem] max-md:text-[1.125rem]">
                  <button
                    className="md:w-[9.375rem] md:h-[3.75rem] w-[5rem] h-[3rem] bg-[#6C8299] text-white rounded-lg flex justify-center items-center hover:bg-slate-700"
                    onClick={handleConfirmUpdate}
                  >
                    Có
                  </button>
                  <button
                    className="md:w-[9.375rem] md:h-[3.75rem] w-[5rem] h-[3rem] bg-[#CDD5DF] text-[#14375F] rounded-lg flex justify-center items-center hover:bg-gray-400"
                    onClick={closePopup}
                  >
                    Không
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popup thành công */}
        {successPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] px-2">
            <div className="flex flex-col justify-center md:px-[2.5rem] md:py-[4rem] py-[2rem] px-[1.5rem] bg-white rounded-3xl md:w-[37rem] w-[25rem] font-semibold">
              <div className="flex flex-col items-center w-full text-center">
                <img
                  src={`${process.env.PUBLIC_URL}/icons/check_ring.svg`}
                  className="object-contain shrink-0 my-auto w-[3.5rem] max-md:w-[2.5rem] aspect-square"
                  alt="Success icon"
                />
                <p className="mt-6 text-[1.25rem] max-md:text-[1rem] text-neutral-900 font-medium text-center">
                  Cập nhật thành công!
                </p>
                <button
                  className="w-[9rem] h-[3.5rem] bg-[#CDD5DF] text-[#14375F] rounded-lg flex justify-center items-center font-semibold text-[1.5rem] max-md:text-[1.125rem] hover:bg-gray-400 mt-4"
                  onClick={closeSuccessPopup}
                >
                  Thoát
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thông tin cá nhân */}
        <div className="flex flex-col mt-10 w-full text-[1.25rem] max-md:text-[1rem] max-md:max-w-full">
          <div className="font-semibold text-neutral-900 max-md:max-w-full">
            Thông tin cá nhân
          </div>
          <div className="flex flex-col items-start mt-4 w-full font-medium leading-none max-md:max-w-full">
            <div className="flex flex-wrap justify-between gap-2 items-start self-stretch w-full max-md:max-w-full">
              {userFields.slice(0, 3).map((field, index) => (
                <AdminInfoField
                  key={index}
                  label={field.label}
                  value={field.value}
                  onChange={handleFieldChange}
                  editable={field.editable}
                />
              ))}
            </div>
            {userFields.slice(3).map((field, index) => (
              <AdminInfoField
                key={index + 3}
                label={field.label}
                value={field.value}
                onChange={handleFieldChange}
                editable={field.editable}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfileCard;
