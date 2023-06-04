const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academics/AcademicYear");
const Admin = require("../../model/Staff/Admin");


//@desc Create Academic Year
//@Route POST /api/v1/academic-years
//@access Private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
    const {name, fromYear, toYear} = req.body;
    // check if exits 
    const academicYear = await AcademicYear.findOne({ name });
    if (academicYear){
        throw new Error("Academic year already exists");
    }
    // if not, create
    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id,
    });
    // push academic year into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Academic year created successfully",
        data: academicYearCreated,
    });
});


//@desc get all academic years
//@Route GET /api/v1/academic-years
//@access Private
exports.getAcademicYears = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.find();
    res.status(201).json({
        status: "success",
        message: "Academic year created successfully",
        data: academicYears,
    });
});


//@desc get single Academic year
//@Route GET /api/v1/academic-years/:id
//@access Private
exports.getAcademicYear = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Academic Year fetched successfully",
        data: academicYears,
    });
});

//@desc Update Academic year
//@Route PUT /api/v1/academic-years/:id
//@access Private
exports.updatedAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear} = req.body;
    //check if name exists
    const createAcademicYearYearFound = await AcademicYear.findOne( {name});
    if(createAcademicYearYearFound){
        throw new Error('Academic year already exists')
    }
    const academicYears = await AcademicYear.findByIdAndUpdate(req.params.id, {
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id,
    },
    {
        new: true,
    });
    res.status(201).json({
        status: "success",
        message: "Academic Year updated successfully",
        data: academicYears,
    });
});


//@desc delete Academic year
//@Route PUT /api/v1/academic-years/:id
//@access Private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
    //check if name exists
    const createAcademicYearYearFound = await AcademicYear.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Academic Year delete successfully",
    });
});