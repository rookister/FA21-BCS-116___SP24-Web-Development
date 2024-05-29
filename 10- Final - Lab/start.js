const express = require("express");
const app = express();
let ejsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
let cookieParser = require("cookie-parser");
let expressSession = require("express-session");

app.set("view engine", "ejs");
app.use(ejsLayouts);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(ejsLayouts);
app.use(cookieParser());
app.use(expressSession({ 
  secret: "My Secret Key",
  cookie: { maxAge: 86400000 },
  resave: false,
  saveUninitialized: true 
}));

//MiddleWares
let mainPageAuthCheck = require("./middlewares/main-page");
let checkAuth = require("./middlewares/checkAuth");

//Routing
app.use("/", mainPageAuthCheck, require("./routes/mainPage"));
app.use("/Anime", mainPageAuthCheck, require("./routes/animeArticles"));
app.use("/Games", mainPageAuthCheck, require("./routes/gamingArticles"));
app.use("/signing-in", mainPageAuthCheck, require("./routes/login"));
app.use("/admin", checkAuth, require("./routes/admin"));
app.use("/admin-api", checkAuth, require("./routes/adminAPI"));
app.use("/api", require("./routes/api/article"));
//Final Routes
app.use("/products", mainPageAuthCheck, require("./routes/products"));
app.use("/visited-products", mainPageAuthCheck, require("./routes/visitedProducts"));

//DB + Server
const port = process.env.port || 3000 
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});

async function databaseConnection() {
  try {
    const uri = "mongodb+srv://admin:NMnm.,69@webtechtermproject116.kmrkabg.mongodb.net";
    let dbname = "rookDB";
    await mongoose.connect(`${uri}/${dbname}`);
    console.log("You are successfully connected to MongoDB!");
  } catch (error) {
    console.log("An error was thrown when connecting to MongoDB!: ", error);
  }
}

databaseConnection().catch(console.dir);