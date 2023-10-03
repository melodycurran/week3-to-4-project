//establishes a connection to a database, in this case, mongodb
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;


let db;

exports.initiateDb = (callback) => {
    if(db) {
        console.log('Db is initialized');
        return callback(null, db);
    }
    MongoClient.connect(process.env.MONGODB_URI) //returns a promise
    .then((client) => {
        db = client;
        callback(null, db);
    })
    .catch((err) => {
        callback(err);
    });
};

exports.getDb = () => {
    if(!db) {
        throw new Error('Database not initialized')
    }
    return db;
};