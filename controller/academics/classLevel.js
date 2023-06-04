const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academics/ClassLevel");


//@desc Create Class Level
//@Route POST /api/v1/class-levels
//@access Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
    const {name, description} = req.body;
    // check if exits 
    const classFound = await ClassLevel.findOne({ name });
    if (classFound){
        throw new Error("Class Level already exists");
    }
    // if not, create
    const classCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    // push class into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevels.push(classCreated._id);
    //save
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Class Level created successfully",
        data: classCreated,
    });
});


//@desc get all class level
//@Route GET /api/v1/class-levels
//@access Private
exports.getClassLevels = AsyncHandler(async (req, res) => {
    const classes = await ClassLevel.find();
    res.status(201).json({
        status: "success",
        message: "Class Levels fetched successfully",
        data: classes,
    });
});


//@desc get single Class Level
//@Route GET /api/v1/class-levels/:id
//@access Private
exports.getClassLevel = AsyncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Class Level fetched successfully",
        data: classLevel,
    });
});

//@desc Update Class Level
//@Route PUT /api/v1/class-levels/:id
//@access Private
exports.updatedClassLevel = AsyncHandler(async (req, res) => {
    const { name, description} = req.body;
    //check if name exists
    const classLevelFound = await ClassLevel.findOne( {name});
    if(classLevelFound){
        throw new Error('Class Level already exists')
    }
    const classLevels = await ClassLevel.findByIdAndUpdate(req.params.id, {
        name,
        description,
        createdBy: req.userAuth._id,
    },
    {
        new: true,
    });
    res.status(201).json({
        status: "success",
        message: "Academic Level updated successfully",
        data: classLevels,
    });
});


//@desc delete Class Level
//@Route PUT /api/v1/class-levels/:id
//@access Private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
    //check if name exists
    await ClassLevel.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Class Level deleted successfully",
    });
});