"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { IEducation } from '@/app/interfaces/IEducation'

interface EducacaoProps {
  educacao: IEducation[]
  educacaoLoading: boolean
}

export const EducacaoSection: React.FC<EducacaoProps> = ({ educacao, educacaoLoading }) => (
  <section id="education" className="py-20 bg-[#020617] border-t border-slate-800/50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-indigo-500 font-semibold text-sm uppercase tracking-wider mb-2">Formação</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Educação</h2>
      </motion.div>

      {educacaoLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-28 rounded-3xl bg-[#0f172a] border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : educacao.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma formação cadastrada.</p>
      ) : (
        <div className="space-y-4">
          {educacao.map((edu, index) => (
            <motion.div
              key={edu._id.toString()}
              className="flex gap-6 bg-[#0f172a] border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-indigo-500/10 transition-colors">
                <GraduationCap size={24} className="text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{edu.curso}</h3>
                  <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full whitespace-nowrap">
                    {edu.periodo}
                  </span>
                </div>
                <p className="text-sm text-indigo-400 font-medium mb-3">{edu.instituicao}</p>
                {edu.descricao && (
                  <p className="text-sm text-slate-400 leading-relaxed font-light">{edu.descricao}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </section>
)
