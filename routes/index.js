const route = require('express').Router();
const product = require('./products');
const passport = require('passport');

route.use('/products', product);

route.use('/', require('./swagger'));

route.get('/login', passport.authenticate('github'), (req, res) => {});
route.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err);}
        res.redirect('/');
    });
});

module.exports = route;