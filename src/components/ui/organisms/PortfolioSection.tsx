"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Code2, Globe } from 'lucide-react'
import { IGithubRepo } from '@/app/api/github/route'

const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Java: '#b07219',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  default: '#8b949e',
}

interface GithubCardProps {
  repo: IGithubRepo & { featured?: boolean }
  index: number
}

const GithubCard: React.FC<GithubCardProps> = ({ repo, index }) => {
  const langColor = langColors[repo.language ?? 'default'] ?? langColors.default

  return (
    <motion.div
      className={`group flex flex-col bg-[#0f172a] border ${
        repo.featured 
          ? 'border-indigo-500 ring-1 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
          : 'border-slate-800'
      } rounded-3xl p-6 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      {repo.featured && (
        <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl shadow-lg z-20">
          Destaque
        </div>
      )}

      {repo.imageUrl && (
        <div className="absolute top-0 left-0 w-full h-40 z-0 overflow-hidden">
          <img 
            src={repo.imageUrl} 
            alt={repo.name} 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between mb-4 mt-8">
        <div className="flex items-center gap-3 text-indigo-400">
          <Code2 size={20} className={repo.featured ? "animate-pulse" : ""} />
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white hover:text-indigo-400 transition-colors text-xl truncate max-w-[200px] drop-shadow-md"
          >
            {repo.name}
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="relative z-10 text-sm text-slate-300 mb-5 line-clamp-3 flex-grow leading-relaxed font-light">
        {repo.description ?? 'Desenvolvimento de solução técnica robusta.'}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 mb-6">
          {(repo.featured ? repo.topics.slice(0, 5) : repo.topics.slice(0, 3)).map((topic) => (
            <span
              key={topic}
              className="text-[10px] px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 group-hover:border-indigo-500/50 transition-colors shadow-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="relative z-10 flex items-center gap-3 mb-6">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/5 hover:border-white/10"
        >
          <Github size={14} />
          Repo
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl transition-all shadow-lg"
          >
            <Globe size={14} />
            Live Demo
          </a>
        )}
      </div>

      {/* Footer Stats */}
      <div className="relative z-10 flex items-center gap-4 text-[11px] font-medium text-slate-500 mt-auto pt-4 border-t border-slate-800/50">
        {repo.language && (
          <span className="flex items-center gap-2 mr-auto">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1.5 group-hover:text-amber-500 transition-colors">
          <Star size={14} fill="currentColor" className="opacity-70" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors">
          <GitFork size={14} />
          {repo.forks_count}
        </span>
      </div>
    </motion.div>
  )
}

interface PortfolioProps {
  repos: IGithubRepo[]
  loading: boolean
}

export const GitHubPortfolioSection: React.FC<PortfolioProps> = ({ repos, loading }) => {
  return (
    <section id="projects" className="py-24 bg-[#010409]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Projetos em Foco
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Uma seleção dos meus melhores trabalhos técnicos, sincronizados diretamente do GitHub.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-3xl bg-[#0f172a] border border-slate-800 animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <GithubCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/JoaoIto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-bold text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all uppercase text-xs tracking-widest shadow-lg"
          >
            <Github size={18} />
            Explorar todo o ecossistema no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

