// Importamos el árbol de decisión *por defecto*
import { arbolDecision as arbolPorDefecto } from './data.js';

console.log("Juego cargado correctamente. Listo para empezar.");

// ########## VARIABLES GLOBALES ##########
const arbolGuardado = localStorage.getItem('arbolDecisionAprendido');
let arbolDecision = arbolGuardado ? JSON.parse(arbolGuardado) : JSON.parse(JSON.stringify(arbolPorDefecto));

let nodoActual;
let nodoAnterior = null;
let ultimaRespuesta = null;

// ########## REFERENCIAS DEL DOM ##########
const gameContainer = document.getElementById("game-container");
const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const startBtn = document.getElementById("startBtn");
const resultEl = document.getElementById("result");
const characterImage = document.getElementById("characterImage");
// --- ¡CORRECCIÓN! Referencia al botón de restaurar ---
const resetBtn = document.getElementById("resetBtn");

// ########## EVENTOS ##########
startBtn.addEventListener("click", iniciarJuego);
yesBtn.addEventListener("click", () => responder(true));
noBtn.addEventListener("click", () => responder(false));
// --- ¡CORRECCIÓN! Evento para el botón de restaurar ---
resetBtn.addEventListener("click", restaurarConocimiento);

// Ocultamos elementos al principio
gameContainer.style.display = 'none';
resultEl.style.display = 'none';
characterImage.style.display = 'none';
// Mostramos el botón de restaurar solo si hay conocimiento guardado
resetBtn.style.display = arbolGuardado ? 'block' : 'none';

// ########## FUNCIONES DEL JUEGO ##########

function iniciarJuego() {
  console.log("Iniciando una nueva partida...");

  nodoAnterior = null;
  ultimaRespuesta = null;
  nodoActual = arbolDecision;

  startBtn.textContent = "Reiniciar Juego";
  gameContainer.style.display = 'block';
  resultEl.style.display = 'none';
  characterImage.style.display = 'none';

  hacerPregunta();
}

function responder(respuesta) {
  if (!nodoActual) return;

  if (!nodoActual.pregunta && nodoActual.personaje) {
    if (respuesta) {
      mostrarResultadoFinal(nodoActual);
    } else {
      iniciarAprendizaje(nodoActual);
    }
    return;
  }

  const siguienteNodoKey = respuesta ? 'si' : 'no';

  if (nodoActual[siguienteNodoKey]) {
    nodoAnterior = nodoActual;
    ultimaRespuesta = siguienteNodoKey;
    nodoActual = nodoActual[siguienteNodoKey];
    hacerPregunta();
  } else {
    alert("¡Uy! Me perdí en mi propio árbol de decisión.");
  }
}

function hacerPregunta() {
  if (nodoActual.pregunta) {
    questionEl.textContent = nodoActual.pregunta;
  } else if (nodoActual.personaje) {
    questionEl.textContent = `¡Ya lo tengo! ¿Tu personaje es... ${nodoActual.personaje}?`;
  }
}

function mostrarResultadoFinal(resultado) {
  console.log("¡Juego terminado! Resultado:", resultado.personaje);

  gameContainer.style.display = 'none';

  resultEl.style.display = 'block';
  resultEl.textContent = `¡Ya lo tengo! Tu personaje es... ${resultado.personaje}`;

  if (resultado.img) {
    characterImage.src = resultado.img;
    characterImage.alt = resultado.personaje;
    characterImage.style.display = 'block';
  }
}

/**
 * Borra el conocimiento aprendido del localStorage y recarga la página.
 */
function restaurarConocimiento() {
  if (confirm("¿Estás seguro de que quieres borrar todo lo que ha aprendido el juego? Volverá al conocimiento original.")) {
    localStorage.removeItem('arbolDecisionAprendido');
    alert("¡Conocimiento borrado! El juego se reiniciará.");
    location.reload(); // Recarga la página para que se cargue el árbol por defecto
  }
}

/**
 * Inicia el proceso de aprendizaje cuando el juego falla.
 */
function iniciarAprendizaje(nodoFallido) {
  const personajeAdivinado = nodoFallido.personaje;

  gameContainer.style.display = 'none';
  resultEl.style.display = 'block';

  // 1. Preguntar el personaje correcto
  resultEl.textContent = `¡Oh, no! Fallé.`;
  const personajeCorrecto = prompt(`¡Fallé! ¿En qué personaje estabas pensando?`);

  if (!personajeCorrecto) {
    iniciarJuego();
    return;
  }

  // 1.5. Preguntar la URL de la imagen
  const nuevaImagenUrl = prompt(`¡OK! Para "${personajeCorrecto}", pega una URL de imagen (si la tienes). Si lo dejas vacío, no se mostrará imagen.`);

  // 2. Preguntar la pregunta diferenciadora
  const nuevaPregunta = prompt(`OK. Dame una pregunta (Sí/No) que diferencie a "${personajeCorrecto}" de "${personajeAdivinado}".`);

  if (!nuevaPregunta) {
    iniciarJuego();
    return;
  }

  // 3. Preguntar la respuesta para el NUEVO personaje
  const respuestaParaNuevo = confirm(`Para "${personajeCorrecto}", ¿la respuesta a "${nuevaPregunta}" es "Sí"?\n\n(Presiona "Aceptar" para SÍ, "Cancelar" para NO)`);

  // 4. Guardamos los datos del personaje antiguo
  const nodoPersonajeAntiguo = JSON.parse(JSON.stringify(nodoFallido));

  // 5. Creamos el nodo para el personaje nuevo
  const nodoPersonajeNuevo = {
    personaje: personajeCorrecto,
    img: nuevaImagenUrl || "" // Guarda la URL o una cadena vacía
  };

  // 6. Obtenemos el nodo que vamos a *reemplazar*.
  const nodoAModificar = nodoAnterior ? nodoAnterior[ultimaRespuesta] : arbolDecision;

  // 7. Limpiamos el nodo actual y lo convertimos en un nodo de PREGUNTA
  delete nodoAModificar.personaje;
  delete nodoAModificar.img;
  nodoAModificar.pregunta = nuevaPregunta;

  // 8. Asignamos los personajes (antiguo y nuevo) a las ramas correctas
  if (respuestaParaNuevo) {
    nodoAModificar.si = nodoPersonajeNuevo;
    nodoAModificar.no = nodoPersonajeAntiguo;
  } else {
    nodoAModificar.si = nodoPersonajeAntiguo;
    nodoAModificar.no = nodoPersonajeNuevo;
  }

  // 9. Guardamos el árbol aprendido en el localStorage
  localStorage.setItem('arbolDecisionAprendido', JSON.stringify(arbolDecision));

  // 10. Informar al usuario y reiniciar
  alert("¡Gracias! He aprendido algo nuevo. El juego se reiniciará para usar el nuevo conocimiento.");
  location.reload();
}