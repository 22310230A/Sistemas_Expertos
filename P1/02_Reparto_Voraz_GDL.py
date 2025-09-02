# Búsqueda Voraz – Reparto en GDL

# Grafo de rutas aproximadas de reparto en GDL
grafo = {
    'Auditorio Benito Juárez': ['Chapalita', 'Parque Alcalde', 'Circunvalación'],
    'Chapalita': ['López Cotilla', 'Nuevo Periférico'],
    'Parque Alcalde': ['López Cotilla', 'Santa Teresa'],
    'Circunvalación': ['Chapalita', 'Santa Teresa', 'Nuevo Periférico'],
    'López Cotilla': ['Álamo Industrial'],
    'Nuevo Periférico': ['Álamo Industrial'],
    'Santa Teresa': ['Álamo Industrial'],
    'Álamo Industrial': []  # destino final
}

# Heurística: tiempo aproximado restante hasta Álamo Industrial (minutos)
heuristica = {
    'Auditorio Benito Juárez': 15,
    'Chapalita': 8,
    'Parque Alcalde': 12,
    'Circunvalación': 12,
    'López Cotilla': 6,
    'Nuevo Periférico': 7,
    'Santa Teresa': 7,
    'Álamo Industrial': 0
}

# --------------------- Búsqueda Voraz ---------------------
def busqueda_voraz(grafo, heuristica, inicio, objetivo):
    visitados = set()
    camino = [inicio]
    actual = inicio

    while actual != objetivo:
        visitados.add(actual)
        vecinos_no_visitados = [n for n in grafo[actual] if n not in visitados]

        if not vecinos_no_visitados:
            return None  # No hay ruta disponible

        # Elegimos el vecino con menor heurística
        actual = min(vecinos_no_visitados, key=lambda n: heuristica[n])
        camino.append(actual)

    return camino

# --------------------- Prueba ---------------------
inicio = 'Auditorio Benito Juárez'
objetivo = 'Álamo Industrial'
camino = busqueda_voraz(grafo, heuristica, inicio, objetivo)

print(f"Camino recomendado: {camino}")
