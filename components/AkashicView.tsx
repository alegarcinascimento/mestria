
import React from 'react';
import { Clock, MessageSquare, ArrowRight } from 'lucide-react';

const AkashicView: React.FC = () => {
  const history = [
    { id: 1, agent: 'Hertz', action: 'Estratégia Lançamento Semente', time: '2 horas atrás', type: 'Estratégia' },
    { id: 2, agent: 'Metatron', action: 'Copy para Página de Vendas', time: 'Ontem', type: 'Copywriting' },
    { id: 3, agent: 'Aura', action: 'Calendário Editorial Setembro', time: '3 dias atrás', type: 'Social' },
    { id: 4, agent: 'Gaia', action: 'Script Recuperação de Boleto', time: '5 dias atrás', type: 'Vendas' },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Registros Akáshicos</h2>
        <p className="text-gray-400">Acesse o histórico de todas as suas cocriações passadas.</p>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="group flex items-center justify-between p-5 rounded-xl glass border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-amber-400 transition-colors">
                <MessageSquare size={18} />
              </div>
              <div>
                <h4 className="text-white font-medium group-hover:text-amber-200 transition-colors">{item.action}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span className="text-amber-500/80">{item.agent}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                </div>
              </div>
            </div>
            
            <button className="p-2 text-gray-500 group-hover:text-white transition-colors">
                <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AkashicView;
