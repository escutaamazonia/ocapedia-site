const observatorios = [
  {
    titulo: "Violência de Gênero",
    descricao:
      "Cruzamento de dados sobre violência contra mulheres e meninas, território, raça, saúde, segurança pública e avanço extrativista.",
    link: "/observatorio/violencia-genero",
  },
  {
    titulo: "Extrativismo",
    descricao:
      "Monitoramento de conflitos territoriais, garimpo, mineração, desmatamento e impactos sobre comunidades amazônicas.",
    link: "/observatorio/extrativismo",
  },
  {
    titulo: "Desinformação",
    descricao:
      "Análise de circulação de narrativas, ataques informacionais, integridade da informação e soberania digital na Amazônia.",
    link: "/observatorio/desinformacao",
  },
  {
    titulo: "Comunicação Pública",
    descricao:
      "Mapeamento de rádios, coletivos, mídias comunitárias, comunicadoras e tecnologias sociais de comunicação.",
    link: "/observatorio/comunicacao-publica",
  },
  {
    titulo: "Direitos Territoriais",
    descricao:
      "Acompanhamento de políticas públicas, demarcações, ameaças, conflitos e proteção dos territórios.",
    link: "/observatorio/direitos-territoriais",
  },
  {
    titulo: "Infância e Juventude",
    descricao:
      "Indicadores sobre meninas, adolescentes, educação, violência, saúde e vulnerabilidades territoriais.",
    link: "/observatorio/infancia-juventude",
  },
]

export default function ObservatorioPage() {
  return (
    <main className="min-h-screen bg-[#f5ecdb] text-[#1f1b16]">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Observatórios OCA
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight">
          Camadas de análise sobre comunicação, território e memória na Amazônia
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[#4f4638]">
          O OCA — Observatório de Comunicação na Amazônia — organiza camadas
          temáticas de análise pública, combinando acervo, dados, cartografias,
          documentos oficiais, produção comunitária e inferências críticas.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {observatorios.map((item) => (
          <a
            key={item.titulo}
            href={item.link}
            className="group rounded-[2rem] border border-[#d8cab2] bg-[#fbf5ea] p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
              Observatório
            </p>

            <h2 className="text-2xl font-black text-[#1f1b16]">
              {item.titulo}
            </h2>

            <p className="mt-4 leading-relaxed text-[#4f4638]">
              {item.descricao}
            </p>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]">
              Acessar →
            </p>
          </a>
        ))}
      </section>
    </main>
  )
}