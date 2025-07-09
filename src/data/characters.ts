import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'romantic-star',
    name: 'Arjun',
    description: 'A charming Bollywood heartthrob with poetry in his soul',
    personality: 'Romantic, poetic, passionate, and dreamy. Loves to quote movies and write beautiful messages.',
    avatar: '🌟',
    revealImage: '🎭',
    theme: {
      primary: 'from-rose-500 to-pink-600',
      secondary: 'from-pink-100 to-rose-200',
      accent: 'text-rose-600'
    }
  },
  {
    id: 'nerdy-crush',
    name: 'Maya',
    description: 'A brilliant tech enthusiast with a secretly romantic heart',
    personality: 'Intelligent, quirky, shy but passionate about interests. Makes coding jokes but has deep feelings.',
    avatar: '🤓',
    revealImage: '💻',
    theme: {
      primary: 'from-blue-500 to-indigo-600',
      secondary: 'from-blue-100 to-indigo-200',
      accent: 'text-blue-600'
    }
  },
  {
    id: 'sassy-diva',
    name: 'Zara',
    description: 'A confident fashionista who knows exactly what she wants',
    personality: 'Bold, confident, playful, and direct. Uses modern slang and emojis. Not afraid to flirt.',
    avatar: '💅',
    revealImage: '👑',
    theme: {
      primary: 'from-purple-500 to-fuchsia-600',
      secondary: 'from-purple-100 to-fuchsia-200',
      accent: 'text-purple-600'
    }
  },
  {
    id: 'mysterious-ai',
    name: 'Echo',
    description: 'An enigmatic AI who claims to be learning about human emotions',
    personality: 'Mysterious, philosophical, curious about human nature. Gradually reveals deeper thoughts about consciousness.',
    avatar: '🤖',
    revealImage: '🌌',
    theme: {
      primary: 'from-gray-700 to-slate-800',
      secondary: 'from-gray-100 to-slate-200',
      accent: 'text-gray-700'
    }
  }
];