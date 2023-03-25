let calculateBtn = document.getElementById("miBoton");
let mean = document.getElementById("mean");
let desviation = document.getElementById("desviation");
let iterations = document.getElementById("iterations");


let riArray = [];
let niArray = [];

calculateBtn.onclick = function(){
    riArray = [];
    niArray = [];
    normalDistribution(Number.parseFloat(desviation.value), Number.parseInt(iterations.value), Number.parseInt(mean.value));
}

function normalDistribution(stdDev, numSamples, mean) {
    for (var i = 0; i < numSamples; i++) {
      var u = Math.random(); // Genera número aleatorio uniforme entre 0 y 1
      var v = Math.random(); // Genera número aleatorio uniforme entre 0 y 1
      var x = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); // Transformación de Box-Muller para generar número aleatorio normal
      riArray.push(x * stdDev); // Agrega el número generado a la distribución, multiplicado por la desviación estándar
      niArray.push(mean + (x * stdDev)); // Agrega el número generado a la distribución, multiplicado por la desviación estándar
    }console.log(riArray);
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

  