//Define todas la entradas, y en donde guardarlas
let inputX0 = document.getElementById("inputX0");
let inputc = document.getElementById("inputc");
let inputk = document.getElementById("inputk");
let inputm = document.getElementById("inputm");

//Se encarga de que se vaya calculado en tiempo real los outputs
inputm.addEventListener("input", function () {
  let inputValue = inputm.value;
  document.getElementById("outputm").innerHTML = 2 ** parseInt(inputValue);
});
inputk.addEventListener("input", function () {
  let inputValue = inputk.value;
  document.getElementById("outputk").innerHTML = 1 + 2 * parseInt(inputValue);
});
inputc.addEventListener("input", function () {
  let inputValue = inputc.value;
  document.getElementById("outputc").innerHTML = inputValue;
});
inputX0.addEventListener("input", function () {
  let inputValue = inputX0.value;
  document.getElementById("outputX0").innerHTML = inputValue;
});

//Define el boton de calcular y le conencta la funcion
let calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", calculateTable);

//Define los arrays globales para poderlos usar a lo largo del codigo
let RiArray = [];
let NiArray = [];

//Este metodo se encarga aparir de los datos generados con las formulas de las entradas crear la tabla de las iteraciones
function calculateTable() {
  let x0 = parseInt(document.getElementById("outputX0").innerHTML);
  let a = parseInt(document.getElementById("outputk").innerHTML);
  let c = parseInt(document.getElementById("outputc").innerHTML);
  let m = parseInt(document.getElementById("outputm").innerHTML);

  let iteraciones = parseInt(document.getElementById("iteraciones").value);

  let min = parseInt(document.getElementById("min-value").value);
  let max = parseInt(document.getElementById("max-value").value);

  let table = [];//Corresponde a la tabla de las iteraciones
  let xi = x0;
  NiArray = [];//Vacia los arrays en caso de que ya se haya ejecutado el metodo
  RiArray = [];
  for (let i = 0; i < iteraciones; i++) {
    xi = calculateXi(xi, a, c, m);
    ri = calculateRi(xi, m);
    ni = calculateNi(min, max, ri);
    NiArray.push(ni);
    RiArray.push(ri);
    table.push([i + 1, xi, ri, ni]);//Guarda todo en la tabla de las iteraciones
  }
  loadTable(table);
}
//Calcula en Ni
function calculateNi(min, max, ri) {
  return min + (max - min) * ri;
}
//Calcula en Ri
function calculateRi(xi, m) {
  return xi / (m - 1);
}
//Calcula en Xi
function calculateXi(xi, a, c, m) {
  return (a * xi + c) % m;
}

//Este metodo se encarga de crear la tabla que contiene la iteracion, el Xi, el re y el ni
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

//En esta parte se definen los elementos de la grafica
let modal = document.getElementById("myModal");//Contenedor de la grafica
let span = document.getElementsByClassName("close")[0];//Boton de cerrar

//Se define el boton de graficar Ri y el metodo para la grafica
let graficar_Ri = document.getElementById("Graficar_Ri");
graficar_Ri.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iteraciones").value);
  makeIntervalsTable(ranges/5, RiArray);//Este metodo se encarga de crear la tabla de frecuencia en los intervalos
  modal.style.display = "block";//Aqui se muestra la grafica
}

//Se define el boton de graficar Ni y el metodo para la grafica
let graficar_Ni = document.getElementById("Graficar_Ni");
graficar_Ni.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iteraciones").value);
  makeIntervalsTable(ranges/5, NiArray);//Este metodo se encarga de crear la tabla de frecuencia en los intervalos
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

