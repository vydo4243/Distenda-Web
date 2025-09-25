const Course = require("../../models/course.model");
const Lesson = require("../../models/lesson.model");
const Video = require("../../models/video.model");
const Exercise = require("../../models/exercise.model");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

// [DELETE] /admin/lesson/delete/:LessonID
module.exports.deleteItem = async (req, res) => {
  const lessonID = req.params.LessonID;

  await Lesson.updateOne(
    { _id: lessonID },
    {
      LessonDeleted: 0,
      deletedBy: {
        UserId: res.locals.user.id,
        deletedAt: new Date(),
      },
    }
  );
  res.json({
    code: 200,
    message: "Xóa thành công!"
  })
};


// [POST] /admin/lesson/create/:CourseID
module.exports.createPost = async (req, res) => {
  req.body.createdBy = {
    UserId: res.locals.user.id,
  };
  req.body.CourseId = req.params.CourseID;
  const count = await Lesson.countDocuments({
    CourseId: req.params.CourseID,
  });
  req.body.LessonPosition = count + 1;

  const lesson = new Lesson(req.body);
  console.log(lesson)
  await lesson.save();

  res.json({
    code: 200,
    message: "Thêm thành công!"
  })
};

// [POST] /admin/lesson/edit/:LessonID
module.exports.editPost = async (req, res) => {
  try {
    const editedBy = {
      UserId: res.locals.user.id,
      editedAt: new Date(),
    };
    await Lesson.updateOne(
      { _id: req.params.LessonID },
      {
        ...req.body,
        $push: { editedBy: editedBy },
      }
    );

    res.json({
      code: 200,
      message: "Cập nhật thành công!"
    })
  } catch (error) {
    console.log(error)
    res.json({
      code: 400,
      message: "Cập nhật thất bại!"
    })
  }
};

// [GET] /admin/lesson/detail/:LessonID
module.exports.detailItem = async (req, res) => {
  try {
    const find = {
      LessonDeleted: 1,
      _id: req.params.LessonID,
    };

    const lesson = await Lesson.findOne(find).lean();

    const course = await Course.findOne({
      _id: lesson.CourseId,
      CourseDeleted: 1,
    });
    lesson.course = course;

    const countVideo = await Video.countDocuments({
      LessonId: req.params.LessonID,
    });
    if (countVideo > 0) {
      const video = await Video.find({
        LessonId: req.params.LessonID,
        VideoDeleted: 1,
      });
      lesson.video = video;
    }

    const countExer = await Exercise.countDocuments({
      LessonId: req.params.LessonID,
    });
    if (countExer > 0) {
      const exer = await Exercise.findOne({
        LessonId: req.params.LessonID,
        ExerciseDeleted: 1,
      });
      lesson.exer = exer;
    }

    res.json(lesson)
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
    console.log(error)
  }
};
