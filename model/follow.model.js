const mongoose = require('mongoose');

const FollowSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    followerId: {
        type: String,
        required: true
    },
    statusType:{
        type:String,
        required:true
    }
}, { timestamps: true });


const Follow = mongoose.model("Follow", FollowSchema);
module.exports = Follow;