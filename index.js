const express = require("express");
const UrlRoute = require("./routes/Url")
const Url = require("./models/Url");
const app = express();
const { connectMongodb } = require("./connection")


const port = 8001;

connectMongodb("mongodb://localhost:27017/shortUrl")
    .then(() => {
        console.log("mongodb Connected");
    })

app.use(express.json())
app.use("/url", UrlRoute);

app.get("/:getId", async (req, res) => {
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