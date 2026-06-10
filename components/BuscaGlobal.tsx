"use client"

import { useEffect, useState } from "react"

type Resultado = {
  tipo: string
  titulo: string
  descricao: string
  link: string
}

export default function BuscaGlobal({
  termoInicial = "",
  compacto = false,
}: {
  termoInicial?: string
  compacto?: boolean
}) {
  const [termo, setTermo] = useState(termoInicial)
  const [resultados, setResultados] = useState<Resultado[]>([])

  async function buscar(valor: string) {
    setTermo(valor)

    if (valor.length < 2) {
      setResultados([])
      return
    }

    try {
      const res = await fetch(`/api/busca?q=${encodeURIComponent(valor)}`)
      const data = await res.json()
      setResultados(data.results || [])
    } catch {
      setResultados([])
    }
  }

  useEffect(() => {
    if (termoInicial.length >= 2) {
      buscar(termoInicial)
    }
  }, [])

  return (
    <section
  className={
    compacto
      ? "relative z-40 mt-8 max-w-3xl"
      : "relative z-40 mx-auto mt-12 max-w-7xl"
  }
>
      <input
        value={termo}
        onChange={(e) => buscar(e.target.value)}
        placeholder="Encontre vozes, saberes e memórias da Amazônia..."
        className="w-full rounded-full border border-[#d8cab2] bg-white px-8 py-5 text-lg text-[#1f1b16] shadow-2xl outline-none"
      />

      {termo.length >= 2 && resultados.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-[999] mt-3 max-h-80 overflow-y-auto rounded-[2rem] border border-[#d8cab2] bg-white shadow-2xl">
          {resultados.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block border-b border-[#eee7da] p-5 transition hover:bg-[#f8f3ea]"
            >
              <span className="rounded-full bg-[#d9a441]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                {item.tipo}
              </span>

              <h3 className="mt-3 text-lg font-black text-[#17311f]">
                {item.titulo}
              </h3>

              {item.descricao && (
                <p className="mt-1 text-sm text-[#4f4638]">
                  {item.descricao}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}