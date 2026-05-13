"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

type Mulher = {
  id: number
  documentId?: string
  nome: string
  territorio?: string
  etnia?: string
  foto?: string
  latitude?: number | string
  longitude?: number | string
}

export default function MapaLeaflet({
  mulheres = [],
}: {
  mulheres?: Mulher[]
}) {
  const mulheresComCoordenadas = mulheres
    .map((mulher) => ({
      ...mulher,
      latitude: Number(mulher.latitude),
      longitude: Number(mulher.longitude),
    }))
    .filter(
      (mulher) =>
        !Number.isNaN(mulher.latitude) &&
        !Number.isNaN(mulher.longitude)
    )

  return (
    <section className="bg-[#f5ecdb] pt-12 pb-0">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Mapa Interativo
          </p>

          <h3 className="text-4xl font-black leading-tight text-[#1f1b16]">
            Mulheres comunicantes da Amazônia
          </h3>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5c5244]">
            Navegue por territórios, rádios comunitárias, coletivos, podcasts,
            produções acadêmicas e iniciativas digitais conduzidas por mulheres
            negras e indígenas.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] shadow-2xl">
          <MapContainer
            center={[-8, -60]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ height: "520px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mulheresComCoordenadas.map((mulher) => (
              <Marker
                key={mulher.id}
                position={[
                  mulher.latitude as number,
                  mulher.longitude as number,
                ]}
              >
                <Popup>
                  <a
                    href={`/mulheres/${mulher.documentId || mulher.id}`}
                    className="block w-56 text-[#1f1b16] no-underline"
                  >
                    {mulher.foto && (
                      <img
                        src={mulher.foto}
                        alt={mulher.nome}
                        className="mb-3 h-32 w-full rounded-xl object-cover"
                      />
                    )}

                    <h4 className="text-lg font-black">{mulher.nome}</h4>

                    <p className="mt-2 text-sm">
                      <strong>Povo:</strong>{" "}
                      {mulher.territorio || "Não informado"}
                    </p>

                    <p className="text-sm">
                      <strong>Etnia:</strong>{" "}
                      {mulher.etnia || "Não informado"}
                    </p>
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}