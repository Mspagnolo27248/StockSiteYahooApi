

var data = JSON.parse(myData)
var x_axis = data.map(a => a.date.toString().substring(0,10))
var y_axis = data.map(a => a.close)

const ctx = $('#myChart');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: x_axis,
        datasets: [{
            label: 'Stock',
            data:y_axis 
        }],
        options:[{
            responsive: true,
            maintainAspectRatio: false

        }]
    }
    
});

