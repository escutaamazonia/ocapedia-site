import ColetivosGrid from "@/components/ColetivosGrid"

async function getColetivos() {
  const res = await fetch(
    "http://localhost:1337/api/mulheres?populate=*&filters[categoria_mapa][$eq]=coletivo&pagination[pageSize]=500",
    {
      cache: "no-store",
    }
  )

  const json = await res.json()
  return json.data || []
}

export default async function ColetivosPage() {
  const coletivos = await getColetivos()

  const coletivosFormatados = coletivos.map((item: any) => ({
  id: item.id,
  documentId: item.documentId,
  nome: item.nome,
  territorio: item.territorio,
  etnia: item.etnia,
  estado: item.estado,
  identidade: item.identidade,
  atuacao: item.atuacao,

  tipo: item.tipo,
  categoria_mapa: item.categoria_mapa,

  foto: item.foto?.url
    ? `http://localhost:1337${item.foto.url}`
    : undefined,
}))

  return (
    <main className="min-h-screen bg-[#f3ead8] pt-32">
      
      <ColetivosGrid coletivos={coletivosFormatados} />
    </main>
  )
}