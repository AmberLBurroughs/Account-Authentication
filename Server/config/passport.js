// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var db  = require('../models');

// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.uuid);
    });

    // used to deserialize the user
    passport.deserializeUser(function(uuid, done) {
        db.User.findById(uuid).then(function(user) {

	        if (user) {

	            done(null, user.get());

	        } else {
	            done(user.errors, null);

	        }

	    });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and local_pw, we will override with email
        usernameField: 'email',
        passwordField : 'local_pw',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, local_pw, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        db.User.findOne({
            where: {
            	email: email
            }
        }).then(function(user, err){
        	if(err) {
                return done(err);
            }
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                db.User.create({
						    email: req.body.email,
						    local_pw: db.User.generateHash(local_pw)

						    }).then(function(dbUser) {
						      // send post back to render
						      return done(null, dbUser);

						    }).catch(function (err) {
						      // handle error;
						      console.log(err);
						    });
            }
          });
        });

}));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and local_pw, we will override with email
        usernameField: 'email',
        passwordField : 'local_pw',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, local_pw, done) { // callback with email and local_pw from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function(user, err) {
            // if there are any errors, return the error before anything else
            if (err){
                console.log("err", err);
                return done(err);
            }
            // if no user is found, return the message
            if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the local_pw is wrong
            if (user && !user.validPassword(req.body.local_pw)){

                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            return done(null, user);
        });

    }));

};
