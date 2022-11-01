const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  isprivate:{
    type:Boolean,
    default:false
  },
  followerCount: {
    type: Number,
    default:0
  },
  followingCount: {
    type: Number,
    default:0
  }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;




