import * as React from "react";

export function FileUpload({ id, label, imageUrl, buttonText = "Chọn tệp", uploadImagePreviewRef, handleImageChange, uploadImageInputRef }) {
  return (
    <div className="flex flex-col min-w-[15rem] max-md:max-w-full">
      <div className="text-neutral-900 text-opacity-50 max-md:max-w-full">
        {label}
      </div>
      <div className="flex flex-wrap gap-4 items-center mt-2 w-full text-white max-md:max-w-full">
        <img
          loading="lazy"
          src={imageUrl}
          alt={`${label} preview`}
          className="object-contain self-stretch my-auto aspect-[5.88] min-w-[15rem] w-[25rem] rounded-lg bg-[#CFCFCF]"
          ref={uploadImagePreviewRef}
        />
        <button
          className="flex gap-[0.25rem] justify-center items-center self-stretch px-3 py-3 my-auto rounded-lg bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem]"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b89b8bfd22bc2795389e527250a9a6d8837d50745dd80eb6ef8da7f2fb81f4a1?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="gap-2.5 self-stretch my-auto"></span>
          <label htmlFor={id}>
            {buttonText}
          </label>
          <input
            type="file"
            className="gap-2.5 self-stretch my-auto form-control-file hidden" // Ẩn input file
            id={id}
            name={id}
            accept="image/*"
            ref={uploadImageInputRef}
            onChange={handleImageChange}
          />
        </button>
      </div>
      {/* <div className="mt-2 text-slate-500 text-opacity-80 max-md:max-w-full">
        Không có tệp nào được chọn
      </div> */}
    </div>
  );
}