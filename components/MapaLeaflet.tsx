"use client"

import { useMemo, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete (L.Icon.Default.prototype as any)._getIconUrl

type Mulher = {
  id: number
  documentId?: string
  nome: string
  territorio?: string
  etnia?: string
  foto?: string
  latitude?: number | string
  longitude?: number | string
  categoria_mapa?: string
}

const categorias = [
  { valor: "todas", nome: "Todas", cor: "#1f1b16" },

  { valor: "comunicadora", nome: "Comunicadoras", cor: "#B85C38" },

  { valor: "coletivo", nome: "Coletivos", cor: "#2F6F4E" },

  { valor: "podcast", nome: "Podcasts", cor: "#7B2CBF" },

  { valor: "radio", nome: "Rádios", cor: "#2563EB" },

  { valor: "audiovisual", nome: "Audiovisual", cor: "#D97706" },

  {
    valor: "jornalismo digital",
    nome: "Jornalismo digital",
    cor: "#0F766E",
  },

  {
    valor: "docente/pesquisadora",
    nome: "Docentes/Pesquisadoras",
    cor: "#7C3AED",
  },

  { valor: "lideranca", nome: "Lideranças", cor: "#BE123C" },

  {
    valor: "midia_indigena",
    nome: "Mídia indígena",
    cor: "#047857",
  },

  { valor: "organizacao", nome: "Organizações", cor: "#0E7490" },

  { valor: "territorio", nome: "Territórios", cor: "#92400E" },
]

function getCategoria(categoria?: string) {
  return (
    categorias.find((item) => item.valor === categoria) || {
      valor: "sem_categoria",
      nome: "Sem categoria",
      cor: "#444444",
    }
  )
}

function criarIcone(categoria?: string) {
  const item = getCategoria(categoria)

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 28px;
        height: 28px;
        border-radius: ${categoria === "coletivo" ? "8px" : "999px"};
        background: ${item.cor};
        border: 3px solid #fff7ed;
        box-shadow: 0 8px 18px rgba(0,0,0,0.35);
      "></div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  })
}

export default function MapaLeaflet({
  mulheres = [],
}: {
  mulheres?: Mulher[]
}) {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas")

  const mulheresComCoordenadas = useMemo(() => {
    return mulheres
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
  }, [mulheres])

  const mulheresFiltradas = mulheresComCoordenadas.filter((mulher) => {
    if (categoriaAtiva === "todas") return true
    return mulher.categoria_mapa === categoriaAtiva
  })

  return (
    <section className="bg-[#f5ecdb] pt-12 pb-0">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Mapa Interativo
          </p>

          <h3 className="text-4xl font-black leading-tight text-[#1f1b16]">
            Cartografia da comunicação amazônica
          </h3>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5c5244]">
            Navegue por coletivos, mulheres comunicadoras,rádios comunitárias,
            podcasts, produções audiovisuais, organizações e territórios da
            comunicação afroindígena na Amazônia Legal.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {categorias.map((categoria) => (
            <button
              key={categoria.valor}
              onClick={() => setCategoriaAtiva(categoria.valor)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                categoriaAtiva === categoria.valor
                  ? "border-[#1f1b16] bg-[#1f1b16] text-white"
                  : "border-[#d8c7a8] bg-white/60 text-[#1f1b16] hover:bg-white"
              }`}
            >
              <span
                className="mr-2 inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: categoria.cor }}
              />
              {categoria.nome}
            </button>
          ))}
        </div>

        <div className="mb-4 text-sm font-semibold text-[#5c5244]">
          Exibindo {mulheresFiltradas.length} de {mulheresComCoordenadas.length}{" "}
          pontos mapeados.
        </div>

        <div className="overflow-hidden rounded-[2rem] shadow-2xl">
          <MapContainer
            center={[-8, -60]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ height: "560px", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mulheresFiltradas.map((mulher) => {
              const categoria = getCategoria(mulher.categoria_mapa)

              return (
                <Marker
                  key={mulher.id}
                  icon={criarIcone(mulher.categoria_mapa)}
                  position={[
                    mulher.latitude as number,
                    mulher.longitude as number,
                  ]}
                >
                  <Popup>
                    <a
                      href={`/mulheres/${mulher.documentId || mulher.id}`}
                      className="block w-60 text-[#1f1b16] no-underline"
                    >
                      {mulher.foto && (
                        <img
                          src={mulher.foto}
                          alt={mulher.nome}
                          className="mb-3 h-32 w-full rounded-xl object-cover"
                        />
                      )}

                      <p
                        className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide text-white"
                        style={{ backgroundColor: categoria.cor }}
                      >
                        {categoria.nome}
                      </p>

                      <h4 className="text-lg font-black">{mulher.nome}</h4>

                      <p className="mt-2 text-sm">
                        <strong>Território/Povo:</strong>{" "}
                        {mulher.territorio || "Não informado"}
                      </p>

                      <p className="text-sm">
                        <strong>Etnia:</strong>{" "}
                        {mulher.etnia || "Não informado"}
                      </p>

                      <p className="mt-3 text-sm font-bold text-[#8d4b25]">
                        Ver perfil completo →
                      </p>
                    </a>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}