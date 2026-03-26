// src/components/ProjectCard.tsx
import { Github, ExternalLink } from "lucide-react";

export const ProjectCard = ({ repo }: { repo: any }) => (
  <div className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
        {repo.name}
      </h3>
      <p className="text-gray-400 text-sm mt-3 line-clamp-3 min-h-[60px]">
        {repo.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {repo.languages.nodes.map((l: any) => (
          <span key={l.name} className="text-[10px] uppercase tracking-tighter px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-300">
            {l.name}
          </span>
        ))}
      </div>

      <div className="flex gap-6 mt-6">
        <a href={repo.url} target="_blank" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <Github size={16} /> REPOSITÓRIO
        </a>
        {repo.homepageUrl && (
          <a href={repo.homepageUrl} target="_blank" className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">
            <ExternalLink size={16} /> LIVE DEMO
          </a>
        )}
      </div>
    </div>
  </div>
);