"use client"

import { useState } from "react"

export default function EllatinaChat() {
  const [aberto, setAberto] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const [resposta, setResposta] = useState("")

  async function responder() {
    if (!mensagem.trim()) return

    setResposta("Consultando os acervos da OCA...")

    const res = await fetch("/api/ellatina", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: mensagem,
      }),
    })

    const data = await res.json()

    setResposta(data.answer)
  }

  return (
    <>
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#17311f] px-6 py-4 text-sm font-bold text-white shadow-2xl transition hover:scale-105"
      >
        ✦ Ellatina
      </button>

      {aberto && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] rounded-[2rem] border border-[#d8cab2] bg-[#f8f1e6] p-6 shadow-2xl">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8d6b2f]">
              IA AMAZÔNICA OCA
            </p>

            <h3 className="mt-2 text-2xl font-black text-[#17311f]">
              Ellatina
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#4f4638]">
              Pergunte sobre mulheres, territórios,
              produções, saberes e comunicação amazônica.
            </p>
          </div>

          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Ex: podcasts indígenas"
            className="h-28 w-full rounded-2xl border border-[#d8cab2] bg-white p-4 outline-none"
          />

          <button
            onClick={responder}
            className="mt-4 w-full rounded-2xl bg-[#d9a441] px-5 py-3 font-bold text-[#1f180f] transition hover:scale-[1.02]"
          >
            Perguntar
          </button>

          {resposta && (
            <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-relaxed text-[#1f1b16]">
              {resposta}
            </div>
          )}
        </div>
      )}
    </>
  )
}