const express = require('express');
const router=express.Router();
const passport = require('passport')
const authValidation = require("../middleware/authValidation");
const signup = require('../controller/auth/singup.controller');
const login = require("../controller/auth/login.controller");
const follow = require("../controller/follow.controller");
const post = require("../controller/post/post.controller");
const comment = require("../controller/post/comment.controller");
const user = require('../controller/user/user.controller')
const upload = require("../middleware/uploads")
const authorizationMiddleware = require('../middleware/authorization')


  

router.post('/signup',[authValidation.signUpValidation],signup.index);
router.post('/login',[authValidation.loginValidation],login.index);

router.post('/follow',authorizationMiddleware,follow.index);
router.post("/followrequest",authorizationMiddleware,follow.followRequest);
router.get("/followerList",authorizationMiddleware,follow.followerList);
router.get("/followingList",authorizationMiddleware,follow.followingList);
router.get('/invitationList',authorizationMiddleware,follow.invitationList);

router.post('/post',upload.array("postContent[]"),post.index);
router.get('/postlist',post.postList)
router.post('/comment',comment.index);
router.get('/commentList',comment.commentList);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/auth/fail'}),login.google_success);
router.get('/auth/fail', login.google_failed);
router.get("/userlist",user.list)




module.exports = router;





