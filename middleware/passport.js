const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        clientID: "992670325998-iv980s376bapmumcf1g4h8i807a4d0be.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, done) {
            console.log("access token", accessToken);
            console.log("refress token", refreshToken);
            console.log("profile", profile);
            console.log("done", done)
            done(null,profile);
        }
    )
)

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});
