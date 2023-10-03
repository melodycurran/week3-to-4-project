const mongoose = require('mongoose');
//const databaseConfig = require('../database/database.js');
mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose
db.url = databaseConfig.url
db.schema = require('./schema.js')(mongoose);



module.exports = db;

//Not going to use mongoose for now