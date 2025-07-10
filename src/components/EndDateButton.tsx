import React from 'react';
import { LogOut, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface EndDateButtonProps {
  onEndDate: () => void;
  conversationStage: number;
}

const EndDateButton: React.FC<EndDateButtonProps> = ({ onEndDate, conversationStage }) => {
  if (conversationStage < 3) return null;

  return (
    <motion.button
      onClick={onEndDate}
      className="fixed top-4 right-16 z-50 glass-effect rounded-full p-3 hover:bg-red-500/20 transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        End Date
      </div>
    </motion.button>
  );
};

export default EndDateButton;