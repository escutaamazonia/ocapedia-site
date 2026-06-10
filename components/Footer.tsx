import Link from "next/link"

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0b160d] py-16 text-[#d9ceb8]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
          <div className="space-y-5">
            <h5 className="text-2xl font-black text-[#f0d28c]">
              OCAPÉDIA AFROINDÍGENA
            </h5>

            <p className="leading-relaxed text-[#cbbda2]">
              Plataforma colaborativa dedicada à memória, comunicação,
              tecnologias e epistemologias afroindígenas.
            </p>
          </div>

          <div>
            <h6 className="mb-5 text-lg font-bold text-[#f0d28c]">
              Explorar
            </h6>

            <ul className="space-y-3">
              <li><Link href="/mulheres">Mulheres</Link></li>
              <li><Link href="/territorios">Territórios</Link></li>
              <li><Link href="/producoes">Produções</Link></li>
              <li><Link href="/busca">Busca Integrada</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="mb-5 text-lg font-bold text-[#f0d28c]">
              Plataforma
            </h6>

            <ul className="space-y-3">
              <li><Link href="/metodologia">Metodologia</Link></li>
              <li><Link href="/politica-de-dados">Política de dados</Link></li>
              <li><Link href="/colabore">Colabore</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-[#d9a441]/20 bg-[#132719] p-8">
            <h6 className="mb-4 text-xl font-bold text-[#f0d28c]">
              Receba novidades
            </h6>

            <p className="mb-6 text-[#d7cab0]">
              Atualizações sobre pesquisas, produções e iniciativas afroindígenas.
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-[#cdbf9d]"
              />

                            <Link
                href="/busca"
                className="flex items-center justify-center rounded-xl border border-[#d9a441]/30 px-5 py-3 font-bold text-[#f0d28c] transition hover:bg-[#d9a441]/10"
              >
                🔎 Explorar acervo completo
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <section className="bg-[#e7dcc8] py-14 text-[#1f1b16]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.25em] text-[#8d6b2f]">
            Realização • Apoio • Parcerias
          </p>

          <div className="flex flex-wrap items-center justify-between gap-10">
            <img src="/logos/unifap.png" alt="UNIFAP" className="h-14 w-auto object-contain" />
            <img src="/logos/cnpq.png" alt="CNPq" className="h-14 w-auto object-contain" />
            <img src="/logos/unesp.png" alt="UNESP" className="h-14 w-auto object-contain" />
            <img src="/logos/pcla.png" alt="PCLA" className="h-14 w-auto object-contain" />
          </div>

          <p className="mt-10 text-sm text-[#5c5244]">
            © 2026 Ocapédia Afroindígena • Comunicação, território e memória.
          </p>
        </div>
      </section>
    </>
  )
}