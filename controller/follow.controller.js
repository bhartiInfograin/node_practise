const followServices = require('../services/follow.services');


const follow = {
    index: async (req, res) => {
        const data = {
            userId,
            followerId,
            statusType
        } = req.body

        const _followServices = await followServices.follow(data)
        if (_followServices) {
            res.json(_followServices)
        }
    }
}

module.exports = follow;