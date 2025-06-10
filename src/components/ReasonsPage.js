import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Sparkles, ArrowRight } from 'lucide-react';

const ReasonsPage = () => {
  const navigate = useNavigate();
  const [currentReason, setCurrentReason] = useState(0);

  const reasons = [
    {
      title: "Your Kindness",
      description: "You have the most beautiful heart I've ever known",
      icon: Heart
    },
    {
      title: "Your Intelligence",
      description: "You inspire me to be better every single day",
      icon: Star
    },
    {
      title: "Your Strength",
      description: "You face every challenge with such grace and courage",
      icon: Sparkles
    },
    {
      title: "Your Beauty",
      description: "Inside and out, you are absolutely stunning",
      icon: Heart
    },
    {
      title: "Your Love",
      description: "The way you love makes me the luckiest person alive",
      icon: Star
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReason((prev) => (prev + 1) % reasons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reasons.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-gray-800 mb-12 dancing-script"
        >
          Reasons Why I Love You
        </motion.h1>

        <div className="relative h-80 mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason}
              initial={{ opacity: 0, rotateX: 90, scale: 0.8 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: -90, scale: 0.8 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-8 rounded-3xl shadow-2xl text-white max-w-lg">
                <div className="mb-6">
                  {React.createElement(reasons[currentReason].icon, {
                    size: 48,
                    className: "mx-auto heart-beat"
                  })}
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {reasons[currentReason].title}
                </h2>
                <p className="text-lg opacity-90">
                  {reasons[currentReason].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mb-12">
          {reasons.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReason(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentReason === index ? 'bg-pink-500 w-8' : 'bg-pink-200'
              }`}
            />
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/apology')}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2"
        >
          Read My Heartfelt Apology
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default ReasonsPage;
