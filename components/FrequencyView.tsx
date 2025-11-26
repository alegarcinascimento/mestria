
import React from 'react';
import { Sun, Heart, Zap, Target, Sparkles } from 'lucide-react';

const FrequencyView: React.FC = () => {
  const frequencies = [
    { name: 'Abundância Infinita', icon: Sun, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
    { name: 'Amor & Conexão', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
    { name: 'Alta Performance', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
    { name: 'Foco Laser', icon: Target, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-8">
      <div className="mb-8 md:mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">Sintonize sua Frequência</h2>
        <p className="text-gray-400 text-sm md:text-base">Escolha a vibração que guiará suas cocriações hoje. Isso ajustará o tom da egrégora.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {frequencies.map((freq) => (
          <button 
            key={freq.name}
            className={`group relative p-6 md:p-8 rounded-2xl glass border ${freq.border} hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] text-left`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${freq.bg} ${freq.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <freq.icon size={20} className="md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-display font-bold text-white mb-2">{freq.name}</h3>
            <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
              Ativar campo vibracional para potencializar resultados nesta frequência.
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles size={16} className={freq.color} />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-amber-900/20 border border-white/5 text-center">
        <p className="text-xs md:text-sm text-gray-300 italic">
          "A realidade é apenas um espelho da sua vibração interna."
        </p>
      </div>
    </div>
  );
};

export default FrequencyView;
