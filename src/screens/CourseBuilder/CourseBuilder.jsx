import * as React from "react";
// import { Header } from "./components/Header";
// import { NavigationBar } from "./components/NavigationBar";
import { CourseForm } from "./components/CourseForm";
import { useRole } from "../../layouts/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet";
import { PopupLoading } from "../../components/PopupLoading";

export default function CourseBuilder() {
  const { role } = useRole();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
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
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Thêm bài học</title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <main className="flex overflow-hidden flex-col leading-none bg-[#EBF1F9]">
        {/* <Header /> */}
        {/* <NavigationBar /> */}
        <CourseForm setLoading={setLoading} setLoadingPopup={setLoadingPopup} />
      </main>
    </>
  );
}
