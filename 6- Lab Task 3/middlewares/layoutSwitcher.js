module.exports = async function (req, res, next) {
    req.app.set('layout', 'adminSide/adminLayout');
    res.locals.title = 'rOOk';
    next();
};