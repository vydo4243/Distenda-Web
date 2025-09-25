// [GET] 
export const vouchersService = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/voucher`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const responseData = await response.json();
    console.log("responseData => ", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const voucherDetailService = async (VoucherID) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/voucher/detail/${VoucherID}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    // Kiểm tra mã trạng thái của response
    if (!response.ok) {
      throw new Error(`Lỗi ${response.status}: Không thể lấy dữ liệu voucher.`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Phản hồi không phải dạng JSON");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Lỗi khi gọi API voucherDetailService:", error);
    return null;
  }
};

// Tạo mới voucher (sử dụng POST)
export const voucherCreateService = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/voucher/create`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi tải form tạo voucher!");
    }

    const responseData = await response.json();
    console.log("responseData => ", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error("Có lỗi khi gọi API tạo voucher!");
  }
};

// Tạo voucher qua POST
export const voucherCreatePostService = async (data) => {
  try {
    // Đảm bảo courseIds là mảng string
    const payload = {
      ...data,
      courseIds: Array.isArray(data.courseIds)
        ? data.courseIds.map((id) => String(id))
        : [],
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/voucher/create`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response text:", errorText);
      throw new Error("Lỗi khi tạo voucher!");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("voucherCreatePostService:", error);
    throw new Error("Có lỗi khi gửi dữ liệu tạo voucher!");
  }
};

// Cập nhật voucher (sử dụng POST)
export const voucherUpdateService = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/voucher/edit/${id}`,
      {
        method: "GET", // GET để lấy thông tin voucher cần cập nhật
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi lấy thông tin voucher!");
    }

    const responseData = await response.json();
    console.log("responseData => ", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error("Có lỗi khi gọi API cập nhật voucher!");
  }
};

// Cập nhật voucher qua POST khi chỉnh sửa thông tin voucher
export const voucherUpdatePostService = async (id, data) => {
  try {
    const payload = {
      ...data,
      courseIds: Array.isArray(data.courseIds)
        ? data.courseIds.map((id) => String(id))
        : [],
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/voucher/edit/${id}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response text:", errorText);
      throw new Error("Lỗi khi cập nhật voucher!");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("voucherUpdatePostService:", error);
    throw new Error("Có lỗi khi gửi dữ liệu cập nhật voucher!");
  }
};

// Xóa voucher (sử dụng DELETE)
export const voucherDeleteService = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/voucher/edit/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 0,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi cập nhật trạng thái voucher!");
    }

    const responseData = await response.json();
    console.log("Cập nhật trạng thái voucher => ", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error("Có lỗi khi gửi yêu cầu cập nhật trạng thái voucher!");
  }
};
