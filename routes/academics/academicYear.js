const express = require("express");
const { createAcademicYear, getAcademicYears, getAcademicYear, updatedAcademicYear, deleteAcademicYear} = require("../../controller/academics/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const academicYearRouter = express.Router();


// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get('/', isLogin, isAdmin, getAcademicYears);

academicYearRouter.route('/')
                  .post(isLogin, isAdmin, createAcademicYear)
                  .get(isLogin, isAdmin, getAcademicYears);

academicYearRouter.route('/:id')
                  .get(isLogin, isAdmin, getAcademicYear)
                  .put( isLogin, isAdmin, updatedAcademicYear)
                  .delete( isLogin, isAdmin, deleteAcademicYear)

// academicYearRouter.get('/:id', isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put('/:id', isLogin, isAdmin, updatedAcademicYear);
// academicYearRouter.delete('/:id', isLogin, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;


module.exports = academicYearRouter;