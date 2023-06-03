const express = require("express");
const app = require("../../app/app");
const {registerAdmCtrl,
        loginAdminCtrl,
        getAdminsCtrl, 
        getAllAdminsCtrl, 
        deleteAdminCtrl, 
        adminSuspendTeacher, 
        adminUnsuspendTeacher, 
        adminWithdrawTeacher, 
        adminUnwithdrawTeacher,
        updateAdminCtrl,
        adminPublishExam,
        adminUnpublishExam} = require("../../controller/staff/adminCtrl");
const adminRouter = express.Router();

//register
adminRouter.post("/register", registerAdmCtrl);

//login
adminRouter.post("/login", loginAdminCtrl);

//get all admin
adminRouter.get("/", getAllAdminsCtrl);

//get single admin
adminRouter.get("/:id", getAdminsCtrl);

//admin update
adminRouter.put("/:id", updateAdminCtrl);

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