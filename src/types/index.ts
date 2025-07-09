export interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  avatar: string;
  revealImage: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: 'flirty' | 'romantic' | 'mysterious' | 'sassy' | 'nervous';
}

export interface GameState {
  currentScreen: 'welcome' | 'character-select' | 'chat' | 'reveal';
  selectedCharacter?: Character;
  messages: ChatMessage[];
  conversationStage: number;
  dateRating?: number;
  hasRevealed: boolean;
}