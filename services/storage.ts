
import { Opportunity, Message, Reply } from '../types';

const KEYS = {
  OPPS: 'foras_opportunities',
  MSGS: 'foras_messages'
};

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const storageService = {
  // Opportunities CRUD
  getOpportunities: (): Opportunity[] => {
    const data = localStorage.getItem(KEYS.OPPS);
    return data ? JSON.parse(data) : [];
  },

  addOpportunity: async (opp: Opportunity): Promise<void> => {
    await delay(300); // Simulate network
    const current = storageService.getOpportunities();
    const updated = [opp, ...current];
    localStorage.setItem(KEYS.OPPS, JSON.stringify(updated));
  },

  getOpportunityById: (id: string): Opportunity | undefined => {
    const opps = storageService.getOpportunities();
    return opps.find(o => o.id === id);
  },

  // Messages System
  getMessages: (): Message[] => {
    const data = localStorage.getItem(KEYS.MSGS);
    return data ? JSON.parse(data) : [];
  },

  sendMessage: async (msg: Message): Promise<void> => {
    await delay(500);
    const current = storageService.getMessages();
    const updated = [msg, ...current];
    localStorage.setItem(KEYS.MSGS, JSON.stringify(updated));
  },

  replyToMessage: async (messageId: string, content: string): Promise<void> => {
    await delay(300);
    const messages = storageService.getMessages();
    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        const newReply: Reply = {
          id: Date.now().toString(),
          content,
          timestamp: new Date().toISOString(),
          isFromOwner: true
        };
        return { ...msg, replies: [...msg.replies, newReply] };
      }
      return msg;
    });
    localStorage.setItem(KEYS.MSGS, JSON.stringify(updatedMessages));
  }
};
