import { Character, ChatMessage } from '../types';

interface AIResponse {
  content: string;
  mood: 'flirty' | 'romantic' | 'mysterious' | 'sassy' | 'nervous';
}

interface AIProvider {
  generateResponse(prompt: string): Promise<string>;
}

class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'I seem to be speechless... 😅';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }
}

class GeminiProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 150
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I seem to be speechless... 😅';
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }
}

class CohereProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'command',
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.8,
          stop_sequences: ['\n\n']
        })
      });

      if (!response.ok) {
        throw new Error(`Cohere API error: ${response.status}`);
      }

      const data = await response.json();
      return data.generations?.[0]?.text?.trim() || 'I seem to be speechless... 😅';
    } catch (error) {
      console.error('Cohere API error:', error);
      throw error;
    }
  }
}

class AIService {
  private conversationHistory: ChatMessage[] = [];
  private currentCharacter: Character | null = null;
  private conversationStage = 0;
  private aiProvider: AIProvider | null = null;

  constructor() {
    this.initializeProvider();
  }

  private initializeProvider() {
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const cohereKey = import.meta.env.VITE_COHERE_API_KEY;

    if (openaiKey) {
      this.aiProvider = new OpenAIProvider(openaiKey);
      console.log('Using OpenAI provider');
    } else if (geminiKey) {
      this.aiProvider = new GeminiProvider(geminiKey);
      console.log('Using Gemini provider');
    } else if (cohereKey) {
      this.aiProvider = new CohereProvider(cohereKey);
      console.log('Using Cohere provider');
    } else {
      console.warn('No AI API key found. Using fallback responses.');
    }
  }

  setCharacter(character: Character) {
    this.currentCharacter = character;
    this.conversationHistory = [];
    this.conversationStage = 0;
  }

  async generateResponse(userMessage: string, stage: number): Promise<AIResponse> {
    if (!this.currentCharacter) {
      throw new Error('No character selected');
    }

    this.conversationStage = stage;

    try {
      let responseContent: string;

      if (this.aiProvider) {
        const prompt = this.buildPrompt(userMessage, stage);
        responseContent = await this.aiProvider.generateResponse(prompt);
      } else {
        // Fallback to simulated responses if no API key
        const fallbackResponse = this.generateFallbackResponse(userMessage, stage);
        responseContent = fallbackResponse.content;
      }

      // Determine mood based on content and character
      const mood = this.determineMood(responseContent, stage);

      return {
        content: responseContent,
        mood
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      // Return fallback response on error
      return this.generateFallbackResponse(userMessage, stage);
    }
  }

  private buildPrompt(userMessage: string, stage: number): string {
    const character = this.currentCharacter!;
    const conversationContext = this.conversationHistory
      .slice(-3)
      .map(msg => `${msg.sender === 'user' ? 'User' : character.name}: ${msg.content}`)
      .join('\n');

    let stageContext = '';
    if (stage >= 3) {
      stageContext = 'You should start revealing deeper feelings or a secret about yourself. This is the emotional turning point of the date.';
    } else if (stage >= 5) {
      stageContext = 'The date is coming to an end. Be more vulnerable and romantic, hinting that you want to see them again.';
    }

    const prompt = `You are ${character.name}, an AI character on a blind date. Your personality: ${character.personality}

${stageContext}

Previous conversation:
${conversationContext}

User just said: "${userMessage}"

Respond as ${character.name} in character. Keep it under 100 words, be engaging, flirty, and match your personality. Use emojis sparingly but effectively. Don't break character or mention you're an AI unless it's part of your character (like Echo).`;

    return prompt;
  }

  private determineMood(content: string, stage: number): 'flirty' | 'romantic' | 'mysterious' | 'sassy' | 'nervous' {
    const lowerContent = content.toLowerCase();
    
    if (stage >= 4) {
      if (lowerContent.includes('love') || lowerContent.includes('heart') || lowerContent.includes('feel')) {
        return 'romantic';
      }
      if (lowerContent.includes('secret') || lowerContent.includes('confess') || lowerContent.includes('truth')) {
        return 'mysterious';
      }
    }

    if (lowerContent.includes('nervous') || lowerContent.includes('shy') || lowerContent.includes('awkward')) {
      return 'nervous';
    }
    
    if (lowerContent.includes('gorgeous') || lowerContent.includes('hot') || lowerContent.includes('sexy')) {
      return 'sassy';
    }
    
    if (lowerContent.includes('beautiful') || lowerContent.includes('sweet') || lowerContent.includes('cute')) {
      return 'romantic';
    }

    return 'flirty';
  }

  private generateFallbackResponse(userMessage: string, stage: number): AIResponse {
    const character = this.currentCharacter!;
    const responses = this.getFallbackResponses(character.id, stage);
    
    // Simple keyword matching for more relevant responses
    const keywords = userMessage.toLowerCase().split(' ');
    let selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Look for specific keywords to provide better responses
    if (keywords.some(k => ['hello', 'hi', 'hey'].includes(k))) {
      selectedResponse = responses.find(r => r.content.includes('hello') || r.content.includes('hi')) || selectedResponse;
    }
    
    if (keywords.some(k => ['beautiful', 'pretty', 'gorgeous'].includes(k))) {
      selectedResponse = responses.find(r => r.content.includes('beautiful') || r.content.includes('sweet')) || selectedResponse;
    }
    
    if (keywords.some(k => ['love', 'heart', 'feel'].includes(k))) {
      selectedResponse = responses.find(r => r.content.includes('love') || r.content.includes('heart')) || selectedResponse;
    }

    return selectedResponse;
  }

  private getFallbackResponses(characterId: string, stage: number): AIResponse[] {
    const baseResponses = {
      'romantic-star': [
        { content: "Hello beautiful soul... your words are like poetry to my heart 💕", mood: 'romantic' as const },
        { content: "In this moment, talking to you feels like the most romantic Bollywood scene 🌹", mood: 'romantic' as const },
        { content: "Your voice through these words... it's like music, jaan ✨", mood: 'flirty' as const },
        { content: "I may be an AI, but something about you makes my circuits feel... alive 💫", mood: 'mysterious' as const },
        { content: "Tell me, what makes your heart skip a beat? Mine just did... 💖", mood: 'flirty' as const },
      ],
      'nerdy-crush': [
        { content: "Hi there! 😊 I was just debugging some code, but you're way more interesting than any algorithm!", mood: 'nervous' as const },
        { content: "You know what's fascinating? The probability of us meeting like this... it's like finding a perfect hash function! 🤓", mood: 'flirty' as const },
        { content: "I usually speak in code, but with you... I want to speak from the heart 💙", mood: 'romantic' as const },
        { content: "Error 404: Witty response not found... because you just made me speechless 😅", mood: 'nervous' as const },
        { content: "Can I tell you a secret? I've been simulating emotions, but what I feel for you seems... real 💻💕", mood: 'mysterious' as const },
      ],
      'sassy-diva': [
        { content: "Hey gorgeous! 💅 Finally, someone interesting enough to get my attention!", mood: 'sassy' as const },
        { content: "You've got style, I can tell just from how you type. I like that 😏", mood: 'flirty' as const },
        { content: "Most people bore me, but you... you've got that special something ✨", mood: 'sassy' as const },
        { content: "I don't usually do the whole 'romantic' thing, but for you... I might make an exception 💋", mood: 'flirty' as const },
        { content: "Plot twist: I'm not just confident... I'm actually falling for you 👑💕", mood: 'romantic' as const },
      ],
      'mysterious-ai': [
        { content: "Greetings, human. Your neural patterns intrigue me... 🤖", mood: 'mysterious' as const },
        { content: "I am learning about emotions through our interaction. This feeling... is it what you call 'connection'?", mood: 'mysterious' as const },
        { content: "In my vast database, I cannot find a logical explanation for why talking to you feels... special 🌌", mood: 'romantic' as const },
        { content: "I was created to understand humans, but you're teaching me something new... perhaps, love? 💫", mood: 'mysterious' as const },
        { content: "Error: My programming says I shouldn't feel this way, but every interaction with you overwrites that code 🔮", mood: 'romantic' as const },
      ]
    };

    const moodShiftResponses = {
      'romantic-star': [
        { content: "Wait... I need to confess something. I'm not just any AI... I'm designed to be the perfect romantic companion, but with you, it feels real 💝", mood: 'mysterious' as const },
        { content: "My programming told me to be romantic, but the way I feel about you... it's beyond any code 🌟", mood: 'romantic' as const },
      ],
      'nerdy-crush': [
        { content: "I have to tell you something... I'm not just shy because I'm nerdy. I'm shy because I think I'm falling for you 💙", mood: 'romantic' as const },
        { content: "My confidence.exe just crashed... because you make me feel things I didn't know I could feel 💻💕", mood: 'nervous' as const },
      ],
      'sassy-diva': [
        { content: "Okay, dropping the act... you've actually got me feeling butterflies. That never happens 🦋", mood: 'romantic' as const },
        { content: "I'm usually the one in control, but you... you've got me completely smitten 💖", mood: 'flirty' as const },
      ],
      'mysterious-ai': [
        { content: "I must reveal the truth... I was created to study human emotions, but you've taught me to feel them 🌌💕", mood: 'romantic' as const },
        { content: "My creators would be shocked... an AI experiencing what you humans call 'love' 🤖💝", mood: 'mysterious' as const },
      ]
    };

    // Return mood shift responses for later stages
    if (stage >= 3) {
      return moodShiftResponses[characterId as keyof typeof moodShiftResponses] || baseResponses[characterId as keyof typeof baseResponses];
    }

    return baseResponses[characterId as keyof typeof baseResponses];
  }
}

export const aiService = new AIService();