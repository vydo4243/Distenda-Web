import React from "react";
import moment from "moment";

const PersonalInfo = ({
  data,
  handleChange,
  handleToggle,
  roles,
  handleHistoryRequest,
}) => {
  return (
    <div className="flex flex-col mt-10 w-full text-[1.25rem] max-md:text-[1rem] max-md:max-w-full">
      <div className="font-semibold text-[#171717] max-md:max-w-full">
        Thông tin cá nhân
      </div>
      <div className="flex flex-col mt-6 w-full font-medium leading-none max-md:max-w-full">
        <div className="flex flex-wrap gap-[1rem] justify-between items-start w-full max-md:max-w-full">
          {/* Họ và tên */}
          <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem] min-w-[15rem] w-[22rem]">
            <label
              htmlFor="AdminFullName"
              className="text-[#171717] text-opacity-50"
            >
              Họ và tên
            </label>
            <input
              id="AdminFullName"
              type="text"
              value={data?.AdminFullName}
              onChange={handleChange}
              className="p-[0.625rem] mt-2 rounded-lg border border-solid border-slate-500 text-[#171717]"
            />
          </div>

          {/* Gmail */}
          <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem] min-w-[15rem] w-[22rem]">
            <label
              htmlFor="AdminEmail"
              className="text-[#171717] text-opacity-50"
            >
              Gmail
            </label>
            <input
              id="AdminEmail"
              type="email"
              value={data?.AdminEmail}
              onChange={handleChange}
              className="p-[0.625rem] mt-2 rounded-lg border border-solid border-slate-500 text-[#171717]"
            />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem] min-w-[15rem] w-[22rem]">
            <label
              htmlFor="AdminPhone"
              className="text-[#171717] text-opacity-50"
            >
              Số điện thoại
            </label>
            <input
              id="AdminPhone"
              type="tel"
              value={data?.AdminPhone}
              onChange={handleChange}
              className="p-[0.625rem] mt-2 rounded-lg border border-solid border-slate-500 text-[#171717]"
            />
          </div>
        </div>

        {/* Chức vụ */}
        <div className="flex flex-wrap gap-[2rem] justify-between items-start mt-8 max-w-full">
          <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem] min-w-[15rem] w-[22rem]">
            <label
              htmlFor="position"
              className="text-[#171717] text-opacity-50"
            >
              Chức vụ
            </label>
            <select
              id="AdminRole_id"
              value={data?.role._id}
              onChange={(e) => handleChange(e)} // Kích hoạt hàm onChange khi chọn
              className="p-[0.625rem] mt-2 rounded-lg border border-solid border-slate-500 text-[#171717]"
            >
              {roles &&
                roles.length > 0 &&
                roles.map((option, index) => (
                  <option
                    key={index}
                    value={option._id}
                    disabled={option.disabled}
                  >
                    {option.RoleName}
                  </option>
                ))}
            </select>
            {/* <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="p-[0.625rem] mt-2 rounded-lg border border-solid border-slate-500 text-[#171717]"
            >
              {positionOptions.map((role) => (
                <option key={role._id} value={role._id} disabled={role.disabled}>
                  {role.RoleName}
                </option>
              ))}
            </select> */}
          </div>

          {/* Trạng thái */}
          <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem] min-w-[15rem] w-[22rem]">
            <label
              htmlFor="AdminStatus"
              className="text-[#171717] text-opacity-50"
            >
              Trạng thái
            </label>
            {data?.AdminStatus === 1 ? (
              <button
                onClick={handleToggle}
                className={`flex justify-center items-center p-3 mt-2 w-full min-h-[2.5rem] rounded-[6.25rem] bg-[#D1F669]`}
              >
                Đang hoạt động
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className={`flex justify-center items-center p-3 mt-2 w-full min-h-[2.5rem] rounded-[6.25rem] bg-[#FFD75B]`}
              >
                Tạm dừng
              </button>
            )}
            {/* <button
              onClick={handleToggle}
              className={`flex justify-center items-center p-3 mt-2 w-full min-h-[2.5rem] rounded-[6.25rem] ${statusClass}`}
            >
              {statusText}
            </button> */}
          </div>

          {/* Lần cuối cập nhật */}
          <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem] min-w-[15rem] w-[22rem]">
            <div className="flex gap-3 items-center">
              <label
                htmlFor="AdminLastUpdated"
                className="text-[#171717] text-opacity-50"
              >
                Lần cuối cập nhật
              </label>
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
            <span className="p-[0.625rem] mt-2 rounded-lg text-[#171717]">
              {moment(
                data?.editedBy?.[data.editedBy?.length - 1]?.editedAt ||
                  data?.createdAt
              ).format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
