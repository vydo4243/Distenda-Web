import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  exerciseDetailController,
  exerciseUpdatePostController,
} from "../../../controllers/lesson.controller";
import ContentSection from "./ContentSection";

import Loading from "../../../components/Loading";
import { PopupConfirmCancel } from "../../../components/PopupConfirmCancel";
import { PopupSuccess } from "../../../components/PopupSuccess";
import { PopupError } from "../../../components/PopupError";
import { useRole } from "../../../layouts/AppContext";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../../components/PopupLoading";

function QuestionEditor() {
  const { role } = useRole();
  const navigate = useNavigate();
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

  const { LessonID } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const editorRef = useRef();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false); // Trạng thái hiển thị popup thành công

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await exerciseDetailController(setLoading, LessonID);
      setLoading(false);
      // console.log(result)
      if (result) {
        setData(result);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePopup = async (actionType) => {
    if (actionType === "update") {
      setLoadingPopup(true);
      const result = await exerciseUpdatePostController(LessonID, data);
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
      setPopupVisible(true);
    }
  };
  const handlePopupConfirm = async () => {
    setPopupVisible(false); // Đảm bảo đóng popup trước
    navigate(`/courses/lesson/detail/${LessonID}`); // Điều hướng về AdminPage sau khi popup đóng
  };
  const handlePopupClose = () => {
    setPopupVisible(false); // Đóng popup
  };

  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    navigate(`/courses/lesson/detail/${LessonID}`);
  };
  const closeErrorPopup = () => {
    setErrorPopupVisible(false); // Ẩn popup thành công
    // window.location.reload();
  };

  const handleTestCaseChange = (e, index, type) => {
    const updatedTestCases = [...data.exercise.ExerciseTestcase]; // Sao chép mảng test case hiện tại
    updatedTestCases[index][type] = e.target.value; // Cập nhật giá trị của input hoặc output
    setData((prevData) => ({
      ...prevData,
      exercise: {
        ...prevData.exercise,
        ExerciseTestcase: updatedTestCases, // Cập nhật lại ExerciseTestcase trong dữ liệu
      },
    }));
  };
  const addTestCase = () => {
    setData((prevData) => ({
      ...prevData,
      exercise: {
        ...prevData.exercise,
        ExerciseTestcase: [
          ...prevData.exercise.ExerciseTestcase,
          { Input: "", Output: "" }, // Thêm một test case mới với input và output rỗng
        ],
      },
    }));
  };

  const handleCodeChange = (editor, data, value) => {
    setData((prevData) => ({
      ...prevData,
      exercise: {
        ...prevData.exercise,
        ExerciseSample: value, // Cập nhật phần code
      },
    }));
  };

  const handleChange = (e) => {
    // Kiểm tra nếu e.target tồn tại (dành cho input và select)
    if (e.target) {
      const { id, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        exercise: {
          ...prevData.exercise,
          [id]: value, // Cập nhật theo id của input
        },
      }));
    }
  };
  const handleEditorChange = (content, editor) => {
    const id = editor.id; // Lấy id từ editor
    setData((prevData) => ({
      ...prevData,
      exercise: {
        ...prevData.exercise,
        [id]: content, // Cập nhật theo id của editor
      },
    }));
  };
  console.log(data);
  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <Helmet>
          <title>Thêm bài tập</title>
        </Helmet>
        {loadingPopup && <PopupLoading />}
        <div className="flex flex-col px-16 pt-16 pb-40 bg-white md:text-[1.25rem] text-[1rem]  font-medium max-md:px-5 max-md:pb-24">
          {/* Header: Buttons */}
          <div className="flex gap-3 max-md:gap-2 items-center mb-6">
            <button
              onClick={() => handlePopup("update")}
              className="flex gap-2.5 justify-center items-center md:p-3 max-md:p-2 text-white rounded-lg bg-[#6C8299] hover:bg-slate-500"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/ce9d43b270ae41158192dec03af70a1a/778afc149db89cc04e0d99cf372aaf6d47b636a305e03ead4a1ee6de46838cb9?apiKey=bb36f631e8e54463aa9d0d8a1339282b&"
                alt="Update"
                className="w-5 h-5"
              />
              <span className="font-medium">Cập nhật</span>
            </button>
            <button
              onClick={() => handlePopup("delete")}
              className="flex gap-2.5 justify-center items-center md:p-3 max-md:p-2 bg-[#CDD5DF] rounded-lg hover:bg-gray-400"
            >
              <span className="font-medium">Hủy</span>
            </button>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col">
            <ContentSection
              exercise={data?.exercise}
              handleChange={handleChange}
              handleEditorChange={handleEditorChange}
              handleCodeChange={handleCodeChange}
              handleTestCaseChange={handleTestCaseChange}
              addTestCase={addTestCase}
              editorRef={editorRef}
            />
          </div>
        </div>
        {/* Popup Hủy */}
        <PopupConfirmCancel
          isVisible={isPopupVisible}
          content={popupContent}
          confirm="Huỷ"
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupClose}
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
      </>
    );
}

export default QuestionEditor;
