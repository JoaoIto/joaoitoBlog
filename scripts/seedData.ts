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
        cargo: "Pleno Fullstack Developer - Partner",
        empresa: "BookSports",
        periodo: "out de 2025 - o momento",
        descricao: "Responsável pelo desenvolvimento fullstack e integrações entre plataformas SaaS, APIs e soluções com agentes de IA. Atuação direta em fluxos de automação, sistemas web e interfaces conversacionais inteligentes. Planejamento e gerenciamento em sociedade da plataforma, garantindo evolução e escalabilidade.",
        tecnologias: ["Next.js", "Nest.js", "Node.js", "MongoDB", "AI Agents", "SaaS"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Pleno FullStack Developer",
        empresa: "HustApp",
        periodo: "jun de 2025 - set de 2025",
        descricao: "Otimização de latência de chat de 2 minutos para tempo real. Construção de pipeline serverless (AWS Lambda + Whisper) processando +15k audios/hora. Criação do 'Chat-Loader' para integrações financeiras e CRM.",
        tecnologias: ["AWS Lambda", "Node.js", "React.js", "TypeScript", "Whisper AI", "Serverless"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Junior Fullstack Developer",
        empresa: "HustApp",
        periodo: "nov de 2024 - jul de 2025",
        descricao: "Desenvolvimento de soluções fullstack. No frontend, criação de interfaces dinâmicas para dashboards, métricas e gráficos interativos. No backend, design de APIs robustas integradas a sistemas financeiros e redes sociais. Implementação de chatbots e soluções de IA.",
        tecnologias: ["Node.js", "React.js", "TypeScript", "JavaScript", "Chatbots", "CRM"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Instructor",
        empresa: "Fapto / TechInclusão",
        periodo: "set de 2024 - nov de 2024",
        descricao: "Professor instrutor para alunos em situação de vulnerabilidade no projeto TechInclusão. Ensino de criação de sites, desde fundamentos até um projeto completo.",
        tecnologias: ["HTML", "CSS", "Web Tech", "Teaching"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Engenheiro de software front-end (Estágio)",
        empresa: "Fapto / Governo do TO",
        periodo: "jan de 2023 - set de 2024",
        descricao: "Liderança de frontend para sistemas web de registro e gestão de documentos (TCC, artigos) e mapas de indicadores do Estado do Tocantins (TO-2045).",
        tecnologias: ["Next.js", "React", "Node.js", "Figma", "Adobe Illustrator"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Scientific Extension Researcher",
        empresa: "Unitins",
        periodo: "set de 2023 - out de 2024",
        descricao: "Democratização da plataforma web de registro de programas de computadores para propriedade intelectual na Unitins para a comunidade externa.",
        tecnologias: ["JavaScript", "TypeScript", "Web Dev"],
        fonte: "linkedin_import"
      },
      {
        cargo: "Technological Scientific Researcher",
        empresa: "Unitins",
        periodo: "ago de 2022 - set de 2023",
        descricao: "Desenvolvimento de plataforma web de registro de programas de computadores para propriedade intelectual na Unitins para acadêmicos.",
        tecnologias: ["Next.js", "Nest.js", "MongoDB"],
        fonte: "linkedin_import"
      }
    ]

    console.log('📝 Atualizando Experiências...')
    await db.collection('experiences').deleteMany({ fonte: "linkedin_import" })
    await db.collection('experiences').insertMany(experiences)

    // 2. Certificações
    const certifications = [
      {
        nome: "Data Analytics Professional Certificate",
        emissor: "Google",
        data: "2024",
        link: "#"
      },
      {
        nome: "Artificial Intelligence Certification",
        emissor: "Huawei",
        data: "2024",
        link: "#"
      },
      {
        nome: "Digital Marketing Certified",
        emissor: "Google",
        data: "2023",
        link: "#"
      },
      {
        nome: "Web Accessibility (WCAG)",
        emissor: "W3C / Self",
        data: "2023",
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
        periodo: "2022 - 2026 (Previsão)",
        descricao: "Foco em engenharia de software, arquitetura de sistemas e inteligência artificial.",
        fonte: "doc_import"
      },
      {
        curso: "MTech in Information Technology",
        instituicao: "Specialization",
        periodo: "Cursando",
        descricao: "Aprofundamento em tecnologias emergentes e gestão de TI.",
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
