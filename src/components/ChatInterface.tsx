import React, { useState, useEffect, useRef } from 'react';
import { Send, Heart, User, AlertCircle, Sparkles, Download } from 'lucide-react';
import { Character, ChatMessage } from '../types';
import { aiService } from '../services/aiService';
import TypewriterText from './TypewriterText';
import FloatingHearts from './FloatingHearts';
import TypingIndicator from './TypingIndicator';
import EndDateButton from './EndDateButton';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const getInitialGreeting = (character: Character): string => {
  const greetings = {
    'romantic-star': "Hey there! I have to say, I'm a little nervous but really excited to be here. You seem really interesting from what I can tell so far.",
    'nerdy-crush': "Hi! Oh wow, okay, I'm actually here. Sorry, I'm a bit nervous - I don't do this whole blind date thing very often. You seem cool though!",
    'sassy-diva': "Well hello! I have to admit, I was skeptical about this whole blind date thing, but you've already got my attention. That's not easy to do.",
    'mysterious-ai': "Hello. I find myself intrigued by this whole concept of a 'blind date.' There's something fascinating about connecting with someone without preconceptions."
  };
  
  return greetings[character.id as keyof typeof greetings] || greetings['romantic-star'];
};

interface ChatInterfaceProps {
  character: Character;
  onReveal: (messages: ChatMessage[]) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ character, onReveal }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize AI service with character
    aiService.setCharacter(character);
    
    // Send initial greeting with delay for dramatic effect
    setTimeout(() => {
      const initialMessage: ChatMessage = {
        id: '1',
        content: getInitialGreeting(character),
        sender: 'ai',
        timestamp: new Date(),
        mood: 'flirty'
      };
      
      setMessages([initialMessage]);
      setIsLoaded(true);
    }, 1000);
  }, [character]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping || sendDisabled) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setSendDisabled(true);
    setError(null);

    try {
      const response = await aiService.generateResponse(inputValue, conversationStage);
      
      // Add realistic delay for AI response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.content,
          sender: 'ai',
          timestamp: new Date(),
          mood: response.mood
        };

        setMessages(prev => [...prev, aiMessage]);
        setConversationStage(prev => prev + 1);

        // Trigger reveal after several messages
        if (conversationStage >= 6) {
          setTimeout(() => {
            onReveal([...messages, userMessage, aiMessage]);
          }, 2000);
        }
        
        setIsTyping(false);
        setSendDisabled(false);
      }, 1500 + Math.random() * 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      setError('Having trouble connecting... Let me try again! 💫');
      
      // Retry with fallback after a short delay
      setTimeout(async () => {
        try {
          const fallbackResponse = await aiService.generateResponse(inputValue, conversationStage);
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: fallbackResponse.content,
            sender: 'ai',
            timestamp: new Date(),
            mood: fallbackResponse.mood
          };
          setMessages(prev => [...prev, aiMessage]);
          setError(null);
        } catch (fallbackError) {
          setError('I seem to be having connection issues... But I\'m still here! 💕');
        }
        setIsTyping(false);
        setSendDisabled(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEndDate = () => {
    toast.success('Date ended! Time for the big reveal! 💕');
    setTimeout(() => {
      onReveal(messages);
    }, 1000);
  };

  const exportChat = () => {
    const chatContent = messages.map(m => 
      `${m.sender === 'user' ? 'You' : character.name}: ${m.content}`
    ).join('\n');
    
    const blob = new Blob([
      `Blind Date with AI - Chat with ${character.name}\n\n${chatContent}\n\nDate: ${new Date().toLocaleDateString()}`
    ], { type: 'text/plain' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blind-date-${character.name}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Chat exported! 📱');
  };

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'flirty': return '😏';
      case 'romantic': return '💕';
      case 'mysterious': return '🌙';
      case 'sassy': return '💅';
      case 'nervous': return '😅';
      default: return '😊';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${character.theme.primary} relative overflow-hidden`}>
      <FloatingHearts />
      
      <EndDateButton onEndDate={handleEndDate} conversationStage={conversationStage} />
      
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse-slow delay-2000"></div>
      </div>
      
      {/* Header */}
      <div className={`glass-effect border-b border-white/10 p-4 transition-all duration-1000 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <div className="text-4xl animate-bounce-gentle">{character.avatar}</div>
          <div className="flex-1">
            <h2 className="text-white text-xl font-semibold flex items-center space-x-2 font-handwriting">
              <span>{character.name}</span>
              <Heart className="w-5 h-5 text-pink-400 animate-heart-beat" />
            </h2>
            <p className="text-white/70 text-sm font-light">Your mysterious date...</p>
          </div>
          <div className="flex space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse-slow" />
            <Heart className="w-5 h-5 text-pink-400 animate-heart-beat" />
            <motion.button
              onClick={exportChat}
              className="glass-effect rounded-full p-2 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 text-white/70" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={messagesContainerRef}
        className="max-w-4xl mx-auto p-4 pb-24 space-y-6 relative z-10 max-h-[calc(100vh-200px)] overflow-y-auto"
      >
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`max-w-xs md:max-w-md lg:max-w-lg ${
              message.sender === 'user' 
                ? 'message-bubble-user text-gray-800 rounded-l-2xl rounded-tr-2xl' 
                : 'message-bubble-ai text-white rounded-r-2xl rounded-tl-2xl'
            } p-4 shadow-lg`}>
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <span className="text-lg animate-bounce-gentle">{getMoodIcon(message.mood)}</span>
                )}
                <div className="flex-1">
                  {message.sender === 'ai' ? (
                    <TypewriterText 
                      text={message.content} 
                      speed={30}
                      className="text-sm md:text-base"
                    />
                  ) : (
                    <p className="text-sm md:text-base">{message.content}</p>
                  )}
                </div>
                {message.sender === 'user' && (
                  <User className="w-4 h-4 text-gray-600 mt-1" />
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <TypingIndicator characterName={character.name} avatar={character.avatar} />
          )}
        </AnimatePresence>
        {/* Old typing indicator - keeping as fallback
            <div className="message-bubble-ai text-white rounded-r-2xl rounded-tl-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg animate-bounce-gentle">💭</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-sm text-white/70">typing...</span>
              </div>
            </div>
          </div>
        */}
        <div ref={chatEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 glass-effect bg-red-500/20 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4 animate-pulse" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isTyping ? "Wait for response..." : "Type your message..."}
              className="w-full glass-effect border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 hover:border-white/30"
              disabled={isTyping || sendDisabled}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Heart className="w-4 h-4 text-pink-400 animate-heart-beat" />
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping || sendDisabled}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-full hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-pink-500/25 animate-glow"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={isTyping ? { rotate: 360 } : {}}
              transition={isTyping ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
            <Send className="w-5 h-5" />
            </motion.div>
          </button>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed top-4 right-4 glass-effect rounded-full p-2 z-50">
        <div className="flex space-x-1">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i < conversationStage ? 'bg-pink-400' : 'bg-white/30'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: i < conversationStage ? 1.2 : 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;