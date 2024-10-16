const Url = require("../models/Url");
const shortid = require("shortid");



async function handleGenerateNewShortUrl(req,res) {
    const body  = req.body;
    console.log(body)
    if(!body.url) return res.status(400).json({msg: "Url is required"});
    const shortId = shortid()
    await Url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitedHistory: [],

    })
    return res.render("home",{id: shortId})
}


async function handleGetAnalytics(req,res) {
    const  shortId = req.params.shortId;
    const result= await Url.findOne({shortId})
    return res.json({
        TotalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory,
    })
}
module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}