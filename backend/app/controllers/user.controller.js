const db = require("../models");
const User = db.user;
var mongodb = require('mongodb');
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Client Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("responsable Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Expert Content.");
};
exports.getAllExpert = async (req, res) => {
  User.find()
  .populate("roles", "-__v")
  .exec((err, user) => {
    const listExpert=[];
    for(const element of user)
    {
      
      if(element.roles!=null)
      {
        if(element.roles[0].name=="export")
        {
          listExpert.push(element)
        }
      }
    }
    return res.json(listExpert)
  });
}
exports.getByIdExpert = async (req, res) => {
  User.findOne({_id: new mongodb.ObjectID(req.params.id)})
  .exec((err, user) => {
    return res.json(user)
  });
}
exports.updateExpert = async (req, res) => {
  User.findById(req.body.id)
  .exec(async (err, user) => {
    user.nom = req.body.nom;
    user.prenom = req.body.prenom;
    user.telephone = req.body.telephone;
    user.email = req.body.email;
    await user.save();
    const newUser =await User.findById(req.body.id)
    return res.json(newUser)
  });
}
exports.removeExpert = async (req, res) => {
  User.deleteOne({_id: new mongodb.ObjectID(req.body.id)})
  .exec((err, user) => {
    return res.json(user)
  });
}
