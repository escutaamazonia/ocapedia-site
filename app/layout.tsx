import Script from "next/script"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import EllatinaChat from "@/components/EllatinaChat"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ocapédia Afroindígena",
  description: "Observatório de Comunicação na Amazônia",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f3ead8] text-[#1f1b16]">
        <header className="sticky top-0 z-50 border-b border-[#3b3326]/20 bg-[#102214]/95 backdrop-blur">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

    <Link href="/">
      <div className="flex items-center gap-4">
        <img
          src="/logo-oca.png"
          alt="OCA"
          className="h-16 w-auto object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold tracking-wide text-[#f0d28c]">
            OCAPÉDIA AFROINDÍGENA
          </h1>

          <p className="text-xs uppercase tracking-[0.3em] text-[#d4c29b]">
            Comunicação • Território • Memória
          </p>
        </div>
      </div>
    </Link>

    <div className="flex flex-col items-end gap-3">
      <nav className="flex flex-wrap items-center justify-end gap-6 text-sm text-[#efe5d0]">
        <Link href="/sobre" className="hover:text-[#f0d28c]">
          Sobre
        </Link>

        <Link href="/mulheres" className="hover:text-[#f0d28c]">
          Mulheres
        </Link>

        <Link href="/producoes" className="hover:text-[#f0d28c]">
          Produções
        </Link>

        <Link href="/documentos" className="hover:text-[#f0d28c]">
          Biblioteca
        </Link>

        <Link href="/saberes" className="hover:text-[#f0d28c]">
          Saberes
        </Link>

        <Link href="/observatorio" className="hover:text-[#f0d28c]">
          Observatório
        </Link>

        <Link href="/metodologia" className="hover:text-[#f0d28c]">
          Metodologia
        </Link>

        <Link
          href="/politica-de-dados"
          className="hover:text-[#f0d28c]"
        >
          Política de Dados
        </Link>
       
      </nav>

      <div className="hidden xl:flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e96a3d] text-sm font-bold text-white transition hover:scale-105">
          A+
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c63b53] text-sm font-bold text-white transition hover:scale-105">
          A
        </button>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0aa88f] text-sm font-bold text-white transition hover:scale-105">
          A-
        </button>

        <button className="overflow-hidden rounded-md transition hover:scale-105">
          <img
            src="https://flagcdn.com/w40/br.png"
            alt="Português"
            className="h-8 w-12 object-cover"
          />
        </button>

        <button className="overflow-hidden rounded-md transition hover:scale-105">
          <img
            src="https://flagcdn.com/w40/es.png"
            alt="Español"
            className="h-8 w-12 object-cover"
          />
        </button>

        <button className="overflow-hidden rounded-md transition hover:scale-105">
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="English"
            className="h-8 w-12 object-cover"
          />
        </button>
      </div>
    </div>

  </div>
</header>

        {children}

        <footer className="bg-[#0b160d] py-12 text-[#d9ceb8]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-[2rem] border border-[#d9a441]/20 bg-[#e7dcc8] px-10 py-7">
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-[#102214]">
                Realização • Apoio • Parcerias
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <a
                  href="https://www.unifap.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/logos/unifap.png"
                    alt="UNIFAP"
                    className="h-14 w-auto object-contain transition hover:scale-105"
                  />
                </a>

                <a
                  href="https://www.gov.br/cnpq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/logos/cnpq.png"
                    alt="CNPq"
                    className="h-14 w-auto object-contain transition hover:scale-105"
                  />
                </a>

                <a
                  href="https://www.unesp.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/logos/unesp.png"
                    alt="UNESP"
                    className="h-14 w-auto object-contain transition hover:scale-105"
                  />
                </a>

                <a
                  href="https://www.facebook.com/pclaunesp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/logos/pcla.png"
                    alt="PCLA"
                    className="h-16 w-auto object-contain transition hover:scale-105"
                  />
                </a>
                <a
                  href="https://www.instagram.com/oca.legal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/logo-oca.png"
                    alt="OCA"
                    className="h-22 w-auto object-contain transition hover:scale-105"
                  />
                </a>
                <a
                  href="https://www.gov.br/mda/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/logo-mda.png"
                    alt="MDA"
                    className="h-12 w-auto object-contain transition hover:scale-105"
                  />
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-sm leading-7 text-[#b8ab93]">
                Este portal é regido pela Política de Acesso Aberto ao
                Conhecimento, que busca garantir à sociedade o acesso
                gratuito, público e aberto ao conteúdo integral das obras
                intelectuais produzidas pela Universidade Federal do
                Amapá. O conteúdo deste portal pode ser utilizado para
                fins não comerciais, desde que respeitados os direitos
                intelectuais, culturais, ancestrais e morais das mulheres
                comunicadoras, pesquisadoras e comunidades afroindígenas
                amazônicas.
              </p>

              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-semibold text-[#d9a441] transition hover:text-[#f0d28c]"
              >
                Licenciamento Creative Commons — CC BY-NC-SA 4.0
              </a>
            </div>

            <p className="mt-6 text-sm text-[#8f826b]">
              © 2026 Ocapédia Afroindígena • Comunicação, território e
              memória.
            </p>
          </div>
        </footer>

        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div vw class="enabled">
                <div vw-access-button class="active"></div>
                <div vw-plugin-wrapper>
                  <div class="vw-plugin-top-wrapper"></div>
                </div>
              </div>
            `,
          }}
        />

        <Script
          src="https://vlibras.gov.br/app/vlibras-plugin.js"
          strategy="afterInteractive"
        />

        <Script id="vlibras-init" strategy="afterInteractive">
          {`
            setTimeout(function () {
              if (window.VLibras && window.VLibras.Widget) {
                new window.VLibras.Widget('https://vlibras.gov.br/app');
              }
            }, 1000);
          `}
        </Script>
        <EllatinaChat />
      </body>
    </html>
  )
}