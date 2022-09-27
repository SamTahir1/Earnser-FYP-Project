
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.profile = require("./profile.model");
db.query = require("./query.model");
db.comment = require("./comment.model");
db.product = require("./product.model");
db.solution = require("./solutions.model");
// For local Database
db.url = "mongodb://localhost:27017/";


module.exports = db;