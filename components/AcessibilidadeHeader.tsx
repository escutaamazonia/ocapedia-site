"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

export default function AcessibilidadeHeader() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "pt",
          includedLanguages: "pt,en,es",
          autoDisplay: false,
        },
        "google_translate_element"
      )
    }

    const script = document.createElement("script")
    script.id = "google-translate-script"
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  function traduzir(lang: string) {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null

    if (select) {
      select.value = lang
      select.dispatchEvent(new Event("change"))
    }
  }

  function aumentarFonte() {
    document.body.style.fontSize = "110%"
  }

  function fonteNormal() {
    document.body.style.fontSize = "100%"
  }

  function reduzirFonte() {
    document.body.style.fontSize = "95%"
  }

  function abrirLibras() {
    const botao = document.querySelector(
      "[vw-access-button]"
    ) as HTMLElement | null

    botao?.click()
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={aumentarFonte} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e96a3d] text-sm font-bold text-white">
        A+
      </button>

      <button onClick={fonteNormal} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c63b53] text-sm font-bold text-white">
        A
      </button>

      <button onClick={reduzirFonte} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0aa88f] text-sm font-bold text-white">
        A-
      </button>

      <button onClick={abrirLibras} className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
        ♿
      </button>

      <button onClick={() => traduzir("pt")} className="overflow-hidden rounded-md">
        <img src="https://flagcdn.com/w40/br.png" alt="Português" className="h-7 w-10 object-cover" />
      </button>

      <button onClick={() => traduzir("es")} className="overflow-hidden rounded-md">
        <img src="https://flagcdn.com/w40/es.png" alt="Español" className="h-7 w-10 object-cover" />
      </button>

      <button onClick={() => traduzir("en")} className="overflow-hidden rounded-md">
        <img src="https://flagcdn.com/w40/us.png" alt="English" className="h-7 w-10 object-cover" />
      </button>

      <div id="google_translate_element" className="hidden" />
    </div>
  )
}