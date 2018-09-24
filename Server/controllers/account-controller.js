const db = require("../models");

const passport = require('passport');

// Defining methods for the accountController
module.exports = {
  find: (req, res) => {
    if(req.isAuthenticated()){
      db.Account
      .findById(req.session.passport.user)
      .then(dbaccount => {
        res.json(dbaccount);
      })
      .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  },
  create: (req, res) => {
    // const accountData = {
    //   first_name: req.body.first_name,
    //   last_name: req.body.last_name,
    //   fruit: req.body.fruit,
    //   userUUID:req.session.passport.user
    // }
    if(req.isAuthenticated()){
      db.Account
      .create(req.body, {userUUID:req.session.passport.user})
      .then(dbaccount => {
        res.json(dbaccount);
      })
      .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  },
  update: (req, res) => {
    if(req.isAuthenticated()){
      db.Account
      .update(req.body,{ where: {userUUID: req.session.passport.user}})
      .then(dbaccount => {
        res.json(dbaccount);
      })
      .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  }
};

