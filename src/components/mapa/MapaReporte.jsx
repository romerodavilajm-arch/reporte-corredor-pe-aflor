import { useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet'
import { getColorOrganizacion } from '../../utils/coloresOrganizaciones'

import corredorPenaflor   from '../../data/corredor-penaflor.geojson'
import corredoresCercanos from '../../data/corredores-cercanos.geojson'
import tianguisCercanos   from '../../data/tianguis-cercanos.geojson'
import puestosViaPublica  from '../../data/puestos-via-publica.geojson'

// Colores base por tipo de polígono
const COLORES_TIPO = {
  'corredor-principal': { stroke: '#ef4444', fill: '#ef4444' },
  'corredor':           { stroke: '#f97316', fill: '#f97316' },
  'tianguis':           { stroke: '#22c55e', fill: '#22c55e' },
}

function colorPorTipo(tipo) {
  return COLORES_TIPO[tipo] ?? { stroke: '#6b7280', fill: '#6b7280' }
}

function estiloNormal(feature) {
  const { stroke, fill } = colorPorTipo(feature.properties.tipo)
  return {
    color:       stroke,
    fillColor:   fill,
    fillOpacity: 0.25,
    weight:      2,
    opacity:     0.85,
  }
}

function estiloHover(feature) {
  const { stroke, fill } = colorPorTipo(feature.properties.tipo)
  return {
    color:       stroke,
    fillColor:   fill,
    fillOpacity: 0.5,
    weight:      3,
    opacity:     1,
  }
}

// Capa GeoJSON reutilizable para polígonos
function CapaPoligonos({ data, onSelect }) {
  // Guardamos la referencia de la capa actualmente resaltada para restaurar su estilo
  const layerActivo = useRef(null)

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover(e) {
        e.target.setStyle(estiloHover(feature))
        e.target.bringToFront()
      },
      mouseout(e) {
        // Solo restaurar si no es el polígono seleccionado actualmente
        if (layerActivo.current !== e.target) {
          e.target.setStyle(estiloNormal(feature))
        }
      },
      click() {
        // Restaurar estilo del anterior seleccionado
        if (layerActivo.current) {
          layerActivo.current.setStyle(estiloNormal(
            layerActivo.current.feature
          ))
        }
        layerActivo.current = layer
        onSelect(feature)
      },
    })
  }

  return (
    <GeoJSON
      data={data}
      style={estiloNormal}
      onEachFeature={onEachFeature}
    />
  )
}

export default function MapaReporte({ onFeatureSelect }) {
  // Centro aproximado del corredor principal
  const center = [19.4303, -99.1330]

  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      // Desplazar el zoom con scroll sobre el mapa sin Ctrl
      scrollWheelZoom={true}
    >
      {/* Capa base OSM */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ── Polígonos ── */}
      <CapaPoligonos data={corredorPenaflor}   onSelect={onFeatureSelect} />
      <CapaPoligonos data={corredoresCercanos} onSelect={onFeatureSelect} />
      <CapaPoligonos data={tianguisCercanos}   onSelect={onFeatureSelect} />

      {/* ── Puestos en vía pública (CircleMarkers coloreados por organización) ── */}
      {puestosViaPublica.features.map((feature, idx) => {
        const [lng, lat] = feature.geometry.coordinates
        const { nombre, giro, organizacion } = feature.properties
        const color = getColorOrganizacion(organizacion)

        return (
          <CircleMarker
            key={idx}
            center={[lat, lng]}
            radius={6}
            pathOptions={{
              color:       color,
              fillColor:   color,
              fillOpacity: 0.75,
              weight:      1.5,
            }}
          >
            <Popup>
              <div className="text-xs leading-relaxed min-w-[140px]">
                {nombre && <p className="font-semibold text-sm mb-1">{nombre}</p>}
                <p>
                  <span className="font-medium text-gray-600">Giro: </span>
                  {giro}
                </p>
                <p className="mt-0.5 flex items-center gap-1">
                  <span className="font-medium text-gray-600">Organización: </span>
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span>{organizacion}</span>
                </p>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
