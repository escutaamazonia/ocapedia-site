import SaberesFiltro from "@/components/SaberesFiltro"
async function getSaberes() {
  try {
    const res = await fetch("http://localhost:1337/api/saberes?populate=*", {
      cache: "no-store",
    })

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
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

export default async function SaberesPage() {
  const saberes = await getSaberes()

  return (
    <main className="min-h-screen bg-[#f5ecdb] px-6 py-24 text-[#1f1b16]">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Cartografia de Saberes OCA
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight">
          Saberes, epistemologias e relações amazônicas
        </h1>

        <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[#4f4638]">
          Rede viva de conceitos, documentos, mulheres, territórios, línguas e
          epistemologias que estruturam a memória comunicacional amazônica.
        </p>

        <SaberesFiltro saberes={saberes} />
      </div>
    </main>
  )
}