export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-[#f5ecdb] text-[#1f1b16]">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Contato
        </p>

        <h1 className="mb-8 text-5xl font-black leading-tight">
          Entre em contato com a Ocapédia Afroindígena
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-[#4f4638]">
          <p>
            A plataforma está aberta para diálogo com pesquisadoras,
            comunicadoras, coletivos, instituições, comunidades e iniciativas
            interessadas em colaborar com o projeto.
          </p>

          <p>
            Sugestões, correções, solicitações de atualização, parcerias,
            contribuições acadêmicas e pedidos institucionais podem ser enviados
            pelos canais abaixo.
          </p>
        </div>

        <div className="mt-12 space-y-6 rounded-[2rem] border border-[#d7cab0] bg-[#fbf5ea] p-10 shadow-sm">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
              E-mail
            </p>

            <p className="mt-2 text-xl font-semibold">
              escutaamazonia@gmail.com
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
              Instagram
            </p>

            <p className="mt-2 text-xl font-semibold">
              @oca.legal
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}