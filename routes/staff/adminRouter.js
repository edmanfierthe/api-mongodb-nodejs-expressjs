const express = require("express");
const {registerAdmCtrl,
        loginAdminCtrl, 
        getAdminProfileCtrl, 
        getAllAdminsCtrl, 
        deleteAdminCtrl, 
        adminSuspendTeacher, 
        adminUnsuspendTeacher, 
        adminWithdrawTeacher, 
        adminUnwithdrawTeacher,
        updateAdminCtrl,
        adminPublishExam,
        adminUnpublishExam} = require("../../controller/staff/adminCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const adminRouter = express.Router();
//register
adminRouter.post("/register", registerAdmCtrl);

//login
adminRouter.post("/login", loginAdminCtrl);

//get all admin
adminRouter.get("/", isLogin, getAllAdminsCtrl);

//get single admin
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);

//admin update
adminRouter.put("/", isLogin, isAdmin, updateAdminCtrl);

//delete admin
adminRouter.delete("/:id", deleteAdminCtrl);

//admin suspends teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacher);

//admin unsuspend teacher
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendTeacher);

//admin withdraw teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacher);

//admin unwithdraw teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacher);

//admin publish exam result
adminRouter.put("/publish/exam/:id", adminPublishExam);

//admin unpublish exam result
adminRouter.put("/unpublish/exam/:id", adminUnpublishExam);



module.exports = adminRouter;