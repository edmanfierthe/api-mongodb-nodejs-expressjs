const Student = require("../model/Academics/Student");

const isStudent = async (req, res, next) => {
    //Find the user
    const userId = req?.userAuth?._id;
    const studentFound = await Student.findById(userId);

    //check if student
    if(studentFound?.role ==='student'){
        next();
    }else{
        next(new Error('Access Denied, Student only'));
    }

};

module.exports = isStudent;