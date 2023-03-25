let max_value = document.getElementById("max-value");
let min_value = document.getElementById("min-value");
let iterations = document.getElementById("iterations");

let calculateBtn = document.getElementById("miBoton");

let riArray = [];
let niArray = [];
calculateBtn.onclick = function () {
  riArray = [];
  niArray = [];
  uniformDistribution(Number.parseInt(iterations.value), Number.parseInt(max_value.value), Number.parseInt(min_value.value));
  makeTable();
};

function uniformDistribution(numSamples, max, min) {
  for (var i = 0; i < numSamples; i++) {
    var x = Math.random(); // Genera número aleatorio uniforme entre 0 y 1
    riArray.push(x); // Agrega el número generado a la distribución
    niArray.push(min + (max - min) * x);
  }
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

let graficar_Ri = document.getElementById("Graficar_Ri");
graficar_Ri.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iterations").value);
  makeIntervalsTable(ranges/50, riArray);
  modal.style.display = "block";
}

let graficar_Ni = document.getElementById("Graficar_Ni");
graficar_Ni.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iterations").value);
  makeIntervalsTable(ranges/50, niArray);
  modal.style.display = "block";
}

span.onclick = function() {
  console.log("oe");
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
