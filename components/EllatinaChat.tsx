"use client"

import { useState } from "react"

export default function EllatinaChat() {
  const [aberto, setAberto] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const [resposta, setResposta] = useState("")
  const [carregando, setCarregando] = useState(false)

  async function responder() {
    if (!mensagem.trim()) return

    setCarregando(true)
    setResposta("🌿 Consultando os acervos da OCA...")

    try {
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
    } catch {
      setResposta(
        "Não consegui acessar os acervos da OCA neste momento."
      )
    } finally {
      setCarregando(false)
    }
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
        <div className="fixed bottom-24 right-6 z-50 flex max-h-[75vh] w-[380px] flex-col overflow-hidden rounded-[2rem] border border-[#d8cab2] bg-[#f8f1e6] shadow-2xl">

          <div className="border-b border-[#d8cab2] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8d6b2f]">
                  IA AMAZÔNICA OCA
                </p>

                <h3 className="mt-2 text-2xl font-black text-[#17311f]">
                  Ellatina
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#4f4638]">
                  Pergunte sobre mulheres, territórios,
                  produções, documentos, saberes,
                  indicadores e comunicação amazônica.
                </p>
              </div>

              <button
                onClick={() => setAberto(false)}
                className="rounded-full px-3 py-1 text-xl font-bold text-[#8d6b2f] hover:bg-[#eadfcb]"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {resposta ? (
              <div className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-[#1f1b16] shadow-sm">
                {resposta}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d8cab2] p-4 text-sm text-[#6b5c47]">
                🌿 Faça uma pergunta para explorar os acervos da OCA.
              </div>
            )}
          </div>

          <div className="border-t border-[#d8cab2] p-6">
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  responder()
                }
              }}
              placeholder="Ex: Quais documentos tratam de violência de gênero na Amazônia?"
              className="h-24 w-full resize-none rounded-2xl border border-[#d8cab2] bg-white p-4 text-sm outline-none"
            />

            <button
              onClick={responder}
              disabled={carregando}
              className="mt-4 w-full rounded-2xl bg-[#d9a441] px-5 py-3 font-bold text-[#1f180f] transition hover:scale-[1.02] disabled:opacity-60"
            >
              {carregando
                ? "Consultando acervos..."
                : "Perguntar"}
            </button>
          </div>
        </div>
      )}
    </>
  )
}