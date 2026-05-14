import Mapa from "@/components/Mapa"

async function getCategorias() {
  try {
    const res = await fetch("http://localhost:1337/api/categorias", {
      cache: "no-store",
    })

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

async function getProducoes() {
  try {
    const res = await fetch(
      "http://localhost:1337/api/producoes?populate=*",
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

async function getMulheres() {
  try {
    const res = await fetch(
      "http://localhost:1337/api/mulheres?populate=*&pagination[pageSize]=500",
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

export default async function OcapediaIndigena() {
  const categoriasApi = await getCategorias()
  const producoes = await getProducoes()
  const mulheres = await getMulheres()
  return (
    <div className="min-h-screen bg-[#f3ead8] text-[#1f1b16]">
      <header className="fixed top-0 z-50 w-full border-b border-[#3b3326]/20 bg-[#102214]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-[#f0d28c]">
              OCAPÉDIA INDÍGENA
            </h1>

            <p className="text-xs uppercase tracking-[0.3em] text-[#d4c29b]">
              Comunicação • Território • Memória
            </p>
          </div>

          <nav className="hidden gap-6 text-sm text-[#efe5d0] md:flex">
            <a href="#" className="transition hover:text-[#f0d28c]">Sobre</a>
            <a href="#" className="transition hover:text-[#f0d28c]">Mulheres</a>
            <a href="#" className="transition hover:text-[#f0d28c]">Territórios</a>
            <a href="#" className="transition hover:text-[#f0d28c]">Produções</a>
            <a href="#" className="transition hover:text-[#f0d28c]">Acervo</a>
            <a href="#" className="transition hover:text-[#f0d28c]">Mapa</a>
          </nav>

          <button className="rounded-full bg-[#d9a441] px-5 py-2 text-sm font-semibold text-[#1c160f] shadow-lg transition hover:scale-105">
            Colabore
          </button>
        </div>
      </header>

      <section
        className="relative flex min-h-[92vh] items-center overflow-hidden bg-cover pt-32"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,18,9,0.45), rgba(6,18,9,0.55)), url('/images/mulherescapa.jpg')",
          backgroundPosition: "center center",
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
                mulheres indígenas na Amazônia Legal e em outros territórios.
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

          <div className="hidden items-end justify-end lg:flex">
            <div className="max-w-sm rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <p className="text-xl italic leading-relaxed text-[#efe1c1]">
                “Nossas palavras criam caminhos, nossas redes conectam mundos.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8ccb4] bg-[#efe5d4] py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:grid-cols-8">
          {categoriasApi.map((item: any) => (
            <div
              key={item.id}
              className="rounded-2xl border bg-[#f7f0e3] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderColor: item.cor || "#d7cab0",
              }}
            >
              <div className="mb-4 text-5xl leading-none">
                {item.icone || "◎"}
              </div>

              <p className="text-sm font-bold leading-snug">{item.nome}</p>

              <p className="mt-3 text-xs leading-relaxed text-[#5e5548]">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Mapa
  mulheres={mulheres.map((mulher: any) => ({
    id: mulher.id,
    documentId: mulher.documentId,
    nome: mulher.nome,
    territorio: mulher.territorio,
    etnia: mulher.etnia,
    latitude: mulher.latitude,
    longitude: mulher.longitude,

    foto: mulher.foto?.url
      ? `http://localhost:1337${mulher.foto.url}`
      : undefined,
  }))}
/>
<section className="bg-[#f1e7d7] pt-8 pb-24">
  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

      <div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Destaques
        </p>

        <h3 className="max-w-2xl text-4xl font-black leading-tight">
          Conheça histórias, produções e pesquisas
        </h3>

      </div>

      <button className="rounded-2xl border border-[#bca888] px-6 py-3 font-semibold transition hover:bg-[#e7dbc5]">
        Ver acervo completo
      </button>

    </div>

    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {producoes.map((card: any) => {

        const imagem =
          card.imagem?.url
            ? `http://localhost:1337${card.imagem.url}`
            : "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"

        return (
          <div
            key={card.id}
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
                {card.tipo || "Conteúdo"}
              </span>

              <h4 className="text-2xl font-black leading-snug">
                {card.titulo}
              </h4>

              <p className="leading-relaxed text-[#4f4638]">
                {card.descricao}
              </p>

              <a
                href={
                  card.mulhere?.documentId
                    ? `/mulheres/${card.mulhere.documentId}`
                    : `/producoes/${card.documentId}`
                }
                className="inline-block pt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
              >
                Explorar →
              </a>

            </div>
          </div>
        )
      })}

    </div>
  </div>
</section>
      
      <section className="bg-[#102214] py-24 text-[#f3e9d3]">
  <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
    {[
      ["512", "Mulheres cadastradas"],
      ["214", "Territórios mapeados"],
      ["1.248", "Produções registradas"],
      ["86", "Coletivos e iniciativas"],
    ].map(([numero, texto]) => (
      <div
        key={texto}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur"
      >
        <div className="mb-3 text-5xl font-black text-[#d9a441]">
          {numero}
        </div>

        <p className="text-lg text-[#ddd1bb]">
          {texto}
        </p>
      </div>
    ))}
  </div>
</section>

<footer className="bg-[#0b160d] py-16 text-[#d9ceb8]">
  <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">

    <div className="space-y-5">
      <h5 className="text-2xl font-black text-[#f0d28c]">
        OCAPÉDIA INDÍGENA
      </h5>

      <p className="leading-relaxed text-[#cbbda2]">
        Plataforma colaborativa dedicada à memória,
        comunicação, tecnologias e epistemologias indígenas.
      </p>
    </div>

    <div>
      <h6 className="mb-5 text-lg font-bold text-[#f0d28c]">
        Explorar
      </h6>

      <ul className="space-y-3">
        <li>Mulheres</li>
        <li>Territórios</li>
        <li>Produções</li>
        <li>Mapa</li>
      </ul>
    </div>

    <div>
      <h6 className="mb-5 text-lg font-bold text-[#f0d28c]">
        Plataforma
      </h6>

      <ul className="space-y-3">
        <li>Metodologia</li>
        <li>Política de dados</li>
        <li>Colabore</li>
        <li>Contato</li>
      </ul>
    </div>

    <div className="rounded-[2rem] border border-[#d9a441]/20 bg-[#132719] p-8">
      <h6 className="mb-4 text-xl font-bold text-[#f0d28c]">
        Receba novidades
      </h6>

      <p className="mb-6 text-[#d7cab0]">
        Atualizações sobre pesquisas, produções e iniciativas indígenas.
      </p>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-[#cdbf9d]"
        />

        <button className="w-full rounded-xl bg-[#d9a441] px-5 py-3 font-bold text-[#1f180f] transition hover:scale-[1.02]">
          Assinar
        </button>
      </div>
    </div>

  </div>
</footer>

<section className="bg-[#e7dcc8] py-14 text-[#1f1b16]">
  <div className="mx-auto max-w-7xl px-6">

    <p className="mb-8 text-sm font-bold uppercase tracking-[0.25em] text-[#8d6b2f]">
      Realização • Apoio • Parcerias
    </p>

    <div className="flex flex-wrap items-center justify-between gap-10">
      <img
        src="/logos/unifap.png"
        alt="UNIFAP"
        className="h-14 w-auto object-contain"
      />

      <img
        src="/logos/cnpq.png"
        alt="CNPq"
        className="h-14 w-auto object-contain"
      />

      <img
        src="/logos/unesp.png"
        alt="UNESP"
        className="h-14 w-auto object-contain"
      />

      <img
        src="/logos/pcla.png"
        alt="PCLA"
        className="h-14 w-auto object-contain"
      />
    </div>

    <p className="mt-10 text-sm text-[#5c5244]">
      © 2026 Ocapédia Indígena • Comunicação, território e memória.
    </p>

  </div>
</section>

    </div>
  )
}