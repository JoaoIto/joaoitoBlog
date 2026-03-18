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
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-[#020617] overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob" style={{ animationDelay: '0ms' }} />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob" style={{ animationDelay: '2000ms' }} />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-blob" style={{ animationDelay: '4000ms' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-indigo-300 text-sm font-medium mb-8 shadow-2xl"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Disponível para novos projetos
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          João Ito
        </motion.h1>

        {/* Typed role */}
        <motion.div
          className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold mb-8 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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
          className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Transformo ideias em soluções robustas. Do planejamento ao deploy, com foco em 
          <span className="text-white font-semibold"> escalabilidade</span>, 
          <span className="text-white font-semibold"> IA </span> e 
          <span className="text-white font-semibold"> alta performance</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95">
            Contrate-me
          </button>
          <button className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
            Ver projetos
          </button>
        </motion.div>

        {/* TECH STACK ROBUSTA */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {stackIcons.map((item, i) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all cursor-default group hover:bg-white/10 hover:border-white/20"
            >
              <item.icon size={24} className={`${item.color} group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all`} />
              <span className="text-sm font-bold text-slate-200 tracking-wide">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-10 z-20 text-slate-500 hover:text-indigo-400 transition-colors"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown size={36} />
      </motion.button>
    </section>
  )
}