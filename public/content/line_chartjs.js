
debugger

var serverData = JSON.parse(myData)


var labels = serverData.map(a=>a.date.toString().substring(0,15))
var dataPoints =  serverData.map(a=>Math.round(a.adjClose))


// const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//   ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Price',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: dataPoints,
    }]
  };

  const config = {
    type: 'line',
    data: dataPoints,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );