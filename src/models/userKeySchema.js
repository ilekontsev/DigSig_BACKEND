const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserKeySchema = new Schema({
    key: String,
    method: String,
    checked: Boolean,
    userId: String,
    email: String,
    count: Number,
});


const UserKey = mongoose.model('UserKey', UserKeySchema );

module.exports = UserKey;