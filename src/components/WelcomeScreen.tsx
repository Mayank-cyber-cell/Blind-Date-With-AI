import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating hearts */}
        <div className="absolute top-20 left-10 text-pink-300 opacity-30 animate-float">
          <Heart size={40} className="animate-heart-beat" />
        </div>
        <div className="absolute top-40 right-20 text-purple-300 opacity-40 animate-float delay-1000">
          <Sparkles size={30} className="animate-pulse-slow" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-rose-300 opacity-35 animate-float delay-2000">
          <Heart size={25} className="animate-heart-beat" />
        </div>
        <div className="absolute bottom-40 right-1/3 text-pink-300 opacity-30 animate-float delay-3000">
          <Sparkles size={35} className="animate-pulse-slow" />
        </div>
        
        {/* Additional romantic elements */}
        <div className="absolute top-1/3 left-1/2 text-rose-200 opacity-20 animate-bounce-gentle">
          <Heart size={60} />
        </div>
        <div className="absolute top-2/3 right-1/4 text-purple-200 opacity-25 animate-float delay-1500">
          <Sparkles size={45} />
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-rose-500/15 to-pink-500/15 rounded-full blur-2xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className={`text-center space-y-8 px-6 relative z-10 transition-all duration-1000 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="space-y-6">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold gradient-text font-script animate-scale-in">
              Blind Date
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce-gentle delay-500">💕</div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-pink-200 animate-slide-up delay-300 font-handwriting">
            with AI
          </h2>
          
          <div className="flex justify-center items-center space-x-4 animate-slide-up delay-500">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            <Heart className="w-6 h-6 text-pink-400 animate-heart-beat" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8 animate-slide-up delay-700">
          <div className="glass-effect rounded-2xl p-8 romantic-glow">
            <p className="text-lg text-pink-100 leading-relaxed mb-6">
              Experience the thrill of a mystery date with our charming AI companions. 
              Each character has their own personality, secrets, and surprises waiting to be discovered.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-pink-200">
              <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/10 animate-slide-in-left">
                <Heart className="w-5 h-5 animate-heart-beat" />
                <span className="font-medium">Romantic</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/10 animate-slide-up delay-200">
                <Sparkles className="w-5 h-5 animate-pulse-slow" />
                <span className="font-medium">Mysterious</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/10 animate-slide-in-right">
                <Heart className="w-5 h-5 animate-heart-beat" />
                <span className="font-medium">Unforgettable</span>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-slide-up delay-1000">
          <button
            onClick={onStart}
            className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full text-xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:scale-110 active:scale-95 animate-glow"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Play className="w-6 h-6 group-hover:animate-bounce-gentle" />
              <span>Start Your Date</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-shimmer"></div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300"></div>
          </button>
        </div>

        <div className="animate-slide-up delay-1200">
          <p className="text-pink-300 text-sm opacity-75 animate-pulse-slow">
            Who will you meet tonight? The choice is yours... ✨
          </p>
        </div>
      </div>
      
      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
    </div>
  );
};

export default WelcomeScreen;