import { API_URL } from "@/lib/api"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function normalizar(texto: string) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function textoSimples(valor: any): string {
  if (!valor) return ""
  if (typeof valor === "string") return valor

  if (Array.isArray(valor)) {
    return valor.map((item) => textoSimples(item)).filter(Boolean).join(" ")
  }

  if (typeof valor === "object") {
    if (valor.text) return valor.text
    if (valor.children) return textoSimples(valor.children)

    return Object.values(valor)
      .map((item) => textoSimples(item))
      .filter(Boolean)
      .join(" ")
  }

  return String(valor)
}

function extrairTermo(perguntaOriginal: string) {
  return perguntaOriginal
    .replace(/quem é/gi, "")
    .replace(/quem e/gi, "")
    .replace(/o que é/gi, "")
    .replace(/o que e/gi, "")
    .replace(/fale sobre/gi, "")
    .replace(/me fale sobre/gi, "")
    .replace(/explique/gi, "")
    .replace(/defina/gi, "")
    .replace(/a mulher/gi, "")
    .replace(/\?/g, "")
    .trim()
}

async function buscar(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { cache: "no-store" })
    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

async function buscaGlobalOCA(termo: string) {
  const q = encodeURIComponent(termo)

  const [
    mulheres,
    documentos,
    producoes,
    saberesTitulo,
    saberesTexto,
    indicadores,
    radar,
  ] = await Promise.all([
    buscar(
      `/api/mulheres?filters[$or][0][nome][$containsi]=${q}&filters[$or][1][bio][$containsi]=${q}&filters[$or][2][territorio][$containsi]=${q}&filters[$or][3][etnia][$containsi]=${q}&populate=*&pagination[pageSize]=5`
    ),

    buscar(
      `/api/documentos?filters[$or][0][titulo][$containsi]=${q}&filters[$or][1][autora][$containsi]=${q}&filters[$or][2][resumo][$containsi]=${q}&filters[$or][3][palavras_chave][$containsi]=${q}&filters[$or][4][verbetes_extraidos][$containsi]=${q}&populate=*&pagination[pageSize]=5`
    ),

    buscar(
      `/api/producoes?filters[$or][0][titulo][$containsi]=${q}&filters[$or][1][descricao][$containsi]=${q}&filters[$or][2][resumo][$containsi]=${q}&populate=*&pagination[pageSize]=5`
    ),

    buscar(`/api/saberes?filters[titulo][$containsi]=${q}&populate=*&pagination[pageSize]=5`),
    buscar(`/api/saberes?filters[Text][$containsi]=${q}&populate=*&pagination[pageSize]=5`),

    buscar(
      `/api/indicadors?filters[$or][0][titulo][$containsi]=${q}&filters[$or][1][descricao][$containsi]=${q}&filters[$or][2][categoria][$containsi]=${q}&populate=*&pagination[pageSize]=5`
    ),

    buscar(
      `/api/social-narratives?filters[content][$containsi]=${q}&populate=*&pagination[pageSize]=5&sort=createdAt:desc`
    ),
  ])

  return {
    mulheres,
    documentos,
    producoes,
    saberes: [...saberesTitulo, ...saberesTexto],
    indicadores,
    radar,
  }
}

function juntarResultados(base: any, novo: any) {
  return {
    mulheres: [...base.mulheres, ...novo.mulheres],
    documentos: [...base.documentos, ...novo.documentos],
    producoes: [...base.producoes, ...novo.producoes],
    saberes: [...base.saberes, ...novo.saberes],
    indicadores: [...base.indicadores, ...novo.indicadores],
    radar: [...base.radar, ...novo.radar],
  }
}

function limitarTexto(texto: string, limite = 420) {
  if (!texto) return ""
  return texto.length > limite ? `${texto.slice(0, limite)}...` : texto
}

function montarContextoOCA(resultado: any) {
  const partes: string[] = []

  if (resultado.mulheres.length > 0) {
    partes.push("MULHERES:")
    resultado.mulheres.slice(0, 5).forEach((m: any) => {
      partes.push(
        `- ${m.nome || "Nome não informado"} | Território: ${
          m.territorio || "não informado"
        } | Estado: ${m.estado || "não informado"} | Atuação: ${
          m.atuacao || "não informada"
        } | Bio: ${limitarTexto(textoSimples(m.bio))}`
      )
    })
  }

  if (resultado.documentos.length > 0) {
    partes.push("\nDOCUMENTOS:")
    resultado.documentos.slice(0, 5).forEach((d: any) => {
      partes.push(
        `- ${d.titulo || "Documento sem título"} | Autoria: ${
          d.autora || "não informada"
        } | Ano: ${d.ano_publicacao || d.ano || "s/d"} | Resumo: ${limitarTexto(
          textoSimples(d.resumo)
        )} | Palavras-chave: ${textoSimples(d.palavras_chave)} | Verbetes: ${textoSimples(
          d.verbetes_extraidos
        )}`
      )
    })
  }

  if (resultado.producoes.length > 0) {
    partes.push("\nPRODUÇÕES:")
    resultado.producoes.slice(0, 5).forEach((p: any) => {
      partes.push(
        `- ${p.titulo || "Produção sem título"} | Descrição: ${limitarTexto(
          textoSimples(p.descricao || p.resumo)
        )}`
      )
    })
  }

  if (resultado.saberes.length > 0) {
    partes.push("\nSABERES:")
    resultado.saberes.slice(0, 5).forEach((s: any) => {
      partes.push(
        `- ${s.titulo || s.Text || "Verbete sem título"} | Texto: ${limitarTexto(
          textoSimples(s.Text || s.descricao || s.resumo)
        )}`
      )
    })
  }

  if (resultado.indicadores.length > 0) {
    partes.push("\nINDICADORES:")
    resultado.indicadores.slice(0, 5).forEach((i: any) => {
      const valor =
        i.valor !== undefined ? `${i.valor}${i.unidade || ""}` : "não informado"

      partes.push(
        `- ${i.titulo || "Indicador sem título"} | Valor: ${valor} | Território: ${
          i.territorio || "não informado"
        } | Fonte: ${i.fonte || "não informada"} | Descrição: ${limitarTexto(
          textoSimples(i.descricao)
        )}`
      )
    })
  }

  if (resultado.radar.length > 0) {
    partes.push("\nRADAR AMAZÔNICO:")
    resultado.radar.slice(0, 5).forEach((r: any) => {
      partes.push(`- ${limitarTexto(textoSimples(r.content || r.titulo || r.title))}`)
    })
  }

  return partes.join("\n")
}

async function gerarRespostaComIA(pergunta: string, contexto: string) {
  const resposta = await openai.responses.create({
    model: "gpt-4o-mini",
    instructions: `
Você é a ELLATINA, assistente de inteligência documental e territorial da OCA.

Regras obrigatórias:
- Responda exclusivamente com base no CONTEXTO OCA fornecido.
- Não use conhecimento externo.
- Não invente informações.
- Se o contexto não trouxer dados suficientes, diga que o acervo da OCA ainda não possui informação suficiente sobre o tema.
- Sua função é organizar, relacionar e sintetizar conteúdos autorizados do acervo.
- Não substitua saberes tradicionais, não fale como autoridade comunitária e não apresente saberes não documentados como verdade geral.
- Use linguagem clara, respeitosa, acadêmica e acessível.
- Quando útil, cite "Segundo o acervo da OCA" ou "Nos materiais cadastrados na OCA".
- Ao final, liste brevemente os conteúdos consultados, sem exagerar.
    `,
    input: `
PERGUNTA DO USUÁRIO:
${pergunta}

CONTEXTO OCA:
${contexto}
    `,
  })

  return resposta.output_text
}

export async function POST(req: Request) {
  const body = await req.json()
  const perguntaOriginal = body.message || ""
  const termoBusca = extrairTermo(perguntaOriginal)

  try {
    if (termoBusca.length < 3) {
      return Response.json({
        answer:
          "Faça uma pergunta sobre mulheres, documentos, produções, saberes, indicadores ou territórios presentes no acervo da OCA.",
      })
    }

    let resultadoGlobal = await buscaGlobalOCA(termoBusca)

    const palavrasBusca = termoBusca
      .split(" ")
      .map((p) => p.trim())
      .filter((p) => p.length >= 4)

    for (const palavra of palavrasBusca) {
      const resultadoPalavra = await buscaGlobalOCA(palavra)
      resultadoGlobal = juntarResultados(resultadoGlobal, resultadoPalavra)
    }

    const encontrouAlgo =
      resultadoGlobal.mulheres.length > 0 ||
      resultadoGlobal.documentos.length > 0 ||
      resultadoGlobal.producoes.length > 0 ||
      resultadoGlobal.saberes.length > 0 ||
      resultadoGlobal.indicadores.length > 0 ||
      resultadoGlobal.radar.length > 0

    if (!encontrouAlgo) {
      return Response.json({
        answer:
          "Segundo os acervos consultados da OCA, ainda não há informação suficiente sobre esse tema.",
      })
    }

    const contextoOCA = montarContextoOCA(resultadoGlobal)
    const respostaIA = await gerarRespostaComIA(perguntaOriginal, contextoOCA)

    return Response.json({
      answer: respostaIA,
    })
  } catch (error) {
    console.error("Erro na ELLATINA:", error)

    return Response.json({
      answer:
        "Não consegui acessar os acervos da OCA agora. Verifique se o Strapi está ativo, se a API_URL está correta e se a OPENAI_API_KEY está configurada.",
    })
  }
}