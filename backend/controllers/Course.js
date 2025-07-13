const USER = require("../models/user");
const Course = require("../models/course");
require("dotenv").config();
exports.createCourse = async (req, res) => {
  try {
    console.log("data", req.body.token);
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      Instructor,
      thumbnail,
    } = req.body;
    console.log(Instructor);
    const instructorDetail = await USER.findById(Instructor);
    console.log("instructorDetails", instructorDetail);
    if (!instructorDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      instructor: instructorDetail._id,
      thumbnail,
    });

    await USER.findByIdAndUpdate(
      instructorDetail._id,
      {
        $push: {
          courses: newCourse._id, // ✅ FIXED — ensure this matches your schema
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      newCourse,
    });
  } catch (err) {
    console.log("Create Course Error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in creating a course",
    });
  }
};

// // //get course
exports.getCourse = async (req, res) => {
  try {
    console.log(req.body);
    //    const courseId=req.body;
    const courseDetails = await Course.find({});

    if (!courseDetails) {
      return res.status(400).json({
        succcess: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course is successfully fetch",
      courseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong in get course",
    });
  }
};
