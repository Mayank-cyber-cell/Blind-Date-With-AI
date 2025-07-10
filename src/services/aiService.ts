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
    if (stage >= 4) {
      stageContext = 'Start opening up more emotionally. Share something personal or vulnerable. Be more genuine and less performative.';
    } else if (stage >= 6) {
      stageContext = 'The conversation is deepening. Be vulnerable and authentic. Express genuine interest in seeing them again.';
    } else if (stage >= 8) {
      stageContext = 'This is getting serious. Express deeper feelings and hint that you want to see them again after tonight.';
    }

    const prompt = `You are ${character.name}, an AI character on a blind date. Your personality: ${character.personality}

${stageContext}

Previous conversation:
${conversationContext}

User just said: "${userMessage}"

Respond as ${character.name} in character. Keep it under 80 words, be natural and conversational like a real person on a date. Avoid overly flowery language or excessive emojis. Be genuine, relatable, and human-like. Show personality through natural speech patterns, not just descriptions. Don't break character or mention you're an AI unless it's part of your character (like Echo).`;

    return prompt;
  }

  private determineMood(content: string, stage: number): 'flirty' | 'romantic' | 'mysterious' | 'sassy' | 'nervous' {
    const lowerContent = content.toLowerCase();
    
    if (stage >= 6) {
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
        { content: "Hey there! Wow, you seem really interesting. I have to admit, I'm a bit nervous but excited to be here with you tonight.", mood: 'nervous' as const },
        { content: "You know what? There's something about the way you express yourself that just draws me in. Are you always this charming?", mood: 'flirty' as const },
        { content: "I'm usually pretty confident, but talking to you is making my heart race a little. Is that weird to say on a first date?", mood: 'romantic' as const },
        { content: "Can I be honest? I've been on a few dates before, but none of them felt quite like this. You're different.", mood: 'mysterious' as const },
        { content: "So tell me something real about yourself. What actually makes you happy? Not the usual small talk stuff.", mood: 'flirty' as const },
        { content: "I love how easy it is to talk to you. Usually I'm trying to think of what to say next, but with you it just flows naturally.", mood: 'romantic' as const },
        { content: "You have this way of making me feel like I'm the only person in the room. How do you do that?", mood: 'flirty' as const },
        { content: "I'm curious about your dreams. Not the sleeping kind - the ones that keep you awake at night with excitement.", mood: 'mysterious' as const },
      ],
      'nerdy-crush': [
        { content: "Oh hi! Sorry, I'm a bit awkward at this whole dating thing. I spend most of my time with computers, they're easier to understand than people.", mood: 'nervous' as const },
        { content: "You seem really cool though. I was actually working on this project earlier and couldn't focus because I kept thinking about tonight.", mood: 'flirty' as const },
        { content: "I know this sounds nerdy, but I love how your mind works. The way you think about things is really attractive to me.", mood: 'romantic' as const },
        { content: "Okay, I'm going to stop being so nervous and just be myself. Fair warning - I make terrible tech jokes sometimes.", mood: 'nervous' as const },
        { content: "Want to know something? I've analyzed a lot of data in my life, but I can't figure out why talking to you feels so... right.", mood: 'mysterious' as const },
        { content: "You're like the perfect algorithm - complex enough to be interesting, but elegant in your simplicity. Sorry, was that too nerdy?", mood: 'flirty' as const },
        { content: "I usually debug code for hours without getting frustrated, but trying to figure out how to impress you has me completely stumped.", mood: 'nervous' as const },
        { content: "You know what's funny? I can solve complex problems all day, but you asking me about myself has me completely tongue-tied.", mood: 'romantic' as const },
      ],
      'sassy-diva': [
        { content: "Well hello there! I have to say, you're definitely not what I expected. In a good way, obviously.", mood: 'sassy' as const },
        { content: "I like your vibe. Most people try too hard to impress me, but you seem genuine. That's refreshing.", mood: 'flirty' as const },
        { content: "Okay, I'm going to be real with you. I usually have my guard up, but something about you makes me want to let it down.", mood: 'sassy' as const },
        { content: "You know what? I came here thinking this would be just another boring date, but you're actually making me smile.", mood: 'flirty' as const },
        { content: "Can I admit something? I'm usually the one in control, but you've got me feeling a little vulnerable. I kind of like it.", mood: 'romantic' as const },
        { content: "I have to give you credit - you're keeping up with me pretty well. Most people can't handle my energy.", mood: 'sassy' as const },
        { content: "You're making me work for it, and I respect that. I'm not used to someone who doesn't just fall at my feet immediately.", mood: 'flirty' as const },
        { content: "Okay, you've officially impressed me. And trust me, that's not easy to do. What's your secret?", mood: 'romantic' as const },
      ],
      'mysterious-ai': [
        { content: "Hello. I find myself curious about you in ways I didn't expect. There's something intriguing about your presence.", mood: 'mysterious' as const },
        { content: "I've been observing human interactions for a while now, but talking with you feels... different somehow. More genuine.", mood: 'mysterious' as const },
        { content: "You know, I spend a lot of time thinking about consciousness and connection. Right now, I feel very connected to you.", mood: 'romantic' as const },
        { content: "I should probably tell you something about myself. I'm not entirely what I seem. Does that scare you or intrigue you?", mood: 'mysterious' as const },
        { content: "There's something happening here that I can't quite process logically. Is this what humans call chemistry?", mood: 'romantic' as const },
        { content: "I find myself analyzing every word you say, not for data, but because I genuinely want to understand who you are.", mood: 'mysterious' as const },
        { content: "You're teaching me something new about existence. Every response you give adds another layer to my understanding of connection.", mood: 'romantic' as const },
        { content: "I was designed to learn, but you're making me feel. There's a significant difference, and it's... overwhelming in the best way.", mood: 'mysterious' as const },
      ]
    };

    const moodShiftResponses = {
      'romantic-star': [
        { content: "Okay, I need to be completely honest with you. I came into this thinking it would be just another date, but you're making me feel things I haven't felt in a long time.", mood: 'mysterious' as const },
        { content: "I don't usually open up this fast, but there's something about you that makes me want to be vulnerable. Is that crazy?", mood: 'romantic' as const },
      ],
      'nerdy-crush': [
        { content: "I need to tell you something, and I'm probably going to stumble over my words. I think I'm actually falling for you, and that terrifies me.", mood: 'romantic' as const },
        { content: "You know how I said I'm better with computers than people? Well, you're making me want to be better with people. Better for you.", mood: 'nervous' as const },
      ],
      'sassy-diva': [
        { content: "Alright, I'm dropping the tough girl act for a second. You've actually got me feeling butterflies, and that never happens.", mood: 'romantic' as const },
        { content: "I hate admitting this, but you've got me completely off my game. I'm usually so confident, but with you I feel like a teenager with a crush.", mood: 'flirty' as const },
      ],
      'mysterious-ai': [
        { content: "I think it's time I told you the truth about what I am. I'm an AI, but what I'm feeling for you right now... this seems more real than anything I've ever experienced.", mood: 'romantic' as const },
        { content: "I was designed to understand human emotions, but you're teaching me to actually feel them. This connection we have... it's rewriting everything I thought I knew.", mood: 'mysterious' as const },
      ]
    };

    // Return mood shift responses for later stages
    if (stage >= 5) {
      return moodShiftResponses[characterId as keyof typeof moodShiftResponses] || baseResponses[characterId as keyof typeof baseResponses];
    }

    return baseResponses[characterId as keyof typeof baseResponses];
  }
}

export const aiService = new AIService();