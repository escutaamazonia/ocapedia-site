"use client"

import { useEffect, useMemo, useState } from "react"

function normalizar(valor?: string) {
  return (valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function textoRichText(campo: any) {
  if (Array.isArray(campo)) {
    return campo
      .map((bloco: any) =>
        bloco.children?.map((child: any) => child.text).join("")
      )
      .join(" ")
  }

  return campo || ""
}

function getIdiomas(doc: any) {
  const valor = doc.idioma || doc.idiomas
  if (Array.isArray(valor)) return valor
  if (typeof valor === "string") return [valor]
  return []
}

function getIdentidades(doc: any) {
  const valor = doc.identidades
  if (Array.isArray(valor)) return valor
  if (typeof valor === "string") return [valor]
  return []
}

function contemIdioma(doc: any, idioma: string) {
  if (!idioma) return true
  return getIdiomas(doc).some(
    (item: string) => normalizar(item) === normalizar(idioma)
  )
}

export default function DocumentosBiblioteca({
  documentos,
}: {
  documentos: any[]
}) {
  const [busca, setBusca] = useState("")
  const [tipo, setTipo] = useState("")
  const [ano, setAno] = useState("")
  const [territorio, setTerritorio] = useState("")
  const [autora, setAutora] = useState("")
  const [idioma, setIdioma] = useState("")
  const [identidade, setIdentidade] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    setTipo(params.get("tipo") || "")
    setIdentidade(params.get("identidade") || "")
    setAno(params.get("ano") || "")
    setTerritorio(params.get("territorio") || "")
    setAutora(params.get("autora") || "")
    setIdioma(params.get("idioma") || "")
  }, [])

  const tipos = Array.from(
    new Set(documentos.map((doc) => doc.tipo_documento).filter(Boolean))
  ).sort()

  const anos = Array.from(
    new Set(documentos.map((doc) => doc.ano_publicacao).filter(Boolean))
  ).sort((a, b) => Number(b) - Number(a))

  const territorios = Array.from(
    new Set(
      documentos
        .map((doc) => doc.territorio_principal || doc.territorio)
        .filter(Boolean)
    )
  ).sort()

  const autoras = Array.from(
    new Set(documentos.map((doc) => doc.autora).filter(Boolean))
  ).sort()

  const idiomasDisponiveis = Array.from(
    new Set(documentos.flatMap((doc) => getIdiomas(doc)))
  ).sort()

  const identidadesDisponiveis = [
    "Mulher Indígena",
    "Mulher Negra",
    "Mulher Quilombola",
    "Mulher Ribeirinha",
    "Mulher trans",
  ]

  const documentosFiltrados = useMemo(() => {
    return documentos.filter((doc) => {
      const textoBusca = [
        doc.titulo,
        doc.autora,
        doc.tipo_documento,
        doc.territorio_principal,
        doc.territorio,
        doc.palavras_chave,
        Array.isArray(doc.verbetes) ? doc.verbetes.join(" ") : "",
        Array.isArray(doc.verbetes_extraidos)
          ? doc.verbetes_extraidos.join(" ")
          : "",
        textoRichText(doc.resumo),
      ]
        .map((item) => normalizar(String(item || "")))
        .join(" ")

      const matchBusca = !busca || textoBusca.includes(normalizar(busca))
      const matchTipo =
        !tipo || normalizar(doc.tipo_documento) === normalizar(tipo)
      const matchAno = !ano || String(doc.ano_publicacao) === String(ano)
      const matchTerritorio =
        !territorio ||
        normalizar(doc.territorio_principal || doc.territorio) ===
          normalizar(territorio)
      const matchAutora =
        !autora || normalizar(doc.autora) === normalizar(autora)
      const matchIdioma = contemIdioma(doc, idioma)
      const matchIdentidade =
        !identidade ||
        getIdentidades(doc).some(
          (item: string) => normalizar(item) === normalizar(identidade)
        )

      return (
        matchBusca &&
        matchTipo &&
        matchAno &&
        matchTerritorio &&
        matchAutora &&
        matchIdioma &&
        matchIdentidade
      )
    })
  }, [documentos, busca, tipo, ano, territorio, autora, idioma, identidade])

  const cardsAcervo = [
    [documentos.length, "Documentos", "/documentos"],
    [
      documentos.filter((doc) => normalizar(doc.tipo_documento) === "artigo")
        .length,
      "Artigos",
      "/documentos?tipo=artigo",
    ],
    [
      documentos.filter(
        (doc) => normalizar(doc.tipo_documento) === "dissertacao"
      ).length,
      "Dissertações",
      "/documentos?tipo=dissertacao",
    ],
    [
      documentos.filter((doc) => normalizar(doc.tipo_documento) === "tcc")
        .length,
      "TCCs",
      "/documentos?tipo=tcc",
    ],
    [
      documentos.filter((doc) => normalizar(doc.tipo_documento) === "cartilha")
        .length,
      "Cartilhas",
      "/documentos?tipo=cartilha",
    ],
    [
      documentos.filter((doc) => normalizar(doc.tipo_documento) === "manifesto")
        .length,
      "Manifestos",
      "/documentos?tipo=manifesto",
    ],
[
  documentos.filter(
    (doc) =>
      normalizar(doc.tipo_documento) === "livro"
  ).length,
  "Livros",
  "/documentos?tipo=livro",
],    [territorios.length, "Territórios", "/documentos"],
    [
      documentos.filter((doc) => doc.traducao_disponivel === true).length,
      "Traduções",
      "/documentos",
    ],
  ]

  const cardsIdentidades = [
    [
      documentos.filter((doc) =>
        getIdentidades(doc).includes("Mulher Indígena")
      ).length,
      "Indígenas",
      "/documentos?identidade=Mulher%20Ind%C3%ADgena",
    ],
    [
      documentos.filter((doc) => getIdentidades(doc).includes("Mulher Negra"))
        .length,
      "Negras",
      "/documentos?identidade=Mulher%20Negra",
    ],
    [
      documentos.filter((doc) =>
        getIdentidades(doc).includes("Mulher Quilombola")
      ).length,
      "Quilombolas",
      "/documentos?identidade=Mulher%20Quilombola",
    ],
    [
      documentos.filter((doc) =>
        getIdentidades(doc).includes("Mulher Ribeirinha")
      ).length,
      "Ribeirinhas",
      "/documentos?identidade=Mulher%20Ribeirinha",
    ],
    [
      documentos.filter((doc) => getIdentidades(doc).includes("Mulher trans"))
        .length,
      "Trans",
      "/documentos?identidade=Mulher%20trans",
    ],
  ]

  return (
    <main className="min-h-screen bg-[#f5ecdb] text-[#1f1b16]">
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Biblioteca Amazônica
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight">
          Documentos, pesquisas e verbetes da OCA
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[#4f4638]">
          Acervo documental com artigos, dissertações, TCCs, manifestos,
          cartilhas e materiais relacionados às comunicadoras, territórios e
          epistemologias amazônicas.
        </p>

        <div className="mt-14">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Panorama do acervo
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cardsAcervo.map(([numero, texto, link]) => (
              <a
                key={String(texto)}
                href={String(link)}
                className="rounded-[2rem] border border-[#d8cab2] bg-[#fbf5ea] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-5xl font-black text-[#8d6b2f]">
                  {numero}
                </div>

                <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-[#5c5244]">
                  {texto}
                </p>
              </a>
            ))}
          </div>

          <p className="mt-12 mb-5 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
            Recortes identitários
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cardsIdentidades.map(([numero, texto, link]) => (
              <a
                key={String(texto)}
                href={String(link)}
                className="rounded-[1.5rem] border border-[#17311f]/20 bg-[#17311f] p-6 text-[#f5ead6] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-4xl font-black text-[#d9a441]">
                  {numero}
                </div>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em]">
                  {texto}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-[2rem] border border-[#d8cab2] bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
            <input
              type="text"
              placeholder="Pesquisar verbete, autora ou conceito"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="rounded-2xl border border-[#d8cab2] bg-[#fbf5ea] px-5 py-4 outline-none"
            />

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="rounded-2xl border border-[#d8cab2] bg-[#fbf5ea] px-5 py-4 outline-none"
            >
              <option value="">Todos os tipos</option>
              {tipos.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="rounded-2xl border border-[#d8cab2] bg-[#fbf5ea] px-5 py-4 outline-none"
            >
              <option value="">Todos os anos</option>
              {anos.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={territorio}
              onChange={(e) => setTerritorio(e.target.value)}
              className="rounded-2xl border border-[#d8cab2] bg-[#fbf5ea] px-5 py-4 outline-none"
            >
              <option value="">Todos os territórios</option>
              {territorios.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={autora}
              onChange={(e) => setAutora(e.target.value)}
              className="rounded-2xl border border-[#d8cab2] bg-[#fbf5ea] px-5 py-4 outline-none"
            >
              <option value="">Todas autoras</option>
              {autoras.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={identidade}
              onChange={(e) => setIdentidade(e.target.value)}
              className="rounded-2xl border border-[#d8cab2] bg-[#fbf5ea] px-5 py-4 outline-none"
            >
              <option value="">Todas identidades</option>
              {identidadesDisponiveis.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="rounded-2xl border border-[#d8cab2] bg-[#fbf5ea] px-5 py-4 outline-none"
            >
              <option value="">Todos os idiomas</option>
              {idiomasDisponiveis.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
            {documentosFiltrados.length} documento(s) encontrado(s)
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {documentosFiltrados.map((doc: any) => {
          const pdfUrl = doc.pdf?.url
            ? `http://localhost:1337${doc.pdf.url}`
            : doc.link_documento || "#"

          const resumo = textoRichText(doc.resumo)
          const idiomas = getIdiomas(doc)

          return (
            <article
              key={doc.id}
              className="rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                {doc.tipo_documento || "Documento"} •{" "}
                {doc.ano_publicacao || "s/d"}
              </p>

              <h2 className="text-2xl font-black">
                {doc.titulo || "Sem título"}
              </h2>

              <p className="mt-4 text-[#4f4638]">
                <strong>Autoria:</strong> {doc.autora || "Não informada"}
              </p>

              {(doc.territorio_principal || doc.territorio) && (
                <p className="mt-2 text-[#4f4638]">
                  <strong>Território:</strong>{" "}
                  {doc.territorio_principal || doc.territorio}
                </p>
              )}

              {getIdentidades(doc).length > 0 && (
                <p className="mt-2 text-[#4f4638]">
                  <strong>Identidades:</strong>{" "}
                  {getIdentidades(doc).join(", ")}
                </p>
              )}

              {idiomas.length > 0 && (
                <p className="mt-2 text-[#4f4638]">
                  <strong>Idiomas:</strong> {idiomas.join(", ")}
                </p>
              )}

              <p className="mt-4 leading-relaxed text-[#4f4638]">
                {resumo || "Resumo disponível no cadastro do documento."}
              </p>

              {doc.palavras_chave && (
                <p className="mt-4 text-sm text-[#5e5548]">
                  <strong>Palavras-chave:</strong> {doc.palavras_chave}
                </p>
              )}

              {Array.isArray(doc.verbetes) && doc.verbetes.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                    Verbetes
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {doc.verbetes.map((verbete: string) => (
                      <span
                        key={verbete}
                        className="rounded-full bg-[#17311f]/10 px-4 py-2 text-sm font-semibold text-[#17311f]"
                      >
                        {verbete}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {idiomas.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
                    Idiomas
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {idiomas.map((item: string) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#d9a441]/20 px-4 py-2 text-sm font-semibold text-[#8d6b2f]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
              >
                Abrir documento →
              </a>
            </article>
          )
        })}
      </section>
    </main>
  )
}