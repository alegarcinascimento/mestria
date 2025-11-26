
import React from 'react';
import { LayoutGrid, Atom, Feather, Share2, MessageCircle, Zap, DollarSign, ChevronDown, Infinity, X } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, category?: Category) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose }) => {
  
  const getButtonClass = (viewName: string) => {
    const isActive = currentView === viewName;
    return `w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all mt-1 ${
      isActive 
        ? 'text-white bg-white/10 border border-white/5 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;
  };

  const handleNavClick = (view: string, category?: Category) => {
    onNavigate(view, category);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        w-72 h-screen glass border-r border-white/10 flex flex-col fixed left-0 top-0 z-40 backdrop-blur-xl bg-black/95 md:bg-black/40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        {/* Logo Area */}
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <div className="text-center flex-1 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
              <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase flex items-center justify-center gap-2">
                <Infinity className="text-amber-400" size={24} /> DNA
              </h1>
              <p className="text-xs text-amber-500 font-medium tracking-[0.3em] uppercase mt-1">Digital</p>
          </div>
          {/* Mobile Close Button */}
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white p-1">
            <X size={24} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="pb-4">
              <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-widest">Painel Quântico</p>
            
            <button 
              onClick={() => handleNavClick('dashboard')}
              className={getButtonClass('dashboard')}
            >
              <LayoutGrid size={18} className={currentView === 'dashboard' ? "text-purple-400" : ""} />
              Central de Agentes
            </button>
            
            <button 
              onClick={() => handleNavClick('frequency')}
              className={getButtonClass('frequency')}
            >
              <Atom size={18} className={currentView === 'frequency' ? "text-amber-400" : ""} />
              Frequência
            </button>
            
            <button 
               onClick={() => handleNavClick('akashico')}
               className={getButtonClass('akashico')}
            >
              <Feather size={18} className={currentView === 'akashico' ? "text-cyan-400" : ""} />
              Akashico
            </button>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Ferramentas
            </h3>
            <div className="space-y-1">
               <button 
                  onClick={() => handleNavClick('dashboard', Category.QUANTUM_SOCIAL)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-amber-400 transition-colors hover:bg-white/5 rounded-lg"
               >
                  <Share2 size={16} /> Redes
               </button>
               <button 
                  onClick={() => handleNavClick('dashboard', Category.COPY_ALCHEMIST)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-amber-400 transition-colors hover:bg-white/5 rounded-lg"
               >
                  <MessageCircle size={16} /> Scripts
               </button>
               <button 
                  onClick={() => handleNavClick('dashboard', Category.VIBRATIONAL_TRAFFIC)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-amber-400 transition-colors hover:bg-white/5 rounded-lg"
               >
                  <Zap size={16} /> Tráfego
               </button>
               <button 
                  onClick={() => handleNavClick('dashboard', Category.HIGH_TICKET)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-amber-400 transition-colors hover:bg-white/5 rounded-lg"
               >
                  <DollarSign size={16} /> Vendas
               </button>
            </div>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                  AN
              </div>
              <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate font-display">Alessandra N.</p>
                  <p className="text-xs text-gray-400 truncate">Cocriadora</p>
              </div>
              <ChevronDown size={14} className="text-gray-500 group-hover:text-amber-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
