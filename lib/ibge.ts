export async function getPopulacaoBrasil() {
  const res = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/projecoes/populacao"
  )

  const data = await res.json()

  return data
}