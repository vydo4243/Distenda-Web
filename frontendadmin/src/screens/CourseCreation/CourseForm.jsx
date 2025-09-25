import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormSection from "./FormSection";
import ImageUpload from "./ImageUpload";
import uploadImage from "../../components/UploadImage";
import {
  courseCreateController,
  courseCreatePostController,
} from "../../controllers/course.controller";

import { PopupSuccess } from "../../components/PopupSuccess";
import { PopupError } from "../../components/PopupError";

function CourseForm({ role, user, setLoadingPopup }) {
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [data, setData] = useState({});

  const [category, setCategory] = useState();
  const [intructor, setIntructor] = useState();
  const navigate = useNavigate();

  const editorRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const uploadImageInputRef = useRef(null);
  const uploadImagePreviewRef = useRef(null);

  const isMobile = window.innerWidth < 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      // setImageSrc(imageURL);
      setSelectedFileName(file); // Lưu tên tệp đã chọn

      if (uploadImagePreviewRef.current) {
        uploadImagePreviewRef.current.src = imageUrl;
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      // console.log("vaof")
      // setLoading(true); // Đang tải
      const result = await courseCreateController();
      // console.log(result)
      if (result) {
        if (role?.RolePermissions?.includes("course_create")) {
          setIntructor((prevRoles) => [
            { _id: "", AdminFullName: "Chọn giảng viên", disabled: true },
            ...result.intructors,
          ]);
        } else {
          setIntructor((prevRoles) => [
            { _id: "", AdminFullName: "Chọn giảng viên", disabled: true },
            { _id: user?._id, AdminFullName: user?.AdminFullName },
          ]);
        }

        setCategory((prevRoles) => [
          { _id: "", CategoryName: "Chọn danh mục", disabled: true },
          ...result.categories,
        ]);
      }
      // setLoading(false); // Tải xong
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const handleSubmit = async () => {
    setLoadingPopup(true);
    let uploadedImageUrl = data.BannerPicture;
    // Upload ảnh nếu người dùng đã chọn
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
    const result = await courseCreatePostController(updatedData);
    if (result.code === 200) {
      setSuccessPopupVisible(true);
    } else {
      setErrorPopupVisible(true);
    }
    setLoadingPopup(false);
  };

  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    navigate("/courses");
  };
  const closeErrorPopup = () => {
    setErrorPopupVisible(false); // Ẩn popup thành công
    // window.location.reload();
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

  // console.log(data)

  return (
    <>
      <form className="flex flex-col px-16 py-8 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-3 justify-between items-start w-full md:text-[1.25rem] text-[1rem]  font-medium leading-none max-w-screen max-lg:max-w-full">
          <div className="flex flex-1 flex-col mt-2.5 text-neutral-900">
            <label htmlFor="CourseName" className="w-full">
              Tên khóa học{" "}
              <span className="text-red-600" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="CourseName"
              type="text"
              required
              className="flex gap-2.5 mt-2 pl-5 w-full rounded-lg border border-solid border-slate-500 border-opacity-80 min-h-[3.75rem] max-md:min-h-[2.75rem] max-md:max-w-full"
              aria-required="true"
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="flex gap-2 justify-center items-center md:p-3 max-md:p-2 text-white rounded-lg bg-[#6C8299] max-lg:hidden"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ebcf993eb7976cff90cc8a7bea1273b209255d5447ef5613e65401b7cede61ae?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
              alt=""
              className="object-cover shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <span className="gap-2 self-stretch my-auto text-[1.25rem] max-md:text-[1.125rem]">
              Tạo khóa học
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-7 max-md:grid-cols-1">
          <div className="flex flex-col space-y-7">
            <div className="flex flex-col w-full md:text-[1.25rem] text-[1rem] font-medium leading-none text-neutral-900">
              <label htmlFor="CourseCategory" className="max-md:max-w-full">
                Phân loại{" "}
                <span className="text-red-600" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="flex gap-2.5 mt-2 w-full rounded-lg border border-solid border-slate-500 border-opacity-80 h-[3.75rem] max-md:h-[2.75rem]">
                <select
                  id="CourseCatogory"
                  value={data.CourseCatogory}
                  onChange={(e) => handleChange(e)} // Kích hoạt hàm onChange khi chọn
                  className="z-0 flex-1 shrink my-auto basis-0 px-3 max-md:max-w-full bg-transparent border-none outline-none"
                >
                  {category &&
                    category.length > 0 &&
                    category.map((option, index) => (
                      <option
                        key={index}
                        value={option._id}
                        disabled={option.disabled}
                        selected={option._id === ""}
                      >
                        {option.CategoryName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* <FormSection
            id="CourseCatogory"
            label="Phân loại"
            required={true}
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/08223d2e0151893bb0c67c9f4e9fae4e42409d304bba895c48f833ba33717bab?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
            onChange={handleChange}
            editorRef={editorRef}
          /> */}
            <div className="flex flex-col w-full md:text-[1.25rem] text-[1rem]  font-medium leading-none text-neutral-900">
              <label htmlFor="CourseIntructor" className="max-md:max-w-full">
                Giảng viên{" "}
                <span className="text-red-600" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="flex gap-2.5 mt-2 w-full rounded-lg border border-solid border-slate-500 border-opacity-80 h-[3.75rem] max-md:h-[2.75rem]">
                <select
                  id="CourseIntructor"
                  value={data.CourseIntructor}
                  onChange={(e) => handleChange(e)} // Kích hoạt hàm onChange khi chọn
                  className="z-0 flex-1 shrink my-auto basis-0 px-3 max-md:max-w-full bg-transparent border-none outline-none"
                >
                  {intructor &&
                    intructor.length > 0 &&
                    intructor.map((option, index) => (
                      <option
                        key={index}
                        value={option._id}
                        disabled={option.disabled}
                        selected={option._id === ""}
                      >
                        {option.AdminFullName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* <FormSection
            id="CourseIntructor"
            label="Giảng viên"
            required={true}
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/08223d2e0151893bb0c67c9f4e9fae4e42409d304bba895c48f833ba33717bab?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
            onChange={handleChange}
            editorRef={editorRef}
          /> */}
            <FormSection
              id="CourseRequire"
              label="Yêu cầu kỹ thuật"
              required={true}
              onChange={handleChange}
              editorRef={editorRef}
            />
            <FormSection
              id="CourseDuration"
              label="Thời hạn sử dụng"
              required={true}
              onChange={handleChange}
              editorRef={editorRef}
            />
            <FormSection
              id="CourseDescription"
              label="Mô tả"
              required={false}
              textArea={true}
              minHeight="250px"
              onChange={handleChange}
              editorRef={editorRef}
            />
            <FormSection
              id="CourseOverview"
              label="Tổng quan khóa học"
              required={false}
              textArea={true}
              minHeight="300px"
              onChange={handleChange}
              editorRef={editorRef}
            />
          </div>

          <div className="flex flex-col space-y-8">
            <ImageUpload
              uploadImageInputRef={uploadImageInputRef}
              uploadImagePreviewRef={uploadImagePreviewRef}
              handleImageChange={handleImageChange}
              imageUrl={imageUrl}
            />
            <FormSection
              id="CoursePrice"
              label="Giá tiền"
              required={true}
              onChange={handleChange}
              editorRef={editorRef}
            />
            <FormSection
              id="CourseDiscount"
              label="Giảm giá"
              required={true}
              onChange={handleChange}
              editorRef={editorRef}
            />
            <FormSection
              id="CourseSalary"
              label="Phần trăm hoa hồng"
              required={true}
              onChange={handleChange}
              editorRef={editorRef}
            />
            <FormSection
              id="CourseLearning"
              label="Bạn sẽ học được gì?"
              required={false}
              textArea={true}
              minHeight="320px"
              onChange={handleChange}
              editorRef={editorRef}
            />
          </div>
        </div>
        {isMobile && (
          <button
            onClick={handleSubmit}
            type="button"
            className="flex max-lg:mt-[12px] gap-2 justify-center items-center md:p-3 max-md:p-2 text-white rounded-lg bg-[#6C8299] lg:hidden"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ebcf993eb7976cff90cc8a7bea1273b209255d5447ef5613e65401b7cede61ae?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
              alt=""
              className="object-cover shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <span className="gap-2 self-stretch my-auto text-[1.25rem] max-md:text-[1.125rem]">
              Tạo khóa học
            </span>
          </button>
        )}
      </form>
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
    </>
  );
}

export default CourseForm;
