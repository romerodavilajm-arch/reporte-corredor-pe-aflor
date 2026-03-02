import { useState } from 'react'
import MapaReporte  from './components/mapa/MapaReporte'
import PanelLateral from './components/mapa/PanelLateral'

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState(null)

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Panel lateral izquierdo */}
      <PanelLateral
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />

      {/* Área del mapa */}
      <div className="flex-1 relative">
        <MapaReporte onFeatureSelect={setSelectedFeature} />
      </div>
    </div>
  )
}
