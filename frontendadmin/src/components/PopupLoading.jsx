import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

export const PopupLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="flex flex-col justify-center px-32 py-10 bg-white rounded-3xl font-semibold">
        <div className="flex flex-col items-center w-full text-center">
          <MoonLoader color="#6c8299" size={52} />
          <p className="mt-2 text-xl text-gray-700">Đang tải...</p>
        </div>
      </div>
    </div>
  );
};
