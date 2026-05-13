export default function Footer() {
  return (
    <>
      <footer className="bg-[#0b160d] py-16 text-[#d9ceb8]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
          <div className="space-y-5">
            <h5 className="text-2xl font-black text-[#f0d28c]">
              OCAPÉDIA INDÍGENA
            </h5>

            <p className="leading-relaxed text-[#cbbda2]">
              Plataforma colaborativa dedicada à memória, comunicação,
              tecnologias e epistemologias indígenas.
            </p>
          </div>

          <div>
            <h6 className="mb-5 text-lg font-bold text-[#f0d28c]">
              Explorar
            </h6>

            <ul className="space-y-3">
              <li><a href="/mulheres" className="transition hover:text-[#d9a441]">Mulheres</a></li>
              <li><a href="/territorios" className="transition hover:text-[#d9a441]">Territórios</a></li>
              <li><a href="/producoes" className="transition hover:text-[#d9a441]">Produções</a></li>
              <li><a href="/mapa" className="transition hover:text-[#d9a441]">Mapa</a></li>
            </ul>
          </div>

          <div>
            <h6 className="mb-5 text-lg font-bold text-[#f0d28c]">
              Plataforma
            </h6>

            <ul className="space-y-3">
              <li><a href="/metodologia" className="transition hover:text-[#d9a441]">Metodologia</a></li>
              <li><a href="/politica-de-dados" className="transition hover:text-[#d9a441]">Política de dados</a></li>
              <li><a href="/colabore" className="transition hover:text-[#d9a441]">Colabore</a></li>
              <li><a href="/contato" className="transition hover:text-[#d9a441]">Contato</a></li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-[#d9a441]/20 bg-[#132719] p-8">
            <h6 className="mb-4 text-xl font-bold text-[#f0d28c]">
              Receba novidades
            </h6>

            <p className="mb-6 text-[#d7cab0]">
              Atualizações sobre pesquisas, produções e iniciativas indígenas.
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-[#cdbf9d]"
              />

              <button className="w-full rounded-xl bg-[#d9a441] px-5 py-3 font-bold text-[#1f180f] transition hover:scale-[1.02]">
                Assinar
              </button>
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
            © 2026 Ocapédia Indígena • Comunicação, território e memória.
          </p>
        </div>
      </section>
    </>
  )
}