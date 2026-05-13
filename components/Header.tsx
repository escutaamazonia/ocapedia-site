export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#3b3326]/20 bg-[#102214]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-[#f0d28c]">
            OCAPÉDIA INDÍGENA
          </h1>

          <p className="text-xs uppercase tracking-[0.3em] text-[#d4c29b]">
            Comunicação • Território • Memória
          </p>
        </div>

        <nav className="hidden gap-6 text-sm text-[#efe5d0] md:flex">
          <a href="#" className="transition hover:text-[#f0d28c]">
            Sobre
          </a>

          <a href="#" className="transition hover:text-[#f0d28c]">
            Mulheres
          </a>

          <a href="#" className="transition hover:text-[#f0d28c]">
            Territórios
          </a>

          <a href="#" className="transition hover:text-[#f0d28c]">
            Produções
          </a>

          <a href="#" className="transition hover:text-[#f0d28c]">
            Acervo
          </a>

          <a href="#" className="transition hover:text-[#f0d28c]">
            Mapa
          </a>
        </nav>

        <button className="rounded-full bg-[#d9a441] px-5 py-2 text-sm font-semibold text-[#1c160f] shadow-lg transition hover:scale-105">
          Colabore
        </button>
      </div>
    </header>
  )
}