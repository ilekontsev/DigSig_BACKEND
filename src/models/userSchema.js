const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema(
  {
    username: String,
    pass: String,
  },
  { versionKey: false }
)
const Users = mongoose.model('Users', UsersSchema)
module.exports = Users
