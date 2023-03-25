let graphicInput = document.getElementById("graphicInput");
let graphicButton = document.getElementById("graphicButton");
let IntervalosInput = document.getElementById("Intervalos");

graphicButton.addEventListener("click", function(){
    let data = (graphicInput.value).split(',');
    let dataAux = [];
    data.forEach(element => {
        dataAux.push(parseFloat(element));
    });
    let intervals = IntervalosInput.value;
    makeIntervalsTable(intervals, dataAux);
});

function makeIntervalsTable(intervals, data){
    let min = Math.min(...data);
    let max = Math.max(...data);
    let diff = (max-min)/intervals;
    data.sort(function(a, b) {
        return a - b;
    });
    let freccTable = []
    freccTable.push(min+diff);
    
    for(let i = 1; i<intervals; i++){
        freccTable.push((freccTable[i-1])+diff);
    }
    let dataIndex = 0;


    let frecc = [];
    for (let i = 0; i < intervals; i++) {
        frecc.push(0);
    }

    for (let i = 0; i <= intervals; i++) {
        while (data[dataIndex]<= freccTable[i]){
            frecc[i]++;
            dataIndex++;
        }
    }

    let graphicDiv = document.getElementById("graphicDiv");
    graphicDiv.innerHTML = '';
    graphicDiv.innerHTML = ' <canvas id="grafica"></canvas>';

    makeGraph(freccTable, frecc);
    //0.0948,0.8987,0.7661,0.6909,0.7342,0.9049,0.8844,0.2163,0.6785,0.0362,0.131,0.7161,0.2799,0.8344,0.6223,0.7257,0.664,0.0896,0.8028,0.4487,0.1331,0.7715,0.5212,0.1649,0.7192,0.7248,0.5335,0.4622,0.3628,0.1623,0.6341,0.2082

}

function makeGraph(labels, frecc){
    let $grafica = document.querySelector("#grafica");
    let datosRandom = {
        label: "Distribucion",
        data: frecc, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        backgroundColor: 'rgba(209, 45, 45, 0.2)', // Color de fondo
        borderColor: 'rgba(220,20,60, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
    }
    new Chart($grafica, {
        type: 'bar',// Tipo de gráfica
        data: {
            labels: labels,
            datasets: [
                datosRandom,
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
            },
        }
    });
}
