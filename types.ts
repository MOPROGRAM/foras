
export enum OpportunityType {
  JOB = 'JOB',
  INTERNSHIP = 'INTERNSHIP',
  SCHOLARSHIP = 'SCHOLARSHIP',
  COURSE = 'COURSE',
  VOLUNTEER = 'VOLUNTEER'
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: OpportunityType;
  description: string;
  deadline: string;
  tags: string[];
  salary?: string;
  postedAt: string;
  // New Contact Fields
  contactEmail: string;
  contactPhone: string;
}

export interface Message {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  senderName: string;
  senderEmail: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  timestamp: string;
  isFromOwner: boolean;
}

export interface FilterState {
  search: string;
  type: OpportunityType | 'ALL';
  location: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type Language = 'ar' | 'en';
