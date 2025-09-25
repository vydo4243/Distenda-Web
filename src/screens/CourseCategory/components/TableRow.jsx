import React from "react";

function TableRow({ categories, role }) {
  const renderCategories = (data, level = 0, renderedIds = new Set()) => {
    return (
      data?.length > 0 &&
      data.flatMap((item) => {
        // Nếu đã render item này thì bỏ qua
        if (renderedIds.has(item._id)) return [];
        renderedIds.add(item._id);

        return [
          <div
            key={item._id}
            className="flex overflow-hidden flex-wrap mt-3 w-full bg-white min-h-[3.75rem] max-md:min-h-[2.75rem]"
          >
            {/* ID */}
            <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] shrink gap-3 justify-center items-center bg-[#EBF1F9] px-3  text-neutral-900 max-md:max-w-full">
              <div className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
                {item._id}
              </div>
            </div>

            {/* Name */}
            <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-start items-center px-3  text-neutral-900 w-[200px]">
              <div className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
                {"--".repeat(level)} {item.CategoryName}
              </div>
            </div>

            {/* Course Count */}
            <div className="flex basis-1/4 min-w-0 min-h-[3.75rem] max-md:min-h-[2.75rem] gap-3 justify-center items-center px-3  bg-[#EBF1F9] text-neutral-900 w-[300px]">
              <div className="text-[#131313] text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
                {item.count || 0}
              </div>
            </div>

            {/* Actions */}
            <div className="flex basis-1/4 min-w-0 shrink gap-3 justify-center items-center px-[0.75rem] min-h-[3.75rem] max-md:min-h-[2.75rem]  max-md:max-w-full">
              {/* Button Sửa */}
              <button
                disabled={!role?.RolePermissions?.includes("course_edit")}
                className={`${
                  role?.RolePermissions?.includes("course_edit")
                    ? "bg-[#D1F669] hover:bg-[#a3e635]"
                    : "bg-[#f0ffc7] cursor-not-allowed"
                } flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-[0.75rem] rounded-[99px] text-neutral-900 transition-colors`}
              >
                <div className="gap-2.5 self-stretch my-auto p-[0.5rem]">
                  Sửa
                </div>
              </button>
              {/* Button Xóa */}
              <button
                disabled={!role?.RolePermissions?.includes("course_delete")}
                className={`flex basis-1/2 min-w-0 shrink gap-3 justify-center items-center px-[0.75rem]  text-white rounded-[99px] transition-colors ${
                  role?.RolePermissions?.includes("course_delete")
                    ? "bg-[#DF322B] hover:bg-[#902723]"
                    : "bg-[#ffd1d1] cursor-not-allowed"
                }`}
              >
                <div className="gap-2.5 self-stretch my-auto p-[0.5rem]">
                  Xóa
                </div>
              </button>
            </div>
          </div>,

          // Render children nếu có
          ...(item.children && Array.isArray(item.children)
            ? renderCategories(item.children, level + 1, renderedIds)
            : []),
        ];
      })
    );
  };

  // console.log("category", categories);
  return <div>{renderCategories(categories)}</div>;
}

export default TableRow;
