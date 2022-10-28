const FollowModel = require('../model/follow.model');
const UserModel = require('../model/auth/user.model');
const User = require('../model/auth/user.model');


const follow = {
    follow: async (data) => {
        try {
            let param = {
                userId: data.userId,
                followerId: data.followerId,
                statusType: data.statusType
            }
            if (param.statusType == "unfollow") {
                const _checkFollow = await FollowModel.findOne({ $and: [{ followerId: { $eq: param.followerId } }, { userId: { $eq: param.userId } }] });
                if (!_checkFollow) {
                    return { statusCode: 400, startusMsg: "need to be follow first" }
                } else {
                    if (_checkFollow.statusType == "unfollow") {
                        return { statusCode: 400, statusMsg: "alreday unfollow" }
                    }
                    const followId = _checkFollow._id.toString()

                    const changeStatus = await FollowModel.findByIdAndDelete(followId);
                    if (changeStatus) {
                        const decrefollowing = await UserModel.findByIdAndUpdate(userId, { $inc: { 'followingCount': -1 } });
                        const decreFollower = await UserModel.findByIdAndUpdate(followerId, { $inc: { 'followerCount': -1 } });
                        if (decrefollowing && decreFollower) {
                            return { statusCode: 200, statusMsg: "unfollow" }
                        }
                    }
                }
            }

            if (param.statusType == "follow") {
                const _checkFollow = await FollowModel.findOne({ $and: [{ followerId: { $eq: param.followerId } }, { userId: { $eq: param.userId } }] });
                if (!_checkFollow) {
                    const _validuser = await UserModel.find({ "_id": { $in: [param.followerId, param.userId] } })
                    if (_validuser) {
                        const followData = new FollowModel(param);
                        const res = await followData.save();
                        if (res) {
                            const increfollowing = await UserModel.findByIdAndUpdate(userId, { $inc: { 'followingCount': 1 } });
                            const increFollower = await UserModel.findByIdAndUpdate(followerId, { $inc: { 'followerCount': 1 } });
                            if (increfollowing && increFollower) {
                                return { statusCode: 200, statusMsg: "follow" }
                            }
                        }
                    }
                } else {
                    if (_checkFollow.followerId != param.followerId) {
                        const followData = new FollowModel(param);
                        const res = await followData.save();
                        if (res) {
                            const increfollowing = await UserModel.findByIdAndUpdate(userId, { $inc: { 'followingCount': 1 } });
                            const increFollower = await UserModel.findByIdAndUpdate(followerId, { $inc: { 'followerCount': 1 } });
                            if (increfollowing && increFollower) {
                                return { statusCode: 200, statusMsg: "follow" }
                            }
                        }
                    } else if (_checkFollow.followerId == param.followerId && _checkFollow.statusType == "follow") {
                        return { statusCode: 400, startusMsg: "already follow" }
                    } 
                }
            }

        } catch (error) {
            return error
        }
    }
}

module.exports = follow;



