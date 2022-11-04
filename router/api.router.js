const express = require('express');
const router=express.Router();
const passport = require('passport')
const authValidation = require("../middleware/authValidation");
const signup = require('../controller/auth/singup.controller');
const login = require("../controller/auth/login.controller");
const follow = require("../controller/follow.controller");
const post = require("../controller/post/post.controller");
const comment = require("../controller/post/comment.controller")
const upload = require("../middleware/uploads")

  

router.post('/signup',[authValidation.signUpValidation],signup.index);
router.post('/login',[authValidation.loginValidation],login.index);
router.post('/follow',follow.index);
router.post("/followrequest",follow.followRequest);
router.post('/post',upload.array("postContent[]"),post.index);
router.get('/postlist',post.postList)
router.post('/comment',comment.index);
router.get('/commentList',comment.commentList);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/auth/fail'}),
    (req, res, next) => {
        console.log(req.user, req.isAuthenticated());
        res.send('user is logged in');
    })

    router.get('/auth/fail', (req, res, next) => {
    res.send('user logged in failed');
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.send('user is logged out');
});


module.exports = router;




