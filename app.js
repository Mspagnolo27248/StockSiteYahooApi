const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser= require('body-parser');
const StockTrader = require('./StockTrader/StockTrader')

app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("home.ejs")

})

app.post("/",(req,res)=>{
    ticker = "SPY"
    to = '2022-03-05'
    from = '2022-01-01'
    period='d'
    debugger
     StockTrader.historical(ticker,from,to,period,(data)=>{
        
        res.send(data.map(a => a.adjClose))
    })
  
  
})

let port = 3000;

app.listen(port,()=>{
    console.log("App Listening on Port:"+port)
})