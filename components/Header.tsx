import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#26452f] bg-[#0f2b1d]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        <Link href="/" className="space-y-1">
          <h1 className="text-5xl font-black tracking-tight text-[#f4d88d]">
            OCAPÉDIA AFROINDÍGENA
          </h1>

          <p className="text-sm uppercase tracking-[0.45em] text-[#d9cfbe]">
            Comunicação • Território • Memória
          </p>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">

          <Link
            href="/sobre"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Sobre
          </Link>

          <Link
            href="/mulheres"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Mulheres
          </Link>

          <Link
            href="/producoes"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Produções
          </Link>

          <Link
            href="/observatorio"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Observatório
          </Link>

          <Link
            href="/observatorio/violencia-genero"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Violência de Gênero
          </Link>

          <Link
            href="/metodologia"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Metodologia
          </Link>

          <Link
            href="/politica-de-dados"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Política de Dados
          </Link>

          <Link
            href="/contato"
            className="text-xl font-semibold text-[#f1eadf] transition hover:text-[#f4d88d]"
          >
            Contato
          </Link>

        </nav>

        <button className="rounded-full bg-[#d9a441] px-8 py-4 text-lg font-black text-[#1b140d] transition hover:scale-105">
          Colabore
        </button>

      </div>
    </header>
  )
}