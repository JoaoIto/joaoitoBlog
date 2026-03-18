"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react'

export interface ICertification {
  _id: string
  nome: string
  emissor: string
  data: string
  link?: string
}

interface CertificationsSectionProps {
  certifications: ICertification[]
  loading: boolean
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, loading }) => {
  return (
    <section id="certifications" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-3">Conquistas</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            Certificações
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert._id}
                className="group flex gap-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Award size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cert.nome}
                    </h3>
                    {cert.link && cert.link !== '#' && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium">
                    <span className="text-slate-500 dark:text-slate-400">{cert.emissor}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Calendar size={12} />
                      {cert.data}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wider">
                    <CheckCircle2 size={12} />
                    Verificado
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
