//Este metodo se encarga de crear la tabla de frecuencia, apartir de la lista de los datos y el numero de intervalos
function makeIntervalsTable(intervals, data){
    let min = Math.min(...data);//Halla el maximo de la lista de datos
    let max = Math.max(...data);//Halla el minimo de la lista de datos
    let diff = (max-min)/intervals;//Calcula la distancia entre cada intervalo
    data.sort(function(a, b) {//Ordena la lista
        return a - b;
    });
    let freccTable = []//Crea el array para almacenar los indices de las frecuencias
    freccTable.push(min+diff);//Coloca como primer elemento, el minimo + la diferencia
    
    for(let i = 1; i<intervals; i++){
        freccTable.push((freccTable[i-1])+diff);//Al indice anterior le suma la diferencia y lo guarda
    }
    let frecc = [];//Crea el array para almacenar la frecuencia
    for (let i = 0; i < intervals; i++) {
        frecc.push(0);//Llena el array de ceros, para poder sumar cada frecuencia
    }

    let dataIndex = 0;//Este index se encarga de recorrer los datos
    for (let i = 0; i <= intervals; i++) {
        while (data[dataIndex]<= freccTable[i]){//Con cada uno de los intervalos se va verificanmdo si son menores para ir sumando, en caso de que no sea se pasa al siguiente
            frecc[i]++;
            dataIndex++;
        }
    }

    let graphicDiv = document.getElementById("graphicDiv");//Recupera el div de la grafica
    graphicDiv.innerHTML = '';//Vacia la grafica en caso de que ya haya sido creada
    graphicDiv.innerHTML = ' <canvas id="grafica"></canvas>';//Prepara el div para colocar la grafica

    makeGraph(freccTable, frecc);
}

//Este metodo es el encargado de crear la grafica, recibiendo como parametros las etiquetas y las frecuencias
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
