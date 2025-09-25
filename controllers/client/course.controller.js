const Course = require("../../models/course.model");
const Category = require("../../models/category.model");
const Admin = require("../../models/admin.model");
const Lesson = require("../../models/lesson.model");
const Video = require("../../models/video.model");
const Exercise = require("../../models/exercise.model");
const User = require("../../models/user.model");
const createTreeHelper = require("../../helpers/createTree");
const mongoose = require("mongoose");

// [GET] /courses
module.exports.index = async (req, res) => {
  const courses = await Course.find({
    CourseDeleted: 1,
    CourseStatus: 1,
  })
    .populate({
      path: 'CourseIntructor', // Tên trường tham chiếu
      model: 'Admin',
      select: 'AdminFullName', // Chỉ lấy tên
    })
    .lean();

  res.json(courses);
};

// [GET] /courses/detail/:CourseSlug
module.exports.detail = async (req, res) => {
  try {
    const find = {
      CourseDeleted: 1,
      CourseSlug: req.params.CourseSlug,
      CourseStatus: 1,
    };
    let course = {};
    course = await Course.findOne(find)
      .populate({
        path: "CourseIntructor",
        select: "AdminFullName",
        match: { AdminDeleted: 1 },
      })
      .lean();
    // console.log(course)

    if (course.CourseIntructor && course.CourseIntructor != "") {
      const intructor = await Admin.findOne({
        AdminDeleted: 1,
        _id: course.CourseIntructor,
      });
      course.intructor = intructor;
    }

    const count = await Lesson.countDocuments({
      CourseId: course._id,
      LessonDeleted: 1,
    });
    console.log("count", count)
    if (count > 0) {
      const lesson = await Lesson.find({
        CourseId: course._id,
        LessonDeleted: 1,
      }).lean();
      for (const item of lesson) {
        const video = await Video.find({
          LessonId: item._id,
          VideoDeleted: 1
        }).select("VideoName VideoSlug")
        if (video.length != 0) {
          item.video = video;
        }
      }
      for (const item of lesson) {
        const exer = await Exercise.findOne({
          LessonId: item._id,
          ExerciseDeleted: 1,
        }).select("ExerciseName ExerciseSlug");
        if (exer) {
          item.exercise = exer;
        }
      }
      course.lesson = lesson;
      // console.log(lesson)
    }
    if (course.CourseReview) {
      for (const item of course.CourseReview) {
        const user = await User.findOne({
          _id: item.UserId,
        }).select("UserFullName UserAvatar");
        if (user) {
          item.user = user;
        }
      }
      // console.log(lesson)
    }

    if (res.locals.user) {
      const test = await User.findOne({
        _id: res.locals.user._id,
        "UserCourse.CourseId": course._id,
      });
      if (test) {
        console.log(test);
        course.has = 1;
        const test1 = await User.findOne({
          _id: res.locals.user._id,
          UserCourse: {
            $elemMatch: {
              CourseId: course._id,
              CourseReview: 0,
            },
          },
        });
        console.log(test1);
        if (test1) {
          course.review = 0;
        }
        const test2 = await User.findOne({
          _id: res.locals.user._id,
          UserCourse: {
            $elemMatch: {
              CourseId: course._id,
              CourseStatus: 0,
            },
          },
        });
        if (test2) {
          course.status = 0;
        }
      }
      course.user = res.locals.user;
    }
    res.json(course);
    // res.render('client/pages/courses/detail', {
    //   pageTitle: course.CourseName,
    //   course: course,
    // });
  } catch (error) {
    res.json({
      code: 400,
      message: error.message
    })
  }
};

function convertToValidObjectIdList(courseList, statusFilter = null) {
  return courseList
    .filter((item) => statusFilter === null || item.CourseStatus == statusFilter)
    .map((item) => {
      const rawId = item.CourseId;

      // Nếu đã là ObjectId thật
      if (rawId instanceof mongoose.Types.ObjectId) return rawId;

      // Nếu là object/document hoặc chuỗi chứa "new ObjectId(...)"
      const match = rawId?.toString?.().match(/[a-f\d]{24}/i);
      if (match) return new mongoose.Types.ObjectId(match[0]);

      return null; // không hợp lệ
    })
    .filter((id) => id !== null);
}
// [GET] /courses/completed
module.exports.indexCompleted = async (req, res) => {
  if (res.locals.user) {
    const listSubId = convertToValidObjectIdList(res.locals.user.UserCourse, 1);

    const courses = await Course.find({
      _id: { $in: listSubId },
      CourseStatus: 1,
      CourseDeleted: 1,
    })
      .populate("CourseIntructor", "AdminFullName")
      .lean();

    res.json(courses);
  } else {
    res.json(null);
  }
};

// [GET] /courses/purchased
module.exports.indexPurchased = async (req, res) => {
  if (res.locals.user) {
    const listSubId = convertToValidObjectIdList(res.locals.user.UserCourse);

    const courses = await Course.find({
      _id: { $in: listSubId },
      CourseStatus: 1,
      CourseDeleted: 1,
    })
      .populate("CourseIntructor", "AdminFullName")
      .lean();

    res.json(courses);
  } else {
    res.json(null);
  }
};

// [GET] /courses/studying
module.exports.indexStudying = async (req, res) => {
  if (res.locals.user) {
    const listSubId = convertToValidObjectIdList(res.locals.user.UserCourse, 0);

    const courses = await Course.find({
      _id: { $in: listSubId },
      CourseStatus: 1,
      CourseDeleted: 1,
    })
      .populate("CourseIntructor", "AdminFullName")
      .lean();

    res.json(courses);
  } else {
    res.json(null);
  }
};