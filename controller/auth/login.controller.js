const authServices = require('../../services/auth.services');


const login ={
    index: async(req,res) => {
        const data = {
            email,
            password
        } = req.body

        const _authServices = await authServices.login(data)
        if(_authServices){
            res.json(_authServices)
        }
    }
}


module.exports = login;