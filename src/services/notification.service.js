// [GET] Lấy danh sách thông báo của một user
export const getNotificationsByUser = async (userToken) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/notification/user/${userToken}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Lỗi khi lấy thông báo!');

    const data = await response.json();
    return data?.success && Array.isArray(data.data) ? data.data : []; // đảm bảo trả về mảng
  } catch (error) {
    console.error("Lỗi khi gọi API getNotificationsByUser:", error);
    return []; // fallback nếu lỗi
  }
};


// [POST] Tạo một thông báo mới
export const addNotification = async ({ message, type = "success", userToken }) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/notification/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ message, type, userToken }),
    });
    console.log("do")

    if (!response.ok) {
      throw new Error('Lỗi khi tạo thông báo!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API addNotification:", error);
    throw new Error(error.message);
  }
};

// [DELETE] Xoá một thông báo theo ID
export const deleteNotification = async (notificationId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/notification/${notificationId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Lỗi khi xoá thông báo!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API deleteNotification:", error);
    throw new Error(error.message);
  }
};
// [POST] Kiểm tra khóa học sắp hết hạn
export const checkCourseExpiryService = async (userToken) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/notification/check-expiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userToken }),
    });

    if (!response.ok) {
      throw new Error('Lỗi khi kiểm tra khóa học!');
    }

    const data = await response.json();
    return data?.success ? data.data : [];
  } catch (error) {
    console.error("Lỗi khi gọi API checkCourseExpiry:", error);
    throw new Error(error.message);
  }
};
