const express = require("express")
const {handleUserSignup,handleUserLogin} = require("../controllers/user")
const router = express.Router();

router
    .route("/")
    .post(handleUserSignup)
router
    .route("/login")
    .post(handleUserLogin)

module.exports = router;