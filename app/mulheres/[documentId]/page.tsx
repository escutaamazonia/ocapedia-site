import { API_URL } from "@/lib/api"
import { notFound } from "next/navigation"

async function getDocumento(documentId: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/documentos?filters[documentId][$eq]=${documentId}&populate=*`,
      {
        cache: "no-store",
      }
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

  if (!documento) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#f5ecdb] px-6 py-24 text-[#1f1b16]">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Documento
        </p>

        <h1 className="text-5xl font-black leading-tight">
          {documento.titulo}
        </h1>

        {documento.autora && (
          <p className="mt-6 text-xl text-[#4f4638]">
            {documento.autora}
          </p>
        )}

        {documento.instituicao && (
          <p className="mt-2 text-[#4f4638]">
            {documento.instituicao}
          </p>
        )}

        {documento.ano_publicacao && (
          <p className="mt-2 text-[#4f4638]">
            {documento.ano_publicacao}
          </p>
        )}

        {documento.resumo && (
          <div className="mt-12 rounded-[2rem] bg-white p-10 shadow-sm">
            <h2 className="mb-6 text-2xl font-black">
              Resumo
            </h2>

            <p className="leading-relaxed text-[#4f4638]">
              {typeof documento.resumo === "string"
                ? documento.resumo
                : JSON.stringify(documento.resumo)}
            </p>
          </div>
        )}

        {documento.link_documento && (
          <a
            href={documento.link_documento}
            target="_blank"
            className="mt-10 inline-flex rounded-full bg-[#17311f] px-8 py-4 font-bold text-white"
          >
            Acessar documento
          </a>
        )}
      </section>
    </main>
  )
}