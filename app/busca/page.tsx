import BuscaGlobal from "@/components/BuscaGlobal"

export default function BuscaPage() {
  return (
    <main className="min-h-screen bg-[#f5ecdb] px-6 py-24 text-[#1f1b16]">
      <section className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Busca Integrada OCA
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight">
          Conheça nossas mulheres, pesquisas, produções e narrativas
        </h1>

        <p className="mt-6 max-w-4xl text-xl leading-relaxed text-[#4f4638]">
          Pesquisa global em todo o acervo da Ocapédia.
        </p>

        <BuscaGlobal />
      </section>
    </main>
  )
}