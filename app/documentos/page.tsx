import DocumentosBiblioteca from "@/components/DocumentosBiblioteca"
import { API_URL } from "@/lib/api"

async function getDocumentos() {
  try {
    const res = await fetch(
      `${API_URL}/api/documentos?populate=*`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

export default async function DocumentosPage() {
  const documentos = await getDocumentos()

  return <DocumentosBiblioteca documentos={documentos} />
}