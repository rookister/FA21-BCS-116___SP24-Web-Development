let express = require("express");
let router = express.Router();
let Product = require("../models/product");

router.get("/", async (request, response) => {
    const products = await Product.find();
    response.render("products", {
        active: "",
        title: "rook - Products",
        products: products
    });
});

router.get("/:id", async (req, res) => {
    let productID = req.params.id;
    const product = await Product.findById(productID);
    if(req.session.user){
        if(!req.session.visitedProducts){
            req.session.visitedProducts=[];
            req.session.visitedProducts.push(productID);
        }
        if (!req.session.visitedProducts.includes(productID)) {
            req.session.visitedProducts.push(productID);
        }
    }
    res.render("product", {
        active: "",
        title: "rook - Products",
        product: product
    });
});

router.post("/add-product", async (req, res) => {
        const {name, description, price, category, isFeatured} = req.body;
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            isFeatured
        });
        await newProduct.save();
        res.redirect('/products');
});



module.exports = router;