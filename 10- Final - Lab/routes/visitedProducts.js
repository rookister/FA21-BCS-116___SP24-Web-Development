let express = require("express");
let router = express.Router();
let Product = require("../models/product");

router.get("/", async (req, res) => {
    res.render("visitedProducts", {
        title: "rook - Visited Products",
        active: "",
        products: req.session.visitedProducts
    });
});


module.exports = router;