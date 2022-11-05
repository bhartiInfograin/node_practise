const userServices = require('../../services/user/user.services')

const user = {
list:async(req,res) => {
    const _userServices = await userServices.list(req.query.user)
    if(_userServices){
        res.json(_userServices)
    }
}
}

module.exports = user