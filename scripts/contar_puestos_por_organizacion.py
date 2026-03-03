import json
from collections import Counter

# Configuración
ARCHIVO = '../src/data/puestos-via-publica.geojson'

def contar_por_organizacion():
    # Leer el archivo
    with open(ARCHIVO, 'r', encoding='utf-8') as f:
        datos = json.load(f)
    
    # Contar puestos por organización
    conteo = Counter()
    
    for feature in datos['features']:
        organizacion = feature['properties'].get('organizacion', 'No especificada')
        conteo[organizacion] += 1
    
    # Mostrar resultados
    print("=" * 50)
    print("📊 CONTEO DE PUESTOS POR ORGANIZACIÓN")
    print("=" * 50)
    
    # Ordenar de mayor a menor
    for organizacion, cantidad in sorted(conteo.items(), key=lambda x: x[1], reverse=True):
        porcentaje = (cantidad / len(datos['features'])) * 100
        print(f"{organizacion:30} → {cantidad:3} puestos ({porcentaje:.1f}%)")
    
    print("=" * 50)
    print(f"📌 TOTAL: {len(datos['features'])} puestos")
    print("=" * 50)
    
    return conteo

def contar_con_normalizacion():
    """Versión que normaliza variantes de nombres"""
    with open(ARCHIVO, 'r', encoding='utf-8') as f:
        datos = json.load(f)
    
    # Mapa de normalización (para variantes)
    normalizar = {
        'Ignazio Zaragoza': 'Ignacio Zaragoza',
        'Ignacio Zaragoza': 'Ignacio Zaragoza',
        'Queretaro de Arteaga': 'Querétaro de Arteaga',
        'Francisco Villa': 'Francisco Villa',
        'FECOPSE': 'FECOPSE',
        'FETAQ': 'FETAQ',
        '28 de Octubre': '28 de Octubre',
        'Desconocido': 'Desconocido'
    }
    
    conteo = Counter()
    
    for feature in datos['features']:
        org = feature['properties'].get('organizacion', 'Desconocido')
        org_norm = normalizar.get(org, org)  # Normalizar si existe en el mapa
        conteo[org_norm] += 1
    
    print("\n" + "=" * 50)
    print("📊 CONTEO NORMALIZADO (variantes unificadas)")
    print("=" * 50)
    
    for org, cantidad in sorted(conteo.items(), key=lambda x: x[1], reverse=True):
        print(f"{org:25} → {cantidad:2} puestos")
    
    print("=" * 50)
    return conteo

def guardar_resultados(conteo, archivo_salida='conteo_organizaciones.txt'):
    """Guarda los resultados en un archivo de texto"""
    with open(archivo_salida, 'w', encoding='utf-8') as f:
        f.write("📊 CONTEO DE PUESTOS POR ORGANIZACIÓN\n")
        f.write("=" * 40 + "\n")
        
        for org, cant in sorted(conteo.items(), key=lambda x: x[1], reverse=True):
            f.write(f"{org}: {cant} puestos\n")
        
        f.write("=" * 40 + "\n")
        f.write(f"TOTAL: {sum(conteo.values())} puestos\n")
    
    print(f"\n✅ Resultados guardados en: {archivo_salida}")

if __name__ == "__main__":
    # Ejecutar conteo básico
    conteo = contar_por_organizacion()
    
    # Ejecutar conteo normalizado (opcional)
    contar_con_normalizacion()
    
    # Guardar resultados
    guardar_resultados(conteo)