import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoSection } from "./VideoSection";
import { videoDetailController } from "../../controllers/lesson.controller";
import moment from "moment";
import Loading from "../../components/Loading";
import VideoDetailHistory from "./VideoDetailHistory";
import { useRole } from "../../layouts/AppContext";
import { Helmet } from "react-helmet";

export default function CourseContent() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const navigate = useNavigate();
  const { role } = useRole();

  const { VideoID } = useParams();
  const handleHistoryRequest = () => {
    setIsHistoryVisible(true);
  };

  const handleCloseHistoryRequest = () => {
    setIsHistoryVisible(false);
  };
  const onClick = () => {
    navigate(`/courses/lesson/video/edit/${VideoID}`);
  };

  useEffect(() => {
    async function fetchData() {
      // console.log("vaof")
      const result = await videoDetailController(setLoading, VideoID);
      // console.log(result)
      if (result) {
        setData(result); // Lưu dữ liệu nếu hợp lệ
      }
    }

    fetchData();
  }, [VideoID]);

  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <Helmet>
          <title>{data?.VideoName ? data.VideoName : "Chi tiết bài học"}</title>
        </Helmet>
        <section className="flex flex-col flex-1 shrink p-16 text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[240px] max-md:px-5 max-md:max-w-full overflow-hidden">
          <div className="flex flex-col pb-16 w-full max-md:max-w-full h-full gap-2.5">
            <form className="flex flex-wrap gap-10 justify-end items-end w-full font-medium leading-none max-md:max-w-full">
              <div className="flex gap-2.5 items-start md:text-[1.25rem] text-[1rem]  text-white">
                <button
                  disabled={
                    !(
                      role?.RolePermissions?.includes("course_edit") ||
                      role?.RolePermissions?.includes("course_only")
                    )
                  }
                  onClick={onClick}
                  type="submit"
                  className={`flex gap-3 justify-center items-center md:p-3 max-md:p-2 rounded-lg ${
                    role?.RolePermissions?.includes("course_edit") ||
                    role?.RolePermissions?.includes("course_only")
                      ? "bg-[#6C8299] hover:bg-[#55657a]"
                      : "bg-[#CDD5DF] cursor-not-allowed"
                  }`}
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9c84cc0d21b5241ee40d83334bf9289f4fc6a242a7bb8a736e90effdbd86720?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  />
                  <span className="gap-2.5 self-stretch my-auto">
                    Chỉnh sửa
                  </span>
                </button>
                <button
                  disabled={
                    !(
                      role?.RolePermissions?.includes("course_delete") ||
                      role?.RolePermissions?.includes("course_only")
                    )
                  }
                  type="button"
                  className={`flex gap-3 justify-center items-center md:p-3 max-md:p-2 rounded-lg ${
                    role?.RolePermissions?.includes("course_delete") ||
                    role?.RolePermissions?.includes("course_only")
                      ? "bg-[#DF322B] hover:bg-[#902723]"
                      : "bg-[#ffd1d1] cursor-not-allowed"
                  }`}
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/42648122efa6f387983f11efeb38ca614809d3a449f7a41f54d965ae2b480b89?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  />
                  <span className="gap-2.5 self-stretch my-auto">Xóa</span>
                </button>
              </div>
            </form>
            <div className="flex gap-3 flex-col  items-start">
              <div className="flex flex-col flex-1 shrink justify-start md:text-[1.25rem] text-[1rem]  basis-0 max-md:max-w-full">
                <label
                  htmlFor="lessonName"
                  className="text-neutral-900 text-opacity-50 max-md:max-w-full"
                >
                  Tên bài <span className="text-red-600">*</span>
                </label>
                <div className="flex relative gap-2.5 items-start py-3 mt-2 w-fit text-neutral-900 max-md:max-w-full">
                  {data?.VideoName}
                </div>
              </div>
              <div className="flex flex-col justify-center max-md:max-w-full">
                <div className="flex gap-3 items-center">
                  <div className="text-[1.125rem] max-md:text-[1rem] font-semibold text-neutral-900 text-opacity-50">
                    Lần cuối cập nhật
                  </div>
                  <button
                    type="button"
                    className="flex gap-3 justify-center items-center"
                    onClick={handleHistoryRequest}
                  >
                    <img
                      loading="lazy"
                      src="/icons/Show.svg"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square filter-[#6c8299] sepia-60 saturate-200 hue-rotate-190 "
                      alt="Icon"
                    />
                  </button>
                </div>
                <span className="mt-3 md:text-[1.25rem] text-[1rem]  font-medium text-neutral-900">
                  {moment(
                    data?.editedBy?.[data.editedBy?.length - 1]?.editedAt ||
                      data?.createdAt
                  ).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
            {data?.VideoDescription && (
              <div className="flex flex-col mt-3 flex-1 shrink justify-center md:text-[1.25rem] text-[1rem]  basis-0 min-w-[240px] max-md:max-w-full">
                <label
                  htmlFor="lessonName"
                  className="text-neutral-900 text-opacity-50 max-md:max-w-full"
                >
                  Mô tả
                </label>
                <div className="flex shrink gap-2.5 self-stretch mt-3 w-full rounded-lg text-neutral-900 max-md:max-w-full">
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: data?.VideoDescription }}
                  ></div>
                </div>
              </div>
            )}

            <VideoSection video={data} />
          </div>
        </section>
        {isHistoryVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 max-md:px-10 overflow-hidden">
            <VideoDetailHistory onClose={handleCloseHistoryRequest} />
          </div>
        )}
      </>
    );
}
