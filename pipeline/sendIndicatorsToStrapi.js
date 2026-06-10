const axios = require("axios")

async function sendIndicatorsToStrapi(indicadores) {
  for (const indicador of indicadores) {
    try {
      await axios.post("http://localhost:1337/api/indicadors", {
        data: indicador,
      })

      console.log("Enviado:", indicador.titulo)
    } catch (error) {
      console.log(
        "Erro ao enviar:",
        indicador.titulo,
        error.response?.data || error.message
      )
    }
  }
}

module.exports = { sendIndicatorsToStrapi }