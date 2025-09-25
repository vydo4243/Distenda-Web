import * as React from "react";

export function SocialLink({ Icon, URL, Value, handleChange }) {
  console.log(URL)
  return (
    <div className="flex overflow-hidden flex-wrap justify-between items-center mt-[1.5rem] w-full leading-none whitespace-nowrap rounded-lg border border-solid border-slate-500 border-opacity-80 min-h-[3.9375rem] text-[#171717] max-md:max-w-full">
      {/* Hiển thị biểu tượng */}
      <img
        loading="lazy"
        src={Icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto aspect-[1.3] w-[5.125rem]"
      />

      {/* Input URL */}
      <input
        type="url"
        value={Value} // Liên kết giá trị với state
        onChange={handleChange} // Gắn hàm xử lý khi giá trị thay đổi
        className="flex-1 shrink gap-[0.625rem] self-stretch p-[0.625rem] my-auto min-w-[15rem] max-md:max-w-full"
      />
    </div>
  );
}
