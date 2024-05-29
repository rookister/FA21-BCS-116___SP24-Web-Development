module.exports = async function(req, res, next) {
    if(req.session.user) res.locals.signIn = true;
    else res.locals.signIn = false;
    req.app.set('layout', 'layout');
    next();
};