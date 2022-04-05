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
        modules: ['price', 'summaryDetail'] // see the docs for the full list
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

// app.post("/trader", (req, res) => {
//     ticker = req.body.ticker
//     to = req.body.to
//     from = req.body.from
//     period = req.body.period

//     StockTrader.historical(ticker, from, to, period, (data) => {
//         //console.log(StockTrader.Returns(data))
//         // res.send([data.map(a => a.adjClose),StockTrader.Average(data,3)])
//         res.send([StockTrader.Trader(data, 3, 9, -.02), StockTrader.TraderResults(StockTrader.Trader(data, 3, 9, -.02))])
//     })


// })

let port = 3000;

app.listen(port, () => {
    console.log("App Listening on Port:" + port)
})