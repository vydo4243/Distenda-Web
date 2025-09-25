import React, { useEffect, useState } from "react";
// import Header from './Header';
// import NavigationBar from "./NavigationBar";
import CourseForm from "./CourseForm";
import { useRole } from "../../layouts/AppContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../components/PopupLoading";
// import Loading from "../../components/Loading";

function CourseCreationPage() {
  const { role, user } = useRole();
  const [loadingPopup, setLoadingPopup] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      role &&
      !role?.RolePermissions?.includes("course_create") &&
      !role?.RolePermissions?.includes("course_only")
    ) {
      console.log("Không có quyền, chuyển về trang chủ");
      navigate("/courses");
    }
  }, [navigate, role]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <Helmet>
        <title>Thêm khoá học</title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <div className="flex overflow-hidden flex-col bg-[#EBF1F9]">
        {/* <Header /> */}
        {/* <NavigationBar /> */}
        <CourseForm
          role={role}
          user={user}
          setLoadingPopup={setLoadingPopup}
          // setLoading={setLoading}
        />
      </div>
    </>
  );
}

export default CourseCreationPage;
