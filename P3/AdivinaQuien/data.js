export const arbolDecision = {
  // Nivel 0
  pregunta: "¡Excelente! A ver si adivino... Tu personaje, ¿forma parte del núcleo familiar de los Simpson (Homero, Marge, Bart, Lisa o Maggie)?",
  
  si: { 
    // ########## RAMA: FAMILIA SIMPSON ##########
    // Nivel 1
    pregunta: "OK, es de la familia principal. ¿Es uno de los niños?",
    si: { 
      // ----- Grupo: Niños Simpson -----
      // Nivel 2
      pregunta: "Vale, es un niño Simpson. ¿Es un bebé que casi siempre lleva un chupete?",
      si: { personaje: "Maggie", img: "images/maggie.jpg" },
      no: {
        // Nivel 3
        pregunta: "Entendido. ¿Es una niña, famosa por ser súper inteligente y tocar el saxofón?",
        si: { personaje: "Lisa", img: "images/lisa.jpg" },
        no: {
          // Nivel 4
          pregunta: "Entonces, ¿es un chico travieso que anda siempre en patineta y dice '¡Ay, caramba!'?",
          si: { personaje: "Bart", img: "images/bart.jpg" },
          no: { personaje: "Bart", img: "images/bart.jpg" } // Fallback
        }
      }
    },
    no: {
      // ----- Grupo: Adultos Simpson -----
      // Nivel 2
      pregunta: "OK, es un adulto de la familia. ¿Es una mujer con un peinado azul muy, muy alto?",
      si: { personaje: "Marge", img: "images/marge.jpg" },
      no: {
        // Nivel 3
        pregunta: "Entonces, ¿es un hombre al que le encantan las donas y la cerveza Duff?",
        si: {
          // Nivel 4
          pregunta: "Y... ¿trabaja en la planta de energía nuclear?",
          // --- ¡CORREGIDO! ---
          si: { personaje: "Homero", img: "images/homer.jpg" },
          no: { personaje: "Homero", img: "images/homer.jpg" } // Fallback
        },
        // --- ¡CORREGIDO! ---
        no: { personaje: "Homero", img: "images/homer.jpg" } // Fallback
      }
    }
  },
  no: {
    // ########## RAMA: PERSONAJES SECUNDARIOS ##########
    // Nivel 1
    pregunta: "Vale, no es de la familia principal. ¿Aun así es un niño o un estudiante?",
    si: {
      // ----- Grupo: Niños Secundarios -----
      // Nivel 2
      pregunta: "¿Usa gafas rojas y es el mejor amigo de Bart?",
      si: { personaje: "Milhouse", img: "images/milhouse.jpg" },
      no: {
        // Nivel 3
        pregunta: "Mmm... ¿es conocido por decir cosas raras y ser el hijo del jefe de policía?",
        si: { personaje: "Ralph Wiggum", img: "images/ralph.jpg" },
        no: { personaje: "Ralph Wiggum", img: "images/ralph.jpg" } // Fallback
      }
    },
    no: {
      // ----- Grupo: Adultos Secundarios -----
      // Nivel 2
      pregunta: "OK, es un adulto de Springfield. ¿Es una mujer?",
      si: {
        // Nivel 3
        pregunta: "¿Es una de las hermanas de Marge y fuma constantemente?",
        si: { personaje: "Patty Bouvier", img: "images/patty.jpg" },
        no: { personaje: "Patty Bouvier", img: "images/patty.jpg" } // Fallback
      },
      no: {
        // ####################################################################################
        // ########## --- SECCIÓN CORREGIDA --- ###############################################
        // ####################################################################################
        // Nivel 3
        pregunta: "Entendido, es un hombre. Su profesión o rol principal... ¿es ser dueño de un negocio o una figura pública (policía, payaso, etc.)?",
        si: {
          // ----- Subgrupo: Hombres con rol público/negocio -----
          // Nivel 4
          pregunta: "Perfecto. ¿Es el dueño de una taberna?",
          si: { personaje: "Moe Szyslak", img: "images/moe.jpg" }, // ¡RUTA ARREGLADA PARA MOE!
          no: {
            // Nivel 5
            pregunta: "¿Es el jefe de la policía de Springfield?",
            // --- ¡CORREGIDO! ---
            si: { personaje: "Jefe Gorgory", img: "images/wiggum.jpg" },
            no: {
              // Nivel 6
              pregunta: "¿Es un payaso de televisión?",
              si: { personaje: "Krusty", img: "images/krusty.jpg" },
              no: {
                // Nivel 7
                pregunta: "¿Es el encargado de una tienda de conveniencia (Kwik-E-Mart)?",
                si: { personaje: "Apu Nahasapeemapetilon", img: "images/apu.jpg" },
                no: {
                  // Nivel 8
                  pregunta: "¿Es el vecino súper religioso de los Simpson?",
                  si: { personaje: "Ned Flanders", img: "images/flanders.jpg" },
                  no: { personaje: "Ned Flanders", img: "images/flanders.jpg" } // Fallback
                }
              }
            }
          }
        },
        no: {
          // ----- Subgrupo: Hombres sin un rol público/negocio claro -----
          // Nivel 4
          pregunta: "¿Es un criminal que odia a Bart y tiene un pelo muy peculiar?",
          // --- ¡CORREGIDO! ---
          si: { personaje: "Bob Patiño", img: "images/sideshow_bob.jpg" },
          no: {
            // Nivel 5
            pregunta: "Entonces... ¿es el mejor amigo de Homero y cliente frecuente de la taberna?",
            si: { personaje: "Barney Gumble", img: "images/barney.jpg" },
            no: { personaje: "Barney Gumble", img: "images/barney.jpg" } // Fallback
          }
        }
      }
    }
  }
};