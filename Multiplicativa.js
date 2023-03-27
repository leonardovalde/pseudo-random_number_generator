//Define todas la entradas, y en donde guardarlas
let xoInput = document.getElementById("inputX0");
let xoOutput = document.getElementById("outputX0");
let tInput = document.getElementById("inputT");
let tOutput = document.getElementById("outputT");
let gInput = document.getElementById("inputG");
let gOutput = document.getElementById("outputG");

let iInput = document.getElementById("iteraciones");
let minInput = document.getElementById("min-value");
let maxInput = document.getElementById("max-value");
let calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", calculateMethod);

//Define los arrays globales para poderlos usar a lo largo del codigo
let niOutput = [];
let riOutput = [];

//Se encarga de que se vaya calculado en tiempo real los outputs
xoInput.addEventListener("input", function () {
  let xoValue = xoInput.value;
  xoOutput.innerHTML = xoValue;
});

tInput.addEventListener("input", function () {
  let tValue = tInput.value;
  tOutput.innerHTML = 8 * parseInt(tValue) + 3;
});

gInput.addEventListener("input", function () {
  let gValue = gInput.value;
  gOutput.innerHTML = 2 ** parseInt(gValue);
});

//Este metodo se encarga aparir de los datos generados con las formulas de las entradas crear la tabla de las iteraciones
function calculateMethod() {
  let table = [];
  let iteraciones = parseInt(iInput.value);
  let xi = parseInt(xoOutput.innerHTML);
  let t = parseInt(tOutput.innerHTML);
  let g = parseInt(gOutput.innerHTML);
  let min = parseInt(minInput.value);
  let max = parseInt(maxInput.value);
  riOutput = []; //Vacia los arrays en caso de que ya se haya ejecutado el metodo
  niOutput = [];
  for (let i = 0; i < iteraciones; i++) {
    xi = calculateXi(xi, t, g);
    let ri = calculateRi(xi, g);
    let ni = calculateNi(min, max, ri);
    riOutput.push(ri);
    niOutput.push(ni);
    table.push([i + 1, xi, ri, ni]); //Guarda todo en la tabla de las iteraciones
  }
  loadTable(table);
}
//Calcula en Xi
function calculateXi(xi, t, g) {
  return (t * xi) % g;
}
//Calcula en Ri
function calculateRi(xi, g) {
  return xi / (g - 1);
}
//Calcula en Ni
function calculateNi(min, max, ri) {
  return min + (max - min) * ri;
}
//Este metodo se encarga de crear la tabla que contiene la iteracion, el Xi, el re y el ni
function loadTable(table) {
  let tableBody = document
    .getElementById("tablaTwo")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  table.forEach((element) => {
    let fila = document.createElement("tr");

    let iteracion = document.createElement("td");
    iteracion.textContent = element[0];
    fila.appendChild(iteracion);

    let xi = document.createElement("td");
    xi.textContent = element[1];
    fila.appendChild(xi);

    let ri = document.createElement("td");
    ri.textContent = element[2];
    fila.appendChild(ri);

    let ni = document.createElement("td");
    ni.textContent = element[3];
    fila.appendChild(ni);

    tableBody.appendChild(fila);
  });
}

//En esta parte se definen los elementos de la grafica
let modal = document.getElementById("myModal"); //Contenedor de la grafica
let span = document.getElementsByClassName("close")[0]; //Boton de cerrar

//Se define el boton de graficar Ri y el metodo para la grafica
let graficar_Ri = document.getElementById("Graficar_Ri");
graficar_Ri.onclick = function () {
  let ranges = Number.parseInt(document.getElementById("iteraciones").value);
  makeIntervalsTable(ranges / 5, riOutput); //Este metodo se encarga de crear la tabla de frecuencia en los intervalos
  modal.style.display = "block"; //Aqui se muestra la grafica
};

//Se define el boton de graficar Ni y el metodo para la grafica
let graficar_Ni = document.getElementById("Graficar_Ni");
graficar_Ni.onclick = function () {
  let ranges = Number.parseInt(document.getElementById("iteraciones").value);
  makeIntervalsTable(ranges / 5, niOutput); //Este metodo se encarga de crear la tabla de frecuencia en los intervalos
  modal.style.display = "block"; //Aqui se muestra la grafica
};
//Este metodo el boton de cerrar oculta la grafica
span.onclick = function () {
  modal.style.display = "none";
};

//Este metodo el boton de cerrar oculta la grafica cuando se clickea fuera de ella
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
