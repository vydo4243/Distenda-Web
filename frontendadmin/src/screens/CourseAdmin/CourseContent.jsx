import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoSection } from "./VideoSection";
import {
  videoDetailController,
  videoUpdatePostController,
} from "../../controllers/lesson.controller";
import { Editor } from "@tinymce/tinymce-react";

import Loading from "../../components/Loading";
import uploadVideo from "../../components/UploadVideo";
import { PopupConfirm } from "../../components/PopupConfirm";
import { PopupSuccess } from "../../components/PopupSuccess";
import { PopupError } from "../../components/PopupError";
import { PopupLoading } from "../../components/PopupLoading";
import { useRole } from "../../layouts/AppContext";
import { Helmet } from "react-helmet";

export default function CourseContent() {
  const [data, setData] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef();
  const { role } = useRole();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);

  const { VideoID } = useParams();

  useEffect(() => {
    if (
      role &&
      !role?.RolePermissions?.includes("course_edit") &&
      !role?.RolePermissions?.includes("course_only")
    ) {
      console.log("Không có quyền, chuyển về trang chủ");
      navigate("/courses");
    }
  }, [navigate, role]);

  useEffect(() => {
    async function fetchData() {
      const result = await videoDetailController(setLoading, VideoID);
      if (result) {
        setData(result); // Lưu dữ liệu nếu hợp lệ
      }
    }

    fetchData();
  }, [VideoID]);

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

  const handlePopup = async (actionType) => {
    if (actionType === "edit") {
      setLoadingPopup(true);
      // Upload video nếu người dùng đã chọn
      let uploadedVideoUrl = "";
      if (selectedFileName) {
        uploadedVideoUrl = await uploadVideo(selectedFileName);
        setData((prev) => ({
          ...prev,
          VideoUrl: uploadedVideoUrl,
        }));
      }
      const result = await videoUpdatePostController(VideoID, data);
      setLoadingPopup(false);
      if (result.code === 200) {
        setSuccessPopupVisible(true);
      } else {
        setErrorPopupVisible(true);
      }
    } else if (actionType === "cancel") {
      setPopupContent(
        <>
          Bạn có muốn thoát?
          <br />
          Những thay đổi vừa rồi sẽ không được lưu.
        </>
      );
    }
    // setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupContent("");
  };

  const confirmAction = async () => {
    setPopupVisible(false);
    navigate(`/courses/lesson/detail/${data.LessonId}`);
  };

  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    navigate(`/courses/lesson/detail/${data.LessonId}`);
  };
  const closeErrorPopup = () => {
    setErrorPopupVisible(false); // Ẩn popup thành công
    // window.location.reload();
  };

  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <Helmet>
          <title>Thêm banner</title>
        </Helmet>
        {loadingPopup && <PopupLoading />}
        <main className="flex overflow-hidden flex-col bg-[#EBF1F9]">
          {/* <CourseHeader /> */}
          {/* <NavigationBreadcrumb /> */}
          <section className="flex overflow-hidden flex-col p-[4rem] w-full bg-white max-md:px-5 min-h-screen max-md:max-w-full">
            <div className="flex flex-col pb-16 w-full max-md:max-w-full">
              <div className="flex gap-2.5 items-end justify-end md:text-[1.25rem] text-[1rem] mb-4 text-white min-w-[240px]">
                <div className="flex gap-2.5 items-end text-[1.25rem] max-md:text-[1rem] text-white min-w-[240px]">
                  <button
                    onClick={() => handlePopup("edit")}
                    type="button"
                    className="flex gap-3 justify-center items-center px-3 py-3 rounded-lg bg-[#6C8299]"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9c84cc0d21b5241ee40d83334bf9289f4fc6a242a7bb8a736e90effdbd86720?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
                      alt=""
                      className="object-cover shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <span className="gap-2.5 self-stretch my-auto">
                      Cập nhật
                    </span>
                  </button>
                  <button
                    onClick={() => handlePopup("cancel")}
                    type="button"
                    className="flex gap-3 justify-center items-center px-3 py-3 bg-[#DF322B] rounded-lg"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/42648122efa6f387983f11efeb38ca614809d3a449f7a41f54d965ae2b480b89?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
                      alt=""
                      className="object-cover shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <span className="gap-2.5 self-stretch my-auto">Xóa</span>
                  </button>
                </div>
                <div className="flex flex-col flex-1 shrink justify-center text-[1.25rem] max-md:text-[1rem] basis-0 min-w-[240px] max-md:max-w-full">
                  <label
                    htmlFor="VideoName"
                    className="text-neutral-900 text-opacity-50 max-md:max-w-full"
                  >
                    Tên bài <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="VideoName"
                    type="text"
                    value={data?.VideoName}
                    className="flex-1 shrink gap-2.5 self-stretch px-3 py-3 w-full rounded-lg border border-solid border-slate-500 border-opacity-80 min-h-[63px] text-neutral-900 max-md:max-w-full"
                  />
                </div>
              </div>
              {/* <div className="flex flex-col flex-1 shrink pt-3 justify-center self-start text-[1.25rem] max-md:text-[1rem] basis-0 min-w-[240px] w-full max-md:max-w-full">
              <label htmlFor="VideoUrl" className="text-neutral-900 text-opacity-50 max-md:max-w-full">
                Link video <span className="text-red-600">*</span>
              </label>
              <textarea
                onChange={handleChange}
                id="VideoUrl"
                type="text"
                value={data?.VideoUrl}
                className="flex-1 shrink gap-2.5 self-stretch px-3 py-3 mt-2 w-full rounded-lg border border-solid border-slate-500 border-opacity-80 min-h-[200px] text-neutral-900 max-md:max-w-full"
                aria-required="true"
              />
            </div> */}
              <div className="flex flex-col flex-1 shrink pt-3 justify-center self-start text-[1.25rem] max-md:text-[1rem] basis-0 min-w-[240px] w-full max-md:max-w-full">
                <label
                  htmlFor="VideoUrl"
                  className="text-neutral-900 text-opacity-50 max-md:max-w-full"
                >
                  Mô tả <span className="text-red-600">*</span>
                </label>
                <Editor
                  id="VideoDescription"
                  apiKey="ra8co6ju1rrspizsq3cqhi3e8p7iknltlh2v77d58cbrys8m"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  value={data?.VideoDescription} // Giá trị hiện tại
                  onEditorChange={(content, editor) => handleChange(editor)} // Hàm xử lý khi nội dung thay đổi
                  init={{
                    height: "300px", // Chiều cao của editor
                    width: "100%",
                    menubar: false, // Ẩn thanh menu
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </div>
              <VideoSection
                video={data}
                selectedFileName={selectedFileName}
                setSelectedFileName={setSelectedFileName}
              />
            </div>
          </section>
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
        </main>
      </>
    );
}
