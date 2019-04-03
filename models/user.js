const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
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

    addToCart(product) {
        // const cartProduct = this.cart.items.findIndex(cp => {
        //     return cp._id === product._id;
        // })
        const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: 1 }] };
        const db = getDb();

        console.log('[User] Updated cart: ', updatedCart);

        db.collection('users').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updatedCart } }                  // not merge, but override
        )
    }

    static findById(userId) {
        const db = getDb();

        return db.collection('users')
        /** One option */
        // .find({_id: new ObjectId(userId)})
        // .next()
        /** Second option */
            .findOne({ _id: new ObjectId(userId) })
    }
}

module.exports = User;
