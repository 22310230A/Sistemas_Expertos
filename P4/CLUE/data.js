// --- data.js ---

// ===================================
// 1. LISTAS GLOBALES
// ===================================
// Estas son las listas que usaremos para poblar los menús
// y para elegir la solución aleatoria.

export const PERSONAJES = [
    { id: 'homero', nombre: 'Homero', profesion: 'Inspector de Seguridad Nuclear' },
    { id: 'marge', nombre: 'Marge', profesion: 'Ama de Casa' },
    { id: 'bart', nombre: 'Bart', profesion: 'Estudiante' },
    { id: 'lisa', nombre: 'Lisa', profesion: 'Estudiante y Músico' },
    { id: 'burns', nombre: 'Sr. Burns', profesion: 'Magnate Millonario' },
    { id: 'moe', nombre: 'Moe Szyslak', profesion: 'Cantinero' } // Nuestro 6º personaje
];

export const ARMAS = [
    { id: 'dona', nombre: 'Dona rancia' },
    { id: 'saxofon', nombre: 'Saxofón' },
    { id: 'resortera', nombre: 'Resortera' },
    { id: 'barra_plutonio', nombre: 'Barra de plutonio' },
    { id: 'escopeta_moe', nombre: 'Escopeta de Moe' } // Nueva arma
];

export const LOCACIONES = [
    { id: 'taverna_moe', nombre: 'La Taverna de Moe' },
    { id: 'planta_nuclear', nombre: 'La Planta Nuclear' },
    { id: 'casa_simpson', nombre: 'La Cocina de los Simpson' },
    { id: 'kwik_e_mart', nombre: 'El Kwik-E-Mart' },
    { id: 'escuela_springfield', nombre: 'La Escuela de Springfield' }
];


// ===================================
// 2. MOTOR DE HISTORIAS (EPISODE_DATA)
// ===================================
// Aquí definimos las 5 historias. El juego elegirá una
// víctima al azar y cargará esta información.
// Las claves (ej: 'homero', 'dona', 'taverna_moe')
// DEBEN COINCIDIR con los 'id' de las listas de arriba.

export const EPISODE_DATA = {
    
    // --- HISTORIA 1: EL CASO BURNS ---
    "burns": {
        victimName: "Sr. Burns",
        introStory: "¡Noticia de última hora! El tirano de Springfield, Charles Montgomery Burns, ha sido encontrado... *otra vez*. Pero esta vez, parece que es la definitiva. ¡Su cuerpo yace inerte en su oficina! ¿Quién finalmente lo consiguió?",
        // La víctima (Burns) no está en la lista de sospechosos.
        suspects: ['homero', 'marge', 'bart', 'lisa', 'moe'],
        // Pistas de por qué odian a BURNS
        clues: {
            "homero": "Archivo: Empleado 7G. Burns es su jefe. Le ha negado aumentos durante 30 años y, lo peor de todo, ¡nunca recuerda su nombre! Homero fue visto murmurando 'Maldito Burns...' tras su última evaluación.",
            "marge": "Archivo: Ama de Casa. Burns contaminó el lago, amenazó a su familia, intentó robar a Ayudante de Santa para hacer un abrigo... La lista de Marge es larga y su paciencia es corta.",
            "bart": "Archivo: El Barto. ¡Ay, caramba! Burns atropelló la patineta de Bart, destruyó la casa del árbol y, en general, representa 'El Hombre'. Bart siempre ha fantaseado con acabar con él.",
            "lisa": "Archivo: Niña Prodigio. Justicia. Burns representa todo lo que Lisa odia: codicia corporativa, destrucción ambiental y se niega a financiar el programa de jazz de la escuela.",
            "moe": "Archivo: Cantinero. Burns le ha subido los impuestos a su taverna y una vez intentó robarle su receta secreta del 'Olvida-Penas'. Moe fue escuchado gritando '¡Algún día lo pagarás, Burns!'",
            
            "dona": "Archivo: Repostería. Una dona rancia y fosilizada. El arma preferida de un inspector de seguridad (Homero) que la arrojaría con frustración. Se encontró una caja vacía de Lard Lad cerca.",
            "saxofon": "Archivo: Instrumento. Un objeto pesado de metal. Lisa lo atesora, pero ¿podría usarlo en un ataque de furia justiciera para defender el planeta? Es un arma contundente.",
            "resortera": "Archivo: Juguete. El arma insignia de Bart. Perfecta para un ataque a distancia preciso. Un disparo certero a la sien podría haberlo derribado.",
            "barra_plutonio": "Archivo: Desecho Nuclear. Brillante e incandescente. Solo alguien con acceso a la Planta Nuclear (Homero) podría conseguir una. Burns fue encontrado con un brillo verdoso.",
            "escopeta_moe": "Archivo: Arma de Fuego. Moe la guarda bajo la barra. Siempre está cargada. ¿Pudo Burns haber visitado la taverna para amenazar a Moe, y este último finalmente la usó?",

            "taverna_moe": "Archivo: Bar. Un lugar sórdido. Burns fue visto allí tratando de comprar el bar por centavos. Moe se habría negado rotundamente. ¿La discusión se salió de control?",
            "planta_nuclear": "Archivo: Lugar de Trabajo. La escena del crimen obvia (si la víctima es Burns). Su oficina es el centro de todo. Homero tiene acceso, y los demás podrían haberse colado.",
            "casa_simpson": "Archivo: Hogar. ¿Qué hacía Burns en la cocina de los Simpson? Quizás fue a amenazar a Marge o a Homero en su propio territorio, un grave error.",
            "kwik_e_mart": "Archivo: Tienda. Burns fue visto discutiendo con Apu (testigo) sobre el precio de un Squishee. Alguien pudo seguirlo hasta allí.",
            "escuela_springfield": "Archivo: Educación. Burns estaba en la escuela para anunciar que cortaría *todos* los fondos para arte y música. Esto pone a Lisa y Bart en la escena."
        }
    },

    // --- HISTORIA 2: EL CASO HOMERO ---
    "homero": {
        victimName: "Homero Simpson",
        introStory: "¡D'oh! Han encontrado a Homero Simpson desplomado sobre una pila de rosquillas en el cuarto de descanso. ¡Está muerto! ¿Fue un accidente... o alguien finalmente se hartó de su incompetencia?",
        // Homero no está. Burns y Moe sí.
        suspects: ['marge', 'bart', 'lisa', 'burns', 'moe'],
        // Pistas de por qué odiarían a HOMERO
        clues: {
            "marge": "Archivo: Esposa. Marge lo amaba, pero Homero olvidó su aniversario, quemó la casa y apostó los ahorros de la universidad... todo esta semana. ¿Pudo ser la gota que derramó el vaso?",
            "bart": "Archivo: Hijo. El estrangulamiento. Años de '¡Pequeño demonio!' finalmente tuvieron consecuencias. Bart pudo haber preparado una trampa demasiado elaborada.",
            "lisa": "Archivo: Hija. Homero vendió su saxofón para comprar cerveza. Pudo haber sido un crimen pasional en defensa de su amado instrumento.",
            "burns": "Archivo: Jefe. Homero causó 17 fusiones nucleares este mes. Despedirlo era demasiado papeleo; eliminarlo era... 'eficiente'.",
            "moe": "Archivo: Cantinero. ¡La cuenta! Homero tenía una cuenta pendiente en la taverna de más de $14 mil millones. Moe finalmente decidió cobrar.",

            "dona": "Archivo: Repostería. El arma irónica. ¿Pudo alguien (¿Marge?) envenenar su última dona con algo más que azúcar glas?",
            "saxofon": "Archivo: Instrumento. Lisa es la dueña, pero Homero intentó tocarlo y lo rompió. ¿Pudo Lisa haberlo golpeado en un ataque de ira? O quizás Marge lo usó, harta del ruido.",
            "resortera": "Archivo: Juguete. Bart es el experto. Pudo haber disparado algo peligroso (como la barra de plutonio) directamente a la boca abierta de Homero desde la distancia.",
            "barra_plutonio": "Archivo: Desecho Nuclear. El 'almuerzo' de Homero. A menudo la confunde con un burrito. Burns pudo habérsela dado, llamándola una 'barra energética'.",
            "escopeta_moe": "Archivo: Arma de Fuego. Moe estaba harto de las 'bromas telefónicas' de Bart. ¿Pudo haber ido a la casa de los Simpson a buscar a Bart, y Homero se interpuso en el camino?",

            "taverna_moe": "Archivo: Bar. La segunda casa de Homero. El lugar perfecto para que Moe le sirviera una 'última copa' envenenada.",
            "planta_nuclear": "Archivo: Lugar de Trabajo. La escena del crimen. Homero estaba 'durmiendo' en su puesto. Burns tuvo la oportunidad perfecta.",
            "casa_simpson": "Archivo: Hogar. Encontrado en su cocina. Esto apunta a alguien de la familia. Marge, Bart o Lisa.",
            "kwik_e_mart": "Archivo: Tienda. Homero estaba intentando robar un Hot-Dog caducado. ¿Pudo Apu (testigo) defender su mercancía y Homero tropezó... o fue empujado?",
            "escuela_springfield": "Archivo: Educación. Homero estaba allí para una reunión de padres y maestros. ¿Pudo haber insultado a Skinner (testigo) y Bart aprovechó la confusión para atacarlo?"
        }
    },

    // --- HISTORIA 3: EL CASO MARGE ---
    "marge": {
        victimName: "Marge Simpson",
        introStory: "¡Oh, qué horror! Marge Simpson, el pilar moral de Springfield, ha sido encontrada sin vida en su cocina impecable. Su permanente azul está... desarreglado. ¿Quién podría hacerle daño a Marge?",
        suspects: ['homero', 'bart', 'lisa', 'burns', 'moe'],
        clues: {
            "homero": "Archivo: Esposo. ¿El seguro de vida? ¿O quizás Marge finalmente escondió toda la cerveza Duff y Homero entró en pánico?",
            "bart": "Archivo: Hijo. Marge le confiscó su patineta *permanentemente*. Para Bart, eso es una declaración de guerra.",
            "lisa": "Archivo: Hija. Marge accidentalmente recicló la tarea de Lisa, una obra maestra de 200 páginas. La tensión intelectual finalmente explotó.",
            "burns": "Archivo: Enemigo. Marge lideró una protesta exitosa que cerró la planta nuclear durante una semana. Burns no perdona. '¡Suelten a los sabuesos!'",
            "moe": "Archivo: Cantinero. Marge intentó que cerraran la taverna por 'insalubre'. Moe perdió a su mejor cliente (Homero) durante días. Fue un golpe a su cartera.",

            "dona": "Archivo: Repostería. Homero pudo haberle ofrecido una 'dona de la paz' que resultó estar envenenada... por accidente. O no.",
            "saxofon": "Archivo: Instrumento. Un objeto contundente. ¿Pudo Marge estar limpiándolo y Lisa, harta de sus críticas, la golpeó?",
            "resortera": "Archivo: Juguete. Bart pudo haber disparado una lata de sopa hirviendo desde el otro lado de la cocina mientras Marge cocinaba.",
            "barra_plutonio": "Archivo: Desecho Nuclear. Burns pudo haber enviado a Smithers a dejar un 'regalo' radioactivo en su jardín, y Marge lo tocó.",
            "escopeta_moe": "Archivo: Arma de Fuego. Moe, furioso por la protesta de Marge, pudo haber ido a 'razonar' con ella, y la escopeta se disparó 'accidentalmente'.",

            "taverna_moe": "Archivo: Bar. Marge fue allí a sacar a Homero a rastras. ¿Pudo haber resbalado en el suelo pegajoso y Moe 'no vio nada'?",
            "planta_nuclear": "Archivo: Lugar de Trabajo. Marge fue a la planta a llevarle el almuerzo a Homero, pero terminó en la oficina de Burns para quejarse. Una reunión fatal.",
            "casa_simpson": "Archivo: Hogar. La escena del crimen. Su cocina. Esto grita 'crimen doméstico'. Homero, Bart y Lisa son los principales sospechosos.",
            "kwik_e_mart": "Archivo: Tienda. Marge estaba protestando por los precios altos. ¿Pudo haber tirado accidentalmente un estante, y Apu (testigo) la amenazó?",
            "escuela_springfield": "Archivo: Educación. Marge estaba en una reunión del PTA. ¿Pudo haber descubierto que Skinner (testigo) desfalcaba fondos de las tartas?"
        }
    },

    // --- HISTORIA 4: EL CASO BART ---
    "bart": {
        victimName: "Bart Simpson",
        introStory: "¡Ay, caramba! El cuerpo sin vida de Bart Simpson fue encontrado en la oficina del Director Skinner. La pizarra cercana dice 'No volveré a...'. No terminó la frase. ¿Quién silenció al demonio de Springfield?",
        suspects: ['homero', 'marge', 'lisa', 'burns', 'moe'],
        clues: {
            "homero": "Archivo: Padre. '¡Pequeño demonio!'. Años de estrangulamiento finalmente fueron demasiado lejos. Homero afirma que 'se le resbaló la mano'.",
            "marge": "Archivo: Madre. Bart reemplazó sus vitaminas con dulces. Marge, en un subidón de azúcar, pudo haber perdido el control.",
            "lisa": "Archivo: Hermana. ¡Sabotaje! Bart destruyó el proyecto de ciencias de Lisa, que iba a ganar la feria. Lisa es pacifista, pero su saxofón es de metal pesado...",
            "burns": "Archivo: Magnate. Bart le hizo una broma telefónica al Sr. Burns, costándole millones en una transacción. Burns no tiene sentido del humor.",
            "moe": "Archivo: Cantinero. ¡La broma telefónica definitiva! Bart llamó a Moe pidiendo por 'Al Cohólico' una vez de más. Moe rastreó la llamada.",
            
            "dona": "Archivo: Repostería. Homero pudo usar una dona como cebo para una trampa. '¡Ven aquí, Bart... tengo algo para ti!'",
            "saxofon": "Archivo: Instrumento. El arma de Lisa. Lo encontró en la escena, cubierto de huellas de Bart. ¿Lisa se lo arrebató y lo golpeó?",
            "resortera": "Archivo: Juguete. Irónico. ¿Pudo Homero quitársela y, sin saber usarla, disparar algo letal por accidente?",
            "barra_plutonio": "Archivo: Desecho Nuclear. Burns pudo haber confundido a Bart con un 'sindicalista' y lo eliminó.",
            "escopeta_moe": "Archivo: Arma de Fuego. Moe, ciego de ira por las bromas, fue a la escuela a buscarlo. Skinner (testigo) dice que 'solo quería asustarlo'.",

            "taverna_moe": "Archivo: Bar. Bart fue a recuperar su patineta (Moe la confiscó). Moe lo atrapó hurgando en la trastienda.",
            "planta_nuclear": "Archivo: Lugar de Trabajo. Bart estaba vandalizando la oficina de Burns. Burns activó la 'puerta trampa' equivocada.",
            "casa_simpson": "Archivo: Hogar. Homero y Bart tuvieron su clásica pelea en el sofá... pero esta vez, Bart no se levantó.",
            "kwik_e_mart": "Archivo: Tienda. Bart fue atrapado robando Squishees. ¿Pudo Apu (testigo) haberlo encerrado en el congelador 'solo un minuto' y lo olvidó?",
            "escuela_springfield": "Archivo: Educación. La escena del crimen. Tantos enemigos aquí: Skinner, Krabappel, Willie... pero los principales sospechosos (Lisa, Homero, Moe) fueron vistos allí."
        }
    },

    // --- HISTORIA 5: EL CASO LISA ---
    "lisa": {
        victimName: "Lisa Simpson",
        introStory: "¡Esto es una tragedia! Lisa Simpson, la brillante saxofonista y conciencia de Springfield, ha sido encontrada en el auditorio de la escuela. Su saxofón yace a su lado. ¿Quién apagaría una luz tan brillante?",
        suspects: ['homero', 'marge', 'bart', 'burns', 'moe'],
        clues: {
            "homero": "Archivo: Padre. Lisa escondió toda la cerveza 'Duff' de la casa, reemplazándola con 'Agua de Manantial'. Homero, en su desesperación, pudo haberla empujado.",
            "marge": "Archivo: Madre. Marge, intentando 'ayudar', pulió el saxofón de Lisa con limpiador de hornos, arruinándolo. Lisa le dijo algo 'imperdonable' sobre su cabello.",
            "bart": "Archivo: Hermano. Lisa grabó a Bart admitiendo que él robó el dinero de la colecta. Él tenía que silenciarla antes de que ella mostrara la cinta.",
            "burns": "Archivo: Magnate. Lisa organizó un boicot a la planta nuclear que funcionó. Los inversores estaban furiosos. Burns decidió 'resolver' el problema de la 'niña sabelotodo'.",
            "moe": "Archivo: Cantinero. Lisa, como parte de un proyecto escolar, hizo que inspectores de sanidad cerraran la taverna de Moe... ¡permanentemente!",
            
            "dona": "Archivo: Repostería. Homero pudo haberle dado una dona, sin saber que era alérgica a las nueces... o sabiéndolo perfectamente.",
            "saxofon": "Archivo: Instrumento. El arma irónica. ¿Pudo Bart intentar robárselo para venderlo, y en el forcejeo, Lisa cayó y se golpeó la cabeza?",
            "resortera": "Archivo: Juguete. Bart. Simple y llanamente. Pudo haber sido un accidente... o no.",
            "barra_plutonio": "Archivo: Desecho Nuclear. Burns pudo haberla invitado a la planta para 'debatir' sobre energía limpia, solo para llevarla a una trampa.",
            "escopeta_moe": "Archivo: Arma de Fuego. Moe, devastado por perder su bar, la confrontó en la escuela. '¡Tú arruinaste mi vida!', gritó.",

            "taverna_moe": "Archivo: Bar. Lisa estaba allí tomando notas para su informe. Moe, harto de su 'juicio silencioso', la echó... ¿o la empujó por la trampilla?",
            "planta_nuclear": "Archivo: Lugar de Trabajo. Lisa se infiltró para obtener pruebas de la contaminación de Burns. Él la descubrió.",
            "casa_simpson": "Archivo: Hogar. La tensión familiar. Bart y Homero estaban hartos de sus sermones veganos. ¿Marge estaba harta de su 'perfección'?",
            "kwik_e_mart": "Archivo: Tienda. Lisa estaba exponiendo que los Hot-Dogs de Apu eran carne de rata. Apu (testigo) intentó quitarle su cámara.",
            "escuela_springfield": "Archivo: Educación. La escena del crimen. El auditorio. Estaba practicando sola. Cualquiera pudo haberla emboscado."
        }
    }
};