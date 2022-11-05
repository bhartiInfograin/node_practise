const UserModel = require("../model/auth/user.model");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken')
const saltRounds = 5;



const auth = {

    signUp: async (data) => {
        try {
            const isUserexist = await UserModel.findOne({ email: data.email });
            if (isUserexist) {
                return { statusCode: 400, statusMsg: "user already exist" }
            } else {
                let bcryptPassword = await bcrypt.hash(data.password, saltRounds)
                let param = {
                    userName: data.userName,
                    fullname: data.fullname,
                    email: data.email,
                    password: bcryptPassword,
                    isprivate: data.isprivate
                }
                const userData = new UserModel(param);
                const res = await userData.save()
                if (res) {
                    return { statusCode: 200, statusMsg: "user register succssfully" }

                }
            }
        } catch (error) {
            return error
        }
    },

    login: async (data) => {
        try {
            const _exisUser = await UserModel.findOne({ email: data.email })
            if (_exisUser) {
                const _checkPassword = await bcrypt.compare(data.password, _exisUser.password)
                if (!_checkPassword) {
                    return { statusCode: 400, statusMsg: "Incorrect password" }
                } else {
                    const accessToken = sign({ result: _exisUser._id  }, "User", {
                        expiresIn: 200000
                    });
                    return {
                        statusCode:200,
                        statusMsg:{
                            _id:_exisUser.id,
                            name:_exisUser.name,
                            fullname:_exisUser.fullname,
                            email:_exisUser.email,
                            isprivate:_exisUser.isprivate,
                            followerCount:_exisUser.followerCount,
                            followingCount:_exisUser.followingCount,
                            token:accessToken
                        }
                    }
                }
            } else {
                return { statusCode: 400, statusMsg: "user not register" }
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = auth



