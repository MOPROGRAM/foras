
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../i18n';
import { Language, Opportunity, OpportunityType, Message } from '../types';
import { opportunityService, messageService } from '../services/supabaseService';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations['ar']) => string;
  getTypeLabel: (type: OpportunityType) => string;
  opportunities: Opportunity[];
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'postedAt'>) => Promise<{ error: any }>;
  messages: Message[];
  sendMessage: (msg: { opportunityId: string; senderName: string; senderEmail: string; content: string }) => Promise<{ error: any }>;
  replyToMessage: (id: string, content: string) => Promise<{ error: any }>;
  refreshData: () => Promise<void>;
  dir: 'rtl' | 'ltr';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const refreshData = async () => {
    const opps = await opportunityService.getAll();
    setOpportunities(opps);

    const msgs = await messageService.getMessagesForUser();
    setMessages(msgs);
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

  const addOpportunity = async (opp: Omit<Opportunity, 'id' | 'postedAt'>) => {
    const { error } = await opportunityService.create(opp);
    if (!error) {
      await refreshData();
    }
    return { error };
  };

  const sendMessage = async (msg: { opportunityId: string; senderName: string; senderEmail: string; content: string }) => {
    const { error } = await messageService.sendMessage(msg);
    return { error };
  };

  const replyToMessage = async (id: string, content: string) => {
    const { error } = await messageService.replyToMessage(id, content);
    if (!error) {
      await refreshData();
    }
    return { error };
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
