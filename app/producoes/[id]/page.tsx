async function getProducao(id: string) {
  const res = await fetch(
    `http://localhost:1337/api/producoes/${id}?populate=*`,
    {
      cache: "no-store",
    }
  )

  const json = await res.json()

  return json.data
}

export default async function PaginaProducao({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const producao = await getProducao(id)

  if (!producao) {
    return (
      <div className="p-20 text-center text-3xl">
        Produção não encontrada
      </div>
    )
  }

  const imagem =
    producao.imagem?.url
      ? `http://localhost:1337${producao.imagem.url}`
      : "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"

  return (
    <main className="min-h-screen bg-[#f3ead8] px-6 py-20 text-[#1f1b16]">

      <div className="mx-auto max-w-5xl">

        <a
          href="/"
          className="mb-10 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
        >
          ← Voltar
        </a>

        <div
          className="h-[500px] rounded-[2rem] bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: `url(${imagem})`,
          }}
        />

        <div className="mt-12 space-y-8">

          <span className="inline-flex rounded-full bg-[#d9a441]/15 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
            Produção
          </span>

          <h1 className="text-5xl font-black leading-tight">
            {producao.titulo}
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#4f4638]">
            {producao.descricao}
          </p>

          {producao.link && (
            <a
              href={producao.link}
              target="_blank"
              className="inline-flex rounded-2xl bg-[#17311f] px-8 py-4 text-lg font-bold text-[#f5ead6] transition hover:scale-105"
            >
              Acessar produção →
            </a>
          )}

        </div>
      </div>
    </main>
  )
}