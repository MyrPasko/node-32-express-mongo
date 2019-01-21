const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)                       // there must be simple js object
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
