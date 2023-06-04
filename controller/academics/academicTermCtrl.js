const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const AcademicTerm = require("../../model/Academics/AcademicTerm");



//@desc Create Academic Term
//@Route POST /api/v1/academic-terms
//@access Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
    const {name, description, duration} = req.body;
    // check if exits 
    const academicTerm = await AcademicTerm.findOne({ name });
    if (academicTerm){
        throw new Error("Academic Term already exists");
    }
    // if not, create
    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    });
    // push academic term into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Academic Term created successfully",
        data: academicTermCreated,
    });
});


//@desc get all academic terms
//@Route GET /api/v1/academic-terms
//@access Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find();
    res.status(201).json({
        status: "success",
        message: "Academic Terms fetched successfully",
        data: academicTerms,
    });
});


//@desc get single Academic term
//@Route GET /api/v1/academic-terms/:id
//@access Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Academic Term fetched successfully",
        data: academicTerms,
    });
});

//@desc Update Academic term
//@Route PUT /api/v1/academic-terms/:id
//@access Private
exports.updatedAcademicTerm = AsyncHandler(async (req, res) => {
    const { name, description, duration} = req.body;
    //check if name exists
    const createAcademicTermFound = await AcademicTerm.findOne( {name});
    if(createAcademicTermFound){
        throw new Error('Academic Term already exists')
    }
    const academicTerms = await AcademicTerm.findByIdAndUpdate(req.params.id, {
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    },
    {
        new: true,
    });
    res.status(201).json({
        status: "success",
        message: "Academic Term updated successfully",
        data: academicTerms,
    });
});


//@desc delete Academic Term
//@Route PUT /api/v1/academic-terms/:id
//@access Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
    //check if name exists
    await AcademicTerm.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Academic Term deleted successfully",
    });
});