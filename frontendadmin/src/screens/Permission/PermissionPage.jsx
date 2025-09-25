import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PermissionRow from "./components/PermissionRow";
import PermissionHeader from "./components/PermissionHeader";
import ActionButtons from "./components/ActionButton";
import { rolesController } from "../../controllers/role.controller";
import Loading from "../../components/Loading";
import { useRole } from "../../layouts/AppContext";
import { PopupLoading } from "../../components/PopupLoading";

export default function PermissionTable() {
  const permissionGroups = [
    {
      title: "Tổng quan",
      permissions: ["", "dashboard_view", "", "", ""],
    },
    {
      title: "Khóa học",
      permissions: [
        "course_only",
        "course_view",
        "course_create",
        "course_edit",
        "course_delete",
      ],
    },
    {
      title: "Người dùng",
      permissions: ["", "user_view", "user_create", "user_edit", "user_delete"],
    },
    {
      title: "Quản trị viên",
      permissions: [
        "",
        "admin_view",
        "admin_create",
        "admin_edit",
        "admin_delete",
      ],
    },
    {
      title: "Hoá đơn",
      permissions: ["", "payment_view", "", "", ""],
    },
    {
      title: "Voucher",
      permissions: [
        "",
        "voucher_view",
        "voucher_create",
        "voucher_edit",
        "voucher_delete",
      ],
    },
    {
      title: "Banner",
      permissions: [
        "",
        "banner_view",
        "banner_create",
        "banner_edit",
        "banner_delete",
      ],
    },
    {
      title: "Nhóm quyền",
      permissions: ["", "role_view", "role_create", "role_edit", "role_delete"],
    },
    {
      title: "Thông tin web",
      permissions: ["", "setting_view", "", "setting_edit", ""],
    },
  ];

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const { role } = useRole();

  useEffect(() => {
    async function fetchData() {
      // console.log("vaof")
      const result = await rolesController(setLoading);
      // console.log(result)
      if (result) {
        setRoles(result);
        const initialPermissions = {};
        result.forEach((role) => {
          initialPermissions[role._id] = new Set(role.RolePermissions);
        });
        setPermissions(initialPermissions);
      }
    }

    fetchData();
  }, []);
  console.log(permissions);
  const handlePermissionChange = (roleId, permissionName, checked) => {
    console.log(permissions);
    setPermissions((prevPermissions) => {
      const updatedPermissions = { ...prevPermissions };
      if (!updatedPermissions[roleId]) {
        updatedPermissions[roleId] = new Set();
      }
      if (checked) {
        updatedPermissions[roleId].add(permissionName); // Thêm quyền
      } else {
        updatedPermissions[roleId].delete(permissionName); // Xóa quyền
      }
      return updatedPermissions;
    });
  };

  if (loading) {
    return <Loading />;
  }
  // console.log("roles => ", Array.isArray(Object.values(roles)))

  const formattedPermissions = Object.entries(permissions).map(
    ([roleId, perms]) => ({
      id: roleId,
      permissions: Array.from(perms), // Chuyển từ Set về Array để truyền JSON
    })
  );

  return (
    <>
      <Helmet>
        <title>Phân quyền</title>
      </Helmet>
      {loadingPopup && <PopupLoading />}
      <div className="flex flex-col flex-1 shrink p-[4rem] text-[1.25rem] max-md:text-[1rem] font-medium bg-white basis-0 max-md:px-[5px]  w-full max-md:min-w-[600px]">
        <ActionButtons
          selectedRoles={selectedRoles}
          permissions={formattedPermissions}
          role={role}
          setLoadingPopup={setLoadingPopup}
        />

        <PermissionHeader roles={roles} setSelectedRoles={setSelectedRoles} />
        {permissionGroups.map((group, index) => (
          <div
            key={index}
            className="flex overflow-hidden flex-wrap mt-3 w-full bg-white text-[#171717] min-h-[3.75rem] cursor-pointer"
          >
            <div className="text-[1.25rem] max-md:text-[1rem] font-semibold leading-none text-[#14375F]">
              {group.title}
            </div>
            <div className="flex flex-col justify-center w-full max-md:w-screen">
              {group.permissions.map((permission, pIndex) => (
                <>
                  {permission !== "" && (
                    <PermissionRow
                      key={pIndex}
                      index={pIndex}
                      permission={permission}
                      isFirst={pIndex === 0}
                      roles={Object.values(roles)}
                      onPermissionChange={handlePermissionChange}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
