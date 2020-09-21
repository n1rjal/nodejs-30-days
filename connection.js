const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test",{useUnifiedTopology:true,useNewUrlParser:true})
.then(console.log("Connected to database test"))
.catch(function(err){
    console.log(err);
    throw err;
})

module.exports = mongoose