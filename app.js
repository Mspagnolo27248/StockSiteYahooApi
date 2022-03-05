const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser= require('body-parser');

app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("home.ejs")
})

let port = 3000;

app.listen(port,()=>{
    console.log("App Listening on Port:"+port)
})