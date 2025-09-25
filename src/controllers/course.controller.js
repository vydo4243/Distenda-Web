import { coursesService, courseDetailService, courseUpdatePostService, courseCreateService, courseCreatePostService, courseDeleteService } from '../services/course.service';

export async function courseGetAllController() {
  try {
    const result = await coursesService(); // Gọi API lấy danh sách khoá học
    console.log("✅ courseGetAllController result:", result);
    return result;
  } catch (err) {
    console.error("❌ courseGetAllController error:", err);
    return null;
  }
}

export async function coursesController(setLoading) {
  try {
    setLoading(true); // Đang tải
    const result = await coursesService(); // Gọi API
    console.log("result courses ", result);
    setLoading(false); // Tải xong
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
    setLoading(false); // Tắt trạng thái tải ngay cả khi lỗi
  }
}

export async function courseDetailController(setLoading, CourseID) {
  try {
    setLoading(true); // Đang tải
    const result = await courseDetailService(CourseID); // Gọi API
    console.log("result courses ", result);
    setLoading(false); // Tải xong
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
    setLoading(false); // Tắt trạng thái tải ngay cả khi lỗi
  }
}

export async function courseUpdatePostController(CourseID, data) {
  try {
    const result = await courseUpdatePostService(CourseID, data); // Gọi API
    console.log("result courses ", result);
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
  }
}

export async function courseCreateController() {
  try {
    // setLoading(true); // Đang tải
    const result = await courseCreateService(); // Gọi API
    console.log("result courses ", result);
    // setLoading(false); // Tải xong
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
    // setLoading(false); // Tắt trạng thái tải ngay cả khi lỗi
  }
}

export async function courseCreatePostController(data) {
  try {
    const result = await courseCreatePostService(data); // Gọi API
    console.log("result courses ", result);
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
  }
}

export async function courseDeleteController(setLoading, data) {
  try {
    setLoading(true); // Đang tải
    const result = await courseDeleteService(data); // Gọi API
    console.log("result courses ", result);
    setLoading(false); // Tải xong
    return result;
  } catch (err) {
    console.error(err); // Ghi log lỗi
    setLoading(false); // Tắt trạng thái tải ngay cả khi lỗi
  }
}