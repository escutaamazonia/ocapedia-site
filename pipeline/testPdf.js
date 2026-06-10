const { extractPdfText } = require("./extractPdf")
const { extractIndicators } = require("./extractIndicators")
const { sendIndicatorsToStrapi } = require("./sendIndicatorsToStrapi")

async function run() {
  const texto = await extractPdfText("./pipeline/teste.pdf")

  const indicadores = extractIndicators(texto)

  console.log("Indicadores encontrados:")
  console.log(JSON.stringify(indicadores, null, 2))

  await sendIndicatorsToStrapi(indicadores)
}

run()