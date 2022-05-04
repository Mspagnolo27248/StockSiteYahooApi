const BlackScholes = require('./BlackScholes')


const  price = BlackScholes.callPrice(405,.30,425,"5/17/2022")

console.log(price)