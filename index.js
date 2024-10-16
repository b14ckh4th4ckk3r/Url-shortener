const express = require("express");
const UrlRoute = require("./routes/Url")
const Url = require("./models/Url");
const path = require("path")
const StaticRoute = require("./routes/staticRouter")
const { connectMongodb } = require("./connection");
const exp = require("constants");


const app = express();
const port = 8001;

connectMongodb("mongodb://localhost:27017/shortUrl")
    .then(() => {
        console.log("mongodb Connected");
    });


app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/url", UrlRoute);
app.use("/", StaticRoute);
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
    res.redirect(entry.redirectUrl);
})

app.listen(port, () => {
    console.log("Server Started Successfully at port 8001")
})