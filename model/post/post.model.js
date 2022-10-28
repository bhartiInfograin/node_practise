const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = mongoose.Schema({
    title: {
        type: String
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    contentId:{
        type:Schema.Types.ObjectId,
        ref:"Content"
    }
},{timestamps:true});


const Post = mongoose.model("Post",PostSchema);
module.exports = Post;