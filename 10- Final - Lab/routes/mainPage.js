let express = require("express");
let router = express.Router();
let Article = require("../models/article");
let Product = require("../models/product");

router.get("/", async (request, response) => {
    try {
        const latestArticles = await Article.find()
            .sort({ postTime: -1 })
            .limit(5); 

        const animeArticles = await Article.find({ category: "Anime" })
        .sort({ postTime: -1 }) 
        .limit(10); 

        const gamesArticles = await Article.find({ category: "Games" })
            .sort({ postTime: -1 }) 
            .limit(10); 
        
        const products = await Product.find({ isFeatured: "true" })
            .sort({ postTime: -1 }) 
            .limit(5); 
    
        response.render("landingPage", {
            title: "rOOk - Catch Up With The Happenings!",
            active: "Home",
            latestArticles,
            animeArticles,
            gamesArticles,
            products
        });
    } catch (error) {
        response.status(500).send("Error Fetching Articles: " + error.message);
    }
});

router.get("/contact-us", (request, response) => {
    response.render("contactUS", {
        title: "rOOk - Contact US!",
        active: "Contact"
    });
});

router.get("/example-api", (request, response) => {
    response.render("apiFetch", {
        title: "rOOk - Example API!",
        active: "API"
    });
});

router.get("/search/:page?", async (request, response) => {
    try {
        let filter = {};
        let searchQuery = request.query.search || '';

        if (searchQuery) {
            filter.$or = [
                { title: { $regex: request.query.search, $options: 'i' } }, 
            ];
        }

        const pageSize = 4;
        let page = request.params.page || 1;
        let skip = (page - 1) * pageSize;
        const total = await Article.countDocuments(filter);
        const totalPages = Math.ceil(total / pageSize);

        const articles = await Article.find(filter)
            .sort({ postTime: -1 })
            .skip(skip)
            .limit(pageSize);

        response.render("search", {
            title: "rOOk - Search",
            active: "",
            Articles: articles,
            page,
            pageSize,
            total,
            totalPages,
            searchQuery: searchQuery
        });
    } catch (error) {
        response.status(500).send("Error fetching articles: " + error.message);
    }
});


module.exports = router;