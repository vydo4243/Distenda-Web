import React, { useState, useEffect } from "react";
import TableRow from "./components/TableRow";
import SearchBar from "../../layouts/private/SearchBar";
import CourseHeader from "./components/CourseHeader";
import PopUp from "./components/PopUp";
import { categoryController } from "../../controllers/category.controller";

import Loading from "../../components/Loading";
import { useRole } from "../../layouts/AppContext";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../components/PopupLoading";

function CourseTable() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const { role } = useRole();

  const handleAddCategoryClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // console.log("vaof")
      const result = await categoryController(setLoading);
      // console.log(result);
      if (result) {
        setData(result); // Lưu dữ liệu nếu hợp lệ
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <Helmet>
          <title>Thêm banner</title>
        </Helmet>
        {loadingPopup && <PopupLoading />}
        <div className="flex flex-col flex-1 shrink p-[4rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 max-md:px-5 max-md:max-w-full">
          <SearchBar />
          <CourseHeader />
          <div className="flex flex-col pb-16 mt-6 w-full max-md:max-w-full">
            {/* <div className="text-right text-neutral-900 max-md:max-w-full">
            Tổng số danh mục: {data.length}
          </div> */}

            {/* Header Bảng */}
            <div className="flex shrink overflow-hidden w-full rounded-t-3xl mt-3 bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem] max-md:max-w-full">
              <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-center items-center px-3 bg-[#EBF1F9]">
                <span className="text-center">STT</span>
              </div>
              <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] justify-center items-center px-3 text-white">
                <span className="text-center">Tên</span>
              </div>
              <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-center items-center px-3 bg-[#EBF1F9] ">
                <span className="text-center">Số khóa học</span>
              </div>
              <button
                disabled={!role?.RolePermissions?.includes("course_create")}
                className={`flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] justify-center items-center px-3 text-white ${
                  role?.RolePermissions?.includes("course_edit")
                    ? "bg-[#6C8299] hover:bg-[#55657a]"
                    : "bg-[#CDD5DF] cursor-not-allowed"
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-center `}
                  onClick={handleAddCategoryClick}
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8c4b8a9ea3e04a3f28765b51e5832394bc0fb959c8132d5d62ff26652eebc19?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
                    alt="Icon"
                    className="w-[1.875rem] self-stretch shrink-0 aspect-square"
                  />
                  <span className="text-center max-md:hidden">
                    Danh mục mới
                  </span>
                </div>
              </button>
            </div>

            {/* Nội dung bảng */}
            {data !== null ? (
              <TableRow categories={data} role={role} />
            ) : (
              <div className="text-center text-gray-500 mt-5">
                Không có danh mục nào để hiển thị.
              </div>
            )}

            {/* Pop-up */}
            {isPopupOpen && (
              <PopUp
                onClose={handleClosePopup}
                data={data}
                setLoadingPopup={setLoadingPopup}
              />
            )}
          </div>
        </div>
      </>
    );
}

export default CourseTable;
