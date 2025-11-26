
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, MoreVertical, Paperclip, Infinity } from 'lucide-react';
import { Agent, Message } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Chat } from '@google/genai';

interface ChatWindowProps {
  agent: Agent;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ agent, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat
  useEffect(() => {
    const session = createChatSession(agent.systemInstruction);
    setChatSession(session);
    
    // Initial greeting
    setMessages([
      {
        id: 'init',
        role: 'model',
        text: `Saudações de Luz. Eu sou ${agent.name}. \n\n${agent.description} \n\nO que vamos cocriar hoje para expandir sua realidade?`,
        timestamp: Date.now()
      }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.id]);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatSession || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    let fullResponse = '';

    // Add placeholder for streaming
    setMessages(prev => [
      ...prev,
      {
        id: modelMsgId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      }
    ]);

    try {
      await sendMessageStream(chatSession, userMsg.text, (chunk) => {
        fullResponse += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg
          )
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505]">
        {/* Background Ambient Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-900 rounded-full blur-[120px]"></div>
      </div>

      {/* Chat Header */}
      <header className="relative flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-white/10 bg-black/40 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative p-0.5 rounded-full bg-gradient-to-br from-amber-400 to-purple-600">
                <img src={agent.imageUrl} alt={agent.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-black" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-display font-bold text-white text-base md:text-lg leading-tight">{agent.name}</h2>
              <div className="flex items-center gap-1.5 hidden md:flex">
                <Infinity size={12} className="text-amber-400" />
                <p className="text-xs text-amber-400/80 font-medium uppercase tracking-wide">{agent.role}</p>
              </div>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MoreVertical size={20} />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 relative z-10 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 md:px-6 md:py-4 shadow-lg leading-relaxed whitespace-pre-wrap text-sm md:text-base ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-br-none border border-purple-500/30' 
                  : 'glass text-gray-100 rounded-bl-none border-white/5'
              }`}
            >
              {msg.text}
              {msg.text === '' && isLoading && (
                 <span className="flex gap-1.5 items-center h-6">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-150"></span>
                 </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl z-20">
        <div className="max-w-4xl mx-auto flex items-end gap-2 md:gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-amber-500/50 focus-within:bg-black/60 focus-within:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-300">
          <button className="p-2 md:p-3 text-gray-500 hover:text-amber-400 transition-colors hidden md:block">
            <Paperclip size={20} />
          </button>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Digite sua intenção...`}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 py-3 text-white placeholder-gray-600 scrollbar-hide text-sm md:text-base"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 md:p-3 rounded-xl transition-all duration-300 ${
              inputText.trim() && !isLoading
                ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-lg hover:shadow-amber-500/20 transform hover:-translate-y-0.5' 
                : 'bg-white/5 text-gray-600 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Sparkles size={20} className="animate-spin text-amber-200" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
