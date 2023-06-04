const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Subject = require ("../../model/Academics/Subject");
const Program = require("../../model/Academics/Program");

//@desc Create Subject
//@Route POST /api/v1/subject/:programID
//@access Private
exports.createSubject = AsyncHandler(async (req, res) => {
    const {name, description, academicTerm} = req.body;
    // first find the program
    const programFound = await Program.findById(req.params.programID);
    if(!programFound){
        throw new Error("Program Not Found");
    }
    // check if subject exits 
    const subjectFound = await Subject.findOne({ name });
    if (subjectFound){
        throw new Error("Subject already exists");
    }
    // if not, create
    const subjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
    });
    // push program into admin
    programFound.subjects.push(subjectCreated._id);

    //save
    await programFound.save();

    res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: subjectCreated,
    });
});


//@desc get all Subjects
//@Route GET /api/v1/subjects
//@access Private
exports.getSubjects = AsyncHandler(async (req, res) => {
    const subjects = await Subject.find();
    res.status(201).json({
        status: "success",
        message: "Subjects fetched successfully",
        data: subjects,
    });
});


//@desc get single Subject
//@Route GET /api/v1/subjects/:id
//@access Private
exports.getSubject = AsyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Subject fetched successfully",
        data: subject,
    });
});

//@desc Update Subject
//@Route PUT /api/v1/subjects/:id
//@access Private
exports.updateSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm} = req.body;
    //check if name exists
    const subjectFound = await Subject.findOne( {name});
    if(subjectFound){
        throw new Error('Subject already exists')
    }
    const subject = await Subject.findByIdAndUpdate(req.params.id, {
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
    },
    {
        new: true,
    });
    res.status(201).json({
        status: "success",
        message: "Subject updated successfully",
        data: subject,
    });
});


//@desc delete Subject
//@Route PUT /api/v1/subjects/:id
//@access Private
exports.deleteSubject = AsyncHandler(async (req, res) => {
    //check if name exists
    await Subject.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Subject deleted successfully",
    });
});