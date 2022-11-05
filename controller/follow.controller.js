const followServices = require('../services/follow.services');


const follow = {
    index: async (req, res) => {
        const data = {
            userId: req.user,
            followerId: req.body.followerId,
        }
        const _followServices = await followServices.follow(data)
        if (_followServices) {
            res.json(_followServices)
        }
    },
    followRequest: async (req, res) => {
        const data = {
            userId: req.user,
            followingId: req.body.followingId,
            _isConfirmed: req.body._isConfirmed
        }
        const _followServices = await followServices.followRequest(data);
        if (_followServices) {
            res.json(_followServices)
        }
    },
    followerList:async(req,res) => {
        const _followServices = await followServices.followerList(req.user);
        if (_followServices) {
            res.json(_followServices)
        }
    },
    followingList:async(req,res) => {

    },
    invitationList: async(req,res) => {

    }
}

module.exports = follow;