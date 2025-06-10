import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Phone, MessageCircle } from 'lucide-react';

const SurprisePage = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const surpriseMessages = [
    "I've planned something special for us...",
    "A candlelit dinner at your favorite restaurant",
    "A weekend getaway to that place you love",
    "And most importantly...",
    "A promise to never hurt you again ❤️"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowSurprise(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSurprise) {
      const interval = setInterval(() => {
        setCurrentMessage(prev => {
          if (prev < surpriseMessages.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showSurprise, surpriseMessages.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: Math.random() * 3
            }}
            className="absolute"
          >
            <Star className="text-yellow-400" size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.6 }}
          className="mb-12"
        >
          <div className="relative">
            <Heart 
              size={150} 
              className="text-pink-500 mx-auto heart-beat" 
              fill="currentColor"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles size={40} className="text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-6xl font-bold text-pink-600 mb-8 dancing-script"
        >
          My Final Surprise
        </motion.h1>

        {showSurprise && (
          <div className="space-y-8 mb-12">
            <AnimatePresence mode="wait">
              {surpriseMessages.slice(0, currentMessage + 1).map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-pink-200"
                >
                  <p className="text-xl text-gray-800 font-medium">{message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {currentMessage >= surpriseMessages.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-3xl shadow-2xl">
              <h2 className="text-3xl font-bold mb-4 dancing-script">
                Please Call Me
              </h2>
              <p className="text-lg mb-6">
                I'm waiting for you with open arms and an open heart. 
                Let's talk and make everything right again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2"
              >
                <Phone size={20} />
                Call Me Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg inline-flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Text Me
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-2xl text-gray-700 dancing-script"
            >
              I love you more than words can say ❤️
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SurprisePage;
