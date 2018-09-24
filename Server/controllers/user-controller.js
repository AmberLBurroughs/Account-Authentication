const db = require("../models");

const passport = require('passport');

// Defining methods for the UserController
module.exports = {
  auth: (req, res) =>(req.isAuthenticated())? res.json(true) : res.json(false),
  find: (req, res) => {
    if(req.isAuthenticated()){
      db.User
      .findById(req.session.passport.user)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  },
  delete: (req, res) => {
    if(req.isAuthenticated()){
      db.User
      .findById({ uuid: req.session.passport.user })
      .then(dbUser => dbUser.remove())
      .then(dbUser => {
        db.Account
        .find({where:{ userUUID: req.session.passport.user }})
        .then(dbAccount => dbAccount.remove())
        .then(dbUser => res.json(true))
        .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  }
};

