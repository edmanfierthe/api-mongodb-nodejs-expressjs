const verifyToken = require("../utils/verifyToken");
const Admin = require("../model/Staff/Admin");

const isLogin = async (req, res, next) => {
    // Step 1: get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    
    //Step 2:  verify token
    const verifiedToken = verifyToken(token);
    if (verifiedToken){
        //find the admin
        const user = await Admin.findById(verifiedToken.id).select("name email role");
        // save the user into request object
        req.userAuth = user;
        next();
    }else{
        const err = new Error("Token expired/invalid");
        next(err);
    }

};

module.exports = isLogin;