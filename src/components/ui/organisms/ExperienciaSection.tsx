"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Building2, Calendar, ChevronRight } from 'lucide-react'
import { IExperience } from '@/app/interfaces/IExperiences'

interface ExperienciaProps {
  experiencias: IExperience[]
  experienciasLoading: boolean
}

export const ExperienciaSection: React.FC<ExperienciaProps> = ({ experiencias, experienciasLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="experience" className="py-20 bg-[#020617] border-t border-slate-800/50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-indigo-500 font-semibold text-sm uppercase tracking-wider mb-2">Trajetória</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Experiência Profissional
        </h2>
      </motion.div>

      {/* Timeline */}
      {experienciasLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-3xl bg-[#0f172a] animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : experiencias.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma experiência cadastrada.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Tabs Menu */}
          <div className="w-full md:w-1/3 flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 scrollbar-hide">
            {Array.isArray(experiencias) && experiencias.map((exp, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={exp._id.toString()}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex items-center p-4 text-left rounded-2xl transition-all whitespace-nowrap md:whitespace-normal flex-shrink-0 md:flex-shrink border ${
                    isActive
                      ? 'bg-indigo-600/10 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Building2 size={18} className={isActive ? "text-indigo-400" : "opacity-50"} />
                    <span className="font-medium">{exp.empresa}</span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-x-0 bottom-0 md:bottom-auto md:inset-y-0 md:left-0 h-1 md:h-full md:w-1 bg-indigo-500 rounded-b-2xl md:rounded-r-none md:rounded-l-2xl z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="w-full md:w-2/3 max-w-2xl relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 absolute inset-0"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      {experiencias[activeIndex].cargo}
                    </h3>
                    <p className="text-indigo-400 font-medium text-lg flex items-center gap-2">
                      <Building2 size={16} />
                      {experiencias[activeIndex].empresa}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 whitespace-nowrap">
                    <Calendar size={14} className="text-indigo-400" />
                    {experiencias[activeIndex].periodo}
                  </div>
                </div>

                <div className="space-y-4 text-slate-400 leading-relaxed font-light mb-8">
                  {/* Se a descrição vier com quebras de linha, dividiremos em parágrafos */}
                  {experiencias[activeIndex].descricao.split('\n').filter(Boolean).map((paragraph, i) => (
                    <p key={i} className="flex gap-3">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{paragraph}</span>
                    </p>
                  ))}
                </div>

                {experiencias[activeIndex].tecnologias && experiencias[activeIndex].tecnologias.length > 0 && (
                  <div className="pt-6 border-t border-slate-800/50">
                    <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">Tecnologias Utilizadas</p>
                    <div className="flex flex-wrap gap-2">
                      {experiencias[activeIndex].tecnologias.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-slate-900 text-indigo-300 border border-indigo-500/20 rounded-xl text-xs font-medium tracking-wide shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  </section>
  )
}
