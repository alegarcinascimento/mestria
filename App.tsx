
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';
import ChatWindow from './components/ChatWindow';
import FrequencyView from './components/FrequencyView';
import AkashicView from './components/AkashicView';
import LoginScreen from './components/LoginScreen';
import { Agent, Category } from './types';
import { AGENTS, CATEGORIES_LIST } from './constants';
import { Search, Bell, Sparkles, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredAgents = AGENTS.filter(agent => {
    const matchesCategory = selectedCategory === Category.ALL || agent.categories.includes(selectedCategory);
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleBackToDashboard = () => {
    setSelectedAgent(null);
  };

  const handleNavigate = (view: string, category?: Category) => {
    setCurrentView(view);
    setSelectedAgent(null);
    setIsSidebarOpen(false); // Close mobile menu on navigate
    if (category) {
        setSelectedCategory(category);
    } else if (view === 'dashboard') {
        if (selectedCategory !== Category.ALL && !category) {
           setSelectedCategory(Category.ALL);
        }
    }
  };

  // -------------------------------------------------------------------------
  // AUTHENTICATION CHECK
  // -------------------------------------------------------------------------
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // If an agent is selected, show the chat window (full screen over dashboard)
  if (selectedAgent) {
    return <ChatWindow agent={selectedAgent} onBack={handleBackToDashboard} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-4 md:p-10 relative overflow-x-hidden w-full transition-all duration-300">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-900/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center mb-8 md:mb-12 relative z-10">
          <div className="flex items-center justify-between md:w-auto w-full gap-4">
             {/* Mobile Menu Button */}
             <button 
                className="md:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/5"
                onClick={() => setIsSidebarOpen(true)}
             >
                <Menu size={20} />
             </button>

             <div className="relative flex-1 md:w-96 group">
                {currentView === 'dashboard' && (
                  <>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-500 group-focus-within:text-amber-400 transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Pesquisar..." 
                      className="block w-full pl-11 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-black/50 transition-all shadow-inner text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </>
                )}
             </div>

             {/* Mobile Notification Bell (Shortcut) */}
             <button className="md:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
             </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <div className="h-9 px-4 rounded-full glass flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                <Sparkles size={14} /> Membro Diamond
             </div>
             <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
             </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        {currentView === 'frequency' && <FrequencyView />}
        
        {currentView === 'akashico' && <AkashicView />}

        {currentView === 'dashboard' && (
          <>
            {/* Hero / Title Section */}
            <section className="mb-8 md:mb-10 relative z-10">
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-amber-500">
                    Mestr.IA
                </h1>
                <p className="text-gray-400 text-base md:text-lg">Selecione uma consciência para iniciar sua cocriação.</p>
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {CATEGORIES_LIST.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-white border-purple-500/50 shadow-[0_0_15px_rgba(147,51,234,0.3)] transform scale-105'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* Grid of Agents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 relative z-10 pb-10">
              {filteredAgents.map((agent) => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  onClick={handleAgentClick} 
                />
              ))}
              {filteredAgents.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Nenhuma frequência encontrada nesta dimensão.</p>
                    <button 
                      onClick={() => {setSelectedCategory(Category.ALL); setSearchQuery('')}}
                      className="mt-4 text-amber-400 hover:text-amber-300 underline underline-offset-4"
                    >
                      Realinhar busca
                    </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
