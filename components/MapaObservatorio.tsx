import { API_URL } from "@/lib/api"

"use client"

import { useEffect, useState } from "react"

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

const coordenadasEstados: Record<
  string,
  {
    latitude: number
    longitude: number
  }
> = {
  Pará: {
    latitude: -3.4653,
    longitude: -52.2159,
  },

  Amazonas: {
    latitude: -3.4168,
    longitude: -65.8561,
  },

  Maranhão: {
    latitude: -5.2085,
    longitude: -45.393,
  },

  "Mato Grosso": {
    latitude: -12.6819,
    longitude: -56.9211,
  },

  Acre: {
    latitude: -9.0238,
    longitude: -70.812,
  },

  Rondônia: {
    latitude: -10.83,
    longitude: -63.34,
  },

  Amapá: {
    latitude: 1.41,
    longitude: -51.77,
  },

  Tocantins: {
    latitude: -10.25,
    longitude: -48.25,
  },

  Roraima: {
    latitude: 1.99,
    longitude: -61.33,
  },
}

export default function MapaObservatorio() {
  const [indicadores, setIndicadores] = useState<any[]>([])

  useEffect(() => {
    async function carregarIndicadores() {
      try {
        const res = await fetch(
          `${API_URL}/api/indicadors`
        )

        const json = await res.json()

        setIndicadores(json.data || [])
      } catch {
        setIndicadores([])
      }
    }

    carregarIndicadores()
  }, [])

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#d8cab2] shadow-sm">

      <MapContainer
        center={[-6, -58]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-[620px] w-full z-0"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {indicadores.map((item) => {

          const estado = item.estado

          const coordenada =
            coordenadasEstados[estado]

          if (!coordenada) return null

          return (

            <CircleMarker
              key={item.id}
              center={[
                coordenada.latitude,
                coordenada.longitude,
              ]}
              radius={18}
              pathOptions={{
                color: "#8d6b2f",
                fillColor: "#8d6b2f",
                fillOpacity: 0.7,
              }}
            >

              <Popup>

                <div className="space-y-2">

                  <h3 className="text-lg font-black">
                    {item.estado}
                  </h3>

                  <p>
                    <strong>{item.titulo}</strong>
                  </p>

                  <p>
                    {item.valor}
                    {item.unidade}
                  </p>

                  <p className="text-sm">
                    {item.fonte}
                  </p>

                  <p className="text-sm text-neutral-600">
                    {item.ano}
                  </p>

                </div>

              </Popup>

            </CircleMarker>

          )

        })}

      </MapContainer>

    </div>
  )
}