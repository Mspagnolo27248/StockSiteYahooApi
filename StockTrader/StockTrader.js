
var yahooFinance =  require('yahoo-finance')

class  StockTrader{
    constructor(){
    this.yahooFinance = yahooFinance;
    }
    
    static  historical(symbol='SPY',from='2022-01-01',to='2022-01-10',period='d',callback){
           yahooFinance.historical({
            symbol: symbol,
            from: from,
            to: to,
             period: period // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
          }, function (err, data) {
              callback(data)
               
              
          });
    }
    
    
}
module.exports = StockTrader;