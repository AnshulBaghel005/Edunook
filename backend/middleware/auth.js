const JWT = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    //fetch token
    const token = req.body.token
      // req.cookies.token ||
      // req.header("Autorisation").replace("Bearer", "");
    console.log(token + "----token");
    if (!token) {
      return res.status(400).json({
        message: "token is not find",
      });
    }
    //verify token
    try {
      const payload = JWT.verify(token, process.env.JWT_SECRET);
      console.log('payload:',payload);
      req.user = payload;
    } catch (err) {
      return res.status(400).json({
        message: "invalid token",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      message: "auth error",
    });
  }
};
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(400).json({
        message: "This is protected route for stduent",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      message: "user is not matching",
    });
  }
};
exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(400).json({
        message: "This is protected route for Instructor",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      message: "user is not matching",
    });
  }
};
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(400).json({
        message: "This is protected route for stduent",
      });
    }
    next();
  } catch (err) {
    return res.status(400).json({
      message: "user is not matching",
    });
  }
};
