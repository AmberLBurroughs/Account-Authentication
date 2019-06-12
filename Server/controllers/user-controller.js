const db = require("../models");

// Defining methods for the UserController
module.exports = {
  find: (req, res) => {
    if(req.isAuthenticated()){
      db.User
      .findOne({where:{uuid:req.session.passport.user}})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  },
  update: (req, res) => {
    if(req.isAuthenticated()){
      db.User
      .update(req.body,{where:{uuid:req.session.passport.user}})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  },
  delete: (req, res) => {
    if(req.isAuthenticated()){
      db.User
      .destroy({where:{uuid:req.session.passport.user}})
        .then(deletedUsed => {
            res.json(deletedUsed);
        })
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  }
};