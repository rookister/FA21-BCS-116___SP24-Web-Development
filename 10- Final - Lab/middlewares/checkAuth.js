module.exports = async function (req, res, next) {
    if (!req.session.user) res.redirect("/signing-in/login");
    else next();
};
  