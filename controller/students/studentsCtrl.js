const Student = require("../../model/Academics/Student");
const {hashPassword, isPasswordMatched} = require("../../utils/helpers");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generatToken");
const Exam = require("../../model/Academics/Exam");
const ExamResult = require("../../model/Academics/ExamResults");

//@desc Admin Register Student
//@Route POST /api/v1/student/admin/register
//@access Private
exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
    const { name, email, password} = req.body;

    //check if the teacher exists already
    const student = await Student.findOne({email});
    if (student){
        throw new Error("Student already created");
    }
    //if not, hash password for the teacher
    const hashedPassword = await hashPassword(password);
    //create the teacher
    const studentCreated = await Student.create({
        name, 
        email,
        password: hashedPassword
    });
    //return the teacher data
    res.status(200).json({
        status: "success",
        message: "Student registered successfully",
        data: studentCreated,
    })
});


//@desc login Student
//@Route POST /api/v1/students/login
//@access Public
exports.loginStudent = AsyncHandler(async (req, res) =>{
    const {email, password} = req.body;

    //find the teacher
    const student = await Student.findOne({ email});
    if(!student){
        return res.json({message: "Invalid credentials"});
    }
    //verify the password
    const isMatched = await isPasswordMatched(password, student?.password);
    if (!isMatched){
        return res.json({message: "Invalid credentials"});
    }else{
        res.status(200).json({
            status: "success",
            message: "Student logged in successfully",
            data: generateToken(student?._id)
        })
    }
});


//@desc Student Profile
//@Route GET /api/v1/students/profile
//@access Private Student Only
exports.getStudentProfile = AsyncHandler(async (req, res) =>{
    //find the teacher
    const student = await Student.findById(req.userAuth?._id).select("-password -createdAt -updatedAt");
    if(!student){
        throw new Error("Student not found")
    }
    res.status(200).json({
        status: "success",
        message: "Student Profile fetched successfully",
        data: student,
    });
});


//@desc Get All Students
//@Route GET /api/v1/admin/students
//@access Private Admin Only
exports.getAllStudentsAdmin = AsyncHandler(async (req, res) =>{
    const students = await Student.find();
    res.status(200).json({
        status: "success",
        message: "Students fetched successfully",
        data: students,
    });
});


//@desc Get Single Student
//@Route GET /api/v1/teachers/:teacherID/admin
//@access Private Admin
exports.getSingleStudentByAdmin = AsyncHandler(async (req, res) =>{
    const studentID = req.params.studentID;
    //find the teacher
    const student = await Student.findById(studentID);
    if(!student){
        throw new Error("Student not found")
    }
    res.status(200).json({
        status: "success",
        message: "Student fetched successfully",
        data: student,
    });
});


//@desc Student Update Profile
//@Route GET /api/v1/students/update
//@access Private Student Only
exports.studentUpdateProfile = AsyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //if the email is taken
    const emailExist = await Student.findOne({ email});
    if(emailExist){
        throw new Error("This email already exists");
    }
    
    // check if user updating password
    if (password){
        //update
        const student = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
            password: await hashPassword(password), // // Hash the password before saving the use
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: student,
            message: "Student Profile updated successfully",
        })
    }else {
        //update without updating the password
        const student = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: student,
            message: "Student Profile updated successfully",
        })
    }

});

//@desc Admin Update Student ex: program etc ...
//@Route GET /api/v1/students/:teacherID/update/admin
//@access Private Admin Only
exports.adminUpdateStudent = AsyncHandler(async (req, res)=>{
    const {classLevels, academicYear, program, name, email, prefectName} = req.body;
    
    //find the student by id
    const studentFound = await Student.findById(req.params.studentID).populate('classLevels');
    if(!studentFound){
        throw new Error("Student not found");
    }

    //update
    const studentUpdated = await Student.findByIdAndUpdate(req.params.studentID, {
        $set: {
            name,
            email,
            academicYear,
            program,
            prefectName
        },
        $addToSet: {
            classLevels,
        }
    },
    {
        new: true,
    });
    //send response
    res.status(200).json({
        status: "success",
        data: studentUpdated,
        message: "Student Profile updated successfully",
      });
});


//@desc Student Taking Exam
//@Route GET /api/v1/students/exams/:examID/write
//@access Private Students Only
exports.writeExam = AsyncHandler(async (req, res)=>{
    
    //get student
    const studentFound = await Student.findById(req.userAuth?._id);
    if(!studentFound){
        throw new Error("Student not found");
    }
    // get exam
    const examFound = await Exam.findById(req.params.examID).populate("questions").populate("academicTerm");
    if(!examFound){
        throw new Error("Exam not found");
    }
    // get the questions to be answered
    const questions = examFound?.questions;

    //get student'answers to question
    const studentAnswers = req.body.answers;
   
    //check if student answered all questions
    if(studentAnswers.length !== questions.length){
        throw new Error("Please answer all the questions");
    }

    // //Check if student has already taken the exam
    // const studentFoundInResults = await ExamResult.findOne({student: studentFound?._id});
    // if(studentFoundInResults){
    //     throw new Error("You can't take this exam twice")
    // }

    //Build report object
    let correctAnswer = 0;
    let wrongAnswers = 0;
    let totalQuestions = 0;
    let grade = 0;
    let score = 0;
    let answeredQuestion = [];
    let status = '' //failed or passed
    let remarks = '';


    // check for answers
    for (let i=0; i<questions.length; i++){
        // find the question
        const question = questions[i]
        // check if the answer is correct
        if(question.correctAnswer === studentAnswers[i]){
            correctAnswer++;
            score++;
            question.isCorrect = true;
        }else{
            wrongAnswers++;
        }
    };

    // calculate exam result
    totalQuestions = questions.length;
    grade = (correctAnswer / questions.length) * 100;
    answeredQuestion = questions.map(question =>{
        return{
        question: question.question,
        correctAnswer: question.correctAnswer,
        isCorrect: question.isCorrect,
        }
    });

     //give exam result
     if(grade>=50){
        status = "passed";
    } else {
        status = "failed";
    } 

    //Remarks
    if(grade >= 80){
        remarks = "Excellent"
    }else if(grade >=70){
        remarks = "Very Good"
    }else if(grade >=60){
        remarks = "Good"
    }else if(grade >=50){
        remarks = "Fair"
    }else {
        remarks = "Poor"
    }

    //Generate Exam Results
    // const examResults = await ExamResult.create({
    //     student: studentFound?._id,
    //     exam: examFound?._id,
    //     grade,
    //     score,
    //     status,
    //     remarks, 
    //     classLevels: examFound?.classLevel,
    //     academicTerm: examFound?.academicTerm,
    //     academicYear: examFound?.academicYear,
    // });

    // //push the results into student
    // studentFound.examResults.push(examResults?._id);
    // // save
    // await studentFound.save();

    //Promoting Student
    if(examFound.academicTerm.name === "3rd term" && status ==='passed' && studentFound?.currentClassLevel ==="Level 100"){
        //promote student to level 200
        studentFound.classLevels.push("Level 200");
        studentFound.currentClassLevel = "Level 200";
        await studentFound.save();
    }

    res.status(200).json({
        status: 'success',
        correctAnswer, wrongAnswers, score, grade, status, answeredQuestion, remarks, 
        //examResults
    })
});