const UserKey = require("../models/userKeySchema");
const Users = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET =
  "924ce4af5efec064e4ddb904ee4d71f0b20adf735e5d71f86289bfd3d7cc8dcaadeaee6ab1cfde9e1fa1b35957f74c4c796fefb31ef279c4dc474966f052d185";

module.exports.saveKeyAndMethod = (req, res) => {
  try {
    const params = req.body;
    const token = req.headers.token;
    const dataUser = jwt.verify(token, TOKEN_SECRET);
    const results = UserKey.create({
      ...params,
      email: dataUser.email,
      userId: dataUser._id,
      checked: false,
      count: 0,
    });

    if (results) {
      return res.status(200).send("save public key");
    } else {
      return res.status(402).send("no save public key");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.getPublicKey = async (req, res) => {
  try {
    const params = req.body;
    const token = req.headers.token;
    const dataUser = jwt.verify(token, TOKEN_SECRET);
    const results = await UserKey.findOne({ email: dataUser.email });
    if (!results) {
      return res.status(404).send("not found keys");
    }
    return res.status(200).send(results.key);
  } catch (error) {
    return res.status(404).send(err, "not found keys");
  }
};

module.exports.countSignFiles = (req, res) => {};

module.exports.getAllPublicKey = (req, res) => {
  try {
  } catch (error) {}
};

module.exports.deleteKeyUser = (req, res) => {};
