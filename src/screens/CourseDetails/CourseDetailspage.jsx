import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseHeader } from "./components/CourseHeader";
import { CourseImage } from "./components/CourseImage";
import { CourseInfo } from "./components/CourseInfo";
import { ChapterList } from "./components/ChapterList";
import uploadImage from "../../components/UploadImage";
import { courseDetailController } from "../../controllers/course.controller";
import CourseDetailHistory from "./components/CourseDetailHistory";

import Loading from "../../components/Loading";
import { useRole } from "../../layouts/AppContext";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../components/PopupLoading";

function CourseDetails() {
  const [data, setData] = useState({});

  const [category, setCategory] = useState();
  const [intructor, setIntructor] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);

  const editorRef = useRef(null);
  const { role } = useRole();

  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const uploadImageInputRef = useRef(null);
  const uploadImagePreviewRef = useRef(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
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

  const { CourseID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // console.log("vaof")
      setLoading(true);
      const result = await courseDetailController(setLoading, CourseID);
      setLoading(false);
      // console.log(result)
      if (result) {
        if (
          !role?.RolePermissions?.includes("course_view") &&
          result.course.CourseIntructor._id !== result.user
        ) {
          console.log("Không có quyền, chuyển về trang chủ");
          navigate("/courses");
        }
        setCategory((prevRoles) => [
          { _id: "", CategoryName: "Chọn danh mục", disabled: true },
          ...result.course.categories,
        ]);
        setIntructor((prevRoles) => [
          { _id: "", AdminFullName: "Chọn giảng viên", disabled: true },
          ...result.course.intructors,
        ]);
        setSelectedFileName(result.course.CoursePicture);
        setImageUrl(result.course.CoursePicture);
        setData(result.course);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);
  console.log(data);
  const handleSubmit = async () => {
    let uploadedImageUrl = data.CoursePicture;
    // Upload ảnh nếu người dùng đã chọn
    if (selectedFileName) {
      uploadedImageUrl = await uploadImage(selectedFileName);
      // console.log("Uploaded Image URL:", uploadedImageUrl);
    }
    const updatedData = {
      ...data,
      CoursePicture: uploadedImageUrl,
    };

    // console.log("Data sent to ActionButton:", updatedData);
    setData(updatedData);
    return updatedData;
  };

  if (loading) {
    return <Loading />;
  }
  console.log("coursedetail => ", data);
  // console.log("categories => ", category);
  // console.log("intructors => ", intructor);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEditorChange = (content, editor) => {
    const id = editor.id;
    setData((prevData) => ({
      ...prevData,
      [id]: content,
    }));
  };

  const handleToggle = () => {
    setData((prevData) => ({
      ...prevData,
      CourseStatus: prevData.CourseStatus === 1 ? 0 : 1,
    }));
  };

  const lessonChange = (lessonID, event) => {
    const newLessonName = event.target.value; // Lấy giá trị từ input
    setData((prevData) => {
      const updatedLessons = prevData.lesson.map((chapter) =>
        chapter._id === lessonID
          ? { ...chapter, LessonName: newLessonName, change: 1 }
          : chapter
      );
      return { ...prevData, lesson: updatedLessons }; // Sử dụng 'lesson' thay vì 'lessons'
    });
  };

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
          {data?.CourseName ? data.CourseName : "Chi tiết khoá học"}
        </title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <div className="flex flex-col flex-1 shrink p-[4rem] md:text-[1.25rem] text-[1rem]  font-medium bg-white basis-0 min-w-[240px] max-md:px-5 max-md:max-w-full">
        <CourseHeader
          data={data}
          handleSubmit={handleSubmit}
          role={role}
          setLoadingPopup={setLoadingPopup}
        />
        <CourseImage
          data={data}
          uploadImageInputRef={uploadImageInputRef}
          uploadImagePreviewRef={uploadImagePreviewRef}
          handleImageChange={handleImageChange}
          imageUrl={imageUrl}
          handleHistoryRequest={handleHistoryRequest}
          role={role}
        />
        <CourseInfo
          data={data}
          category={category}
          intructor={intructor}
          handleInputChange={handleInputChange}
          handleEditorChange={handleEditorChange}
          handleToggle={handleToggle}
          editorRef={editorRef}
          role={role}
        />
        <ChapterList data={data} lessonChange={lessonChange} role={role} />
      </div>
      {isHistoryVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 max-md:px-10 overflow-hidden">
          <CourseDetailHistory onClose={handleCloseHistoryRequest} />
        </div>
      )}
    </>
  );
}

export default CourseDetails;
