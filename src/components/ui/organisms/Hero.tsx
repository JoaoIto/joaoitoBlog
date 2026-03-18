'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ReactTyped } from 'react-typed'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { IoLogoJavascript } from 'react-icons/io5'
import { SiMongodb, SiTypescript } from 'react-icons/si'
import { FaJava, FaReact } from 'react-icons/fa'
import { RiNextjsFill } from 'react-icons/ri'
import { DiNodejs } from 'react-icons/di'

const stackIcons = [
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'React', icon: FaReact, color: 'text-cyan-400' },
  { name: 'Next.js', icon: RiNextjsFill, color: 'text-slate-700 dark:text-white' },
  { name: 'Node.js', icon: DiNodejs, color: 'text-green-500' },
  { name: 'Java', icon: FaJava, color: 'text-orange-500' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
  { name: 'JavaScript', icon: IoLogoJavascript, color: 'text-yellow-400' },
]

export const Hero: React.FC = () => {
  const scrollToNext = () => {
    const el = document.getElementById('experience')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Disponível para projetos
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          João Ito
        </motion.h1>

        {/* Typed role */}
        <motion.div
          className="text-xl md:text-2xl text-indigo-600 dark:text-indigo-400 font-semibold mb-5 h-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ReactTyped
            strings={[
              'Desenvolvedor Full Stack',
              'Engenheiro de Software',
              'Especialista em React & Node.js',
              'Desenvolvedor Java & Quarkus',
            ]}
            typeSpeed={50}
            backSpeed={35}
            loop
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Transformo ideias em soluções digitais robustas. Especializado em desenvolvimento web moderno, APIs escaláveis e experiências de usuário que encantam.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Contrate-me
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('projects')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5"
          >
            Ver projetos
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center gap-5 mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            { href: 'https://github.com/JoaoIto', icon: Github, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-p%C3%B3voa-fran%C3%A7a-97502420b/', icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:joaovictorpfr@gmail.com', icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {stackIcons.map((item, i) => (
            <motion.div
              key={item.name}
              title={item.name}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.07 }}
            >
              <item.icon size={20} className={item.color} />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 hover:text-indigo-500 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        aria-label="Scroll para baixo"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}
