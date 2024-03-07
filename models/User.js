const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)
module.exports = userModel