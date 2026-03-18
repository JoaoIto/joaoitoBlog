'use client'

import React from 'react'
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
import { Github, Linkedin, Mail, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Portfolio() {
  const { experiencias, loading: experienciasLoading } = useExperiencias()
  const { educacao, loading: educacaoLoading } = useEducacao()
  const { repos, loading: reposLoading } = useGithubRepos()
  const { certifications, loading: certificationsLoading } = useCertifications()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/40 selection:text-indigo-900 dark:selection:text-indigo-100">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Professional Summary */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative p-8 md:p-12 rounded-[2rem] bg-indigo-50/50 dark:bg-slate-900/50 border border-indigo-100/50 dark:border-indigo-900/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="absolute top-8 left-8 text-indigo-200 dark:text-indigo-900/50 w-12 h-12 -z-10" />
            <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "Desenvolvedor Full Stack e Fundador da <span className="text-indigo-600 dark:text-indigo-400 font-bold">DevWorks</span>, focado em sistemas escaláveis, Agentes de IA e LLMs. Especialista em entrega ponta a ponta, arquitetura de microsserviços e alta performance."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience - Timeline */}
      <ExperienciaSection experiencias={experiencias} experienciasLoading={experienciasLoading} />

      {/* GitHub Projects Grid */}
      <GitHubPortfolioSection repos={repos} loading={reposLoading} />

      {/* Education */}
      <EducacaoSection educacao={educacao} educacaoLoading={educacaoLoading} />

      {/* Certifications */}
      <CertificationsSection certifications={certifications} loading={certificationsLoading} />

      {/* Skills */}
      <SkillsSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} João Ito. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/JoaoIto" target="_blank" rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-p%C3%B3voa-fran%C3%A7a-97502420b/" target="_blank" rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:joaovictorpfr@gmail.com"
              className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}