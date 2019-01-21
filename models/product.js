/** For Sequelize */

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;

/** For essential MySQL */

// const db = require('../util/database');
//
// const Cart = require('./cart');
//
// module.exports = class Product {
//     constructor(id, title, imageUrl, price, description) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//     }
//
//     save() {
//         return db.execute('INSERT INTO products (title, imageUrl, price, description) VALUES (?, ?, ?, ?)',
//             [this.title, this.imageUrl, this.price, this.description])
//     }
//
//     static deleteById(id) {
//
//     }
//
//     static fetchAll() {
//         return db.execute('SELECT * FROM products')
//     }
//
//     static findById(id) {
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
//     }
// };


/** For data in files */
//
// const fs = require('fs');
// const path = require('path');
// const fullPath = require('../util/path');
// const p = path.join(fullPath, 'data', 'products.json');
// const Cart = require('./cart');
//
// const getProductsFromFile = (callback) => {
//     // console.log("Controller get products from file");
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             return callback([]);
//         }
//         // return JSON.parse(fileContent);
//         callback(JSON.parse(fileContent));
//     });
// };
//
// module.exports = class Product {
//     constructor(id, title, imageUrl, price, description) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//     }
//
//     save() {
//         getProductsFromFile((products) => {
//             // console.log("From Controller save");
//             if (this.id) {
//                 const existingProductIndex = products.findIndex((prod) => {
//                     return prod.id === this.id;
//                 });
//                 const updatedProducts = [...products];
//                 updatedProducts[existingProductIndex] = this; // we change existing product with the same id to our newly created product
//                 fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//                     console.log(err);
//                 })
//             } else {
//                 this.id = Math.random().toString();
//                 products.push(this);
//                 fs.writeFile(p, JSON.stringify(products), (err) => {
//                     console.log(err);
//                 })
//             }
//         })
//     }
//
//     static deleteById(id) {
//         getProductsFromFile((products) => {
//             const product = products.find((prod) => {
//                 return prod.id === id;
//             });
//             const updatedProducts = products.filter((prod) => {
//                 return prod.id !== id;
//             });
//             fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//                 if (!err) {
//                     Cart.deleteProduct(id, product.price);
//                 }
//             })
//         })
//     }
//
//     static fetchAll(callback) {
//         getProductsFromFile(callback);
//     }
//
//     static findById(id, callback) {
//         getProductsFromFile((products) => {
//             const product = products.find((p) => {
//                 return p.id === id;
//             });
//             callback(product);
//         })
//     }
//
// };