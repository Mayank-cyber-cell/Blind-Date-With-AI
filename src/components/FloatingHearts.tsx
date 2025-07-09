import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  emoji: string;
  rotation: number;
  rotationSpeed: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '✨', '🌟', '💫'];

  useEffect(() => {
    const generateHeart = () => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: Math.random() * 25 + 15,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 3 + 1,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      };

      setHearts(prev => [...prev.slice(-15), newHeart]);
    };

    const interval = setInterval(generateHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateHearts = () => {
      setHearts(prev => prev
        .map(heart => ({
          ...heart,
          y: heart.y - heart.speed,
          x: heart.x + Math.sin(heart.y * 0.01) * 0.5,
          opacity: heart.opacity * 0.998,
          rotation: heart.rotation + heart.rotationSpeed
        }))
        .filter(heart => heart.y > -100 && heart.opacity > 0.01)
      );
    };

    const animationInterval = setInterval(animateHearts, 50);
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute transition-all duration-100 ease-linear"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            opacity: heart.opacity,
            transform: `rotate(${heart.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.3))'
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;