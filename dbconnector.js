// Connect to a mongodb database

const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

function makeconnection(){
    mongoose.connect("mongodb://localhost/test",
        {useUnifiedTopology:true,useNewUrlParser:true}
    ).then(console.log("Connected to database test"))
    .catch((err)=>{
        if (err){ 
            console.log(err)
            throw err;
        }
    });
}

module.exports = {
    makeConnection : makeconnection
};