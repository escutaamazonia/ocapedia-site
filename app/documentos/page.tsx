import DocumentosBiblioteca from "@/components/DocumentosBiblioteca"

async function getDocumentos() {
  try {
    const res = await fetch(
      "http://localhost:1337/api/documentos?populate=*",
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