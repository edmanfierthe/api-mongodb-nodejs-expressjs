const Admin = require("../../model/Staff/Admin");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generatToken");
const verifyToken = require("../../utils/verifyToken");
const bcrypt = require('bcryptjs');
const { hashPassword, isPasswordMatched } = require("../../utils/helpers");

//@desc register admin
//@Route POST /api/v1/admins/register
//@access Private
exports.registerAdmCtrl = AsyncHandler(async (req, res) => {

    const {name, email, password} = req.body;
    // Check if the email exists
    const adminFound = await Admin.findOne({ email });
    if(adminFound){
        throw new Error("Admin Already Exists")
    }
    
    //Register
    const user = await Admin.create({
        name, 
        email, 
        password : await hashPassword(password),
    });
    res.status(201).json({
        status: "success",
        data: user,
        message: "Admin registered successfully"
    });
});


//@desc login admin
//@Route POST /api/v1/admins/login
//@access Private
exports.loginAdminCtrl = AsyncHandler( async (req, res) => {
    const {email, password} = req.body
    //find the user
    const user = await Admin.findOne({email});
    if(!user){
        return res.json({message: "Invalid Login Credentials"});
    }
    //verify password
    const isMatched = await isPasswordMatched(password, user.password);

    if(!isMatched){
        return res.json({message: "Invalid Login Credentials"});
    }else {
        return res.json({ 
            data: generateToken(user._id),
            message: "Admin logged in successfully"});
    }
});


//@desc get single admin
//@Route GET /api/v1/admins/profile
//@access Private
exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.userAuth._id).select('-password -createdAt -updateAt')
    if(!admin){
        throw new Error("Admin not found");
    }else{
        res.status(200).json({
            status: 'success',
            data: admin,
            message: "Admin Profile fetched successfully"
        })
    }
});


//@desc update admin
//@Route UPDATE /api/v1/admins/:id
//@access Private
exports.updateAdminCtrl = AsyncHandler(async(req, res) => {
    const {email, name, password} = req.body;
    //if the email is taken
    const emailExist = await Admin.findOne({ email});
    if(emailExist){
        throw new Error("This email already exists");
    }
    
    // check if user updating password
    if (password){
        //update
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            password: await hashPassword(password), // // Hash the password before saving the use
            name,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: admin,
            message: "Admin updated successfully",
        })
    }else {
        //update without updating the password
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
        }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: admin,
            message: "Admin updated successfully",
        })
    }

})

//@desc get all admins
//@Route GET /api/v1/admins
//@access Private
exports.getAllAdminsCtrl = AsyncHandler( async (req, res) => {
    const admins = await Admin.find();
    res.status(200).json({
        status: "success",
        message: "Admin fetched successfully",
        data: admins,
    })
})

//@desc get all admins
//@Route DELETE /api/v1/admins/:id
//@access Private
exports.deleteAdminCtrl = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Delete Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc admin suspend teacher
//@Route PUT /api/v1/admins/suspend/teacher/:id
//@access Private
exports.adminSuspendTeacher = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Admin suspends a teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc admin unsuspend teacher
//@Route PUT /api/v1/admins/unsuspend/teacher/:id
//@access Private
exports.adminUnsuspendTeacher = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Admin unsuspend a teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc admin withdraw teacher
//@Route PUT /api/v1/admins/withdraw/teacher/:id
//@access Private
exports.adminWithdrawTeacher = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Admin withdraw a teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc admin unwithdraw teacher
//@Route PUT /api/v1/admins/unwithdraw/teacher/:id
//@access Private
exports.adminUnwithdrawTeacher = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Admin unwithdraw a teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc admin publish exam result
//@Route PUT /api/v1/admins/publish/exam/:id
//@access Private
exports.adminPublishExam = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Admin publish exam",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc admin unpublish exam result
//@Route PUT /api/v1/admins/unpublish/exam/:id
//@access Private
exports.adminUnpublishExam = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Admin unpublish exam",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};