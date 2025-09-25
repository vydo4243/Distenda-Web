import {
  vouchersService,
  voucherCreateService,
  voucherCreatePostService,
  voucherUpdateService,
  voucherUpdatePostService,
  voucherDeleteService,
} from "../services/voucher.service";
import axios from "axios";

// Lấy chi tiết voucher theo ID
export const getVoucherDetail = async (setLoading, id) => {
  try {
    const res = await axios.get(`/admin/voucher/detail/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi getVoucherDetail:", err);
    return null;
  } finally {
    setLoading(false);
  }
};

// Cập nhật voucher theo ID (POST)
export const updateVoucherPost = async (setLoading, id, data) => {
  try {
    setLoading(true);
    const sanitizedData = {
      ...data,
      courseIds: Array.isArray(data.courseIds)
        ? data.courseIds.map((id) => String(id))
        : [],
    };
    const res = await axios.post(`/admin/voucher/edit/${id}`, sanitizedData);
    return res.data;
  } catch (err) {
    console.error("Lỗi updateVoucherPost:", err);
    return { code: 500 };
  } finally {
    setLoading(false);
  }
};

// Lấy danh sách voucher
export async function vouchersController(setLoading) {
  try {
    setLoading(true);
    const result = await vouchersService();
    const activeVouchers = result.filter(
      (voucher) => voucher.status === 1 && voucher.VoucherDeleted !== 0
    );
    setLoading(false);
    return activeVouchers;
  } catch (err) {
    console.error("Lỗi vouchersController:", err);
    setLoading(false);
    return [];
  }
}

// Lấy dữ liệu tạo voucher
export async function voucherCreateController(setLoading) {
  try {
    setLoading(true);
    const result = await voucherCreateService();
    setLoading(false);
    return result;
  } catch (err) {
    console.error("Lỗi voucherCreateController:", err);
    setLoading(false);
  }
}

// Gửi POST tạo mới voucher
export async function voucherCreatePostController(data) {
  try {
    const sanitizedData = {
      ...data,
      courseIds: Array.isArray(data.courseIds)
        ? data.courseIds.map((id) => String(id))
        : [],
    };
    console.log("Gửi dữ liệu tạo voucher:", sanitizedData);
    const result = await voucherCreatePostService(sanitizedData);
    console.log("Kết quả tạo:", result);
    return result;
  } catch (err) {
    console.error("Lỗi tạo voucher:", err);
    return { code: 500, error: err.message };
  }
}

// Lấy thông tin voucher để cập nhật
export async function voucherUpdateController(setLoading, id) {
  try {
    setLoading(true);
    const result = await voucherUpdateService(id);
    setLoading(false);
    return result;
  } catch (err) {
    console.error("Lỗi voucherUpdateController:", err);
    setLoading(false);
  }
}

// POST cập nhật voucher
export async function voucherUpdatePostController(id, data) {
  try {
    const sanitizedData = {
      ...data,
      courseIds: Array.isArray(data.courseIds)
        ? data.courseIds.map((id) => String(id))
        : [],
    };
    const result = await voucherUpdatePostService(id, sanitizedData);
    return result;
  } catch (err) {
    console.error("Lỗi khi cập nhật voucher:", err);
  }
}

// Xóa voucher (POST cập nhật trạng thái)
export async function voucherDeleteController(id, data = { status: 0 }) {
  try {
    const result = await voucherDeleteService(id, data);
    return result;
  } catch (err) {
    console.error("Lỗi xóa voucher:", err);
  }
}
