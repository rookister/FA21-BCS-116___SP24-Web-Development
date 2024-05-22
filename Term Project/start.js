const express = require("express");
const app = express();
let ejsLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.static("public"));

app.get("/", (request, response) => {
    response.render("landingPage", {
        title: "rOOk - Catch Up With The Happenings!",
        active: "Home"
    });
});

app.get("/contact-us", (request, response) => {
    response.render("contactUS", {
        title: "rOOk - Contact US!",
        active: "Contact"
    });
});

app.get("/anime-news", (request, response) => {
    response.render("articleSection", {
        title: "rOOk - Latest Anime News!",
        active: "Anime"
    });
});

app.get("/example-api", (request, response) => {
    response.render("apiFetch", {
        title: "rOOk - Example API!",
        active: "API"
    });
});

const port = process.env.port || 3000 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});