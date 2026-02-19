
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  password?: string; // Only for local storage simulation
}

export interface Site {
  id: string;
  ownerId: string;
  name: string;
  url: string;
  description: string;
  lastUpdated: string;
  status: 'active' | 'deploying' | 'offline';
  thumbnail?: string;
}

export type View = 'dashboard' | 'create' | 'settings' | 'help' | 'profile';

export interface GeminiResponse {
  suggestion: string;
  suggestedName: string;
  suggestedDescription: string;
}
