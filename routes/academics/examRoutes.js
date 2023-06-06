const express = require("express");
const { createExam, getExams, getExam, updateExam } = require("../../controller/academics/examsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = express.Router();

//examRouter.route("/", istea)

examRouter.post("/", isTeacherLogin, isTeacher, createExam);
examRouter.get("/",isTeacherLogin, isTeacher, getExams);
examRouter.get("/:id",isTeacherLogin, isTeacher, getExam);
examRouter.put("/:id",isTeacherLogin, isTeacher, updateExam);

module.exports = examRouter;