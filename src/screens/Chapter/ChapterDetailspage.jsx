import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import LessonRow from "./components/LessonRow";
import TableHeader from "./components/TableHeader";
import EditButton from "./components/EditButton";
import { lessonDetailController } from "../../controllers/lesson.controller";

import Loading from "../../components/Loading";
import ChapterDetailHistory from "./components/ChapterDetailHistory";
import { useRole } from "../../layouts/AppContext";
import { Helmet } from "react-helmet";

// const lessons = [
//   { id: 1, name: "HTML cơ bản", lastUpdated: "29/11/2024 23:13" },
//   { id: 2, name: "HTML cơ bản", lastUpdated: "29/11/2024 23:13" },
//   { id: 3, name: "HTML cơ bản", lastUpdated: "29/11/2024 23:13" },
//   { id: 4, name: "HTML cơ bản", lastUpdated: "29/11/2024 23:13" },
// ];

function CourseLesson() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const { LessonID } = useParams();
  const navigate = useNavigate();

  const { role } = useRole();

  const onClickExercise = () => {
    navigate(`/courses/lesson/exercise/create/${data._id}`);
  };

  const onClickVideo = () => {
    navigate(`/courses/lesson/video/create/${data._id}`);
  };

  useEffect(() => {
    async function fetchData() {
      // console.log("vaof")
      setLoading(true);
      const result = await lessonDetailController(setLoading, LessonID);
      setLoading(false);
      // console.log(result)
      if (result) {
        setData(result);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log("coursedetail => ", data);

  const lessonChange = (videoID, event) => {
    const newLessonName = event.target.value; // Lấy giá trị từ input
    setData((prevData) => {
      const updatedLessons = prevData.video.map((chapter) =>
        chapter._id === videoID
          ? { ...chapter, VideoName: newLessonName, change: 1 }
          : chapter
      );
      return { ...prevData, video: updatedLessons };
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
        <title>{data?.LessonName ? data.LessonName : "Chi tiết chương"}</title>
      </Helmet>
      <div className="flex flex-col flex-1 shrink p-[4rem] md:text-[1.25rem] text-[1rem] min-h-screen font-medium bg-white basis-0 min-w-[240px] max-md:px-5 max-md:max-w-full">
        {/* <DeleteButton data={data} /> */}
        <div className="flex z-0 flex-col w-full max-md:max-w-full">
          <div className="md:text-[1.25rem] text-[1rem]  font-semibold text-neutral-900 max-md:max-w-full">
            Thông tin cơ bản
          </div>
          <div className="flex flex-wrap gap-2 items-start mt-6 w-full max-md:max-w-full">
            <div className="grid grid-cols-2 gap-4 font-semibold w-full">
              <div className="flex flex-col justify-center max-md:max-w-full ">
                <label
                  htmlFor="LessonName"
                  className="text-neutral-900 text-opacity-50 max-md:max-w-full"
                >
                  Tên chương học
                </label>
                <span className="p-2.5 mt-2 rounded-lg text-neutral-900">
                  {data.LessonName}
                </span>
              </div>
              <div className="flex flex-col justify-center max-md:max-w-full ">
                <div className="flex gap-3 items-center">
                  <div className="text-[1.25rem] max-md:text-[1rem] font-semibold text-neutral-900 text-opacity-50">
                    Lần cuối cập nhật
                  </div>
                  <button
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
                <span className="p-2.5 mt-2 rounded-lg text-neutral-900">
                  {moment(
                    data?.editedBy?.[data.editedBy?.length - 1]?.editedAt ||
                      data?.createdAt
                  ).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
            {/* <StatusBadge /> */}
          </div>
        </div>
        <div className="flex z-0 flex-wrap gap-3 items-center mt-4 w-full md:text-[1.25rem] text-[1rem] max-md:max-w-full">
          <div className="self-stretch my-auto font-semibold text-neutral-900">
            Bài tập
          </div>
          <EditButton onClick={onClickExercise} role={role} />
        </div>
        <div className="flex z-0 flex-col mt-8 w-full md:text-[1.25rem] text-[1rem]  text-neutral-900 max-md:max-w-full">
          <div className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
            <div className="font-semibold">Danh sách bài học</div>
            <div className="flex-1 shrink font-medium leading-none text-right basis-0 max-md:max-w-full">
              Tổng số bài học: {data?.video?.length}
            </div>
          </div>
          <div className="flex flex-col pb-16 mt-6 w-full font-medium leading-none max-md:max-w-full">
            <TableHeader onClickVideo={onClickVideo} role={role} />
            {data?.video?.length > 0 &&
              data.video.map((video, index) => (
                <LessonRow
                  setLoading={setLoading}
                  key={index}
                  video={video}
                  lessonChange={lessonChange}
                  role={role}
                />
              ))}
          </div>
        </div>
      </div>
      {isHistoryVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 max-md:px-10 overflow-hidden">
          <ChapterDetailHistory onClose={handleCloseHistoryRequest} />
        </div>
      )}
    </>
  );
}

export default CourseLesson;
