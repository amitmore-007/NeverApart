import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Heart, Star, Gift, Sun, Moon } from 'lucide-react';

const PromisePage = () => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState([]);

  const promises = [
    {
      icon: Heart,
      title: "I Promise to Love You",
      description: "With every beat of my heart, unconditionally and endlessly",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "I Promise to Protect You",
      description: "Your heart, your dreams, and your happiness are my priority",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Star,
      title: "I Promise to Support You",
      description: "In every dream you chase and every goal you pursue",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Gift,
      title: "I Promise to Cherish You",
      description: "Every moment, every smile, every tear - you are precious to me",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: Sun,
      title: "I Promise to Be Better",
      description: "To learn from my mistakes and grow into the person you deserve",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: Moon,
      title: "I Promise Forever",
      description: "This is not just today - this is my commitment for life",
      color: "from-purple-400 to-indigo-500"
    }
  ];

  const handleCardClick = (index) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen p-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4 dancing-script">
          My Sacred Promises to You
        </h1>
        <p className="text-xl text-gray-600">
          Click each card to reveal my heartfelt commitments
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {promises.map((promise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="relative h-64 cursor-pointer"
            onClick={() => handleCardClick(index)}
          >
            <motion.div
              animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${promise.color} rounded-2xl shadow-lg flex items-center justify-center backface-hidden`}>
                <div className="text-center text-white">
                  {React.createElement(promise.icon, { size: 48, className: "mx-auto mb-4" })}
                  <h3 className="text-xl font-bold">Click to Reveal</h3>
                </div>
              </div>

              {/* Back of card */}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${promise.color} rounded-2xl shadow-lg p-6 flex flex-col justify-center backface-hidden`}
                   style={{ transform: 'rotateY(180deg)' }}>
                <div className="text-center text-white">
                  {React.createElement(promise.icon, { size: 32, className: "mx-auto mb-3" })}
                  <h3 className="text-lg font-bold mb-3">{promise.title}</h3>
                  <p className="text-sm opacity-90">{promise.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/surprise')}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2"
        >
          One Final Surprise
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default PromisePage;
