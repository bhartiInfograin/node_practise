const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    followerId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    statusType:{
        type:String,
    }
}, { timestamps: true });


const Follow = mongoose.model("Follow", FollowSchema);
module.exports = Follow;


