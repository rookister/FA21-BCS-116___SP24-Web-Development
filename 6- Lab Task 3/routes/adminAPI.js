let express = require("express");
let router = express.Router();

let Article = require("../models/article");
let uploadImage = require("../utils/cloudinary");
let upload = require("../middlewares/multer");

//Upload Article
router.post('/upload-article', upload.single('featuredImage'), async (req, res) => {
    try {
        const { title, subtitle, category, body } = req.body;
        let featuredImage = 'assets/noPicture.png';

        if (req.file) {
            const uploadResult = await uploadImage(req.file.path);
            if (uploadResult) {
                featuredImage = uploadResult.secure_url;
            }
        }

        const bodyArray = body.split('\n').filter(line => line.trim() !== '');
        const newArticle = new Article({
            title,
            subtitle,
            featuredImage,
            category,
            body: bodyArray,
        });

        await newArticle.save();
        res.redirect('/admin/new-article?success=true');
    } catch (error) {
        res.redirect('/admin/new-article?success=false');
    }
});

//Delete Article
router.post("/article/:id/delete", async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect("/admin/all-articles?success=true");
    } catch (error) {
        res.redirect("/admin/all-articles?success=false");
        //res.status(500).send(error);
    }
});

//Update Article
router.post("/article/:id/edit", upload.single('featuredImage'), async (req, res) => {
    try {
        const articleId = req.params.id;
        const { title, subtitle, body, category } = req.body;
        let featuredImage = req.file ? req.file.path : null;
        const updateData = { 
            title, 
            subtitle, 
            body: body.split('\n'), 
            category
          };
      
        if (featuredImage) {
            const uploadResult = await uploadImage(req.file.path);
            if (uploadResult) {
                featuredImage = uploadResult.secure_url;
                updateData.featuredImage = featuredImage;
            }
          }
        console.log('article data: ', updateData)
        await Article.findByIdAndUpdate(articleId, updateData);
        res.redirect("/admin/all-articles?successfullUpdate=true");

    } catch (error) {
        res.redirect("/admin/all-articles?successfullUpdate=true");
        //res.status(500).send(error);
    }
});




module.exports = router;
