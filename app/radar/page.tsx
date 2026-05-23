async function getNarratives() {
  try {
    const res = await fetch(
      "http://localhost:1337/api/social-narratives?sort=createdAt:desc&pagination[pageSize]=100",
      {
        cache: "no-store",
      }
    )

    const data = await res.json()
    return data.data || []
  } catch {
    return []
  }
}

function corPrioridade(priority?: string) {
  const p = priority?.toLowerCase()

  if (p === "urgente") return "bg-red-100 text-red-700 border-red-200"
  if (p === "alta") return "bg-orange-100 text-orange-700 border-orange-200"
  if (p === "media") return "bg-yellow-100 text-yellow-700 border-yellow-200"

  return "bg-[#e7dcc8] text-[#17311f] border-[#d8cab2]"
}

export default async function RadarPage() {
  const narratives = await getNarratives()

  const total = narratives.length
  const urgentes = narratives.filter(
    (item: any) => item.priority?.toLowerCase() === "urgente"
  ).length
  const altas = narratives.filter(
    (item: any) => item.priority?.toLowerCase() === "alta"
  ).length

  const temas = Array.from(
    new Set(narratives.map((item: any) => item.theme).filter(Boolean))
  )

  return (
    <main className="min-h-screen bg-[#f5ecdb] px-6 py-20 text-[#1f1b16]">
      <section className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Observatório OCA
        </p>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight">
              Radar Amazônico
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-relaxed text-[#4f4638]">
              Monitoramento de narrativas, denúncias, temas emergentes e sinais
              públicos relacionados à Amazônia, comunicação, território, gênero
              e justiça socioambiental.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#d8cab2] bg-white px-6 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8d6b2f]">
              Atualização
            </p>
            <p className="mt-2 text-lg font-black text-[#17311f]">
              Tempo quase real
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] bg-[#17311f] p-8 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d9a441]">
              Narrativas
            </p>
            <strong className="mt-4 block text-5xl">{total}</strong>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-lg">
            <p className="text-sm uppercase tracking-[0.25em] text-[#8d6b2f]">
              Alta prioridade
            </p>
            <strong className="mt-4 block text-5xl text-orange-700">
              {altas}
            </strong>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-lg">
            <p className="text-sm uppercase tracking-[0.25em] text-[#8d6b2f]">
              Urgentes
            </p>
            <strong className="mt-4 block text-5xl text-red-700">
              {urgentes}
            </strong>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#8d6b2f]">
            Temas emergentes
          </p>

          <div className="flex flex-wrap gap-3">
            {temas.length === 0 && (
              <span className="text-[#5c5244]">Nenhum tema ainda.</span>
            )}

            {temas.map((tema: any) => (
              <span
                key={tema}
                className="rounded-full bg-[#e7dcc8] px-5 py-2 text-sm font-bold text-[#17311f]"
              >
                {tema}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6">
          {narratives.length === 0 && (
            <div className="rounded-[2rem] border border-[#d8cab2] bg-white p-8">
              Nenhuma narrativa cadastrada ainda.
            </div>
          )}

          {narratives.map((item: any) => (
            <article
              key={item.id}
              className="rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#17311f] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white">
                  {item.theme || "Tema não informado"}
                </span>

                <span
                  className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] ${corPrioridade(
                    item.priority
                  )}`}
                >
                  Prioridade: {item.priority || "s/d"}
                </span>
              </div>

              <p className="text-xl leading-relaxed text-[#1f1b16]">
                {item.content}
              </p>

              <div className="mt-6 flex flex-wrap justify-between gap-4 text-sm text-[#6b604f]">
                <span>
                  Data: {item.published_date || "não informada"}
                </span>

                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#17311f] hover:underline"
                  >
                    Ver fonte →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}