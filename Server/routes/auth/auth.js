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
  passport.authenticate(localStrategy, (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ success : false, message : info });
    }
    else{
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }

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
     req.session.destroy(err => {
      if(err) throw err
      req.logout();
      res.clearCookie("user_sid");
      res.clearCookie("user_email");
      res.clearCookie("authenticated");
      res.json(true);
    });
});

// =====================================
// Auth Validation =====================
// =====================================
router.get('/auth', (req, res)=> {
  let auth = req.isAuthenticated();
  res.json(auth);
});

module.exports = router;