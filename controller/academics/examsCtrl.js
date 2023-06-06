const Teacher = require("../../model/Staff/Teacher");
const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academics/Exam");


//@desc Create Exam
//@Route POST /api/v1/exams
//@access Private Teachers only
exports.createExam = AsyncHandler(async(req, res)=>{
    const {name, description, classLevel, subject, program, academicTerm, examDate, examTime, examType, createdBy, academicYear}= req.body;
    //find th teacher
    const teacherFound = await Teacher.findById(req.userAuth?._id);
    if(!teacherFound){
        throw new Error("Teacher not found");
    }
    //check if the exam exists
    const examExists = await Exam.findOne( {name});
    if (examExists){
        throw new Error("Exam already exists");
    }
    // create exam
    const examCreated = new Exam({
        name, description, subject, program, classLevel, academicTerm, examDate, examTime, examType, createdBy, academicYear,
        createdBy: req.userAuth?._id,
    });
    //push th exam into the teacher
    teacherFound.examsCreated.push(examCreated);
    //save the exam
    await examCreated.save();
    await teacherFound.save();
    res.status(200).json({
        status: "success",
        message: "Exam Created",
        data: examCreated,
    });
})

//@desc get all exams
//@Route GET /api/v1/exams
//@access Private
exports.getExams = AsyncHandler(async (req, res) => {
    const exams = await Exam.find().populate({
        path: "questions",
        populate:{
            path: "createdBy",
        }
    });
    res.status(201).json({
        status: "success",
        message: "Exams fetched successfully",
        data: exams,
    });
});


//@desc get Exam
//@Route GET /api/v1/exams/:id
//@access Private
exports.getExam = AsyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Exam fetched successfully",
        data: exam,
    });
});


//@desc Update Exam
//@Route PUT /api/v1/exams/:id
//@access Private Teacher Only
exports.updateExam = AsyncHandler(async (req, res) => {
    const { name, description, classLevel, subject, program, academicTerm, examDate, examTime, examType, createdBy, academicYear} = req.body;
    //check if name exists
    const examFound = await Exam.findOne( {name});
    if(examFound){
        throw new Error('Exam already exists')
    }
    const examUpdated = await Exam.findByIdAndUpdate(req.params.id, {
        name, description, classLevel, subject, program, academicTerm, examDate, examTime, examType, academicYear,
        createdBy: req.userAuth._id,
    },
    {
        new: true,
    });
    res.status(200).json({
        status: "success",
        message: "Exam updated successfully",
        data: examUpdated,
    });
});