const Admin = require("../../model/Staff/Admin");
//@desc register admin
//@Route POST /api/v1/admins/register
//@access Private
exports.registerAdmCtrl = async (req, res) => {

    const {name, email, password} = req.body;
    try {
        // Check if the email exists
        const adminFound = await Admin.findOne({ email });
        if(adminFound){
            res.json("Admin Already Exists")
        }

        //Register
        const user = await Admin.create({
            name, email, password
        });
        res.status(201).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};


//@desc login admin
//@Route POST /api/v1/admins/login
//@access Private
exports.loginAdminCtrl = async (req, res) => {
    const {email, password} = req.body
    try {

        //find the user
        const user = await Admin.findOne({email});
        if(!user){
            return res.json({message: "Invalid Login Credentials"});
        }
        if (user && await user.verifyPassword(password)){
            return res.json({ data: user});
        }else{
            return res.json({ message: "Invalid Login Credentials"});
        }
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};


//@desc get single admin
//@Route GET /api/v1/admins/:id
//@access Private
exports.getAdminsCtrl = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "Single Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};


//@desc update admin
//@Route UPDATE /api/v1/admins/:id
//@access Private
exports.updateAdminCtrl =(req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "update admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

//@desc get all admins
//@Route GET /api/v1/admins
//@access Private
exports.getAllAdminsCtrl = (req, res) =>{
    try {
        res.status(201).json({
            status: "success",
            data: "All Admin",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
    }
};

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