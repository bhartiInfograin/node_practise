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
                const _checkFollow = await FollowModel.findOne({ userId: param.userId });
                console.log("_checkFollow", _checkFollow)
                if (!_checkFollow) {
                    return { statusCode: 400, startusMsg: "need to be follow first" }
                } else {
                     if(_checkFollow.statusType == "unfollow"){
                        return {statusCode:400,statusMsg:"alreday unfollow"}
                     }
                    const followId = _checkFollow._id.toString()
                    const changeStatus = await FollowModel.findByIdAndUpdate(followId, { statusType: "unfollow" });
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
                const _checkFollow = await FollowModel.findOne({ userId: param.userId });
                console.log("_checkFollow", _checkFollow)
                if (!_checkFollow || _checkFollow.statusType == "unfollow") {
                      
                    // const followData = new FollowModel(param);
                    // const res = await followData.save();
                    // // console.log("res", res)
                    // if (res) {
                    //     const increfollowing = await UserModel.findByIdAndUpdate(userId, { $inc: { 'followingCount': 1 } });
                    //     const increFollower = await UserModel.findByIdAndUpdate(followerId, { $inc: { 'followerCount': 1 } });
                    //     if (increfollowing && increFollower) {
                    //         return { statusCode: 200, statusMsg: "follow" }
                    //     }
                    // }
                } else {
                    return { statusCode: 400, startusMsg: "already follow" }
                }
            }



            // const followData = new FollowModel(param);
            // const res = await followData.save();
            // if (res) {
            //     const userId = res.userId;
            //     const followerId = res.followerId
            //     const statusType = res.statusType
            //     if (statusType == "follow") {
            //         const _checkFollow = await FollowModel.findOne({ userId: userId });
            //         console.log("_checkFollow", _checkFollow)
            //         // if (_checkFollow.followerId == followerId) {
            //         //     return { statusCode: 400, statusMsg: "already follow" }
            //         // }
            //         // const increfollowing = await UserModel.findByIdAndUpdate(userId, { $inc: { 'followingCount': 1 } });
            //         // const increFollower = await UserModel.findByIdAndUpdate(followerId, { $inc: { 'followerCount': 1 } });
            //         // if (increfollowing && increFollower) {
            //         //     return { statusCode: 200, statusMsg: "follow" }
            //         // }
            //     }
            //     if (statusType == "unfollow") {
            //         const _checkFollow = await FollowModel.findOne({ userId: userId });
            //         console.log("_checkFollow", _checkFollow)



            //         // if (_checkFollow.followerId == followerId && _checkFollow.statusType == "follow") {
            //         //     console.log("in unfollow block")
            //         //     const changeStatus = await FollowModel.findByIdAndUpdate(userId,{"statusType":"unfollow"});
            //         //     // const decrefollowing = await UserModel.findByIdAndUpdate(userId, { $inc: { 'followingCount': -1 } });
            //         //     // const decreFollower = await UserModel.findByIdAndUpdate(followerId, { $inc: { 'followerCount': -1 } });
            //         //     // if (decrefollowing && decreFollower) {
            //         //     //     return { statusCode: 200, statusMsg: "unfollow" }
            //         //     // }
            //         // } else if (_checkFollow.followerId == followerId && _checkFollow.statusType == "unfollow") {
            //         //     console.log("alreay unfollow block")
            //         //     return { statusCode: 400, statusMsg: "user alreay unfollow" }
            //         // } else {
            //         //     console.log("not follow block")
            //         //     return { statusCode: 400, statusMsg: "kindly please follow first" }
            //         // }
            //     }
            // }
        } catch (error) {
            return error
        }
    }

}

module.exports = follow;