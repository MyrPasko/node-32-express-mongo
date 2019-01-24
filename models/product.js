const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;

        if (this._id) {
            // Update the product
            console.log("Update", new mongodb.ObjectId(undefined));
            dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});     // there must be simple js object
        } else {
            console.log("Inserted: ", this);
            dbOp = db.collection('products').insertOne(this);     // there must be simple js object
        }
        return dbOp
            .then((result) => {
                // console.log("Result from product: ", result);
            })
            .catch((err) => {
                throw err;
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()                           // do not return promise, but "cursor"
            .toArray()                        // and this returns promise.
            .then((products) => {
                return products;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({_id: new mongodb.ObjectId(prodId)})
            .next()
            .then((product) => {
                // console.log(product);
                return product;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({_id: new mongodb.ObjectId(prodId)})
            .then((result) => {

            })
            .catch((err) => {
                console.log("Deletion: ", err);
            });
    }
}

module.exports = Product;
