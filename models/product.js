const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    save() {
            const db = getDb();
            let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});     // there must be simple js object
        } else {
            dbOp = db.collection('products').insertOne(this);     // there must be simple js object
        }
            return dbOp
                .then((result) => {
                    console.log("Result from product: ", result);
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
                console.log(product);
                return product;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Product;
