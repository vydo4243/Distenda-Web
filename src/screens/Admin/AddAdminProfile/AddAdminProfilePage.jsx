import React, { useState, useEffect } from "react";
import { PersonalInfoField } from "./components/PersonalInfoField";
import { ActionButton } from "./components/ActionButton";
import { adminCreateController } from "../../../controllers/admin.controller";

import Loading from "../../../components/Loading";
import { useRole } from "../../../layouts/AppContext";
import { useNavigate } from "react-router-dom";
import { PopupLoading } from "../../../components/PopupLoading";
import { Helmet } from "react-helmet";

export const UserProfile = () => {
  // Quản lý thông tin người dùng
  const [personalInfo, setPersonalInfo] = useState({
    AdminFullName: "",
    AdminEmail: "",
    AdminPhone: "",
    AdminLevel: "",
    AdminExp: "",
    AdminRole_id: "",
  });

  const [roles, setRoles] = useState([{ _id: "", RoleName: "Chọn chức vụ" }]);

  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const { role } = useRole();
  const navigate = useNavigate();
  useEffect(() => {
    if (role && !role.RolePermissions?.includes("admin_create")) {
      console.log("Không có quyền, chuyển về trang chủ");
      navigate("/admin");
    }
  }, [navigate, role]);

  useEffect(() => {
    async function fetchData() {
      // console.log("vaof")
      const result = await adminCreateController(setLoading);
      // console.log(result)
      if (result) {
        setRoles((prevRoles) => [
          { _id: "", RoleName: "Chọn chức vụ", disabled: true },
          ...result, // Dữ liệu fetch được sẽ thêm vào sau "Chọn chức vụ"
        ]);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPersonalInfo((prevData) => ({
      ...prevData,
      [id]: value, // Cập nhật giá trị cho trường đã thay đổi
    }));
  };

  if (loading) {
    return <Loading />;
  }

  // console.log(roles)

  return (
    <>
      <Helmet>
        <title>Thêm quản trị viên</title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <main className="flex flex-col flex-1 justify-start items-center shrink p-[3rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 min-w-[15rem] max-md:px-[1.25rem] min-h-[4.375rem] max-md:min-h-[3rem]">
        {/* Nút hành động */}
        <div className="flex gap-3 justify-end items-center w-full">
          <ActionButton
            icon="https://cdn.builder.io/api/v1/image/assets/ce9d43b270ae41158192dec03af70a1a/1829cc85a1395ac435e855f81f93714a3f953f874b6692060baaea6cd1928f74?apiKey=7a79403a23cb489f853e4845c47ede19&"
            label="Lưu"
            variant="primary"
            personalInfo={personalInfo}
            setLoadingPopup={setLoadingPopup}
          />
          <ActionButton label="Hủy" variant="secondary" />
        </div>

        {/* Thông tin cá nhân */}
        <section className="flex flex-col mt-[2.5rem] w-full">
          <h1 className="font-semibold text-[#171717] text-2xl mb-[1.5rem]">
            Thông tin cá nhân
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1.5rem]">
            {[
              { label: "Họ và tên", field: "AdminFullName" },
              { label: "Gmail", field: "AdminEmail" },
              { label: "Số điện thoại", field: "AdminPhone" },
              { label: "Trình độ chuyên môn", field: "AdminLevel" },
              { label: "Kinh nghiệm làm việc", field: "AdminExp" },
            ].map((field, index) => (
              <PersonalInfoField
                key={index}
                label={field.label}
                value={personalInfo[field.field]}
                onChange={handleChange}
                id={field.field}
              />
            ))}
          </div>

          {/* Chức vụ */}
          <div className="flex flex-col mt-[2rem]">
            <h2 className="text-[1.25rem] max-md:text-[1rem] font-semibold mb-[0.5rem]">Chức vụ</h2>
            <select
              value={personalInfo.AdminRole_id} // Truyền giá trị AdminRole_id vào value của select
              onChange={handleChange} // Khi thay đổi giá trị, sẽ gọi handleChange để cập nhật AdminRole_id
              id="AdminRole_id" // Cập nhật id của select để phân biệt
              className="w-[17.5rem] px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {roles.map((role) => (
                <option
                  key={role._id}
                  value={role._id}
                  disabled={role.disabled}
                >
                  {role.RoleName}
                </option>
              ))}
            </select>
          </div>
        </section>
      </main>
    </>
  );
};
