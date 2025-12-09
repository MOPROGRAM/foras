
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../i18n';
import { Language, Opportunity, OpportunityType, Message } from '../types';
import { storageService } from '../services/storage';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations['ar']) => string;
  getTypeLabel: (type: OpportunityType) => string;
  opportunities: Opportunity[];
  addOpportunity: (opp: Opportunity) => Promise<void>;
  messages: Message[];
  sendMessage: (msg: Message) => Promise<void>;
  replyToMessage: (id: string, content: string) => Promise<void>;
  refreshData: () => void;
  dir: 'rtl' | 'ltr';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load initial data
  const refreshData = () => {
    setOpportunities(storageService.getOpportunities());
    setMessages(storageService.getMessages());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: keyof typeof translations['ar']) => {
    return translations[language][key] || key;
  };

  const getTypeLabel = (type: OpportunityType) => {
    return translations[language].types[type];
  };

  const addOpportunity = async (opp: Opportunity) => {
    await storageService.addOpportunity(opp);
    refreshData();
  };

  const sendMessage = async (msg: Message) => {
    await storageService.sendMessage(msg);
    refreshData();
  };

  const replyToMessage = async (id: string, content: string) => {
    await storageService.replyToMessage(id, content);
    refreshData();
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <AppContext.Provider value={{ 
      language, 
      toggleLanguage, 
      t, 
      getTypeLabel, 
      opportunities, 
      addOpportunity, 
      messages,
      sendMessage,
      replyToMessage,
      refreshData,
      dir 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
