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
      className={`group flex flex-col bg-white dark:bg-slate-800 border ${
        repo.featured 
          ? 'border-indigo-500 ring-1 ring-indigo-500/20 shadow-indigo-500/10' 
          : 'border-slate-200 dark:border-slate-700'
      } rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      {repo.featured && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl shadow-lg ring-1 ring-white/20">
          Destaque
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Code2 size={18} className={repo.featured ? "animate-pulse" : ""} />
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-base truncate max-w-[200px]"
          >
            {repo.name}
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-grow leading-relaxed">
        {repo.description ?? 'Desenvolvimento de solução técnica robusta.'}
      </p>

      {/* Topics */}
      {repo.topics && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {(repo.featured ? repo.topics.slice(0, 5) : repo.topics.slice(0, 3)).map((topic) => (
            <span
              key={topic}
              className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-colors"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-5">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors"
        >
          <Github size={14} />
          Repo
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <Globe size={14} />
            Demo
          </a>
        )}
      </div>

      {/* Footer Stats */}
      <div className="flex items-center gap-4 text-[10px] font-medium text-slate-400 mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/50">
        {repo.language && (
          <span className="flex items-center gap-1.5 mr-auto">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 group-hover:text-amber-500 transition-colors">
          <Star size={12} fill="currentColor" className="opacity-70" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 group-hover:text-indigo-400 transition-colors">
          <GitFork size={12} />
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
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Projetos em Foco
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Uma seleção dos meus melhores trabalhos, sincronizados diretamente do GitHub e destacados conforme relevância.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 animate-pulse shadow-sm" />
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
            className="inline-flex items-center gap-2 font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase text-xs tracking-widest"
          >
            <Github size={20} />
            Explorar todo o ecossistema no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

