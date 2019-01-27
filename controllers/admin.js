const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false,
    });
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
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

    console.log("User from postAddProduct: ", req.user);
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id);

    console.log("Add product!");
    console.log("Product Id, it mustn't be there: ", prodId);

    product.save()
        .then((result) => {
            // console.log("Result from postAddProduct: ", result);
            // console.log("Product created from postAddProduct: ", result);
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
    // console.log(req.query, req.params);
    const prodId = req.params.productId;

    Product.findById(prodId)
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
//
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, prodId);

    console.log("Edit product!");
    product.save()
        .then((product) => {
            // console.log("Result from postEditProduct: ", product);
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log("Error from postEditProduct: ", err);
        });
};
//
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.deleteById(prodId)
        .then((result) => {
            console.log("Product was deleted.");
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log("Error from postDeleteProduct: ", err);
        });
};

