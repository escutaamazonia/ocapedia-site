import { API_URL } from "@/lib/api"

async function getDestaques() {
  try {
    const res = await fetch(
      `${API_URL}/api/producoes?populate=*&filters[destaque][$eq]=true&sort=createdAt:desc&pagination[limit]=3`,
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

export default async function Destaques() {
  const cards = await getDestaques()

  return (
    <section className="bg-[#f3ecdf] py-24">
      <div className="mx-auto max-w-[1700px] px-6">
        <div className="grid gap-10 xl:grid-cols-3">
          {cards.map((card: any) => {
            const imagem = card.imagem?.url
              ? `${API_URL}${card.imagem.url}`
              : "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"

            return (
              <article
                key={card.id}
                className="overflow-hidden rounded-[2.5rem] border border-[#d9cfbe] bg-[#f7f1e7] shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={imagem}
                  alt={card.titulo}
                  className="h-[420px] w-full object-cover"
                />

                <div className="space-y-8 p-10">
                  <span className="inline-flex rounded-full bg-[#e7d7b7] px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-[#9b7125]">
                    {card.tipo || "Produção"}
                  </span>

                  <h3 className="text-5xl font-black leading-tight text-[#17130f]">
                    {card.titulo}
                  </h3>

                  <p className="text-2xl leading-relaxed text-[#4f4638]">
                    {card.descricao}
                  </p>

                  <a
                    href={`/producoes/${card.documentId}`}
                    className="inline-block text-xl font-black uppercase tracking-[0.25em] text-[#17311f] transition hover:translate-x-2"
                  >
                    Explorar →
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}