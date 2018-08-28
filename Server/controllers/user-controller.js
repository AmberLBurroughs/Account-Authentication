const db = require("../models");

const passport = require('passport');

// Defining methods for the UserController
module.exports = {

  findAll: function(req, res) {
    db.User
      .findAll()
      .then(dbUser =>{
        let  users = [];
        dbUser.forEach(user => {
          users.push({
            uuid:user.dataValues.uuid,
            email: user.dataValues.email,
            createdAt: user.dataValues.createdAt
          });

        })

        res.json(users);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    if(checkAuthentication){
       db.User
        .findById(getCurrentuserId(req))
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    }
  },
  // create: function(req, res) {
  //   const User = {
  //     _id: req.body._id,
  //     title: req.body.headline.main,
  //     url: req.body.web_url
  //   };
  //   db.User
  //     .create(User)
  //     .then(dbUser => res.json(dbUser))
  //     .catch(err => res.status(422).json(err));
  // },
  // update: function(req, res) {
  //   db.User
  //     .update(req.body, { where:{ uuid: "78848350-7e94-11e8-9700-1b3dc8443d85" }}, )
  //     .then(dbUser => res.json(dbUser))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.User
  //     .findById({ _id: req.params.id })
  //     .then(dbUser => dbUser.remove())
  //     .then(dbUser => res.json(dbUser))
  //     .catch(err => res.status(422).json(err));
  // },

  getCurrentuserId: function(req){
    let userId;
    if(req.isAuthenticated()){
      userId = req.session.passport.user;
      console.log(`user: ${userId}`);
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

