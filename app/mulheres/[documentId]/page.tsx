async function getMulher(documentId: string) {
  const res = await fetch(
    "http://localhost:1337/api/mulheres?populate=*&pagination[pageSize]=500",
  {
    cache: "no-store",
  }
)

  const json = await res.json()

  return json.data?.find((item: any) => item.documentId === documentId)
}

export default async function MulherPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = await params
  const mulher = await getMulher(documentId)

  if (!mulher) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3ead8]">
        <p className="text-2xl font-bold">Perfil não encontrado</p>
      </main>
    )
  }

  const foto = mulher.foto?.url
    ? `http://localhost:1337${mulher.foto.url}`
    : ""

  const bioTexto = Array.isArray(mulher.bio)
    ? mulher.bio
        .map((bloco: any) =>
          bloco.children?.map((child: any) => child.text).join("")
        )
        .join("\n\n")
    : mulher.bio

  return (
    <main className="min-h-screen bg-[#f3ead8] px-6 py-20 text-[#1f1b16]">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="mb-10 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
        >
          ← Voltar
        </a>

        <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
          {foto && (
            <img
              src={foto}
              alt={mulher.nome}
              className="h-[460px] w-full rounded-[2rem] object-cover shadow-2xl"
            />
          )}

          <div>
            <span className="mb-6 inline-flex rounded-full bg-[#d9a441]/15 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
              {mulher.atuacao || "Perfil"}
            </span>

            <h1 className="mb-6 text-5xl font-black leading-tight">
              {mulher.nome}
            </h1>

            <p className="mb-4 text-xl font-semibold text-[#4f4638]">
              {mulher.etnia} • {mulher.territorio}
            </p>

            {mulher.aldeia && (
              <p className="mb-8 text-lg text-[#5e5548]">
                Aldeia: {mulher.aldeia}
              </p>
            )}

            <p className="whitespace-pre-line text-lg leading-relaxed text-[#4f4638]">
              {bioTexto}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}