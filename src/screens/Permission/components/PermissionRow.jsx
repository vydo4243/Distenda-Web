import React, { useState, useEffect } from "react";

export default function PermissionRow({
  index,
  permission,
  isFirst,
  roles,
  onPermissionChange,
}) {
  // console.log(index, permission)
  const getPermission = (permission) => {
    switch (permission) {
      case 0:
        return "Thay đổi của bản thân";
      case 1:
        return "Xem";
      case 2:
        return "Thêm";
      case 3:
        return "Sửa";
      default:
        return "Xoá";
    }
  };
  // Tạo state để lưu trạng thái của các checkbox
  const [checkboxStates, setCheckboxStates] = useState(
    Array(roles.length).fill(false) // Khởi tạo mảng trạng thái cho tất cả checkbox, mặc định là `false`
  );
  // console.log(checkboxStates)

  useEffect(() => {
    // Cập nhật trạng thái checkbox dựa trên quyền của các roles
    roles.forEach((role, index) => {
      if (role.RolePermissions.includes(permission)) {
        setCheckboxStates((prevState) => {
          const newState = [...prevState];
          newState[index] = true; // Đánh dấu checkbox là checked
          return newState;
        });
      }
    });
  }, [permission, roles]);

  // Hàm xử lý khi thay đổi trạng thái checkbox
  const handleCheckboxChange = (roleIndex) => {
    const updatedStates = [...checkboxStates];
    // console.log("checkboxStates", updatedStates)
    updatedStates[roleIndex] = !updatedStates[roleIndex]; // Đảo trạng thái checkbox
    console.log("checkboxStates", updatedStates);
    setCheckboxStates(updatedStates);
    console.log("checkboxStates", checkboxStates);

    // Gửi dữ liệu về `PermissionTable`
    const roleId = roles[roleIndex]._id; // Lấy `roleId` chính xác
    onPermissionChange(roleId, permission, updatedStates[roleIndex]);
  };

  return (
    <div
      className={`w-full bg-white h-[50px] max-md: min-w-[600px] ${
        !isFirst ? "mt-1.5" : ""
      } grid grid-cols-${roles ? roles.length + 1 : 1}`}
    >
      {/* Ô hiển thị thông tin permission */}
      <div className="flex flex-1 justify-center items-center basis-0 h-[50px] min-w-[120px] text-[1.25rem] max-md:text-[1rem] font-medium bg-[#EBF1F9] text-neutral-900">
        <div className="flex items-center justify-center px-5 text-center break-words w-full h-full">
          {getPermission(index)}
        </div>
      </div>

      {/* Các ô chứa checkbox */}
      {checkboxStates.map((isChecked, index) => (
        <div
          key={index}
          className="flex basis-1/5 min-w-0 justify-center items-center p-3"
        >
          <div className="flex justify-center items-center w-full relative">
            {/* Checkbox chính */}
            {isChecked ? (
              <>
                <input
                  type="checkbox"
                  checked={isChecked} // Liên kết trạng thái với state
                  onChange={() => handleCheckboxChange(index)} // Gọi hàm khi thay đổi trạng thái
                  className={`w-5 h-5 cursor-pointer appearance-none rounded-[4px] border border-gray-300 bg-[#6C8299]`} // Hiển thị màu bên trong checkbox
                />
                <img
                  src={`${process.env.PUBLIC_URL}/icons/check.svg`}
                  alt="Checked"
                  className="absolute w-4 h-4 pointer-events-none" // Không chặn sự kiện click
                />
              </>
            ) : (
              <input
                type="checkbox"
                checked={isChecked} // Liên kết trạng thái với state
                onChange={() => handleCheckboxChange(index)} // Gọi hàm khi thay đổi trạng thái
                className={`w-5 h-5 cursor-pointer appearance-none rounded-[4px] border border-gray-300 bg-white`} // Hiển thị màu bên trong checkbox
              />
            )}
            {/* <input
              type="checkbox"
              checked={isChecked} // Liên kết trạng thái với state
              onChange={() => handleCheckboxChange(index)} // Gọi hàm khi thay đổi trạng thái
              className={`w-5 h-5 cursor-pointer appearance-none rounded-[4px] border border-gray-300 ${isChecked ? "bg-[#6C8299]" : "bg-white"
                }`} // Hiển thị màu bên trong checkbox
            /> */}
            {/* Hiển thị hình ảnh khi checkbox được tick */}
            {/* {isChecked && (
              <img
                src={`${process.env.PUBLIC_URL}/icons/check.svg`}
                alt="Checked"
                className="absolute w-4 h-4 pointer-events-none" // Không chặn sự kiện click
              />
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
}
