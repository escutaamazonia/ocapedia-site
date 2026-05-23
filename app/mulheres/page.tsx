import MulheresGrid from "@/components/MulheresGrid"
import { API_URL } from "@/lib/api"

async function getMulheres() {
  const res = await fetch(
    `${API_URL}/api/mulheres?populate=*&pagination[pageSize]=500`,
    {
      cache: "no-store",
    }
  )

  const json = await res.json()

  return json.data
}

export default async function MulheresPage() {
  const mulheres = await getMulheres()
  
  console.log("MULHERES STRAPI:", mulheres)

  const mulheresFormatadas = mulheres.map((mulher: any) => ({
    id: mulher.id,
    documentId: mulher.documentId,
    nome: mulher.nome,
    territorio: mulher.territorio,
    etnia: mulher.etnia,
    estado: mulher.estado,
    identidade: mulher.identidade,

    categoria_mapa: mulher.categoria_mapa,

    foto: mulher.foto?.url
      ? `http://localhost:1337${mulher.foto.url}`
      : undefined,
  }))

  return (
    <MulheresGrid mulheres={mulheresFormatadas} />
  )
}