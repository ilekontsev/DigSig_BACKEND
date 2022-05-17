const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    telephone: String,
    email: String,
    password: String,
  },
)
const Users = mongoose.model('Users', UsersSchema)
module.exports = Users
