const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save() {
        const db = getDb();

        return db.collection('users')
            .insertOne(this)
            .then((result) => {
                console.log("New user created: ", result);
            })
            .catch((err) => {
                console.log("Error from user creation: ", err);
            });
    }

    static findById(userId) {
        const db = getDb();

        return db.collection('users')
            .find({_id: new mongodb.objectId(userId)})
            .next()
            .then((user) => {
                console.log("User was found: ", user);
            })
            .catch((err) => {
                console.log("Error from user search: ", err);
            });
    }
}

module.exports = User;
