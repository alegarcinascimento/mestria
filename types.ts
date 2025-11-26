export enum Category {
  ALL = 'Frequência Mestra',
  MATRIX = 'Matrix da Oferta',
  COPY_ALCHEMIST = 'Alquimia de Textos',
  QUANTUM_SOCIAL = 'Redes Holográficas',
  MAGNETIC_PAGES = 'Páginas Magnéticas',
  CONNECTION = 'Conexão Hertz',
  VIBRATIONAL_TRAFFIC = 'Tráfego Vibracional',
  HIGH_TICKET = 'Vendas High Ticket'
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  categories: Category[];
  systemInstruction: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  agentId: string;
  messages: Message[];
}