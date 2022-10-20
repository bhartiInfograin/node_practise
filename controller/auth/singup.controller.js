const authServices = require("../../services/auth.services")

const signup = {
   index: async (req, res) => {
      const data = {
         userName,
         fullname,
         email,
         password,
         confirmPassword
      } = req.body
      const _authServices = await authServices.signUp(data)
       if(_authServices){
         res.json(_authServices)
       }
   }
}


module.exports = signup