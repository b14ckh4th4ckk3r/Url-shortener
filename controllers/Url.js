const Url = require("../models/Url");
const shortid = require("shortid");



async function handleGenerateNewShortUrl(req,res) {
    const body  = req.body;
    if(!body.url) return res.status(400).json({msg: "Url is required"});
    const shortId = shortid()
    await Url.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitedHistory: [],

    })
    return res.json({id: shortId})
}

module.exports = {
    handleGenerateNewShortUrl,
}