import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <motion.button
        onClick={onToggle}
        className={`relative rounded-full p-3 transition-all duration-300 shadow-lg ${
          isDark 
            ? 'glass-effect hover:bg-white/20 text-white border border-white/20' 
            : 'bg-white/90 hover:bg-white text-gray-800 border border-gray-200 shadow-md'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="relative"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400 drop-shadow-sm" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 drop-shadow-sm" />
          )}
        </motion.div>
        
        {/* Tooltip */}
        <div className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark 
            ? 'bg-black/80 text-white' 
            : 'bg-gray-800 text-white'
        }`}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;