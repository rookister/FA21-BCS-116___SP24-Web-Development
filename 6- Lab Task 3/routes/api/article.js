const express = require("express");
const router = express.Router();
const Article = require("../../models/article");
const uploadImage = require("../../utils/cloudinary");
const upload = require("../../middlewares/multer");

// Create Article
router.post('/articles', upload.single('featuredImage'), async (req, res) => {
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
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
});

// Read all Articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find().sort({ postTime: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
});

// Read single Article
router.get('/articles/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error });
    }
});

// Update Article
router.put('/articles/:id', upload.single('featuredImage'), async (req, res) => {
    try {
        const articleId = req.params.id;
        const { title, subtitle, body, category } = req.body;
        let featuredImage = req.file ? req.file.path : null;
        const updateData = { 
            title, 
            subtitle, 
            body: body.split('\n').filter(line => line.trim() !== ''), 
            category 
        };

        if (featuredImage) {
            const uploadResult = await uploadImage(req.file.path);
            if (uploadResult) {
                featuredImage = uploadResult.secure_url;
                updateData.featuredImage = featuredImage;
            }
        }

        const updatedArticle = await Article.findByIdAndUpdate(articleId, updateData, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
});

// Delete Article
router.delete('/articles/:id', async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
});

module.exports = router;
