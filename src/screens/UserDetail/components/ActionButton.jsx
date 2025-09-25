import * as React from "react";

function ActionButton({ label, variant, width, onClick }) {
  const baseStyles = "flex gap-2.5 justify-center items-center min-h-[3.75rem] max-md:min-h-[3rem] rounded-lg text-2xl max-md:text-[1.125rem] max-md:text-[1rem] whitespace-nowrap";
  const variantStyles = {
    danger: "bg-[#DF322B] text-white hover:bg-red-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    slate: "bg-[#6C8299] text-white hover:bg-slate-600"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      style={{ width }}
      onClick={onClick} // Thêm sự kiện onClick cho button
    >
      {label}
    </button>
  );
}

export default ActionButton;
