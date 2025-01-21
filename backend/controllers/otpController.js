const OTP = require("../models/otp");
const User = require("../models/user");

exports.sendOTP = async (req, res) => {
  try {
    //fetch email
    const { email } = req.body;
    //check user already registerd or not
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }
    //create otp
    const otp = Math.floor(900000 + Math.random() * 100000);
    console.log( 'hii',otp);
    const otpPayload={email,otp}
    //save otp
    const otpBody = await OTP.create(otpPayload);
    console.log("otp body", otpBody);
    res.status(200).json({
      success: true,
      message: "otp sent successfully",
      otp,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "error in sending otp",
    });
  }
};
