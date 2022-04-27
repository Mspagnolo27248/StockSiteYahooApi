const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const StockTrader = require('./StockTrader/StockTrader')
var yahooFinance = require('yahoo-finance')


app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("page.ejs")

})

app.post("/", (req, res) => {
    const ticker = req.body.ticker
    yahooFinance.quote({
        symbol: ticker,
        modules: ['price', 'summaryDetail','defaultKeyStatistics'] // see the docs for the full list
    }, function (err, quotes) {
        if (err) {
            res.redirect("/")
        } else {
            res.render("home.ejs", {
                quotes: quotes,
                ticker: ticker
            })
        }

    })

});



app.get("/Stocktrader",(req,res)=>{
    res.render("stocktrader.ejs",{
        quotes: "",
        ticker: "",
        results:"",
        tbl:""
    })
})

app.post("/Stocktrader", (req, res) => {
    const ticker = req.body.ticker
    const from = req.body.from
    const to = req.body.to
    const period = req.body.period
    yahooFinance.historical({
        symbol: ticker,
        from:from,
        to:to,
        period:period // see the docs for the full list
    }, function (err, quotes) {
        if (err) {
            res.redirect("/stocktrader")
        } else {


            var results = StockTrader.Trader(quotes,3,9,-.02)
            var tbl = StockTrader.TraderResults(results);
            
            res.render("stocktrader.ejs", {
                quotes: quotes,
                ticker: ticker,
                results:results,
                tbl:tbl
            })
        }

    })

});



app.get("/Historical",(req,res)=>{
    res.render("historical.ejs",{
        quotes: "",
        ticker: "",
     
    })
})

app.post("/Historical", (req, res) => {
    const ticker = req.body.ticker
    const from = req.body.from
    const to = req.body.to
    const period = req.body.period
    yahooFinance.historical({
        symbol: ticker,
        from:from,
        to:to,
        period:period // see the docs for the full list
    }, function (err, quotes) {
        if (err) {
            res.redirect("/historical")
        } else {


           
            res.render("historical.ejs", {
                quotes: quotes,
                ticker: ticker,
               
            })
        }

    })

});



app.get("/Data",(req,res)=>{
    res.render("data.ejs",{
        quotes: "",
        ticker: "",
     
    })
})

app.post("/Data", (req, res) => {
    const ticker = req.body.ticker
    const from = req.body.from
    const to = req.body.to
    const period = req.body.period
    yahooFinance.historical({
        symbol: ticker,
        from:from,
        to:to,
        period:period // see the docs for the full list
    }, function (err, quotes) {
        if (err) {
            res.redirect("/data")
        } else {


           
            res.render("data.ejs", {
                quotes: quotes,
                ticker: ticker,
               
            })
        }

    })

});



app.get("/sandbox",(req,res)=>{
    res.render("sandbox.ejs",{
        quotes: "",
        ticker: "",
     
    })
})

app.post("/sandbox", (req, res) => {
    const ticker = req.body.ticker
    const from = req.body.from
    const to = req.body.to
    const period = req.body.period
    yahooFinance.historical({
        symbol: ticker,
        from:from,
        to:to,
        period:period // see the docs for the full list
    }, function (err, quotes) {
        if (err) {
            res.redirect("/sandbox")
        } else {


           
            res.render("sandbox.ejs", {
                quotes: quotes,
                ticker: ticker,
               
            })
        }

    })

});


let port = process.env.PORT;
if(port==null||port==""){
    port = 3000;
}

app.listen(port, () => {
    console.log("App Listening on Port:" + port)
})