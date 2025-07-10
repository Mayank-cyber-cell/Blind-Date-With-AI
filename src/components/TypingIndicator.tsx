import React from 'react';
import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  characterName: string;
  avatar: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ characterName, avatar }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-start mb-4"
    >
      <div className="message-bubble-ai text-white rounded-r-2xl rounded-tl-2xl p-4 shadow-lg max-w-xs">
        <div className="flex items-center space-x-3">
          <span className="text-lg">{avatar}</span>
          <div className="flex flex-col">
            <span className="text-xs text-white/60 mb-1">{characterName} is typing...</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/70 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;