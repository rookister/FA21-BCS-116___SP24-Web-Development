let express = require("express");
let router = express.Router();
let Article = require("../models/article");

router.get("/:page?", async (req, response) => {
    try {

        let page = req.params.page ? req.params.page : 1;
        let pageSize = 5;
        let skip = (page - 1) * pageSize;

        const gameArticles = await Article.find({ category: "Games" })
        .sort({ postTime: -1 }) 
        .limit(pageSize)
        .skip(skip);

        let total = gameArticles.length;
        let totalPages = Math.ceil(total / pageSize);
        
        const latestArticles = await Article.find()
        .sort({ postTime: -1 }) 
        .limit(3); 
    
        response.render("gameArticles", {
            title: "rOOk - Latest Anime News!",
            active: "Gaming",
            gameArticles,
            latestArticles,
            page,
            pageSize,
            total,
            totalPages,
        });
    } catch (error) {
        response.status(500).send("Error Fetching Game Articles: " + error.message);
    }
});


router.get("/articles/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        const latestArticles = await Article.find()
        .sort({ postTime: -1 }) 
        .limit(3); 
        res.render("article", {
            title: "rOOk - Latest Anime News!",
            active: "Gaming",
            article: article,
            latestArticles: latestArticles
        });
    }
    catch (error){
        res.status(500).send("Error Fetching Article: " + error.message);
    }
});

module.exports = router;