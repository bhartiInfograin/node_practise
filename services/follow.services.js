const FollowModel = require('../model/follow.model');
const UserModel = require('../model/auth/user.model');




const follow = {
    follow: async (data) => {
        try {
            let param = {
                userId: data.userId,
                followerId: data.followerId,
                statusType: data.statusType
            }

            const followData = new FollowModel(param);
            const res = await followData.save();
            if (res) {
                userId = res.userId;
                followerId = res.followerId
                statusType = res.statusType
                if(statusType == "follow"){
                    const increfollowing = await UserModel.findByIdAndUpdate(userId, {$inc :{'followingCount' : 1}});
                    const increFollower = await UserModel.findByIdAndUpdate(followerId, {$inc :{'followerCount' : 1}});
                    if(increfollowing && increFollower){
                        return {statusCode:200,statusMsg:"follow"}
                    }
                }
                if(statusType == "unfollow"){
                    const decrefollowing = await UserModel.findByIdAndUpdate(userId, {$inc :{'followingCount' : -1}});
                    const decreFollower = await UserModel.findByIdAndUpdate(followerId, {$inc :{'followerCount' : -1}});

                    if(decrefollowing && decreFollower){
                        return {statusCode:200,statusMsg:"unfollow"}
                    }
                } 
            }
        } catch (error) {
            return error
        }
    }

}

module.exports = follow;