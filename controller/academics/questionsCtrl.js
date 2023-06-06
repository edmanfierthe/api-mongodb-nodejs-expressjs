const Question = require("../../model/Academics/Questions");
const AsyncHandler = require("express-async-handler");

const Exam = require("../../model/Academics/Exam");

//@desc Create Question
//@Route POST /api/v1/questions/:examID
//@access Private Teacher Only
exports.createQuestion = AsyncHandler(async(req, res)=> {
    const {question, optionA, optionB,optionC, optionD, correctAnswer, createdBy} = req.body;

    //find the exam
    const examFound = await Exam.findById(req.params.examID)
    if(!examFound){
        throw new Error("Exam not found");
    }
    // check if the question exists
    const questionExits = await Question.findOne({ question });
    if(questionExits){
        throw new Error("Question already exits");
    }

    // create question for the exam
    const questionCreated = await Question.create({
        question, 
        optionA, 
        optionB, 
        optionC, 
        optionD, 
        correctAnswer,
        createdBy: req.userAuth._id,
    });
    //add the question into the exam
    examFound.questions.push(questionCreated?._id);
    // save
    await examFound.save();
    res.status(200).json({
        status: "success",
        message: "Question Created successfully",
        data: questionCreated,
    })
});

//@desc get all Question
//@Route GET /api/v1/questions
//@access Private Teacher Only
exports.getAllQuestions = AsyncHandler(async (req, res) => {
    const questions = await Question.find();
    res.status(200).json({
        status: "success",
        message: "Questions fetched successfully",
        data: questions,
    });
});

//@desc Single Question
//@Route GET /api/v1/questions/:id
//@access Private - Teacher Only
exports.getSingleQuestion = AsyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Question fetched successfully",
        data: question,
    });
});


//@desc Update Question
//@Route PUT /api/v1/questions/:id
//@access Private Teacher Only
exports.updateQuestion = AsyncHandler(async (req, res) => {
    const { question, optionA, optionB,optionC, optionD, correctAnswer, createdBy} = req.body;
    //check if question exists
    const questionFound = await Question.findOne( {question});
    if(questionFound){
        throw new Error('Question already exists')
    }
    const questionUpdated = await Question.findByIdAndUpdate(req.params.id, {
        question, optionA, optionB,optionC, optionD, correctAnswer, 
        createdBy: req.userAuth._id,
    },
    {
        new: true,
    });
    res.status(200).json({
        status: "success",
        message: "Question updated successfully",
        data: questionUpdated,
    });
});

