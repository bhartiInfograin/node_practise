
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../model/auth/user.model');

passport.use(
    new GoogleStrategy({
        clientID: "992670325998-iv980s376bapmumcf1g4h8i807a4d0be.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            const proDetails = profile._json;
            const _exisUser = await UserModel.findOne({ "googleId": proDetails.sub })
            if (!_exisUser) {
                const param = {
                    googleId: proDetails.sub,
                    userName: proDetails.given_name,
                    fullname: proDetails.name,
                    email: proDetails.email,
                }
                const userdata = new UserModel(param)
                const res = await userdata.save()
            }
           const demo = "bharti"
        
            done(null, demo);
        }
    )
)

// passport.serializeUser(function (user, cb) {
//     console.log("user",user)
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     console.log("obj",obj)
//     cb(null, obj);
// });


passport.serializeUser((user, done) => {
    console.log("done",done)
    console.log("user",user)
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});