# Función que representa la relación condicional
def si_recibe_agua_entonces_crece(agua):
    # Si la planta recibe suficiente agua, crecerá
    if agua:
        return True  # La planta crece
    else:
        return False  # La planta no crece

# Condición: La planta recibe suficiente agua
suficiente_agua = True

# Aplicando la inferencia de Modus Ponens
planta_crece = si_recibe_agua_entonces_crece(suficiente_agua)

# Resultados
print("Modus Ponens (Ejemplo 3):")
print("¿La planta recibe suficiente agua?", suficiente_agua)
print("¿La planta crece?", planta_crece)
