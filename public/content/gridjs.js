
var data = JSON.parse(myData)

const output  = []
data.forEach(n=>{output.push([
    n.date.toString().substring(0,15),
    Math.round(n.open*1000)/1000,
    Math.round(n.high*1000)/1000,
    Math.round(n.low*1000)/1000,
    Math.round(n.close*1000)/1000,
    Math.round(n.adjClose*1000)/1000,
   n.volume

])})

new gridjs.Grid({
  columns: ["Date", "Open", "High","Low","Close","Adj Close","Volume","%Chg Prev Day"],
  pagination: {
      limit: 10
    },
    style: {
      td: {
        border: '1px solid #ccc'
      },
      th:{
        "width":"50%"
      },
      table: {
        "width":"100%",
        'padding-left':'200px'     
    },
    container:{'font-size':'10px'}
  } ,
    
    sort: true,
  data: output

}).render(document.getElementById("wrapper"));