const Joi = require('joi');
const { schema } = require('moongose/models/user_model');


const authValidation = {

    signUpValidation : (req, res, next) => {
        const signupschema = Joi.object().keys({
            userName: Joi.string().required(),
            fullname: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "in", "org"] }
            }).required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().valid(Joi.ref("password"))
        }).unknown(true)
    
        const { error } = signupschema.validate(req.body, { abortEarly: false });
        if (error) {
            const { details } = error
            return res.json({ statusCode: 200, statusMsg: details })
        } else {
            next()
        }
    } ,

    loginValidation:(req,res,next) => {
         const loginSchema = Joi.object().keys({
                email:Joi.string().email().required(),
                password:Joi.string().required()
         }).unknown(false)

         const{error} = loginSchema.validate(req.body,{abortEarly:false});
         if(error) {
            const {details} =error;
            return res.json({statusCode:200,statusMsg:details})
         }else{
            next()
         }

    }

}





module.exports = authValidation
