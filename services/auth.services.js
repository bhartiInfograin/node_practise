const UserModel = require("../model/auth/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 5;



const auth = {
    
    signUp: async (data) => {
        try {
            const isUserexist = await UserModel.findOne({ email: data.email });
            if (isUserexist) {
                return {statusCode:400,statusMsg:"user already exist"}
            } else {
                let bcryptPassword = await bcrypt.hash(data.password, saltRounds)
                let param = {
                    userName: data.userName,
                    fullname: data.fullname,
                    email: data.email,
                    password: bcryptPassword,
                    confirmPassword: data.confirmPassword
                }
                const userData = new UserModel(param);
                const res = await userData.save()
                if (res) {
                    return {statusCode:200,statusMsg:"user register succssfully"}
                  
                }
            }
        } catch (error) {
            return error
        }
    },

    login: async(data) => {
        try{
            const _exisUser = await UserModel.findOne({email:data.email})
            console.log("_exisUser",_exisUser);
            if(_exisUser){




            }else{
                return {statusCode:400,statusMsg:"user not register"}
            }
        }catch(error){
            return error
        }
       
    }
}

module.exports = auth



