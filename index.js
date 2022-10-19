const express = require('express');
const app = express();
const dotenv = require('dotenv')
const dbConnect = require('./helper/database');
const api = require("./router/api.router");
const bodyParser = require('body-parser');
const validationMiddleware = require('./middleware/testValidation')
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', api)






app.post("/validation",[validationMiddleware],async(req, res) => {
    res.json("clear with all validation")
})



dbConnect(process.env.LOCAL_DB)
app.listen(process.env.PORT, (err) => {
    if (!err) {
        console.log("server is listiening on port no: 2000")
    } else {
        console.log("server connection error", err)
    }
})




