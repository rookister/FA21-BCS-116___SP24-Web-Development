const express = require("express");
const app = express();
let ejsLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(express.static("public"));


app.get("/", (request, response) => {
    response.render("landingPage", {title: "rOOk - Catch Up With The Happenings!"});
});

app.get("/contact-us", (request, response) => {
    response.status(201).send({msg: "Hello World"});
});


const port = process.env.port || 3000 //Environment Variable
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});