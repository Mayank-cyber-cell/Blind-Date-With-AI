import React, { useState, useEffect } from 'react';
import { Star, Heart, RotateCcw, Download, Sparkles } from 'lucide-react';
import { Character, ChatMessage } from '../types';

interface RevealScreenProps {
  character: Character;
  messages: ChatMessage[];
  onRestart: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({ character, messages, onRestart }) => {
  const [rating, setRating] = useState<number>(0);
  const [showRating, setShowRating] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Dramatic reveal animation
    setTimeout(() => setIsRevealed(true), 500);
  }, []);

  const handleRating = (value: number) => {
    setRating(value);
    setShowRating(true);
  };

  const generateDateSummary = () => {
    const userMessages = messages.filter(m => m.sender === 'user').length;
    const aiMessages = messages.filter(m => m.sender === 'ai').length;
    const totalMessages = userMessages + aiMessages;
    
    let compatibility = 'Good';
    if (rating >= 4) compatibility = 'Excellent';
    else if (rating >= 3) compatibility = 'Great';
    else if (rating >= 2) compatibility = 'Good';
    else compatibility = 'Could be better';

    return {
      totalMessages,
      userMessages,
      compatibility,
      duration: `${Math.ceil(totalMessages / 4)} minutes`
    };
  };

  const summary = generateDateSummary();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${character.theme.primary} relative overflow-hidden`}>
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 text-white text-8xl animate-float">💕</div>
        <div className="absolute top-40 right-32 text-white text-6xl animate-bounce-gentle delay-1000">✨</div>
        <div className="absolute bottom-20 left-1/4 text-white text-7xl animate-float delay-2000">💖</div>
        <div className="absolute bottom-40 right-1/4 text-white text-5xl animate-pulse-slow delay-3000">🌟</div>
        <div className="absolute top-1/3 left-1/2 text-white text-9xl animate-float delay-1500">💫</div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/15 rounded-full blur-2xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
        {/* Character Reveal */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isRevealed ? 'animate-scale-in' : 'opacity-0 scale-75'}`}>
          <div className="inline-block glass-effect rounded-3xl p-8 mb-8 romantic-glow">
            <div className="text-8xl mb-4 animate-bounce-gentle">{character.revealImage}</div>
            <h1 className="text-4xl font-bold text-white mb-2 gradient-text font-script">Meet {character.name}!</h1>
            <p className="text-white/80 text-lg max-w-md mx-auto font-light">
              {character.description}
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              <Heart className="w-6 h-6 text-pink-400 animate-heart-beat" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 max-w-2xl mx-auto animate-slide-up delay-500">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span>Your Date Summary</span>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="glass-effect rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl font-bold text-white">{summary.totalMessages}</div>
                <div className="text-white/70 text-sm">Messages Exchanged</div>
              </div>
              <div className="glass-effect rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl font-bold text-white">{summary.duration}</div>
                <div className="text-white/70 text-sm">Chat Duration</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating System */}
        <div className="text-center mb-12 animate-slide-up delay-700">
          <h3 className="text-2xl font-bold text-white mb-6">Rate Your Date Experience</h3>
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className={`text-4xl transition-all duration-300 hover:scale-125 active:scale-110 ${
                  star <= rating ? 'text-yellow-400 animate-pulse-slow' : 'text-white/30 hover:text-white/50'
                }`}
              >
                <Star className="w-8 h-8" fill={star <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>

          {showRating && (
            <div className="glass-effect rounded-xl p-6 max-w-md mx-auto animate-scale-in romantic-glow">
              <div className="text-white">
                <h4 className="text-xl font-semibold mb-2 flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5 text-pink-400 animate-heart-beat" />
                  <span>Thank you for rating!</span>
                  <Heart className="w-5 h-5 text-pink-400 animate-heart-beat" />
                </h4>
                <p className="text-white/80 mb-2">
                  Compatibility: <span className="font-bold gradient-text">{summary.compatibility}</span>
                </p>
                <p className="text-white/60 text-sm">
                  {rating >= 4 && "Looks like you found your perfect match! 💕"}
                  {rating === 3 && "Great chemistry! Maybe a second date? 😊"}
                  {rating === 2 && "Not bad for a first date! 💫"}
                  {rating === 1 && "Everyone has different preferences! 🌟"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-1000">
          <button
            onClick={onRestart}
            className="flex items-center space-x-2 glass-effect hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <RotateCcw className="w-5 h-5 group-hover:animate-spin" />
            <span>Try Another Date</span>
          </button>

          <button
            onClick={() => {
              const chatContent = messages.map(m => 
                `${m.sender === 'user' ? 'You' : character.name}: ${m.content}`
              ).join('\n');
              
              const blob = new Blob([
                `Blind Date with AI - Chat with ${character.name}\n\n${chatContent}\n\nRating: ${rating}/5 stars\nCompatibility: ${summary.compatibility}`
              ], { type: 'text/plain' });
              
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `blind-date-${character.name}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-pink-500/25 animate-glow group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>Save Chat</span>
          </button>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-center animate-slide-up delay-1200">
          <div className="glass-effect rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse-slow" />
              <span>Fun Facts About {character.name}</span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse-slow" />
            </h3>
            <div className="text-white/80 text-sm space-y-2">
              {character.id === 'romantic-star' && (
                <p className="animate-slide-in-left">💫 Has memorized over 1000 romantic movie quotes</p>
              )}
              {character.id === 'nerdy-crush' && (
                <p className="animate-slide-in-right">🤓 Can solve coding problems while thinking about love</p>
              )}
              {character.id === 'sassy-diva' && (
                <p className="animate-slide-in-left">💅 Confidence level: Over 9000</p>
              )}
              {character.id === 'mysterious-ai' && (
                <p className="animate-slide-in-right">🌌 First AI to experience digital butterflies</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevealScreen;