const express = require("express");
const URL = require("../models/Url")
const router = express.Router();


router
    .route("/")
    .get(async (req,res)=>{
        if(!req.user) return res.redirect('login');
        const urls = await URL.find({ createdBy: req.user._id});
        return res.render("home",{urls:urls})
    })

router
    .route("/signup")
    .get((req,res)=>{
        res.render("signup")
    })

router
    .route("/login")
    .get((req,res)=>{
        res.render("login")
    })
module.exports = router;