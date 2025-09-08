import json
import os
import difflib

# Ruta del archivo
ruta_base = os.path.dirname(os.path.abspath(__file__))
archivo_conocimiento = os.path.join(ruta_base, "conocimiento.json")

# Leer conocimiento con UTF-8
with open(archivo_conocimiento, "r", encoding="utf-8") as file:
    conocimiento = json.load(file)

print("Chat interactivo (escribe 'salir' para terminar)")

while True:
    user_input = input("Tú: ").lower().strip()
    if user_input == "salir":
        print("Chat: ¡Hasta luego!")
        break

    # Buscar coincidencia aproximada usando difflib
    posibles_claves = list(conocimiento.keys())
    coincidencia = difflib.get_close_matches(user_input, posibles_claves, n=1, cutoff=0.6)
    
    if coincidencia:
        respuesta = conocimiento[coincidencia[0]]
        print("Chat:", respuesta)
    else:
        # Aprender nueva respuesta
        nueva_respuesta = input("No entiendo. ¿Cuál sería la respuesta correcta?: ").strip()
        conocimiento[user_input] = nueva_respuesta
        with open(archivo_conocimiento, "w", encoding="utf-8") as file:
            json.dump(conocimiento, file, indent=4, ensure_ascii=False)
        print("Gracias, he aprendido una nueva respuesta.")
