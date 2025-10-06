console.log("Juego cargado correctamente.");

// Variables globales
let personajes = [ { nombre:"Homer", hombre:true, peloAmarillo:true, gafas:false, nino:false, springfield:true, bigote:true, principal:true },
  { nombre:"Marge", hombre:false, peloAmarillo:true, gafas:false, nino:false, springfield:true, bigote:false, principal:true },
  { nombre:"Bart", hombre:true, peloAmarillo:true, gafas:false, nino:true, springfield:true, bigote:false, principal:true },
  { nombre:"Lisa", hombre:false, peloAmarillo:true, gafas:false, nino:true, springfield:true, bigote:false, principal:true },
  { nombre:"Maggie", hombre:false, peloAmarillo:true, gafas:false, nino:true, springfield:true, bigote:false, principal:true },
  { nombre:"Ned Flanders", hombre:true, peloAmarillo:true, gafas:true, nino:false, springfield:true, bigote:true, principal:false },
  { nombre:"Milhouse", hombre:true, peloAmarillo:true, gafas:true, nino:true, springfield:true, bigote:false, principal:false },
  { nombre:"Krusty", hombre:true, peloAmarillo:true, gafas:true, nino:false, springfield:true, bigote:false, principal:false },
  { nombre:"Moe Szyslak", hombre:true, peloAmarillo:true, gafas:false, nino:false, springfield:true, bigote:true, principal:false },
  { nombre:"Barney Gumble", hombre:true, peloAmarillo:true, gafas:false, nino:false, springfield:true, bigote:true, principal:false },
  { nombre:"Apu Nahasapeemapetilon", hombre:true, peloAmarillo:true, gafas:true, nino:false, springfield:true, bigote:false, principal:false },
  { nombre:"Chief Wiggum", hombre:true, peloAmarillo:true, gafas:true, nino:false, springfield:true, bigote:true, principal:false },
  { nombre:"Ralph Wiggum", hombre:true, peloAmarillo:true, gafas:false, nino:true, springfield:true, bigote:false, principal:false },
  { nombre:"Sideshow Bob", hombre:true, peloAmarillo:true, gafas:false, nino:false, springfield:true, bigote:false, principal:false },
  { nombre:"Patty Bouvier", hombre:false, peloAmarillo:true, gafas:true, nino:false, springfield:true, bigote:false, principal:false }];

  let preguntas = [
  { texto: "¿Es hombre?", atributo: "hombre" },
  { texto: "¿Tiene pelo amarillo?", atributo: "peloAmarillo" },
  { texto: "¿Usa gafas?", atributo: "gafas" },
  { texto: "¿Es niño?", atributo: "nino" },
  { texto: "¿Vive en Springfield?", atributo: "springfield" },
  { texto: "¿Tiene bigote?", atributo: "bigote" },
  { texto: "¿Es un personaje principal?", atributo: "principal" }
];

let personajeSecreto = null;

// Referencias del DOM
const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const startBtn = document.getElementById("startBtn");
const resultEl = document.getElementById("result");

// Eventos iniciales
startBtn.addEventListener("click", iniciarJuego);
yesBtn.addEventListener("click", () => responder(true));
noBtn.addEventListener("click", () => responder(false));

// Función inicial
let currentQuestion = 0;
let personajesRestantes = [...personajes]; // copia para filtrar

function iniciarJuego() {
  personajesRestantes = [...personajes];
  currentQuestion = 0;
  personajeSecreto = personajesRestantes[Math.floor(Math.random() * personajesRestantes.length)];
  questionEl.textContent = preguntas[currentQuestion].texto;
  resultEl.textContent = "";
}

// Función responder (se completará después)
function responder(respuesta) {
  const pregunta = preguntas[currentQuestion];
  
  personajesRestantes = personajesRestantes.filter(p => p[pregunta.atributo] === respuesta);

  currentQuestion++;

  if (personajesRestantes.length === 1) {
    resultEl.textContent = `¡Adiviné! Es ${personajesRestantes[0].nombre} 🎉`;
  } else if (currentQuestion < preguntas.length) {
    questionEl.textContent = preguntas[currentQuestion].texto;
  } else {
    resultEl.textContent = `No pude adivinar. 😢`;
  }
}

