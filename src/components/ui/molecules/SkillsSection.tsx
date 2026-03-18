"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Layout, Server, Database, Cloud, 
  Cpu, MessageSquare, Terminal, BarChart3, 
  Flame, ShieldCheck, Globe2
} from 'lucide-react'

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Layout className="text-indigo-500" size={24} />,
    skills: ["React.js", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "Figma"]
  },
  {
    title: "Backend & Systems",
    icon: <Server className="text-emerald-500" size={24} />,
    skills: ["Node.js", "Nest.js", "Express", "Java (SpringBoot)", "Python", "C# / .NET"]
  },
  {
    title: "Data & AI Intelligence",
    icon: <Cpu className="text-purple-500" size={24} />,
    skills: ["AI Agents", "LLMs (Gemini/OpenAI)", "Business Intelligence (BI)", "Data Science", "Whisper AI"]
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="text-sky-500" size={24} />,
    skills: ["AWS (Lambda, S3, EC2)", "Docker", "Vercel", "CI/CD Pipelines", "Nginx", "Serverless"]
  },
  {
    title: "Infrastructure & Tools",
    icon: <Terminal className="text-amber-500" size={24} />,
    skills: ["MongoDB", "PostgreSQL", "Redis", "RabbitMQ", "Git/GitHub", "Linux"]
  },
  {
    title: "Business & Soft Skills",
    icon: <BarChart3 className="text-rose-500" size={24} />,
    skills: ["Product Management", "SaaS Strategy", "English (C1 Advanced)", "Agile / Scrum"]
  }
]

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-[#020617] border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-3">Expertise</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Habilidades Técnicas
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Um ecossistema de tecnologias que utilizo para criar produtos digitais escaláveis e inteligentes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-5">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-slate-900/80 text-slate-300 rounded-xl text-[11px] font-semibold tracking-wide border border-slate-800 group-hover:border-indigo-500/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
