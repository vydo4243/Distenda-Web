import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export function CourseInfo({
  data,
  handleInputChange,
  handleEditorChange,
  handleToggle,
  category,
  intructor,
  editorRef,
  role,
}) {
  const voteCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalVotes = 0; // Tổng số lượt vote
  let totalPoints = 0;
  for (const [star, count] of Object.entries(voteCounts)) {
    totalVotes += count; // Cộng dồn số lượt vote
    totalPoints += star * count; // Tính tổng điểm
  }
  const voteAve = totalVotes > 0 ? (totalPoints / totalVotes).toFixed(1) : 0;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col mt-10 w-full max-md:max-w-full">
      <div className="md:text-[1.25rem] text-[1rem]  font-semibold text-neutral-900 max-md:max-w-full">
        Thông tin cơ bản
      </div>
      <div className="flex flex-col justify-center max-md:max-w-full mt-6">
        <label
          htmlFor="CourseName"
          className="text-neutral-900 text-opacity-50 max-md:max-w-full"
        >
          Tên khoá học
        </label>
        <div className="flex relative gap-2.5 items-start px-2.5 py-[1rem] max-md:py-[0.75rem] mt-2 w-full rounded-lg border border-solid border-slate-500 border-opacity-80 text-neutral-900 max-md:max-w-full">
          <input
            disabled={
              !role?.RolePermissions?.includes("course_edit") &&
              !role?.RolePermissions?.includes("course_only")
            }
            type="text"
            id="CourseName"
            value={data?.CourseName}
            onChange={handleInputChange} // Thêm xử lý onChange
            className="z-0 flex-1 shrink my-auto basis-0 max-md:max-w-full bg-transparent border-none outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 items-start mt-6 w-full max-md:max-w-full">
        {/* {basicInfo.map((info, index) => (
          <BasicInfoItem key={index} label={info.label} value={info.value} />
        ))} */}

        <div className="flex flex-col ">
          <label
            htmlFor="CourseCatogory"
            className="text-neutral-900 text-opacity-50 max-md:max-w-full"
          >
            Danh mục
          </label>
          <div className="flex relative gap-2.5 items-start px-2.5 py-[1rem] max-md:py-[0.75rem] mt-2 rounded-lg border border-solid border-slate-500 border-opacity-80 text-neutral-900 max-md:max-w-full">
            <select
              disabled={
                !role?.RolePermissions?.includes("course_edit") &&
                !role?.RolePermissions?.includes("course_only")
              }
              id="CourseCatogory"
              value={data?.CourseCatogory || ""}
              onChange={(e) => handleInputChange(e)} // Kích hoạt hàm onChange khi chọn
              className="z-0 flex-1 shrink my-auto basis-0 max-md:max-w-full bg-transparent border-none outline-none"
            >
              {category &&
                category.length > 0 &&
                category.map((option, index) => (
                  <option
                    key={index}
                    value={option._id}
                    disabled={option.disabled}
                  >
                    {option.CategoryName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="CourseIntructor"
            className="text-neutral-900 text-opacity-50 max-md:max-w-full"
          >
            Giảng viên
          </label>
          <div className="flex relativen w-full gap-2.5 items-start px-2.5 py-[1rem] max-md:py-[0.75rem] mt-2 rounded-lg border border-solid border-slate-500 border-opacity-80 text-neutral-900 max-md:max-w-full">
            <select
              disabled={
                !role?.RolePermissions?.includes("course_edit") &&
                !role?.RolePermissions?.includes("course_only")
              }
              id="CourseIntructor"
              value={data?.CourseIntructor || ""}
              onChange={(e) => handleInputChange(e)} // Kích hoạt hàm onChange khi chọn
              className="z-0 flex-1 shrink my-auto basis-0 max-md:max-w-full bg-transparent border-none outline-none"
            >
              {intructor &&
                intructor.length > 0 &&
                intructor.map((option, index) => (
                  <option
                    key={index}
                    value={option._id}
                    disabled={option.disabled}
                  >
                    {option.AdminFullName}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10 items-start mt-6 w-full md:text-[1.25rem] text-[1rem]  font-medium leading-none max-md:max-w-full">
        <div className="flex justify-between gap-5 items-center w-full max-md:max-w-full">
          <StatItem
            disabled={
              !role?.RolePermissions?.includes("course_edit") &&
              !role?.RolePermissions?.includes("course_only")
            }
            id="CoursePrice"
            label="Giá"
            value={data?.CoursePrice}
            type="input"
            handleInputChange={handleInputChange}
          />
          <StatItem
            disabled={
              !role?.RolePermissions?.includes("course_edit") &&
              !role?.RolePermissions?.includes("course_only")
            }
            id="CourseDiscount"
            label="Giảm giá"
            value={data?.CourseDiscount}
            type="input"
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 justify-between gap-5 items-center w-full max-md:max-w-full">
          <div className={`flex flex-col grow shrink self-center`}>
            <div className="text-neutral-900 text-opacity-50">Trạng thái</div>
            {data?.CourseStatus === 1 ? (
              <button
                disabled={
                  !role?.RolePermissions?.includes("course_edit") &&
                  !role?.RolePermissions?.includes("course_only")
                }
                onClick={handleToggle}
                className="flex mt-3 gap-3 justify-center items-center px-3 mb-3 bg-[#D1F669]  rounded-[99px]"
              >
                <div className="justify-center items-center w-full px-[0.75rem] py-[0.75rem] bg-[#D1F669] md:text-[1.125rem] text-[1rem] rounded-[99px] my-auto">
                  Đang hoạt động
                </div>
              </button>
            ) : (
              <button
                disabled={
                  !role?.RolePermissions?.includes("course_edit") &&
                  !role?.RolePermissions?.includes("course_only")
                }
                onClick={handleToggle}
                className="flex mt-6 gap-3 justify-center items-center px-3 mb-3  rounded-[99px]"
              >
                <div className="justify-center items-center w-full px-[0.75rem] py-[0.75rem]  bg-[#FFD75B] md:text-[1.125rem] text-[1rem] rounded-[99px] my-auto">
                  Tạm dừng
                </div>
              </button>
            )}
          </div>

          <div className={`flex flex-col grow shrink`}>
            <div className="text-neutral-900 text-opacity-50">Đánh giá</div>
            <div className="flex mt-3 gap-3 justify-center items-center px-3 mb-3  rounded-[99px]">
              <div className="justify-center items-center text-center w-full px-[0.75rem] py-[0.75rem] bg-[#FFD75B]  rounded-[99px] my-auto">
                {voteAve}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowMore(!showMore)} // Toggle hiển thị thêm
        className="flex gap-3 justify-center items-center self-start px-3 py-[1rem] max-md:py-[0.75rem] mt-6 md:text-[1.25rem] text-[1rem]  font-medium leading-none text-white rounded-lg bg-[#6C8299] min-h-[46px]"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e508b7f86805034b65e4f5b8894548c2e5a0d294454c8a6811cd5654badde28?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
        />
        <span className="gap-2.5 self-stretch my-auto">
          {showMore ? "Ẩn bớt" : "Xem thêm"}
        </span>
      </button>

      {showMore && (
        <div className="mt-6">
          <EditableDetail
            disabled={
              !role?.RolePermissions?.includes("course_edit") &&
              !role?.RolePermissions?.includes("course_only")
            }
            id="CourseDescription"
            title="Mô tả"
            value={data?.CourseDescription}
            onChange={handleEditorChange}
            editorRef={editorRef}
          />
          <EditableDetail
            disabled={
              !role?.RolePermissions?.includes("course_edit") &&
              !role?.RolePermissions?.includes("course_only")
            }
            id="CourseOverview"
            title="Tổng quan khóa học"
            value={data?.CourseOverview}
            onChange={handleEditorChange}
            editorRef={editorRef}
          />
          <EditableDetail
            disabled={
              !role?.RolePermissions?.includes("course_edit") &&
              !role?.RolePermissions?.includes("course_only")
            }
            id="CourseLearning"
            title="Bạn sẽ học được gì?"
            value={data?.CourseLearning}
            onChange={handleEditorChange}
            editorRef={editorRef}
          />
        </div>
      )}
    </div>
  );
}

function StatItem({ disabled, id, label, value, type, handleInputChange }) {
  const renderValue = () => {
    switch (type) {
      case "input":
        return (
          <input
            disabled={disabled}
            id={id}
            type="text"
            value={value}
            onChange={handleInputChange}
            className="w-full mt-3 px-3 py-[1rem] max-md:py-[0.75rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-blue-500"
          />
        );
      default:
        return (
          <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 mt-2 rounded-lg border border-solid border-slate-500 border-opacity-80 size-full text-neutral-900">
            {value}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col grow shrink">
      <label htmlFor={id} className="text-neutral-900 text-opacity-50">
        {label}
      </label>
      {renderValue()}
    </div>
  );
}

function EditableDetail({ disabled, id, title, value, onChange, editorRef }) {
  return (
    <div className="mt-6">
      <h3 className="md:text-[1.25rem] text-[1rem]  font-semibold text-neutral-900">
        {title}
      </h3>
      <Editor
        disabled={disabled}
        id={id}
        apiKey="ra8co6ju1rrspizsq3cqhi3e8p7iknltlh2v77d58cbrys8m"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={value} // Giá trị hiện tại
        onEditorChange={(content, editor) => onChange(editor)} // Hàm xử lý khi nội dung thay đổi
        init={{
          height: 250, // Chiều cao của editor
          menubar: false, // Ẩn thanh menu
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
}
