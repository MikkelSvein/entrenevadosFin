'use client'
import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'

const userIcon = new L.Icon({
  iconUrl: '/images/user-marker.png',
  iconSize: [32, 32],
})

const markerIcon = new L.Icon({
  iconUrl: '/images/marker.png',
  iconSize: [28, 28],
})

function RoutingControl({ userPos, destination }) {
  const map = useMap()
  const routingControlRef = useRef(null)

  useEffect(() => {
    if (!userPos || !destination) return

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current)
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(userPos[0], userPos[1]),
        L.latLng(destination.coords[0], destination.coords[1]),
      ],
      routeWhileDragging: true,
      show: true,
      addWaypoints: false,
      draggableWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map)

    return () => map.removeControl(routingControlRef.current)
  }, [map, userPos, destination])

  return null
}

export default function MapView({ selectedPlan }) {
  const [userPos, setUserPos] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => alert('No se pudo obtener la ubicación')
      )
    }
  }, [])

  const center = userPos || [4.4389, -75.2322] // Centro predeterminado

  return (
    <MapContainer center={center} zoom={11} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {userPos && <Marker position={userPos} icon={userIcon}><Popup>Tu ubicación</Popup></Marker>}

      {selectedPlan && (
        <>
          <Marker position={selectedPlan.coords} icon={markerIcon}>
            <Popup>{selectedPlan.name}</Popup>
          </Marker>
          <RoutingControl userPos={userPos} destination={selectedPlan} />
        </>
      )}
    </MapContainer>
  )
}
