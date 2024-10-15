const express = require("express");
const router = express.Router();
const {handleGenerateNewShortUrl} = require('../controllers/Url')

router
    .route("/")
    .post(handleGenerateNewShortUrl);

module.exports = router;