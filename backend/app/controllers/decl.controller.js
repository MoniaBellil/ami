const db = require("../models");
var fs = require('fs');
exports.getAllDeclaration = async (req, res) => {
    db.Declaration.find({
      user: req.params.id
    }).populate("File", "-__v",'User')
    .exec((err, user) => {
      return res.json(user)
    });
}
exports.getByIdDeclaration = async (req, res) => {
  db.Declaration.findById(req.params.id).populate("File","url")
  .exec(function(err, decl) {
    return res.json(decl.files)
  });
}
exports.getAllDeclarationExpt = async (req, res) => {
  db.Declaration.find({
    expert: req.params.id,
    rapport:[]
  }).sort({dateExpert: -1}).populate("File", "-__v",'User')
  .exec((err, user) => {
    return res.json(user)
  });
}
exports.getDevisById = async (req, res) => {
  db.Devis.findById(req.params.id)
  .exec((err, user) => {
    return res.json(user)
  });
}
exports.getAllDeclarationClient = async (req, res) => {
  db.Declaration.find({
    user: req.params.id,
    rapport:{ $ne: []},
    downloadRapport:{ $ne: "download"}
  }).sort({dateDevis: -1}).populate("File", "-__v",'User')
  .exec((err, user) => {
    return res.json(user)
  });
}
exports.getAllDeclarationResp = async (req, res) => {
  db.Declaration.find({expert:[]}).populate("File", "-__v",'User')
  .exec((err, user) => {
    return res.json(user)
  });
}
exports.addExpert = async (req, res) => {
  db.Declaration.findById(req.body.id).populate("File", "-__v",'User')
  .exec(async (err, user) => {
    user.expert = req.body.expert;
    user.dateExpert = Date.now();
    await user.save();
    const newDeclaration =await db.Declaration.findById(req.body.id)
    return res.json(newDeclaration)
  });
}
exports.updateRecl = async (req, res) => {
  db.Declaration.findById(req.params.id).populate("File", "-__v",'User')
  .exec(async (err, user) => {
    user.downloadRapport = "download";
    await user.save();
    const newDeclaration =await db.Declaration.findById(req.body.id)
    return res.json(newDeclaration)
  });
}