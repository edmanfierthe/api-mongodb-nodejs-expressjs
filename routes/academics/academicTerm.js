const express = require("express");
const { createAcademicTerm, getAcademicTerm, getAcademicTerms, updatedAcademicTerm, deleteAcademicTerm} = require("../../controller/academics/academicTermCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const academicTermRouter = express.Router();


// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get('/', isLogin, isAdmin, getAcademicYears);

academicTermRouter.route('/')
                  .post(isLogin, isAdmin, createAcademicTerm)
                  .get(isLogin, isAdmin, getAcademicTerms);

academicTermRouter.route('/:id')
                  .get(isLogin, isAdmin, getAcademicTerm)
                  .put( isLogin, isAdmin, updatedAcademicTerm)
                  .delete( isLogin, isAdmin, deleteAcademicTerm)

// academicYearRouter.get('/:id', isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put('/:id', isLogin, isAdmin, updatedAcademicYear);
// academicYearRouter.delete('/:id', isLogin, isAdmin, deleteAcademicYear);

module.exports = academicTermRouter;


module.exports = academicTermRouter;