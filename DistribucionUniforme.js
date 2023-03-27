//Define las entradas
let max_value = document.getElementById("max-value");
let min_value = document.getElementById("min-value");
let iterations = document.getElementById("iterations");
let calculateBtn = document.getElementById("miBoton");

//Define los arrays globales para poderlos usar a lo largo del codigo
let riArray = [];
let niArray = [];
//Define el metodo del boton de calcular
calculateBtn.onclick = function () {
  riArray = [];
  niArray = [];
  uniformDistribution(Number.parseInt(iterations.value), Number.parseInt(max_value.value), Number.parseInt(min_value.value));
  makeTable();
};

//Este metodo se encarga de generar los datos para ni y ri
function uniformDistribution(numSamples, max, min) {
  for (var i = 0; i < numSamples; i++) {
    var x = Math.random(); // Genera número aleatorio uniforme entre 0 y 1
    riArray.push(x); // Agrega el número generado a la distribución
    niArray.push(min + (max - min) * x);
  }
}

//Este metodo se encarga de crear la tabla que contiene la iteracion, el ri y el ni
function makeTable() {
  let tabla = document.getElementById("tablas");
  tabla.innerHTML = "";
  tabla.innerHTML =
    '<table id="tablaUno"><thead><tr><th>i</th><th>ri</th><th>ni</th></tr></thead><tbody></tbody></table>';
  let tablaBody = document.getElementById("tablaUno");
  for (let i = 0; i < riArray.length; i++) {
    let fila = document.createElement("tr");
    let iColumn = document.createElement("td");
    iColumn.textContent = i+1;
    fila.appendChild(iColumn);
    let riColumn = document.createElement("td");
    riColumn.textContent = riArray[i];
    fila.appendChild(riColumn);
    let niColumn = document.createElement("td");
    niColumn.textContent = niArray[i];
    fila.appendChild(niColumn);
    tablaBody.appendChild(fila);
  }
}

//En esta parte se definen los elementos de la grafica
let modal = document.getElementById("myModal");//Contenedor de la grafica
let span = document.getElementsByClassName("close")[0];//Boton de cerrar

//Se define el boton de graficar Ri y el metodo para la grafica
let graficar_Ri = document.getElementById("Graficar_Ri");
graficar_Ri.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iterations").value);
  makeIntervalsTable(ranges/30, riArray);//Este metodo se encarga de crear la tabla de frecuencia en los intervalos
  modal.style.display = "block";//Aqui se muestra la grafica
}

//Se define el boton de graficar Ni y el metodo para la grafica
let graficar_Ni = document.getElementById("Graficar_Ni");
graficar_Ni.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iterations").value);
  makeIntervalsTable(ranges/30, niArray);//Este metodo se encarga de crear la tabla de frecuencia en los intervalos
  modal.style.display = "block";//Aqui se muestra la grafica
}

//Este metodo el boton de cerrar oculta la grafica
span.onclick = function() {
  modal.style.display = "none";
}

//Este metodo el boton de cerrar oculta la grafica cuando se clickea fuera de ella
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


