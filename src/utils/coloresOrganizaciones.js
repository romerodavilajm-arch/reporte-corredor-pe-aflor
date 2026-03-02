// Mapeo de organizaciones a colores hexadecimales
export const COLORES_ORGANIZACIONES = {
  'FECOPSE':             '#1e3a8a',   // azul oscuro
  'FETAQ':               '#a855f7',   // morado
  '28 de Octubre':       '#166534',   // verde oscuro
  'Ignacio Zaragoza':    '#eab308',   // amarillo
  'Ignazio Zaragoza':    '#eab308',   // amarillo (variante con z)
  'Francisco Villa':     '#dc2626',   // rojo
  'Queretaro de Arteaga': '#60a5fa',  // azul claro
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
  { nombre: 'FECOPSE (azul oscuro)',        color: '#1e3a8a' },
  { nombre: 'Queretaro de Arteaga (azul claro)', color: '#60a5fa' },
  { nombre: 'FETAQ',                         color: '#a855f7' },
  { nombre: '28 de Octubre',                  color: '#166534' },
  { nombre: 'Ignacio Zaragoza',               color: '#eab308' },
  { nombre: 'Francisco Villa',                color: '#dc2626' },
  { nombre: 'Otras organizaciones / Desconocido', color: '#6b7280' },
]

export const LEYENDA_POLIGONOS = [
  { label: 'Corredor Peñaflor',        color: '#ef4444' },
  { label: 'Corredores cercanos',       color: '#f97316' },
  { label: 'Tianguis cercanos',         color: '#22c55e' },
  { label: 'Propuesta de reubicación',  color: '#0891b2' },
]