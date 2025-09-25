import * as React from "react";

export default function LessonRow({ number, title, lastUpdated }) {
  return (
    <div className="flex overflow-hidden flex-wrap w-full mt-3 bg-white min-h-[3.75rem] max-md:min-h-[2.75rem] hover:bg-[#F9FAFB] cursor-pointer transition-all">
    {/* Số thứ tự */}
    <div className="flex justify-center items-center p-3 h-full bg-[#EBF1F9] basis-1/6 border-[#6C8299]">
      <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate">{number}</span>
    </div>
  
    {/* Tên bài */}
    <div className="flex justify-center items-center p-3 h-full bg-white basis-1/3 border-[#6C8299]">
      <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate">{title}</span>
    </div>
  
    {/* Lần cuối cập nhật */}
    <div className="flex justify-center items-center p-3 h-full bg-[#EBF1F9] basis-1/3 border-[#6C8299]">
      <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem]  font-medium truncate">{lastUpdated}</span>
    </div>
  
    {/* Hành động */}
    <div className="flex justify-center items-center gap-2 p-3 h-full bg-white basis-1/6">
      <button className="flex justify-center items-center px-4 py-2 bg-[#D1F669] rounded-[99px] hover:bg-[#C5E65F] transition-all">
        <span className="text-[#131313] text-[1.125rem] max-md:text-[1rem] font-medium">Sửa</span>
      </button>
      <button className="flex justify-center items-center px-4 py-2 bg-[#FFD75B] rounded-[99px] hover:bg-[#FFC640] transition-all">
        <span className="text-[#131313] text-[1.125rem] max-md:text-[1rem] font-medium">Ẩn</span>
      </button>
    </div>
  </div>
  
  );
}
