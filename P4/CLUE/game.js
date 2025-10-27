// --- game.js (Modo "Interrogación Narrativa" - CORREGIDO) ---

import { PERSONAJES, ARMAS, LOCACIONES, EPISODE_DATA } from './data.js';

// --- (FINALES ESPECIALES - sin cambios) ---
const FINAL_STORIES = {
    'bart-resortera-escuela_springfield': '¡Caso resuelto! Bart, desde el techo de la escuela, usó su resortera para disparar una roca que inició una reacción en cadena, acabando con la víctima. ¡Motivo: Venganza por una mala nota!',
    'homero-barra_plutonio-planta_nuclear': '¡Lo tienes! Homero, en la Planta, intentaba esconder una barra de plutonio brillante en su pantalón. Alguien lo asustó, la arrojó, y... bueno, ya sabes el resto.',
    'moe-escopeta_moe-taverna_moe': '¡Exacto! Moe estaba limpiando su escopeta en la Taverna cuando la víctima entró exigiendo... ¡agua gratis! Moe "resbaló" y el arma se disparó. Caso cerrado.',
    'lisa-saxofon-casa_simpson': '¡Increíble! Lisa estaba tocando una nota de jazz experimental en la cocina. La vibración fue tan pura que causó que una pila de ollas cayera sobre la víctima. ¡Un "accidente" musical!',
    'marge-dona-kwik_e_mart': '¡Elemental! Marge, harta de los precios de Apu, le arrojó una dona rancia. La dona, dura como una piedra, golpeó a la víctima que estaba detrás. ¡Un crimen por frustración!'
};

// ---------------------------------
// MÓDULO DE LÓGICA DEL JUEGO
// ---------------------------------

let solucionSecreta = { personaje: null, arma: null, locacion: null };
let episodioActual = null;
let juegoTerminado = false;
let donaTokens = 6;
let pistasIncorrectas = { personajes: [], armas: [], locaciones: [] };

// Selectores del DOM
let introScreen, startGameButton;
let mainDashboard;
let btnInvestigaPersonaje, btnInvestigaArma, btnInvestigaLugar, accuseButton;
let selectPersonajes, selectArmas, selectLocaciones;
let gameTitle, gameSubtitle;
let messageDisplay;
let donaCounterSpan;
let notebookPersonajes, notebookArmas, notebookLocaciones;

// --- (Funciones de ayuda: obtenerElementoAleatorio, barajarArray - sin cambios) ---
function obtenerElementoAleatorio(arr) {
    const indice = Math.floor(Math.random() * arr.length);
    return arr[indice];
}
function barajarArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
// --- (Funciones del juego: mostrarMensaje, terminarJuego, actualizarContadorDonas - sin cambios) ---
function mostrarMensaje(tipo, mensajeHTML) {
    const mensajeEl = document.createElement('div');
    mensajeEl.classList.add('message');
    mensajeEl.classList.add(tipo);
    mensajeEl.innerHTML = mensajeHTML;
    if (tipo === 'clue-message') {
        messageDisplay.prepend(mensajeEl);
    } else {
        messageDisplay.innerHTML = '';
        messageDisplay.appendChild(mensajeEl);
    }
}
function terminarJuego(perdioPorDonas = false) {
    juegoTerminado = true;
    accuseButton.disabled = true;
    btnInvestigaPersonaje.disabled = true;
    btnInvestigaArma.disabled = true;
    btnInvestigaLugar.disabled = true;
    selectPersonajes.disabled = true;
    selectArmas.disabled = true;
    selectLocaciones.disabled = true;
    if (perdioPorDonas) {
        mostrarMensaje('error-message', `¡Te quedaste sin donas! El verdadero culpable era <strong>${solucionSecreta.personaje.nombre}</strong> con <strong>${solucionSecreta.arma.nombre}</strong>. El asesino ha escapado. <strong>FIN DEL JUEGO.</strong>`);
    }
}
function actualizarContadorDonas() {
    donaCounterSpan.textContent = donaTokens;
    if (donaTokens === 0 && !juegoTerminado) {
        terminarJuego(true);
    }
}

/**
 * LÓGICA DE PISTA (sin cambios)
 */
function pedirPista(tipo) {
    if (donaTokens <= 0 || juegoTerminado) return;
    donaTokens--;
    actualizarContadorDonas();
    if (juegoTerminado) return;

    if (pistasIncorrectas[tipo].length === 0) {
        mostrarMensaje('clue-message', `🕵️ ¡Has agotado todas las pistas falsas en esta categoría! Ya sabes quién/qué es el correcto por eliminación.`);
        if (tipo === 'personajes') btnInvestigaPersonaje.disabled = true;
        else if (tipo === 'armas') btnInvestigaArma.disabled = true;
        else btnInvestigaLugar.disabled = true;
        return;
    }

    const pistaID = pistasIncorrectas[tipo].pop();
    let nombreItem = '';
    let mensajeEliminacion = '';
    const pistaNarrativa = episodioActual.clues[pistaID];

    if (tipo === 'personajes') {
        nombreItem = PERSONAJES.find(p => p.id === pistaID).nombre;
        mensajeEliminacion = `...A pesar de este aparente motivo, nuestra investigación confirma que <strong>¡${nombreItem} ES INOCENTE!</strong>`;
    } else if (tipo === 'armas') {
        nombreItem = ARMAS.find(a => a.id === pistaID).nombre;
        mensajeEliminacion = `...Sin embargo, nuestros forenses confirman que <strong>¡${nombreItem} ES INOCENTE!</strong>`;
    } else {
        nombreItem = LOCACIONES.find(l => l.id === pistaID).nombre;
        mensajeEliminacion = `...Pero nuestros detectives han confirmado que el crimen NO ocurrió en <strong>¡${nombreItem}!</strong>`;
    }
    
    mostrarMensaje('clue-message', `🕵️ <strong>Pista (1 Dona):</strong> <i>(${pistaNarrativa})</i><br><br>${mensajeEliminacion}`);
}

/**
 * LÓGICA DE ACUSACIÓN (sin cambios)
 */
function revisarAcusacionFinal() {
    if (juegoTerminado) return;

    const personajeAcusado = selectPersonajes.value;
    const armaAcusada = selectArmas.value;
    const locacionAcusada = selectLocaciones.value;

    const esSolucion = (personajeAcusado === solucionSecreta.personaje.id &&
                        armaAcusada === solucionSecreta.arma.id &&
                        locacionAcusada === solucionSecreta.locacion.id);

    if (esSolucion) {
        const solutionKey = `${personajeAcusado}-${armaAcusada}-${locacionAcusada}`;
        let mensajeVictoria = (FINAL_STORIES[solutionKey]) ? FINAL_STORIES[solutionKey] : `¡Caso resuelto! Efectivamente, fue ${solucionSecreta.personaje.nombre} con ${solucionSecreta.arma.nombre} en ${solucionSecreta.locacion.nombre}. ¡Excelente deducción, detective!`;
        mostrarMensaje('win-message', mensajeVictoria);
    } else {
        mostrarMensaje('error-message', `¡ACUSACIÓN INCORRECTA! El verdadero culpable era <strong>${solucionSecreta.personaje.nombre}</strong> con <strong>${solucionSecreta.arma.nombre}</strong> en <strong>${solucionSecreta.locacion.nombre}</strong>. El asesino ha escapado. <strong>FIN DEL JUEGO.</strong>`);
    }

    terminarJuego();
}

/**
 * LÓGICA DE POBLAR MENÚS (sin cambios)
 */
function poblarMenus() {
    selectPersonajes.innerHTML = '';
    selectArmas.innerHTML = '';
    selectLocaciones.innerHTML = '';

    episodioActual.suspects.forEach(suspectId => {
        const personaje = PERSONAJES.find(p => p.id === suspectId);
        const option = document.createElement('option');
        option.value = personaje.id;
        option.textContent = personaje.nombre;
        selectPersonajes.appendChild(option);
    });

    ARMAS.forEach(arma => {
        const option = document.createElement('option');
        option.value = arma.id;
        option.textContent = arma.nombre;
        selectArmas.appendChild(option);
    });
    LOCACIONES.forEach(locacion => {
        const option = document.createElement('option');
        option.value = locacion.id;
        option.textContent = locacion.nombre;
        selectLocaciones.appendChild(option);
    });
}

/**
 * LÓGICA DE POBLAR CUADERNO (sin cambios)
 */
function poblarCuaderno() {
    notebookPersonajes.innerHTML = '';
    notebookArmas.innerHTML = '';
    notebookLocaciones.innerHTML = '';

    const toggleTachar = (e) => {
        e.target.classList.toggle('crossed-off');
    };

    PERSONAJES.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.nombre;
        li.dataset.id = p.id;
        li.addEventListener('click', toggleTachar);
        notebookPersonajes.appendChild(li);
    });
    ARMAS.forEach(a => {
        const li = document.createElement('li');
        li.textContent = a.nombre;
        li.dataset.id = a.id;
        li.addEventListener('click', toggleTachar);
        notebookArmas.appendChild(li);
    });
    LOCACIONES.forEach(l => {
        const li = document.createElement('li');
        li.textContent = l.nombre;
        li.dataset.id = l.id;
        li.addEventListener('click', toggleTachar);
        notebookLocaciones.appendChild(li);
    });
}


/**
 * !! FUNCIÓN MODIFICADA: iniciarJuego() !!
 * (Corregida para usar la lista de sospechosos de data.js)
 */
function iniciarJuego() {
    juegoTerminado = false;

    // Resetear Donas y Botones
    donaTokens = 6;
    actualizarContadorDonas();
    messageDisplay.innerHTML = '';
    accuseButton.disabled = false;
    btnInvestigaPersonaje.disabled = false;
    btnInvestigaArma.disabled = false;
    btnInvestigaLugar.disabled = false;
    selectPersonajes.disabled = false;
    selectArmas.disabled = false;
    selectLocaciones.disabled = false;

    // 1. Elegir Episodio
    const victimasPosibles = Object.keys(EPISODE_DATA);
    const victimaId = obtenerElementoAleatorio(victimasPosibles);
    episodioActual = EPISODE_DATA[victimaId];

    // 2. Actualizar Título e Historia
    gameTitle.textContent = `¿Quién mató a ${episodioActual.victimName}?`;
    gameSubtitle.textContent = episodioActual.introStory;

    // 3. Generar la solución secreta
    const personajeSolucionId = obtenerElementoAleatorio(episodioActual.suspects);
    solucionSecreta.personaje = PERSONAJES.find(p => p.id === personajeSolucionId);
    solucionSecreta.arma = obtenerElementoAleatorio(ARMAS);
    solucionSecreta.locacion = obtenerElementoAleatorio(LOCACIONES);

    console.log("--- SOLUCIÓN SECRETA (DEBUG) ---");
    console.log("Culpable:", solucionSecreta.personaje.nombre);
    console.log("Arma:", solucionSecreta.arma.nombre);
    console.log("Lugar:", solucionSecreta.locacion.nombre);
    console.log("---------------------------------");

    // 4. Llenar los menús y el cuaderno
    poblarMenus();
    poblarCuaderno();

    // 5. !! CORRECCIÓN IMPORTANTE !!
    // Preparar las listas de pistas incorrectas
    pistasIncorrectas.personajes = [];
    pistasIncorrectas.armas = [];
    pistasIncorrectas.locaciones = [];

    // Ahora solo usa la lista de SOSPECHOSOS del episodio [data.js]
    episodioActual.suspects.forEach(suspectId => {
        if (suspectId !== solucionSecreta.personaje.id) {
            pistasIncorrectas.personajes.push(suspectId);
        }
    });
    // Las armas y locaciones sí usan la lista global
    ARMAS.forEach(item => {
        if (item.id !== solucionSecreta.arma.id) {
            pistasIncorrectas.armas.push(item.id);
        }
    });
    LOCACIONES.forEach(item => {
        if (item.id !== solucionSecreta.locacion.id) {
            pistasIncorrectas.locaciones.push(item.id);
        }
    });
    
    // Barajamos las listas de pistas
    pistasIncorrectas.personajes = barajarArray(pistasIncorrectas.personajes);
    pistasIncorrectas.armas = barajarArray(pistasIncorrectas.armas);
    pistasIncorrectas.locaciones = barajarArray(pistasIncorrectas.locaciones);
}

/**
 * !! FUNCIÓN MODIFICADA: mostrarJuego() !!
 */
function mostrarJuego() {
    console.log("Mostrando el tablero...");
    introScreen.style.display = 'none';
    mainDashboard.style.display = 'grid'; // Mostramos el dashboard
}

// ---------------------------------
// !! INICIO DEL SCRIPT (MODIFICADO) !!
// ---------------------------------

document.addEventListener('DOMContentLoaded', () => {
    
    // Encontrar todos los elementos del DOM
    introScreen = document.getElementById('intro-screen');
    startGameButton = document.getElementById('start-game-button');
    mainDashboard = document.getElementById('main-dashboard');
    messageDisplay = document.getElementById('message-display');

    btnInvestigaPersonaje = document.getElementById('investigate-person-button');
    btnInvestigaArma = document.getElementById('investigate-weapon-button');
    btnInvestigaLugar = document.getElementById('investigate-location-button');
    accuseButton = document.getElementById('accuse-button');

    selectPersonajes = document.getElementById('personaje');
    selectArmas = document.getElementById('arma');
    selectLocaciones = document.getElementById('locacion');
    
    gameTitle = document.querySelector('#story-section h1');
    gameSubtitle = document.querySelector('#story-section p');
    donaCounterSpan = document.querySelector('#dona-counter span');

    notebookPersonajes = document.getElementById('notebook-personajes');
    notebookArmas = document.getElementById('notebook-armas');
    notebookLocaciones = document.getElementById('notebook-locaciones');

    // Asignar eventos
    startGameButton.addEventListener('click', mostrarJuego);
    accuseButton.addEventListener('click', revisarAcusacionFinal);
    
    btnInvestigaPersonaje.addEventListener('click', () => pedirPista('personajes'));
    btnInvestigaArma.addEventListener('click', () => pedirPista('armas'));
    btnInvestigaLugar.addEventListener('click', () => pedirPista('locaciones'));

    // !! IMPORTANTE: Iniciar el juego DE INMEDIATO (detrás del modal)
    iniciarJuego();
});