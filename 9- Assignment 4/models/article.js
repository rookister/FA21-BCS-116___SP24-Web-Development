const mongoose = require("mongoose");

let articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        default: "assets/noPicture.png"
    },
    postTime: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        default: "Gaming"
    },
    viewCount: {
        type: Number,
        default: 0
    },
    body: 
        {
        type: [String]
    }
    
});

let Article = mongoose.model("article", articleSchema);
module.exports = Article;