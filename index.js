const express = require('express');
const app = express();
const dotenv = require('dotenv')
const dbConnect = require('./helper/database');
const api = require("./router/api.router");
const Joi = require('joi');
const bodyParser = require('body-parser');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', api)



const validationMiddleware = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        surname: Joi.string().optional(),
        // regxpassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        password: Joi.string().required(),
        category: Joi.string().valid("car", "bike", "truck"),
        amount: Joi.number().integer().min(1).max(20),
        age: Joi.number().when("name", { is: "bharti", then: Joi.required(), otherwise: Joi.optional() }),
        item: Joi.object().keys({
            id: Joi.number().required(),
            name: Joi.string().optional()
        }).unknown(true),
        arr: Joi.array().items(Joi.object().keys({
            id: Joi.string().required(),
            sr_no: Joi.number().optional()
        })),
        confirmPassword: Joi.string().required().valid(Joi.ref("password")),
        limit: Joi.number().required(),
        number: Joi.array().min(Joi.ref("limit")).required(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "in"] }
        }).required()


    }).unknown(false)
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.json({ statusCode: 200, statusMsg: details })
    }else{
        next();
    }

}


app.post("/validation", validationMiddleware, async (req, res) => {
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




