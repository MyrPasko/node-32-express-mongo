const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log("Get add products");
    res.render('admin/edit-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false,
    });
};


exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user
        .getProducts()                    // this will get all products for current user.
        .then((products) => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products',
            })
        })
        .catch((err) => {
            console.log("Error from getProducts: ", err);
        });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // const userId = req.user.id;

    req.user
        .createProduct({
            title,
            imageUrl,
            price,
            description,
            // userId
        })
        .then((result) => {
            // console.log("Result from postAddProduct: ", result);
            console.log("Product created from postAddProduct: ");
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log("Error from postAddProduct: ", err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    console.log(req.query, req.params);
    const prodId = req.params.productId;

    // req.user.getProducts({
    //     where: {
    //         id: prodId
    //     }
    // })
    Product.findById(prodId)            // alternative way
        .then((product) => {
            // const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit product',
                path: `/admin/edit-product`,
                editing: editMode,
                product: product,
            })
        })
        .catch((err) => {
            console.log("Error from getEditProduct: ", err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId)
        .then((product) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDesc;
            return product.save();
        })
        .then((result) => {
            console.log("Result from postEditProduct: ", result);
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log("Error from postEditProduct: ", err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId)
        .then((product) => {
            return product.destroy();
        })
        .then((result) => {
            console.log("Product was deleted.");
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log("Error from postDeleteProduct: ", err);
        });

    /** Alternative method */
    // Product.destroy({
    //     where: {
    //         id: prodId
    //     }
    // });
    // res.redirect('/admin/products');


};

/** For pure MySql */

// const Product = require('../models/product');
//
// exports.getAddProduct = (req, res, next) => {
//     // console.log("Get add products");
//     res.render('admin/edit-product', {
//         pageTitle: 'Add product',
//         path: '/admin/add-product',
//         editing: false,
//     });
// };
//
//
// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//
//     const product = new Product(null, title, imageUrl, price, description);
//     // console.log("From post Add Product");
//     product.save().then(() => {
//         res.redirect('/');
//     })
//         .catch((err) => {
//             console.log("Error from postAddProduct: ", err);
//         });
//
// };
//
// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//         return res.redirect('/');
//     }
//     console.log(req.query, req.params);
//     const prodId = req.params.productId;
//     Product.findById(prodId, (product) => {
//         if (!product) {
//             return res.redirect('/');
//         }
//         res.render('admin/edit-product', {
//             pageTitle: 'Edit product',
//             path: `/admin/edit-product`,
//             editing: true,
//             product: product,
//         });
//     })
//     // console.log("Get edit products");
//
// };
//
// exports.postEditProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedPrice = req.body.price;
//     const updatedImageUrl = req.body.imageUrl;
//     const updatedDesc = req.body.description;
//     const updatedProduct = new Product(
//         prodId,
//         updatedTitle,
//         updatedImageUrl,
//         updatedPrice,
//         updatedDesc
//     );
//     updatedProduct.save();
//     res.redirect('/admin/products');
// };
//
// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.deleteById(prodId);
//     res.redirect('/admin/products');
// };
//
// exports.getProducts = (req, res, next) => {
//     // console.log("Get products");
//     Product.fetchAll((products) => {
//         res.render('admin/products', {
//             prods: products,
//             pageTitle: 'Admin products',
//             path: '/admin/products',
//         })
//     })
// };

