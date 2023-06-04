const express = require("express");
const {createProgram, getProgram, getPrograms, updateProgram, deleteProgram}  = require("../../controller/academics/programs");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const programRouter = express.Router();


// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get('/', isLogin, isAdmin, getAcademicYears);

programRouter.route('/')
                  .post(isLogin, isAdmin, createProgram)
                  .get(isLogin, isAdmin, getPrograms);

programRouter.route('/:id')
                  .get(isLogin, isAdmin, getProgram)
                  .put( isLogin, isAdmin, updateProgram)
                  .delete( isLogin, isAdmin, deleteProgram);

// academicYearRouter.get('/:id', isLogin, isAdmin, getAcademicYear);
// academicYearRouter.put('/:id', isLogin, isAdmin, updatedAcademicYear);
// academicYearRouter.delete('/:id', isLogin, isAdmin, deleteAcademicYear);

module.exports = programRouter;