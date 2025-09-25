import * as React from "react";
import moment from "moment";

export function CourseImage({
  data,
  imageUrl,
  uploadImageInputRef,
  uploadImagePreviewRef,
  handleImageChange,
  handleHistoryRequest,
  role,
}) {
  // console.log("data", data)
  return (
    <div className="flex flex-wrap gap-4 mt-10 w-full max-md:max-w-full">
      <div className="flex flex-col gap-2.5">

      <img
        ref={uploadImagePreviewRef}
        loading="lazy"
        src={imageUrl}
        alt={data.CourseName}
        className="object-contain shrink-0 self-end aspect-[1.61] min-w-[240px] w-[316px]"
      />
      <div className="flex flex-col mt-4 max-w-full md:text-[1.25rem] text-[1rem]  font-medium leading-none">
          <button
            disabled={
              !role?.RolePermissions?.includes("course_edit") &&
              !role?.RolePermissions?.includes("course_only")
            }
          >
            <label
              htmlFor="CoursePicture"
              className={`flex gap-2 justify-center items-center self-start md:p-3 max-md:p-2 text-white rounded-lg w-fit ${
                role?.RolePermissions?.includes("course_edit") ||
                role?.RolePermissions?.includes("course_only")
                  ? "bg-[#6C8299] hover:bg-[#55657a]"
                  : "bg-[#CDD5DF] cursor-not-allowed"
              }`}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b516c63e31267ce6e114c8d3b4292335012bee5e99d5deb37cc823ac993268f?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              Chọn tệp
            </label>
            <input
              type="file"
              className="gap-2.5 self-stretch my-auto form-control-file hidden" // Ẩn input file
              id="CoursePicture"
              name="CoursePicture"
              accept="image/*"
              ref={uploadImageInputRef}
              onChange={handleImageChange}
            />
          </button>
          {/* <div className="mt-2 text-slate-500 max-md:max-w-full">
            htmljpeg.com.sdhgsg.ie104
          </div> */}
        </div>
</div>
      <div className="flex flex-col shrink basis-0 min-w-[240px] self-start gap-5 max-md:max-w-full">
        <div className="flex flex-wrap flex-1 gap-8 items-center size-full max-md:max-w-full">
          <DateInfo
            label="Ngày đăng"
            date={moment(data?.createdAt).format("DD/MM/YYYY")}
          />
          <div className="flex flex-col self-stretch my-auto ">
            <div className="flex gap-3 items-center">
              <div className="text-[1.125rem] max-md:text-[1rem] font-semibold text-neutral-900 text-opacity-50">
                Lần cuối cập nhật
              </div>
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
            <div className="mt-4 md:text-[1.25rem] text-[1rem]  font-medium text-neutral-900">
              {moment(
                data?.editedBy?.[data.editedBy?.length - 1]?.editedAt ||
                  data?.createdAt
              ).format("DD/MM/YYYY")}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

function DateInfo({ label, date }) {
  return (
    <div className="flex flex-col self-stretch my-auto ">
      <div className="text-[1.125rem] max-md:text-[1rem] font-semibold text-neutral-900 text-opacity-50">
        {label}
      </div>
      <div className="mt-4 md:text-[1.25rem] text-[1rem]  font-medium text-neutral-900">{date}</div>
    </div>
  );
}
