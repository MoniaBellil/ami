const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.Declaration = require("./declaration.model");
db.role = require("./role.model");
db.Rapport = require("./Rapport.model");
db.Devis = require("./devis.model");
module.exports = db;