async function buscarStrapi(url: string) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
    })

    if (!res.ok) return []

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q") || ""

    if (!q.trim()) {
      return Response.json({ results: [] })
    }

    const termo = encodeURIComponent(q)
    const base = "http://localhost:1337/api"

    const [mulheres, documentos, producoes, radar] = await Promise.all([
      buscarStrapi(
        `${base}/mulheres?filters[$or][0][nome][$containsi]=${termo}&filters[$or][1][territorio][$containsi]=${termo}&filters[$or][2][etnia][$containsi]=${termo}&populate=*`
      ),

      buscarStrapi(
        `${base}/documentos?filters[$or][0][titulo][$containsi]=${termo}&filters[$or][1][autora][$containsi]=${termo}&populate=*`
      ),

      buscarStrapi(
        `${base}/producoes?filters[titulo][$containsi]=${termo}&populate=*`
      ),

      buscarStrapi(
        `${base}/social-narratives?filters[content][$containsi]=${termo}`
      ),
    ])

    const results = [
      ...mulheres.map((item: any) => ({
        tipo: "Mulher",
        titulo: item.nome,
        descricao: item.territorio || item.etnia || "",
        link: `/mulheres/${item.documentId}`,
      })),

      ...documentos.map((item: any) => ({
        tipo: "Documento",
        titulo: item.titulo,
        descricao: item.autora || item.instituicao || "",
        link: `/documentos/${item.documentId}`
      })),

      ...producoes.map((item: any) => ({
        tipo: "Produção",
        titulo: item.titulo,
        descricao: item.descricao || "",
        link: `/producoes/${item.documentId}`,
      })),

      ...radar.map((item: any) => ({
        tipo: "Radar",
        titulo: item.theme || "Narrativa",
        descricao: item.content || "",
        link: "/radar",
      })),
    ].filter((item) => item.titulo)

    return Response.json({ results })
  } catch (error) {
    console.error("Erro na busca OCA:", error)

    return Response.json(
      { results: [], error: "Erro interno na busca OCA" },
      { status: 200 }
    )
  }
}