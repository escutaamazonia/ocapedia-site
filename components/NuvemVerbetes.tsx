async function getSaberes() {
  try {
    const res = await fetch("http://localhost:1337/api/saberes?populate=*", {
      cache: "no-store",
    })

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

export default async function NuvemVerbetes() {
  const saberes = await getSaberes()

  const termos = saberes.flatMap((saber: any) => [
    saber.titulo,
    saber.Text,
    saber.categoria,
    ...(saber.palavras_relacionadas || []),
  ])

  const contagem = termos
    .filter(Boolean)
    .map((termo: string) => termo.trim().toLowerCase())
    .reduce((acc: any, termo: string) => {
      acc[termo] = (acc[termo] || 0) + 1
      return acc
    }, {})

  const palavras = Object.entries(contagem)
    .map(([termo, total]: any) => ({
      termo,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 35)

  return (
    <section className="bg-[#f3ead8] px-6 py-20 text-[#1f1b16]">
      <div className="mx-auto max-w-7xl pl-8 lg:pl-10">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Árvore de Saberes OCA
        </p>

        <h2 className="max-w-3xl text-4xl font-black leading-tight">
          Nuvem de verbetes
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5c5244]">
          Conceitos, palavras e saberes que emergem dos documentos, perfis,
          territórios e narrativas da Ocapédia.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {palavras.map((item: any) => {
            const tamanho =
              item.total >= 4
                ? "text-3xl"
                : item.total >= 3
                ? "text-2xl"
                : item.total >= 2
                ? "text-xl"
                : "text-base"

            return (
              <a
                key={item.termo}
                href={`/saberes?busca=${encodeURIComponent(item.termo)}`}
                className={`rounded-full border border-[#d8cab2] bg-white px-6 py-3 font-black text-[#17311f] shadow-sm transition hover:-translate-y-1 hover:bg-[#17311f] hover:text-[#f5ead6] ${tamanho}`}
              >
                {item.termo}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}