
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Infinity, Sparkles, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay for "Quantum Connection"
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050505] selection:bg-amber-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-30"></div>
      </div>

      <div className="w-full max-w-md p-4 relative z-10 animate-fadeIn">
        
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <Infinity className="text-amber-400 w-8 h-8" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-amber-500">
            Mestr.IA
          </h1>
          <p className="text-gray-400 text-sm tracking-[0.2em] uppercase">DNA Digital</p>
        </div>

        {/* Auth Card */}
        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top Light Glint */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Toggle Tabs */}
          <div className="flex p-1 bg-black/40 rounded-xl mb-8 border border-white/5">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                isLogin 
                ? 'bg-white/10 text-white shadow-lg border border-white/5' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Acessar Portal
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                !isLogin 
                ? 'bg-white/10 text-white shadow-lg border border-white/5' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Criar Frequência
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
               <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Sparkles className="h-5 w-5 text-gray-500 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nome Cósmico"
                  className="block w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-black/40 transition-all text-sm"
                />
              </div>
            )}

            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-amber-400 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="E-mail"
                className="block w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-black/40 transition-all text-sm"
              />
            </div>

            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-amber-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Senha"
                className="block w-full pl-11 pr-12 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-black/40 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-gray-400 hover:text-amber-400 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-xl p-[1px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-purple-600 rounded-xl group-hover:opacity-100 opacity-80 transition-opacity duration-300"></div>
              <div className="relative bg-black/50 hover:bg-transparent rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 transition-all duration-300">
                {isLoading ? (
                  <Sparkles className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <>
                    <span className="font-semibold text-white tracking-wide">
                      {isLogin ? 'Iniciar Sessão' : 'Ativar Cadastro'}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f0a14] px-4 text-gray-500 tracking-wider">Ou acesse via</span>
            </div>
          </div>

          <button 
             onClick={onLoginSuccess}
             className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
             <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
             </svg>
             Continuar com Google
          </button>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-500">
          Ao entrar, você concorda com os <a href="#" className="text-gray-400 hover:text-amber-400 underline">Termos Quânticos</a> e <a href="#" className="text-gray-400 hover:text-amber-400 underline">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
