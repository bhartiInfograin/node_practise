const express = require('express');
const router=express.Router();
const authValidation = require("../middleware/authValidation");
const signup = require('../controller/auth/singup.controller');
const login = require("../controller/auth/login.controller");
const follow = require("../controller/follow.controller");


router.post('/signup',[authValidation.signUpValidation],signup.index);
router.post('/login',[authValidation.loginValidation],login.index);
router.post('/follow',follow.index);


module.exports = router;




