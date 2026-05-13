"use client"

import dynamic from "next/dynamic"

const MapaLeaflet = dynamic(() => import("./MapaLeaflet"), {
  ssr: false,
})

type Mulher = {
  id: number
  nome: string
  territorio?: string
  etnia?: string
  foto?: string
  latitude?: number | string
  longitude?: number | string
}

export default function Mapa({
  mulheres = [],
}: {
  mulheres?: Mulher[]
}) {
  return <MapaLeaflet mulheres={mulheres} />
}