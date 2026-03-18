"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { IExperience } from '@/app/interfaces/IExperiences'

interface ExperienciaProps {
  experiencias: IExperience[]
  experienciasLoading: boolean
}

export const ExperienciaSection: React.FC<ExperienciaProps> = ({ experiencias, experienciasLoading }) => (
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
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800 hidden sm:block" />

          <div className="space-y-8">
            {experiencias.map((exp, index) => (
              <motion.div
                key={exp._id.toString()}
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 hidden sm:flex">
                  <Briefcase size={20} className="text-white" />
                </div>

                {/* Card */}
                <div className="flex-1 bg-[#0f172a] border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{exp.cargo}</h3>
                      <p className="text-indigo-400 font-medium text-sm">{exp.empresa}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full whitespace-nowrap">
                      {exp.periodo}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed font-light">{exp.descricao}</p>
                  {exp.tecnologias && exp.tecnologias.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tecnologias.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-semibold tracking-wide px-3 py-1.5 bg-slate-900/80 text-slate-300 border border-slate-800 rounded-xl group-hover:border-indigo-500/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
)
