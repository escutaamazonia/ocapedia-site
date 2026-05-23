async function getSaber(documentId: string) {
  try {
    const res = await fetch(
      "http://localhost:1337/api/saberes?populate=*&pagination[pageSize]=500",
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

function textoRichText(campo: any) {
  if (Array.isArray(campo)) {
    return campo
      .map((bloco: any) =>
        bloco.children?.map((child: any) => child.text).join("")
      )
      .join(" ")
  }

  return campo || ""
}

export default async function SaberPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params
  const saber = await getSaber(documentId)

  if (!saber) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5ecdb]">
        <p className="text-2xl font-bold">Saber não encontrado</p>
      </main>
    )
  }

  const titulo = saber.titulo || saber.Text || "Saber"

  return (
    <main className="min-h-screen bg-[#f5ecdb] px-6 py-24 text-[#1f1b16]">
      <div className="mx-auto max-w-5xl">
        <a
          href="/saberes"
          className="mb-10 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
        >
          ← Voltar para saberes
        </a>

        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Cartografia de Saberes OCA
        </p>

        <h1 className="text-6xl font-black leading-tight">
          {titulo}
        </h1>

        <p className="mt-6 inline-flex rounded-full bg-[#d9a441]/20 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
          {saber.categoria || "Saber"}
        </p>

        <section className="mt-12 rounded-[2rem] border border-[#d8cab2] bg-white p-10 shadow-sm">
          <h2 className="mb-6 text-3xl font-black">
            Definição e contexto
          </h2>

          <p className="text-xl leading-relaxed text-[#4f4638]">
            {textoRichText(saber.descricao) ||
              "Este saber faz parte da Cartografia de Saberes OCA."}
          </p>
        </section>

        {Array.isArray(saber.palavras_relacionadas) && (
          <section className="mt-12">
            <h2 className="mb-6 text-3xl font-black">
              Palavras relacionadas
            </h2>

            <div className="flex flex-wrap gap-3">
              {saber.palavras_relacionadas.map((palavra: string) => (
                <span
                  key={palavra}
                  className="rounded-full bg-[#17311f]/10 px-5 py-3 font-semibold text-[#17311f]"
                >
                  {palavra}
                </span>
              ))}
            </div>
          </section>
        )}

        {Array.isArray(saber.idiomas) && (
          <section className="mt-12">
            <h2 className="mb-6 text-3xl font-black">
              Idiomas e línguas
            </h2>

            <div className="flex flex-wrap gap-3">
              {saber.idiomas.map((idioma: string) => (
                <span
                  key={idioma}
                  className="rounded-full bg-[#d9a441]/20 px-5 py-3 font-semibold text-[#8d6b2f]"
                >
                  {idioma}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}