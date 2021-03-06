const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {  // It's just middleware for incoming requests
    User.findById("5c4d5022627ec50428b9ad7e")
        .then((user) => {
            const { name, email, cart, _id } = user;

            console.log('[CART]', cart);
            req.user = new User(name, email, cart, _id);
            next();
        })
        .catch((err) => {
            console.log("Error from app middleware: ", err);
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});
