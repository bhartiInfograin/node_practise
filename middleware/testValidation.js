const Joi = require('joi');

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
        }).required(),
        fullname:Joi.string(),
        lastname:Joi.string(),
        custom_name:Joi.string().custom((value,msj) => {
            if(value == "test"){
                 return msj.message("Not allow test name")
            }
            return true
        })

    }).xor("fullname","lastname").unknown(false)
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const { details } = error
        return res.json({ statusCode: 200, statusMsg: details })
    }else{
        next();
    }
}


module.exports = validationMiddleware;