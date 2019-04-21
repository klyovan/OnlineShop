module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.session.oldUrl = req.url;
        req.flash('error_msg', 'Please first log in');
        res.redirect('/users/signin');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/profile');
    }
};