import Mapa from "@/components/Mapa"
import Link from "next/link"
import NuvemVerbetes from "@/components/NuvemVerbetes"
import AcessibilidadeHeader from "@/components/AcessibilidadeHeader"
import { API_URL } from "@/lib/api"

async function getCategorias() {
  try {
    const res = await fetch(`${API_URL}/api/categorias`, {
      cache: "no-store",
    })

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

async function getProducoes() {
  try {
    const res = await fetch(
      `${API_URL}/api/producoes?populate=*`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}

async function getMulheres() {
  try {
    const res = await fetch(
      `${API_URL}/api/mulheres?populate=*&pagination[pageSize]=500`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()
    return json.data || []
  } catch {
    return []
  }
}
async function getMulherDestaque() {
  try {
    const res = await fetch(
      `${API_URL}/api/mulheres?populate=*&filters[destaque][$eq]=true&pagination[limit]=1`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()
    return json.data?.[0] || null
  } catch {
    return null
  }
}

async function getProducaoDestaque() {
  try {
    const res = await fetch(
      `${API_URL}/api/producoes?populate=*&filters[destaque][$eq]=true&sort=createdAt:desc&pagination[limit]=1`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()
    return json.data?.[0] || null
  } catch {
    return null
  }
}

async function getDocumentoDestaque() {
  try {
    const res = await fetch(
      `${API_URL}/api/documentos?populate=*&filters[destaque][$eq]=true&sort=createdAt:desc&pagination[limit]=1`,
      {
        cache: "no-store",
      }
    )

    const json = await res.json()
    return json.data?.[0] || null
  } catch {
    return null
  }
}

async function getEstatisticas() {
  try {
    const [
      mulheresRes,
      producoesRes,
      documentosRes,
      coletivosRes,
    ] = await Promise.all([
      fetch(
        `${API_URL}/api/mulheres?pagination[pageSize]=1`,
        { cache: "no-store" }
      ),

      fetch(
        `${API_URL}/api/producoes?pagination[pageSize]=1`,
        { cache: "no-store" }
      ),

      fetch(
        `${API_URL}/api/documentos?pagination[pageSize]=1`,
        { cache: "no-store" }
      ),

      fetch(
  `${API_URL}/api/mulheres?filters[categoria_mapa][$eq]=coletivo&pagination[pageSize]=1`,
  { cache: "no-store" }
),
    ])

    const mulheres = await mulheresRes.json()
    const producoes = await producoesRes.json()
    const documentos = await documentosRes.json()
    const coletivos = await coletivosRes.json()

    return {
      mulheres:
        mulheres.meta?.pagination?.total || 0,

      producoes:
        producoes.meta?.pagination?.total || 0,

      documentos:
        documentos.meta?.pagination?.total || 0,

      coletivos:
        coletivos.meta?.pagination?.total || 0,
    }
  } catch {
    return {
      mulheres: 0,
      producoes: 0,
      documentos: 0,
      coletivos: 0,
    }
  }
}
    
export default async function OcapediaIndigena() {
  const categoriasApi = await getCategorias()
  const producoes = await getProducoes()
  const mulheres = await getMulheres()

  const mulher = await getMulherDestaque()
  const producao = await getProducaoDestaque()
  const documento = await getDocumentoDestaque()
  const stats = await getEstatisticas()

  return (
    <div className="min-h-screen bg-[#f3ead8] text-[#1f1b16]">
      
      <section
        className="relative flex min-h-[92vh] items-center overflow-hidden bg-cover pt-32"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,18,9,0.45), rgba(6,18,9,0.55)), url('/images/mulherescapa.jpg')",
          backgroundPosition: "center center",
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-[#d9a441]/30 bg-[#d9a441]/10 px-4 py-2 text-sm text-[#f0d28c]">
              Plataforma de memória e comunicação Afroindígena
            </div>

            <div className="space-y-6">
              <h2 className="max-w-3xl text-5xl font-black leading-tight text-[#f7f2e8] lg:text-7xl">
                Mulheres Afroindígenas comunicando territórios e saberes
              </h2>

              <p className="max-w-2xl text-lg leading-relaxed text-[#ddd1bb]">
                Plataforma digital colaborativa para organização de produções,
                pesquisas, mídias, oralidades e tecnologias desenvolvidas por
                mulheres Afroindígenas na Amazônia Legal e em outros territórios.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-2xl bg-[#d9a441] px-8 py-4 text-base font-bold text-[#1f180f] shadow-xl transition hover:scale-105">
                Explorar o mapa
              </button>

              <button className="rounded-2xl border border-[#e6d5ab]/40 bg-white/10 px-8 py-4 text-base font-semibold text-[#f4e8cf] backdrop-blur transition hover:bg-white/20">
                Conheça o projeto
              </button>
            </div>
          </div>

          <div className="hidden items-end justify-end lg:flex">
            <div className="max-w-sm rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <p className="text-xl italic leading-relaxed text-[#efe1c1]">
                “Nossas palavras criam caminhos, nossas redes conectam mundos.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ead8] px-6 py-12">
  <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
    <div>
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
        Territórios Amazônicos
      </p>

      <h2 className="text-4xl font-black text-[#1f1b16]">
        Observatório de narrativas
      </h2>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#4f4638]">
        Acompanhe temas emergentes, denúncias, comunicação comunitária,
        conflitos territoriais e sinais públicos monitorados pela OCA.
      </p>
    </div>

    <div className="rounded-[2rem] border border-[#d8cab2] bg-white p-8 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#17311f]">
          Radar Amazônico
        </h3>

        <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#17311f] p-5 text-white">
          <div className="text-3xl font-black">24</div>
          <div className="text-sm text-[#d7cab0]">Narrativas</div>
        </div>

        <div className="rounded-2xl bg-[#efe5d4] p-5">
          <div className="text-3xl font-black text-[#8d6b2f]">8</div>
          <div className="text-sm text-[#5b5144]">Alertas ativos</div>
        </div>
      </div>

      <a
        href="/radar"
        className="mt-6 inline-flex rounded-2xl bg-[#d9a441] px-6 py-3 font-bold text-[#1f180f] transition hover:scale-105"
      >
        Explorar Radar →
      </a>
    </div>
  </div>
</section>

      <section className="border-y border-[#d8ccb4] bg-[#efe5d4] py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4 lg:grid-cols-8">
          {categoriasApi.map((item: any) => (
            <div
              key={item.id}
              className="rounded-2xl border bg-[#f7f0e3] p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderColor: item.cor || "#d7cab0",
              }}
            >
              <div className="mb-4 text-5xl leading-none">
                {item.icone || "◎"}
              </div>

              <p className="text-sm font-bold leading-snug">{item.nome}</p>

              <p className="mt-3 text-xs leading-relaxed text-[#5e5548]">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Mapa
  mulheres={mulheres.map((mulher: any) => ({
    id: mulher.id,
    documentId: mulher.documentId,
    nome: mulher.nome,
    territorio: mulher.territorio,
    etnia: mulher.etnia,
    latitude: mulher.latitude,
longitude: mulher.longitude,

tipo: mulher.tipo,
categoria_mapa: mulher.categoria_mapa,

foto: mulher.foto?.url
      ? `http://localhost:1337${mulher.foto.url}`
      : undefined,
  }))}
/>
<section className="bg-[#f1e7d7] pt-8 pb-10">
  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

      <div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8d6b2f]">
          Destaques
        </p>

        <h3 className="max-w-2xl text-4xl font-black leading-tight">
          Conheça histórias, produções e pesquisas
        </h3>

      </div>

      <button className="rounded-2xl border border-[#bca888] px-6 py-3 font-semibold transition hover:bg-[#e7dbc5]">
        Ver acervo completo
      </button>

    </div>

    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {[
  mulher && {
    tipo: "Mulher",
    titulo: mulher.nome,
    descricao: mulher.bio?.[0]?.children?.[0]?.text || "",
    imagem: mulher.foto?.url
      ? `http://localhost:1337${mulher.foto.url}`
      : "",
    link: `/mulheres/${mulher.documentId}`,
  },

  producao && {
    tipo: "Produção",
    titulo: producao.titulo,
    descricao: producao.descricao,
    imagem: producao.imagem?.url
      ? `http://localhost:1337${producao.imagem.url}`
      : "",
    link: `/producoes/${producao.documentId}`,
  },

  documento && {
  tipo: documento.tipo_documento || "Documento",
  titulo: documento.titulo,
  descricao: Array.isArray(documento.resumo)
    ? documento.resumo
        .map((bloco: any) =>
          bloco.children?.map((child: any) => child.text).join("")
        )
        .join(" ")
    : documento.resumo || "Documento da Biblioteca Amazônica OCA.",
  imagem:
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop",
  link: "/documentos",
}
]
  .filter(Boolean)
  .map((card: any) => (
    <div
      key={card.titulo}
      className="overflow-hidden rounded-[2rem] border border-[#d8cab2] bg-[#fbf5ea] shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
    >
      <div
        className="h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${card.imagem})`,
        }}
      />

      <div className="space-y-4 p-8">
        <span className="inline-flex rounded-full bg-[#d9a441]/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8d6b2f]">
          {card.tipo}
        </span>

        <h4 className="text-2xl font-black leading-snug">
          {card.titulo}
        </h4>

        <p className="leading-relaxed text-[#4f4638]">
          {card.descricao}
        </p>

        <a
          href={card.link}
          className="inline-block pt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#17311f]"
        >
          Explorar →
        </a>
      </div>
    </div>
  ))}

    </div>
  </div>
</section>
      <NuvemVerbetes />
      <section className="bg-[#102214] py-16 text-[#f3e9d3]">
  <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
    {[
  [stats.mulheres, "Mulheres cadastradas", "/mulheres"],
  [stats.producoes, "Produções registradas", "/producoes"],
  [stats.documentos, "Documentos e acervos", "/documentos"],
  [stats.coletivos, "Coletivos e iniciativas", "/coletivos"],
].map(([numero, texto, link]) => (
  <Link
    key={texto}
    href={link as string}
    className="rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl"
  >
    <div className="mb-3 text-5xl font-black text-[#d9a441]">
      {numero}
    </div>

    <p className="text-lg text-[#ddd1bb]">
      {texto}
    </p>
  </Link>
))}
  </div>
</section>
<footer className="bg-[#0b160d] py-8 text-[#d9ceb8]">
  <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
    <div className="space-y-3">
      <h5 className="text-xl font-black leading-tight text-[#f0d28c]">
        OCAPÉDIA AFROINDÍGENA
      </h5>

      <p className="max-w-xs text-sm leading-6 text-[#cbbda2]">
        Plataforma colaborativa dedicada à memória, comunicação,
        tecnologias e epistemologias afroindígenas.
      </p>
    </div>
<div>
  <h6 className="mb-3 text-base font-bold text-[#f0d28c]">
    Explorar
  </h6>

  <ul className="space-y-2 text-sm">
    <li>
      <Link href="/mulheres" className="hover:text-[#f0d28c] transition">
        Mulheres
      </Link>
    </li>

    <li>
      <Link href="/territorios" className="hover:text-[#f0d28c] transition">
        Territórios
      </Link>
    </li>

    <li>
      <Link href="/producoes" className="hover:text-[#f0d28c] transition">
        Produções
      </Link>
    </li>

    <li>
      <Link href="/saberes" className="hover:text-[#f0d28c] transition">
        Saberes
      </Link>
    </li>
  </ul>
</div>    
    <div>
  <h6 className="mb-3 text-base font-bold text-[#f0d28c]">
    Plataforma
  </h6>

  <ul className="space-y-2 text-sm">
    <li>
      <Link href="/metodologia" className="hover:text-[#f0d28c] transition">
        Metodologia
      </Link>
    </li>

    <li>
      <Link
        href="/politica-de-dados"
        className="hover:text-[#f0d28c] transition"
      >
        Política de dados
      </Link>
    </li>

    <li>
      <Link href="/colabore" className="hover:text-[#f0d28c] transition">
        Colabore
      </Link>
    </li>

    <li>
      <Link href="/contato" className="hover:text-[#f0d28c] transition">
        Contato
      </Link>
    </li>
  </ul>
</div>

    <div className="rounded-[1.5rem] border border-[#d9a441]/20 bg-[#132719] p-6">
      <h6 className="mb-3 text-lg font-bold text-[#f0d28c]">
        Receba novidades
      </h6>

      <p className="mb-4 text-sm leading-6 text-[#d7cab0]">
        Atualizações sobre pesquisas, produções e iniciativas afroindígenas.
      </p>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white outline-none placeholder:text-[#cdbf9d]"
        />

        <button className="w-full rounded-xl bg-[#d9a441] px-5 py-2.5 text-sm font-bold text-[#1f180f] transition hover:scale-[1.02]">
          Assinar
        </button>
      </div>
    </div>
  </div>
</footer>

</div>
  )
}
