import React, { createContext, useContext, useState, useEffect } from "react";
import { roleController } from "../controllers/home.controller";

// Tạo Context
const RoleContext = createContext();

// Tạo Provider
export function RoleProvider({ children }) {
  const [role, setRole] = useState(null); // Lưu thông tin role
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Đặt loading mặc định là true khi đang fetch dữ liệu

  useEffect(() => {
    async function fetchData() {
      const result = await roleController(setLoading);
      if (result) {
        setRole(result.role); // Lưu dữ liệu role
        setUser(result.user); // Lưu dữ liệu user
      }
      setLoading(false); // Sau khi fetch xong, set loading = false
    }

    fetchData();
  }, []);
  // console.log("role", role?.RolePermissions);
  // Trả về RoleContext.Provider với các giá trị cần thiết
  return (
    <RoleContext.Provider value={{ role, setRole, user, setUser, loading }}>
      {children}
    </RoleContext.Provider>
  );
}

// Custom hook để sử dụng RoleContext
export function useRole() {
  return useContext(RoleContext);
}
