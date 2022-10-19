const mongoose = require("mongoose");

module.exports = function connect(dbURL){
    if(mongoose.connection){
        mongoose.connection.close();
    }

    mongoose.connect(dbURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(err) => {
        if(err){
            console.log("err",err)
        }else{
            console.log("Database connected successfully");
        }
    })
}

