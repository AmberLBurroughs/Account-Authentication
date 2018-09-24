const router   = require("express").Router();
const passport = require('passport');


// =====================================
// LOGIN ===============================
// =====================================

// process the login form
router.post('/signin', (req, res, next) => {
  passportAuthenticate('local-login', req, res, next);
});

// =====================================
// SIGNUP ==============================
// =====================================

// process the signup form
router.post('/signup', (req, res, next) => {
  passportAuthenticate('local-signup', req, res, next);
});

// =====================================
// passport local strategy =============
// =====================================

passportAuthenticate = (localStrategy, req, res, next) => {
  passport.authenticate(localStrategy, function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }

    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    else{
      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr)
          return next(loginErr);
        }
        console.log("\n##########################");
        console.log(req.isAuthenticated());
        console.log('sucess');
        console.log(req.session.passport.user);
        console.log("##########################");
        console.log("\n")

        res.cookie('user_email', user.email );
        res.cookie('authenticated', "true" );

        return res.json(true);
      });
    }
  })(req, res, next);
}


// =====================================
// LOGOUT ==============================
// =====================================

router.get('/logout', (req, res) => {
    //req.logout();
     req.session.destroy(err => {
      req.logout();
      res.clearCookie("user_sid");
      res.clearCookie("user_email");
      res.clearCookie("authenticated");
      res.json(false);
    });
});

module.exports = router;
