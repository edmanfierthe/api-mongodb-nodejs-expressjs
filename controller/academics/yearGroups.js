const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const YearGroup = require("../../model/Academics/YearGroup");

//@desc Create year Group
//@Route POST /api/v1/year-groups
//@access Private
exports.createYearGroup = AsyncHandler(async (req, res) => {
    const {name, academicYear} = req.body;
   
    // check if year group exits 
    const yearGroupFound = await YearGroup.findOne({ name });
    if (yearGroupFound){
        throw new Error("Year Group already exists");
    }
    // if not, create
    const yearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id,
    });
    //find the admin
    const admin = await Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error("Admin not found");
    }
    // push year group into admin
    admin.yearGroups.push(yearGroup._id);
    //save
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Year Group created successfully",
        data: yearGroup,
    });
});


//@desc get all Year groups
//@Route GET /api/v1/year-groups
//@access Private
exports.getYearGroups = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.find();
    res.status(201).json({
        status: "success",
        message: "Year Groups fetched successfully",
        data: yearGroup,
    });
});


//@desc get single Year Group
//@Route GET /api/v1/year-groups/:id
//@access Private
exports.getYearGroup = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Year Group fetched successfully",
        data: yearGroup,
    });
});

//@desc Update Year Group
//@Route PUT /api/v1/year-groups/:id
//@access Private
exports.updateYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear} = req.body;
    //check if name exists
    const yearGroupFound = await YearGroup.findOne( {name});
    if(yearGroupFound){
        throw new Error('Year Group already exists')
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(req.params.id, {
        name,
        academicYear,
        createdBy: req.userAuth._id,
    },
    {
        new: true,
    });
    res.status(201).json({
        status: "success",
        message: "Year Group updated successfully",
        data: yearGroup,
    });
});


//@desc delete Year Group
//@Route PUT /api/v1/year-groups/:id
//@access Private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
    //check if name exists
    await YearGroup.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Year Group deleted successfully",
    });
});