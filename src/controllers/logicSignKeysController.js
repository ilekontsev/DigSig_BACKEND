const UserKey = require("../models/userKeySchema");
const Users = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET =
  "924ce4af5efec064e4ddb904ee4d71f0b20adf735e5d71f86289bfd3d7cc8dcaadeaee6ab1cfde9e1fa1b35957f74c4c796fefb31ef279c4dc474966f052d185";

module.exports.saveKeyAndMethod = async (req, res) => {
  try {
    const params = req.body;
    const token = req.headers.token;
    const dataUser = jwt.verify(token, TOKEN_SECRET);
    await UserKey.updateMany(
      { email: dataUser.email },
      { $set: { checked: true } }
    );
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
    return res.status(404).send("no save public key");
  }
};

module.exports.getPublicKey = async (req, res) => {
  try {
    const params = req.body;
    const token = req.headers.token;
    const dataUser = jwt.verify(token, TOKEN_SECRET);
    const results = await UserKey.findOne({
      email: dataUser.email,
      checked: false,
    });
    if (!results) {
      return res.status(404).send("not found keys");
    }
    return res.status(200).send(results);
  } catch (error) {
    return res.status(404).send(err, "not found keys");
  }
};

module.exports.checkPublicKey = async (req, res) => {
  try {
    const params = req.body;
    const token = req.headers.token;
    const dataUser = jwt.verify(token, TOKEN_SECRET);
    const results = await UserKey.find({ email: dataUser.email });

    if (!results.length) {
      return res.status(404).send("not found");
    }
    for (let i = 0; i < results.length; i++) {
      if (results[i].checked) {
        continue;
      }
      if (results[i].key !== params.publicKey) {
        return res.status(400).send("dont use this key");
      } else {
        return res.status(200).send("ok");
      }
    }
    return res.status(404).send(err, "not found keys");
  } catch (error) {
    return res.status(404).send(err, "not found keys");
  }
};

module.exports.countSignFiles = async (req, res) => {
  try {
    const token = req.headers.token;
    const dataUser = jwt.verify(token, TOKEN_SECRET);
    const results = await UserKey.findOne({
      email: dataUser.email,
      checked: false,
    });
    if (!results) {
      return res.status(404).send("not found user");
    }
    const count = results.count + 1;
    await UserKey.updateOne(
      { email: dataUser.email, checked: false },
      { $set: { count } }
    );
    return res.status(200).send("update count user");
  } catch (error) {
    return res.status(400).send("Error: no update count user");
  }
};

module.exports.getAllPublicKey = async (req, res) => {
  try {
    const token = req.headers.token;
    const results = await UserKey.find({ checked: false });
    const findUsers = await Users.find();

    if (!results.length || !findUsers.length) {
      return res.status(404).send("not found");
    }
    dataUsers = []
    results.forEach((item) => {
      findUsers.forEach((user) => {
        if (item.email === user._doc.email) {
          const {password, ...dataUser} = user._doc
          const combineObj = {key: item, user: dataUser};
          dataUsers.push(combineObj)
        }
      });
    });
    return res.status(200).send(dataUsers);
  } catch (error) {
    console.log(error)
    return res.status(404).send("not found");
  }
};

module.exports.deleteKeyUser = async (req, res) => {
  try {
    const params = req.body;
    const token = req.headers.token;
    const dataUser = jwt.verify(token, TOKEN_SECRET);
    const results = await UserKey.updateMany(
      { email: dataUser.email },
      { $set: { checked: true } }
    );
    if (!results) {
      return res.status(400).send("not found user or just not update key");
    }
    return res.status(200).send("The key has been removed");
  } catch (error) {
    return res.status(404).send("not found user or just not update key");
  }
};
