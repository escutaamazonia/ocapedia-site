async function getProducoes() {
  try {
    const res = await fetch(
      `${API_URL}/api/producoes?populate=*",
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

export default async function ProducoesPage() {
  const producoes = await getProducoes()

  return (
    <main className="min-h-screen bg-[#f5ecdb] text-[#1f1b16]">

      <section className="mx-auto max-w-7xl px-6 py-24">

        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Produções
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight">
          Produções, pesquisas e mídias da Ocapédia
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[#4f4638]">
          Acervo de conteúdos, pesquisas, mídias, documentos,
          podcasts, vídeos e tecnologias sociais relacionados à
          comunicação, memória e territórios amazônicos.
        </p>

      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-2 xl:grid-cols-3">

        {producoes.map((item: any) => {

          const imagem =
            item.imagem?.url
              ? `http://localhost:1337${item.imagem.url}`
              : "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-[2rem] border border-[#d8cab2] bg-[#fbf5ea] shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >

              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${imagem})`,
                }}
              />

              <div className="space-y-4 p-8">

                <span className="inline-flex rounded-full bg-[#d9a441]/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                  {item.tipo || "Conteúdo"}
                </span>

                <h2 className="text-2xl font-black">
                  {item.titulo || "Sem título"}
                </h2>

                <p className="leading-relaxed text-[#4f4638]">
                  {item.descricao || "Descrição não informada."}
                </p>

                <a
                  href={`/producoes/${item.documentId}`}
                  className="inline-block pt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
                >
                  Explorar →
                </a>

              </div>

            </article>
          )
        })}

      </section>

    </main>
  )
}