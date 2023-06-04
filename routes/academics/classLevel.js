const express = require("express");
const {createClassLevel, getClassLevel, getClassLevels, updatedClassLevel, deleteClassLevel}  = require("../../controller/academics/classLevel");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const classLevelRouter = express.Router();


// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get('/', isLogin, isAdmin, getAcademicYears);

classLevelRouter.route('/')
                  .post(isLogin, isAdmin, createClassLevel)
                  .get(isLogin, isAdmin, getClassLevels);

classLevelRouter.route('/:id')
                  .get(isLogin, isAdmin, getClassLevel)
                  .put( isLogin, isAdmin, updatedClassLevel)
                  .delete( isLogin, isAdmin, deleteClassLevel);

// academicYearRouter.get('/:id', isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put('/:id', isLogin, isAdmin, updatedAcademicYear);
// academicYearRouter.delete('/:id', isLogin, isAdmin, deleteAcademicYear);

module.exports = classLevelRouter;