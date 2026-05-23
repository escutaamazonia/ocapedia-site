"use client"

import { useMemo, useState } from "react"

type Mulher = {
  id: number
  documentId: string
  nome: string
  territorio?: string
  etnia?: string
  estado?: string
  identidade?: string
  atuacao?: string
  foto?: string
}

function normalizar(valor?: string) {
  return (valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

export default function MulheresGrid({ mulheres }: { mulheres: Mulher[] }) {
  const [busca, setBusca] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("")
  const [filtroIdentidade, setFiltroIdentidade] = useState("")
  const [filtroAtuacao, setFiltroAtuacao] = useState("")

  const estados = Array.from(
    new Set(mulheres.map((m) => m.estado).filter(Boolean))
  )

  const identidades = Array.from(
    new Set(mulheres.map((m) => m.identidade).filter(Boolean))
  )

  const atuacoes = [
  "Jornalismo",
  "Jornalismo Alternativo",
  "Jornalismo Negro",
  "Pesquisa",
  "Audiovisual",
  "Podcast",
  "Rádio",
  "Tecnologia",
  "Educação",
  "Ativismo",
  "Arte",
  "Comunicação Comunitária",
  "Comunicação Indígena",
]

  const mulheresFiltradas = useMemo(() => {
    return mulheres.filter((mulher) => {
      const textoBusca = [
        mulher.nome,
        mulher.territorio,
        mulher.etnia,
        mulher.estado,
        mulher.identidade,
        mulher.atuacao,
      ]
        .map((item) => normalizar(item))
        .join(" ")

      const matchBusca =
        !busca || textoBusca.includes(normalizar(busca))

      const matchEstado =
        !filtroEstado ||
        normalizar(mulher.estado) === normalizar(filtroEstado)

      const matchIdentidade =
        !filtroIdentidade ||
        normalizar(mulher.identidade) === normalizar(filtroIdentidade)

      const matchAtuacao =
        !filtroAtuacao ||
        normalizar(mulher.atuacao) === normalizar(filtroAtuacao)

      return (
        matchBusca &&
        matchEstado &&
        matchIdentidade &&
        matchAtuacao
      )
    })
  }, [mulheres, busca, filtroEstado, filtroIdentidade, filtroAtuacao])

  return (
    <section className="min-h-screen bg-[#f5ecdb] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Mulheres
          </p>

          <h1 className="text-5xl font-black text-[#1f1b16]">
            Rede de comunicadoras
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5c5244]">
            Navegue pelos perfis de mulheres afroindígenas, negras,
            quilombolas, ribeirinhas e mulheres trans que atuam em
            territórios, mídias, pesquisas e tecnologias sociais.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input
            type="text"
            placeholder="Buscar por nome, povo ou etnia"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="rounded-2xl border border-[#d7cab0] bg-white px-5 py-4 outline-none"
          />

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-2xl border border-[#d7cab0] bg-white px-5 py-4 outline-none"
          >
            <option value="">Todos os estados</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>

          <select
            value={filtroIdentidade}
            onChange={(e) => setFiltroIdentidade(e.target.value)}
            className="rounded-2xl border border-[#d7cab0] bg-white px-5 py-4 outline-none"
          >
            <option value="">Todas identidades</option>
            {identidades.map((identidade) => (
              <option key={identidade} value={identidade}>
                {identidade}
              </option>
            ))}
          </select>

          <select
            value={filtroAtuacao}
            onChange={(e) => setFiltroAtuacao(e.target.value)}
            className="rounded-2xl border border-[#d7cab0] bg-white px-5 py-4 outline-none"
          >
            <option value="">Todas atuações</option>
            {atuacoes.map((atuacao) => (
              <option key={atuacao} value={atuacao}>
                {atuacao}
              </option>
            ))}
          </select>
        </div>

        <p className="mb-10 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
          {mulheresFiltradas.length} resultado(s) encontrado(s)
        </p>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {mulheresFiltradas.map((mulher) => (
            <a
              key={mulher.id}
              href={`/mulheres/${mulher.documentId}`}
              className="overflow-hidden rounded-[2rem] border border-[#d8cab2] bg-[#fbf5ea] shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {mulher.foto && (
                <img
                  src={mulher.foto}
                  alt={mulher.nome}
                  className="h-72 w-full object-cover"
                />
              )}

              <div className="space-y-4 p-8">
                <div className="flex flex-wrap gap-2">
                  {mulher.identidade && (
                    <span className="rounded-full bg-[#17311f] px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                      {mulher.identidade}
                    </span>
                  )}

                  {mulher.estado && (
                    <span className="rounded-full bg-[#d9a441]/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                      {mulher.estado}
                    </span>
                  )}

                  {mulher.atuacao && (
                    <span className="rounded-full bg-[#e7dcc8] px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#17311f]">
                      {mulher.atuacao}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-black leading-snug text-[#1f1b16]">
                  {mulher.nome}
                </h2>

                <div className="space-y-2 text-sm text-[#5c5244]">
                  <p>
                    <strong>Povo:</strong>{" "}
                    {mulher.territorio || "Não informado"}
                  </p>

                  <p>
                    <strong>Etnia:</strong>{" "}
                    {mulher.etnia || "Não informado"}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}