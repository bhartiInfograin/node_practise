const authServices = require('../../services/auth.services');


const login = {
    index: async (req, res) => {
        const data = {
            email,
            password
        } = req.body

        const _authServices = await authServices.login(data)
        if (_authServices) {
            res.json(_authServices)
        }
    },
    google_success: async (req, res) => {
        return res.json({statusCode:200,statusMsg:"login successfully"})
    },
    google_failed:async(req,res) => {
        return res.json({statusCode:400,statusMsg:"login failed"})
    }
}


module.exports = login;