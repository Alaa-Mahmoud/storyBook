const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keyes = require('./keys');

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
            clientID: keyes.googleClientID,
            clientSecret: keyes.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(profile);
        }

    ));
};