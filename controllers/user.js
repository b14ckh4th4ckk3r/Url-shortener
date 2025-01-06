const user  = require("../models/user")
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth")
async function handleUserSignup(req,res) {
    const {name, email,password} = req.body
    await user.create({
        name,
        email,
        password,

    })
    return res.render("home")
}

async function handleUserLogin(req,res) {
    const {email,password} = req.body;
    const User = await user.findOne({email,password});
    if(!User) return res.render('login',{
        error: "Invalid Username or Password",  
    });

    const sessionID = uuidv4();
    setUser(sessionID,User);
    res.cookie("uid", sessionID);
    return res.redirect("/")
}
module.exports = {
    handleUserSignup,
    handleUserLogin,

}