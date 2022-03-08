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
    ticker = req.body.ticker
    to = req.body.to
    from = req.body.from
    period=req.body.period
  
     StockTrader.historical(ticker,from,to,period,(data)=>{
        //console.log(StockTrader.Returns(data))
       // res.send([data.map(a => a.adjClose),StockTrader.Average(data,3)])
       res.send(StockTrader.Trader(data,3,9,-.02))
    })
  
  
})

let port = 3000;

app.listen(port,()=>{
    console.log("App Listening on Port:"+port)
})