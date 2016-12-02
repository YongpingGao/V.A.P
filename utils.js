function ensureNormalAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('loginMessage', 'You must log in as an Administrator to see this page.');
    res.redirect('/login');
}

function ensureAdminAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "Administrator")
        return next();
    req.flash('loginMessage', 'You must log in as an Administrator to see this page.');
    res.redirect('/login');
}

function ensureProfAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "Professor")
        return next();
    req.flash('loginMessage', 'You must log in as an Administrator to see this page.');
    res.redirect('/login');
}

function ensureStudAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "Student")
        return next();
    req.flash('loginMessage', 'You must log in as an Administrator to see this page.');
    res.redirect('/login');
}

exports.ensureNormalAuthenticated = ensureNormalAuthenticated;
exports.ensureAdminAuthenticated = ensureAdminAuthenticated;
exports.ensureProfAuthenticated = ensureProfAuthenticated;
exports.ensureStudAuthenticated = ensureStudAuthenticated;