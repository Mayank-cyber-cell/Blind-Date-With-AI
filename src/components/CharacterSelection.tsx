import React, { useState, useEffect } from 'react';
import { characters } from '../data/characters';
import { Character } from '../types';
import { Heart, Sparkles } from 'lucide-react';

interface CharacterSelectionProps {
  onSelect: (character: Character) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 text-pink-300 opacity-20 animate-float">
          <Heart size={30} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-purple-300 opacity-25 animate-float delay-1000">
          <Sparkles size={25} />
        </div>
        <div className="absolute bottom-1/4 left-1/3 text-rose-300 opacity-20 animate-float delay-2000">
          <Heart size={35} />
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse-slow delay-3000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-5xl font-bold text-white mb-4 font-serif gradient-text">
            Choose Your Mystery Date
          </h1>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            <Heart className="w-6 h-6 text-pink-400 animate-heart-beat" />
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
          </div>
          <p className="text-pink-200 text-lg animate-slide-up delay-300">
            Four fascinating personalities await. Who will capture your heart?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className={`group relative glass-effect rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl animate-slide-up ${
                hoveredCard === character.id ? 'romantic-glow' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => onSelect(character)}
              onMouseEnter={() => setHoveredCard(character.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500 animate-bounce-gentle">
                    {character.avatar}
                  </div>
                  {hoveredCard === character.id && (
                    <div className="absolute -top-2 -right-2 text-2xl animate-heart-beat">
                      💕
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white group-hover:text-pink-200 transition-colors duration-300">
                  {character.name}
                </h3>
                
                <p className="text-pink-200 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  {character.description}
                </p>
                
                <div className="pt-4">
                  <button className={`w-full py-3 rounded-lg bg-gradient-to-r ${character.theme.primary} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105 relative overflow-hidden`}>
                    <span className="relative z-10">Meet {character.name}</span>
                    <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Sparkle effects on hover */}
              {hoveredCard === character.id && (
                <>
                  <div className="absolute top-4 right-4 text-yellow-300 animate-pulse-slow">
                    <Sparkles size={16} />
                  </div>
                  <div className="absolute bottom-4 left-4 text-pink-300 animate-pulse-slow delay-500">
                    <Sparkles size={12} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-slide-up delay-1000">
          <div className="glass-effect rounded-xl p-6 max-w-md mx-auto">
            <p className="text-pink-300 text-sm opacity-75 flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4 animate-heart-beat" />
              <span>Each character has their own secrets and surprises... Choose wisely!</span>
              <Heart className="w-4 h-4 animate-heart-beat" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;