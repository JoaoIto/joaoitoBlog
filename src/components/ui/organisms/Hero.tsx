'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ReactTyped } from 'react-typed'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
// Ícones específicos e coloridos
import { IoLogoJavascript } from 'react-icons/io5'
import { SiMongodb, SiTypescript, SiNestjs, SiRedis, SiPostgresql, SiMysql, SiDocker } from 'react-icons/si'
import { FaJava, FaReact, FaAws } from 'react-icons/fa'
import { RiNextjsFill } from 'react-icons/ri'
import { DiNodejs } from 'react-icons/di'

const stackIcons = [
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'React', icon: FaReact, color: 'text-cyan-400' },
  { name: 'Next.js', icon: RiNextjsFill, color: 'text-white' },
  { name: 'Node.js', icon: DiNodejs, color: 'text-green-500' },
  { name: 'NestJS', icon: SiNestjs, color: 'text-red-600' },
  { name: 'Java', icon: FaJava, color: 'text-orange-500' },
  { name: 'AWS', icon: FaAws, color: 'text-yellow-500' },
  { name: 'Redis', icon: SiRedis, color: 'text-red-500' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-400' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
  { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
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
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-[#020617]"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Disponível para novos projetos
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          João Ito
        </motion.h1>

        {/* Typed role */}
        <motion.div
          className="text-2xl md:text-3xl text-indigo-400 font-bold mb-8 h-10"
        >
          <ReactTyped
            strings={[
              'Desenvolvedor Full Stack',
              'Especialista em IA Conversacional',
              'Cloud & Platform Engineer',
              'Expert em Node.js & NestJS',
            ]}
            typeSpeed={60}
            backSpeed={40}
            loop
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Transformo ideias em soluções robustas. Do planejamento ao deploy, com foco em 
          <span className="text-white font-medium"> escalabilidade</span>, 
          <span className="text-white font-medium"> IA </span> e 
          <span className="text-white font-medium"> alta performance</span>.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1">
            Contrate-me
          </button>
          <button className="w-full sm:w-auto px-10 py-4 border border-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-800 transition-all hover:-translate-y-1">
            Ver projetos
          </button>
        </div>

        {/* TECH STACK ROBUSTA (Igual à imagem) */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {stackIcons.map((item, i) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -4, backgroundColor: '#1e293b' }}
              className="flex items-center gap-3 px-4 py-2.5 bg-[#111827] border border-[#1f2937] rounded-xl shadow-2xl transition-all cursor-default group"
            >
              <item.icon size={22} className={`${item.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-bold text-slate-200">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="mt-20 text-slate-600 hover:text-indigo-400 transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  )
}