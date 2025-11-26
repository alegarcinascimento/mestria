import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onClick: (agent: Agent) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  return (
    <div 
      onClick={() => onClick(agent)}
      className="group relative h-full bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
            <div className="relative p-0.5 rounded-2xl bg-gradient-to-br from-amber-300 to-purple-600 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={agent.imageUrl} 
                  alt={agent.name} 
                  className="w-16 h-16 rounded-[14px] object-cover bg-black"
                />
            </div>
            <div className="p-2 rounded-full bg-white/5 text-gray-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors">
                <Sparkles size={16} />
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {agent.categories.slice(0, 1).map((cat) => (
            <span key={cat} className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-900/20 border border-amber-500/20 rounded">
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-2 leading-tight group-hover:text-amber-200 transition-colors">
          {agent.name}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-3 mb-6 font-light">
          {agent.description}
        </p>

        <div className="mt-auto flex items-center text-sm font-medium text-purple-300 group-hover:text-white transition-colors gap-2">
            Iniciar Cocriação <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default AgentCard;