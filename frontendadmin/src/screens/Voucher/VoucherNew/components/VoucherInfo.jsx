import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { voucherCreatePostController } from "../../../../controllers/voucher.controller.js";
import { courseGetAllController } from "../../../../controllers/course.controller.js";
import { PopupConfirmCancel } from "../../../../components/PopupConfirmCancel";
import { PopupSuccess } from "../../../../components/PopupSuccess";
import { PopupError } from "../../../../components/PopupError";

const VoucherInfo = () => {
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState({
    voucherCode: "",
    discountPercentage: "",
    minAmount: "",
    discountAmount: "",
    courseIds: [],
  });

  const [courseList, setCourseList] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const result = await courseGetAllController();
      if (result) setCourseList(result);
    }
    fetchCourses();
  }, []);

  const handleChange = (field, value) => {
    setVoucher((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectCourse = (e) => {
    const selectedId = e.target.value;
    if (selectedId && !voucher.courseIds.includes(selectedId)) {
      setVoucher((prev) => ({
        ...prev,
        courseIds: [...prev.courseIds, selectedId],
      }));
    }
  };

  const handleRemoveCourse = (id) => {
    setVoucher((prev) => ({
      ...prev,
      courseIds: prev.courseIds.filter((c) => c !== id),
    }));
  };

  const handleAction = async (action) => {
    if (action === "save") {
      const payload = {
        voucherCode: voucher.voucherCode?.trim(),
        discountPercentage: parseInt(voucher.discountPercentage || "0"),
        minAmount: parseInt(voucher.minAmount || "0"),
        discountAmount: parseInt(voucher.discountAmount || "0"),
        courseIds: voucher.courseIds,
        validityPeriod: 30,
      };

      try {
        const result = await voucherCreatePostController(payload);
        if (result?.code === 200) {
          setSuccessPopupVisible(true);
          navigate("/voucher", { state: { newVoucher: result.voucher } });
        } else {
          setErrorPopupVisible(true);
        }
      } catch (err) {
        console.error("API Error:", err);
        setErrorPopupVisible(true);
      }
    } else if (action === "cancel") {
      setPopupContent(
        "Bạn có muốn hủy tạo voucher mới? Voucher mới sẽ không được lưu."
      );
      setPopupVisible(true);
    }
  };

  return (
    <section>
      <div className="flex gap-[0.5rem] items-start self-end text-[1.25rem] max-md:text-[1rem] font-semibold leading-none text-white max-md:max-w-full">
        <ActionButton
          label="Lưu"
          bgColor="bg-[#6C8299]"
          onClick={() => handleAction("save")}
        />
        <ActionButton
          label="Hủy"
          bgColor="bg-[#DF322B]"
          onClick={() => handleAction("cancel")}
        />
      </div>

      <div className="flex flex-col mt-[2.5rem] w-full text-[1.25rem] max-md:text-[1rem] max-md:max-w-full">
        <h3 className="font-semibold text-[#171717] max-md:max-w-full">Thông tin voucher</h3>

        <div className="flex flex-wrap gap-6 mt-6">
          <FormField
            label="Mã Voucher"
            value={voucher.voucherCode}
            onChange={(val) => handleChange("voucherCode", val)}
          />
          <FormField
            label="Giảm giá (%)"
            value={voucher.discountPercentage}
            onChange={(val) => handleChange("discountPercentage", val)}
          />
        </div>
        <div className="flex flex-wrap gap-6 mt-6">
          <FormField
            label="Tối thiểu"
            value={voucher.minAmount}
            onChange={(val) => handleChange("minAmount", val)}
          />
          <FormField
            label="Giới hạn"
            value={voucher.discountAmount}
            onChange={(val) => handleChange("discountAmount", val)}
          />
        </div>

        {/* Danh sách chọn khóa học */}
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
            {voucher.courseIds.map((id, idx) => {
              const course = courseList.find((c) => c._id === id);
              return (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 px-3 py-2 bg-[#6C8299] rounded-[1.25rem] shadow-md"
                >
                  <span className="text-lg text-white truncate">
                    {course?.CourseName || "Không tìm thấy"}
                  </span>
                  <button
                    onClick={() => handleRemoveCourse(id)}
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

      <PopupConfirmCancel
        isVisible={isPopupVisible}
        content={popupContent}
        confirm="Huỷ"
        onConfirm={() => navigate("/voucher")}
        onCancel={() => setPopupVisible(false)}
      />
      <PopupSuccess
        isVisible={successPopupVisible}
        message="Tạo thành công!"
        onClose={() => navigate("/voucher")}
      />
      <PopupError
        isVisible={errorPopupVisible}
        message="Tạo thất bại. Vui lòng thử lại!"
        onClose={() => setErrorPopupVisible(false)}
      />
    </section>
  );
};

const ActionButton = ({ label, bgColor, onClick }) => (
  <button
    onClick={onClick}
    className={`flex gap-2 justify-center items-center px-4 py-3 rounded-lg text-white ${bgColor}`}
  >
    <span>{label}</span>
  </button>
);

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

export default VoucherInfo;
