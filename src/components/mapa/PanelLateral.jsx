import { LEYENDA_ORGANIZACIONES, LEYENDA_POLIGONOS } from '../../utils/coloresOrganizaciones'

// Conteo manual de puestos por organización (basado en puestos-via-publica.geojson)
const CONTEO_PUESTOS = {
  'FECOPSE (azul oscuro)': 44,
  'Queretaro de Arteaga (azul claro)': 3,
  'FETAQ': 11,
  '28 de Octubre': 2,
  'Ignacio Zaragoza': 5,
  'Francisco Villa': 1,
  'Otras organizaciones / Desconocido': 2,
}

// Badge de tipo de polígono
const TIPO_LABELS = {
  'corredor-principal': { label: 'Terreno Invadido', cls: 'bg-red-100 text-red-700' },
  'corredor': { label: 'Corredor', cls: 'bg-orange-100 text-orange-700' },
  'tianguis': { label: 'Tianguis', cls: 'bg-green-100 text-green-700' },
  'propuesta-reubicacion': { label: 'Propuesta de Reubicación', cls: 'bg-cyan-100 text-cyan-700' },
}

function SeccionInfo({ titulo, contenido }) {
  if (!contenido) return null
  return (
    <div className="mb-3">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{titulo}</span>
      <p className="text-sm text-gray-700 mt-0.5 leading-snug">{contenido}</p>
    </div>
  )
}

function LeyendaPoligonos() {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Polígonos</p>
      {LEYENDA_POLIGONOS.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2 mb-1.5">
          <span
            className="inline-block w-4 h-4 rounded-sm flex-shrink-0"
            style={{ backgroundColor: color + '55', border: `2px solid ${color}` }}
          />
          <span className="text-xs text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  )
}

function LeyendaPuestos() {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Puestos por organización</p>
      {LEYENDA_ORGANIZACIONES.map(({ nombre, color }) => {
        const conteo = CONTEO_PUESTOS[nombre] || 0
        return (
          <div key={nombre} className="flex items-center gap-2 mb-1.5">
            <span
              className="inline-block w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color + '55', border: `2.5px solid ${color}` }}
            />
            <span className="text-xs text-gray-600">
              {nombre} <span className="font-medium text-gray-800">({conteo})</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function PanelLateral({ feature, onClose }) {
  const props = feature?.properties

  return (
    <div className="w-80 bg-white shadow-xl flex flex-col overflow-hidden z-10 flex-shrink-0">
      {/* ── Encabezado ── */}
      <div className="bg-blue-700 text-white px-4 py-3 flex-shrink-0">
        <h1 className="text-base font-bold leading-tight">Comercio Zona 3 - Valle de Santiago - Ciudad del Sol</h1>
        <p className="text-xs text-blue-200 mt-0.5">Mapa interactivo de comercio en vía pública</p>
      </div>

      {/* ── Contenido scrollable ── */}
      <div className="flex-1 overflow-y-auto">

        {/* Panel de detalle o bienvenida */}
        <div className="px-4 pt-4 pb-2">
          {props ? (
            /* ── Vista detalle de un feature ── */
            <>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-sm font-bold text-gray-800 leading-tight pr-2">{props.nombre}</h2>
                <button
                  onClick={onClose}
                  title="Cerrar"
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none flex-shrink-0 mt-0.5 cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Badge de tipo */}
              {props.tipo && TIPO_LABELS[props.tipo] && (
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${TIPO_LABELS[props.tipo].cls}`}>
                  {TIPO_LABELS[props.tipo].label}
                </span>
              )}

              {/* Badge de estatus para corredores cerrados */}
              {props.estatus === 'cerrado' && (
                <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 bg-gray-100 text-gray-600 ml-2">
                  Cerrado
                </span>
              )}

              {/* Badge de estatus para corredores abiertos */}
              {props.estatus === 'abierto' && (
                <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 bg-green-100 text-green-600 ml-2">
                  Abierto
                </span>
              )}

              <SeccionInfo titulo="Organización" contenido={props.organizacion} />
              <SeccionInfo titulo="Ubicación" contenido={props.ubicacion} />
              <SeccionInfo titulo="Descripción" contenido={props.descripcion} />
              <SeccionInfo titulo="Horario" contenido={props.horario} />
              <SeccionInfo titulo="Contacto" contenido={props.contacto} />

              {/* Botón de imágenes */}
              {props.imagen_url && (
                <div className="mb-3">
                  <a
                    href={props.imagen_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Ver imágenes
                  </a>
                </div>
              )}

              {/* Problemáticas */}
              {props.problematicas?.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Problemáticas</span>
                  <ul className="mt-1 space-y-1">
                    {props.problematicas.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Denuncias */}
              {props.denuncias?.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Denuncias</span>
                  <ul className="mt-1 space-y-1">
                    {props.denuncias.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span className="text-orange-400 font-bold mt-0.5 flex-shrink-0">•</span>
                        <span className="leading-snug">Folio {d.folio} — {d.tipo}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Estado actual: medidas implementadas */}
              {props.estado_actual?.medidas_implementadas?.length > 0 && (
                <div className="mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Medidas implementadas</span>
                  <ul className="mt-1 space-y-1">
                    {props.estado_actual.medidas_implementadas.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                        <span className="leading-snug">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <SeccionInfo titulo="Evaluación" contenido={props.estado_actual?.evaluacion} />
              <SeccionInfo titulo="Análisis de propuesta" contenido={props.analisis_propuesta} />
            </>
          ) : (
            /* ── Vista bienvenida ── */
            <>
              <h2 className="text-sm font-bold text-gray-700 mb-2">¿Cómo usar el mapa?</h2>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">
                Haz clic en cualquier <strong>polígono</strong> (corredor o tianguis) para ver su información detallada, incluyendo organización, descripción y problemáticas reportadas.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Los <strong>círculos de colores</strong> representan puestos en vía pública. Haz clic para ver el giro y la organización a la que pertenecen.
              </p>
            </>
          )}
        </div>

        {/* Separador */}
        <div className="mx-4 border-t border-gray-100 my-2" />

        {/* ── Leyenda ── */}
        <div className="px-4 pb-4">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Leyenda</h3>
          <LeyendaPoligonos />
          <LeyendaPuestos />
        </div>
      </div>
    </div>
  )
}