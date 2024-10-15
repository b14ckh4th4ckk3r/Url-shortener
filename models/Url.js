const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl:{
        type: String,
        required: true,
    },
    visitedHistory:[
        {timestamp:{type: Number}},
    ],

},{timestamp:true});


const URL = mongoose.model("url",urlSchema);

module.exports = URL;