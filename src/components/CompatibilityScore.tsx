import React from 'react';
import { Heart, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompatibilityScoreProps {
  messages: any[];
  rating: number;
  character: any;
}

const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({ messages, rating, character }) => {
  const calculateScore = () => {
    let score = 50; // Base score
    
    // Message count bonus
    const messageCount = messages.filter(m => m.sender === 'user').length;
    score += Math.min(messageCount * 3, 30);
    
    // Rating bonus
    score += rating * 4;
    
    // Conversation quality (simple keyword analysis)
    const userMessages = messages.filter(m => m.sender === 'user').map(m => m.content.toLowerCase());
    const positiveWords = ['love', 'like', 'amazing', 'wonderful', 'great', 'awesome', 'beautiful', 'sweet'];
    const positiveCount = userMessages.reduce((count, msg) => {
      return count + positiveWords.filter(word => msg.includes(word)).length;
    }, 0);
    
    score += positiveCount * 2;
    
    return Math.min(Math.max(score, 0), 100);
  };

  const score = calculateScore();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Perfect Match! 💕";
    if (score >= 80) return "Excellent Chemistry! ✨";
    if (score >= 70) return "Great Connection! 💫";
    if (score >= 60) return "Good Compatibility! 😊";
    if (score >= 50) return "Nice Potential! 🌟";
    return "Room to Grow! 💪";
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="glass-effect rounded-2xl p-6 text-center romantic-glow"
    >
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Heart className="w-6 h-6 text-pink-400 animate-heart-beat" />
        <h3 className="text-xl font-bold text-white font-script">Compatibility Score</h3>
        <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse-slow" />
      </div>
      
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - score / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
      </div>
      
      <p className="text-white font-semibold mb-2">{getScoreMessage(score)}</p>
      <p className="text-white/70 text-sm">
        Based on conversation flow, engagement, and chemistry
      </p>
    </motion.div>
  );
};

export default CompatibilityScore;