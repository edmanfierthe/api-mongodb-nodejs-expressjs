const verifyToken = require("../utils/verifyToken");
const Student = require("../model/Academics/Student");

const isStudentLogin = async (req, res, next) => {
    // Step 1: get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    
    //Step 2:  verify token
    const verifiedToken = verifyToken(token);
    if (verifiedToken){
        //find the student
        const user = await Student.findById(verifiedToken.id).select("name email role");
        // save the user into request object
        req.userAuth = user;
        next();
    }else{
        const err = new Error("Token expired");
        next(err);
    }

};

module.exports = isStudentLogin;