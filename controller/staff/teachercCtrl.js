const AsyncHandler = require("express-async-handler");
const { hashPassword, isPasswordMatched } = require("../../utils/helpers");
const Teacher = require("../../model/Staff/Teacher");
const generateToken = require("../../utils/generatToken");


//@desc Admin Register Teacher
//@Route POST /api/v1/teachers/admin/register
//@access Private
exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
    const { name, email, password} = req.body;

    //check if the teacher exists already
    const teacher = await Teacher.findOne({email});
    if (teacher){
        throw new Error("Teacher already created");
    }
    //if not, hash password for the teacher
    const hashedPassword = await hashPassword(password);
    //create the teacher
    const teacherCreated = await Teacher.create({
        name, 
        email,
        password: hashedPassword
    });
    //return the teacher data
    res.status(200).json({
        status: "success",
        message: "Teacher registered successfully",
        data: teacherCreated,
    })
});

//@desc login a teacher
//@Route POST /api/v1/teachers/login
//@access Private
exports.loginTeacher = AsyncHandler(async (req, res) =>{
    const {email, password} = req.body;

    //find the teacher
    const teacher = await Teacher.findOne({ email});
    if(!teacher){
        return res.json({message: "Invalid credentials"});
    }
    //verify the password
    const isMatched = await isPasswordMatched(password, teacher?.password);
    if (!isMatched){
        return res.json({message: "Invalid credentials"});
    }else{
        res.status(200).json({
            status: "success",
            message: "Teacher logged in successfully",
            data: generateToken(teacher?._id)
        })
    }
});

//@desc Get All Teacher
//@Route GET /api/v1/admin/teachers
//@access Private
exports.getAllTeachersAdmin = AsyncHandler(async (req, res) =>{
    const teachers = await Teacher.find();
    res.status(200).json({
        status: "success",
        message: "Teachers fetched successfully",
        data: teachers,
    });
});

//@desc Get Single Teacher
//@Route GET /api/v1/teachers/:teacherID/admin
//@access Private
exports.getTeacherByAdmin = AsyncHandler(async (req, res) =>{
    const teacherID = req.params.teacherID;
    //find the teacher
    const teacher = await Teacher.findById(teacherID);
    if(!teacher){
        throw new Error("Teacher not found")
    }
    res.status(200).json({
        status: "success",
        message: "Teacher fetched successfully",
        data: teacher,
    });
});


//@desc Teacher Profile
//@Route GET /api/v1/teachers/profile
//@access Private
exports.getTeacherProfile = AsyncHandler(async (req, res) =>{
    //find the teacher
    const teacher = await Teacher.findById(req.userAuth?._id).select("-password -createdAt -updatedAt");
    if(!teacher){
        throw new Error("Teacher not found")
    }
    res.status(200).json({
        status: "success",
        message: "Teacher Profile fetched successfully",
        data: teacher,
    });
});


//@desc Teacher Update Profile
//@Route GET /api/v1/teachers/:teacherID/update
//@access Private Teacher Only
exports.teacherUpdateProfile = AsyncHandler(async(req, res) => {
    const {email, name, password} = req.body;
    //if the email is taken
    const emailExist = await Teacher.findOne({ email});
    if(emailExist){
        throw new Error("This email already exists");
    }
    
    // check if user updating password
    if (password){
        //update
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
            email,
            password: await hashPassword(password), // // Hash the password before saving the use
            name,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: teacher,
            message: "Teacher Profile updated successfully",
        })
    }else {
        //update without updating the password
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: teacher,
            message: "Teacher Profile updated successfully",
        })
    }

});


//@desc Admin Update Teacher Profile
//@Route GET /api/v1/teachers/:teacherID/admin
//@access Private Admin only
exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
    const { program, classLevel, academicYear, subject } = req.body;
    const { teacherID } = req.params;
  
    const teacherFound = await Teacher.findById(teacherID);
    if (!teacherFound) {
      throw new Error("Teacher not found");
    }
  
    if (teacherFound.isWithdrawn) {
      throw new Error("Action Denied, Teacher is withdrawn");
    }
  
    // Update the fields if provided
    if (program) {
      teacherFound.program = program;
    }
    if (classLevel) {
      teacherFound.classLevel = classLevel;
    }
    if (academicYear) {
      teacherFound.academicYear = academicYear;
    }
    if (subject) {
      teacherFound.subject = subject;
    }
  
    await teacherFound.save();
  
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher Profile updated successfully",
    });
  });

//   exports.adminUpdateTeacher = AsyncHandler(async(req, res) => {
//     const {program, classLevel, academicYear, subject} = req.body;

//     //check if the teacher exists
//     const teacherFound = await Teacher.findById(req.params.teacherID);
//     if(!teacherFound){
//         throw new Error("Teacher not found");
//     }
//     //Check if the teacher is withdrawn
//     if (teacherFound.isWitdrawn){
//         throw new Error("Action Denied, Teacher is withdrawn")
//     }
    
//     //assign a program
//     if(program){
//         teacherFound.program = program;
//         await teacherFound.save();
//         res.status(200).json({
//             status: "success",
//             data: teacherFound,
//             message: "Teacher Profile updated successfully",
//         })
//     }
//     //assign a Class Level
//     if(classLevel){
//         teacherFound.classLevel = classLevel;
//         await teacherFound.save();
//         res.status(200).json({
//             status: "success",
//             data: teacherFound,
//             message: "Teacher Profile updated successfully",
//         })
//     }
//     //assign aacademic Year
//     if(academicYear){
//         teacherFound.academicYear = academicYear;
//         await teacherFound.save();
//         res.status(200).json({
//             status: "success",
//             data: teacherFound,
//             message: "Teacher Profile updated successfully",
//         })
//     }
//      //assign subject
//      if(subject){
//         teacherFound.subject = subject;
//         await teacherFound.save();
//         res.status(200).json({
//             status: "success",
//             data: teacherFound,
//             message: "Teacher Profile updated successfully",
//         })
//     }
// });