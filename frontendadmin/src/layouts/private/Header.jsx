import React, { useState, useEffect, useRef } from "react";
import { headerController } from "../../controllers/home.controller";
import { useRole } from "../AppContext";

export default function Header({ setHeaderHeight, handleTaskBarToggle }) {
  const [openDetails, setOpenDetails] = useState(false);
  const { user } = useRole();
  const toggleTaskBar = () => {
    setOpenDetails(!openDetails); // Đảo trạng thái openDetails
    handleTaskBarToggle();
  };

  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const result = await headerController();
      if (result) {
        setData(result); // Lưu dữ liệu nếu hợp lệ
      }
    }

    fetchData();
  }, []);

  const headerRef = useRef(null);
  useEffect(() => {
    async function fetchData() {
      await headerController();
      // console.log("Header result:", result);
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }

    fetchData();
  }, [setHeaderHeight]);

  return (
    <header
      ref={headerRef}
      className="fixed left top-0 z-50 w-full bg-[#EBF1F9] max-md:max-w-full"
    >
      <div className="flex items-center justify-between px-[3.75rem] max-md:px-[2rem] max-md:pr-[20px]">
        <div className="flex items-center p-2">
          <img
            src={
              data?.setting?.WebsiteLogoAdmin
                ? data.setting.WebsiteLogoAdmin
                : "/logo1.svg"
            }
            alt={
              data?.setting?.WebsiteName ? data.setting.WebsiteName : "DISTENDA"
            }
            className="w-[8.375rem] max-md:w-[75px] h-auto object-contain "
          />
        </div>
        <button
          className="flex flex-row items-center gap-[0.5rem]"
          onClick={toggleTaskBar}
        >
          <img
            loading="lazy"
            src={user?.AdminAvatar ? user?.AdminAvatar : "/profile.svg"}
            alt="Profile"
            className="object-cover rounded-full w-[2.345rem] h-[2.345rem] max-md:w-[1.75rem] max-md:h-[1.75rem]"
          />
          <img
            loading="lazy"
            src={`/icons/${openDetails ? "tam_giac2" : "tam_giac"}.svg`}
            alt=""
            className="object-center shrink-0 w-[0.67rem] aspect-[2.14]"
          />
        </button>
      </div>
    </header>
  );
}
