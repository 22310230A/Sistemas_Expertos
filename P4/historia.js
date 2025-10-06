export function generarHistoria(culpable, arma, lugar) {
  switch (culpable) {
    case "Clara Montes":
      return `La cocinera Clara Montes perdió el control. Con ${arma}, cometió el crimen en ${lugar}.`;
    case "Elena Vidal":
      return `La bibliotecaria Elena Vidal descubrió un secreto. Con ${arma}, eliminó a su víctima en ${lugar}.`;
    case "Marcos Salazar":
      return `El empresario Marcos Salazar planeó el crimen con cuidado. Usó ${arma} en ${lugar}.`;
    case "Sofía Ortega":
      return `La enfermera Sofía Ortega vengó una traición. Con ${arma}, lo hizo dentro de ${lugar}.`;
    case "Ricardo Márquez":
      return `El jardinero Ricardo Márquez, cansado de los abusos, usó ${arma} en ${lugar}.`;
    default:
      return "No se pudo determinar al culpable.";
  }
}
