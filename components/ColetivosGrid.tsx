"use client"

import { useMemo, useState } from "react"

export default function ColetivosGrid({
  coletivos = [],
}: {
  coletivos?: any[]
}) {
  const [busca, setBusca] = useState("")
  const [estadoSelecionado, setEstadoSelecionado] = useState("todos")
  const [atuacaoSelecionada, setAtuacaoSelecionada] = useState("todas")

  const estados = Array.from(
    new Set(
      coletivos
        .map((item: any) => item.estado)
        .filter(Boolean)
    )
  )

  const atuacoes = Array.from(
    new Set(
      coletivos
        .map((item: any) => item.atuacao)
        .filter(Boolean)
    )
  )

  const coletivosFiltrados = useMemo(() => {
    return coletivos.filter((item: any) => {
      const termo = busca.toLowerCase()

      const matchBusca =
        item.nome?.toLowerCase().includes(termo) ||
        item.territorio?.toLowerCase().includes(termo) ||
        item.etnia?.toLowerCase().includes(termo)

      const matchEstado =
        estadoSelecionado === "todos" ||
        item.estado === estadoSelecionado

      const matchAtuacao =
        atuacaoSelecionada === "todas" ||
        item.atuacao === atuacaoSelecionada

      return (
        matchBusca &&
        matchEstado &&
        matchAtuacao
      )
    })
  }, [
    coletivos,
    busca,
    estadoSelecionado,
    atuacaoSelecionada,
  ])

  return (
    <section className="bg-[#f3ead8] px-6 pb-24 text-[#1f1b16]">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Coletivos
        </p>

        <h2 className="text-5xl font-black leading-tight">
          Coletivos e iniciativas de comunicação
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5c5244]">
          Conheça coletivos, organizações, rádios, mídias comunitárias e
          iniciativas de comunicação territorial mapeadas pela OCA.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Buscar por nome, povo ou etnia"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="rounded-2xl border border-[#d8cab2] bg-white px-5 py-4 outline-none"
          />

          <select
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
            className="rounded-2xl border border-[#d8cab2] bg-white px-5 py-4 outline-none"
          >
            <option value="todos">Todos os estados</option>

            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>

          <select
            value={atuacaoSelecionada}
            onChange={(e) => setAtuacaoSelecionada(e.target.value)}
            className="rounded-2xl border border-[#d8cab2] bg-white px-5 py-4 outline-none"
          >
            <option value="todas">Todas atuações</option>

            {atuacoes.map((atuacao) => (
              <option key={atuacao} value={atuacao}>
                {atuacao}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-10 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          {coletivosFiltrados.length} resultado(s) encontrado(s)
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {coletivosFiltrados.map((item: any) => (
            <a
              key={item.id}
              href={`/mulheres/${item.documentId}`}
              className="overflow-hidden rounded-[2rem] border border-[#d8cab2] bg-[#fbf5ea] shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {item.foto && (
                <img
                  src={item.foto}
                  alt={item.nome}
                  className="h-64 w-full object-cover"
                />
              )}

              <div className="p-8">
                <span className="mb-4 inline-flex rounded-full bg-[#17311f]/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#17311f]">
                  {item.categoria_mapa || "Coletivo"}
                </span>

                <h3 className="text-2xl font-black">
                  {item.nome}
                </h3>

                <p className="mt-4 text-[#4f4638]">
                  {item.territorio || "Território não informado"}
                </p>

                <p className="mt-2 text-sm font-bold text-[#8d4b25]">
                  Ver página →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}