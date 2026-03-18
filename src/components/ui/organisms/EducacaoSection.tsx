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
  <section id="education" className="py-20 bg-white dark:bg-slate-950">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-2">Formação</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Educação</h2>
      </motion.div>

      {educacaoLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : educacao.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma formação cadastrada.</p>
      ) : (
        <div className="space-y-4">
          {educacao.map((edu, index) => (
            <motion.div
              key={edu._id.toString()}
              className="flex gap-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center">
                <GraduationCap size={22} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{edu.curso}</h3>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    {edu.periodo}
                  </span>
                </div>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">{edu.instituicao}</p>
                {edu.descricao && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{edu.descricao}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </section>
)
