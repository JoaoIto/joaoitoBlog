import { Cpu, Database, MessageSquare, Zap, Award, Globe } from "lucide-react";

export const ExperienceBento = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
      {/* DESTAQUE IA & MENSAGERIA */}
      <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 rounded-3xl p-8 flex flex-col justify-between group hover:border-purple-500 transition-all">
        <div className="flex justify-between items-start">
          <MessageSquare className="text-purple-400 w-10 h-10" />
          <span className="text-xs font-mono text-purple-300 border border-purple-300/30 px-2 py-1 rounded">IA Conversacional</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">IA & Automação</h3>
          <p className="text-gray-400 text-sm">Integração de fluxos complexos com n8n, OpenAI e ZaiaAI para SaaS e WhatsApp.</p>
        </div>
      </div>

      {/* DESTAQUE AWS & INFRA (Chat-Loader) */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-zinc-800 transition-all">
        <Zap className="text-yellow-400" />
        <div>
          <h4 className="font-bold">Chat-Loader</h4>
          <p className="text-xs text-gray-500">AWS Lambda: Performance de 2min para ms.</p>
        </div>
      </div>

      {/* BI PROFESSIONAL */}
      <div className="bg-blue-900/20 border border-blue-500/20 rounded-3xl p-6 flex flex-col justify-between">
        <Database className="text-blue-400" />
        <div>
          <h4 className="font-bold uppercase text-xs tracking-widest text-blue-400">Google Certified</h4>
          <p className="text-lg font-semibold text-white">Business Intelligence</p>
        </div>
      </div>

      {/* PROPRIEDADE INTELECTUAL / SOFTWAREHUB */}
      <div className="md:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex items-center gap-6">
        <Award className="text-amber-400 w-12 h-12" />
        <div>
          <h4 className="font-bold">SoftwareHUB & UNITINS</h4>
          <p className="text-sm text-gray-400">Vencedor de Melhor Projeto Científico do Tocantins (2024).</p>
        </div>
      </div>

      {/* TECH STACK MARQUEE (Apenas ícones flutuantes) */}
      <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden">
         <p className="text-xs text-gray-500 mb-4 font-mono">Core Stack</p>
         <div className="flex gap-4 flex-wrap">
            {['TypeScript', 'Next.js', 'NestJS', 'Docker', 'MongoDB', 'Python', 'Java'].map(tech => (
              <span key={tech} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium">{tech}</span>
            ))}
         </div>
      </div>
    </div>
  );
};