"use client"

import { useMemo, useState } from "react"

export default function SaberesFiltro({
  saberes,
}: {
  saberes: any[]
}) {
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("")
  const [ordem, setOrdem] = useState("az")

  const categorias = useMemo(() => {
    return Array.from(
      new Set(
        saberes
          .map((s) => s.categoria)
          .filter(Boolean)
      )
    )
  }, [saberes])

  const saberesFiltrados = useMemo(() => {
    const filtrados = saberes.filter((saber) => {
  const titulo =
    saber.titulo || saber.Text || ""

  const descricao = Array.isArray(
    saber.descricao
  )
    ? saber.descricao
        .map((bloco: any) =>
          bloco.children
            ?.map((child: any) => child.text)
            .join("")
        )
        .join(" ")
    : ""

  const textoCompleto = `
    ${titulo}
    ${descricao}
    ${saber.categoria || ""}
  `.toLowerCase()

  const matchBusca = textoCompleto.includes(
    busca.toLowerCase()
  )

  const matchCategoria =
    !categoria ||
    saber.categoria === categoria

  return matchBusca && matchCategoria
})

filtrados.sort((a, b) => {
  const tituloA = (
    a.titulo ||
    a.Text ||
    ""
  ).toLowerCase()

  const tituloB = (
    b.titulo ||
    b.Text ||
    ""
  ).toLowerCase()

  if (ordem === "az") {
    return tituloA.localeCompare(tituloB)
  }

  return tituloB.localeCompare(tituloA)
})

return filtrados
}, [saberes, busca, categoria, ordem])

  return (
    <section className="mt-20">
      <div className="rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Pesquisar saber..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
            className="rounded-2xl border border-[#d8cab2] bg-[#f5ecdb] px-5 py-4 outline-none"
          />

          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value)
            }
            className="rounded-2xl border border-[#d8cab2] bg-[#f5ecdb] px-5 py-4 outline-none"
          >
            <option value="">
              Todas categorias
            </option>

            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
  value={ordem}
  onChange={(e) =>
    setOrdem(e.target.value)
  }
  className="rounded-2xl border border-[#d8cab2] bg-[#f5ecdb] px-5 py-4 outline-none"
>
  <option value="az">
    Ordem A → Z
  </option>

  <option value="za">
    Ordem Z → A
  </option>
</select>
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
          {saberesFiltrados.length} saber(es)
          encontrado(s)
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {saberesFiltrados.map((saber) => {
          const titulo =
            saber.titulo ||
            saber.Text ||
            "Saber"

          const descricao = Array.isArray(
            saber.descricao
          )
            ? saber.descricao
                .map((bloco: any) =>
                  bloco.children
                    ?.map(
                      (child: any) => child.text
                    )
                    .join("")
                )
                .join(" ")
            : ""

          return (
            <a
              key={saber.id}
              href={`/saberes/${saber.documentId}`}
              className="block rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                {saber.categoria || "Saber"}
              </p>

              <h2 className="text-3xl font-black">
                {titulo}
              </h2>

              <p className="mt-6 leading-relaxed text-[#4f4638]">
                {descricao}
              </p>

              {Array.isArray(
                saber.palavras_relacionadas
              ) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {saber.palavras_relacionadas.map(
                    (palavra: string) => (
                      <span
                        key={palavra}
                        className="rounded-full bg-[#ece7dc] px-4 py-2 text-sm font-semibold text-[#17311f]"
                      >
                        {palavra}
                      </span>
                    )
                  )}
                </div>
              )}
            </a>
          )
        })}
      </div>
    </section>
  )
}