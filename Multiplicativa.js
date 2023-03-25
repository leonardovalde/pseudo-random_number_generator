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

let niOutput = [];
let riOutput = [];

xoInput.addEventListener("input", function(){
    let xoValue = xoInput.value;
    xoOutput.innerHTML = xoValue;
});

tInput.addEventListener("input", function(){
    let tValue = tInput.value;
    tOutput.innerHTML = 8 * parseInt(tValue) + 3;
});

gInput.addEventListener("input", function(){
    let gValue = gInput.value;
    gOutput.innerHTML = 2**parseInt(gValue);
});

function calculateMethod(){
    let table = [];
    let iteraciones = parseInt(iInput.value);
    let xi = parseInt(xoOutput.innerHTML);
    let t = parseInt(tOutput.innerHTML);
    let g = parseInt(gOutput.innerHTML);
    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);
    riOutput = [];
    niOutput = [];
    for(let i = 0; i < iteraciones; i++){
        xi = calculateXi(xi, t, g);
        let ri = calculateRi(xi, g);
        let ni = calculateNi(min, max, ri);
        riOutput.push(ri);
        niOutput.push(ni);
        table.push([i+1, xi, ri, ni]);
    }
    loadTable(table);
}

function calculateXi(xi, t, g){
    return (t*xi)%g;
}

function calculateRi(xi, g){
    return xi/(g-1);
}

function calculateNi(min, max, ri) {
    return min + (max - min) * ri;
}

function loadTable(table){
    let tableBody = document.getElementById("tablaTwo").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    table.forEach(element => {
        let fila = document.createElement("tr");

        let iteracion = document.createElement("td")
        iteracion.textContent = element[0];
        fila.appendChild(iteracion);

        let xi = document.createElement("td")
        xi.textContent = element[1];
        fila.appendChild(xi);

        let ri = document.createElement("td")
        ri.textContent = element[2];
        fila.appendChild(ri);

        let ni = document.createElement("td")
        ni.textContent = element[3];
        fila.appendChild(ni);

        tableBody.appendChild(fila);
    });
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

let graficar_Ri = document.getElementById("Graficar_Ri");
graficar_Ri.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iteraciones").value);
  makeIntervalsTable(ranges/5, riOutput);
  modal.style.display = "block";
}

let graficar_Ni = document.getElementById("Graficar_Ni");
graficar_Ni.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iteraciones").value);
  makeIntervalsTable(ranges/5, niOutput);
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
