# Función que representa la relación condicional
def si_lampara_encendida_entonces_hay_electricidad(encendida):
    # Si la lámpara está encendida, entonces debe haber electricidad
    if encendida:
        return True  # Hay electricidad
    else:
        return False  # No hay electricidad

# Condición: No hay electricidad
electricidad = False

# Aplicando la inferencia de Modus Tollens
lampara_encendida = not electricidad  # Si no hay electricidad, la lámpara no puede estar encendida

# Resultados
print("Modus Tollens (Ejemplo 2):")
print("¿Hay electricidad?", electricidad)
print("¿La lámpara está encendida?", lampara_encendida)
