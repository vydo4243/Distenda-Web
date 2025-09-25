import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { loginConfirmController } from "../../controllers/auth.controller.js";

function OTP({ email, result }) {
  const [formData, setFormData] = useState({
    AdminEmail: email,
    OTP: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //Xử lý loading button
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    setIsLoading(true); // Bắt đầu trạng thái loading

    try {
      // Gọi API xử lý
      const result = await loginConfirmController(
        formData,
        setSuccess,
        setError
      );
      setTimeout(() => {
        navigate("/"); // Điều hướng tới trang chủ
      }, 3000);
      Cookies.set("token", result.token, {
        expires: 7, // số ngày hết hạn (ở đây là 7 ngày)
        path: "/", // cookie có hiệu lực toàn site
        sameSite: "Lax", // tăng bảo mật, tránh CSRF
      });
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div className="flex z-0 flex-col w-full max-md:max-w-full">
      <div className="flex flex-col w-full leading-none max-md:max-w-full">
        <div className="flex flex-col self-center max-w-full">
          <h2 className="flex gap-3 items-end self-center px-3 max-w-full text-[1.875rem] max-md:text-[1.5rem] font-semibold text-center text-[#14375F] font-['Montserrat'] leading-loose">
            ĐĂNG NHẬP
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-4 w-full max-md:max-w-full"
      >
        <div className="flex flex-col w-full text-[1.125rem] max-md:text-[1rem] text-[#131313]">
          <div className="flex flex-col w-full  whitespace-nowrap">
            <label htmlFor="email" className="self-start text-[#6C8299]">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 bg-white/0 rounded-lg border border-solid border-[#6C8299]"
              aria-label="Email"
              name="AdminEmail"
              value={email}
              disabled
            />
          </div>
          <div className="flex gap-1 items-center mt-4 w-full max-md:text-[1rem]">
            <p className="flex gap-3 items-center font-medium text-[1.25rem] text-[#14375F] self-stretch py-1 my-auto">
              {result}
            </p>
          </div>
          <div className="flex flex-col mt-4 w-full">
            <label htmlFor="otp" className="self-start text-[#6C8299]">
              Nhập mã OTP
            </label>
            <input
              className="mt-1 w-full px-4 py-2 bg-white/0 text-[#131313] rounded-lg border border-solid border-[#6C8299]"
              type="text" // Sử dụng type="text" để kiểm soát độ dài và loại ký tự
              id="otp"
              required
              aria-label="Mã OTP"
              name="OTP"
              value={formData.OTP}
              onChange={(e) => {
                const value = e.target.value;
                // Chỉ cho phép nhập số và giới hạn tối đa 6 ký tự
                if (/^\d*$/.test(value) && value.length <= 6) {
                  handleChange(e); // Gọi hàm xử lý thay đổi giá trị
                }
              }}
              pattern="^\d{6}$" // Đảm bảo chính xác 6 chữ số
              title="Vui lòng nhập chính xác 6 chữ số"
              maxLength={6} // Giới hạn nhập không quá 6 ký tự
            />
          </div>
        </div>
        <div className="flex mt-2 items-center justify-end text-right w-full text-[1.125rem] max-md:text-[1rem] max-md:text-[16px]">
          <button
            type="button"
            tabIndex={0}
            className="flex text-right text-[#14375F] text-base font-normal hover:font-medium hover:underline self-end my-auto"
            onClick={(e) => {
              e.preventDefault(); // Ngăn hành vi mặc định
              console.log("Gửi lại mã OTP");
              // Thực hiện logic gửi lại OTP tại đây
            }}
          >
            Gửi lại
          </button>
        </div>

        <button
          type="submit"
          className={`flex flex-wrap gap-5 justify-center items-center rounded-lg mt-4 w-full text-[1.25rem] max-md:text-[1.125rem] font-normal bg-[#6C8299] min-h-[3.625rem] text-white max-md:max-w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Đang xử lý..." : "Xác nhận"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-[#6C8299]">{success}</p>}
      </form>
    </div>
  );
}

export default OTP;
