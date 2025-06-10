import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDelay: Math.random() * 2,
        size: Math.random() * 10 + 10,
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 4000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.animationDelay}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
