import React, { useState, useEffect } from "react";
import UserHeader from "./components/UserHeader";
import PersonalInfo from "./components/PersonalInfo";
import CourseTableHeader from "./components/CourseTableHeader";
import CourseTableRow from "./components/CourseTableRow";
import { userDetailController } from "../../controllers/user.controller";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useRole } from "../../layouts/AppContext";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../components/PopupLoading";

function UserProfile() {
  const { UserID } = useParams(); // Lấy giá trị UserID từ URL
  console.log("ID from URL: ", UserID);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const { role } = useRole();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await userDetailController(UserID);
      // console.log(result)
      if (result) {
        setData(result); // Lưu dữ liệu nếu hợp lệ
      }
      setLoading(false);
    }

    fetchData();
  }, [UserID]);

  if (loading) {
    return <Loading />;
  }
  console.log("User Detail => ", data);
  return (
    <>
      <Helmet>
        <title>{data?.UserFullName ? data.UserFullName : "Người dùng"}</title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <div className="flex flex-col flex-1 justify-start items-center shrink p-[3rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[240px] max-md:px-[1.25rem] min-h-[3.75rem] max-md:min-h-[2.75rem]">
        {data && (
          <UserHeader
            data={data}
            role={role}
            setLoadingPopup={setLoadingPopup}
          />
        )}
        {data && <PersonalInfo data={data} />}
        <section className="flex flex-col mt-[1.5rem] w-full text-[#171717] max-md:max-w-full">
          <CourseTableHeader />
          {data &&
            data.UserCourse &&
            data.UserCourse.length > 0 &&
            data.UserCourse.map((course, index) => (
              <CourseTableRow key={index} index={index} course={course} />
            ))}
        </section>
      </div>
    </>
  );
}

export default UserProfile;
