import { API_URL } from "@/lib/api"

async function getMulher(documentId: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/mulheres?populate=*&pagination[pageSize]=500`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()

    return json.data?.find((item: any) => item.documentId === documentId)
  } catch {
    return null
  }
}

async function getDocumentosDaMulher(nome: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/documentos?populate=*&pagination[pageSize]=500`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()

    return (json.data || []).filter((doc: any) =>
      doc.autora?.toLowerCase().includes(nome.toLowerCase())
    )
  } catch {
    return []
  }
}

function textoRichText(campo: any) {
  if (Array.isArray(campo)) {
    return campo
      .map((bloco: any) =>
        bloco.children?.map((child: any) => child.text).join("")
      )
      .join("\n\n")
  }

  return campo || ""
}

export default async function MulherPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params
  const mulher = await getMulher(documentId)

  if (!mulher) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3ead8]">
        <p className="text-2xl font-bold">Perfil não encontrado</p>
      </main>
    )
  }

  const documentosRelacionados = await getDocumentosDaMulher(mulher.nome)

  const foto = mulher.foto?.url
    ? `${API_URL}${mulher.foto.url}`
    : ""

  const bioTexto = textoRichText(mulher.bio)

  return (
    <main className="min-h-screen bg-[#f3ead8] px-6 py-20 text-[#1f1b16]">
      <div className="mx-auto max-w-6xl">
        <a
          href="/mulheres"
          className="mb-10 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
        >
          ← Voltar para mulheres
        </a>

        <section className="grid gap-12 lg:grid-cols-[420px_1fr]">
          {foto && (
            <img
              src={foto}
              alt={mulher.nome}
              className="h-[520px] w-full rounded-[2rem] object-cover shadow-2xl"
            />
          )}

          <div>
            <span className="mb-6 inline-flex rounded-full bg-[#d9a441]/15 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
              {mulher.atuacao || "Perfil"}
            </span>

            <h1 className="mb-6 text-6xl font-black leading-tight">
              {mulher.nome}
            </h1>

            <p className="mb-4 text-xl font-semibold text-[#4f4638]">
              {mulher.etnia} • {mulher.territorio}
            </p>

            <div className="mb-8 grid gap-4 md:grid-cols-2">
              {mulher.estado && (
                <p className="rounded-2xl bg-white/60 p-4">
                  <strong>Estado:</strong> {mulher.estado}
                </p>
              )}

              {mulher.aldeia && (
                <p className="rounded-2xl bg-white/60 p-4">
                  <strong>Aldeia:</strong> {mulher.aldeia}
                </p>
              )}

              {mulher.identidade && (
                <p className="rounded-2xl bg-white/60 p-4">
                  <strong>Identidade:</strong> {mulher.identidade}
                </p>
              )}

              {mulher.atuacao && (
                <p className="rounded-2xl bg-white/60 p-4">
                  <strong>Atuação:</strong> {mulher.atuacao}
                </p>
              )}
            </div>

            <p className="whitespace-pre-line text-lg leading-relaxed text-[#4f4638]">
              {bioTexto}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {mulher.instagram && (
                <a
                  href={`https://instagram.com/${mulher.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#17311f] px-6 py-3 font-bold text-[#f5ead6]"
                >
                  Instagram
                </a>
              )}

              {mulher.website && (
                <a
                  href={mulher.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#d9a441] px-6 py-3 font-bold text-[#1f1b16]"
                >
                  Website
                </a>
              )}

              {mulher.youtube && (
                <a
                  href={mulher.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#17311f] px-6 py-3 font-bold text-[#17311f]"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </section>

        {documentosRelacionados.length > 0 && (
          <section className="mt-24">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
              Biblioteca da autora
            </p>

            <h2 className="mb-10 text-4xl font-black">
              Documentos, pesquisas e verbetes relacionados
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {documentosRelacionados.map((doc: any) => {
                const pdfUrl = doc.pdf?.url
                  ? `${API_URL}${doc.pdf.url}`
                  : doc.link_documento || "#"

                return (
                  <article
                    key={doc.id}
                    className="rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm"
                  >
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                      {doc.tipo_documento || "Documento"} •{" "}
                      {doc.ano_publicacao || "s/d"}
                    </p>

                    <h3 className="text-2xl font-black">{doc.titulo}</h3>

                    <p className="mt-4 text-[#4f4638]">
                      <strong>Autoria:</strong> {doc.autora || mulher.nome}
                    </p>

                    <p className="mt-4 leading-relaxed text-[#4f4638]">
                      {textoRichText(doc.resumo) ||
                        "Documento relacionado à trajetória, produção ou território da comunicadora."}
                    </p>

                    {doc.palavras_chave && (
                      <p className="mt-4 text-sm text-[#5e5548]">
                        <strong>Palavras-chave:</strong> {doc.palavras_chave}
                      </p>
                    )}

                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
                    >
                      Abrir documento →
                    </a>
                  </article>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}