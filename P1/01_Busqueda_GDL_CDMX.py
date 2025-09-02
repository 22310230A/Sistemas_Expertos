# Búsquedas A* y AO* aplicadas al ejemplo GDL → CDMX

import heapq

# Grafo con pesos (distancias en km)
grafo = {
    'Guadalajara': [('León', 220), ('Morelia', 290)],
    'León': [('Querétaro', 190), ('San Luis', 180)],
    'San Luis': [('Querétaro', 210)],
    'Querétaro': [('CDMX', 220), ('Toluca', 180)],
    'Toluca': [('CDMX', 70)],
    'Morelia': [('CDMX', 310)],
    'CDMX': []
}

# Heurística (distancia en línea recta aprox. hacia CDMX en km)
heuristica = {
    'Guadalajara': 460,
    'León': 340,
    'San Luis': 360,
    'Querétaro': 220,
    'Toluca': 70,
    'Morelia': 310,
    'CDMX': 0
}

# --------------------- A* ---------------------
def busqueda_a_estrella(grafo, heuristica, inicio, objetivo):
    cola = [(heuristica[inicio], 0, [inicio])]  # (f, g, camino)
    visitados = set()

    while cola:
        f, g, camino = heapq.heappop(cola)
        actual = camino[-1]

        if actual == objetivo:
            return camino, g

        if actual in visitados:
            continue
        visitados.add(actual)

        for vecino, costo in grafo.get(actual, []):
            if vecino not in visitados:
                g_nuevo = g + costo
                f_nuevo = g_nuevo + heuristica[vecino]
                heapq.heappush(cola, (f_nuevo, g_nuevo, camino + [vecino]))

    return None, float('inf')

# --------------------- AO* (simplificado) ---------------------
def busqueda_ao_estrella(grafo, heuristica, inicio, objetivo):
    actual = inicio
    camino = [actual]

    while actual != objetivo:
        vecinos = grafo.get(actual, [])

        if not vecinos:
            return None

        mejor_vecino = min(vecinos, key=lambda x: x[1] + heuristica[x[0]])
        actual = mejor_vecino[0]
        camino.append(actual)

    return camino

# --------------------- Pruebas ---------------------
inicio = 'Guadalajara'
objetivo = 'CDMX'

camino_a, costo_a = busqueda_a_estrella(grafo, heuristica, inicio, objetivo)
print(f"[A*] Camino: {camino_a}, Distancia total: {costo_a} km")

camino_ao = busqueda_ao_estrella(grafo, heuristica, inicio, objetivo)
print(f"[AO*] Camino (aproximado): {camino_ao}")
