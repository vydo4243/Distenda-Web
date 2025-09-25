import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PopupConfirm } from "../../../../components/PopupConfirm";
import { PopupConfirmCancel } from "../../../../components/PopupConfirmCancel";
import {
  voucherUpdatePostService,
  voucherDeleteService,
  voucherDetailService,
} from "../../../../services/voucher.service";
import { courseGetAllController } from "../../../../controllers/course.controller";

const VoucherInfoUpdate = ({ voucher }) => {
  const navigate = useNavigate();
  const [popupType, setPopupType] = useState(null);
  const [voucherData, setVoucherData] = useState({
    voucherCode: voucher.voucherCode || "",
    discountPercentage: voucher.discountPercentage || "",
    minAmount: voucher.minAmount || "",
    discountAmount: voucher.discountAmount || "",
    courseIds:
      voucher.courseIds?.map((c) => (typeof c === "object" ? c._id : c)) || [],
  });

  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const result = await courseGetAllController();
      if (result) setCourseList(result);
    }
    fetchCourses();
  }, []);

  const handlePopup = (type) => setPopupType(type);
  const handleClosePopup = () => setPopupType(null);

  const handleConfirm = async () => {
    handleClosePopup();
    if (popupType === "update") {
      setLoading(true);
      try {
        const res = await voucherUpdatePostService(voucher._id, {
          ...voucherData,
          courseIds: voucherData.courseIds.map((c) =>
            typeof c === "object" ? c._id : c
          ),
        });
        if (res.code === 200) {
          alert("Cập nhật thành công!");
          const updated = await voucherDetailService(voucher._id);
          setVoucherData({
            voucherCode: updated.voucherCode || "",
            discountPercentage: updated.discountPercentage || "",
            minAmount: updated.minAmount || "",
            discountAmount: updated.discountAmount || "",
            courseIds: updated.courseIds || [],
          });
        }
      } catch (err) {
        alert("Lỗi cập nhật!");
      } finally {
        setLoading(false);
      }
    }

    if (popupType === "cancel") {
      setLoading(true);
      try {
        const res = await voucherDeleteService(voucher._id);
        if (res.code === 200) {
          navigate("/voucher");
        }
      } catch (err) {
        alert("Lỗi khi xoá!");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectCourse = (e) => {
    const selectedId = e.target.value;
    if (
      selectedId &&
      !voucherData.courseIds.some(
        (c) => (typeof c === "object" ? c._id : c) === selectedId
      )
    ) {
      const courseObj = courseList.find((c) => c._id === selectedId);
      if (courseObj) {
        setVoucherData((prev) => ({
          ...prev,
          courseIds: [...prev.courseIds, courseObj],
        }));
      }
    }
  };

  const handleRemoveCourse = (id) => {
    setVoucherData((prev) => ({
      ...prev,
      courseIds: prev.courseIds.filter(
        (c) => (typeof c === "object" ? c._id : c) !== id
      ),
    }));
  };

  return (
    <section>
      <div className="flex gap-2 justify-end text-[1.25rem] max-md:text-[1rem] font-semibold text-white">
        <ActionButton
          label="Cập nhật"
          bgColor="bg-[#6C8299]"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/84fdfd4c4d34c64c558acb40d245b2d594b0b0f000c7b4c1dd0353682f135f9d"
          onClick={() => handlePopup("update")}
        />
        <ActionButton
          label="Xóa"
          bgColor="bg-red-600"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/39a71fd8008a53a09d7a877aea83770214d261a5f742c728f7c5a0a06accb635"
          onClick={() => handlePopup("cancel")}
        />
      </div>

      <div className="flex flex-col mt-10 w-full text-[1.25rem] max-md:text-[1rem]">
        <h3 className="font-semibold text-[#171717]">Thông tin voucher</h3>

        <div className="flex flex-wrap gap-8 mt-6">
          <FormField
            label="Mã Voucher"
            value={voucherData.voucherCode}
            onChange={(val) =>
              setVoucherData((prev) => ({ ...prev, voucherCode: val }))
            }
          />
          <FormField
            label="Giảm giá (%)"
            value={voucherData.discountPercentage}
            onChange={(val) =>
              setVoucherData((prev) => ({
                ...prev,
                discountPercentage: val,
              }))
            }
          />
        </div>
        <div className="flex flex-wrap gap-8 mt-6">
          <FormField
            label="Tối thiểu"
            value={voucherData.minAmount}
            onChange={(val) =>
              setVoucherData((prev) => ({ ...prev, minAmount: val }))
            }
          />
          <FormField
            label="Giới hạn"
            value={voucherData.discountAmount}
            onChange={(val) =>
              setVoucherData((prev) => ({ ...prev, discountAmount: val }))
            }
          />
        </div>

        <div className="flex flex-col mt-6">
          <label className="text-[#13131380] pb-2">Khoá học</label>
          <select
            onChange={handleSelectCourse}
            value=""
            className="px-4 py-3 border border-slate-500 rounded-lg"
          >
            <option value="" disabled>
              Chọn khoá học
            </option>
            {courseList.map((course) => (
              <option key={course._id} value={course._id}>
                {course.CourseName}
              </option>
            ))}
          </select>

          <div className="flex-1 min-w-[15rem] max-w-[40rem] gap-[1.25rem] mt-4 flex flex-wrap">
            {voucherData.courseIds.map((c, idx) => {
              const course =
                typeof c === "object"
                  ? c
                  : courseList.find((cs) => cs._id === c);
              return (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 px-3 py-2 bg-[#6C8299] rounded-[1.25rem] shadow-md"
                >
                  <span className="text-[1.125rem] max-md:text-[1rem] text-white truncate">
                    {course?.CourseName || "Không tìm thấy"}
                  </span>
                  <button
                    onClick={() => handleRemoveCourse(course._id)}
                    className="text-white font-bold"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <PopupConfirm
        isVisible={popupType === "update"}
        content={
          loading ? "Đang cập nhật..." : "Bạn có muốn cập nhật voucher này?"
        }
        onClose={handleClosePopup}
        onConfirm={handleConfirm}
      />

      <PopupConfirmCancel
        isVisible={popupType === "cancel"}
        content="Bạn có chắc chắn muốn xoá voucher này?"
        onClose={handleClosePopup}
        confirm="Xóa"
        onConfirm={handleConfirm}
        onCancel={handleClosePopup}
      />
    </section>
  );
};

const FormField = ({ label, value, onChange }) => (
  <div className="flex-1 min-w-[15rem] max-w-[40rem]">
    <label className="text-[#13131380]">{label}</label>
    <div className="mt-2">
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg bg-transparent outline-none"
      />
    </div>
  </div>
);

const ActionButton = ({ label, bgColor, icon, onClick }) => {
  return (
    <button
      className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto text-[1.25rem] max-md:text-[1rem] font-medium leading-none text-white rounded-lg ${bgColor} min-h-[46px]`}
      onClick={onClick}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      />
      <span className="gap-2.5 self-stretch my-auto">{label}</span>
    </button>
  );
};

export default VoucherInfoUpdate;
