let express = require("express");
let router = express.Router();
let Article = require("../models/article");
let adminLayout = require("../middlewares/layoutSwitcher");

router.get("/all-articles", adminLayout, async (request, response) => {
    let filter = {};
    if (request.query.category && ['Anime', 'Games'].includes(request.query.category)) {
        filter.category = request.query.category;
    }
    if (request.query.search) {
        filter.$or = [
            { title: { $regex: request.query.search, $options: 'i' } }, 
        ];
    }
    const articles = await Article.find(filter).sort({ postTime: -1 });
    response.render("adminSide/adminArticles", {
        active: "Articles",
        articles: articles
    });
});

router.get("/new-article", adminLayout, async(request, response)=>{
    response.render("adminSide/articleUpload", {
        active: "New Post"
    });
});


router.get("/edit-article/:id", adminLayout, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.render("adminSide/editArticle", {
            active: "Articles",
            article: article
        });
    } catch (error) {
        res.redirect("/admin/all-articles");
    }
});




module.exports = router;