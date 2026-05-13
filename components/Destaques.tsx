export default function Destaques() {
  const cards: {
    categoria: string
    titulo: string
    descricao: string
    imagem: string
  }[] = [
    {
      categoria: 'Perfil',
      titulo: 'Jovita Pankararu',
      descricao:
        'Comunicadora, radialista e pesquisadora indígena.',
      imagem:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    },
    {
      categoria: 'Podcast',
      titulo: 'Vozes da Floresta',
      descricao:
        'Podcast semanal sobre direitos indígenas.',
      imagem:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop',
    },
    {
      categoria: 'Artigo',
      titulo: 'Tecnologias Ancestrais',
      descricao:
        'Reflexões sobre oralidade e epistemologias indígenas.',
      imagem:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
    },
  ]

  return (
    <section className="bg-[#f1e7d7] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Destaques
          </p>

          <h3 className="text-4xl font-black">
            Conheça histórias e produções
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.titulo}
              className="overflow-hidden rounded-[2rem] border border-[#d8cab2] bg-[#fbf5ea] shadow-lg"
            >
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.imagem})`,
                }}
              />

              <div className="space-y-4 p-8">
                <span className="inline-flex rounded-full bg-[#d9a441]/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                  {card.categoria}
                </span>

                <h4 className="text-2xl font-black">
                  {card.titulo}
                </h4>

                <p className="text-[#4f4638]">
                  {card.descricao}
                </p>

                <button className="font-bold text-[#17311f]">
                  Explorar →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}