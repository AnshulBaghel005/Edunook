const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "Edunook ",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("info:", info);
    return info;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mailSender;
