const db = require("../models");

const passport = require('passport');

// Defining methods for the accountController
module.exports = {

  // findAll: function(req, res) {
  //   db.account
  //     .findAll()
  //     .then(dbaccount =>{
  //       let  accounts = [];
  //       dbaccount.forEach(account => {
  //         accounts.push({
  //           uuid:account.dataValues.uuid,
  //           email: account.dataValues.email,
  //           createdAt: account.dataValues.createdAt
  //         });

  //       })

  //       res.json(accounts);
  //     })
  //     .catch(err => res.status(422).json(err));
  // },
  // findById: function(req, res) {
  //   if(checkAuthentication){
  //      db.account
  //       .findById(getCurrentuserId(req))
  //       .then(dbaccount => res.json(dbaccount))
  //       .catch(err => res.status(422).json(err));
  //   }
  // },
  create: function(req, res) {
    db.Account
      .create(req.body)
      .then(dbaccount => {
        res.json(dbaccount)
      })
      .catch(err => res.status(422).json(err));
  },
  // update: function(req, res) {
  //   db.account
  //     .update(req.body, { where:{ uuid: "78848350-7e94-11e8-9700-1b3dc8443d85" }}, )
  //     .then(dbaccount => res.json(dbaccount))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.account
  //     .findById({ _id: req.params.id })
  //     .then(dbaccount => dbaccount.remove())
  //     .then(dbaccount => res.json(dbaccount))
  //     .catch(err => res.status(422).json(err));
  // },

  getCurrentUserId: function(req){
    let userId;
    if(req.isAuthenticated()){
      userId = req.session.passport.account;
      console.log(`account: ${userId}`);
    } else {
      userId = false
    }
    return userId
  },

  checkAuthentication: function(req){
    if(req.isAuthenticated()){
      return true
    }
    else {
      return false
    }
  }

};

