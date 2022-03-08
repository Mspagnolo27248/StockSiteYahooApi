var yahooFinance = require('yahoo-finance')

class StockTrader {
    constructor() {
        this.yahooFinance = yahooFinance;
    }

    static historical(symbol = 'SPY', from = '2022-01-01', to = '2022-01-10', period = 'd', callback) {
        yahooFinance.historical({
            symbol: symbol,
            from: from,
            to: to,
            period: period // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        }, function (err, data) {
            callback(data)


        });
    }

    static sum = (previousValue, currentValue) => previousValue + currentValue;

//Moving Average
    static Average(data, periods) {
        if (periods < 1) {
            return [-1]
        }

        if (periods >= data.length) {
            var total = 0;
            data.forEach((x) => {
                total += x.adjClose
            })
            return [total / data.length]
        } else {
            var total = 0;
            var values = [];
            for (let i = 0; i < data.length; i++) {
                total += data[i].adjClose
                if (i < periods - 1) {
                    continue
                } else {
                    values.push(total / periods)
                    total -= data[i - (periods - 1)].adjClose
                }
            }
            return values
        }
    }

//Momentum Trader Algo
   static Trader = (data,dip_window, max_window, hurdle) => {
    const dips = this.findTheDips(data,dip_window, hurdle)
    for (let i = 0; i < dips.length; i++) {
        var event = dips[i]
        var max_ = this.findActReturn(data, event,max_window)
        dips[i]["max"] = max_[1]
        dips[i]["days_to_max"] = max_[0][1]
    }
    return dips
}

//Holding Period Returns:(End Period / Begin Period) - 1
    static returns(data){
        let returns = []
        for(const i in data){
            if(i>0){
                returns.push((data[i].adjClose/data[i-1].adjClose)-1)
            }
            else{
                returns.push(0)
            }    
        }
        
        return returns
    }

    //Find The Dips
   static findTheDips = function (data, window=3, hurdle=-.02) {
        var dates =   data.map(a => a.date)
        var returns = this.returns(data)
        const dips = []
        var hurdleReturn = hurdle
        //var minIndex = 0
        for (let i = 0; i < returns.length; i++) {
            var returnOne = returns[i]
            if (i <= (returns.length - window + 1)) {
                var returnTwo = returns[i] + returns[i + 1]
            }
            if (i <= (returns.length - window)) {
                var returnThree = returns[i] + returns[i + 1] + returns[i + 2]
            }
            var returnArray = [returnOne, returnTwo, returnThree]
            var minReturn = Math.min(...returnArray)
            var minReturnIndex = returnArray.indexOf(Math.min(...returnArray));
            var position = i + minReturnIndex
            var event = {
                date: dates[position],
                position: position,
                value: minReturn
            }
            var indicator = (dips.filter(e => e.date === event.date))

            if ((minReturn <= hurdleReturn)) {
                if (indicator.length === 0) {
                    dips.push(event)
                } else {
                    minReturn = Math.min(minReturn, indicator[0].value)
                    event = {
                        date: dates[position],
                        position: position,
                        value: minReturn
                    }
                }

            }

        }

        return dips   // returns {date:'1/1/2022' , postion:47,value:.001}
    }

//Find the Max return post dip.
    static findActReturn = (data, event, window=9) => {
        var returns = this.returns(data)
        var StartPosition = data.findIndex(x => x.date === event.date)
        var valueSpace = returns.slice(StartPosition + 1, StartPosition + 1 + window)
        var maxReturn = 0
        var maxPosition = []
        // short circut if array is empty 
        for (let i = 0; i < valueSpace.length; i++) {
            var subSpace = valueSpace.slice(0, window - i)
            let currentMax = subSpace.reduce(this.sum, 0)
            let currentPostion = [0, window - i]
            if (currentMax > maxReturn) {
                maxReturn = currentMax
                maxPosition = currentPostion

            }
        }
        return [maxPosition, maxReturn]
    }



  
}



module.exports = StockTrader;