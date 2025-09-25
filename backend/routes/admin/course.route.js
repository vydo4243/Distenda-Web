const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const controller = require("../../controllers/admin/course.controller");
const validate = require("../../validates/admin/course.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const historyController = require("../../controllers/admin/history.controller");

router.get("/", controller.index);

router.post("/change-status/:status/:CourseID", controller.changeStatus);

router.delete("/delete/:CourseID", controller.deleteItem);

router.get("/create", controller.createItem);

router.post("/create", controller.createPost);

router.get("/detail/:CourseID", controller.detailItem);

router.get("/edit/:CourseID", controller.editItem);

router.post("/edit/:CourseID", controller.editPost);

router.get("/history", historyController.getCourseHistory);

router.get("/detail/:CourseID/history", historyController.getLessonHistoryByCourseID);

module.exports = router;
