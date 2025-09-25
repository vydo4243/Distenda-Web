import * as React from "react";

export default function PermissionHeader({ roles, setSelectedRoles }) {
  const [selectedRoleIndex, setSelectedRoleIndex] = React.useState(null);

  const handleRoleClick = (index, id) => {
    setSelectedRoleIndex(selectedRoleIndex === index ? null : index);
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((role) => role !== id) : [...prev, id]
    );
  };
  console.log(roles.length);
  return (
    <div
      className={`overflow-hidden w-full mt-[1.25rem] bg-[#EBF1F9] max-md:min-h-[2.75rem] grid grid-cols-${
        roles ? roles.length + 1 : 1
      }`}
    >
      <div className="flex basis-1/5 min-w-0 justify-center items-center text-white bg-[#6C8299]">
        <div className="gap-2.5 self-stretch my-auto">Quyền</div>
      </div>
      {roles.map((role, index) => {
        // Kiểm tra xem phần tử đã được chọn hay chưa
        const isSelected = selectedRoleIndex === index;

        return (
          <div
            key={index}
            className={`min-w-[120px] flex flex-1 shrink gap-2 px-2 justify-center items-center basis-0 min-h-[70px] ${
              isSelected
                ? "bg-[#FF3C00]/20 hover:bg-[#FF3C00]/40"
                : "hover:bg-[#abbdd4]" // Thêm màu nền khi được chọn
            }`}
            onClick={() => handleRoleClick(index, role._id)}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/ce9d43b270ae41158192dec03af70a1a/6be2a4d09c558667270ec256fe0af0140bf78c959a9235fca9e3ef9efb4b3cad?apiKey=7a79403a23cb489f853e4845c47ede19&"
              alt={`${role.RoleName} icon`}
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[2rem]"
            />
            <div className="flex items-center justify-center pr-2 text-center break-words h-full">
              {role.RoleName}
            </div>
          </div>
        );
      })}
    </div>
  );
}
