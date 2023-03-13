let inputX0 = document.getElementById("inputX0");
let inputc = document.getElementById("inputc");
let inputk = document.getElementById("inputk");
let inputm = document.getElementById("inputm");

inputm.addEventListener("input", function () {
  var inputValue = inputm.value;
  document.getElementById("outputm").innerHTML = 2 ** parseInt(inputValue);
});
inputk.addEventListener("input", function () {
  var inputValue = inputk.value;
  document.getElementById("outputk").innerHTML = 1 + 2 * parseInt(inputValue);
});
inputc.addEventListener("input", function () {
  var inputValue = inputc.value;
  document.getElementById("outputc").innerHTML = inputValue;
});
inputX0.addEventListener("input", function () {
  var inputValue = inputX0.value;
  document.getElementById("outputX0").innerHTML = inputValue;
});

let calculateButton = document.getElementById("calculateButton");

calculateButton.addEventListener("click", calculateTable);

let RiArray = [];
let NiArray = [];

function calculateTable() {
  let x0 = parseInt(document.getElementById("outputX0").innerHTML);
  let a = parseInt(document.getElementById("outputk").innerHTML);
  let c = parseInt(document.getElementById("outputc").innerHTML);
  let m = parseInt(document.getElementById("outputm").innerHTML);

  let iteraciones = parseInt(document.getElementById("iteraciones").value);

  let min = parseInt(document.getElementById("min-value").value);
  let max = parseInt(document.getElementById("max-value").value);

  let table = [];
  let xi = x0;
  NiArray = [];
  RiArray = [];
  for (let i = 0; i < iteraciones; i++) {
    xi = calculateXi(xi, a, c, m);
    ri = calculateRi(xi, m);
    ni = calculateNi(min, max, ri);
    NiArray.push(ni);
    RiArray.push(ri);
    table.push([i + 1, xi, ri, ni]);
  }
  loadTable(table);
}
function calculateNi(min, max, ri) {
  return min + (max - min) * ri;
}
function calculateRi(xi, m) {
  return xi / (m - 1);
}
function calculateXi(xi, a, c, m) {
  return (a * xi + c) % m;
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

let exportRiButton = document.getElementById("ExportRi")
exportRiButton.addEventListener("click", exportRi)

function exportRi(){
  navigator.clipboard.writeText(RiArray.toString());
  alert("Copiado en el portapapeles Ri!!")
}

let exportNiButton = document.getElementById("ExportNi")
exportNiButton.addEventListener("click", exportNi)

function exportNi(){
  navigator.clipboard.writeText(NiArray.toString());
  alert("Copiado en el portapapeles Ni!!")
}