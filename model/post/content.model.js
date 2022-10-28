const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = mongoose.Schema({
    description: {
        type: String
    },
    contents: [{
        type: String
    }],
    postId: {
        type:Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;