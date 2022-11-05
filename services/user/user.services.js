const UserModel = require('../../model/auth/user.model');


const user = {
    list:async(data) => {
        const userList = await UserModel.find({"userName":{ $regex: data , $options: 'm',$options: 'i' }},{"password":0});
        return {statusCode:200,statusMsg:userList}
    }
}

module.exports = user