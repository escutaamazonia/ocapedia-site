import MulheresGrid from "@/components/MulheresGrid"
import { API_URL } from "@/lib/api"

async function getMulheres() {
  try {
    const res = await fetch(
      `${API_URL}/api/mulheres?populate=*&pagination[pageSize]=500`,
      {
        cache: "no-store",
      }
    )

    if (!res.ok) {
      console.error("Erro ao buscar mulheres:", res.status)
      return []
    }

    const json = await res.json()

    return Array.isArray(json.data) ? json.data : []
  } catch (error) {
    console.error("Erro no fetch de mulheres:", error)
    return []
  }
}

export default async function MulheresPage() {
  const mulheres = await getMulheres()

  const mulheresFormatadas = mulheres.map((mulher: any) => ({
    id: mulher.id,
    documentId: mulher.documentId,
    nome: mulher.nome || "",
    territorio: mulher.territorio || "",
    etnia: mulher.etnia || "",
    estado: mulher.estado || "",
    identidade: mulher.identidade || mulher.autoidentificacao || "",
    categoria_mapa: mulher.categoria_mapa || "",

    foto: mulher.foto?.url
      ? `${API_URL}${mulher.foto.url}`
      : undefined,
  }))

  return <MulheresGrid mulheres={mulheresFormatadas} />
}