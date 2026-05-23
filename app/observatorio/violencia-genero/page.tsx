"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

import { fontesViolenciaGenero } from "@/lib/dados-fontes"

const MapaObservatorio = dynamic(
  () => import("@/components/MapaObservatorio"),
  {
    ssr: false,
  }
)

const indicadoresBase = [
  {
    titulo: "Feminicídios",
    valor: "19,3%",
    descricao: "Acima da média nacional",
  },
  {
    titulo: "Violência sexual",
    valor: "36,8%",
    descricao: "Incidência superior ao restante do Brasil",
  },
  {
    titulo: "Municípios monitorados",
    valor: "772",
    descricao: "Amazônia Legal",
  },
  {
    titulo: "Bases integradas",
    valor: "8",
    descricao: "Fontes públicas oficiais",
  },
]

const dadosPorEstado = {
  Pará: [
    { ano: "2021", violencia: 24 },
    { ano: "2022", violencia: 29 },
    { ano: "2023", violencia: 33 },
    { ano: "2024", violencia: 36.8 },
  ],

  Amazonas: [
    { ano: "2021", violencia: 18 },
    { ano: "2022", violencia: 22 },
    { ano: "2023", violencia: 25 },
    { ano: "2024", violencia: 28 },
  ],

  Amapá: [
    { ano: "2021", violencia: 16 },
    { ano: "2022", violencia: 19 },
    { ano: "2023", violencia: 21 },
    { ano: "2024", violencia: 24 },
  ],

  Roraima: [
    { ano: "2021", violencia: 14 },
    { ano: "2022", violencia: 18 },
    { ano: "2023", violencia: 20 },
    { ano: "2024", violencia: 23 },
  ],

  Rondônia: [
    { ano: "2021", violencia: 17 },
    { ano: "2022", violencia: 21 },
    { ano: "2023", violencia: 23 },
    { ano: "2024", violencia: 26 },
  ],

  Acre: [
    { ano: "2021", violencia: 15 },
    { ano: "2022", violencia: 18 },
    { ano: "2023", violencia: 22 },
    { ano: "2024", violencia: 25 },
  ],

  Tocantins: [
    { ano: "2021", violencia: 13 },
    { ano: "2022", violencia: 16 },
    { ano: "2023", violencia: 19 },
    { ano: "2024", violencia: 22 },
  ],

  Maranhão: [
    { ano: "2021", violencia: 20 },
    { ano: "2022", violencia: 24 },
    { ano: "2023", violencia: 27 },
    { ano: "2024", violencia: 30 },
  ],

  "Mato Grosso": [
    { ano: "2021", violencia: 19 },
    { ano: "2022", violencia: 23 },
    { ano: "2023", violencia: 26 },
    { ano: "2024", violencia: 29 },
  ],
}

type EstadoAmazonia = keyof typeof dadosPorEstado

export default function ObservatorioPage() {
  const [populacaoBrasil, setPopulacaoBrasil] =
    useState<string>("Carregando...")

  const [estadoSelecionado, setEstadoSelecionado] =
    useState<EstadoAmazonia>("Pará")

    const [territorioSelecionado, setTerritorioSelecionado] =
  useState<string>("Todos")

  const [relatorios, setRelatorios] = useState<any[]>([])

  useEffect(() => {
    async function carregarPopulacao() {
      try {
        const res = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao"
        )

        const data = await res.json()

        const populacaoFormatada =
          data?.projecao?.populacao?.toLocaleString("pt-BR") ||
          "Não disponível"

        setPopulacaoBrasil(populacaoFormatada)
      } catch {
        setPopulacaoBrasil("Não disponível")
      }
    }

    async function carregarRelatorios() {
      try {
        const res = await fetch(
          "http://localhost:1337/api/relatorios?populate=*"
        )

        const json = await res.json()

        setRelatorios(json.data || [])
      } catch {
        setRelatorios([])
      }
    }

    carregarPopulacao()
    carregarRelatorios()
  }, [])

  const indicadores = [
    ...indicadoresBase,
    {
      titulo: "População brasileira",
      valor: populacaoBrasil,
      descricao: "Projeção oficial em tempo real via API do IBGE",
    },
  ]

  const documentosBase =
  relatorios.length > 0 ? relatorios : fontesViolenciaGenero

const documentos =
  territorioSelecionado === "Todos"
    ? documentosBase
    : documentosBase.filter((doc: any) =>
        doc.territorio === territorioSelecionado
      )

  return (
    <main className="min-h-screen bg-[#f5ecdb] text-[#1f1b16]">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Observatório OCA
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight">
          Violência de gênero e inteligência territorial na Amazônia Legal
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[#4f4638]">
          O Observatório Ocapédia investiga as relações entre violência de
          gênero, desigualdade territorial, políticas públicas, comunicação e
          avanço extrativista na Amazônia Legal, articulando dados públicos,
          memória social e cartografias críticas.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-2 xl:grid-cols-5">
        {indicadores.map((item) => (
          <div
            key={item.titulo}
            className="rounded-[2rem] border border-[#d7cab0] bg-[#fbf5ea] p-8 shadow-sm"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
              Indicador
            </p>

            <div className="mb-4 text-4xl font-black text-[#8d6b2f]">
              {item.valor}
            </div>

            <h3 className="text-xl font-black">{item.titulo}</h3>

            <p className="mt-4 leading-relaxed text-[#4f4638]">
              {item.descricao}
            </p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Série histórica
          </p>

          <h2 className="text-4xl font-black">
            Violência sexual contra mulheres na Amazônia
          </h2>

          <div className="mt-6">
            <select
              value={estadoSelecionado}
              onChange={(e) =>
                setEstadoSelecionado(e.target.value as EstadoAmazonia)
              }
              className="rounded-xl border border-[#d8cab2] bg-white px-4 py-3 text-[#1f1b16] outline-none"
            >
              {Object.keys(dadosPorEstado).map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-[420px] min-h-[420px] rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dadosPorEstado[estadoSelecionado]}>
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="violencia"
                stroke="#8d6b2f"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Inteligência territorial
          </p>

          <h2 className="text-4xl font-black">
            Cartografia relacional da Amazônia Legal
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#4f4638]">
            Sobreposição territorial de indicadores relacionados à violência de
            gênero, feminicídio e expansão extrativista na Amazônia Legal.
          </p>
        </div>

        <MapaObservatorio />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Bases de dados
          </p>

          <h2 className="text-4xl font-black">
            Fontes públicas monitoradas
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[
            "ONU Mulheres",
            "IBGE",
            "CAGED",
            "DATASUS",
            "TSE Eleitoral",
            "Mapa da Violência",
            "UNICEF",
            "FBSP",
          ].map((fonte) => (
            <div
              key={fonte}
              className="rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm"
            >
              <h3 className="text-2xl font-black">{fonte}</h3>

              <p className="mt-4 leading-relaxed text-[#4f4638]">
                Integração de indicadores sociais, territoriais, econômicos,
                políticos e de violência.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Dinâmicas territoriais
          </p>

          <h2 className="text-4xl font-black">
            Relações observadas entre expansão extrativista e vulnerabilidade
            social
          </h2>
        </div>

        <div className="rounded-[2rem] border border-[#d8cab2] bg-white p-12 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            {[
              "Expansão extrativista",
              "Pressão territorial",
              "Migração desordenada",
              "Economias ilegais",
              "Exploração sexual",
              "Subnotificação",
              "Sobrecarga do SUS",
              "Fragilidade institucional",
            ].map((item, index) => (
              <div key={item} className="flex flex-col items-center">
                <div className="rounded-full bg-[#f5ecdb] px-8 py-4 text-lg font-bold text-[#1f1b16]">
                  {item}
                </div>

                {index !== 7 && (
                  <div className="my-3 text-3xl text-[#8d6b2f]">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Biblioteca documental
          </p>

          <h2 className="text-4xl font-black">
            Pesquisas e relatórios oficiais
          </h2>
        </div>

        <div className="mt-6">

  <select
    value={territorioSelecionado}
    onChange={(e) =>
      setTerritorioSelecionado(e.target.value)
    }
    className="rounded-xl border border-[#d8cab2] bg-white px-4 py-3 text-[#1f1b16] outline-none"
  >

    <option value="Todos">
      Todos os territórios
    </option>

    <option value="Pará">
      Pará
    </option>

    <option value="Amazônia Legal">
      Amazônia Legal
    </option>

  </select>

</div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {documentos.map((fonte: any) => (
            <a
              key={fonte.id || fonte.titulo}
              href={fonte.fonte_url || fonte.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                {fonte.instituicao} • {fonte.ano}
              </p>

              <h3 className="text-2xl font-black">{fonte.titulo}</h3>

              <p className="mt-4 leading-relaxed text-[#4f4638]">
                {fonte.resumo_relatorio || fonte.resumo}
              </p>

              <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]">
                {fonte.territorio ? `${fonte.territorio} • ` : ""}
                Abrir documento →
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="rounded-[2rem] border border-[#d8cab2] bg-[#132719] p-12 text-[#f5ecdb] shadow-xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#d9a441]">
            Metodologia OCA
          </p>

          <h2 className="max-w-4xl text-4xl font-black leading-tight">
            Infraestrutura pública de comunicação, memória e inteligência
            territorial na Amazônia
          </h2>

          <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[#d7cab0]">
            O Observatório OCA articula cartografia crítica, dados públicos,
            memória social, territorialidade e comunicação comunitária para
            identificar relações territoriais entre violência de gênero,
            expansão extrativista, desigualdade social, fragilidade
            institucional e ausência de políticas públicas na Amazônia Legal.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Dados públicos oficiais",
              "Cartografias críticas",
              "Séries históricas",
              "Territorialização dos indicadores",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}