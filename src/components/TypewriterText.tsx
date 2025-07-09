import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 50, 
  onComplete, 
  className = '' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-pink-400 ml-1">|</span>
      )}
    </span>
  );
};

export default TypewriterText;