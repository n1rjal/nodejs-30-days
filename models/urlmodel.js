const mongoose = require("mongoose");
const {Schema} = mongoose;
const {model}  = mongoose; 

modelSchema  = new Schema({
    //long Url
    url : {
        type : String,
        required : true,
        unique : true,
    }
})

urlModel = new model("Url",modelSchema)

module.exports = urlModel;