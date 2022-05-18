const nodemailer = require("nodemailer");
const Users = require("../models/userSchema");
const UserCode = require("../models/userCodeAuth");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sendcode123@gmail.com",
    pass: "ljrpjvkisoxjtvav",
  },
});

module.exports.sendMailCode = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).send("you must specify email in url");
    }

    const min = 100000;
    const max = 999999;
    const code = (Math.floor(Math.random() * (max - min)) + min).toString();
    console.log(code);
    const findResults = await UserCode.findOne({ email });
    let results;
    if (findResults) {
      results = await UserCode.findOneAndUpdate({ email }, { $set: { code } });
    } else {
      results = UserCode.create({ email, code });
    }

    if (!results) {
      return res.status(402).send("2no verification code, plese resend again");
    }

    const mailOptions = {
      from: "sendcode123@gmail.com",
      to: email,
      subject: "Verification code",
      text: `Verification code: ${code}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    return res.status(404).send("1no verification code, plese resend again");
  }
};

module.exports.sendMailSign = (req, res) => {};

module.exports.notification = (req, res) => {};

module.exports.verifyCode = async (req, res) => {
  try {
    const params = req.body;
    if (!params.code || !params.email) {
      return res.status(400).send("you must specify code");
    }

    const user = await UserCode.findOne({email: params.email });
    if (!user || !user.code || user.code !== params.code) {
      return res.status(404).send("already confired, or invalid code");
    }

    await UserCode.deleteOne({email: params.email});

    return res.status(200).send("verifiyed!, you can login now");
  } catch (err) {
    console.error("step: code verification " + err);
    return res.status(500).send("something went wrong");
  }
};
