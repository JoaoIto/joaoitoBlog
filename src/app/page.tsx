'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, Linkedin, Mail, Quote, Database, Cloud, 
  Code2, Server, Terminal, Cpu, Award, Globe, Zap,
  Layers, Hexagon, Boxes, Workflow, ShieldCheck
} from 'lucide-react'

// Hooks e Componentes
import { useExperiencias } from './hooks/experiences/useExperiences'
import { useEducacao } from './hooks/education/useEducation'
import { useGithubRepos } from './hooks/github/useGithubRepos'
import { useCertifications } from './hooks/certifications/useCertifications'

import { Navbar } from '@/components/ui/molecules/Navbar'
import { Hero } from '@/components/ui/organisms/Hero'
import { ExperienciaSection } from '@/components/ui/organisms/ExperienciaSection'
import { EducacaoSection } from '@/components/ui/organisms/EducacaoSection'
import { GitHubPortfolioSection } from '@/components/ui/organisms/PortfolioSection'
import { CertificationsSection } from '@/components/ui/organisms/CertificationsSection'
import { SkillsSection } from '@/components/ui/molecules/SkillsSection'
import { ContactSection } from '@/components/ui/organisms/ContactSection'

import { IGithubRepo } from '@/app/api/github/route'

// Componente de Tag Robusta
const TechCard = ({ icon: Icon, children, color }: { icon: any, children: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="flex items-center gap-2.5 px-4 py-2 bg-[#0f172a] border border-slate-800 rounded-xl shadow-lg hover:border-indigo-500/50 transition-all group"
  >
    <Icon size={18} className={`${color} group-hover:scale-110 transition-transform`} />
    <span className="text-sm font-semibold text-slate-300 whitespace-nowrap">{children}</span>
  </motion.div>
)

export default function Portfolio() {
  const { experiencias, loading: experienciasLoading } = useExperiencias()
  const { educacao, loading: educacaoLoading } = useEducacao()
  const { repos, loading: reposLoading } = useGithubRepos()
  const { certifications, loading: certificationsLoading } = useCertifications()
  
  const [pinnedRepos, setPinnedRepos] = useState<IGithubRepo[]>([])
  const [isPinnedLoading, setIsPinnedLoading] = useState(true)

useEffect(() => {
  fetch('/api/github/pinned')
    .then(res => res.json())
    .then(data => {
      // Garantimos que pegamos apenas o array vindo da API
      if (Array.isArray(data)) {
        setPinnedRepos(data)
      }
      setIsPinnedLoading(false)
    })
    .catch(err => {
      console.error("Erro ao carregar pinned repos", err)
      setIsPinnedLoading(false)
    })
}, [])

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 transition-colors duration-500">
      <Navbar />
      
      <Hero />

      {/* RESUMO ESTRATÉGICO */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl relative"
          >
            <Quote className="absolute top-8 left-8 text-indigo-500/10 w-16 h-16" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-center">
                Engenharia de Software <span className="text-indigo-500 italic font-medium">Full Cycle</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed text-center font-light italic">
                "Transformo ideias em soluções digitais robustas, especializado em arquiteturas escaláveis, 
                otimização de sistemas e IA."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ÁREAS DE EXPERTISE */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:border-indigo-500/30 transition-all">
            <Server className="text-indigo-500 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-3">Backend & Infra</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Arquiteturas robustas com NestJS, Redis e pipelines AWS para processamento distribuído.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/30 transition-all">
            <Globe className="text-blue-500 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-3">Frontend & UX</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Interfaces modernas com Next.js 14, focadas em performance, core web vitals e experiência fluida.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:border-emerald-500/30 transition-all">
            <Zap className="text-emerald-500 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-3">IA & Automação</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Agentes de IA conversacionais e automações n8n que otimizam o ciclo de vida do produto.</p>
          </motion.div>
        </div>
      </section>

      {/* CONTEÚDO DINÂMICO */}
      <div className="space-y-0 relative">
        <ExperienciaSection experiencias={experiencias} experienciasLoading={experienciasLoading} />
        
        {/* GitHub Portfolio */}
        <GitHubPortfolioSection 
          repos={pinnedRepos} 
          loading={isPinnedLoading} 
        />

        
        <EducacaoSection educacao={educacao} educacaoLoading={educacaoLoading} />

        <CertificationsSection certifications={certifications} loading={certificationsLoading} />

        <SkillsSection />
        <ContactSection />
      </div>

      <footer className="bg-[#010409] border-t border-slate-800/50 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="text-3xl font-black tracking-tighter text-white uppercase">JOÃO <span className="text-indigo-500">ITO</span></span>
            <p className="text-sm text-slate-500 mt-2 font-mono tracking-widest">FULLSTACK DEVELOPER • 2024</p>
          </div>
          
          <div className="flex gap-5">
            <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/JoaoIto" target="_blank" className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 text-slate-400 hover:text-white transition-all"><Github size={24}/></motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="https://linkedin.com" target="_blank" className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 text-slate-400 hover:text-white transition-all"><Linkedin size={24}/></motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="mailto:joaovictorpfr@gmail.com" className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 text-slate-400 hover:text-white transition-all"><Mail size={24}/></motion.a>
          </div>
        </div>
      </footer>
    </div>
  )
}