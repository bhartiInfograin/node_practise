const FollowModel = require('../model/follow.model');
const UserModel = require('../model/auth/user.model');


const follow = {
    follow: async (data) => {
        try {
            let param = {
                userId: data.userId,
                followerId: data.followerId,
            }
            // for checking userid and followerid entery in followdocument
            const _checkFollow = await FollowModel.findOne({ $and: [{ followerId: { $eq: param.followerId } }, { userId: { $eq: param.userId } }] });
            // if follow document empty
            if (!_checkFollow) {
                // check followid is private or not
                const checkPrivate = await UserModel.findById({ "_id": param.followerId })
                if (checkPrivate.isprivate == true) {
                    // for private user
                    param.statusType = "pending"
                    const followData = new FollowModel(param);
                    const res = await followData.save();
                    if (res) {
                        return { statusCode: 200, statusMsg: "request pending......" }
                    }
                } else {
                    // for public user
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
                // if it persent than unfollow user
                const _checkFollow = await FollowModel.findOneAndDelete({ $and: [{ followerId: { $eq: param.followerId } }, { userId: { $eq: param.userId } }] });
                if (_checkFollow) {
                    const decrefollowing = await UserModel.findByIdAndUpdate(userId, { $inc: { 'followingCount': -1 } });
                    const decreFollower = await UserModel.findByIdAndUpdate(followerId, { $inc: { 'followerCount': -1 } });
                    if (decrefollowing && decreFollower) {
                        return { statusCode: 200, statusMsg: "unfollow" }
                    }
                }
            }
        } catch (error) {
            return error
        }
    },

    followRequest: async (data) => {
        try {
            //check user and following id present or not
            const _checkFollow = await FollowModel.findOne({ $and: [{ followerId: { $eq: data.userId } }, { userId: { $eq: data.followingId } }] });
            if (_checkFollow) {
                if (data._isConfirmed == true) {
                    // remove pending status
                    const follow = await FollowModel.updateOne(
                        { $and: [{ followerId: { $eq: data.userId } }, { userId: { $eq: data.followingId } }] },
                        { $unset: { statusType: "" } }
                    )
                    if (follow) {
                        const increfollowing = await UserModel.findByIdAndUpdate(data.followingId, { $inc: { 'followingCount': 1 } });
                        const increFollower = await UserModel.findByIdAndUpdate(data.userId, { $inc: { 'followerCount': 1 } });
                        if (increfollowing && increFollower) {
                            return { statusCode: 200, statusMsg: "follow" }
                        }
                    }
                }
                if (data._isConfirmed == false) {
                    // delete entry of these users
                    const _checkFollow = await FollowModel.findOneAndDelete({ $and: [{ followerId: { $eq: data.userId } }, { userId: { $eq: data.followingId  } }] });
                  if(_checkFollow){
                    return {statusCode: 200, statusMsg: "request deleted"}
                  }
                }
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = follow;




