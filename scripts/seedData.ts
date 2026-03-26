import { MongoClient, ObjectId } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

async function main() {
  console.log('🔌 Conectando ao MongoDB...')
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db('joaoitoBlog')

    // 1. Experiências
    const experiences = [
      {
        cargo: "Desenvolvedor FullStack Pleno - Societário",
        empresa: "BookSports",
        periodo: "outubro de 2025 - Presente",
        descricao: "Responsável pelo desenvolvimento full-stack e integrações em plataformas SaaS, APIs e soluções de agentes de IA. IA Conversacional — WhatsApp + SaaS: Desenvolvi um fluxo conversacional baseado em IA integrado diretamente ao SaaS da BookSports, automatizando a comunicação com o cliente e melhorando o suporte e a conversão em tempo real.",
        tecnologias: ["TypeScript", "Next.js", "Nest.js", "Node.js", "MongoDB", "n8n", "ZaiaAI", "OpenAI"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Desenvolvedor FullStack Pleno",
        empresa: "HustApp",
        periodo: "novembro de 2024 - setembro de 2025",
        descricao: "Responsável pelo desenvolvimento e otimização da plataforma de atendimento digital omnichannel impulsionada por IA, incluindo dashboards, integrações e automações. Chat-Loader: Criei uma camada BFF que reduziu o tempo de carregamento do chat de 2 minutos para milissegundos. Conversão e Transcrição de Áudio: Construí um pipeline capaz de processar mais de 15.000 ficheiros de áudio por hora.",
        tecnologias: ["TypeScript", "Next.js", "Nest.js", "AWS Lambda", "FFmpeg", "Whisper", "Python", "MongoDB", "n8n", "Chatbot", "MetaAI", "OpenAI"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Instrutor/Professor - Tech-Inclusão",
        empresa: "FAPTO, Palmas",
        periodo: "setembro de 2024 - novembro de 2024",
        descricao: "Instrutor selecionado para o Projeto TechInclusão (capacitação tecnológica para pessoas em vulnerabilidade social - 220 horas). Trilha prática para 60+ alunos criarem e publicarem portfólio em React.js.",
        tecnologias: ["React.js", "Next.js", "Web Dev"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Engenheiro de Software Front-End",
        empresa: "FAPTO, Palmas",
        periodo: "janeiro de 2023 - setembro de 2024",
        descricao: "Responsável pelo desenvolvimento frontend e entrega de sistemas web para o Governo do Tocantins, incluindo uma plataforma de previsão económica e política (TO-2045) e uma ferramenta de gestão documental.",
        tecnologias: ["TypeScript", "React.js", "Node.js", "Java", "SpringBoot", "Figma"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Pesquisador e Extensionista Científico Tecnológico",
        empresa: "Universidade Estadual do Tocantins",
        periodo: "setembro de 2022 - outubro de 2024",
        descricao: "Desenvolvimento full-stack do SoftwareHub, um sistema de gestão de propriedade intelectual para registo de software. Estabeleci a universidade como um polo de inovação no registo de programas de computador. Autor da propriedade intelectual do sistema SoftwareHUB. Premiado como Melhor Projeto Científico do Tocantins, 2024.",
        tecnologias: ["TypeScript", "Next.js", "React.js", "Nest.js", "Node.js", "MongoDB"],
        fonte: "linkedin_import"
      }
    ]

    console.log('📝 Atualizando Experiências...')
    await db.collection('experiences').deleteMany({ fonte: "linkedin_import" })
    await db.collection('experiences').insertMany(experiences)

    // 2. Certificações
    const certifications = [
      {
        nome: "Business Intelligence (BI) Professional",
        emissor: "Google",
        data: "2024",
        horas: "40 horas",
        link: "#"
      },
      {
        nome: "Digital Marketing Certified",
        emissor: "Google",
        data: "2023",
        horas: "40 horas",
        link: "#"
      },
      {
        nome: "Artificial Intelligence Certification",
        emissor: "Huawei",
        data: "2024",
        horas: "40 horas",
        link: "#"
      },
      {
        nome: "HTML5 e CSS3 Parte 2 e 3",
        emissor: "Alura",
        data: "2021",
        horas: "",
        link: "#"
      },
      {
        nome: "Acessibilidade Web e Algoritmos com JavaScript I",
        emissor: "Alura",
        data: "2021",
        horas: "",
        link: "#"
      }
    ]

    console.log('📝 Atualizando Certificações...')
    await db.collection('certifications').deleteMany({})
    await db.collection('certifications').insertMany(certifications)

    // 3. Educação
    const education = [
      {
        curso: "Sistemas de Informação",
        instituicao: "Universidade Estadual do Tocantins (Unitins)",
        periodo: "Agosto de 2022 - Dezembro de 2026",
        descricao: "Foco em engenharia de software, arquitetura de sistemas e inteligência artificial. Bacharelado.",
        fonte: "doc_import"
      },
      {
        curso: "Master of Technology - MTech, Administração, Negócios e Marketing",
        instituicao: "Developer Student Club CUSIT - Powered by Google Developers",
        periodo: "Novembro de 2021 - Julho de 2022",
        descricao: "Aprofundamento em tecnologias emergentes, negócios e marketing.",
        fonte: "doc_import"
      }
    ]

    console.log('📝 Atualizando Educação...')
    await db.collection('education').deleteMany({ fonte: "doc_import" })
    await db.collection('education').insertMany(education)

    console.log('🚀 Dados importados com sucesso!')

  } finally {

    await client.close()
  }
}

main().catch(console.error)
