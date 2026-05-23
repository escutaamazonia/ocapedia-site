export async function POST(req: Request) {
  const body = await req.json()

  const pergunta =
    body.message?.toLowerCase() || ""

  try {
    // MULHERES
    if (
      pergunta.includes("mulheres") ||
      pergunta.includes("comunicadoras")
    ) {
      const res = await fetch(
        "http://localhost:1337/api/mulheres?pagination[pageSize]=5"
      )

      const json = await res.json()

      const nomes = json.data
        ?.map((m: any) => m.nome)
        .join(", ")

      return Response.json({
        answer:
          `Encontrei mulheres cadastradas na OCA: ${nomes}.`,
      })
    }

    // PRODUÇÕES
    if (
      pergunta.includes("podcast") ||
      pergunta.includes("rádio") ||
      pergunta.includes("produção")
    ) {
      const res = await fetch(
        "http://localhost:1337/api/producoes?pagination[pageSize]=5"
      )

      const json = await res.json()

      const titulos = json.data
        ?.map((p: any) => p.titulo)
        .join(", ")

      return Response.json({
        answer:
          `Produções relacionadas encontradas: ${titulos}.`,
      })
    }

    // SABERES
    if (
      pergunta.includes("saberes") ||
      pergunta.includes("verbetes")
    ) {
      const res = await fetch(
        "http://localhost:1337/api/saberes?pagination[pageSize]=5"
      )

      const json = await res.json()

      const saberes = json.data
        ?.map((s: any) => s.titulo || s.Text)
        .join(", ")

      return Response.json({
        answer:
          `A Cartografia de Saberes reúne: ${saberes}.`,
      })
    }

    // RADAR
    if (
      pergunta.includes("radar") ||
      pergunta.includes("violência") ||
      pergunta.includes("território")
    ) {
      const res = await fetch(
        "http://localhost:1337/api/social-narratives?pagination[pageSize]=3&sort=createdAt:desc"
      )

      const json = await res.json()

      const narrativas = json.data
        ?.map((n: any) => n.content)
        .join(" | ")

      return Response.json({
        answer:
          `Narrativas recentes do Radar Amazônico: ${narrativas}`,
      })
    }

    return Response.json({
      answer:
        "Ainda estou aprendendo com os acervos da OCA 🌿",
    })
  } catch {
    return Response.json({
      answer:
        "Não consegui acessar os acervos da OCA agora.",
    })
  }
}