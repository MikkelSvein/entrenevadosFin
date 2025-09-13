'use client'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function RouteMapView({ plans }) {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const coords = plans
      .filter((plan) => plan.coords && plan.coords.length === 2)
      .map((plan) => ({ id: plan.id, latlng: plan.coords, title: plan.title }))
    setPositions(coords)
  }, [plans])

  if (positions.length === 0) {
    return <p className="text-center text-gray-500">Selecciona planes para ver la ruta en el mapa</p>
  }

  const customIcon = new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  return (
    <MapContainer center={positions[0].latlng} zoom={12} scrollWheelZoom={false} className="leaflet-container rounded shadow" >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {positions.map(({ id, latlng, title }) => (
        <Marker key={id} position={latlng} icon={customIcon}>
          <Popup>{title}</Popup>
        </Marker>
      ))}
      <Polyline positions={positions.map((p) => p.latlng)} color="blue" />
    </MapContainer>
  )
}
