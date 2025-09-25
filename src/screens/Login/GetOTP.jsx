import React, { useState } from "react";

import { loginController } from "../../controllers/auth.controller.js";

function GetOTP({ onNext, onSetEmail, setResult }) {
  const [formData, setFormData] = useState({
    AdminEmail: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //Xử lý loading button

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    onSetEmail(formData.AdminEmail);
    setError(null);
    setSuccess(null);
    setIsLoading(true); // Bắt đầu trạng thái loading

    // Gửi dữ liệu tới server
    try {
      if (onNext) {
        const result = await loginController(formData, setSuccess, setError);
        console.log(result);
        setResult(result.message);
        setIsLoading(false);
        if (result.code === 200) {
          onNext(); // Chỉ gọi hàm onNext nếu OTP hợp lệ và xử lý thành công
        }
      }
    } catch (err) {
      console.log(err);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };
  return (
    <div className="flex z-0 flex-col w-full max-md:max-w-full">
      <div className="flex flex-col w-full leading-none  max-md:max-w-full">
        <div className="flex flex-col self-center max-w-full">
          <h2 className="flex gap-3 items-center self-center px-3 max-w-full text-[1.875rem] max-md:text-[1.5rem] font-semibold text-center text-[#14375F] font-['Montserrat'] leading-loose">
            ĐĂNG NHẬP
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="lex flex-col mt-4 w-full max-md:max-w-full"
      >
        <div className="flex flex-col w-full text-[1.125rem] max-md:text-[1rem] text-[#131313]">
          <div className="flex flex-col w-full  whitespace-nowrap">
            <label htmlFor="email" className="self-start text-[#6C8299]">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 bg-white/0 text-[#131313] rounded-lg border border-solid border-[#6C8299]"
              required
              aria-label="Email"
              name="AdminEmail"
              value={formData.AdminEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`flex flex-wrap gap-5 justify-center items-center mt-4 rounded-lg w-full text-[1.25rem] max-md:text-[1.125rem] font-normal bg-[#6C8299] min-h-[3.625rem] text-white max-md:max-w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Đang xử lý..." : "Nhận mã"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-[#6C8299]">{success}</p>}
      </form>
    </div>
  );
}

export default GetOTP;
