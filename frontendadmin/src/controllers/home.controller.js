import { dashboardService, headerService, roleService } from '../services/home.service';

// [GET] /
export async function dashboardController() {
  try {
    const result = await dashboardService(); // Gọi API
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
  }
}

// [GET] /admin/header
export async function headerController() {
  try {
    const result = await headerService(); // Gọi service để xử lý API
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
    return null; // Trả về null hoặc giá trị mặc định khi lỗi
  }
};

// [GET] /admin/role
export async function roleController(setLoading) {
  try {
    setLoading(true);
    const result = await roleService(); // Gọi service để xử lý API
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
    return null; // Trả về null hoặc giá trị mặc định khi lỗi
  } finally {
    setLoading(false); // Tắt trạng thái tải
  }
};