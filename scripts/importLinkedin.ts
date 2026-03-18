/**
 * LinkedIn Data Import Script
 *
 * Como usar:
 * 1. Acesse LinkedIn → Configurações → Privacidade de Dados → Obter uma cópia dos seus dados
 * 2. Solicite o export "Posições" (CSV)
 * 3. Coloque o arquivo CSV baixado em: scripts/linkedin_positions.csv
 * 4. Configure o seu MONGODB_URI no .env.local
 * 5. Execute: npx ts-node --project tsconfig.json scripts/importLinkedin.ts
 *
 * O arquivo CSV do LinkedIn tem os campos:
 * Company Name, Title, Description, Location, Started On, Finished On
 */

import fs from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const CSV_PATH = path.join(process.cwd(), 'scripts', 'linkedin_positions.csv')

interface LinkedInRow {
  'Company Name': string
  Title: string
  Description: string
  Location: string
  'Started On': string
  'Finished On': string
}

function parseCSV(content: string): LinkedInRow[] {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())

  return lines.slice(1).map(line => {
    // Handle commas inside quoted strings
    const values: string[] = []
    let current = ''
    let insideQuotes = false

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        insideQuotes = !insideQuotes
      } else if (line[i] === ',' && !insideQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += line[i]
      }
    }
    values.push(current.trim())

    return headers.reduce((obj, header, idx) => {
      obj[header as keyof LinkedInRow] = values[idx] ?? ''
      return obj
    }, {} as LinkedInRow)
  })
}

function formatPeriodo(startedOn: string, finishedOn: string): string {
  if (!finishedOn || finishedOn === '') {
    return `${startedOn} – Presente`
  }
  return `${startedOn} – ${finishedOn}`
}

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ Arquivo não encontrado: ${CSV_PATH}`)
    console.log('📁 Coloque o arquivo CSV do LinkedIn em: scripts/linkedin_positions.csv')
    process.exit(1)
  }

  console.log('📖 Lendo CSV...')
  const content = fs.readFileSync(CSV_PATH, 'utf-8')
  const rows = parseCSV(content)
  console.log(`✅ ${rows.length} registros encontrados`)

  const experiences = rows.map(row => ({
    cargo: row['Title'] || '',
    empresa: row['Company Name'] || '',
    periodo: formatPeriodo(row['Started On'] || '', row['Finished On'] || ''),
    descricao: row['Description'] || '',
    tecnologias: [] as string[], // Você pode adicionar manualmente depois
    dataImportacao: new Date().toISOString(),
    fonte: 'linkedin',
  }))

  console.log('\n📋 Preview dos dados:')
  experiences.forEach((exp, i) => {
    console.log(`  ${i + 1}. ${exp.cargo} @ ${exp.empresa} (${exp.periodo})`)
  })

  console.log('\n🔌 Conectando ao MongoDB...')
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db('joaoitoBlog')
    const collection = db.collection('experiences')

    // Limpa importações anteriores do LinkedIn para evitar duplicatas
    await collection.deleteMany({ fonte: 'linkedin' })
    console.log('🗑️  Registros antigos do LinkedIn removidos')

    const result = await collection.insertMany(experiences)
    console.log(`✅ ${result.insertedCount} experiências importadas com sucesso!`)
  } finally {
    await client.close()
  }
}

main().catch(err => {
  console.error('❌ Erro:', err)
  process.exit(1)
})
