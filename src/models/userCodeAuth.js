const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserCodeSchema = new Schema({
  email: String,
  code: String,
});

const UserCode = mongoose.model("UserCode", UserCodeSchema);

module.exports = UserCode;
