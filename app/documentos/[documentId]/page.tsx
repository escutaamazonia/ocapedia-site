import { API_URL } from "@/lib/api"
import { notFound } from "next/navigation"

function textoBlocks(blocks: any) {
  if (!Array.isArray(blocks)) return blocks || ""

  return blocks
    .map((bloco: any) =>
      bloco.children?.map((child: any) => child.text).join("")
    )
    .join("\n\n")
}

async function getDocumento(documentId: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/documentos?filters[documentId][$eq]=${documentId}&populate=*`,
      { cache: "no-store" }
    )

    const json = await res.json()
    return json.data?.[0] || null
  } catch {
    return null
  }
}

export default async function DocumentoPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params
  const documento = await getDocumento(documentId)

  if (!documento) notFound()

  const resumo = textoBlocks(documento.resumo)

  return (
    <main className="min-h-screen bg-[#f5ecdb] px-6 py-24 text-[#1f1b16]">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          {documento.tipo_documento || "Documento"}
        </p>

        <h1 className="text-5xl font-black leading-tight">
          {documento.titulo}
        </h1>

        <div className="mt-8 space-y-2 text-xl text-[#4f4638]">
          {documento.autora && <p>{documento.autora}</p>}
          {documento.instituicao && <p>{documento.instituicao}</p>}
          {documento.ano_publicacao && <p>{documento.ano_publicacao}</p>}
          {documento.identidades && <p>{documento.identidades}</p>}
          {documento.tipo_verbete && <p>Tipo de verbete: {documento.tipo_verbete}</p>}
        </div>

        {resumo && (
          <div className="mt-12 rounded-[2rem] bg-white p-10 shadow-sm">
            <h2 className="mb-6 text-2xl font-black">Resumo</h2>
            <p className="whitespace-pre-line leading-relaxed text-[#4f4638]">
              {resumo}
            </p>
          </div>
        )}

        {documento.palavras_chave && (
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-xl font-black">Palavras-chave</h2>
            <p className="text-[#4f4638]">{documento.palavras_chave}</p>
          </div>
        )}

        {documento.verbetes_extraidos?.length > 0 && (
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-xl font-black">Verbetes relacionados</h2>

            <div className="flex flex-wrap gap-3">
              {documento.verbetes_extraidos.map((verbete: string) => (
                <span
                  key={verbete}
                  className="rounded-full bg-[#e7dcc8] px-4 py-2 text-sm font-bold text-[#17311f]"
                >
                  {verbete}
                </span>
              ))}
            </div>
          </div>
        )}

        {documento.link_documento && (
          <a
            href={documento.link_documento}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-full bg-[#17311f] px-8 py-4 font-bold text-white"
          >
            Acessar documento
          </a>
        )}
      </section>
    </main>
  )
}