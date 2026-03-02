// Mapeo de organizaciones a colores hexadecimales
export const COLORES_ORGANIZACIONES = {
  'Unión de Comerciantes Peñaflor': '#3b82f6',   // azul
  'CANACO':                          '#eab308',   // amarillo
  'FONART':                          '#a855f7',   // morado
  'Comerciantes Independientes':     '#f97316',   // naranja
}

export const COLOR_DEFAULT = '#6b7280' // gris (para organizaciones no listadas)

/**
 * Retorna el color hexadecimal correspondiente a una organización.
 * Si la organización no está en el catálogo, retorna el color por defecto (gris).
 */
export function getColorOrganizacion(organizacion) {
  return COLORES_ORGANIZACIONES[organizacion] ?? COLOR_DEFAULT
}

// Entradas de leyenda en el orden en que deben mostrarse
export const LEYENDA_ORGANIZACIONES = [
  { nombre: 'Unión de Comerciantes Peñaflor', color: '#3b82f6' },
  { nombre: 'CANACO',                          color: '#eab308' },
  { nombre: 'FONART',                          color: '#a855f7' },
  { nombre: 'Comerciantes Independientes',     color: '#f97316' },
  { nombre: 'Otras organizaciones',            color: '#6b7280' },
]

export const LEYENDA_POLIGONOS = [
  { label: 'Corredor Peñaflor',        color: '#ef4444' },
  { label: 'Corredores cercanos',       color: '#f97316' },
  { label: 'Tianguis cercanos',         color: '#22c55e' },
  { label: 'Propuesta de reubicación',  color: '#0891b2' },
]
