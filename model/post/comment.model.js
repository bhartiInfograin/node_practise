const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
  postId :{
    type:Schema.Types.ObjectId,
    ref:"Post",
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  comment:{
    type:String
  }

},{timestamps:true});

const Comment = mongoose.model("Comment",CommentSchema);
module.exports = Comment;