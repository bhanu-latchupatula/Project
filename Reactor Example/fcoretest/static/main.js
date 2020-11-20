const red = 'rgb(255, 99, 132)'; // red
const blue = 'rgb(54, 162, 235)'; // blue
const chart1 = document.getElementById('box-2').getContext('2d');
const chart2 = document.getElementById('box-3').getContext('2d');

$('#submit').click(function () { 
    const flow_inlet = $('#flow_inlet')
    const heat_inlet = $('#heat_inlet')
    const initial_level = $('#initial_level')
    const iterations = $('#iterations')

    let entry = {
        flow_inlet: flow_inlet.val(),
        heat_inlet: heat_inlet.val(),
        initial_level: initial_level.val(),
        iterations: iterations.val()
    }
    // console.log(entry);
    fetch(`${window.origin}/process-entry`, {
        method: "POST",
        body: JSON.stringify(entry),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json",
        })
    })
    .then(function (res) {
        if (res.status !== 200) {
            console.log(`Response is not 200: ${res.status}`);
            return;
        }
        
        res.json().then(function (val) {
            chart = new Chart(chart1, {
                type: 'line',
                data: {
                    labels: val.time,
                    datasets: [{
                        backgroundColor: red,
                        borderColor: red,
                        data: val.liquid_level,
                        fill: false,
                        label: 'Liquid level'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        ticks: {
                            stepSize: 15
                        },
                        yAxes: [{
                            display: true,
                            labelString: "Liquid Level",
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Time"
                            }
                        }]
                    }
                }
            });
            chart = new Chart(chart2, {
                type: 'line',
                data: {
                    labels: val.time,
                    datasets: [{
                        backgroundColor: blue,
                        borderColor: blue,
                        data: val.temperature,
                        fill: false,
                        label: 'Temperature'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        ticks: {
                            stepSize: 15
                        },
                        yAxes: [{
                            display: true,
                            labelString: "Temperature",
                            ticks: {
                                beginAtZero: false
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Time"
                            }
                        }]
                    }
                }  
            });
        });   
    });
});    