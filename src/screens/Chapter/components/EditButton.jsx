export default function EditButton({ onClick, role }) {
  return (
    <div className="flex gap-2.5 items-center self-stretch my-auto font-medium leading-none text-white">
      <button
        disabled={
          !(
            role?.RolePermissions?.includes("course_edit") ||
            role?.RolePermissions?.includes("course_only")
          )
        }
        onClick={onClick}
        className={`flex gap-3 justify-center items-center self-stretch md:p-3 max-md:p-2 my-auto rounded-lg ${
          role?.RolePermissions?.includes("course_edit") ||
          role?.RolePermissions?.includes("course_only")
            ? "bg-[#6C8299] hover:bg-[#55657a]"
            : "bg-[#CDD5DF] cursor-not-allowed"
        }`}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/633de2d3639375a6ff1a98039c27b613549cb8289fb7e40b9d60eb0e5e6224cc?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <span className="gap-2.5 self-stretch my-auto">Chỉnh sửa</span>
      </button>
    </div>
  );
}
