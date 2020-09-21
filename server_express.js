// Server from day 1 converted into express

const express = require("express");

app = express()
app.set(express.static(__dirname))
app.get("/",function(req,res){
    res.send("Hello World !");
})

app.get("/json",function(req,res){
    res.send({"msg":"Hello World"});
})

app.get("/html",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.listen(3000,"127.0.0.1",function(err){
    if (err) throw err;
    console.log("Listening to ",3000);
})