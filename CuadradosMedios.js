//Definimos el boton de calcualr y le asociamos el metodo principal
let miBoton = document.getElementById("miBoton");
miBoton.addEventListener("click", runMethod);

let Ri = [];
let Ni = [];

//Este metodo, crea la tabla vacia en el html, y obitiene las entradas del metodo
function runMethod() {
  let tablas = document.getElementById("tablas");
  tablas.innerHTML =
    '<table id="tablaOne">  <thead> <tr> <th>i</th> <th>Xi</th> <th>Xi^2</th> <th>Extencion</th> <th>Extraccion</th> <th>Ri</th> </tr> </thead> <tbody> </tbody> </table>';
  let Xi = document.getElementById("seed").value;
  let iterations = document.getElementById("iterations").value;
  let minimo = +document.getElementById("min-value").value;
  let maximo = +document.getElementById("max-value").value;
  const tabla = document
    .getElementById("tablaOne")
    .getElementsByTagName("tbody")[0];
  tabla.innerHTML = "";//Limpia la tabla si tenia una ejecucion anterior
  Ri = [];//Limpia el array de Ri si tenia una ejecucion anterior
  let iterationsList = [];
  for (let i = 0; i < iterations; i++) {
    iterationsList.push(makeIteration(Xi));//Guarda en en el array de iteraciones el array de la fila correspondinte al Ri
    tabla.appendChild(pushInTable(i, iterationsList));//Coloca la fila en la tabla del html
    Ri.push(iterationsList[iterationsList.length - 1][4]);
    Xi = iterationsList[iterationsList.length - 1][3];
  }
  if (minimo != 0 && maximo != 0) {
    Ni = calculateNi(Ri, minimo, maximo);//LLena el array de Ni
    makeNiTable();//Crea la tabla en el html de el Ni
  }
}

//Calcula el Ni, tiene como entrada el maximo, el minimo y Ri
function calculateNi(Ri, min, max) {
  Ni = [];
  Ri.forEach((element) => {
    Ni.push(min + (max - min) * element);//Lo guarda en el array de Ni
  });
  return Ni;
}

//Este metodo, tiene como entrada el Xi, y con este se encarga de realizar la fila correspondiente
function makeIteration(Xi) {
  let square = Xi ** 2;
  let extension = String(square).length;
  let extaction;
  switch (extension) {
    case 8:
      extaction = String(square).substring(2, 6);
      break;
    case 7:
      extaction = String(square).substring(1, 5);
      break;
    case 6:
      extaction = String(square).substring(1, 5);
      break;
    case 5:
      extaction = String(square).substring(0, 4);
      break;
    case 4:
      extaction = String(square).substring(0, 4);
      break;
  }
  return [Xi, square, extension, +extaction, +(extaction * 0.0001).toFixed(4)];
}

//Construye la tabla de Ni en el html
function makeNiTable() {
  let tablas = document.getElementById("tablas");
  tablas.innerHTML +=
    '<table id="tablaTwo"><thead><tr><th>Ni</th></tr></thead><tbody></tbody></table>';
  let tabla = document
    .getElementById("tablaTwo")
    .getElementsByTagName("tbody")[0];
  Ni.forEach((element) => {
    const fila = document.createElement("tr");
    const niColumn = document.createElement("td");
    niColumn.textContent = element.toFixed(4);
    fila.appendChild(niColumn);
    tabla.appendChild(fila);
  });
}

//Este metodo se encarga de crear la tabla que cotnien la iteracion, el Xi, el Xi al cuadrado, la extencion, la extraccion y el Ri
function pushInTable(i, iterationsList) {
  const fila = document.createElement("tr");

  const iColumn = document.createElement("td");
  iColumn.textContent = i;
  fila.appendChild(iColumn);

  const xiColumn = document.createElement("td");
  xiColumn.textContent = iterationsList[iterationsList.length - 1][0];
  fila.appendChild(xiColumn);

  const x2Column = document.createElement("td");
  x2Column.textContent = iterationsList[iterationsList.length - 1][1];
  fila.appendChild(x2Column);

  const extensionColumn = document.createElement("td");
  extensionColumn.textContent = iterationsList[iterationsList.length - 1][2];
  fila.appendChild(extensionColumn);

  const extractionColumn = document.createElement("td");
  extractionColumn.textContent = iterationsList[iterationsList.length - 1][3];
  fila.appendChild(extractionColumn);

  const riColumn = document.createElement("td");
  riColumn.textContent = iterationsList[iterationsList.length - 1][4];
  fila.appendChild(riColumn);

  return fila;
}




//En esta parte se definen los elementos de la grafica
let modal = document.getElementById("myModal");//Contenedor de la grafica
let span = document.getElementsByClassName("close")[0];//Boton de cerrar

//Se define el boton de graficar Ri y el metodo para la grafica
let graficar_Ri = document.getElementById("Graficar_Ri");
graficar_Ri.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iterations").value);
  makeIntervalsTable(ranges/5, Ri);//Este metodo se encarga de crear la tabla de frecuencia en los intervalos
  modal.style.display = "block";//Aqui se muestra la grafica
}

//Se define el boton de graficar Ni y el metodo para la grafica
let graficar_Ni = document.getElementById("Graficar_Ni");
graficar_Ni.onclick = function() {
  let ranges = Number.parseInt(document.getElementById("iterations").value);
  makeIntervalsTable(ranges/5, Ni);//Este metodo se encarga de crear la tabla de frecuencia en los intervalos
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