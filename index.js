const express = require("express");
const path = require("path");
const exp = require("constants");
const cookieParser = require("cookie-parser");
const { connectMongodb } = require("./connection");

const Url = require("./models/Url");

const UrlRoute = require("./routes/Url")
const StaticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")


const {restrictToLoggedinUserOnly, checkAuth} = require("./middleware/auth")


const app = express();
const port = 8001;

connectMongodb("mongodb://localhost:27017/shortUrl")
    .then(() => {
        console.log("mongodb Connected");
    });


app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly, UrlRoute);
app.use("/user",userRoute);
app.use("/", checkAuth, StaticRoute);


app.get("/demo/:getId", async (req, res) => {
    const shortId = req.params.getId;
    const entry = await Url.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitedHistory: {
                timestamp: Date.now()
            }
        }

    })
    console.log(entry)
    res.redirect(entry.redirectUrl);
})

app.listen(port, () => {
    console.log("Server Started Successfully at port 8001")
})