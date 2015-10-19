///<referance path="../../typings/tsd.d.ts" />
module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
};
