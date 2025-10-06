import { personajes, armas, lugares } from "./data.js";
import { generarHistoria } from "./historia.js";

function elegirAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function resolverCaso() {
  const culpable = elegirAleatorio(personajes);
  const arma = elegirAleatorio(armas);
  const lugar = elegirAleatorio(lugares);
  const historia = generarHistoria(culpable, arma, lugar);

  const resultado = `
    <h2>⚠️ Caso resuelto ⚠️</h2>
    <p>${historia}</p>
    <p><strong>Culpable:</strong> ${culpable}<br>
       <strong>Arma:</strong> ${arma}<br>
       <strong>Lugar:</strong> ${lugar}</p>
  `;
  
  document.getElementById("resultado").innerHTML = resultado;
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnResolver");
  boton.addEventListener("click", resolverCaso);
});
