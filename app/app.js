const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const {globalErrHandler, notFoundErr} = require("../middlewares/globalErrHandler");

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json()); // pass incoming json data

//Routes

//Routes
app.use("/api/v1/admins", adminRouter);

//Error Middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;