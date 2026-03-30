"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Award, ExternalLink, ShieldCheck, Image as ImageIcon } from 'lucide-react'
import { SiGoogle, SiHuawei } from 'react-icons/si'
import { FaLaptopCode } from 'react-icons/fa'

export interface Certification {
  _id?: string
  nome: string
  emissor: string
  data: string
  horas?: string
  link?: string
  linkFoto?: string
  descricao?: string
  icone?: string
}

interface CertificationsSectionProps {
  certifications: Certification[]
  loading: boolean
}

const getIcon = (iconeName?: string) => {
  switch (iconeName?.toLowerCase()) {
    case 'google':
      return <SiGoogle size={24} className="text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" />
    case 'huawei':
      return <SiHuawei size={24} className="text-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all" />
    case 'alura':
      return <FaLaptopCode size={24} className="text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all" />
    default:
      return <Award size={24} className="text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110 transition-all" />
  }
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, loading }) => {
  return (
    <section id="certifications" className="py-24 bg-[#010409] text-slate-100 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-3">Reconhecimentos</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Certificações e Conquistas
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Validação técnica e reconhecimento por big-techs do mercado de tecnologia.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 rounded-3xl bg-slate-900 border border-slate-800 animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(certifications) && certifications.map((cert, idx) => (
              <motion.div
                key={cert._id || idx}
                className="group relative bg-[#0f172a] p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center shadow-inner group-hover:border-indigo-500/30 transition-colors">
                      {getIcon(cert.icone)}
                    </div>
                    <div className="flex gap-3">
                      {cert.linkFoto && cert.linkFoto !== "#" && (
                        <a 
                          href={cert.linkFoto} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-indigo-400 transition-colors"
                          title="Ver Certificado Original"
                        >
                          <ImageIcon size={20} />
                        </a>
                      )}
                      {cert.link && cert.link !== "#" && (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-indigo-400 transition-colors"
                          title="Ir para o Credencial"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">
                    {cert.nome}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-sm font-semibold text-slate-300">{cert.emissor}</span>
                  </div>

                  {cert.descricao && (
                    <p className="text-sm text-slate-400 font-light mb-4 line-clamp-3">
                      {cert.descricao}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800 font-mono text-xs text-slate-500">
                    <span>{cert.data}</span>
                    {cert.horas && <span className="text-indigo-400/70">{cert.horas}</span>}
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
