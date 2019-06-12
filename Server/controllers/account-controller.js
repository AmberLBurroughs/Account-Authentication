require("dotenv").config();

const db = require("../models");
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

uploadImage = (req) => {
  let imageFile = req.files.file.data;

  s3.createBucket( () => {
      let params = {
          Bucket: process.env.S3_BUCKET,
          Key: `${req.body.photo}.jpg`,
          Body: imageFile
      };

      s3.upload(params, (err, data) => {
      if (err) {
          console.log('error in upload');
          console.log(err);
      }
          console.log('upload success');
          console.log(data);
      });
  });

}

// Defining methods for the accountController
module.exports = {
  find: (req, res) => {
    if(req.isAuthenticated()){
      db.Account
      .findOne({where: {userUUID: req.session.passport.user}})
        .then(dbaccount => {
          res.json(dbaccount);
        })
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  },
  create: (req, res) => {
    if(req.isAuthenticated()){
      if(req.body.photo) uploadImage(req)
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
  },
  delete: (req, res) => {
    if(req.isAuthenticated()){
      db.Account
      .destroy(req.body,{ where: {userUUID: req.session.passport.user}})
        .then(dbaccount => {
          res.json(dbaccount);
        })
        .catch(err => res.status(422).json(err));
    }
    res.status(401).json(err);  
  }
};
