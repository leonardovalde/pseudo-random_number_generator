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
