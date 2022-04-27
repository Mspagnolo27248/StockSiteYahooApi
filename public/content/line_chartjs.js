
debugger

var serverData = JSON.parse(myData)


var labels = serverData.map(a=> a.date.substring(0,10)).reverse()
var dataPoints =  serverData.map(a=>Math.round(a.adjClose)).reverse()


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
      label: undefined,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: dataPoints,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {responsive:true,
        maintainAspectRatio: false,
        plugins: {
          title: {
              display: true,
              text: serverData[0].symbol.toUpperCase()
            },
            legend: {
              display: false
            }}}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );