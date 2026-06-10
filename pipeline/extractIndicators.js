function extractIndicators(text) {
  const indicadores = []

  const patterns = [
    {
      titulo: "Homicídios dolosos de mulheres",
      regex:
        /(?:redução|queda|diminuição)\s+de\s+(\d+(?:,\d+)?)%\s+nas taxas de homicídios dolosos de mulheres na Amazônia/i,
      categoria: "violencia-genero",
      unidade: "%",
      eixo_analitico: "violencia",
      territorio: "Amazônia Legal",
    },
    {
      titulo: "Feminicídios",
      regex:
        /(?:taxas de feminicídio na Amazônia aumentaram|feminicídios aumentaram|aumento de)\s+(\d+(?:,\d+)?)%/i,
      categoria: "feminicidio",
      unidade: "%",
      eixo_analitico: "violencia",
      territorio: "Amazônia Legal",
    },
    {
      titulo: "Violência sexual contra mulheres",
      regex:
        /(?:violência sexual.*?(?:aumentou|cresceu|alta de|aumento de)\s+(\d+(?:,\d+)?)%|aumento de\s+(\d+(?:,\d+)?)%\s+.*?violência sexual)/i,
      categoria: "violencia-genero",
      unidade: "%",
      eixo_analitico: "violencia",
      territorio: "Amazônia Legal",
    },
    {
      titulo: "Violência não letal contra mulheres",
      regex:
        /aumento de\s+(\d+(?:,\d+)?)%\s+nas taxas de violência não letal na região/i,
      categoria: "violencia-genero",
      unidade: "%",
      eixo_analitico: "violencia",
      territorio: "Amazônia Legal",
    },
    {
      titulo: "Violência física contra mulheres",
      regex:
        /violência física aumentou\s+(\d+(?:,\d+)?)%\s+na Amazônia/i,
      categoria: "violencia-genero",
      unidade: "%",
      eixo_analitico: "violencia",
      territorio: "Amazônia Legal",
    },
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern.regex)

    if (match) {
      const valorExtraido = match[1] || match[2]

      indicadores.push({
        titulo: pattern.titulo,
        valor: Number(valorExtraido.replace(",", ".")),
        unidade: pattern.unidade,
        categoria: pattern.categoria,
        territorio: pattern.territorio,
        eixo_analitico: pattern.eixo_analitico,
        fonte: "Instituto Igarapé",
        ano: 2024,
        nivel_geografico: "regional",
        descricao:
          "Indicador extraído automaticamente do relatório oficial pelo pipeline da OCA.",
      })
    }
  }

  return indicadores
}

module.exports = { extractIndicators }