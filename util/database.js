const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://MyrPasko:73lmGXdQamdqIZ0r@myroclaster1-jxvni.mongodb.net/test?retryWrites=true')
        .then((client) => {
            console.log("Connected!");
            _db = client.db();
            callback();
        })
        .catch((err) => {
            console.log("Error from MongoClient: ", err);
            throw err;
        });

};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


// 73lmGXdQamdqIZ0r
