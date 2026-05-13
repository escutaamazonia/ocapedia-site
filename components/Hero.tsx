export default function Hero() {
  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-cover bg-center pt-32"
      style={{
        backgroundImage:
          "linear-gradient(rgba(6,18,9,0.75), rgba(6,18,9,0.75)), url('https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-[#d9a441]/30 bg-[#d9a441]/10 px-4 py-2 text-sm text-[#f0d28c]">
            Plataforma de memória e comunicação indígena
          </div>

          <div className="space-y-6">
            <h2 className="max-w-3xl text-5xl font-black leading-tight text-[#f7f2e8] lg:text-7xl">
              Mulheres indígenas comunicando territórios e saberes
            </h2>

            <p className="max-w-2xl text-lg leading-relaxed text-[#ddd1bb]">
              Plataforma digital colaborativa para organização de produções,
              pesquisas, mídias, oralidades e tecnologias desenvolvidas por
              mulheres indígenas.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-2xl bg-[#d9a441] px-8 py-4 text-base font-bold text-[#1f180f] shadow-xl transition hover:scale-105">
              Explorar o mapa
            </button>

            <button className="rounded-2xl border border-[#e6d5ab]/40 bg-white/10 px-8 py-4 text-base font-semibold text-[#f4e8cf] backdrop-blur transition hover:bg-white/20">
              Conheça o projeto
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}