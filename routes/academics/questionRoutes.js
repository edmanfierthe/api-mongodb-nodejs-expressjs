const express = require("express");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const { createQuestion, getAllQuestions, getSingleQuestion, updateQuestion } = require("../../controller/academics/questionsCtrl");
const { get } = require("mongoose");


const questionRouter = express.Router();

questionRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion);
questionRouter.get("/", isTeacherLogin, isTeacher, getAllQuestions);
questionRouter.get("/:id", isTeacherLogin, isTeacher, getSingleQuestion);
questionRouter.put("/:id", isTeacherLogin, isTeacher, updateQuestion);

module.exports = questionRouter;